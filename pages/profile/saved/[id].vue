<template>
    <div class="flex flex-col items-center">
      <DBRecipeView :recipe="db.currentRecipe"></DBRecipeView>
    </div>
</template>

<script setup>
definePageMeta({
  requiresAuth: true,
})

const db = useFirestoreStore()
const route = useRoute()

console.log(route.params.id)
console.log(db.currentRecipe.value)

if (!db.currentRecipe.value){
	db.currentRecipe = await db.fetchRecipeById(route.params.id)
	console.log(db.currentRecipe)
}

useHead({
  title: `${db.currentRecipe.recipeName}`,
  meta: [
	{
		name: 'description',
		content: `${db.currentRecipe.description}`
	},
	{
		name: 'og:description',
		content: `${db.currentRecipe.description}`
	},
	{
		name: 'og:title',
		content: `${db.currentRecipe.recipeName} · Reciplease`
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

<style lang="scss" scoped>

</style>