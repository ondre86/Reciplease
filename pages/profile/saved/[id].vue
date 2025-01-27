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

if (!db.currentRecipe.value){
	db.currentRecipe = await db.fetchRecipeById(route.params.id)
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

<style lang="scss" scoped>

</style>