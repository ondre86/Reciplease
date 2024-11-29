<template>
    <div class="grid py-8 px-12 rounded-lg gap-6 border justify-center justify-items-center auto-rows-min">
        <h3 class="text-center font-semibold">{{ plan }}</h3>
        <span class="text-3xl text-center max-w-sm block">${{ price }}/month</span>
        <span class="text-xl text-center max-w-sm block font-light">{{ subtitle }}</span>
        <div class="grid gap-4 mt-4 border-t py-8 justify-items-center">
            <h4 class="text-2xl text-center font-medium ">Features</h4>
            <ul 
                class="list-disc text-base">
                <li 
                    v-for="(feature, index) in features" :key="feature"
                    class="list-item items-center h-fit mt-2 font-light pl-4"
                >
                    <span class="text-base leading-8"><span v-if="plan == 'Unlimited'" class="annotate">Unlimited</span>&nbsp;&nbsp;{{ feature }}</span>
                </li>
            </ul>
        </div>

        <ButtonPrimary 
            class="mt-4" 
            :link="'auth'"
            :darkEmphasis="darkEmphasis"
        >
            Sign Up Now
        </ButtonPrimary>
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
    features: Array,
    darkEmphasis: Boolean
})

onMounted(()=>{
    const features = {
		f1: document.querySelectorAll('.annotate')[0],
		f2: document.querySelectorAll('.annotate')[1],
		f3: document.querySelectorAll('.annotate')[2],
		f4: document.querySelectorAll('.annotate')[3],
		f5: document.querySelectorAll('.annotate')[4],
	}
	const spanAnn = {
		a1: annotate(features.f1, { 
				type: 'underline',
				color: '#687441'
			}),
		a2: annotate(features.f2, { 
				type: 'underline',
				color: '#687441'
			}),
		a3: annotate(features.f3, { 
				type: 'underline',
				color: '#687441'
			}),
		a4: annotate(features.f4, { 
				type: 'underline',
				color: '#687441'
			}),
		a5: annotate(features.f5, { 
				type: 'underline',
				color: '#687441'
			})
	}

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

	showUnderlines(features.f1, annotationGroup([spanAnn.a1, spanAnn.a2, spanAnn.a3, spanAnn.a4, spanAnn.a5]))
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