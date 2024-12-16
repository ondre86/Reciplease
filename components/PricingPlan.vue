<template>
    <div class="grid p-8 px-9 rounded-lg gap-6 border justify-items-start auto-rows-min">
        <h2 class="font-semibold">{{ plan }}</h2>
        <span class="text-3xl max-w-sm block">${{ price }}/month</span>
        <div class="flex flex-col gap-2">
            <span class="text-xl max-w-sm block font-light">{{ subtitle }}</span>
            <span class="text-sm max-w-sm block font-light h-4">{{ extraSubtitle }}</span>
        </div>
        <ButtonPrimary 
            class="mt-4" 
            :class="{'disabled': disabled}"
            :link="link"
            :darkEmphasis="darkEmphasis"
        >
            {{text}}
        </ButtonPrimary>
        <div class="grid gap-4 mt-4 border-t py-4 pt-8 justify-items-start">
            <h3 class="text-2xl font-medium ">Features</h3>
            <ul 
                class="list-disc text-base">
                <li 
                    v-for="(feature, index) in features" :key="feature"
                    class="list-item items-center h-fit mt-2 font-light pl-3"
                >
                    <span class="text-base leading-8">{{ feature }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { annotate, annotationGroup } from 'rough-notation'
const { $gsap, $ScrollTrigger } = useNuxtApp()

const userStore = useAuthStore()

const props = defineProps({
    plan: String,
    price: Number,
    subtitle: String,
    extraSubtitle: String,
    features: Array,
    darkEmphasis: Boolean,
    disabled: Boolean,
    link: String,
    text: String
})

onMounted(()=>{
    const features = document.querySelectorAll('.annotate')
    const spanAnn = []
    features.forEach((elem)=>{
        spanAnn.push(annotate(elem, { type: 'underline', color: '#687441' }))
    })
})
</script>

<style lang="sass" scoped>
ul
    list-style-type: url(/svg/fork-knife.svg)
li
    &::marker
        content: url(/svg/fork-knife.svg)

@media (prefers-color-scheme:dark)
    .pricing-plan
        background-color: g.$green-acc1  
        border-color: g.$green-acc1  

    #unlimited
        background-color: g.$green-acc3
</style>