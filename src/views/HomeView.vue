<script setup>
import AppInput from '@/components/AppInput.vue';
import MainLogo from '@/components/MainLogo.vue';
import SearchModeWrapper from '@/components/SearchModeWrapper.vue';
import SearchItemWrapper from '@/components/SearchItemWrapper.vue';
</script>

<template>
	<main class="flex flex-col justify-center items-center h-full px-8">
		<MainLogo></MainLogo>
		<SearchModeWrapper></SearchModeWrapper>
		<AppInput></AppInput>
		<SearchItemWrapper></SearchItemWrapper>
		<img 
			src="@/assets/logo/logo-icon-green-primary.svg" 
			alt="fork spoon knife question mark in right-to-left order"
			class="absolute left-12 h-36 opacity-5 -z-10"
		>
		<img 
			src="@/assets/logo/logo-icon-green-primary.svg" 
			alt="fork spoon knife question mark in right-to-left order"
			class="absolute right-12 h-36 opacity-5 -z-10"
		>
	</main>
</template>

<style>
</style>
