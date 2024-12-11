<template>
    <div class="mb-6 max-w-4xl w-full min-w-48 profile-option">
        <div 
            class="flex flex-col p-6 border rounded-xl justify-between items-center gap-12 md:gap-12">
            <div class="flex flex-col gap-3 max-w-xl md:max-w-half">
                <h2 class="text-3xl font-bold text-center">{{optionTitle}}</h2>
            </div>
            <div class="flex flex-col gap-4 items-center self-center">
                <ButtonPrimary class="toggled" :link="link">View</ButtonPrimary>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    optionTitle: String,
    link: String
})
</script>

<style lang="sass" scoped>
.profile-option
	background-color: g.$grey-fill

@media (prefers-color-scheme:dark)
	.profile-option
		background-color: g.$green-acc3
</style>