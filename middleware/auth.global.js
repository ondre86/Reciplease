import { useAuthStore } from "~/stores/auth"
import { useSearchModeStore } from "~/stores/search"

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.server) return

    const userStore = useAuthStore()
	const searchStore = useSearchModeStore()

	const toast = useToast()

	if (!userStore.isInitialized) {
		await userStore.initializeAuth()
	}

	if (!userStore.user && to.meta.requiresAuth) {
		return navigateTo('/auth')
	}

	if (userStore.user && to.path == '/auth'){
		return navigateTo('/profile')
	}

	// back from recipe to search
	if ((from.path == sessionStorage.getItem('recipeSlug')) && to.path == '/search'){
		searchStore.viewingRecipeFromSearch = false
		searchStore.viewingSearchItems = true

		if (!searchStore.serverResponseList.recipes){
			let savedSearchResults = JSON.parse(sessionStorage.getItem("searchResults"))
		
			if (savedSearchResults){
				let parsedSavedSearchResults = []
				savedSearchResults.forEach((item)=>{
					parsedSavedSearchResults.push(JSON.parse(item))
				})
		
				searchStore.submittedRequest = true
				searchStore.requestFulfilled = true
				searchStore.additionalRequestFulfilled = true
				searchStore.isValidRequest = true
				searchStore.viewingSearchItems = true
				searchStore.searchMode = sessionStorage.getItem("searchMode")
				searchStore.serverResponseList.recipes = parsedSavedSearchResults
			}
			else{
				await navigateTo('/')
			}
		}
	}
	// forward from search to recipe
	if (from.path.includes('/search') && (to.path == sessionStorage.getItem('recipeSlug'))){
		console.log(sessionStorage.getItem('recipeSlug'))

		searchStore.viewingRecipeFromSearch = true
		searchStore.viewingSearchItems = false

		// GET FROM SESSION STORAGE
		if (!searchStore.serverResponseRecipe.recipes && !searchStore.generatingRecipe){
			let recipeResult = JSON.parse(sessionStorage.getItem("recipeResult"))
		
			if (recipeResult){
				let parsedRecipeResult = []
				recipeResult.forEach((item)=>{
					parsedRecipeResult.push(JSON.parse(item))
				})
		
				searchStore.submittedRequest = true
				searchStore.requestFulfilled = true
				searchStore.isValidRequest = true
				searchStore.viewingRecipeFromSearch = true
				searchStore.searchMode = sessionStorage.getItem("searchMode")
				searchStore.serverResponseRecipe.recipes = parsedRecipeResult
				searchStore.serverResponseImage = JSON.parse(sessionStorage.getItem("recipeImage"))
			}
			else{
				await navigateTo('/search')
			}
		}
	}
	// back from search to home
	if (from.path.includes('/search') && to.path == '/'){
		searchStore.viewingRecipeFromSearch = false
		searchStore.viewingSearchItems = false
	}
	// forward from home to search
	if (from.path == '/' && to.path == '/search'){
		searchStore.viewingRecipeFromSearch = false
		searchStore.viewingSearchItems = true
	}
	// back from random recipe to home
	if ((from.path.includes('/search') && from.path.includes('+')) && to.path == '/'){
		searchStore.viewingRecipeFromSearch = false
		searchStore.viewingSearchItems = false
	}
	// forward from home to random recipe
	if (from.path == '/' && (to.path.includes('/search') && to.path.includes('+')) && searchStore.submittedRequest){
		searchStore.viewingRecipeFromSearch = true
		searchStore.viewingSearchItems = false
	}

	// leave search toast
	if ((searchStore.viewingSearchItems) && !to.path.includes('/search')){
		toast.add({
			id: 'returnToSearch',
			title: 'Return to Search Results',
			icon: 'i-heroicons-arrow-uturn-left',
			timeout: 0,
			click: ()=>{
				toast.clear()
				searchStore.viewingRecipeFromSearch = false
				searchStore.viewingSearchItems = true
				return navigateTo('/search')
			},
			actions: [
				{
					label: 'Return',
					click: () => {
						toast.clear()
						searchStore.viewingRecipeFromSearch = false
						searchStore.viewingSearchItems = true
						return navigateTo('/search')
					}
				}
			]
		})
	}

	// leave recipe toast
	if (sessionStorage.getItem('recipeSlug') && to.path !== sessionStorage.getItem('recipeSlug')){
		toast.add({
			id: 'returnToRecipe',
			title: 'Return to Recipe',
			icon: 'i-heroicons-arrow-uturn-left',
			timeout: 0,
			click: ()=>{
				toast.clear()
				searchStore.viewingRecipeFromSearch = true
				searchStore.viewingSearchItems = false
				console.log(searchStore)
				return navigateTo(sessionStorage.getItem('recipeSlug'))
			},
			actions: [
				{
					label: 'Return',
					click: () => {
						toast.clear()
						searchStore.viewingRecipeFromSearch = true
						searchStore.viewingSearchItems = false
						console.log(searchStore)
						return navigateTo(sessionStorage.getItem('recipeSlug'))
					}
				}
			]
		})
	}

	if (to.path == '/' && !(searchStore.viewingSearchItems || searchStore.viewingRecipeFromSearch)){
		toast.clear()
	}

	if (!to.meta.requiresAuth) return
  })
  