import { useAuthStore } from "~/stores/auth"
import { useSearchModeStore } from "~/stores/search"

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.server) return

    const userStore = useAuthStore()
	const searchStore = useSearchModeStore()

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
	if ((from.path.includes('/search') && from.path.includes('+')) && to.path == '/search'){
		searchStore.viewingRecipeFromSearch = false
		searchStore.viewingSearchItems = true
	}
	// forward from search to recipe
	if (from.path.includes('/search') && (to.path.includes('/search') && to.path.includes('+'))){
		searchStore.viewingRecipeFromSearch = true
		searchStore.viewingSearchItems = false
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

	if (!to.meta.requiresAuth) return
  })
  