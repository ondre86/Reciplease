import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@hypernym/nuxt-gsap`
     */
    ["gsap"]: typeof import("@hypernym/nuxt-gsap").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@pinia/nuxt`
     */
    ["pinia"]: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@vueuse/nuxt`
     */
    ["vueuse"]: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     */
    ["fonts"]: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/device`
     */
    ["device"]: typeof import("@nuxtjs/device").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module`
     */
    ["site"]: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module`
     */
    ["robots"]: typeof import("/Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module`
     */
    ["sitemap"]: typeof import("/Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module`
     */
    ["ogImage"]: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module`
     */
    ["schemaOrg"]: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module`
     */
    ["linkChecker"]: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module`
     */
    ["seo"]: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     */
    ["nuxtseo"]: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     */
    ["icon"]: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     */
    ["colorMode"]: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     */
    ["tailwindcss"]: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/ui`
     */
    ["ui"]: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@hypernym/nuxt-gsap`
     */
    ["gsap"]?: typeof import("@hypernym/nuxt-gsap").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@pinia/nuxt`
     */
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@vueuse/nuxt`
     */
    ["vueuse"]?: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     */
    ["fonts"]?: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/device`
     */
    ["device"]?: typeof import("@nuxtjs/device").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module`
     */
    ["site"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module`
     */
    ["robots"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module`
     */
    ["sitemap"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module`
     */
    ["ogImage"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module`
     */
    ["schemaOrg"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module`
     */
    ["linkChecker"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module`
     */
    ["seo"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     */
    ["nuxtseo"]?: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     */
    ["icon"]?: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     */
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     */
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/ui`
     */
    ["ui"]?: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@hypernym/nuxt-gsap", Exclude<NuxtConfig["gsap"], boolean>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@vueuse/nuxt", Exclude<NuxtConfig["vueuse"], boolean>] | ["@nuxt/fonts", Exclude<NuxtConfig["fonts"], boolean>] | ["@nuxtjs/device", Exclude<NuxtConfig["device"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module", Exclude<NuxtConfig["site"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module", Exclude<NuxtConfig["robots"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module", Exclude<NuxtConfig["sitemap"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module", Exclude<NuxtConfig["ogImage"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module", Exclude<NuxtConfig["schemaOrg"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module", Exclude<NuxtConfig["linkChecker"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module", Exclude<NuxtConfig["seo"], boolean>] | ["@nuxtjs/seo", Exclude<NuxtConfig["nuxtseo"], boolean>] | ["@nuxt/icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxt/ui", Exclude<NuxtConfig["ui"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtOptions {
    /**
     * Configuration for `@hypernym/nuxt-gsap`
     * @see https://www.npmjs.com/package/@hypernym/nuxt-gsap
     */
    ["gsap"]: typeof import("@hypernym/nuxt-gsap").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@pinia/nuxt`
     * @see https://www.npmjs.com/package/@pinia/nuxt
     */
    ["pinia"]: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@vueuse/nuxt`
     * @see https://www.npmjs.com/package/@vueuse/nuxt
     */
    ["vueuse"]: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     * @see https://www.npmjs.com/package/@nuxt/fonts
     */
    ["fonts"]: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/device`
     * @see https://www.npmjs.com/package/@nuxtjs/device
     */
    ["device"]: typeof import("@nuxtjs/device").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module
     */
    ["site"]: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module
     */
    ["robots"]: typeof import("/Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module
     */
    ["sitemap"]: typeof import("/Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module
     */
    ["ogImage"]: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module
     */
    ["schemaOrg"]: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module
     */
    ["linkChecker"]: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module
     */
    ["seo"]: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     * @see https://www.npmjs.com/package/@nuxtjs/seo
     */
    ["nuxtseo"]: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     * @see https://www.npmjs.com/package/@nuxt/icon
     */
    ["icon"]: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     * @see https://www.npmjs.com/package/@nuxtjs/color-mode
     */
    ["colorMode"]: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     * @see https://www.npmjs.com/package/@nuxtjs/tailwindcss
     */
    ["tailwindcss"]: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/ui`
     * @see https://www.npmjs.com/package/@nuxt/ui
     */
    ["ui"]: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? O : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? O : Record<string, any>
  }
  interface NuxtConfig {
    /**
     * Configuration for `@hypernym/nuxt-gsap`
     * @see https://www.npmjs.com/package/@hypernym/nuxt-gsap
     */
    ["gsap"]?: typeof import("@hypernym/nuxt-gsap").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@pinia/nuxt`
     * @see https://www.npmjs.com/package/@pinia/nuxt
     */
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@vueuse/nuxt`
     * @see https://www.npmjs.com/package/@vueuse/nuxt
     */
    ["vueuse"]?: typeof import("@vueuse/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/fonts`
     * @see https://www.npmjs.com/package/@nuxt/fonts
     */
    ["fonts"]?: typeof import("@nuxt/fonts").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/device`
     * @see https://www.npmjs.com/package/@nuxtjs/device
     */
    ["device"]?: typeof import("@nuxtjs/device").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module
     */
    ["site"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module
     */
    ["robots"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module
     */
    ["sitemap"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module
     */
    ["ogImage"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module
     */
    ["schemaOrg"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module
     */
    ["linkChecker"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `/Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module`
     * @see https://www.npmjs.com/package//Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module
     */
    ["seo"]?: typeof import("/Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/seo`
     * @see https://www.npmjs.com/package/@nuxtjs/seo
     */
    ["nuxtseo"]?: typeof import("@nuxtjs/seo").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/icon`
     * @see https://www.npmjs.com/package/@nuxt/icon
     */
    ["icon"]?: typeof import("@nuxt/icon").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/color-mode`
     * @see https://www.npmjs.com/package/@nuxtjs/color-mode
     */
    ["colorMode"]?: typeof import("@nuxtjs/color-mode").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxtjs/tailwindcss`
     * @see https://www.npmjs.com/package/@nuxtjs/tailwindcss
     */
    ["tailwindcss"]?: typeof import("@nuxtjs/tailwindcss").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/ui`
     * @see https://www.npmjs.com/package/@nuxt/ui
     */
    ["ui"]?: typeof import("@nuxt/ui").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/devtools`
     * @see https://www.npmjs.com/package/@nuxt/devtools
     */
    ["devtools"]?: typeof import("@nuxt/devtools").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    /**
     * Configuration for `@nuxt/telemetry`
     * @see https://www.npmjs.com/package/@nuxt/telemetry
     */
    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    modules?: (undefined | null | false | NuxtModule<any> | string | [NuxtModule | string, Record<string, any>] | ["@hypernym/nuxt-gsap", Exclude<NuxtConfig["gsap"], boolean>] | ["@pinia/nuxt", Exclude<NuxtConfig["pinia"], boolean>] | ["@vueuse/nuxt", Exclude<NuxtConfig["vueuse"], boolean>] | ["@nuxt/fonts", Exclude<NuxtConfig["fonts"], boolean>] | ["@nuxtjs/device", Exclude<NuxtConfig["device"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/nuxt-site-config/dist/module", Exclude<NuxtConfig["site"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/@nuxtjs/robots/dist/module", Exclude<NuxtConfig["robots"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/@nuxtjs/sitemap/dist/module", Exclude<NuxtConfig["sitemap"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/nuxt-og-image/dist/module", Exclude<NuxtConfig["ogImage"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/nuxt-schema-org/dist/module", Exclude<NuxtConfig["schemaOrg"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/nuxt-link-checker/dist/module", Exclude<NuxtConfig["linkChecker"], boolean>] | ["/Users/dre/Code/Reciplease/node_modules/nuxt-seo-utils/dist/module", Exclude<NuxtConfig["seo"], boolean>] | ["@nuxtjs/seo", Exclude<NuxtConfig["nuxtseo"], boolean>] | ["@nuxt/icon", Exclude<NuxtConfig["icon"], boolean>] | ["@nuxtjs/color-mode", Exclude<NuxtConfig["colorMode"], boolean>] | ["@nuxtjs/tailwindcss", Exclude<NuxtConfig["tailwindcss"], boolean>] | ["@nuxt/ui", Exclude<NuxtConfig["ui"], boolean>] | ["@nuxt/devtools", Exclude<NuxtConfig["devtools"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   openAIKey: string,

   braveSearchKey: string,

   stripePublishableKey: string,

   stripeSecretKey: string,

   googleApplicationCredentials: string,

   nitro: {
      envPrefix: string,
   },

   sitemap: {
      isI18nMapped: boolean,

      sitemapName: string,

      isMultiSitemap: boolean,

      excludeAppSources: Array<any>,

      cacheMaxAgeSeconds: number,

      autoLastmod: boolean,

      defaultSitemapsChunkSize: number,

      minify: boolean,

      sortEntries: boolean,

      debug: boolean,

      discoverImages: boolean,

      discoverVideos: boolean,

      sitemapsPathPrefix: string,

      isNuxtContentDocumentDriven: boolean,

      xsl: string,

      xslTips: boolean,

      xslColumns: Array<{

      }>,

      credits: boolean,

      version: string,

      sitemaps: {
         "sitemap.xml": {
            sitemapName: string,

            route: string,

            defaults: any,

            include: Array<any>,

            exclude: Array<string>,

            includeAppSources: boolean,
         },
      },
   },

   icon: {
      serverKnownCssClasses: Array<any>,
   },

   "nuxt-site-config": {
      stack: Array<{

      }>,

      version: string,

      debug: boolean,
   },

   "nuxt-robots": {
      version: string,

      usingNuxtContent: boolean,

      debug: boolean,

      credits: boolean,

      groups: Array<{

      }>,

      sitemap: Array<string>,

      header: boolean,

      robotsEnabledValue: string,

      robotsDisabledValue: string,

      cacheControl: string,
   },

   "nuxt-og-image": {
      version: string,

      satoriOptions: any,

      resvgOptions: any,

      sharpOptions: any,

      publicStoragePath: string,

      defaults: {
         emojis: string,

         renderer: string,

         component: string,

         extension: string,

         width: number,

         height: number,

         cacheMaxAgeSeconds: number,
      },

      debug: boolean,

      baseCacheKey: string,

      fonts: Array<{

      }>,

      hasNuxtIcon: boolean,

      colorPreference: string,

      hasNuxtContent: boolean,

      strictNuxtContentPaths: any,

      isNuxtContentDocumentDriven: boolean,
   },
  }
  interface PublicRuntimeConfig {
   apiKey: string,

   authDomain: string,

   projectId: string,

   storageBucket: string,

   messagingSenderId: string,

   appId: string,

   measurementId: string,

   device: {
      defaultUserAgent: string,

      enabled: boolean,

      refreshOnResize: boolean,
   },

   "nuxt-schema-org": {
      reactive: boolean,

      minify: boolean,

      scriptAttributes: {
         "data-nuxt-schema-org": boolean,
      },

      identity: any,

      version: string,
   },

   "nuxt-link-checker": {
      version: string,

      hasSitemapModule: boolean,

      rootDir: string,

      isNuxtContentDocumentDriven: boolean,

      excludeLinks: Array<any>,

      skipInspections: Array<any>,

      fetchTimeout: number,

      showLiveInspections: boolean,

      fetchRemoteUrls: boolean,
   },

   "seo-utils": {
      canonicalQueryWhitelist: Array<string>,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }