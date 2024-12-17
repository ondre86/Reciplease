import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useSearchModeStore } from './search'
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser, sendEmailVerification, updateEmail, updatePassword, verifyBeforeUpdateEmail, sendPasswordResetEmail } from "firebase/auth"

export const useAuthStore = defineStore('auth', ()=>{
    const searchStore = useSearchModeStore()

    const isInitialized = ref(false)
    const auth = ref(null)
	const user = ref(null)

    const displayName = ref(null)
    const dateCreated = ref(null)

    const authMsg = ref(null)
    const loadingState = ref(null)

    const initializeAuth = async () => {
        const { $firebase } = useNuxtApp()

        if (!$firebase || !$firebase.auth) {
            throw new Error('Firebase Auth is not initialized.')
        }

        auth.value = $firebase.auth

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
                resolve()
            })
        })
    }


    async function loginUser(email, password){
        try {
            loadingState.value = true
            user.value = await signInWithEmailAndPassword(auth.value, email, password)
            loadingState.value = false
            monitorAuthState()
            await navigateTo('/')
            authMsg.value = null
        } 
        catch (error) {
            loadingState.value = false
            console.error('Login failed:', error.code)
            authMsg.value = error
        }
    }
    async function createUser(email, password){
        try {
            loadingState.value = true
            user.value = await createUserWithEmailAndPassword(auth.value, email, password)
            loadingState.value = false
            monitorAuthState()
            sendEmailVerification(auth.value.currentUser)
            await navigateTo('/')
            authMsg.value = null
        } 
        catch (error) {
            console.error('Login failed:', error)
            authMsg.value = error
            loadingState.value = false
        }
    }
    async function signOutUser() {
        try {
            await signOut(auth.value)
            monitorAuthState()

            searchStore.viewingRecipeFromSearch = false
            searchStore.viewingSearchItems = false
            searchStore.submittedRequest = false
            searchStore.requestFulfilled = false
            searchStore.clearRecipeResponseList()
            
            await navigateTo('/')
            authMsg.value = null
        } 
        catch (error) {
            console.error('Error signing out:', error)
            authMsg.value = error
            loadingState.value = false
        }
    }
    async function deleteCurrentUser() {
        try {
            await deleteUser(auth.value.currentUser)
            monitorAuthState()
            await navigateTo('/')
            authMsg.value = null
        } 
        catch (error) {
            console.error('Error deleting user:', error)
            authMsg.value = error
            loadingState.value = false
        }
    }
    async function changeEmail(newEmail) {
        try {
            verifyBeforeUpdateEmail(auth.value.currentUser, newEmail)
            authMsg.value = "Verification email sent. Signing out..."
            loadingState.value = true
            setTimeout(() => {
                signOutUser()
                loadingState.value = false
            }, 5000)
        } 
        catch (error) {
            authMsg.value = error
        }
    }
    async function changePassword(newPassword) {
        try {
            loadingState.value = true
            updatePassword(auth.value.currentUser, newPassword)
            loadingState.value = false
            authMsg.value = "Successfully changed password."
        } 
        catch (error) {
            loadingState.value = false
            authMsg.value = error
        }
    }
    async function resetPassword(email) {
        try {
            loadingState.value = true
            sendPasswordResetEmail(auth.value, email)
            authMsg.value = "Password reset email sent."
			loadingState.value = false
        } 
        catch (error) {
            authMsg.value = error
        }
    }







	return { 
        isInitialized,
        auth,
		user,
        authMsg,
        loadingState,
        displayName,
        dateCreated,
        initializeAuth,
        monitorAuthState,
        createUser,
        loginUser,
        signOutUser,
        deleteCurrentUser,
        changeEmail,
        changePassword,
        resetPassword
	}
})
