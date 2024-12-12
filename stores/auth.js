import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getAuth, GoogleAuthProvider, signInWithRedirect, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, getRedirectResult } from "firebase/auth"


export const useAuthStore = defineStore('auth', ()=>{
    const isInitialized = ref(false)
    const auth = ref(null)
    const googleProvider = ref(null)
	const user = ref(null)

    const displayName = ref(null)
    const dateCreated = ref(null)

    const authError = ref(null)

    const initializeAuth = async () => {
        const { $firebase } = useNuxtApp()

        if (!$firebase || !$firebase.auth) {
            throw new Error('Firebase Auth is not initialized.')
        }

        auth.value = $firebase.auth

        getRedirectResult(auth.value)
            .then((result)=>{
                if (result?.user) {
                    user.value = result.user
                    console.log('User signed in via redirect:', result.user)
                }
            })
            .catch((error) => {
                console.error('Error getting redirect result:', error)
            })

        return new Promise((resolve) => {
            onAuthStateChanged(auth.value, async (currentUser) => {
                if (currentUser) {
                    user.value = currentUser
                } 
                else {
                    user.value = null
                }
                isInitialized.value = true

                displayName.value = user.value ? (user.value.displayName ? user.value.displayName : user.value.email) : ''
                dateCreated.value = user.value ? new Date(Number(user.value.metadata.createdAt)).toLocaleString() : ''

                resolve()
            })
        })
    }
    initializeAuth()


    const monitorAuthState = () => {
        if (!auth.value) initializeAuth()

        return new Promise((resolve) => {
            onAuthStateChanged(auth.value, (currentUser) => {
                user.value = currentUser
                console.log('Auth state changed:', currentUser)
                resolve()
            })
        })
    }
    
    const signInWithGoogle = async () => {
        const { $firebase } = useNuxtApp()
        auth.value = $firebase.auth
        const googleProvider = new GoogleAuthProvider()

        try {
            await signInWithRedirect(auth.value, googleProvider)
            await navigateTo('/profile')
            console.log('Google Sign-In successful:', userCredential)
        } 
        catch (error) {
            console.error('Error during Google Sign-In:', error)
            throw error
        }
      }

    async function loginUser(email, password){
        try {
            user.value = await signInWithEmailAndPassword(auth.value, email, password)
            console.log('User logged in:', user.value.user)
            monitorAuthState()
            await navigateTo('/')
            authError.value = null
        } 
        catch (error) {
            console.error('Login failed:', error.code)
            authError.value = error
        }
    }
    async function createUser(email, password){
        try {
            user.value = await createUserWithEmailAndPassword(auth.value, email, password)
            console.log('User created:', user.value.user)
            monitorAuthState()
            await navigateTo('/')
            authError.value = null
        } 
        catch (error) {
            console.error('Login failed:', error)
            authError.value = error

        }
    }
    async function signOutUser() {
        try {
            await signOut(auth.value)
            console.log('User signed out')
            monitorAuthState()
            await navigateTo('/')
            authError.value = null
        } 
        catch (error) {
            console.error('Error signing out:', error)
            authError.value = error

        }
    }
    async function deleteCurrentUser() {
        if (auth.currentUser) {
            try {
                await deleteUser(auth.currentUser)
                console.log('User deleted')
                monitorAuthState()
                await navigateTo('/')
                authError.value = null
            } 
            catch (error) {
                console.error('Error deleting user:', error)
                authError.value = error

            }
        } 
        else {
            console.error('No user is currently signed in')
        }
    }
    async function returnAuth() {
        return auth.value
    }



	return { 
        isInitialized,
        authError,
		user,
        auth,
        displayName,
        dateCreated,
        initializeAuth,
        monitorAuthState,
        returnAuth,
        createUser,
        loginUser,
        signOutUser,
        deleteCurrentUser,
        signInWithGoogle
	}
})
