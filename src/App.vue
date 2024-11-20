<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { defineStore } from 'pinia';
import AppNav from './components/AppNav.vue';

</script>

<template>
	<AppNav></AppNav>
	<RouterView v-slot="{Component}">
		<Transition name="fade" mode="out-in">
			<component :is="Component" />
		</Transition>
	</RouterView>
</template>

<style lang="sass">
#app
	height: calc(100dvh - 81px)
	max-height: 100dvh
		
*
	font-family: "Infra"

@media (prefers-color-scheme: dark)
	html, body
		background-color: g.$green-acc2
		color: g.$tan-primary

.fade-move,
.fade-enter-active,
.fade-leave-active 
	transition: all .25s ease

.fade-enter-from,
.fade-leave-to 
	opacity: 0 !important

</style>
