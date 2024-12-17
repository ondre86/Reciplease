<template>
    <div 
        class="
            about-card flex flex-col gap-4 max-w-4xl justify-between p-8 py-10 rounded-xl shadow-xl border h-fit
            md:flex-row
        "
    >
        <div class="flex w-full md:px-8">
            <img 
                :src=image 
                :alt="alt" 
                class="
                    transition-all duration-300 min-h-20 w-full
                "
            >
        </div>
        <div class="about-text mt-6 md:mt-0">
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

    @media (max-width: 768px)
        max-width: none

.about-card
    &:hover
        div:has(img)
            img
                scale: (1.125)
</style>