<template>
    <div class="add-items flex flex-col gap-4 items-start py-6 px-8 border rounded-xl h-fit">
        <h2 class="text-2xl font-semibold mb-4 annotate">Add Items to List</h2>
        <div class="flex flex-col gap-10">
            <div class="flex flex-col">
                <label class="text-lg font-medium" for="list-item-input">Ingredient</label>
                <input
                    type="text"
                    class="
                        h-10 w-full px-4 py-2 mt-2 rounded-md text-2xl transition-all duration-300 bg-transparent relative z-10
                        focus:shadow-2xl focus-within:shadow-lg focus-visible:shadow-lg
                    "
                    :class="{'red-border': isDuplicate}"
                    v-model="listItemInput"
                    id="list-item-input"
                    ref="list-item-input-el"
                    placeholder="chicken broth"
                    title="Enter the name of the ingredient."
                    pattern="([A-Za-z]+[\-]?( ?[A-Za-z\-]+)+)"
                    required
                    @keydown="sanitizeInput($event)"
                    @keydown.enter="addToList"
                >
                <span id="item-error-msg" v-if="isDuplicate" class="mt-2 font-normal">{{ errorMsg }}</span>
            </div>
            <div class="flex flex-col">
                <label for="list-quantity-input" class="text-lg font-medium">Quantity & Unit</label>
                <input
                    type="text"
                    class="
                        h-10 w-full px-4 py-2 mt-2 rounded-md text-2xl transition-all duration-300 bg-transparent relative z-10
                        focus:shadow-2xl focus-within:shadow-lg focus-visible:shadow-lg
                    "
                    :class="{'red-border': isDuplicate}"
                    v-model="listQuantityInput"
                    id="list-quantity-input"
                    ref="list-quantity-input-el"
                    placeholder="2 boxes"
                    title="Format entries like this: 'number' + space + 'unit'."
                    pattern="([0-9]+)\s([a-zA-Z])+\s{0,}"
                    minlength="3"
                    maxlength="20"
                    required
                    @keydown="sanitizeInput($event, true)"
                    @keydown.enter="addToList"
                >
            </div>
        </div>
        <Transition name="fade" mode="out-in">
            <ButtonPrimary
                v-if="listItemInput && listQuantityInput && listItemInputElement.validity.valid && listQuantityInputElement.validity.valid"
                class="toggled self-center mt-6"
                @click="addToList"
                @keyup.enter="addToList"
            >
                Add To List
            </ButtonPrimary>
        </Transition>
    </div>
</template>

<script setup>
import ButtonPrimary from './ButtonPrimary.vue';
import { useTemplateRef, ref, onMounted, watch } from 'vue';
import { useSearchModeStore } from '@/stores/search';
import { Profanity } from '@2toad/profanity';

const profanity = new Profanity({
    wholeWord: false
})
profanity.whitelist.addWords(['casserole', 'cassava', 'cassareep', 'glass', 'molasses', 'butter', 'buttered'])

const emit = defineEmits(['newItem'])

const searchStore = useSearchModeStore()
const isTouch = ref(window.matchMedia("(pointer: coarse)").matches)

const listItemInput = defineModel('listItemInput')
const listQuantityInput = defineModel('listQuantityInput')
const listItemInputElement = useTemplateRef('list-item-input-el')
const listQuantityInputElement = useTemplateRef('list-quantity-input-el')

const isDuplicate = ref(null)
const errorMsg = 'This ingredient is in your list already.'

watch(listItemInput, (cur, prev)=>{
    if (isDuplicate.value == true){
        if (cur !== prev){
            isDuplicate.value = false
        }
    }
})

watch(searchStore.shoppingList, (cur)=>{
    searchStore.getShoppingList.forEach((listItem)=>{
        let item = JSON.parse(listItem)

        if (listItemInput.value && listItemInput.value.trimEnd() !== item.name){
            isDuplicate.value = false
        }
    })
})

function sanitizeInput(event, canHaveNumbers) {
    let pattern = canHaveNumbers ? /[a-zA-Z0-9\s]/ : /[a-zA-Z\s\-]/
    if (event.key && !event.key.match(pattern)){
        event.preventDefault()
    }
}

function findDuplicate(item1, item2) {
    if (item1.name == item2.name && item1.quantity == item2.quantity && item1.measurement == item2.measurement){
        isDuplicate.value = true
        return
    }
    else {
        isDuplicate.value = false
        return
    }
}

function addToList(){
    isDuplicate.value = false
    if (
        (listItemInputElement.value.validity.valid && listQuantityInputElement.value.validity.valid) &&
        !profanity.exists(listItemInput.value) && !profanity.exists(listQuantityInput.value)
    ){
        let listItem = {
            name: listItemInput.value.trimEnd(),
            quantity: listQuantityInput.value.split(' ')[0],
            measurement: listQuantityInput.value.split(' ')[1].trimEnd()
        }

        searchStore.getShoppingList.forEach((item)=>{
            let currentStoredShoppingListItem = JSON.parse(item)

            findDuplicate(listItem, currentStoredShoppingListItem)

            if (!isDuplicate.value){
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
            }
        })
        if (!isDuplicate.value){
            searchStore.addItemToShoppingList(JSON.stringify(listItem))

            emit('newItem')

            listItemInput.value = ''
            listQuantityInput.value = ''

            if (!isTouch) listItemInputElement.value.focus()
            else {
                listItemInputElement.value.blur()
                listQuantityInputElement.value.blur()
            }
        }
    }

}
</script>

<style lang="sass" scoped>
.add-items
    background-color: g.$grey-fill

input
    transition: all .3s
    border: 2px solid g.$grey-divider
    color: g.$green-acc2

    &::placeholder
        color: g.$grey-divider

    &:focus, &:focus-visible, &:focus-within
        outline: 6px solid g.$green-primary

#item-error-msg
    color: g.$red-primary

.red-border
    border: 2px solid g.$red-primary

    &:focus, &:focus-visible, &:focus-within
        outline: 6px solid g.$red-primary

@media (prefers-color-scheme: dark)
    input[type=text]
        border-color: g.$green-acc1
        color: g.$tan-primary
        background-color: g.$green-acc2

        &:focus, &:focus-visible, &:focus-within
            outline: 6px solid g.$tan-primary

        &::placeholder
            color: g.$green-acc1

    .add-items
        background-color: g.$green-acc2

</style>