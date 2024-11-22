<script setup>
import AppInput from '@/components/AppInput.vue';
import MainLogo from '@/components/MainLogo.vue';
import SearchModeWrapper from '@/components/SearchModeWrapper.vue';
import SearchItemWrapper from '@/components/SearchItemWrapper.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useSearchModeStore } from '@/stores/search';
import { useSeoMeta } from '@unhead/vue';
import { useElementSize, useWindowSize } from '@vueuse/core';
import { ref, onMounted } from 'vue';

useSeoMeta({
	title: 'Reciplease',
	description: 'Save money and become a better cook with Reciplease! Find and manage recipes and create custom shopping lists to maximize your budget.',
	ogDescription: 'Save money and become a better cook with Reciplease! Find and manage recipes and create custom shopping lists to maximize your budget.',
	ogTitle: 'Reciplease',
	// ogImage: '/src/assets/img/og-img.jpg',
	twitterCard: 'summary_large_image'
})

const searchStore = useSearchModeStore()

const mainWrap = ref(null)
const mainWrapSize = useElementSize(mainWrap)
const windowSize = useWindowSize()

const desktopMainWrapSize = 494
// 


</script>

<template>
	<div id="app-wrap">
		<Transition>
			<main
				class="flex flex-col items-center h-full px-8"
				ref="mainWrap"
				:style="{ paddingTop: ((windowSize.height.value / 2) - (desktopMainWrapSize / 2) - 81) + 'px' }"
			>
				<MainLogo></MainLogo>
				<SearchModeWrapper></SearchModeWrapper>
				<AppInput></AppInput>
				<SearchItemWrapper></SearchItemWrapper>
			</main>

		</Transition>
	</div>
</template>

<style lang="sass" scoped>
main
	margin-top: 81px

img, picture
	height: 40px
	width: 80px
	bottom: 7.5%

.fade-move,
.fade-enter-active,
.fade-leave-active 
	transition: all .25s ease

.fade-enter-from,
.fade-leave-to 
	opacity: 0 !important
</style>
