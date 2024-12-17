import { initializeApp, setLogLevel } from "firebase/app"
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics"

export default defineNuxtPlugin(async (nuxtApp) => {
    const config = useRuntimeConfig()
    
    const firebaseConfig = {
        apiKey: config.public.apiKey,
        authDomain: config.public.authDomain,
        projectId: config.public.projectId,
        storageBucket: config.public.storageBucket,
        messagingSenderId: config.public.messagingSenderId,
        appId: config.public.appId,
        measurementId: config.public.measurementId,
        googleApplicationCredentials: config.public.googleApplicationCredentials
    }

    const firebaseApp = initializeApp(firebaseConfig)

    const auth = getAuth(firebaseApp)
    const firestore = getFirestore(firebaseApp)
    const analytics = typeof window !== 'undefined' ? getAnalytics(firebaseApp) : null

    await setPersistence(auth, browserLocalPersistence).catch((error)=>{console.error('persistance error:', error)})

    nuxtApp.provide('firebase', { firebaseApp, auth, firestore, analytics })
})











