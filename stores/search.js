import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirestoreStore } from './firestore'

export const useSearchModeStore = defineStore('search', ()=>{
	const searchMode = ref('pantry')
	const searchTerms = ref(new Set([]))
	const searchTermsForServer = ref(new Set([]))

	const recipeResponseList = ref(new Set([]))
	const shoppingList = ref(new Set([]))

	const serverResponseList = ref({})
	const serverResponseRecipe = ref({})
	const serverResponseImage = ref({})

	const submittedRequest = ref(null)
	const requestFulfilled = ref(null)
	const additionalRequestFulfilled = ref(null)

	const viewingSearchItems = ref(null)
	const viewingRecipeFromSearch = ref(null)

	const db = useFirestoreStore()

	const getSearchMode = computed(()=>{
		return searchMode.value
	})
	const getSearchTerms = computed(()=>{
		return searchTerms.value
	})
	const getServerSearchTerms = computed(()=>{
		return searchTermsForServer.value
	})
	const getShoppingList = computed(()=>{
		return shoppingList.value
	})
	
	function changeSearchMode(mode){
		searchMode.value = mode
	}
	function addSearchTerm(term){
		searchTerms.value.add(term)
	}
	function addServerSearchTerm(term){
		searchTermsForServer.value.add(term)
	}
	function addItemToShoppingList(item){
		shoppingList.value.add(item)
	}
	function deleteSearchTerm(term){
		searchTerms.value.delete(term)
	}
	function deleteServerSearchTerm(term){
		searchTermsForServer.value.delete(term)
	}
	function deleteShoppingListItem(item){
		shoppingList.value.delete(item)
	}
	function clearSearchTerms(){
		searchTerms.value.clear()
	}
	function clearServerSearchTerms(){
		searchTermsForServer.value.clear()
	}
	function clearShoppingList(){
		shoppingList.value.clear()
	}
	function clearRecipeResponseList(){
		recipeResponseList.value.clear()
	}

	async function sendSearchTerms(){
		submittedRequest.value = true

		if (recipeResponseList.value.size > 0){
			additionalRequestFulfilled.value = false
		}

		const searchTermArray = Array.from(searchTermsForServer.value)
		const recipeResponseListArray = Array.from(recipeResponseList.value)

		const data = await $fetch("/api/recipe-results", {
            method: "POST",
			// headers: auth tokens
            body: {
				client:{
					location: {
						ip: '',
						location: ''
					},

					time: {
						requestTimestamp: new Date().toUTCString(),
						requestDate: new Date().toLocaleDateString(),
						requestTime: new Date().toLocaleTimeString(),
					},
				
					browser: {
						browserVersion: navigator.userAgent,
						browserLanguage: navigator.language,
						browserOnline: navigator.onLine,
						page: window.location.origin,
						referrer: document.referrer,
						previousSitesAmount: history.length,
					},

					storage: {
						cookiesEnabled: navigator.cookieEnabled,
						cookies: document.cookie.split(';'),
						localStorage: localStorage
					},

					device: {
						sizeScreenW: screen.width,
						sizeScreenH: screen.height,
						sizeDocW: document.width,
						sizeDocH: document.height,
						sizeInW: innerWidth,
						sizeInH: innerHeight,
						sizeAvailW: screen.availWidth,
						sizeAvailH: screen.availHeight
					}
			
				},
				request:{
					message: searchTermArray,
					mode: searchMode.value,
					responseList: recipeResponseListArray,
				},
            }
        })
        .then((json) => {
			if (recipeResponseList.value.size > 0){
				JSON.parse(json.generation.response.content).recipes.forEach((item)=>{
					serverResponseList.value.recipes.push(item)
				}) 
			}
			else {
				serverResponseList.value = JSON.parse(json.generation.response.content)

			}

			JSON.parse(json.generation.response.content).recipes.forEach((recipe)=>{
				recipeResponseList.value.add(recipe.recipeName)
			})

			console.log(serverResponseList.value)
			requestFulfilled.value = true
			viewingSearchItems.value = true
			additionalRequestFulfilled.value = true
		})
	}
	async function getRecipeDetails(recipe) {
		submittedRequest.value = true
		requestFulfilled.value = false

		const recipeDetails = await $fetch("/api/recipe-details", {
            method: "POST",
			// headers: auth tokens
            body: {
				client:{
					location: {
						ip: '',
						location: ''
					},

					time: {
						requestTimestamp: new Date().toUTCString(),
						requestDate: new Date().toLocaleDateString(),
						requestTime: new Date().toLocaleTimeString(),
					},
				
					browser: {
						browserVersion: navigator.userAgent,
						browserLanguage: navigator.language,
						browserOnline: navigator.onLine,
						page: window.location.origin,
						referrer: document.referrer,
						previousSitesAmount: history.length,
					},

					storage: {
						cookiesEnabled: navigator.cookieEnabled,
						cookies: document.cookie.split(';'),
						localStorage: localStorage
					},

					device: {
						sizeScreenW: screen.width,
						sizeScreenH: screen.height,
						sizeDocW: document.width,
						sizeDocH: document.height,
						sizeInW: innerWidth,
						sizeInH: innerHeight,
						sizeAvailW: screen.availWidth,
						sizeAvailH: screen.availHeight
					}
			
				},
				request:{
					message: recipe,
					mode: searchMode.value,
				},
            }
        })
        .then((json) => {
			serverResponseRecipe.value = JSON.parse(json.generation.response.content)
			serverResponseImage.value = json.generation.image
			console.log(serverResponseRecipe.value)
			console.log(serverResponseImage.value)
			requestFulfilled.value = true
			viewingRecipeFromSearch.value = true
		})
	}

	return { 
		searchMode, 
		searchTerms, 
		searchTermsForServer, 
		recipeResponseList,
		shoppingList,
		serverResponseList,
		serverResponseRecipe,
		serverResponseImage,
		getSearchMode, 
		getSearchTerms, 
		getServerSearchTerms,
		getShoppingList,
		submittedRequest,
		requestFulfilled,
		additionalRequestFulfilled,
		viewingSearchItems,
		viewingRecipeFromSearch,
		changeSearchMode, 
		addSearchTerm, 
		addServerSearchTerm, 
		addItemToShoppingList,
		deleteSearchTerm, 
		deleteServerSearchTerm, 
		deleteShoppingListItem,
		clearSearchTerms,
		clearServerSearchTerms,
		clearShoppingList,
		clearRecipeResponseList,
		sendSearchTerms,
		getRecipeDetails
	}
})
