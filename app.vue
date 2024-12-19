<template>
  <div id="app">
    <AppNav />
    <NuxtPage />
    <NuxtRouteAnnouncer />
	<AppFooter class="self-end"></AppFooter>
  </div>
  <UNotifications />
</template>

<style lang="sass">
:root
	font-family: 'Infra'
	font-size: 16px

#app
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
	margin-top: calc(81px + 3rem)

@media (prefers-color-scheme: dark)
	html, body
		background-color: g.$green-acc2
		color: g.$tan-primary

	*
		border-color: g.$green-primary

	div.flex.p-4.gap-3.items-center:has(.iconify)
		background-color: g.$green-acc3

.fade-move,
.fade-enter-active,
.fade-leave-active 
	transition: all .25s ease

.fade-enter-from,
.fade-leave-to 
	opacity: 0 !important
</style>
