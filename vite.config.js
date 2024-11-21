import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
	},
	css: {
		preprocessorOptions: {
		  sass: {
			additionalData: `@use "@/assets/global.sass" as g`,
			api: 'modern-compiler'
		  }
		}
	},
	server: {
		headers: {
			"Strict-Transport-Security": "max-age=86400; includeSubDomains",
			"X-Content-Type-Options": "nosniff",
			"X-Frame-Options": "DENY",
			"X-XSS-Protection": "1; mode=block",
			"Content-Security-Policy": 
				"default-src 'self'; connect-src 'self' http://localhost:3333; base-uri 'self'; font-src 'self' https: data:; form-action 'self'; frame-ancestors 'self'; img-src 'self' data:; object-src 'none'; script-src 'self'; script-src-attr 'none'; style-src 'self' https: 'unsafe-inline'; upgrade-insecure-requests",
		  },
	  
	}
})