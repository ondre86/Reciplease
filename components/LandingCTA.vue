
<template>
    <div class="flex flex-col items-center mt-16 mb-24 py-12 px-6 gap-8 border rounded-xl cta">
        <div class="text-center flex flex-col gap-4">
            <h2 class="text-4xl font-bold">Try Reciplease for Free Today!</h2>
        </div>
        <ButtonPrimary :class="'toggled'" :link="'/auth'">Sign Up Now</ButtonPrimary>
    </div>
</template>

<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp()

onMounted(() => {
    $ScrollTrigger.create({
        animation: $gsap.from(".cta", {
            y: 40,
            opacity: 0
        }),
        trigger: '.cta',
        start: "top bottom-=15%",
        end: "+=30%",
        scrub: true
    })
})


</script>

<style lang="sass" scoped>
.cta
    background-color: g.$grey-fill

@media (prefers-color-scheme:dark) 
    .cta
        background-color: g.$green-acc3
</style>