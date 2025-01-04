
<template>
    <div class="flex flex-col gap-8 max-w-3xl p-8 rounded-lg border testimonial sm:flex-row">
        <UAvatar size="3xl" :src="img"></UAvatar>
        <div class="flex flex-col gap-2">
            <h3 class="font-semibold text-xl">{{name}}</h3>
            <p>{{text}}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    img: String,
    name: String,
    text: String
})
</script>

<style lang="sass" scoped>
.testimonial
    background-color: #fafafa

@media (prefers-color-scheme:dark) 
    .testimonial
        background-color: g.$green-acc3
</style>