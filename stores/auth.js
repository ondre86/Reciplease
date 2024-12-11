import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, onAuthStateChanged } from "firebase/auth"


export const useAuthStore = defineStore('auth', ()=>{
    const isInitialized = ref(false)
    const auth = ref(null)

	const user = ref(null)
    const displayName = ref(null)
    const dateCreated = ref(null)

    const authError = ref(null)

    const getFirebaseAuth = () => {
        const { $firebase } = useNuxtApp()
        if (!$firebase || !$firebase.auth) {
            throw new Error('Firebase Auth is not initialized.')
        }
        return $firebase.auth
    }


    const monitorAuthState = () => {
        auth.value = getFirebaseAuth()
        if (auth.value) {
            onAuthStateChanged(auth.value, (currentUser) => {
                user.value = currentUser

                displayName.value = user.value ? (user.value.displayName ? user.value.displayName : user.value.email) : ''
                dateCreated.value = user.value ? new Date(Number(user.value.metadata.createdAt)).toLocaleString() : ''

                console.log(user.value)
                console.log(auth.value)
            })
        }
    }
    


    async function loginUser(email, password){
        try {
            auth.value = getFirebaseAuth()
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
            auth.value = getFirebaseAuth()
            user.value = await createUserWithEmailAndPassword(auth.value, email, password)
            console.log('User created:', user.value.user)
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
            auth.value = getFirebaseAuth()
            await signOut(auth.value)
            console.log('User signed out')
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
                auth.value = getFirebaseAuth()
                await deleteUser(auth.currentUser)
                console.log('User deleted')
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
    async function getAuth() {
        return auth.value
    }



	return { 
        isInitialized,
        authError,
		user,
        auth,
        displayName,
        dateCreated,
        monitorAuthState,
        getAuth,
        loginUser,
        createUser,
        signOutUser,
        deleteCurrentUser
	}
})
