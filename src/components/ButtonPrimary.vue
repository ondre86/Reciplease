<template>
    <div 
        class="btn w-fit px-3 py-2 rounded-lg ring-1 h-fit transition-all duration-300 text-xl font-medium cursor-pointer text-center" 
        tabindex="0" 
        role="button" 
        v-if="!props.link"
    >
        <slot></slot>
    </div>
    <RouterLink 
        class="btn w-fit px-3 py-2 rounded-lg ring-1 h-fit transition-all duration-300 text-xl font-medium cursor-pointer text-center" 
        :to="link"
        v-else
    >
        <slot></slot>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    link: String
})

</script>

<style lang="sass" scoped>
div, a
    background-color: g.$tan-primary
    color: g.$green-acc1
    border: 1px solid g.$tan-primary
    --tw-ring-color: #687441
    outline: 3px solid transparent

    &:hover, &:focus:not(:active), &:focus-visible:not(:active), &:focus-within:not(:active)
        background-color: g.$green-acc1
        --tw-ring-color: #283618
        color: g.$tan-primary

    &:active
        background-color: g.$green-acc2
        --tw-ring-color: #141B0C
        color: g.$tan-primary

    &:focus:not(:active), &:focus-visible:not(:active), &:focus-within:not(:active)
        outline: 3px solid g.$green-acc2
        outline-offset: 3px

    @media (prefers-color-scheme: dark)
        background-color: g.$green-acc1
        border: 1px solid g.$green-acc2
        --tw-ring-color: #BBCC85
        color: g.$tan-primary

        &:hover
            background-color: g.$green-primary
            --tw-ring-color: #687441
            border-color: #FEFAE0
            color: g.$tan-primary

        &:active
            background-color: g.$green-acc2
            --tw-ring-color: #141B0C

        &:focus:not(:active), &:focus-visible:not(:active), &:focus-within:not(:active)
            outline: 3px solid g.$tan-primary
            outline-offset: 3px

        .toggled
            background-color: g.$green-light
            color: g.$green-acc2

    .toggled
        background-color: g.$green-primary
        color: g.$tan-primary

        &:hover
            background-color: g.$green-acc1
            --tw-ring-color: #283618
            color: g.$tan-primary

        &:active
            background-color: g.$green-acc2
            --tw-ring-color: #141B0C
            color: g.$tan-primary

        &:focus:not(:active), &:focus-visible:not(:active), &:focus-within:not(:active)
            background-color: g.$green-acc1
            outline: 3px solid g.$green-acc2
            outline-offset: 3px
            color: g.$tan-primary
</style>