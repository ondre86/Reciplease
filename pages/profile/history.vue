<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-6 gap-8 mb-12" style="margin-top: calc(69.4px + 2rem);">
			<div
				class="flex items-center gap-3 self-start cursor-pointer back-text"
				@click="navigateTo('/profile')"
				@keyup.enter="navigateTo('/profile')"
			>
				<ButtonSearch
					:svg-width="'12px'"
					:svg-height="'12px'"
					class="rotate-180"
				>
				</ButtonSearch>
				<span>Go Back</span>
			</div>
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-4xl font-semibold">History</h1>
			</div>
		</main>
	</div>
</template>

<script setup>
definePageMeta({
  requiresAuth: true,
})
useHead({
  title: 'History',
  meta: [
	{
		name: 'description',
		content: 'View previous searches and shopping lists.'
	},
	{
		name: 'og:description',
		content: 'View previous searches and shopping lists.'
	},
	{
		name: 'og:title',
		content: 'History · Reciplease'
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