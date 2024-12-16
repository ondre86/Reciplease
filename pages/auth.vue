<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-6 gap-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">{{authMode}}</h1>
				<span class="w-full text-lg font-light text-center">Log in or create an account to use Reciplease.</span>
			</div>

			<AuthComponent @authModeSwitch="(val) => switchAuthMode(val)"></AuthComponent>
		</main>
	</div>
</template>

<script setup>
const authMode = ref('Sign In')

useHead({
  title: authMode.value,
  meta: [
	{
		name: 'description',
		content: authMode.value + ' to use Reciplease. Gain access to account features like saved recipes, view history, and previous shopping lists.'
	},
	{
		name: 'og:description',
		content: authMode.value + ' to use Reciplease. Gain access to account features like saved recipes, view history, and previous shopping lists.'
	},
	{
		name: 'og:title',
		content: authMode.value + ' · Reciplease'
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

function switchAuthMode(val){
	val == "Sign In" ? authMode.value = 'Sign In' : authMode.value = "Sign Up"
	useHead({
		title: authMode.value,
		meta: [
			{
				name: 'description',
				content: authMode.value + ' to use Reciplease. Gain access to account features like saved recipes, view history, and previous shopping lists.'
			},
			{
				name: 'og:description',
				content: authMode.value + ' to use Reciplease. Gain access to account features like saved recipes, view history, and previous shopping lists.'
			},
			{
				name: 'og:title',
				content: authMode.value + ' · Reciplease'
			},
		]
	})
}
</script>

<style lang="sass" scoped>

</style>
