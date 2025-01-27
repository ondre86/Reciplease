<template>
	<AppNav />
	<NuxtPage />
	<NuxtRouteAnnouncer />
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
	overflow-x: hidden
		
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

div[role="status"]
	button
		outline: 2px solid transparent
		transition: all .3s

		&:focus
			tw-ring-color: #ffffff
			outline: 2px solid g.$green-primary

@media (prefers-color-scheme: dark)
	html, body
		background-color: g.$green-acc2
		color: g.$tan-primary

	*
		border-color: g.$green-primary

	div.flex.p-4.gap-3.items-center:has(.iconify)
		background-color: g.$green-acc3

	div[role="status"]
		button
			outline: 2px solid transparent
			transition: all .3s
			&:focus
				tw-ring-color: #ffffff
				outline: 2px solid g.$green-light

.fade-move,
.fade-enter-active,
.fade-leave-active 
	transition: all .25s ease

.fade-enter-from,
.fade-leave-to 
	opacity: 0 !important
</style>
