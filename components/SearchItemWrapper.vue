<template>
    <TransitionGroup 
        name="taglist" 
        tag="ul" 
        class="flex gap-2 w-full max-w-2xl flex-wrap my-4"
        @before-leave="beforeLeave"
    >
        <li v-for="term in searchStore.getSearchTerms" :key="term">
            <ButtonSecondaryTag :term="term">{{ term }}</ButtonSecondaryTag>
        </li>
    </TransitionGroup>
</template>

<script setup>
const searchStore = useSearchModeStore()

function beforeLeave(el) {
    const {marginLeft, marginTop, width, height} = window.getComputedStyle(el)

    el.style.left = `${el.offsetLeft - parseFloat(marginLeft, 10)}px`
    el.style.top = `${el.offsetTop - parseFloat(marginTop, 10)}px`
    el.style.width = width
    el.style.height = height
}
</script>

<style lang="sass" scoped>
.taglist-move,
.taglist-enter-active,
.taglist-leave-active 
    transition: all 0.5s ease

.taglist-enter-from,
.taglist-leave-to 
    opacity: 0
    transform: translate3d(0px, 0px, 0px)

.taglist-leave-active 
    position: absolute
</style>