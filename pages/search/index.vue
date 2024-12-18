<template>
	<div id="app-wrap">
		<Transition name="fade" mode="out-in">
			<LoadingHome v-if="(searchStore.submittedRequest && !searchStore.requestFulfilled)"></LoadingHome>
			<SearchHome v-else-if="(searchStore.submittedRequest && searchStore.requestFulfilled) && (searchStore.viewingSearchItems && !searchStore.viewingRecipeFromSearch)"></SearchHome>
		</Transition>
	</div>


</template>

<script setup>
definePageMeta({
  requiresAuth: true,
})
useHead({
  title: 'Search',
  meta: [
	{
		name: 'description',
		content: 'Search far and wide for recipes by name or ingredient on Reciplease.'
	},
	{
		name: 'og:description',
		content: 'Search far and wide for recipes by name or ingredient on Reciplease.'
	},
	{
		name: 'og:title',
		content: 'Search · Reciplease'
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

const searchStore = useSearchModeStore()

if (!searchStore.submittedRequest){
    await navigateTo('/')
}

const { x, y } = useWindowScroll({ behavior: 'smooth' })

</script>

<style lang="sass" scoped>
</style>
