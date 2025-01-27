<template>
    <div class="my-12 pt-12 md:my-24">
        <div class="flex flex-col gap-6 items-center">
            <h2 id="home-title-2" class="text-center text-4xl font-bold w-fit">We All Know the Struggle...</h2>
            <p class="font-light text-center">
                We listened to real people voice their opinions on their pain points with cooking and grocery shopping.<br>
            </p>
        </div>
        <div class="flex flex-col gap-8 mt-12">
            <Testimonial 
                :img="'/img/dai.webp'" 
                :altText="'Young black woman with curly hair'"
                :name="'Dai M.'" 
                :text="'I like to cook for my friends and family...and Instagram! Cooking new recipes is always fun, but sometimes I get stagnant. I wish I could just get quick suggestions to spice up my recipe repertoire.'">
            </Testimonial>
            <Testimonial 
                :img="'/img/derrick.jpg'"
                :altText="'Man holding phone taking self portrait looking to the side'"
                :name="'Derrick F.'" 
                :text="`Cooking is something that I have to do. I'd rather just get it over with as quickly and as painlessly as possible. I really dislike going shopping and not knowing what I need.`">
            </Testimonial>
            <Testimonial 
                :img="'/img/trisha.webp'"
                :altText="'Black woman holding a black dog with blue sky and clouds in background'"
                :name="'Margo D.'" 
                :text="`My kids come first, and I've got to feed them food that they'll like. I want to let them try interesting foods without breaking the bank and being surprised when I go grocery shopping.`">
            </Testimonial>
        </div>
    </div>
</template>

<script setup>
import { annotate } from 'rough-notation';
const { $gsap } = useNuxtApp()

onMounted(() => {
    const testimonials = document.querySelectorAll('.testimonial')
    const struggle = $gsap.timeline()

    testimonials.forEach(testimonial => {
        struggle.from(testimonial, {
            y: 50,
            opacity: 0,
            scrollTrigger: {
                trigger: testimonial,
                start: "top bottom-=15%",
                end: "+=30%",
                scrub: true,
                immediateRender: false
            }
        })
    })  

    const title2 = document.querySelectorAll('#home-title-2')[0]
    const titleAnnotation2 = annotate(title2, { 
        type: 'underline',
        color: '#687441'
    })

    struggle.to(title2, {
        scrollTrigger: {
            trigger: title2,
            start: 'bottom bottom-=20%',
            immediateRender: false,
            onEnter: ()=>{
                titleAnnotation2.show()
            }
        }
    })
})
</script>

<style lang="sass" scoped>

</style>