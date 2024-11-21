<template>
    <div class="flex flex-col justify-center gap-4 mt-16 w-full max-w-2xl z-0">
        <span class="text-center text-2xl font-medium">Let's Get a Recipe:</span>
        <ul class="flex gap-6 justify-center">
            <li>
                <ButtonPrimary
                    @click="toggleSearchMode($event)"
                    @keyup.space="toggleSearchMode($event)"
                    @keyup.enter="toggleSearchMode($event)"
                    data-searchmode="pantry"
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
                >
                    Search by Name
                </ButtonPrimary>
            </li>
            <li>
                <ButtonPrimary
                    @click="toggleSearchMode($event)"
                    @keyup.space="toggleSearchMode($event)"
                    @keyup.enter="toggleSearchMode($event)"
                    data-searchmode="extractor"
                >
                    Link to Recipe
                </ButtonPrimary>
            </li>
        </ul>
        <span id="mode-descriptor" class="mt-12 w-full text-center">{{modeDescriptor}}</span>
    </div>
</template>

<script setup>
import ButtonPrimary from './ButtonPrimary.vue';
import { useSearchModeStore } from '@/stores/search';
import { ref, onMounted } from 'vue';
import gsap from 'gsap';

const searchStore = useSearchModeStore()
const modeDescriptors = {
    pantry: 'Search for recipes based on ingredients you currently have.',
    recipe: 'Search for a recipe by name.',
    extractor: 'Paste or type in a recipe link.',
}

let modeDescriptor = ref(modeDescriptors.pantry)

function toggleSearchMode(event) {
	searchStore.changeSearchMode(event.target.getAttribute('data-searchmode'))
    searchStore.deleteSearchTerm(0, searchStore.getSearchTerms.length)

    const descriptorTL = gsap.timeline()
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
	}, 1000)

	const modeButtons = document.querySelectorAll('[data-searchmode]')
	for (let button of modeButtons){
		if (button.getAttribute('data-searchmode') !== searchStore.getSearchMode){
			button.classList.remove('toggled')
            button.setAttribute('aria-pressed', false)
		}
	}
}

onMounted(() => {
	document.querySelectorAll('[data-searchmode]')[0].classList.add('toggled')
    document.querySelectorAll('[data-searchmode]')[0].setAttribute('aria-pressed', true)
})
</script>

<style lang="sass" scoped>

</style>