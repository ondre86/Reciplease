<script setup>
import AppInput from '@/components/AppInput.vue';
import MainLogo from '@/components/MainLogo.vue';
import SearchModeWrapper from '@/components/SearchModeWrapper.vue';
import SearchItemWrapper from '@/components/SearchItemWrapper.vue';
import LoadingAnimation from '@/components/LoadingAnimation.vue';
import ListResults from '@/components/ListResults.vue';

import { useSearchModeStore } from '@/stores/search';
import { useSeoMeta } from '@unhead/vue';
import { useWindowSize } from '@vueuse/core';
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
const windowSize = useWindowSize()

const desktopMainWrapSize = 494
const fontSize = ref(parseFloat(getComputedStyle(document.documentElement).fontSize))



</script>

<template>
	<div id="app-wrap">
		<Transition name="fade" mode="out-in">
			<!-- Default -->
			<main
				class="flex flex-col items-center h-full px-8"
				ref="mainWrap"
				:style="{ paddingTop: ((windowSize.height.value / 2) - (desktopMainWrapSize / 2) - 81) + 'px' }"
				v-if="!searchStore.submittedRequest && !searchStore.requestFulfilled"
			>
				<MainLogo></MainLogo>
				<SearchModeWrapper></SearchModeWrapper>
				<AppInput></AppInput>
				<SearchItemWrapper></SearchItemWrapper>
			</main>
			<!-- Loading -->
			<main
				v-else-if="searchStore.submittedRequest && !searchStore.requestFulfilled"
				class="loading flex flex-col justify-center items-center h-dvh"
			>
				<LoadingAnimation></LoadingAnimation>
			</main>
			<!-- Search Results -->
			<main
				class="search-results flex flex-col items-center h-full px-8 relative"
				v-else
			>
				<div 
					class="
						back absolute left-8 top-0 border-b-2 border-b-transparent cursor-pointer p-1 rounded-md outline outline-1 outline-transparent transition-all duration-200
						hover:outline-black
						focus:outline-black
					"
					tabindex="0"
					aria-role="button"
					@click="searchStore.clearSearchTerms(); searchStore.clearServerSearchTerms(); searchStore.submittedRequest = false; searchStore.requestFulfilled = false"
					@keyup.enter="searchStore.clearSearchTerms(); searchStore.clearServerSearchTerms(); searchStore.submittedRequest = false; searchStore.requestFulfilled = false"
				>
					<span>Search Again</span>
				</div>
				<ListResults></ListResults>
			</main>
		</Transition>
	</div>
</template>

<style lang="sass" scoped>
main
	margin-top: 81px

	&.loading
		margin-top: 0px

.search-results
	margin-top: calc( 81px + 3rem )

.fade-move,
.fade-enter-active,
.fade-leave-active 
	transition: all .25s ease

.fade-enter-from,
.fade-leave-to 
	opacity: 0 !important

@media (prefers-color-scheme:dark)
	.back
		&:hover, &:focus
			outline-color: g.$tan-primary
</style>
