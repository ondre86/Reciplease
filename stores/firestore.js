import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { collection, doc, setDoc, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore'

export const useFirestoreStore = defineStore('firestoreStore', () => {
    const recipes = ref([]) // Reactive state for user recipes
    const unsubscribe = ref(null) // For cleaning up listeners

    const resultMsg = ref(null)

    const addRecipe = async (recipe) => {
        try {
            const { $firebase } = useNuxtApp()
            console.log($firebase.firestore)
            const authStore = useAuthStore()
            const userId = authStore.user?.uid

            if (!userId) throw new Error('User is not authenticated.')

            const userCollection = collection($firebase.firestore, `users/${userId}/recipes`)
            const recipeDoc = doc(userCollection)
            await setDoc(recipeDoc, recipe)

            console.log('Recipe added successfully:', recipeDoc.id)
            return true
        } 
        catch (error) {
            console.error('Error adding recipe:', error.message)
            return false
        }
    }

    const fetchRecipes = async () => {
        try {
            const { $firebase } = useNuxtApp()
            const authStore = useAuthStore()
            const userId = authStore.user?.uid

            if (!userId) throw new Error('User is not authenticated.')

            const userCollection = collection($firebase.firestore, `users/${userId}/recipes`)
            const snapshot = await getDocs(userCollection)

            recipes.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            console.log('Recipes fetched successfully:', recipes.value)
        } 
        catch (error) {
            console.error('Error fetching recipes:', error.message)
        }
    }

    const subscribeToRecipes = () => {
        try {
            const { $firebase } = useNuxtApp()
            const authStore = useAuthStore()
            const userId = authStore.user?.uid

            if (!userId) throw new Error('User is not authenticated.')

            const userCollection = collection($firebase.firestore, `users/${userId}/recipes`)

            unsubscribe.value = onSnapshot(userCollection, (snapshot) => {
                recipes.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                console.log('Real-time update received:', recipes.value)
            })
        } 
        catch (error) {
            console.error('Error setting up subscription:', error.message)
        }
    }

    const unsubscribeFromRecipes = () => {
        if (unsubscribe.value) {
        unsubscribe.value()
        unsubscribe.value = null
        console.log('Unsubscribed from real-time updates.')
        }
    }

    const deleteRecipe = async (recipeId) => {
        try {
            const { $firebase } = useNuxtApp()
            const authStore = useAuthStore()
            const userId = authStore.user?.uid

            if (!userId) throw new Error('User is not authenticated.')

            const recipeDoc = doc($firebase.firestore, `users/${userId}/recipes/${recipeId}`)
            await deleteDoc(recipeDoc)

            console.log('Recipe deleted successfully:', recipeId)
            recipes.value = recipes.value.filter((recipe) => recipe.id !== recipeId) // Update local state
        } 
        catch (error) {
            console.error('Error deleting recipe:', error.message)
        }
    }
    const currentRecipe = ref({})

    return {
        recipes,
        currentRecipe,
        addRecipe,
        fetchRecipes,
        subscribeToRecipes,
        unsubscribeFromRecipes,
        deleteRecipe,
    }
})
