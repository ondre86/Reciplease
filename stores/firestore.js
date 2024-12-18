import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import { collection, doc, setDoc, getDoc, getDocs, deleteDoc, onSnapshot } from 'firebase/firestore'

export const useFirestoreStore = defineStore('firestoreStore', () => {
    const recipes = ref([])
    const currentRecipe = ref({})

    const shoppingListItems = ref(new Set([]))
    const historyItems = ref([])

    const unsubscribe = ref(null)

    // Recipes

    const addRecipe = async (recipe) => {
        try {
            const { $firebase } = useNuxtApp()
            const authStore = useAuthStore()
            const userId = authStore.user?.uid

            if (!userId) throw new Error('User is not authenticated.')

            const userCollection = collection($firebase.firestore, `users/${userId}/recipes`)
            const recipeDoc = doc(userCollection)
            await setDoc(recipeDoc, recipe)

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
            recipes.value = recipes.value.sort((a,b)=>(b.time-a.time))
        } 
        catch (error) {
            console.error('Error fetching recipes:', error.message)
        }
    }

    const fetchRecipeById = async (recipeId) => {
        try {
            const { $firebase } = useNuxtApp()
            const authStore = useAuthStore()
            const userId = authStore.user?.uid
    
            if (!userId) throw new Error('User is not authenticated.')
    
            const recipeDoc = doc($firebase.firestore, `users/${userId}/recipes`, recipeId)
            const recipeSnap = await getDoc(recipeDoc)
    
            if (recipeSnap.exists()) {
                return { id: recipeSnap.id, ...recipeSnap.data() }
            } else {
                throw new Error('Recipe not found.')
            }
        } 
        catch (error) {
            console.error('Error fetching recipe:', error.message)
            throw error
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

            recipes.value = recipes.value.filter((recipe) => recipe.id !== recipeId) // Update local state
        } 
        catch (error) {
            console.error('Error deleting recipe:', error.message)
        }
    }


    // Shopping List

    const addListItem = async (listItem) => {
        try {
            const { $firebase } = useNuxtApp()
            const authStore = useAuthStore()
            const userId = authStore.user?.uid

            if (!userId) throw new Error('User is not authenticated.')

            const userCollection = collection($firebase.firestore, `users/${userId}/shoppingList`)
            const shoppingListDoc = doc(userCollection)
            await setDoc(shoppingListDoc, listItem)

            return true
        } 
        catch (error) {
            console.error('Error adding listItem:', error.message)
            return false
        }
    }

    const fetchListItems = async () => {
        try {
            const { $firebase } = useNuxtApp()
            const authStore = useAuthStore()
            const userId = authStore.user?.uid

            if (!userId) throw new Error('User is not authenticated.')

            const userCollection = collection($firebase.firestore, `users/${userId}/shoppingList`)
            const snapshot = await getDocs(userCollection)

            shoppingListItems.value = new Set(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        } 
        catch (error) {
            console.error('Error fetching shoppingListItems:', error.message)
        }
    }
    const deleteListItem = async (shoppingListItemId) => {
        try {
            const { $firebase } = useNuxtApp()
            const authStore = useAuthStore()
            const userId = authStore.user?.uid

            if (!userId) throw new Error('User is not authenticated.')

            const shoppingListDoc = doc($firebase.firestore, `users/${userId}/shoppingList/${shoppingListItemId}`)
            await deleteDoc(shoppingListDoc)


            shoppingListItems.value.forEach((item)=>{
                if (item.id == shoppingListItemId) shoppingListItems.value.delete(item)
            })

        } 
        catch (error) {
            console.error('Error deleting shoppingListItem:', error.message)
        }
    }

    const subscribeToShoppingList = () => {
        try {
            const { $firebase } = useNuxtApp()
            const authStore = useAuthStore()
            const userId = authStore.user?.uid

            if (!userId) throw new Error('User is not authenticated.')

            const userCollection = collection($firebase.firestore, `users/${userId}/shoppingList`)

            unsubscribe.value = onSnapshot(userCollection, (snapshot) => {
                shoppingListItems.value = new Set(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
            })
        } 
        catch (error) {
            console.error('Error setting up subscription:', error.message)
        }
    }

    const unsubscribeFromShoppingList = () => {
        if (unsubscribe.value) {
            unsubscribe.value()
            unsubscribe.value = null
        }
    }

    // History

    const addHistoryItem = async (historyItem) => {
        try {
            const { $firebase } = useNuxtApp()
            const authStore = useAuthStore()
            const userId = authStore.user?.uid

            if (!userId) throw new Error('User is not authenticated.')

            const userCollection = collection($firebase.firestore, `users/${userId}/history`)
            const historyDoc = doc(userCollection)
            await setDoc(historyDoc, historyItem)

            return true
        } 
        catch (error) {
            console.error('Error adding historyItem:', error.message)
            return false
        }
    }

    const fetchHistoryItems = async () => {
        try {
            const { $firebase } = useNuxtApp()
            const authStore = useAuthStore()
            const userId = authStore.user?.uid

            if (!userId) throw new Error('User is not authenticated.')

            const userCollection = collection($firebase.firestore, `users/${userId}/history`)
            const snapshot = await getDocs(userCollection)

            historyItems.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
            historyItems.value = historyItems.value.sort((a,b)=>{return b.time-a.time})
        } 
        catch (error) {
            console.error('Error fetching historyItems:', error.message)
        }
    }

    return {
        recipes,
        currentRecipe,
        shoppingListItems,
        historyItems,
        addRecipe,
        fetchRecipes,
        fetchRecipeById,
        subscribeToShoppingList,
        unsubscribeFromShoppingList,
        deleteRecipe,
        addListItem,
        fetchListItems,
        deleteListItem,
        addHistoryItem,
        fetchHistoryItems
    }
})
