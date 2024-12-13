<template>
    <div 
        class="flex flex-col justify-center gap-4 mt-4 w-full max-w-2xl z-0"
    >
        <span 
            id="mode-descriptor" 
            class="w-full text-center mt-2 mb-6" 
        >
            {{modeDescriptor}}
        </span>
        <span class="text-center text-2xl font-medium">Find a Recipe:</span>
        <ul 
            class="flex flex-col gap-6 justify-center items-center sm:flex-row "
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
    </div>
</template>

<script setup>
const { $gsap } = useNuxtApp()

const windowSize = useWindowSize()
const isSmallScreen = useMediaQuery('(max-width: 700px)')

const searchStore = useSearchModeStore()

const modeDescriptors = {
    pantry: 'Search for recipes with your ingredients.',
    recipe: 'Search for a recipe by name.',
    random: 'Get inspiration from a random recipe.',
}

let modeDescriptor = ref(modeDescriptors[searchStore.getSearchMode])

function toggleSearchMode(event) {
	searchStore.changeSearchMode(event.target.getAttribute('data-searchmode'))
    searchStore.clearSearchTerms()
    searchStore.clearServerSearchTerms()

    if (searchStore.getSearchMode == 'random'){
        searchStore.sendSearchTerms()
    }

    const descriptorTL = $gsap.timeline()
    .to('#mode-descriptor', {
        y:20,
        opacity: 0,
        duration: .3
    })
    .call(()=>{
        modeDescriptor.value = modeDescriptors[event.target.getAttribute('data-searchmode')]
    })
    .to('#mode-descriptor', {
        y:0,
        opacity: 1,
        duration: .3
    })

	event.target.classList.add('toggled')
	event.target.setAttribute('aria-pressed', true)

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