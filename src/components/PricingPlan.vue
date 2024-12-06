<template>
    <div class="grid py-8 px-12 rounded-lg gap-6 border justify-items-start auto-rows-min">
        <h2 class="font-semibold">{{ plan }}</h2>
        <span class="text-3xl max-w-sm block">${{ price }}/month</span>
        <div class="flex flex-col gap-2">
            <span class="text-xl max-w-sm block font-light">{{ subtitle }}</span>
            <span class="text-sm max-w-sm block font-light h-4">{{ extraSubtitle }}</span>
        </div>
        <ButtonPrimary 
            class="mt-4" 
            :link="'auth'"
            :darkEmphasis="darkEmphasis"
        >
            Sign Up Now
        </ButtonPrimary>
        <div class="grid gap-4 mt-4 border-t py-4 pt-8 justify-items-start">
            <h3 class="text-2xl font-medium ">Features</h3>
            <ul 
                class="list-disc text-base">
                <li 
                    v-for="(feature, index) in features" :key="feature"
                    class="list-item items-center h-fit mt-2 font-light pl-4"
                >
                    <span class="text-base leading-8">{{ feature }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import ButtonPrimary from './ButtonPrimary.vue'
import { annotate, annotationGroup } from 'rough-notation'
import { onMounted } from 'vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
    plan: String,
    price: Number,
    subtitle: String,
    extraSubtitle: String,
    features: Array,
    darkEmphasis: Boolean
})

onMounted(()=>{
    const features = document.querySelectorAll('.annotate')
    const spanAnn = []
    features.forEach((elem)=>{
        spanAnn.push(annotate(elem, { type: 'underline', color: '#687441' }))
    })

	function showUnderlines(el, annotateEl){
		gsap.to(el, {
			scrollTrigger:{
				trigger: el,
				start: 'bottom bottom-=10%',
				onEnter: ()=>{
					annotateEl.show()
				}
			}
		})
	}

	showUnderlines(features[0], annotationGroup(spanAnn))
})
</script>

<style lang="sass" scoped>
ul
    list-style-type: url(./src/assets/svg/fork-knife.svg)
li
    &::marker
        content: url(./src/assets/svg/fork-knife.svg)

@media (prefers-color-scheme:dark)
    .pricing-plan
        background-color: g.$green-acc1  
        border-color: g.$green-acc1  

    #unlimited
        background-color: g.$green-acc3
</style>