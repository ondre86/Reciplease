// import { initializeApp, cert, getApps } from "firebase-admin/app"
// import { getFirestore } from "firebase-admin/firestore"
// import Stripe from "stripe"
// import fetch from 'node-fetch'

// const config = useRuntimeConfig()
// const serviceAccount = {
//     type: config.firebaseServiceAccountType,
//     project_id: config.firebaseServiceAccountProjectID,
//     private_key_id: config.firebaseServiceAccountPrivateKeyID,
//     private_key: config.firebaseServiceAccountPrivateKey.replace(/\\n/g, '\n'),
//     client_email: config.firebaseServiceAccountClientEmail,
//     client_id: config.firebaseServiceAccountClientID,
//     auth_uri: config.firebaseServiceAccountAuthURI,
//     token_uri: config.firebaseServiceAccountTokenURI,
//     auth_provider_x509_cert_url: config.firebaseServiceAccountAuthProviderX509CertURL,
//     client_x509_cert_url: config.firebaseServiceAccountClientX509CertURL,
//     universe_domain: config.firebaseServiceAccountUniverseDomain
// }

// if (getApps().length < 1){
//     try {
//         initializeApp({
//             credential: cert(serviceAccount)
//         })
//         console.log("Firebase Admin initialized")
//     } catch (err) {
//         console.error("Error initializing Firebase Admin:", err)
//         throw err
//     }
// }

// export default defineEventHandler(async (event) => {
//     const rawBody = await readRawBody(event)
//     const stripe = new Stripe(config.stripeSecretKey, {
//         httpClient: Stripe.createFetchHttpClient(fetch)
//     })
//     const signature = getHeaders(event)["stripe-signature"]
//     if (!signature || !rawBody) {
//         throw createError({ statusCode: 400, message: "Invalid webhook payload or signature." })
//     }

//     let stripeWebhookEvent
//     try {
//         stripeWebhookEvent = stripe.webhooks.constructEventAsync(rawBody, signature, config.stripeWebhookSecret)
//     } 
//     catch (error) {
//         console.error("Webhook signature verification failed:", error.message)
//         throw createError({ statusCode: 400, message: "Webhook signature verification failed." })
//     }

//     const firestore = getFirestore()
//     const usersCollection = firestore.collection('users')
//     const usersDocs = await usersCollection.get()
//     let firestoreUserID = ''

//     for (const user of usersDocs.docs) {
//         if (user.data().stripeCustomerID && (user.data().stripeCustomerID == stripeWebhookEvent.data.object.customer)) firestoreUserID = user.data().userID
//         if (firestoreUserID) break
//     }

//     if (!firestoreUserID) {
//         console.error("No user found for customer ID:", stripeWebhookEvent.data.object.customer)
//         return { status: 404, message: "Corresponding userID not found in Firestore.", users: usersDocs.docs }
//     }

//     try {
//         switch (stripeWebhookEvent.type) {
//             case "customer.subscription.created":
//             case "customer.subscription.updated":
//             case "customer.subscription.deleted":
//                 await handleSubscriptionChange()
//                 break
//             default:
//                 console.log(`Unhandled event type: ${stripeWebhookEvent.type}`)
//         }

//         return { status: 200, message: "Webhook processed successfully" }
//     } 
//     catch (err) {
//         console.error("Error handling webhook:", err.message)
//         return { status: 400, message: `Webhook Error: ${err.message}` }
//     }

//     async function handleSubscriptionChange() {
//         const subscriptionInfo = {
//             subscriptionId: stripeWebhookEvent.data.object.id,
//             subscriptionStatus: stripeWebhookEvent.data.object.status,
//             subscriptionEndDate: stripeWebhookEvent.data.object.current_period_end,
//             timestamp: stripeWebhookEvent.data.object.created
//         }

//         const userSpecificDoc = firestore.doc(`users/${firestoreUserID}`)
//         await userSpecificDoc.update({
//             subscriptionStatus: subscriptionInfo.subscriptionStatus,
//             subscriptionEndDate: subscriptionInfo.subscriptionEndDate,
//         })

//         const stripeCollection = firestore.collection(`users/${firestoreUserID}/stripe`)
//         await stripeCollection.add(subscriptionInfo)

//         console.log("Subscription updated for user:", firestoreUserID, subscriptionInfo)
//     }
// })

import Stripe from "stripe";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";

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

// Function to get access token for Firebase REST API
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

// Firebase REST API helpers
async function getAllUsers(accessToken) {
  const url = `https://firestore.googleapis.com/v1/projects/${serviceAccount.project_id}/databases/(default)/documents/users`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) throw new Error(`Error fetching users: ${response.statusText}`);
  const data = await response.json();
  return data.documents || [];
}

async function updateUserDocument(userId, data, accessToken) {
  const url = `https://firestore.googleapis.com/v1/projects/${serviceAccount.project_id}/databases/(default)/documents/users/${userId}?updateMask.fieldPaths=subscriptionStatus&updateMask.fieldPaths=subscriptionEndDate`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        subscriptionStatus: { stringValue: data.subscriptionStatus },
        subscriptionEndDate: { integerValue: data.subscriptionEndDate },
      },
    }),
  });

  if (!response.ok) throw new Error(`Error updating user document: ${response.statusText}`);
}

async function addStripeRecord(userId, record, accessToken) {
  const url = `https://firestore.googleapis.com/v1/projects/${serviceAccount.project_id}/databases/(default)/documents/users/${userId}/stripe`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        subscriptionId: { stringValue: record.subscriptionId },
        subscriptionStatus: { stringValue: record.subscriptionStatus },
        subscriptionEndDate: { integerValue: record.subscriptionEndDate },
        timestamp: { integerValue: record.timestamp },
      },
    }),
  });

  if (!response.ok) throw new Error(`Error adding stripe record: ${response.statusText}`);
}

export default defineEventHandler(async (event) => {
  const rawBody = await readRawBody(event);
  const signature = getHeaders(event)["stripe-signature"];
  if (!signature || !rawBody) {
    throw createError({ statusCode: 400, message: "Invalid webhook payload or signature." });
  }

  let stripeWebhookEvent;
  try {
    stripeWebhookEvent = await stripe.webhooks.constructEventAsync(
      rawBody,
      signature,
      config.stripeWebhookSecret
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    throw createError({ statusCode: 400, message: "Webhook signature verification failed." });
  }

  const accessToken = await getAccessToken();
  const users = await getAllUsers(accessToken);
  let firestoreUserID = "";

  // Find the user matching the Stripe customer ID
  for (const user of users) {
    const userData = user.fields;
    if (userData.stripeCustomerID?.stringValue === stripeWebhookEvent.data.object.customer) {
      firestoreUserID = user.name.split("/").pop();
      break;
    }
  }

  if (!firestoreUserID) {
    console.error("No user found for customer ID:", stripeWebhookEvent.data.object.customer);
    return { status: 404, message: "Corresponding userID not found in Firestore." };
  }

  try {
    switch (stripeWebhookEvent.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        await handleSubscriptionChange();
        break;
      default:
        console.log(`Unhandled event type: ${stripeWebhookEvent.type}`);
    }

    return { status: 200, message: "Webhook processed successfully" };
  } catch (err) {
    console.error("Error handling webhook:", err.message);
    return { status: 400, message: `Webhook Error: ${err.message}` };
  }

  async function handleSubscriptionChange() {
    const subscriptionInfo = {
      subscriptionId: stripeWebhookEvent.data.object.id,
      subscriptionStatus: stripeWebhookEvent.data.object.status,
      subscriptionEndDate: stripeWebhookEvent.data.object.current_period_end,
      timestamp: stripeWebhookEvent.data.object.created,
    };

    // Update user document
    await updateUserDocument(firestoreUserID, subscriptionInfo, accessToken);

    // Add stripe record
    await addStripeRecord(firestoreUserID, subscriptionInfo, accessToken);

    console.log("Subscription updated for user:", firestoreUserID, subscriptionInfo);
  }
});
