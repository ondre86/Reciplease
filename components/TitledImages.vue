<template>
    <div class="flex flex-col mt-24 md:mt-32">
        <div class="text-center flex flex-col gap-6 items-center">
            <h2 id="home-title-1" class="text-4xl font-bold w-fit">Enjoy Cooking Again!</h2>
            <p class="font-light">
                Cooking is supposed to be a fun activity that brings you closer to friends and family. <br>
                Reciplease is here to help you get back to that.
            </p>
        </div>
        <div class="tilted-img-group flex flex-col gap-4 my-12 lg:flex-row items-center">
            <div class="feature-img shadow-2xl rounded-xl overflow-hidden">
                <img src="/public/img/IMG_6056.webp" width="300px" alt="">
            </div>
            <div class="feature-img shadow-2xl rounded-xl overflow-hidden">
                <img src="/public/img/IMG_6447.webp" width="300px" alt="">
            </div>
            <div class="feature-img shadow-2xl rounded-xl overflow-hidden">
                <img src="/public/img/IMG_6293.webp" width="300px" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import { annotate } from 'rough-notation';
const { $gsap, $ScrollTrigger } = useNuxtApp()

onMounted(() => {
    const imgs = document.querySelectorAll('.feature-img')
    const testimonials = document.querySelectorAll('.testimonial')

    $ScrollTrigger.create({
        animation: $gsap.from(imgs[0], {
            x: 105,
            y: 50,
            filter: 'blur(10px)'
        }),
        trigger: imgs[0],
        start: "top bottom-=15%",
        end: "+=40%",
        scrub: true
    })
    $ScrollTrigger.create({
        animation: $gsap.from(imgs[1], {
            y: 50,
            filter: 'blur(10px)'
        }),
        trigger: imgs[1],
        start: "top bottom-=15%",
        end: "+=40%",
        scrub: true
    })
    $ScrollTrigger.create({
        animation: $gsap.from(imgs[2], {
            x: -105,
            y: 50,
            filter: 'blur(10px)'
        }),
        trigger: imgs[2],
        start: "top bottom-=15%",
        end: "+=40%",
        scrub: true
    })

    $ScrollTrigger.create({
        animation: $gsap.from(testimonials[0], {
            y: 50,
            opacity: 0
        }),
        trigger: testimonials[0],
        start: "top bottom-=15%",
        end: "+=30%",
        scrub: true
    })
    $ScrollTrigger.create({
        animation: $gsap.from(testimonials[1], {
            y: 50,
            opacity: 0
        }),
        trigger: testimonials[1],
        start: "top bottom-=15%",
        end: "+=30%",
        scrub: true
    })
    $ScrollTrigger.create({
        animation: $gsap.from(testimonials[2], {
            y: 50,
            opacity: 0
        }),
        trigger: testimonials[2],
        start: "top bottom-=15%",
        end: "+=30%",
        scrub: true
    })

    const title = document.querySelectorAll('#home-title-1')[0]
    const titleAnnotation = annotate(title, { 
        type: 'underline',
        color: '#687441'
    })

    $ScrollTrigger.create({
        trigger: title,
        start: 'bottom bottom-=20%',
        onEnter: ()=>{
            titleAnnotation.show()
        }
    })
})
</script>

<style lang="sass" scoped>
.feature-img
    width: fit-content

    img 
        object-fit: cover
        height: 300px


    &:first-of-type
        rotate: -15deg
        transform: translate(25px, 50px)
        z-index: 2

        img
            object-position: 0px -65px

    &:nth-of-type(2)
        z-index: 3
        img
            object-position: 0px -35px

    &:last-of-type
        rotate: 15deg
        transform: translate(-25px, 50px)
        z-index: 2

        img
            object-position: 0px -85px


@media (max-width: 1022px) 
    .tilted-img-group
        margin: 4rem 0 1rem
    .feature-img
        img 
            width: 400px
            height: 100%
            max-height: 400px

        &:first-of-type
            rotate: -8deg
            transform: translate(0px, 25px)
            z-index: 3

            img
                object-position: 0px 0px

        &:nth-of-type(2)
            z-index: 2
            img
                object-position: 0px 0px
                

        &:last-of-type
            rotate: 8deg
            transform: translate(0px, -50px)
            z-index: 1

            img
                object-position: 0px 0px

</style>