<template>
    <div class="flex flex-col gap-4 justify-center items-center p-1 text-wrap">
        <img :src="img" alt="" class="rounded-2xl">
        <span class="font-medium text-lg text-center">{{title}}</span>
    </div>
</template>

<script setup>
defineProps({
    img: String,
    title: String
})
</script>

<style lang="sass" scoped>
div
	min-width: 275px
	width: fit-content

img
	width: 275px
	height: 275px
	object-fit: cover
</style>