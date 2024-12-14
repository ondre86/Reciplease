<template>
    <div class="flex flex-col items-center">
      <DBRecipeView :recipe="db.currentRecipe"></DBRecipeView>
    </div>
</template>

<script setup>
definePageMeta({
  requiresAuth: true,
})

const db = useFirestoreStore()
</script>

<style lang="scss" scoped>

</style>