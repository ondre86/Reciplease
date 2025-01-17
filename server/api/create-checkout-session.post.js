import Stripe from 'stripe'
import admin from "firebase-admin"
import { getFirestore } from "firebase-admin/firestore"

const config = useRuntimeConfig()
const serviceAccount = {
    "type": config.firebaseServiceAccountType,
    "project_id": config.firebaseServiceAccountProjectID,
    "private_key_id": config.firebaseServiceAccountPrivateKeyID,
    "private_key": config.firebaseServiceAccountPrivateKey,
    "client_email": config.firebaseServiceAccountClientEmail,
    "client_id": config.firebaseServiceAccountClientID,
    "auth_uri": config.firebaseServiceAccountAuthURI,
    "token_uri": config.firebaseServiceAccountTokenURI,
    "auth_provider_x509_cert_url": config.firebaseServiceAccountAuthProviderX509CertURL,
    "client_x509_cert_url": config.firebaseServiceAccountClientX509CertURL,
    "universe_domain": config.firebaseServiceAccountUniverseDomain
}

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    if (!body.userId) throw new Error('User not authenticated.')

    const stripe = new Stripe(config.stripeSecretKey)
    const firestore = getFirestore()

    try {
        const currentUserDoc = firestore.doc(`users/${body.userId}`)
        const currentUserData = (await currentUserDoc.get()).data()

        let newCustomer
        if (!currentUserData.stripeCustomerID) newCustomer = await createStripeCustomer()
        async function createStripeCustomer(){
            const customer = await stripe.customers.create({
                email: body.email,
                metadata: {
                    firebaseUserId: body.userId
                }
            })
            await currentUserDoc.update({ stripeCustomerID: customer.id })
            console.log("New Customer ID created and saved:", customer.id);
            return customer
        }
    
        const session = await stripe.checkout.sessions.create({
            customer: newCustomer?.id ? newCustomer.id : currentUserData.stripeCustomerID,
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
                {
                    price: body.priceId,
                    quantity: 1,
                },
            ],
            success_url: `${config.public.baseURL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${config.public.baseURL}/pricing`,
        })

        const currentUserStripeCollection = firestore.collection(`users/${body.userId}/stripe`)
        await currentUserStripeCollection.add({
            sessionId: session.id,
            created: new Date().toISOString(),
            priceId: body.priceId,
            status: session.status,
        })

        return { url: session.url }
    } 
    catch (error) {
        console.error(error)
        throw createError({ statusCode: 500, statusMessage: error.message })
    }
})
