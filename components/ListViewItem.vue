<template>
    <div class="checkbox-wrapper-1 flex items-center">
        <input class="substituted" type="checkbox" aria-hidden="true" :id="item.name" @click="check($event); $emit('checked', $event)"/>
        <label class="text-lg flex w-full" :for="item.name">
            <div class="flex flex-col gap-1">
                <span>{{ item.name }}</span>
                <span class="italic text-sm">
                    <span v-if="item.quantity !== '0'">{{ item.quantity }}&nbsp;</span>
                    <span>{{ item.measurement }}</span>
                    <div v-if="item.additionalMeasurements">
                        <span v-for="(additionalMeasurement, index) in item.additionalMeasurements" :key="index">
                            + {{ additionalMeasurement }}
                        </span>
                    </div>
                </span>
            </div>
        </label>
        <ButtonClose 
            class="ml-6" 
            :svg-size="'10px'" 
            :solo="true"
            @click="searchStore.deleteShoppingListItem(JSON.stringify(item))"
            @keyup.enter="searchStore.deleteShoppingListItem(JSON.stringify(item))"
        >
        </ButtonClose>
    </div>
</template>

<script setup>
const emit = defineEmits(['checked'])

defineProps({
    item: Object
})

const searchStore = useSearchModeStore()

function check($event){
    if ($event.target.tagName == "LABEL"){
        !$event.target.previousElementSibling.checked
    }
    if ($event.target.tagName == "SPAN"){
        !$event.target.parentElement.parentElement.previousElementSibling.checked
    }
    if ($event.target.tagName == "DIV"){
        !$event.target.parentElement.previousElementSibling.checked
    }
    if ($event.target.tagName == "INPUT"){
        !$event.target.checked
        if ($event.target.checked){
            $event.target.nextElementSibling.style.textDecoration = 'line-through'
            $event.target.nextElementSibling.style.textDecorationThickness = '10%'
        }
        else {
            $event.target.nextElementSibling.style.textDecoration = 'none'
        }
    }
}
</script>

  
<style scoped>
    .checkbox-wrapper-1 *,
    .checkbox-wrapper-1 ::after,
    .checkbox-wrapper-1 ::before {
        box-sizing: border-box;
    }
    .checkbox-wrapper-1 [type=checkbox].substituted {
        margin: 0;
        width: 0;
        height: 0;
        display: inline;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    .checkbox-wrapper-1 [type=checkbox].substituted + label:before {
        content: "";
        display: inline-block;
        vertical-align: top;
        height: 1.15rem;
        width: 1.15rem;
        min-width: 18.4px;
        margin-right: 0.6em;
        color: rgba(0, 0, 0, 0.275);
        border: solid 0.06em;
        box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em inset, 0 0 0 0.07em transparent inset;
        border-radius: 0.2em;
        background: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xml:space="preserve" fill="white" viewBox="0 0 9 9"><rect x="0" y="4.3" transform="matrix(-0.707 -0.7072 0.7072 -0.707 0.5891 10.4702)" width="4.3" height="1.6" /><rect x="2.2" y="2.9" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 12.1877 2.9833)" width="6.1" height="1.7" /></svg>') no-repeat center, white;
        background-size: 0;
        will-change: color, border, background, background-size, box-shadow;
        transform: translate3d(0, 25%, 0);
        transition: color 0.1s, border 0.1s, background 0.15s, box-shadow 0.1s;
    }
    .checkbox-wrapper-1 [type=checkbox].substituted:enabled:active + label:before,
    .checkbox-wrapper-1 [type=checkbox].substituted:enabled + label:active:before {
        box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset;
        background-color: #f0f0f0;
    }
    .checkbox-wrapper-1 [type=checkbox].substituted:checked + label:before {
        background-color: #687441;
        background-size: 0.75em;
        color: rgba(0, 0, 0, 0.075);
    }
    .checkbox-wrapper-1 [type=checkbox].substituted:checked:enabled:active + label:before,
    .checkbox-wrapper-1 [type=checkbox].substituted:checked:enabled + label:active:before {
        background-color: #283618;
        color: rgba(0, 0, 0, 0.275);
    }
    .checkbox-wrapper-1 [type=checkbox].substituted:focus + label:before {
        box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset, 0 0 0 3.3px #68744130, 0 0 0 5px #bbcc85c7;
    }
    .checkbox-wrapper-1 [type=checkbox].substituted:focus:active + label:before,
    .checkbox-wrapper-1 [type=checkbox].substituted:focus + label:active:before {
        box-shadow: 0 0 0.04em, 0 0.06em 0.16em -0.03em transparent inset, 0 0 0 0.07em rgba(0, 0, 0, 0.1) inset, 0 0 0 3.3px #68744130, 0 0 0 5px #bbcc854c;
    }
    .checkbox-wrapper-1 [type=checkbox].substituted:disabled + label:before {
        opacity: 0.5;
    }

    .checkbox-wrapper-1 [type=checkbox].substituted + label {
        -webkit-user-select: none;
        user-select: none;
    }
    .substituted:focus-visible{
        outline: none
    }
</style>
  

