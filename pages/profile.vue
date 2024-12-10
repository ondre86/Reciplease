<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup>
useHead({
  title: 'Profile',
  meta: [
	{
		name: 'description',
		content: 'View your Reciplease profile to manage your account settings, billing, saved recipes and more.'
	},
	{
		name: 'og:description',
		content: 'View your Reciplease profile to manage your account settings, billing, saved recipes and more.'
	},
	{
		name: 'og:title',
		content: 'Profile · Reciplease'
	},
	{
		name: 'og:image',
		ogImage: '/og-img.jpg'
	},
	{
		name: 'twitter:card',
		twitterCard: 'summary_large_image'
	}
  ],
  titleTemplate: '%s %seperator %siteName',
  templateParams: {
    seperator: '·',
    siteName: 'Reciplease'
  }
})
</script>

<style lang="sass" scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active 
	transition: all .25s ease

.fade-enter-from,
.fade-leave-to 
	opacity: 0 !important
</style>