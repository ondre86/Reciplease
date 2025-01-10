<template>
    <div class="flex flex-col mt-6 py-12 w-full overflow-x-scroll">
        <div class="text-center flex flex-col gap-4 mb-8 items-center">
            <h2 id="home-title-4" class="text-4xl font-bold">Get Inspired</h2>
            <p class="font-light">
                Expand your creativity and surprise your tastebuds.
                <br>
            </p>
        </div>
        <SwiperComponent></SwiperComponent>
    </div>
</template>

<script setup>
import { annotate } from 'rough-notation';
const { $gsap } = useNuxtApp()

onMounted(() => {
    const inspo = $gsap.timeline()

    const title4 = document.querySelectorAll('#home-title-4')[0]
    const titleAnnotation4 = annotate(title4, { 
        type: 'underline',
        color: '#687441'
    })

    inspo.to(title4, {
        scrollTrigger: {
            trigger: title4,
            start: 'bottom bottom-=20%',
            immediateRender: false,
            onEnter: ()=>{
                titleAnnotation4.show()
            }
        }
    })
})
</script>


