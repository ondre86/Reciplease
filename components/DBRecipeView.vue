<template>
    <main
        class="flex flex-col items-center h-full px-8"
        ref="mainWrap"
        style="margin-top: calc(69.4px + 2rem);"
    >
            <div
				class="flex items-center gap-3 self-start cursor-pointer back-text mb-4"
				@click="navigateTo('/profile/saved')"
				@keyup.enter="navigateTo('/profile/saved')"
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
                <div class="overflow-hidden rounded-full max-w-fit self-center">
                    <img :src="recipe.image" alt="" width="200px">
                </div>
                <div class="flex flex-col gap-12">
                    <div class="flex flex-col gap-6 max-w-md text-center">
                        <h1 class="text-4xl font-bold">{{ recipe.recipeName }}</h1>
                        <span class="text-2xl font-semibold"> {{ recipe.cuisine }}</span>
                        <span class="font-light "> {{ recipe.description }}</span>
                        <div class="flex gap-4 mt-2 justify-center" v-if="recipe.isVegetarian || recipe.isVegan">
                            <div class="recipe-badge border w-fit p-2 rounded-md" v-if="recipe.isVegetarian">Vegetarian</div>
                            <div class="recipe-badge border w-fit p-2 rounded-md" v-if="recipe.isVegan">Vegan</div>
                        </div>
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
                        <li v-for="ingredient in recipe.ingredients" :key="ingredient.ingredient" class="my-2 border-b pb-2" >
                            <CheckboxInput :ingredient="ingredient" :multiplier="mult"></CheckboxInput>
                        </li>
                        <li v-for="ingredient in recipe.optionalIngredients" :key="ingredient.ingredient" class="my-2 border-b pb-2" >
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
                    <RouterLink to="/list" class="underline self-center">
                        View Shopping List
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="directions flex flex-col my-24 max-w-4xl border rounded-xl py-6 px-8 shadow-2xl">
            <div class="flex flex-col gap-6">
                <h2 class="text-4xl font-semibold text-center annotate w-fit self-center leading-8">Directions</h2>
                <ol class="list-decimal list-inside">
                    <li v-for="direction in recipe.instructions" :key="direction" class="my-3 text-4xl border-b py-4 leading-8">
                        <span class="text-xl">{{ direction }}</span>
                    </li>
                </ol>
            </div>
        </div>
    </main>
</template>

<script setup>
import { annotate } from 'rough-notation';

const props = defineProps({
    recipe: Object
})

const { $gsap, $ScrollTrigger } = useNuxtApp()

const searchStore = useSearchModeStore()
const db = useFirestoreStore()
const dbResult = ref(null)

const minServingSize = props.recipe.servingSize.minServings
const maxServingSize = props.recipe.servingSize.maxServings
const servingSizes = ref(props.recipe.servingSize)
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
const shoppingBtn = useTemplateRef('shopping-list-btn')

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
img
    width: 200px
    height: 200px
    object-fit: cover
    
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
                
</style>