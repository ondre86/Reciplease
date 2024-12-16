<template>
    <main
        class="loading flex flex-col justify-center items-center h-dvh"
    >
        <LoadingAnimation></LoadingAnimation>
        <div v-if="searchStore.viewingRecipeFromSearch && !searchStore.requestFulfilled">
            <span class="text-md italic">
                Generating recipe... <br><br>
                Please be patient!
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