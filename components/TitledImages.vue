<template>
    <div class="flex flex-col my-24 md:my-28">
        <div class="text-center flex flex-col gap-6 items-center">
            <h2 id="home-title-1" class="text-4xl font-bold w-fit">Enjoy Cooking Again!</h2>
            <p class="font-light">
                Cooking is supposed to be a fun activity that brings you closer to friends and family. <br>
                Reciplease is here to help you get back to that.
            </p>
        </div>
        <div class="tilted-img-group flex flex-col gap-4 my-16 lg:flex-row items-center">
            <div class="feature-img shadow-2xl rounded-xl overflow-hidden">
                <img src="/public/img/IMG_6056.webp" width="300px" alt="Aglio e Olio pasta dish with shrimp on top and a glass of white wine">
            </div>
            <div class="feature-img shadow-2xl rounded-xl overflow-hidden">
                <img src="/public/img/IMG_6447.webp" width="300px" alt="Braised Short Rib on a bed of risotto with Broccolini and Rosemary garnishments">
            </div>
            <div class="feature-img shadow-2xl rounded-xl overflow-hidden">
                <img src="/public/img/IMG_6293.webp" width="300px" alt="Croque Monsieur with a side spinach salad and a glass of orange juice">
            </div>
        </div>
    </div>
</template>

<script setup>
import { annotate } from 'rough-notation';
const { $gsap } = useNuxtApp()

onMounted(() => {
    const imgs = document.querySelectorAll('.feature-img')
    const marquee = $gsap.timeline()

    $gsap.fromTo(imgs[0], {
        x: 105,
        y: 50,
        filter: 'blur(10px)',
        rotate: '-18deg'
    }, {
        x: 20,
        y: 40,
        filter: 'blur(0px)',
        rotate: '-10deg',
        scrollTrigger: {
            trigger: imgs[0],
            start: "top bottom-=21%",
            end: "+=30%",
            scrub: .5,
            immediateRender: false
        }
    })
    $gsap.fromTo(imgs[1], {
        y: 50,
        filter: 'blur(10px)',
    }, {
        y: 20,
        filter: 'blur(0px)',
        scrollTrigger: {
            trigger: imgs[1],
            start: "top bottom-=21%",
            end: "+=30%",
            scrub: .5,
            immediateRender: false
        }
    })
    $gsap.fromTo(imgs[2], {
        x: -105,
        y: 50,
        filter: 'blur(10px)',
        rotate: '18deg'
    }, {
        x: -20,
        y: 40,
        filter: 'blur(0px)',
        rotate: '10deg',
        scrollTrigger: {
            trigger: imgs[2],
            start: "top bottom-=21%",
            end: "+=30%",
            scrub: .5,
            immediateRender: false
        }
    })

    const title = document.querySelectorAll('#home-title-1')[0]
    const titleAnnotation = annotate(title, { 
        type: 'underline',
        color: '#687441'
    })

    marquee.to(title, {
        scrollTrigger: {
            trigger: title,
            start: 'bottom bottom-=20%',
            immediateRender: false,
            onEnter: ()=>{
                titleAnnotation.show()
            }
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
        z-index: 2

        img
            object-position: 0px -65px

    &:nth-of-type(2)
        z-index: 3
        img
            object-position: 0px -35px

    &:last-of-type
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
            z-index: 3

            img
                object-position: 0px 0px

        &:nth-of-type(2)
            z-index: 2
            img
                object-position: 0px 0px
                

        &:last-of-type
            margin: -3rem 0 0 0
            z-index: 1

            img
                object-position: 0px 0px

</style>