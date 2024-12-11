import { initializeApp, cert } from 'firebase-admin/app';

const config = useRuntimeConfig()

const serviceAccount = config.googleApplicationCredentials

export const firebaseAdminApp = initializeApp({
    credential: cert(serviceAccount),
})
