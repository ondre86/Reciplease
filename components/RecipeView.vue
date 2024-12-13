<template>
    <main
        class="flex flex-col items-center h-full px-8"
        ref="mainWrap"
        style="margin-top: calc(69.4px + 2rem);"
    >
        <div
            class="flex items-center gap-3 self-start mb-8 cursor-pointer back-text"
            @click="searchStore.viewingRecipeFromSearch = false; searchStore.searchMode == 'random' ? searchStore.viewingSearchItems = false : searchStore.viewingSearchItems = true"
            @keyup.enter="searchStore.viewingRecipeFromSearch = false; searchStore.searchMode == 'random' ? searchStore.viewingSearchItems = false : searchStore.viewingSearchItems = true"
        >
            <ButtonSearch
                :svg-width="'12px'"
                :svg-height="'12px'"
                class="rotate-180"
            >
            </ButtonSearch>
            <span>Go Back</span>
        </div>
        <div 
            class="
                flex flex-col max-w-4xl justify-between items-center gap-12
                md:flex-row md:items-start md:gap-24
            "
        >
            <div class="flex flex-col gap-8 md:sticky md:top-28">
                <div class="overflow-hidden rounded-full max-w-fit self-center">
                    <img src="/assets/img/salmon.jpg" alt="" width="200px">
                </div>
                <div class="flex flex-col gap-12">
                    <div class="flex flex-col gap-6 max-w-md text-center">
                        <h1 class="text-5xl font-bold">{{ searchStore.serverResponseRecipe.recipes[0].recipeName }}</h1>
                        <span class="text-2xl font-semibold"> {{ searchStore.serverResponseRecipe.recipes[0].cuisine }}</span>
                        <span class="font-light "> {{ searchStore.serverResponseRecipe.recipes[0].description }}</span>
                    </div>
                </div>
            </div>
            <div class="ingredients py-6 px-8 rounded-xl border shadow-2xl w-80">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2 text-center mb-4">
                        <h2 class="text-4xl font-semibold annotate w-fit self-center">Ingredients</h2>
                    </div>
                    <div 
                        class="flex flex-col gap-4 items-center mb-4">
                            <span class="font-semibold text-xl" v-if="servingSizes.minServings !== servingSizes.maxServings">
                                {{ servingSizes.minServings }} to {{ servingSizes.maxServings }} servings
                            </span>
                            <span class="font-semibold text-xl" v-else>
                                {{ servingSizes.maxServings }} servings
                            </span>
                            <div class="flex gap-2">
                                <ButtonPrimary 
                                    class="text-xs p-1 servings-btn"
                                    :data-mult="1"
                                    @click="servingSizeCalculator($event, 1)"
                                    @keyup.enter="servingSizeCalculator($event, 1)"
                                    :class="'toggled'"
                                >
                                    <span style="font-size: .7rem;">x </span>
                                    1
                                </ButtonPrimary>
                                <ButtonPrimary 
                                    class="text-xs p-1 servings-btn"
                                    :data-mult="2"
                                    @click="servingSizeCalculator($event, 2)"
                                    @keyup.enter="servingSizeCalculator($event, 2)"
                                >
                                    <span style="font-size: .7rem;">x </span>
                                    2
                                </ButtonPrimary>
                                <ButtonPrimary 
                                    class="text-xs p-1 servings-btn"
                                    :data-mult="4"
                                    @click="servingSizeCalculator($event, 4)"
                                    @keyup.enter="servingSizeCalculator($event, 4)"
                                >
                                    <span style="font-size: .7rem;">x </span>
                                    4
                                </ButtonPrimary>
                            </div>
                        </div>
                    <span class="italic text-xs text-center mb-2">
                        Check off items that you don't want or need.
                    </span>

                    <ul>
                        <li v-for="ingredient in searchStore.serverResponseRecipe.recipes[0].ingredients" :key="ingredient.ingredient" class="my-2 border-b pb-2" >
                            <CheckboxInput :ingredient="ingredient" :multiplier="mult"></CheckboxInput>
                        </li>
                        <li v-for="ingredient in searchStore.serverResponseRecipe.recipes[0].optionalIngredients" :key="ingredient.ingredient" class="my-2 border-b pb-2" >
                            <CheckboxInput :ingredient="ingredient" :multiplier="mult"></CheckboxInput>
                        </li>
                    </ul>
                    <ButtonPrimary 
                        class="my-2 toggled self-center"
                        @click="addToShoppingList"
                        @keyup.enter="addToShoppingList"
                        :class="shoppingListButtonText == `Added!` ? 'disabled' : ''"
                        v-bind:['tabIndex']="shoppingListButtonText == `Added!` ? '-1' : '0'"
                        ref="shopping-list-btn"
                    >
                        {{ shoppingListButtonText }}
                    </ButtonPrimary>
                    <RouterLink to="list" class="underline self-center">
                        View Shopping List
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="directions flex flex-col my-24 max-w-4xl border rounded-xl py-6 px-8 shadow-2xl">
            <div class="flex flex-col gap-6">
                <h2 class="text-4xl font-semibold text-center annotate w-fit self-center leading-8">Directions</h2>
                <ol class="list-decimal list-inside">
                    <li v-for="direction in searchStore.serverResponseRecipe.recipes[0].instructions" :key="direction" class="my-3 text-4xl border-b py-4 leading-8">
                        <span class="text-xl">{{ direction }}</span>
                    </li>
                </ol>
            </div>
        </div>
    </main>
</template>

<script setup>
import { annotate } from 'rough-notation';
const { $gsap, $ScrollTrigger } = useNuxtApp()

const searchStore = useSearchModeStore()

// let x = JSON.parse(`{"isValidRequest":true,"recipes":[{"recipeName":"Salmon Fried Rice","description":"This colorful and nutritious fried rice recipe combines flaky salmon with vibrant vegetables and fluffy rice, all stir-fried together with a hint of soy sauce for an easy and delicious meal. It's a fantastic way to use up leftover rice and salmon, while packing in protein and veggies.","cuisine":"Asian","servingSize":{"minServings":2,"maxServings":4},"ingredients":[{"ingredient":"cooked rice","measurement":"cups","quantity":3},{"ingredient":"cooked salmon","measurement":"cups","quantity":1},{"ingredient":"carrot","measurement":"medium, diced","quantity":1},{"ingredient":"green peas","measurement":"cups","quantity":1},{"ingredient":"green onions","measurement":"stalks, chopped","quantity":2},{"ingredient":"soy sauce","measurement":"tablespoons","quantity":2},{"ingredient":"egg","measurement":"large, beaten","quantity":2},{"ingredient":"garlic","measurement":"cloves, minced","quantity":2},{"ingredient":"ginger","measurement":"teaspoon, minced","quantity":1},{"ingredient":"vegetable oil","measurement":"tablespoons","quantity":2},{"ingredient":"sesame oil","measurement":"teaspoons","quantity":1}],"optionalIngredients":[{"ingredient":"bell pepper","measurement":"medium, diced","quantity":1},{"ingredient":"cilantro","measurement":"cups, chopped","quantity":1}],"instructions":["Heat the vegetable oil in a large skillet or wok over medium heat.","Add the minced garlic and ginger, sauté for 1-2 minutes until fragrant.","Stir in the diced carrot and bell pepper (if using) and cook for 3-4 minutes, or until the vegetables start to soften.","Push the vegetables to the side of the skillet and pour the beaten eggs into the skillet. Scramble until fully cooked, then mix with the vegetables.","Add the cooked rice, cooked salmon, green peas, and soy sauce, stirring to combine everything evenly.","Stir-fry for about 5 minutes, until everything is heated through and the rice is slightly crispy.","Drizzle sesame oil over the rice and toss in the chopped green onions. Stir well to combine and serve hot."],"nutrition":{"calories":"450 kcal","sugars":"3 g","totalCarbs":"50 g","fiber":"3 g","totalFat":"15 g","saturatedFat":"2 g","cholesterol":"210 mg","sodium":"800 mg","protein":"25 g"},"isVegetarian":false,"isVegan":false}]}`)

const minServingSize = searchStore.serverResponseRecipe.recipes[0].servingSize.minServings
const maxServingSize = searchStore.serverResponseRecipe.recipes[0].servingSize.maxServings
const servingSizes = ref(searchStore.serverResponseRecipe.recipes[0].servingSize)
const mult = ref(1)
const shoppingListButtonText = ref('Add Unchecked to List')

function servingSizeCalculator($event, multiplier){
    mult.value = multiplier
    servingSizes.value.minServings = minServingSize * multiplier
    servingSizes.value.maxServings = maxServingSize * multiplier

    console.log($event.target)
    console.log(mult.value)

    if ($event.target.nodeName == "SPAN"){
        $event.target.parentElement.classList.add('toggled')
    	$event.target.parentElement.setAttribute('aria-pressed', true)
    }
    else {
        $event.target.classList.add('toggled')
    	$event.target.setAttribute('aria-pressed', true)
    }

	setTimeout(() => {
		$event.target.blur()
	}, 200)

	const servingsButtons = document.querySelectorAll('.servings-btn')
	for (let button of servingsButtons){
		if (button.getAttribute('data-mult') !== mult.value.toString()){
			button.classList.remove('toggled')
            button.setAttribute('aria-pressed', false)
		}
	}
}

const tempShoppingList = ref([])
const shoppingBtn = useTemplateRef('shopping-list-btn')

function addToShoppingList(){
    if (shoppingListButtonText.value !== 'Added!'){
        for(let item of tempShoppingList.value){
            if (!item.checked){
                let listItem = {
                    name: item.name, 
                    quantity: item.attributes[5].value,
                    measurement: item.attributes[6].value.split(',')[0]
                }

                searchStore.getShoppingList.forEach((item)=>{
                    let currentStoredShoppingListItem = JSON.parse(item)
                    
                    if (currentStoredShoppingListItem.name == listItem.name){
                        if(currentStoredShoppingListItem.measurement == listItem.measurement){
                            listItem.quantity = Number(listItem.quantity) + Number(currentStoredShoppingListItem.quantity)
                            if (currentStoredShoppingListItem.additionalMeasurements){
                                listItem.additionalMeasurements = currentStoredShoppingListItem.additionalMeasurements
                            }
                        }
                        else {
                            listItem.additionalMeasurements = currentStoredShoppingListItem.additionalMeasurements ? currentStoredShoppingListItem.additionalMeasurements : []
                            listItem.additionalMeasurements.push(`${currentStoredShoppingListItem.quantity} ${currentStoredShoppingListItem.measurement}`)
                        }
                        searchStore.deleteShoppingListItem(item)
                    }
                })

                searchStore.addItemToShoppingList(JSON.stringify(listItem))
            }
        }
        shoppingListButtonText.value = 'Added!'
    }

}

console.log(searchStore)



onMounted(()=>{
    const e1 = document.querySelectorAll(".annotate")[0]
    const e2 = document.querySelectorAll(".annotate")[1]

    const a1 = annotate(e1, { type: 'underline',color: '#687441' })
    const a2 = annotate(e2, { type: 'underline',color: '#687441' })

    function showUnderlines(el, annotateEl){
        $ScrollTrigger.create({
            trigger: el,
            start: 'bottom bottom-=30%',
            onEnter: ()=>{
                annotateEl.show()
            }
        })
	}

	showUnderlines(e1, a1)
	showUnderlines(e2, a2)

    tempShoppingList.value = document.querySelectorAll('input')
})
</script>

<style lang="sass" scoped>
.back-text
    text-decoration: underline
    text-decoration-color: transparent
    text-underline-offset: 8px
    transition: all .3s

    &:focus, &:active
        color: g.$green-primary
        text-decoration-color: g.$green-primary

        @media (prefers-color-scheme:dark)
            color: g.$green-light
            text-decoration-color: g.$green-light

@media (hover:hover)
    .back-text
        &:hover
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