<template>
    <main
        class="loading flex flex-col justify-center items-center relative"
    >
        <LoadingAnimation></LoadingAnimation>
    </main>
</template>

<script setup>

</script>

<style lang="sass" scoped>
.loading
    margin-top: 0px
    height: calc( 100svh - 36px )

.cancel
    top: calc( 81px + 3rem )
</style>