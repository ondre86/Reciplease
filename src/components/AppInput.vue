<template>
    <div class="flex flex-col gap-4 mt-4 w-full items-center z-20 max-w-2xl relative p-1">
        <input
            type="text"
            ref="search"
            v-model="searchInput"
            class="
                h-16 w-full px-4 py-2 pr-20 rounded-xl text-3xl transition-all duration-300 bg-transparent relative z-10
                focus:shadow-2xl focus-within:shadow-lg focus-visible:shadow-lg
            "
            @keydown="addToSearchTerms($event); hidePlaceholder()"
            @paste="addToSearchTerms($event)"
            @focus="hidePlaceholder"
            @blur="showPlaceholder"
        />
        <Transition name="fade" mode="out-in">
            <ButtonSearch
                :svg-width="'12px'"
                :svg-height="'12px'"
                class="absolute right-4 top-1/2 -translate-y-1/2"
                v-if="searchStore.getSearchTerms.size >= 1 || searchMode !== 'pantry'"
                @click="sendSearchtoServer"    
                @keyup.enter="sendSearchtoServer"
                @keyup.space="sendSearchtoServer"
            >
            </ButtonSearch>
        </Transition>
        <div class="text-3xl absolute left-6 top-1/2 -translate-y-1/2 z-0 placeholder-wrap text-nowrap overflow-hidden">
            <span id="placeholder" ref="placeholderEl">{{placeholder}}</span>
        </div>
    </div>
</template>

<script setup>
import ButtonSearch from './ButtonSearch.vue';
import { ref, onMounted, useTemplateRef, computed, watch } from 'vue';
import { useSearchModeStore } from '@/stores/search';
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import isURL from 'validator/es/lib/isURL';
import { useDark, whenever } from '@vueuse/core';
import { Profanity } from '@2toad/profanity';

const profanity = new Profanity({
    wholeWord: false
})
profanity.whitelist.addWords(['casserole', 'cassava', 'cassareep', 'glass', 'molasses', 'butter', 'buttered'])

defineEmits({
    submit: ({})=>{

    }
})

gsap.registerPlugin(TextPlugin)
const ingredientTL = gsap.timeline({
    repeat: -1,
})
const recipeTL = gsap.timeline({
    repeat: -1,
})

const isDark = useDark()
let outlineColor = isDark.value ? '#FEFAE0' : '#687441'
watch(isDark, (cur, prev)=>{
    if (cur){
        outlineColor = '#FEFAE0'
        search.value.style.outlineColor = outlineColor
    }
    else {
        outlineColor = '#687441'
        search.value.style.outlineColor = outlineColor
    }
})

const searchStore = useSearchModeStore()

const searchInput = defineModel('searchInput')
const search = ref(null)
const placeholder = ref('')
const placeholderEl = useTemplateRef('placeholderEl')
const validURL = ref(false)

const searchMode = computed(()=>searchStore.searchMode)
watch(searchMode, async (newMode, oldMode) =>{
    search.value.style.outlineColor = outlineColor
    searchInput.value = ''
    hidePlaceholder()
    setTimeout(() => {
        showPlaceholder()
        if (newMode == 'pantry'){
            recipeTL.pause()
            ingredientTL.play()
            startIngredientPlaceholderAnimation()
        }
        if(newMode == 'recipe'){
            ingredientTL.pause()
            recipeTL.play()
            startRecipePlaceholderAnimation()
        }
        if (newMode == 'random'){
            ingredientTL.pause()
            recipeTL.pause()
            placeholderEl.value.textContent = 'Search'
        }
    }, 500)

})

function hidePlaceholder(){
    gsap.to('#placeholder', {
        opacity: 0,
        duration: .5
    })
}
function showPlaceholder(){
    if (searchInput.value == '' || !searchInput.value){
        gsap.to(placeholderEl.value, {
            opacity: 1,
            duration: .5
        })
    }
}

function startIngredientPlaceholderAnimation(){
    ingredientTL.to('#placeholder', {
        text: {
            value:"tomato"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:"",
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"eggplant"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"applesauce"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"lemons"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"chicken breast"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"jumbo shrimp"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"penne pasta"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"green beans"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
}
function startRecipePlaceholderAnimation(){
    recipeTL.to('#placeholder', {
        text: {
            value:"grilled cheese"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"french fries"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"peach cobbler"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"stir fry rice"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"crawfish etoufee"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"shrimp fetuccine"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"lasagna"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            value:"green bean casserole"
        },
        duration: 2,
        delay: 1
    })
    .to('#placeholder', {
        text: {
            rtl: true,
            value:""
        },
        duration: 2,
        delay: 1
    })
}

onMounted(() => {
    startIngredientPlaceholderAnimation()
})

function isSearchEmpty(){
    if ((searchInput.value && (searchInput.value !== '' || searchInput.value !== ' '))){
        return false
    }
    return true
}
function sanitizeSearchTerm(event, key){
    if (key && !key.match(/[a-zA-Z\s]/)){
        event.preventDefault()
    }
}

function addToSearchTerms(event) {
    if (searchMode.value == 'pantry'){
        sanitizeSearchTerm(event, event.key)
        if (event.key === 'Enter' && !isSearchEmpty() && !profanity.exists(searchInput.value.replace(/[^a-zA-Z0-9]/g, ''))){
            searchStore.addSearchTerm(searchInput.value.replace(/[^a-zA-Z0-9\s]/g, ''))
            searchStore.addServerSearchTerm(searchInput.value.replace(/[^a-zA-Z0-9\s]/g, ''))
            searchInput.value = ''
        }
    }
    if (searchMode.value == 'recipe'){
        sanitizeSearchTerm(event, event.key)
        if (event.key === 'Enter' && !isSearchEmpty()){
            sendSearchtoServer()
            searchInput.value = ''
        }
    }
}

async function sendSearchtoServer(modifier){
    if (searchMode.value == 'recipe' && !isSearchEmpty()){
        searchStore.addServerSearchTerm(searchInput.value.replace(/[^a-zA-Z0-9\s]/g, ''))
        searchInput.value = ''
    }

    // emit event to change screen?

    await searchStore.sendSearchTerms(modifier)
}

</script>

<style lang="sass" scoped>
input 
    transition: all .3s
    border: 2px solid g.$green-acc2
    color: g.$green-acc2

    &:focus, &:focus-visible, &:focus-within
        outline: 6px solid g.$green-primary

.placeholder-wrap
    opacity: .7
    max-width: 70%

#placeholder
    color: g.$tan-acc3
    word-wrap: nowrap

@media (prefers-color-scheme: dark)
    input
        border-color: g.$tan-acc1
        color: g.$tan-primary

        &:focus, &:focus-visible, &:focus-within
            outline: 6px solid g.$tan-primary


</style>