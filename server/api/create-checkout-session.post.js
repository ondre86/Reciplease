import { initializeApp, cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
// import Stripe from "stripe"

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
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

    const body = await readBody(event)
    if (!body.userId) throw new Error('User not authenticated.')

    return {
        b: body,
        a: serviceAccount.token_uri
    }

    // try {
    //     initializeApp({
    //         credential: cert(serviceAccount)
    //     })
    //     console.log("Firebase Admin initialized")
    // } catch (err) {
    //     console.error("Error initializing Firebase Admin:", err)
    //     throw err
    // }

    // // const stripe = new Stripe(config.stripeSecretKey, {
    // //     httpClient: Stripe.createFetchHttpClient()
    // // })
    // const firestore = getFirestore()

    // return {
    //     d: body,
    //     cols: await firestore.listCollections()
    // }

    // try {
    //     const currentUserDoc = firestore.doc(`users/${body.userId}`)
    //     const currentUser = await currentUserDoc.get()
    //     const currentUserData = currentUser.data()

    //     let newCustomer
    //     if (!currentUserData?.stripeCustomerID) { 
    //         newCustomer = await createStripeCustomer()
    //     }
    //     async function createStripeCustomer(){
    //         const customer = await stripe.customers.create({
    //             email: body.email,
    //             metadata: {
    //                 firebaseUserId: body.userId
    //             }
    //         })
    //         await currentUserDoc.update({ stripeCustomerID: customer.id })
    //         console.log("New Customer ID created and saved:", customer.id);
    //         return customer
    //     }
    
    //     const session = await stripe.checkout.sessions.create({
    //         customer: newCustomer?.id ? newCustomer?.id : currentUserData?.stripeCustomerID,
    //         payment_method_types: ['card'],
    //         mode: 'subscription',
    //         line_items: [
    //             {
    //                 price: body.priceId,
    //                 quantity: 1,
    //             },
    //         ],
    //         success_url: `${config.public.baseURL}/profile`,
    //         cancel_url: `${config.public.baseURL}/pricing`,
    //     })

    //     const currentUserStripeCollection = firestore.collection(`users/${body.userId}/stripe`)
    //     await currentUserStripeCollection.add({
    //         sessionId: session.id,
    //         created: new Date().toISOString(),
    //         priceId: body.priceId,
    //         status: session.status,
    //     })

    //     return { url: session.url }
    // } 
    // catch (error) {
    //     console.error(error)
    //     throw createError({ statusCode: 500, statusMessage: error.message })
    // }
})
