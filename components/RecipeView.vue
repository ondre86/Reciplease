<template>
    <main
        class="flex flex-col items-center h-full px-8 mb-12"
        ref="mainWrap"
        style="margin-top: calc(69.4px + 2rem);"
    >
        <div
            class="flex items-center gap-3 self-start mb-8 cursor-pointer back-text"
            @click="$router.back(); searchStore.viewingRecipeFromSearch = false; searchStore.searchMode == 'random' ? (searchStore.viewingSearchItems = false, searchStore.submittedRequest = false, searchStore.requestFulfilled = false, searchStore.searchMode = 'pantry') : searchStore.viewingSearchItems = true;"
            @keyup.enter="$router.back(); searchStore.viewingRecipeFromSearch = false; searchStore.searchMode == 'random' ? (searchStore.viewingSearchItems = false, searchStore.submittedRequest = false, searchStore.requestFulfilled = false, searchStore.searchMode = 'pantry') : searchStore.viewingSearchItems = true;"
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
                md:flex-row md:items-start md:gap-36
            "
        >
            <div class="flex flex-col gap-8 md:sticky md:top-28">
                <div class="overflow-hidden rounded-full max-w-fit self-center shadow-lg">
                    <NuxtImg class="flex items-center justify-center text-center" :src="searchStore.serverResponseImage.results[0].thumbnail.src" :alt="imgAlt" width="200px" height="200px" @load="imgAlt = searchStore.serverResponseRecipe.recipes[0].recipeName" />
                </div>
                <div class="flex flex-col gap-12">
                    <div class="flex flex-col gap-4 max-w-md text-center">
                        <h1 class="text-4xl font-bold">{{ searchStore.serverResponseRecipe.recipes[0].recipeName }}</h1>
                        <span class="text-2xl font-semibold"> {{ searchStore.serverResponseRecipe.recipes[0].cuisine }}</span>
                        <div class="flex gap-4 justify-center" v-if="searchStore.serverResponseRecipe.recipes[0].isVegetarian || searchStore.serverResponseRecipe.recipes[0].isVegan">
                            <div class="recipe-badge border w-fit p-2 rounded-md" v-if="searchStore.serverResponseRecipe.recipes[0].isVegetarian">Vegetarian</div>
                            <div class="recipe-badge border w-fit p-2 rounded-md" v-if="searchStore.serverResponseRecipe.recipes[0].isVegan">Vegan</div>
                        </div>
                        <span class="font-light mt-4"> {{ searchStore.serverResponseRecipe.recipes[0].description }}</span>
                    </div>
                </div>
                <div class="flex flex-col justify-center items-center gap-4">
                    <ButtonSecondary 
                        class="flex items-center gap-2 cursor-pointer"
                        @click="addToDB()"
                        @keyup.enter="addToDB()"
                        :class="{'disabled': dbResult}"
                        :aria-disabled="dbResult ? true : false"
                    >
                        {{ dbResult ? 'Saved' : 'Save' }}
                        <UIcon name="i-heroicons-heart"></UIcon>
                    </ButtonSecondary>
                    <NuxtLink :to="'/profile/saved'" v-show="dbResult" class="underline underline-offset-4 transition-all duration-300">View Saved Recipes</NuxtLink>
                </div>
            </div>
            <div class="ingredients py-6 px-6 rounded-xl border shadow-2xl w-80">
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
                    </ul>
                    <ul>
                        <li class="text-xl text-center my-6 mt-4 pb-2 font-semibold border-b"><span>Optional Ingredients</span></li>
                        <li v-for="ingredient in searchStore.serverResponseRecipe.recipes[0].optionalIngredients" :key="ingredient.ingredient" class="my-2 border-b pb-2" >
                            <CheckboxInput :ingredient="ingredient" :multiplier="mult"></CheckboxInput>
                        </li>
                    </ul>
                    <ButtonPrimary 
                        class="my-2 toggled self-center"
                        @click="addToShoppingList"
                        @keyup.enter="addToShoppingList"
                        :class="shoppingListButtonText == `Added!` ? 'disabled' : ''"
                        ref="shopping-list-btn"
                        :aria-disabled="shoppingListButtonText == `Added!` ? true : false"
                    >
                        {{ shoppingListButtonText }}
                    </ButtonPrimary>
                    <NuxtLink to="/list" class="underline self-center">
                        View Shopping List
                    </NuxtLink>
                </div>
            </div>
        </div>
        <div class="directions flex flex-col mt-24 max-w-4xl border rounded-xl py-6 px-8 shadow-2xl">
            <div class="flex flex-col gap-6">
                <h2 class="text-4xl font-semibold text-center annotate w-fit self-center leading-8">Directions</h2>
                <ol class="list-decimal list-inside">
                    <li v-for="direction in searchStore.serverResponseRecipe.recipes[0].instructions" :key="direction" class="my-3 text-4xl border-b py-4 leading-8">
                        <span class="text-xl">{{ direction }}</span>
                    </li>
                </ol>
            </div>
        </div>
        <div class="nutrition flex flex-col mt-12 max-w-4xl border rounded-xl py-6 px-8 shadow-2xl">
            <div class="flex flex-col gap-6">
                <h2 class="text-4xl font-semibold text-center annotate w-fit self-center leading-8 mb-4">Nutrition</h2>
                <ul class="flex justify-center gap-6 flex-wrap w-fit">
                    <li v-for="(amount, macro) in searchStore.serverResponseRecipe.recipes[0].nutrition" :key="macro" class="text-4xl leading-8">
                        <div class="flex flex-col gap-4 border rounded-xl p-4 macro">
                            <span class="text-xl">{{ us.titleize(us.humanize(macro)) }}</span>
                            <em class="text-center text-2xl font-medium">{{ amount }}</em>
                        </div>
                    </li>
                </ul>
                <i class="text-center text-xs mt-2">per serving</i>
            </div>
        </div>
        <UModal v-model="modalOpen" :ui="{ container: 'items-center', background: 'bg-white dark:bg-neutral-900' }">
            <ButtonClose :svg-size="'15px'" :solo="true" class="absolute top-4 right-4 z-50" @click="modalOpen = false" @keyup.enter="modalOpen = false"></ButtonClose>
            <div class="p-4 py-6 flex flex-col items-center text-center gap-6 self-center relative">
                <h4 class="font-semibold text-2xl">Limit Reached</h4>
                <p>
                    You've hit the limit for the free plan. <br>
                    Please wait until next month or upgrade your plan.
                </p>
                <div class="flex flex-col justify-center items-center gap-4 mt-4 md:flex-row">
                    <ButtonPrimary
                        class="toggled"
                        :link="'/pricing'"
                    >
                        View Pricing Plans
                    </ButtonPrimary>
                    <ButtonSecondary
                        class="toggled cursor-pointer"
                        @click="modalOpen = false"
                        @keyup.enter="modalOpen = false"
                        tabindex="0"
                    >
                        Close
                    </ButtonSecondary>
                </div>
            </div>
        </UModal>
    </main>
</template>

<script setup>
import { annotate } from 'rough-notation'
import * as us from 'underscore.string'
const { $gsap, $ScrollTrigger } = useNuxtApp()

const searchStore = useSearchModeStore()
const db = useFirestoreStore()
await db.fetchRecipes()

const dbResult = ref(null)

db.recipes.forEach((recipe)=>{
    if (recipe.recipeName == searchStore.serverResponseRecipe.recipes[0].recipeName){
        dbResult.value = recipe
    }
})

const minServingSize = searchStore.serverResponseRecipe.recipes[0].servingSize.minServings
const maxServingSize = searchStore.serverResponseRecipe.recipes[0].servingSize.maxServings
const servingSizes = ref(searchStore.serverResponseRecipe.recipes[0].servingSize)
const mult = ref(1)
const shoppingListButtonText = ref('Add Unchecked to List')

function servingSizeCalculator($event, multiplier){
    mult.value = multiplier
    servingSizes.value.minServings = minServingSize * multiplier
    servingSizes.value.maxServings = maxServingSize * multiplier

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

function addToShoppingList(){
    if (shoppingListButtonText.value !== 'Added!'){
        for(let item of tempShoppingList.value){
            if (!item.checked){
                let listItem = {
                    name: item.name, 
                    quantity: item.attributes[5].value,
                    measurement: item.attributes[6].value.split(',')[0],
                    time: Date.now()
                }

                db.shoppingListItems.forEach((item)=>{
                    let currentStoredShoppingListItem = item
                    
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
                        db.deleteListItem(item.id)
                    }
                })

                db.addListItem(listItem)
            }
        }
        shoppingListButtonText.value = 'Added!'
    }

}

const modalOpen = ref(false)
const imgAlt = ref('')

function addToDB() {
    if (db.recipes.length == 10){
        modalOpen.value = true
        return
    }
    if (!dbResult.value){
        let addedRecipe = searchStore.serverResponseRecipe.recipes[0]
        addedRecipe.time = Date.now()
        addedRecipe.image = searchStore.serverResponseImage.results[0].thumbnail.src
        dbResult.value = db.addRecipe(addedRecipe)
    }
}

onMounted(()=>{
    setTimeout(() => {
        const e1 = document.querySelectorAll(".annotate")[0]
        const e2 = document.querySelectorAll(".annotate")[1]
        const e3 = document.querySelectorAll(".annotate")[2]

        const a1 = annotate(e1, { type: 'underline',color: '#687441' })
        const a2 = annotate(e2, { type: 'underline',color: '#687441' })
        const a3 = annotate(e3, { type: 'underline',color: '#687441' })

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
        showUnderlines(e3, a3)
    }, 500)


    tempShoppingList.value = document.querySelectorAll('input')
})
</script>

<style lang="sass" scoped>
img
    height: 200px
    width: 200px
    object-fit: cover
    background: url(/placeholder.png)

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

.recipe-badge
    background-color: #E9EED8
    border-color: g.$green-acc2

    @media (prefers-color-scheme:dark)
        background-color: g.$green-acc1
        border-color: g.$green-light

.macro
    background-color: g.$grey-fill
    @media (prefers-color-scheme:dark)
        background-color: g.$green-acc1
</style>