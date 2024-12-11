<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-4 gap-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">Settings</h1>
			</div>
		</main>
	</div>
</template>

<script setup>
definePageMeta({
  requiresAuth: true,
})
useHead({
  title: 'Settings',
  meta: [
	{
		name: 'description',
		content: 'Manage your Reciplease account.'
	},
	{
		name: 'og:description',
		content: 'Manage your Reciplease account.'
	},
	{
		name: 'og:title',
		content: 'Settings · Reciplease'
	},
	{
		name: 'og:image',
		ogImage: '/og-img.jpg'
	},
	{
		name: 'twitter:card',
		twitterCard: 'summary_large_image'
	}
  ],
  titleTemplate: '%s %seperator %siteName',
  templateParams: {
    seperator: '·',
    siteName: 'Reciplease'
  }
})
</script>

<style lang="scss" scoped>

</style>