<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-8 gap-12" style="margin-top: calc(69.4px + 2rem);">
			<div
				class="flex items-center gap-3 self-start cursor-pointer back-text"
				@click="navigateTo('/profile')"
				@keyup.enter="navigateTo('/profile')"
			>
				<ButtonSearch
					:svg-width="'12px'"
					:svg-height="'12px'"
					class="rotate-180"
				>
				</ButtonSearch>
				<span>Go Back</span>
			</div>
			<div class="flex flex-col text-4xl justify-center items-center text-center gap-6">
				<h1 class="text-6xl font-semibold">Saved Recipes</h1>
			</div>
			<Transition name="fade" mode="out-in">
				<ul
					class="mt-8 w-full flex flex-col items-center"
					v-if="db.recipes && db.recipes.length > 0"
				>
					<li
						v-for="recipe in db.recipes.sort((a,b)=>{a.time - b.time})" :key="recipe.recipeName"
						class="mb-6 max-w-4xl w-full"
					>
						<div
							class="
								flex flex-col p-6 border rounded-xl justify-between list-recipe gap-12
								md:flex-row md:gap-12
							"
						>
							<div class="flex flex-col gap-3 max-w-xl md:max-w-half">
								<h2 class="text-3xl font-bold">{{ recipe.recipeName }}</h2>
								<span class="text-lg font-semibold">{{ recipe.cuisine }}</span>
								<span class="italic max-w-96"> {{ recipe.description }}</span>
								<div class="flex gap-4 mt-2" v-if="recipe.isVegetarian || recipe.isVegan">
									<div class="recipe-badge border w-fit p-2 rounded-md" v-if="recipe.isVegetarian">Vegetarian</div>
									<div class="recipe-badge border w-fit p-2 rounded-md" v-if="recipe.isVegan">Vegan</div>
								</div>
							</div>
							<div class="flex flex-col gap-4">
								<ButtonPrimary
									class="toggled"
									:link="`/profile/saved/${recipe.id}`"
									@click="db.currentRecipe = recipe"
									@keyup.enter="db.currentRecipe = recipe"
								>
									View Recipe
								</ButtonPrimary>
								<ButtonSecondary
									class="cursor-pointer"
									@click="modalOpen = true; db.currentRecipe = recipe;"
									@keyup.enter="modalOpen = true; db.currentRecipe = recipe;"
								>
									Delete Recipe
								</ButtonSecondary>
							</div>
							<UModal v-model="modalOpen" :ui="{ container: 'items-center', background: 'bg-white dark:bg-neutral-900' }">
								<div class="p-4 py-6 flex flex-col items-center text-center gap-6 self-center">
									<h4 class="font-semibold text-2xl">Confirm Recipe Deletion</h4>
									<p>
										Are you sure you want to delete this recipe from your list? <br>
									</p>
									<ButtonSecondary
										class="toggled cursor-pointer mt-4"
										@click="db.deleteRecipe(db.currentRecipe.id)"
										@keyup.enter="db.deleteRecipe(db.currentRecipe.id)"
									>
										Yes, I'm Sure
									</ButtonSecondary>
								</div>
							</UModal>
						</div>
					</li>
				</ul>
				<span class="text-center" v-else>
					No saved recipes. <br><br>
					Find a recipe and click the "Save" button to see it here.
				</span>
			</Transition>
		</main>
	</div>
</template>

<script setup>
definePageMeta({
  requiresAuth: true,
})
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

const links = [
	{
		label: 'Profile',
		icon: 'i-heroicons-user',
		to: '/profile'
	},
	{
		label: 'Saved',
		icon: 'i-heroicons-arrow-down-tray'
	},
]

const db = useFirestoreStore()

await db.fetchRecipes()

const modalOpen = ref(false)
</script>

<style lang="sass" scoped>
.recipe-badge
    background-color: #E9EED8
    border-color: g.$green-acc2

    @media (prefers-color-scheme:dark)
        background-color: g.$green-acc1
        border-color: g.$green-light
</style>