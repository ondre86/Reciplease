<template>
    <div 
        class="flex flex-col justify-center items-center gap-4 w-full max-w-2xl z-0"
    >
        <div 
            class="my-4 flex flex-col text-center gap-2 max-w-lg"
        >
            <span
                id="mode-descriptor"
                class="w-full text-center "
            >
                {{modeDescriptor}}
            </span>
            <span
                id="mode-helper"
                class="w-full text-center text-xs italic"
            >
                {{ modeHelper }}
            </span>
        </div>
        <h2 class="text-center text-2xl font-medium">Find a Recipe:</h2>
        <ul 
            class="flex flex-wrap gap-3 justify-center items-center sm:flex-row sm:gap-4"
        >
            <li>
                <ButtonPrimary
                    @click="toggleSearchMode($event)"
                    @keyup.space="toggleSearchMode($event)"
                    @keyup.enter="toggleSearchMode($event)"
                    data-searchmode="pantry"
                    :class="{ toggled: searchStore.getSearchMode == 'pantry' }"
                    :aria-pressed="searchStore.getSearchMode == 'pantry'"
                >
                    Search By Ingredients
                </ButtonPrimary>
            </li>
            <li>
                <ButtonPrimary
                    @click="toggleSearchMode($event)"
                    @keyup.space="toggleSearchMode($event)"
                    @keyup.enter="toggleSearchMode($event)"
                    data-searchmode="recipe"
                    :class="{ toggled: searchStore.getSearchMode == 'recipe' }"
                    :aria-pressed="searchStore.getSearchMode == 'recipe'"
                >
                    Search by Name
                </ButtonPrimary>
            </li>
            <li>
                <ButtonPrimary
                    @click="toggleSearchMode($event)"
                    @keyup.space="toggleSearchMode($event)"
                    @keyup.enter="toggleSearchMode($event)"
                    data-searchmode="random"
                    :class="{ toggled: searchStore.getSearchMode == 'random' }"
                    :aria-pressed="searchStore.getSearchMode == 'random'"
                >
                    Surprise Me!
                </ButtonPrimary>
            </li>
        </ul>
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
    </div>
</template>

<script setup>
const { $gsap } = useNuxtApp()

const searchStore = useSearchModeStore()
const authStore = useAuthStore()

const modeDescriptors = {
    pantry: 'Search for recipes with your ingredients.',
    recipe: 'Search for a recipe by name.',
    random: 'Get inspiration from a random recipe.',
}

let modeDescriptor = ref(modeDescriptors[searchStore.getSearchMode])
let modeHelper = ref('Press "Return" or "Enter" after each ingredient to add it to your search list. Then, press "Go" to generate results.')

async function toggleSearchMode(event) {
	searchStore.changeSearchMode(event.target.getAttribute('data-searchmode'))
    searchStore.clearSearchTerms()
    searchStore.clearServerSearchTerms()

    if (searchStore.getSearchMode == 'random'){
        if (!authStore.user) return await navigateTo('/auth')

        searchStore.getRecipeDetails()
    }

    if (event.target.getAttribute('data-searchmode') !== "random"){
        event.target.classList.add('toggled')
        event.target.setAttribute('aria-pressed', true)

        const descriptorTL = $gsap.timeline()
            .to(['#mode-descriptor', '#mode-helper'], {
                y:20,
                opacity: 0,
                duration: .3
            })
            .call(()=>{
                modeDescriptor.value = modeDescriptors[event.target.getAttribute('data-searchmode')]
                modeHelper.value = searchStore.getSearchMode == 'pantry' ? 'Press "Return" or "Enter" after each ingredient to add it to your search list. Then, press "Go" to generate results.' : 'Press "Return" or "Go" to generate results.'
            })
            .to(['#mode-descriptor', '#mode-helper'], {
                y:0,
                opacity: 1,
                duration: .3
            })
    }


	setTimeout(() => {
		event.target.blur()
	}, 200)

	const modeButtons = document.querySelectorAll('[data-searchmode]')
	for (let button of modeButtons){
		if (button.getAttribute('data-searchmode') !== searchStore.getSearchMode){
			button.classList.remove('toggled')
            button.setAttribute('aria-pressed', false)
		}
	}


}
</script>

<style lang="sass" scoped>

</style>