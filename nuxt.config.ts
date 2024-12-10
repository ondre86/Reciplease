// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@hypernym/nuxt-gsap',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/device',
    'nuxt-security',
    '@nuxtjs/seo',
    '@nuxt/ui'
  ],
  runtimeConfig: {
    openAIKey: process.env.NUXT_OPEN_AI_KEY,
    braveSearchKey: process.env.NUXT_BRAVE_SEARCH_KEY,
    stripePublishableKey: process.env.NUXT_STRIPE_PUBLISHABLE_KEY,
    stripeSecretKey: process.env.NUXT_STRIPE_SECRET_KEY
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@use "@/assets/global.sass" as g`,
          api: 'modern-compiler'
        }
      }
    }
  },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' }
  },
  gsap: {
    extraPlugins: {
      scrollTrigger: true,
      text: true
    }
  }
})