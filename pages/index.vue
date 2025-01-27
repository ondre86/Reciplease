<template>
	<div id="app-wrap">
		<Transition name="fade" mode="out-in" @before-enter="y = 0">
			<DefaultHome v-if="!(searchStore.viewingSearchItems || searchStore.viewingRecipeFromSearch) && !(searchStore.submittedRequest && !searchStore.requestFulfilled)"></DefaultHome>
			<LoadingHome v-else></LoadingHome>
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
		content: '/og-img.jpg'
	},
	{
		name: 'twitter:card',
		content: 'summary_large_image'
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
</style>
