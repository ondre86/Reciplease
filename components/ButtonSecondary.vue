<template>
    <div 
        class="w-fit px-3 py-2 rounded-lg ring-1 text-center transition-all duration-300"
        role="button"
    >
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style lang="sass" scoped>
div
    background-color: g.$red-primary
    font-size: 1.25rem
    font-weight: 500
    color: g.$tan-primary
    border: 1px solid g.$tan-primary
    --tw-ring-color: #8a514c

    &:hover
        background-color: g.$red-acc1
        --tw-ring-color: #502520

    &:active
        background-color: g.$red-acc2
        --tw-ring-color: #25110F

    &:focus, &:focus-visible, &:focus-within
        background-color: g.$red-acc1
        outline: 3px solid g.$red-acc2
        outline-offset: 3px

    @media (prefers-color-scheme: dark)
        &:focus, &:focus-visible, &:focus-within
            background-color: g.$red-acc1
            outline-color: g.$tan-primary

.inactive
    background-color: g.$tan-primary
    background-color: transparent
    color: g.$red-acc2

    &:hover, &:focus, &:active
        background-color: g.$tan-primary
        
    @media (prefers-color-scheme:dark)
        color: g.$tan-primary

        &:hover, &:focus, &:active
            background-color: transparent

.disabled
    opacity: 0.4
    cursor: not-allowed

    &:hover, &:focus, &:active
        background-color: g.$red-primary
        
</style>