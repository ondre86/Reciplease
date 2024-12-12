import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.server) return

    const userStore = useAuthStore()

	
	// Wait for Firebase initialization if not yet initialized
	if (!userStore.isInitialized) {
		console.log('Waiting for Firebase Auth initialization...')
		await userStore.initializeAuth() // Wait for the auth state to load
	}

	// Redirect to login if no user is authenticated
	if (!userStore.user && to.meta.requiresAuth) {
		console.log('User not authenticated, redirecting to login...')
		return navigateTo('/auth')
	}

	if (userStore.user && to.path == '/auth'){
		console.log('User is authenticated, redirecting to profile...')
		return navigateTo('/profile')
	}

	if (!to.meta.requiresAuth) return



	console.log(to)
	console.log('middleware user:' + userStore.user)

	console.log('Route settled')
  })
  