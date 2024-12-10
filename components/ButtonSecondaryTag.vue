<template>
    <div class="tag w-fit px-3 py-2 rounded-lg ring-1 transition duration-300 flex gap-4 justify-between items-center">
        <slot></slot>
        <ButtonClose 
            class="tag-x ring-1" 
            :svgSize="'8px'" 
            :solo="false"
            @click="searchStore.deleteSearchTerm(term); searchStore.deleteServerSearchTerm(term)"
            @keyup.space="searchStore.deleteSearchTerm(term); searchStore.deleteServerSearchTerm(term)"
            @keyup.enter="searchStore.deleteSearchTerm(term); searchStore.deleteServerSearchTerm(term)"
        >
        </ButtonClose>
    </div>
</template>

<script setup>
const searchStore = useSearchModeStore()

const props = defineProps({
    term: String
})

</script>

<style lang="sass" scoped>
.tag
    background-color: g.$red-primary
    font-size: 1.25rem
    font-weight: 500
    color: g.$tan-primary
    border: 1px solid g.$tan-primary
    --tw-ring-color: #8a514c

.tag-x
    background-color: g.$tan-primary

    &:focus:not(:active), &:focus-visible:not(:active), &:focus-within:not(:active)
        outline: 3px solid g.$tan-primary
        outline-offset: 3px

</style>