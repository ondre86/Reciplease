<template>
    <main
        class="loading flex flex-col justify-center items-center h-dvh"
    >
        <LoadingAnimation></LoadingAnimation>
        <div v-if="searchStore.generatingRecipe" class="mt-6 text-center">
            <span class="text-md italic">
                Generating recipe... <br>
                Please don't refresh the page!
            </span>
        </div>
    </main>
</template>

<script setup>
const searchStore = useSearchModeStore()
</script>

<style lang="sass" scoped>
.loading
    margin-top: 0px
</style>