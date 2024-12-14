<template>
    <DBRecipeView :recipe="db.currentRecipe"></DBRecipeView>
</template>

<script setup>
definePageMeta({
  requiresAuth: true,
})

const db = useFirestoreStore()
</script>

<style lang="scss" scoped>

</style>