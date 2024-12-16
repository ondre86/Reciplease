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
                <div class="flex flex-col gap-4">
                    <ButtonPrimary 
                        class="toggled"
                        @click="searchStore.getRecipeDetails(recipe.recipeName); searchStore.viewingSearchItems = false"
                        @keyup.enter="searchStore.getRecipeDetails(recipe.recipeName); searchStore.viewingSearchItems = false"
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
</template>

<script setup>
const searchStore = useSearchModeStore()

// let x = JSON.parse('{"isValidRequest":true,"recipes":[{"recipeName":"Salmon Fried Rice","description":"A flavorful stir-fry dish combining cooked rice, eggs, and tender pieces of salmon, seasoned with soy sauce and green onions.","cuisine":"Asian","servingSize":{"minServings":4,"maxServings":4},"isVegetarian":false,"isVegan":false},{"recipeName":"Salmon and Egg Rice Bowl","description":"A comforting rice bowl featuring a soft-boiled egg on a bed of seasoned rice topped with flaked salmon and a drizzle of soy sauce.","cuisine":"Japanese","servingSize":{"minServings":2,"maxServings":2},"isVegetarian":false,"isVegan":false},{"recipeName":"Baked Salmon with Rice and Eggs","description":"A hearty one-pan dish where salmon fillets are baked with a rice mixture and topped with eggs, creating a deliciously creamy texture.","cuisine":"American","servingSize":{"minServings":3,"maxServings":3},"isVegetarian":false,"isVegan":false},{"recipeName":"Spicy Salmon Rice Scramble","description":"A quick and easy scramble that combines eggs, spicy salmon, and rice, perfect for a protein-packed breakfast or lunch.","cuisine":"Fusion","servingSize":{"minServings":2,"maxServings":2},"isVegetarian":false,"isVegan":false},{"recipeName":"Salmon Egg Rice Patties","description":"Crispy rice patties made with flaked salmon and beaten eggs, perfect for appetizers or as a light meal.","cuisine":"Mediterranean","servingSize":{"minServings":4,"maxServings":4},"isVegetarian":false,"isVegan":false}]}')

// onMounted(()=>{
//     console.log(x)
// })


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