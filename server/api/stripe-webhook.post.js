import Stripe from "stripe"
import admin from "firebase-admin"
// import { getFirestore } from "firebase-admin/firestore"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    console.log(config)
    const serviceAccount = {
        type: config.firebaseServiceAccountType,
        project_id: config.firebaseServiceAccountProjectID,
        private_key_id: config.firebaseServiceAccountPrivateKeyID,
        private_key: config.firebaseServiceAccountPrivateKey.replace(/\\n/g, '\n'),
        client_email: config.firebaseServiceAccountClientEmail,
        client_id: config.firebaseServiceAccountClientID,
        auth_uri: config.firebaseServiceAccountAuthURI,
        token_uri: config.firebaseServiceAccountTokenURI,
        auth_provider_x509_cert_url: config.firebaseServiceAccountAuthProviderX509CertURL,
        client_x509_cert_url: config.firebaseServiceAccountClientX509CertURL,
        universe_domain: config.firebaseServiceAccountUniverseDomain
    }
    console.log(serviceAccount)

    try {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            })
            console.log("Firebase Admin initialized")
        }
    } catch (err) {
        console.error("Error initializing Firebase Admin:", err)
        throw err
    }

    const rawBody = await readRawBody(event)
    const stripe = new Stripe(config.stripeSecretKey)
    const signature = getHeaders(event)["stripe-signature"]
    if (!signature || !rawBody) {
        throw createError({ statusCode: 400, message: "Invalid webhook payload or signature." })
    }

    let stripeWebhookEvent
    try {
        stripeWebhookEvent = stripe.webhooks.constructEvent(rawBody, signature, config.stripeWebhookSecret)
    } 
    catch (error) {
        console.error("Webhook signature verification failed:", error.message)
        throw createError({ statusCode: 400, message: "Webhook signature verification failed." })
    }

    const firestore = admin.firestore()
    const usersCollection = firestore.collection('users')
    const usersDocs = await usersCollection.get()
    let firestoreUserID = ''

    for (const user of usersDocs.docs) {
        if (user.data().stripeCustomerID && (user.data().stripeCustomerID == stripeWebhookEvent.data.object.customer)) firestoreUserID = user.data().userID
        if (firestoreUserID) break
    }

    if (!firestoreUserID) {
        console.error("No user found for customer ID:", stripeWebhookEvent.data.object.customer)
        return { status: 404, message: "Corresponding userID not found in Firestore.", users: usersDocs.docs }
    }

    try {
        switch (stripeWebhookEvent.type) {
            case "customer.subscription.created":
            case "customer.subscription.updated":
            case "customer.subscription.deleted":
                await handleSubscriptionChange()
                break
            default:
                console.log(`Unhandled event type: ${stripeWebhookEvent.type}`)
        }

        return { status: 200, message: "Webhook processed successfully" }
    } 
    catch (err) {
        console.error("Error handling webhook:", err.message)
        return { status: 400, message: `Webhook Error: ${err.message}` }
    }

    async function handleSubscriptionChange() {
        const subscriptionInfo = {
            subscriptionId: stripeWebhookEvent.data.object.id,
            subscriptionStatus: stripeWebhookEvent.data.object.status,
            subscriptionEndDate: stripeWebhookEvent.data.object.current_period_end,
            timestamp: stripeWebhookEvent.data.object.created
        }

        const userSpecificDoc = firestore.doc(`users/${firestoreUserID}`)
        await userSpecificDoc.update({
            subscriptionStatus: subscriptionInfo.subscriptionStatus,
            subscriptionEndDate: subscriptionInfo.subscriptionEndDate,
        })

        const stripeCollection = firestore.collection(`users/${firestoreUserID}/stripe`)
        await stripeCollection.add(subscriptionInfo)

        console.log("Subscription updated for user:", firestoreUserID, subscriptionInfo)
    }
})