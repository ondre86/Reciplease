<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup>
useHead({
  title: 'Saved Recipes',
  meta: [
	{
		name: 'description',
		content: 'View your saved recipes.'
	},
	{
		name: 'og:description',
		content: 'View your saved recipes.'
	},
	{
		name: 'og:title',
		content: 'Saved Recipes · Reciplease'
	},
	{
		name: 'og:image',
		content: '/og-img.jpg'
	},
	{
		name: 'twitter:card',
		content: 'summary_large_image'
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