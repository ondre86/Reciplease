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
		content: '/og-img.jpg'
	},
	{
		name: 'twitter:card',
		content: 'summary_large_image'
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
	if (sessionStorage.getItem("validSearch") !== true){
		searchStore.submittedRequest = true
		searchStore.requestFulfilled = true
		searchStore.additionalRequestFulfilled = true
		searchStore.isValidRequest = false
		searchStore.viewingSearchItems = true
		searchStore.searchMode = sessionStorage.getItem("searchMode")
	}

	else{
		let savedSearchResults = JSON.parse(sessionStorage.getItem("searchResults"))
		let parsedSavedSearchResults = []
		savedSearchResults.forEach((item)=>{
			parsedSavedSearchResults.push(JSON.parse(item))
		})

		searchStore.submittedRequest = true
		searchStore.requestFulfilled = true
		searchStore.additionalRequestFulfilled = true
		searchStore.isValidRequest = true
		searchStore.viewingSearchItems = true
		searchStore.searchMode = sessionStorage.getItem("searchMode")
		searchStore.serverResponseList.recipes = parsedSavedSearchResults

		console.log(searchStore)
	}
	if (!sessionStorage.getItem("searchResults")){
		await navigateTo('/')
	}
}

</script>

<style lang="sass" scoped>
</style>
