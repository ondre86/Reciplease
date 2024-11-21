import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PricingView from '@/views/PricingView.vue'
import AuthView from '@/views/AuthView.vue'

const router = createRouter({
	scrollBehavior(to, from, savedPosition) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({ left: 0, top: 0 })
			}, 250)
		})
	},
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
		{
			path: '/about',
			name: 'about',
			component: AboutView,
		},
		{
			path: '/pricing',
			name: 'pricing',
			component: PricingView,
		},
		{
			path: '/auth',
			name: 'auth',
			component: AuthView,
		},
	],
})

export default router
