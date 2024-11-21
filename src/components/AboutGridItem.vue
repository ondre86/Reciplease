<template>
    <div class="about-card flex gap-12 max-w-4xl justify-between p-10 py-16 rounded-xl shadow-xl border">
        <div class="flex justify-center w-full px-8">
            <img :src=image :alt="alt" class="transition-all duration-300">
        </div>
        <div class="about-text max-w-1/2">
            <h2 class="font-bold text-4xl w-fit">{{ title }}</h2>
            <h3 class="font-semibold text-lg mt-6">{{ subline }}</h3>
            <div>
                <p class="font-light mt-8">{{ desc }}</p>
                <span class="font-normal"><br>{{ lastLine }}</span>
            </div>
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
    lastLine: String,
})
</script>

<style lang="sass" scoped>
.about-text
    max-width: 66%

.about-card
    &:hover
        div:has(img)
            img
                scale: (1.125)
</style>