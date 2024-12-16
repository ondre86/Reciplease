<template>
    <div 
        class="close-btn w-fit h-fit px-2 py-2 rounded-full ring-1 transition-all duration-300" 
        tabindex="0" 
        role="button"
        :class="solo ? '' : 'in-tag'"
    >
        <svg viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.882792 0.882807C1.0293 0.736346 1.22798 0.654068 1.43514 0.654068C1.6423 0.654068 1.84097 0.736346 1.98748 0.882807L4.74998 3.64531L7.51248 0.882807C7.65983 0.740496 7.85717 0.661751 8.06201 0.663531C8.26685 0.665311 8.4628 0.747474 8.60765 0.892324C8.7525 1.03717 8.83466 1.23312 8.83644 1.43796C8.83822 1.6428 8.75948 1.84015 8.61717 1.9875L5.85467 4.74999L8.61717 7.5125C8.75948 7.65984 8.83822 7.85719 8.83644 8.06203C8.83466 8.26687 8.7525 8.46282 8.60765 8.60767C8.4628 8.75252 8.26685 8.83468 8.06201 8.83646C7.85717 8.83824 7.65983 8.75949 7.51248 8.61718L4.74998 5.85468L1.98748 8.61718C1.84013 8.75949 1.64279 8.83824 1.43795 8.83646C1.23311 8.83468 1.03716 8.75252 0.892309 8.60767C0.747459 8.46282 0.665296 8.26687 0.663516 8.06203C0.661736 7.85719 0.740481 7.65984 0.882792 7.5125L3.64529 4.74999L0.882792 1.9875C0.73633 1.84099 0.654053 1.64231 0.654053 1.43515C0.654053 1.22799 0.73633 1.02931 0.882792 0.882807Z" fill="#FEFAE0"/>
        </svg>
    </div>
</template>

<script setup>
defineProps({
    svgSize: String,
    solo: Boolean
})
</script>

<style lang="sass" scoped>
svg
    height: v-bind('svgSize')
    width: v-bind('svgSize')
    
div
    background-color: g.$red-primary
    font-size: 1.25rem
    font-weight: 500
    color: g.$tan-primary
    border: 1px solid g.$tan-primary
    --tw-ring-color: #8a514c
    cursor: pointer

    &:hover
        background-color: g.$red-acc1
        --tw-ring-color: #502520

    &:active
        background-color: g.$red-acc2
        --tw-ring-color: #25110F

    &:focus, &:focus-visible, &:focus-within
        background-color: g.$red-acc1
        outline: 3px solid g.$red-acc2
        outline-offset: 3px

    @media (prefers-color-scheme: dark)
        &:focus, &:focus-visible, &:focus-within
            outline-color: g.$tan-primary

.in-tag
    border-color: g.$red-primary
    --tw-ring-color: #FEFAE0

    svg
        path
            transition: all .3s
            fill: g.$red-primary

    &:hover, &:focus, &:focus-visible, &:focus-within
        background-color: g.$tan-acc1
        --tw-ring-color: #CEC9AD

        svg
            path
                transition: all .3s
                fill: g.$red-acc1

    &:active
        background-color: g.$tan-acc2
        --tw-ring-color: #A9A384

        svg
            path
                transition: all .3s
                fill: g.$red-acc2

</style>