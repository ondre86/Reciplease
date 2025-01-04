<template>
    <div class="flex flex-col mt-24 md:mt-32">
        <div class="text-center flex flex-col gap-4">
            <h2 class="text-4xl font-bold">Enjoy Cooking Again!</h2>
            <p class="font-light">
                Cooking is supposed to be a fun activity that brings you closer to friends and family. <br>
                Reciplease is here to help you get back to that.
            </p>
        </div>
        <div class="tilted-img-group flex flex-col gap-4 mt-16 mb-32 lg:flex-row items-center">
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