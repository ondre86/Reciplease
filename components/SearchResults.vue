<template>
    <ul 
        class="mt-12 w-full flex flex-col items-center"
        v-if="searchStore.serverResponseList && searchStore.isValidRequest"
    >
        <li 
            v-for="recipe in searchStore.serverResponseList.recipes" :key="recipe.recipeName"
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
                    <span class="italic"> {{ recipe.description }}</span>
                    <div class="flex gap-4 mt-2" v-if="recipe.isVegetarian || recipe.isVegan">
                        <div class="recipe-badge border w-fit p-2 rounded-md" v-if="recipe.isVegetarian">Vegetarian</div>
                        <div class="recipe-badge border w-fit p-2 rounded-md" v-if="recipe.isVegan">Vegan</div>
                    </div>
                </div>
                <div class="flex flex-col gap-4 justify-center">
                    <ButtonPrimary 
                        class="toggled"
                        @click="searchStore.getRecipeDetails(recipe.recipeName)"
                        @keyup.enter="searchStore.getRecipeDetails(recipe.recipeName)"
                    >
                        View Recipe
                    </ButtonPrimary>
                </div>
            </div>
        </li>
    </ul>
    <div class="flex flex-col gap-2 my-6 mt-12 text-center" v-else>
        <span class="text-lg font-semibold">
            Your request was invalid. <br>
        </span>
        <span>Please try again.</span>
    </div>
    <UModal v-model="searchStore.recipeGenLimit" :ui="{ container: 'items-center', background: 'bg-white dark:bg-neutral-900' }" >
        <ButtonClose :svg-size="'15px'" :solo="true" class="absolute top-4 right-4 z-50" @click="searchStore.recipeGenLimit = false" @keyup.enter="searchStore.recipeGenLimit = false"></ButtonClose>
        <div class="p-4 py-6 flex flex-col items-center text-center gap-6 self-center relative">
            <h4 class="font-semibold text-2xl">Limit Reached</h4>
            <p>
                You've hit the limit for the free plan. <br>
                Please wait until next month or upgrade your plan.
            </p>
            <div class="flex flex-col items-center justify-center gap-4 mt-4 md:flex-row">
                <ButtonPrimary
                    class="toggled"
                    :link="'/pricing'"
                >
                    View Pricing Plans
                </ButtonPrimary>
                <ButtonSecondary
                    class="toggled cursor-pointer"
                    @click="searchStore.recipeGenLimit = false"
                    @keyup.enter="searchStore.recipeGenLimit = false"
                    tabindex="0"
                >
                    Close
                </ButtonSecondary>
            </div>
        </div>
    </UModal>
</template>

<script setup>
const searchStore = useSearchModeStore()

let storedSearchResults = JSON.parse(sessionStorage.getItem('searchResults'))
let parsedStoredSearchResults = []
storedSearchResults.forEach(result => {
    parsedStoredSearchResults.push(JSON.parse(result))
})

const storedSearchValidity = JSON.parse(sessionStorage.getItem('validSearch'))

if ((parsedStoredSearchResults && parsedStoredSearchResults.length > 0) && (storedSearchValidity && storedSearchValidity == true)){
    searchStore.serverResponseList.recipes = parsedStoredSearchResults
    searchStore.isValidRequest = storedSearchValidity
}

</script>

<style lang="sass" scoped>
.max-w-half
    max-width: 50%


.list-recipe
    background-color: g.$grey-fill

    @media (prefers-color-scheme:dark)
        background-color: g.$green-acc3

.recipe-badge
    background-color: #E9EED8
    border-color: g.$green-acc2

    @media (prefers-color-scheme:dark)
        background-color: g.$green-acc1
        border-color: g.$green-light

</style>