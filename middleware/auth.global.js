import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.server) return

    const userStore = useAuthStore()

	
	// Wait for Firebase initialization if not yet initialized
	if (!userStore.isInitialized) {
		console.log('Waiting for Firebase Auth initialization...');
		await userStore.monitorAuthState(); // Wait for the auth state to load

		if (userStore.user && to.path == '/auth'){
			return navigateTo('/profile')
		}

		if (!to.meta.requiresAuth) return

	}

	// Redirect to login if no user is authenticated
	if (!userStore.user && to.meta.requiresAuth) {
		console.log('User not authenticated, redirecting to login...');
		return navigateTo('/auth');
	}

	if (userStore.user && to.path == '/auth'){
		return navigateTo('/profile')
	}

	console.log(to)

	console.log('Route settled');
  })
  