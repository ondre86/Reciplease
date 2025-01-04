
<template>
    <div class="flex flex-col items-center mt-6 py-12 px-6 gap-8 border rounded-xl cta">
        <div class="text-center flex flex-col gap-4">
            <h2 class="text-4xl font-bold">Try Reciplease for Free Today!</h2>
        </div>
        <ButtonPrimary :class="'toggled'" :link="'/auth'">Sign Up Now</ButtonPrimary>
    </div>
</template>

<script setup>

</script>

<style lang="sass" scoped>
.cta
    background-color: g.$grey-fill

@media (prefers-color-scheme:dark) 
    .cta
        background-color: g.$green-acc3
</style>