<template>
    <div class="flex gap-12 max-w-4xl justify-between p-10 py-16 rounded-xl shadow-xl border">
        <div class="flex justify-center w-full px-8">
            <img :src=image :alt="alt">
        </div>
        <div class="about-text max-w-1/2">
            <h2 class="font-semibold text-4xl w-fit">{{ title }}</h2>
            <h3 class="font-medium text-lg mt-6">{{ subline }}</h3>
            <p class="font-light mt-8">{{ desc }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    image: String,
    alt: String,
    subline: String,
    desc: String,
})
</script>

<style lang="sass" scoped>
.about-text
    max-width: 66%
</style>