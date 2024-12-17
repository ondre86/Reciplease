<template>
    <div class="max-w-4xl w-full min-w-48 profile-option border rounded-xl overflow-hidden">
        <div 
            class="flex flex-col p-6 justify-between items-center gap-12 md:gap-12">
            <div class="flex flex-col gap-3 text-center max-w-xl md:max-w-half">
                <h2 class="text-3xl font-bold">{{ optionTitle }}</h2>
                <span class="text-base">{{ subtitle }}</span>
            </div>
            <div class="flex flex-col gap-4 items-center self-center w-full md:w-fit">
                <ButtonPrimary class="toggled w-full md:w-fit" :link="link" :class="{ 'disabled': disabled }">{{ disabled ? "Coming Soon" : `View ${optionTitle}` }}</ButtonPrimary>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    optionTitle: String,
    subtitle: String,
    link: String,
    disabled: Boolean
})
</script>

<style lang="sass" scoped>
.profile-option
	background-color: g.$grey-fill

@media (prefers-color-scheme:dark)
	.profile-option
		background-color: g.$green-acc3
</style>