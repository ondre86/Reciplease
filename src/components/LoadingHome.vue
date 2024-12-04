<template>
    <main
        class="loading flex flex-col justify-center items-center h-dvh"
    >
        <LoadingAnimation></LoadingAnimation>
    </main>
</template>

<script setup>
import LoadingAnimation from './LoadingAnimation.vue';
</script>

<style lang="sass" scoped>
.loading
    margin-top: 0px
</style>