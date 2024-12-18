<template>
    <div>
        <NuxtPage />
    </div>
</template>

<script setup>
definePageMeta({
  requiresAuth: true,
})
const searchStore = useSearchModeStore()
</script>

<style lang="sass" scoped>
</style>