<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { defineStore } from 'pinia';
import AppNav from './components/AppNav.vue';
import AppFooter from './components/AppFooter.vue';

</script>

<template>
	<AppNav></AppNav>
	<RouterView v-slot="{Component}">
		<Transition name="fade" mode="out-in">
			<component :is="Component" />
		</Transition>
	</RouterView>
	<AppFooter class="self-end"></AppFooter>
</template>

<style lang="sass">
#app
	min-height: 100vh
	display: flex
	flex-direction: column
	justify-content: space-between
		
*
	font-family: "Infra"
	border-color: g.$grey-divider

#app-wrap
	display: flex
	justify-content: center

main
	width: 100%
	max-width: 1280px

@media (prefers-color-scheme: dark)
	html, body
		background-color: g.$green-acc2
		color: g.$tan-primary

	*
		border-color: g.$green-primary

.fade-move,
.fade-enter-active,
.fade-leave-active 
	transition: all .25s ease

.fade-enter-from,
.fade-leave-to 
	opacity: 0 !important

</style>
