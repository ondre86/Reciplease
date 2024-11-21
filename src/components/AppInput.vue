<template>
    <div class="flex flex-col gap-4 mt-4 w-full items-center z-20 max-w-2xl relative p-1">
        <input
            type="text"
            ref="search"
            v-model="searchInput"
            class="
                h-16 w-full px-4 py-2 rounded-xl text-3xl transition-all duration-300 bg-transparent relative z-10
                focus:shadow-2xl focus-within:shadow-lg focus-visible:shadow-lg
            "
            @keydown="addToSearchTerms($event)"
            @focus="hidePlaceholder"
            @blur="showPlaceholder"
        />
        <div class="text-3xl absolute left-6 top-1/2 -translate-y-1/2 z-0">
            <span id="placeholder" ref="placeholderEl">{{placeholder}}</span>
        </div>
        <Transition name="fade" mode="out-in">
            <ButtonSearch
                :svg-width="'12px'"
                :svg-height="'12px'"
                class="absolute right-4 top-1/2 -translate-y-1/2"
                v-if="searchStore.getSearchTerms.length >= 1 || searchMode !== 'pantry'"
            >
            </ButtonSearch>
        </Transition>
        <div class="text-3xl absolute left-6 top-1/2 -translate-y-1/2 z-0">
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

gsap.registerPlugin(TextPlugin)
const ingredientTL = gsap.timeline({
    repeat: -1,
})
const recipeTL = gsap.timeline({
    repeat: -1,
})
const urlTL = gsap.timeline({
    onInterrupt: ()=>{console.group("hish")}
})

const searchStore = useSearchModeStore()

const searchInput = defineModel('searchInput')
const placeholder = ref('')
const placeholderEl = useTemplateRef('placeholderEl')

const searchMode = computed(()=>searchStore.searchMode)

watch(searchMode, async (newMode, oldMode) =>{
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
        if (newMode == 'extractor'){
            ingredientTL.pause()
            recipeTL.pause()
            placeholderEl.value.textContent = 'Link to Recipe'
        }
    }, 500)

})

function addToSearchTerms(event) {
    if (searchMode.value == 'pantry'){
        if (!event.key.match(/[a-zA-Z\s]/)){
            event.preventDefault()
        }
        if (
            event.key === 'Enter' 
            && (searchInput.value && (searchInput.value !== '' || searchInput.value !== ' '))
        ){
            searchStore.addSearchTerm(searchInput.value)
            searchInput.value = ''
        }
    }
}
fetch(import.meta.env.VITE_SERVER_URL, {
            method: "POST",
            body: JSON.stringify({
                message: "respond"
            })
        })
        .then(response => response.json())
        .then(json => console.log(json))

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


</script>

<style lang="sass" scoped>
input 
    transition: all .3s
    border: 2px solid g.$green-acc2

    &:focus, &:focus-visible, &:focus-within
        outline: 4px solid g.$green-primary

    @media (prefers-color-scheme: dark)
        &:focus, &:focus-visible, &:focus-within
            outline: 4px solid g.$tan-primary

        color: g.$green-acc2
        
#placeholder
    color: g.$grey-divider


</style>