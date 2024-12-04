<script setup>
import DefaultHome from '@/components/DefaultHome.vue';
import LoadingHome from '@/components/LoadingHome.vue';
import SearchHome from '@/components/SearchHome.vue';
import RecipeView from '@/components/RecipeView.vue';

import { useSearchModeStore } from '@/stores/search';
import { useSeoMeta } from '@unhead/vue';
import { useWindowSize, useMediaQuery } from '@vueuse/core';
import { ref, onMounted, watch } from 'vue';

useSeoMeta({
	title: 'Reciplease',
	description: 'Save money and become a better cook with Reciplease! Find and manage recipes and create custom shopping lists to maximize your budget.',
	ogDescription: 'Save money and become a better cook with Reciplease! Find and manage recipes and create custom shopping lists to maximize your budget.',
	ogTitle: 'Reciplease',
	// ogImage: '/src/assets/img/og-img.jpg',
	twitterCard: 'summary_large_image'
})

const searchStore = useSearchModeStore()

</script>

<template>
	<div id="app-wrap">
		<Transition name="fade" mode="out-in" @before-enter="">
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
					!searchStore.requestFulfilled && 
					!(searchStore.viewingSearchItems || searchStore.viewingRecipeFromSearch)
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
