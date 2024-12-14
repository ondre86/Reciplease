import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.server) return

    const userStore = useAuthStore()

	if (!userStore.isInitialized) {
		await userStore.initializeAuth()
	}

	// Redirect to login if no user is authenticated
	if (!userStore.user && to.meta.requiresAuth) {
		return navigateTo('/auth')
	}

	if (userStore.user && to.path == '/auth'){
		return navigateTo('/profile')
	}

	if (!to.meta.requiresAuth) return

  })
  