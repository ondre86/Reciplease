<template>
	<div id="app-wrap">
		<Transition name="fade" mode="out-in">
			<LoadingHome v-if="(searchStore.submittedRequest && !searchStore.requestFulfilled)"></LoadingHome>
			<RecipeView v-else-if="(searchStore.submittedRequest && searchStore.requestFulfilled) && (!searchStore.viewingSearchItems && searchStore.viewingRecipeFromSearch)"></RecipeView>
		</Transition>
	</div>


</template>

<script setup>
definePageMeta({
  requiresAuth: true,
})
const searchStore = useSearchModeStore()
if (!searchStore.submittedRequest){
    searchStore.viewingRecipeFromSearch = false
    searchStore.requestFulfilled = false
    searchStore.viewingSearchItems = false
    await navigateTo('/')
}

useHead({
  title: `${searchStore.serverResponseRecipe.recipes ? searchStore.serverResponseRecipe.recipes[0].recipeName : ''}`,
  meta: [
	{
		name: 'description',
		content: `${searchStore.serverResponseRecipe.recipes ? searchStore.serverResponseRecipe.recipes[0].description : ''}`
	},
	{
		name: 'og:description',
		content: `${searchStore.serverResponseRecipe.recipes ? searchStore.serverResponseRecipe.recipes[0].description : ''}`
	},
	{
		name: 'og:title',
		content: `${searchStore.serverResponseRecipe.recipes ? searchStore.serverResponseRecipe.recipes[0].recipeName : ''} · Reciplease`
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

// const { x, y } = useWindowScroll({ behavior: 'smooth' })

</script>

<style lang="sass" scoped>
</style>
