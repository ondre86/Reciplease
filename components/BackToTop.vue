<template>
<div class="flex justify-center mt-12 mb-4">
    <span 
        tabindex="0" 
        class="text-center font-light text-sm underline underline-offset-4 top outline-none cursor-pointer transition-all duration-200 hover:underline-offset-8 focus:underline-offset-8 focus:outline-none"
        @click="y = 0"
        @keyup.enter="y = 0"
    >
        Back To Top
    </span>
</div>
</template>

<script setup>
const { x, y } = useWindowScroll({behavior: 'smooth'})
</script>

<style lang="sass" scoped>
.top
    color: g.$green-primary

    &:hover, &:focus
        color: black

@media (prefers-color-scheme:dark)
    .top
        color: g.$green-light

        &:hover, &:focus
            color: g.$tan-primary
</style>