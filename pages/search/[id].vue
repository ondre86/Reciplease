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
const route = useRoute()

if (!searchStore.submittedRequest){
	let recipeResult = JSON.parse(sessionStorage.getItem("recipeResult"))

	if (recipeResult && route.path == sessionStorage.getItem('recipeSlug')){
		let parsedRecipeResult = []
		recipeResult.forEach((item)=>{
			parsedRecipeResult.push(JSON.parse(item))
		})

		searchStore.submittedRequest = true
		searchStore.requestFulfilled = true
		searchStore.isValidRequest = true
		searchStore.viewingRecipeFromSearch = true
		searchStore.searchMode = sessionStorage.getItem("searchMode")
		searchStore.serverResponseRecipe.recipes = parsedRecipeResult
		searchStore.serverResponseImage = JSON.parse(sessionStorage.getItem("recipeImage"))
	}
	else{
		await navigateTo('/')
	}
}

useHead({
  title: `${searchStore.serverResponseRecipe.recipes && searchStore.serverResponseRecipe.recipes[0] ? searchStore.serverResponseRecipe.recipes[0].recipeName : ''}`,
  meta: [
	{
		name: 'description',
		content: `${searchStore.serverResponseRecipe.recipes && searchStore.serverResponseRecipe.recipes[0] ? searchStore.serverResponseRecipe.recipes[0].description : ''}`
	},
	{
		name: 'og:description',
		content: `${searchStore.serverResponseRecipe.recipes && searchStore.serverResponseRecipe.recipes[0] ? searchStore.serverResponseRecipe.recipes[0].description : ''}`
	},
	{
		name: 'og:title',
		content: `${searchStore.serverResponseRecipe.recipes && searchStore.serverResponseRecipe.recipes[0] ? searchStore.serverResponseRecipe.recipes[0].recipeName : ''} · Reciplease`
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

<style lang="sass" scoped>
</style>
