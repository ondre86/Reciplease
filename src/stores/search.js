import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchModeStore = defineStore('search', ()=>{
	const searchMode = ref('pantry')
	const searchTerms = ref(new Set([]))
	const searchTermsForServer = ref(new Set([]))

	const recipeListResponse = ref(new Set([]))
	const specificRecipe = ref(null)
	const shoppingList = ref(new Set([]))

	const generatedResponse = ref({})

	const submittedRequest = ref(null)
	const requestFulfilled = ref(null)
	const viewingSearchItems = ref(null)
	const viewingRecipeFromSearch = ref(null)


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

	async function sendSearchTerms(){
		submittedRequest.value = true
		const searchTermArray = Array.from(searchTermsForServer.value)
		const shoppingListArray = Array.from(shoppingList.value)
		const recipeListResponseArray = Array.from(recipeListResponse.value)

		await fetch(import.meta.env.VITE_SERVER_URL, {
            method: "POST",
			// headers: auth tokens
            body: JSON.stringify({
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
					shoppingList: shoppingListArray,
					responseList: recipeListResponseArray,
					specificRecipe: specificRecipe.value
				},
            })
        })
        .then(response => response.json())
        .then((json) => {
			// generatedResponse.value = JSON.parse(json.generation.response.content)
			console.log(generatedResponse.value)
		})
		.then(
			setTimeout(() => {
				requestFulfilled.value = true
				viewingSearchItems.value = true
			}, 3000)
		)
	}

	return { 
		searchMode, 
		searchTerms, 
		searchTermsForServer, 
		recipeListResponse,
		specificRecipe,
		shoppingList,
		generatedResponse,
		getSearchMode, 
		getSearchTerms, 
		getServerSearchTerms,
		getShoppingList,
		submittedRequest,
		requestFulfilled,
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
		sendSearchTerms 
	}
})
