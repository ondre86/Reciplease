<template>
	<div id="app-wrap">
		<Transition name="fade" mode="out-in" @before-enter="y = 0">
			<DefaultHome 
				v-if="
					!searchStore.submittedRequest && 
					!searchStore.requestFulfilled && 
					!(searchStore.viewingSearchItems || searchStore.viewingRecipeFromSearch)
				"
			>
			</DefaultHome>
			<LoadingHome 
				v-else-if="
					searchStore.submittedRequest && 
					!searchStore.requestFulfilled
				"
			>
			</LoadingHome>
			<SearchHome 
				v-else-if="
					searchStore.submittedRequest && 
					searchStore.requestFulfilled && 
					searchStore.viewingSearchItems &&
					!searchStore.viewingRecipeFromSearch
				"
			>
			</SearchHome>
			<RecipeView 
				v-else-if="
					searchStore.submittedRequest && 
					searchStore.requestFulfilled && 
					searchStore.viewingSearchItems &&
					searchStore.viewingRecipeFromSearch
				"
			>
			</RecipeView>
		</Transition>
	</div>
</template>

<script setup>
useHead({
  title: '',
  meta: [
	{
		name: 'description',
		content: 'Learn how to cook better and save money with Reciplease. Save time, money, and headaches when cooking and grocery shopping.'
	},
	{
		name: 'og:description',
		content: 'Learn how to cook better and save money with Reciplease. Save time, money, and headaches when cooking and grocery shopping.'
	},
	{
		name: 'og:title',
		content: 'Reciplease'
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
  titleTemplate: '%siteName',
  templateParams: {
    seperator: '·',
    siteName: 'Reciplease'
  }
})

const searchStore = useSearchModeStore()

const { x, y } = useWindowScroll({ behavior: 'smooth' })


</script>

<style lang="sass" scoped>
main
	margin-top: 81px

.fade-move,
.fade-enter-active,
.fade-leave-active 
	transition: all .25s ease

.fade-enter-from,
.fade-leave-to 
	opacity: 0 !important
</style>
