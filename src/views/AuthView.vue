<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-4 gap-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">Sign in</h1>
				<span class="w-full text-lg font-light text-center">Sign in to use Reciplease.</span>
			</div>
		</main>
	</div>
</template>

<script setup>
import { useSeoMeta } from '@unhead/vue';

useSeoMeta({
	title: 'Sign In - Reciplease',
	description: 'Sign in to use Reciplease. Gain access to account features like saved recipes, view history, and previous shopping lists.',
	ogDescription: 'Sign in to use Reciplease. Gain access to account features like saved recipes, view history, and previous shopping lists.',
	ogTitle: 'Sign In - Reciplease',
	// ogImage: '/src/assets/img/og-img.jpg',
	twitterCard: 'summary_large_image'
})
</script>

<style>
</style>
