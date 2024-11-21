<script setup>
import AppInput from '@/components/AppInput.vue';
import MainLogo from '@/components/MainLogo.vue';
import SearchModeWrapper from '@/components/SearchModeWrapper.vue';
import SearchItemWrapper from '@/components/SearchItemWrapper.vue';
import AppFooter from '@/components/AppFooter.vue';
import { useSearchModeStore } from '@/stores/search';

const searchStore = useSearchModeStore()
console.log(searchStore.getSearchTerms)
</script>

<template>
	<div>
		<main class="flex flex-col justify-center items-center h-full px-8">
			<MainLogo></MainLogo>
			<SearchModeWrapper></SearchModeWrapper>
			<AppInput></AppInput>
			<SearchItemWrapper></SearchItemWrapper>
			<Transition name="fade" mode="out-in">
				<img
					src="@/assets/logo/logo-icon-green-primary.svg"
					alt="fork spoon knife question mark in right-to-left order"
					class="absolute opacity-10 -z-10"
					v-if="searchStore.getSearchTerms.length == 0"
				>
			</Transition>
		</main>
		<AppFooter></AppFooter>
	</div>
</template>

<style lang="sass" scoped>
main
	margin-top: 81px
	min-height: calc( 100dvh - 81px - 36px )

img
	height: 40px
	bottom: 7.5%

.fade-move,
.fade-enter-active,
.fade-leave-active 
	transition: all .25s ease

.fade-enter-from,
.fade-leave-to 
	opacity: 0 !important
</style>
