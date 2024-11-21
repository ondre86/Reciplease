<template>
    <div class="grid py-8 px-12 rounded-lg gap-6 outline-1 outline-slate-100 outline justify-center justify-items-center auto-rows-min">
        <h3 class="text-center font-semibold">{{ plan }}</h3>
        <span class="text-3xl text-center max-w-sm block">${{ price }}/month</span>
        <span class="text-xl text-center max-w-sm block font-light">{{ subtitle }}</span>
        <div class="grid gap-4 mt-4 border-t py-8 justify-items-center">
            <h4 class="text-2xl text-center font-medium ">Features</h4>
            <ul 
                class="list-disc text-base">
                <li 
                    v-for="(feature, index) in features" :key="feature"
                    class="list-item items-center h-fit mt-2 font-light"
                >
                    <span class="text-base">&nbsp;&nbsp;<span v-if="plan == 'Unlimited'" class="annotate">Unlimited</span>&nbsp;{{ feature }}</span>
                </li>
            </ul>
        </div>

        <ButtonPrimary 
            class="toggled mt-4" 
            :link="'auth'"
        >
            Sign Up Now
        </ButtonPrimary>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ButtonPrimary from './ButtonPrimary.vue'
import { annotate, annotationGroup } from 'rough-notation'
import { onMounted } from 'vue'

const props = defineProps({
    plan: String,
    price: Number,
    subtitle: String,
    features: Array,
})

onMounted(()=>{
    setTimeout(() => {
        const a1 = annotate(document.querySelectorAll('.annotate')[0], { 
            type: 'underline',
            color: '#687441'
        })
        const a2 = annotate(document.querySelectorAll('.annotate')[1], { 
            type: 'underline',
            color: '#687441'
        })
        const a3 = annotate(document.querySelectorAll('.annotate')[2], { 
            type: 'underline',
            color: '#687441'
        })
        const a4 = annotate(document.querySelectorAll('.annotate')[3], { 
            type: 'underline',
            color: '#687441'
        })
        const a5 = annotate(document.querySelectorAll('.annotate')[4], { 
            type: 'underline',
            color: '#687441'
        })
        const ag = annotationGroup([a1, a2, a3, a4, a5])
        
        ag.show()
    },
    750)
})
</script>

<style lang="sass" scoped>
@media (prefers-color-scheme:dark)
    .pricing-plan
        background-color: g.$green-acc1

li
    &::marker
        content: url(./src/assets/svg/fork-knife.svg)

</style>