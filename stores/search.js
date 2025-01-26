import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useFirestoreStore } from './firestore'

export const useSearchModeStore = defineStore('search', ()=>{
	// not exported
	const db = useFirestoreStore()

	// exported
	const searchMode = ref('pantry')
	const searchTerms = ref(new Set([]))
	const searchTermsForServer = ref(new Set([]))

	const currentRecipeResponseList = ref(new Set([]))
	const shoppingList = ref(new Set([]))

	const serverResponseList = ref({})
	const serverResponseRecipe = ref({})
	const serverResponseImage = ref({})

	const submittedRequest = ref(null)
	const requestFulfilled = ref(null)
	const additionalRequestFulfilled = ref(null)
	const isValidRequest = ref(null)

	const viewingSearchItems = ref(null)
	const viewingRecipeFromSearch = ref(null)
	const generatingRecipe = ref(null)

	const generatingShoppingList = ref(null)
	const generatedList = ref(null)

	const searchLimit = ref(false)
	const recipeGenLimit = ref(false)
	const generationLimit = ref(false)

	const sessionSearchResultsStore = ref(null)

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
	function clearCurrentRecipeResponseList(){
		currentRecipeResponseList.value.clear()
	}

	async function sendSearchTerms(){
		const userData = await db.fetchUser()
		if (!searchTermsForServer.value || searchTermsForServer.value.size == 0) return
		if (!searchLimit.value && (!userData.subscriptionStatus || userData.subscriptionStatus !== 'active')){
			let searches = 0
			await db.fetchHistoryItems()
			db.historyItems.forEach((item)=>{
				if (item.type == "Recipe Search" && (new Date(item.time).getMonth() == new Date(Date.now()).getMonth())){
					searches++
				}
			})
			if (searches >= 10) {
				searchLimit.value = true
				clearSearchTerms()
				clearServerSearchTerms()
				return
			}
		}

		if (!viewingSearchItems.value){
			clearCurrentRecipeResponseList()
		}

		if (currentRecipeResponseList.value.size > 0){
			additionalRequestFulfilled.value = false
		}
		else {
			requestFulfilled.value = false
		}
		submittedRequest.value = true

		const searchTermArray = Array.from(searchTermsForServer.value)
		const currentRecipeResponseListArray = Array.from(currentRecipeResponseList.value)

		sessionStorage.setItem('searchTerms', JSON.stringify(searchTermArray))

		await $fetch("/api/recipe-results", {
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
					responseList: currentRecipeResponseListArray,
				},
            }
        })
        .then((json) => {
			if (JSON.parse(json.generation.response.content).isValidRequest){
				if (currentRecipeResponseList.value.size > 0){
					JSON.parse(json.generation.response.content).recipes.forEach((item)=>{
						serverResponseList.value.recipes.push(item)
					}) 
				}
				else {
					serverResponseList.value = JSON.parse(json.generation.response.content)
	
				}
	
				JSON.parse(json.generation.response.content).recipes.forEach((recipe)=>{
					currentRecipeResponseList.value.add(recipe.recipeName)
				})
				isValidRequest.value = true
			}
			else {
				isValidRequest.value = false
			}

			requestFulfilled.value = true
			viewingSearchItems.value = true
			additionalRequestFulfilled.value = true

			const sessionSearchResultsArray = []

			serverResponseList.value.recipes.forEach((item)=>{
				sessionSearchResultsArray.push(JSON.stringify(item))
			})

			let searchResultsString = JSON.stringify(sessionSearchResultsArray)

			sessionStorage.setItem('searchResults', searchResultsString)
			sessionStorage.setItem('searchMode', searchMode.value)
			sessionStorage.setItem('validSearch', isValidRequest.value)

		})
		await navigateTo('/search')

		db.addHistoryItem({
			type: "Recipe Search",
			query: searchTermArray,
			time: Date.now()
		})
	}
	async function getRecipeDetails(recipe) {	
		const userData = await db.fetchUser()
		if (!recipeGenLimit.value && (!userData.subscriptionStatus || userData.subscriptionStatus !== 'active'))	{
			let generations = 0
			await db.fetchHistoryItems()
			db.historyItems.forEach((item)=>{
				if (item.type == "Recipe Generation" && (new Date(item.time).getMonth() == new Date(Date.now()).getMonth())){
					generations++
				}
			})
			if (generations >= 20) {
				recipeGenLimit.value = true
				clearSearchTerms()
				clearServerSearchTerms()
				searchMode.value = 'pantry'
				return
			}
		}

		submittedRequest.value = true
		requestFulfilled.value = false
		generatingRecipe.value = true

		let randomSlug = ''
		for (let num = 0; num < 17; num++){
			const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('')
			randomSlug += alpha[Math.floor(Math.random() * alpha.length)]
		}

		let newSlug = `/search/${randomSlug}+${recipe ? recipe.replaceAll(" ", "-") : 'random'}`
		sessionStorage.setItem('recipeSlug', newSlug)

		await navigateTo(newSlug)

		await $fetch("/api/recipe-details", {
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
			requestFulfilled.value = true
			viewingRecipeFromSearch.value = true
			generatingRecipe.value = false

			const sessionRecipeResultArray = []

			serverResponseRecipe.value.recipes.forEach((item)=>{
				sessionRecipeResultArray.push(JSON.stringify(item))
			})

			let recipeResultString = JSON.stringify(sessionRecipeResultArray)

			sessionStorage.setItem('recipeResult', recipeResultString)
			sessionStorage.setItem('recipeImage', JSON.stringify(serverResponseImage.value))
			sessionStorage.setItem('validRecipe', serverResponseRecipe.value.recipes[0] !== undefined)
		})

		db.addHistoryItem({
			type: "Recipe Generation",
			query: recipe ? recipe : "Random",
			time: Date.now()
		})
	}

	async function generateShoppingList(list, mode) {
		const userData = await db.fetchUser()
		if (!generationLimit.value && (!userData.subscriptionStatus || userData.subscriptionStatus !== 'active')){
			let listGenerations = 0
			await db.fetchHistoryItems()
			db.historyItems.forEach((item)=>{
				if (item.type == "Shopping List Generation" && (new Date(item.time).getMonth() == new Date(Date.now()).getMonth())){
					listGenerations++
				}
			})
			if (listGenerations >= 3) {
				generationLimit.value = true
				return
			}
		}

		generatingShoppingList.value = true
		const shoppingListArray = Array.from(list)

		await $fetch("/api/generate-list", {
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
					message: shoppingListArray,
					mode: mode,
				},
            }
        })
        .then((json) => {
			generatedList.value = JSON.parse(json.generation.response.content)
			generatingShoppingList.value = false
		})

		db.addHistoryItem({
			type: "Shopping List Generation",
			query: generatedList.value,
			time: Date.now()
		})
	}

	return { 
		searchMode, 
		searchTerms, 
		searchTermsForServer, 
		currentRecipeResponseList,
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
		isValidRequest,
		viewingSearchItems,
		viewingRecipeFromSearch,
		generatingRecipe,
		generatingShoppingList,
		generatedList,
		searchLimit,
		recipeGenLimit,
		generationLimit,
		sessionSearchResultsStore,
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
		clearCurrentRecipeResponseList,
		sendSearchTerms,
		getRecipeDetails,
		generateShoppingList
	}
})
