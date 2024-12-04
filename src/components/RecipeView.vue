<template>
    <main
        class="flex flex-col items-center h-full px-8"
        ref="mainWrap"
        style="margin-top: calc(69.4px + 2rem);"
    >
        <div
            class="flex items-center gap-3 self-start mb-8 cursor-pointer back-text"
            @click="searchStore.viewingRecipeFromSearch = false;"
            @keyup.enter="searchStore.viewingRecipeFromSearch = false;"
        >
            <ButtonSearch
                :svg-width="'12px'"
                :svg-height="'12px'"
                class="rotate-180"
            >
            </ButtonSearch>
            <span>Go Back</span>
        </div>
        <div class="flex flex-col max-w-4xl justify-between items-center gap-12">
            <div class="flex flex-col gap-8">
                <div class="overflow-hidden rounded-full max-w-fit self-center">
                    <img src="/src/assets/img/salmon.jpg" alt="" width="200px">
                </div>
                <div class="flex flex-col gap-12">
                    <div class="flex flex-col gap-6 max-w-md">
                        <h1 class="text-5xl font-bold text-center">{{ x.recipes[0].recipeName }}</h1>
                        <span class="text-2xl font-semibold text-center"> {{ x.recipes[0].cuisine }}</span>
                        <span class="font-light"> {{ x.recipes[0].description }}</span>
                    </div>
                </div>
            </div>
            <div class="ingredients py-6 px-8 rounded-xl border">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2 text-center mb-4">
                        <h2 class="text-4xl font-semibold annotate w-fit self-center">Ingredients</h2>
                    </div>
                    <div class="flex flex-col gap-4 items-center mb-4">
                            <span class="font-semibold text-xl">{{ x.recipes[0].servingSize.minServings }} to {{ x.recipes[0].servingSize.maxServings }} servings</span>
                            <div class="flex gap-2">
                                <ButtonPrimary style="font-size: .85rem; padding: 2px 8px;"><span style="font-size: .7rem;">x </span>1</ButtonPrimary>
                                <ButtonPrimary style="font-size: .85rem; padding: 2px 8px;"><span style="font-size: .7rem;">x </span>2</ButtonPrimary>
                                <ButtonPrimary style="font-size: .85rem; padding: 2px 8px;"><span style="font-size: .7rem;">x </span>4</ButtonPrimary>
                            </div>
                        </div>
                    <ul>
                        <li v-for="ingredient in x.recipes[0].ingredients" :key="ingredient.ingredient" class="my-2 border-b pb-2">
                            <CheckboxInput :ingredient="ingredient"></CheckboxInput>
                        </li>
                    </ul>
                    <ButtonPrimary class="my-2 toggled">Generate Shopping List</ButtonPrimary>

                </div>
            </div>
        </div>
        <div class="flex flex-col my-24 max-w-4xl border rounded-xl py-6 px-8">
            <div class="flex flex-col gap-6">
                <h2 class="text-4xl font-semibold text-center annotate w-fit self-center leading-8">Directions</h2>
                <ol class="list-decimal list-inside">
                    <li v-for="direction in x.recipes[0].instructions" :key="direction" class="my-3 text-4xl border-b py-4 leading-8">
                        <span class="text-xl">{{ direction }}</span>
                    </li>
                </ol>
            </div>
        </div>
    </main>
</template>

<script setup>
import ButtonSearch from './ButtonSearch.vue';
import CheckboxInput from './CheckboxInput.vue';
import ButtonPrimary from './ButtonPrimary.vue';
import { useSearchModeStore } from '@/stores/search';
import { useWindowSize } from '@vueuse/core';
import { onMounted } from 'vue';
import { annotate } from 'rough-notation';

const searchStore = useSearchModeStore()

const desktopMainWrapSize = 494
const windowSize = useWindowSize()

let x = JSON.parse(`{"isValidRequest":true,"recipes":[{"recipeName":"Salmon Fried Rice","description":"This colorful and nutritious fried rice recipe combines flaky salmon with vibrant vegetables and fluffy rice, all stir-fried together with a hint of soy sauce for an easy and delicious meal. It's a fantastic way to use up leftover rice and salmon, while packing in protein and veggies.","cuisine":"Asian","servingSize":{"minServings":2,"maxServings":4},"ingredients":[{"ingredient":"cooked rice","measurement":"cups","quantity":3},{"ingredient":"cooked salmon","measurement":"cups","quantity":1},{"ingredient":"carrot","measurement":"medium, diced","quantity":1},{"ingredient":"green peas","measurement":"cups","quantity":1},{"ingredient":"green onions","measurement":"stalks, chopped","quantity":2},{"ingredient":"soy sauce","measurement":"tablespoons","quantity":2},{"ingredient":"egg","measurement":"large, beaten","quantity":2},{"ingredient":"garlic","measurement":"cloves, minced","quantity":2},{"ingredient":"ginger","measurement":"teaspoon, minced","quantity":1},{"ingredient":"vegetable oil","measurement":"tablespoons","quantity":2},{"ingredient":"sesame oil","measurement":"teaspoons","quantity":1}],"optionalIngredients":[{"ingredient":"bell pepper","measurement":"medium, diced","quantity":1},{"ingredient":"cilantro","measurement":"cups, chopped","quantity":1}],"instructions":["Heat the vegetable oil in a large skillet or wok over medium heat.","Add the minced garlic and ginger, sauté for 1-2 minutes until fragrant.","Stir in the diced carrot and bell pepper (if using) and cook for 3-4 minutes, or until the vegetables start to soften.","Push the vegetables to the side of the skillet and pour the beaten eggs into the skillet. Scramble until fully cooked, then mix with the vegetables.","Add the cooked rice, cooked salmon, green peas, and soy sauce, stirring to combine everything evenly.","Stir-fry for about 5 minutes, until everything is heated through and the rice is slightly crispy.","Drizzle sesame oil over the rice and toss in the chopped green onions. Stir well to combine and serve hot."],"nutrition":{"calories":"450 kcal","sugars":"3 g","totalCarbs":"50 g","fiber":"3 g","totalFat":"15 g","saturatedFat":"2 g","cholesterol":"210 mg","sodium":"800 mg","protein":"25 g"},"isVegetarian":false,"isVegan":false}]}`)
onMounted(()=>{
    console.log(x)

    const a1 = annotate(document.querySelectorAll(".annotate")[0], { type: 'underline',color: '#687441' })
    const a2 = annotate(document.querySelectorAll(".annotate")[1], { type: 'underline',color: '#687441' })

    a1.show()
    a2.show()
})
</script>

<style lang="sass" scoped>
.back-text
    text-decoration: underline
    text-decoration-color: transparent
    text-underline-offset: 8px
    transition: all .3s

    &:hover, &:focus, &:active
        color: g.$green-primary
        text-decoration-color: g.$green-primary

        @media (prefers-color-scheme:dark)
            color: g.$green-light
            text-decoration-color: g.$green-light

ul, ol
    li
        &:last-of-type
            border-bottom: none

ol
    li
        color: g.$green-primary
        @media (prefers-color-scheme:dark) 
            color: g.$green-light

        span
            color: initial
            @media (prefers-color-scheme:dark) 
                color: g.$tan-primary
                
</style>