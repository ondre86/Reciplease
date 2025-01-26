// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@hypernym/nuxt-gsap',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/device',
    'nuxt-security',
    '@nuxt/ui',
    '@nuxt/image'
  ],
  runtimeConfig: {
    openAIKey: process.env.NUXT_OPEN_AI_KEY,
    braveSearchKey: process.env.NUXT_BRAVE_SEARCH_KEY,
    stripeSecretKey: process.env.NUXT_STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.NUXT_STRIPE_WEBHOOK_SECRET,
    ipGeoKey: process.env.NUXT_IP_GEO_KEY,
    firebaseServiceAccountType: process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_TYPE,
    firebaseServiceAccountProjectID: process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_PROJECT_ID,
    firebaseServiceAccountPrivateKeyID: process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
    firebaseServiceAccountPrivateKey: process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY,
    firebaseServiceAccountClientEmail: process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL,
    firebaseServiceAccountClientID: process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_CLIENT_ID,
    firebaseServiceAccountAuthURI: process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_AUTH_URI,
    firebaseServiceAccountTokenURI: process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_TOKEN_URI,
    firebaseServiceAccountAuthProviderX509CertURL: process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
    firebaseServiceAccountClientX509CertURL: process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
    firebaseServiceAccountUniverseDomain: process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_UNIVERSE_DOMAIN,

    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
      stripePriceId: process.env.NUXT_PUBLIC_STRIPE_PRICE_ID,
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }
  },
  nitro: {
    preset: 'cloudflare_pages'
  },
  ssr: true,
  routeRules: {
    "/search": { ssr: false },
    "/search/**": { ssr: false },
    "/list": { ssr: false },
    "/profile": { ssr: false },
    "/profile/**": { ssr: false },
    "/profile/saved/**": { ssr: false },
    "/api/**": { ssr: false }
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: `@use "@/assets/global.sass" as g`,
          api: 'modern-compiler'
        }
      }
    },
    resolve: {
      alias: {
        stream: 'stream-browserify'
      }
    }
  },
  app: {
    pageTransition: { name: 'fade', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  gsap: {
    extraPlugins: {
      scrollTrigger: true,
      text: true
    }
  },
  ui: {
      safelistColors: ['gmain']
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'data:', 'https://imgs.search.brave.com'],
      },
    },
  }
})