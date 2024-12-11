<template>
    <div 
        class="btn w-fit px-3 py-2 rounded-lg ring-1 h-fit transition-all duration-300 text-xl font-medium cursor-pointer text-center" 
        tabindex="0" 
        role="button" 
        :class="{ toggled: darkEmphasis }"
        v-if="!props.link"
    >
        <slot></slot>
    </div>
    <NuxtLink 
        class="btn w-fit px-3 py-2 rounded-lg ring-1 h-fit transition-all duration-300 text-xl font-medium cursor-pointer text-center" 
        :to="link"
        :class="{ toggled: darkEmphasis }"
        v-else
    >
        <slot></slot>
    </NuxtLink>
</template>

<script setup>
const props = defineProps({
    link: String,
    darkEmphasis: Boolean
})

</script>

<style lang="sass" scoped>
div, a
    background-color: g.$tan-primary
    color: g.$green-acc1
    border: 1px solid g.$tan-primary
    --tw-ring-color: #687441
    outline: 3px solid transparent

    @media (hover:hover)
        &:hover, &:focus-visible
            background-color: g.$green-acc1
            --tw-ring-color: #283618
            color: g.$tan-primary

    &:focus-visible
        outline: 3px solid g.$green-acc2
        outline-offset: 3px

    &:active
        background-color: g.$green-acc2
        --tw-ring-color: #141B0C

    .toggled
        background-color: g.$green-primary
        color: g.$tan-primary

        @media (hover:hover)
            &:hover, &:focus-visible
                background-color: g.$green-acc1
                --tw-ring-color: #283618
                color: g.$tan-primary

        &:active
            background-color: g.$green-acc2
            --tw-ring-color: #141B0C
            color: g.$tan-primary

        &:focus-visible
            outline: 3px solid g.$green-acc2
            outline-offset: 3px

    .disabled
        opacity: 0.35
        cursor: not-allowed

        @media (hover:hover)
            &:hover, &:focus-visible
                background-color: g.$green-primary

    @media (prefers-color-scheme: dark)
        background-color: transparent
        border: 1px solid g.$green-acc1
        --tw-ring-color: #687441
        color: g.$tan-primary

        @media (hover:hover)
            &:hover, &:focus-visible
                background-color: g.$green-acc1
                --tw-ring-color: #687441
                border-color: #FEFAE0
                color: g.$tan-primary

        &:focus-visible
            outline: 3px solid g.$tan-primary
            outline-offset: 3px

        &:active
            background-color: g.$green-acc2
            --tw-ring-color: #141B0C


        .toggled
            background-color: g.$green-light
            color: g.$green-acc2
            --tw-ring-color: #BBCC85

            @media (hover:hover)
                &:hover, &:focus-visible
                    background-color: g.$green-acc1
                    --tw-ring-color: #687441
                    border-color: #FEFAE0
                    color: g.$tan-primary

            &:focus-visible
                outline: 3px solid g.$tan-primary
                outline-offset: 3px

            &:active
                background-color: g.$green-acc2
                --tw-ring-color: #141B0C


        .disabled
            opacity: 0.35
            cursor: not-allowed

            @media (hover:hover)
                &:hover, &:focus-visible
                    color: g.$green-acc2
                    background-color: g.$green-light
                    --tw-ring-color: #BBCC85
                    border-color: #283618


</style>