import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useAuthStore()

    // if (!userStore.isInitialized) {
    //   console.log('Waiting for Firebase Auth initialization...')
    //   await new Promise((resolve) => {
    //     const unwatch = userStore.$onAction(({ name, after }) => {
    //       if (name === 'monitorAuthState') {
    //         after(() => {
    //           unwatch()
    //           resolve()
    //         })
    //       }
    //     })
    //   })
    // }


    if (!to.meta.requiresAuth) return

    if (to.meta.requiresAuth && !userStore.user) {
      return navigateTo('/auth')
    }
  })
  