import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.server) return

    const userStore = useAuthStore()

	
	// Wait for Firebase initialization if not yet initialized
	if (!userStore.isInitialized) {
		console.log('Waiting for Firebase Auth initialization...');
		await userStore.monitorAuthState(); // Wait for the auth state to load

		if (!to.meta.requiresAuth) return

	}

	// Redirect to login if no user is authenticated
	if (!userStore.user) {
		console.log('User not authenticated, redirecting to login...');
		return navigateTo({ name: 'auth' });
	}

	console.log('User authenticated, proceeding to route.');
  })
  