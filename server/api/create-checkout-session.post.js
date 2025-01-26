// // import { initializeApp, cert, getApps } from "firebase-admin/app"
// // import { getFirestore } from "firebase-admin/firestore"
// import Stripe from "stripe"
// import fetch from 'node-fetch'

// const config = useRuntimeConfig()
// // const serviceAccount = {
// //     type: config.firebaseServiceAccountType,
// //     project_id: config.firebaseServiceAccountProjectID,
// //     private_key_id: config.firebaseServiceAccountPrivateKeyID,
// //     private_key: config.firebaseServiceAccountPrivateKey.replace(/\\n/g, '\n'),
// //     client_email: config.firebaseServiceAccountClientEmail,
// //     client_id: config.firebaseServiceAccountClientID,
// //     auth_uri: config.firebaseServiceAccountAuthURI,
// //     token_uri: config.firebaseServiceAccountTokenURI,
// //     auth_provider_x509_cert_url: config.firebaseServiceAccountAuthProviderX509CertURL,
// //     client_x509_cert_url: config.firebaseServiceAccountClientX509CertURL,
// //     universe_domain: config.firebaseServiceAccountUniverseDomain
// // }

// // if (getApps().length < 1){
// //     try {
// //         initializeApp({
// //             credential: cert(serviceAccount)
// //         })
// //         console.log("Firebase Admin Initialized")
// //     } catch (err) {
// //         console.error("Error initializing Firebase Admin:", err)
// //         throw err
// //     }
// // }
// // const firestore = getFirestore()

// const stripe = new Stripe(config.stripeSecretKey, {
//     httpClient: Stripe.createFetchHttpClient(fetch)
// })

// export default defineEventHandler(async (event) => {
//     const body = await readBody(event)
//     if (!body.userId) throw new Error('User not authenticated.')

//     try {
//         // const currentUserDoc = firestore.doc(`users/${body.userId}`)
//         // const currentUser = await currentUserDoc.get()
//         // const currentUserData = currentUser.data()

//         let newCustomer
//         // if (!currentUserData?.stripeCustomerID) { 
//             newCustomer = await createStripeCustomer()
//         // }
//         async function createStripeCustomer(){
//             const customer = await stripe.customers.create({
//                 email: body.email,
//                 metadata: {
//                     firebaseUserId: body.userId
//                 }
//             })
//             // await currentUserDoc.update({ stripeCustomerID: customer.id })
//             console.log("New Customer ID created and saved:", customer.id);
//             return customer
//         }
    
//         const session = await stripe.checkout.sessions.create({
//             customer: newCustomer?.id,
//             payment_method_types: ['card'],
//             mode: 'subscription',
//             line_items: [
//                 {
//                     price: body.priceId,
//                     quantity: 1,
//                 },
//             ],
//             success_url: `${config.public.baseURL}/profile`,
//             cancel_url: `${config.public.baseURL}/pricing`,
//         })

//         // const currentUserStripeCollection = firestore.collection(`users/${body.userId}/stripe`)
//         // await currentUserStripeCollection.add({
//         //     sessionId: session.id,
//         //     created: new Date().toISOString(),
//         //     priceId: body.priceId,
//         //     status: session.status,
//         // })

//         return { url: session.url }
//     } 
//     catch (error) {
//         console.error(error)
//         throw createError({ statusCode: 500, statusMessage: error.message })
//     }
// })

import Stripe from "stripe";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";

const config = useRuntimeConfig();
const stripe = new Stripe(config.stripeSecretKey, {
    httpClient: Stripe.createFetchHttpClient(fetch),
});

const serviceAccount = {
    type: config.firebaseServiceAccountType,
    project_id: config.firebaseServiceAccountProjectID,
    private_key_id: config.firebaseServiceAccountPrivateKeyID,
    private_key: config.firebaseServiceAccountPrivateKey.replace(/\\n/g, "\n"),
    client_email: config.firebaseServiceAccountClientEmail,
    client_id: config.firebaseServiceAccountClientID,
    auth_uri: config.firebaseServiceAccountAuthURI,
    token_uri: config.firebaseServiceAccountTokenURI,
    auth_provider_x509_cert_url: config.firebaseServiceAccountAuthProviderX509CertURL,
    client_x509_cert_url: config.firebaseServiceAccountClientX509CertURL,
    universe_domain: config.firebaseServiceAccountUniverseDomain,
};

async function getAccessToken() {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        iss: serviceAccount.client_email,
        sub: serviceAccount.client_email,
        aud: "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 3600,
        scope: "https://www.googleapis.com/auth/cloud-platform",
    };

    const jwtToken = jwt.sign(payload, serviceAccount.private_key, { algorithm: "RS256" });

    const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: jwtToken,
        }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(`Failed to fetch access token: ${data.error}`);
    return data.access_token;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (!body.userId) throw new Error("User not authenticated.");

    try {
        const accessToken = await getAccessToken();

        // Fetch user document
        let userDoc;
        try {
            userDoc = await getUserDocument(body.userId, accessToken);
        } catch (err) {
            console.log("User document not found. Proceeding to create a new one.");
        }

        // Create Stripe customer if not found
        let stripeCustomerID = userDoc?.fields?.stripeCustomerID?.stringValue;
        if (!stripeCustomerID) {
            const customer = await stripe.customers.create({
                email: body.email,
                metadata: { firebaseUserId: body.userId },
            });

            stripeCustomerID = customer.id;

            // Update Firestore
            await updateUserDocument(body.userId, { stripeCustomerID }, accessToken);
        }

        // Create Stripe session
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerID,
            payment_method_types: ["card"],
            mode: "subscription",
            line_items: [
                {
                    price: body.priceId,
                    quantity: 1,
                },
            ],
            success_url: `${config.public.baseURL}/profile`,
            cancel_url: `${config.public.baseURL}/pricing`,
        });

        return { url: session.url };
    } catch (error) {
        console.error(error);
        throw createError({ statusCode: 500, statusMessage: error.message });
    }
});
