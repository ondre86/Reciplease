<template>
    <header class="flex justify-center w-full py-4 z-50 fixed top-0 bg-white">
        <nav class="flex justify-between px-8 w-full max-w-screen-xl">
            <RouterLink 
                :to="'/'" 
                class="p-1 rounded-lg cursor-pointer"
                @click.prevent="$event.target.blur()"
            >
                <div id="logo" class="flex items-center">
                    <picture>
                        <source media="(prefers-color-scheme:dark)" srcset="@/assets/logo/logo-full-green-light.svg">
                        <img src="@/assets/logo/logo-full-green-dark.svg" alt="">
                    </picture>
                </div>
            </RouterLink>
            <div class="flex gap-12">
                <ul class="flex gap-6">
                    <li>
                        <RouterLink to="about">About</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="pricing">Pricing</RouterLink>
                    </li>
                </ul>
                <ButtonPrimary class="justify-self-end toggled" :link="'auth'">Log In</ButtonPrimary>
            </div>
        </nav>
    </header>
</template>

<script setup>
import ButtonPrimary from './ButtonPrimary.vue';
import { RouterLink } from 'vue-router';

</script>

<style lang="sass" scoped>
header
    border-bottom: 1px solid g.$grey-divider
#logo
    max-width: 200px
li
    align-self: center

    a
        color: g.$green-acc2
        padding: .75rem .5rem
        border-radius: .5rem
        outline: 1px solid transparent
        transition: all .3s

        &:hover, &:focus-visible
            outline-color: g.$green-acc2

nav
    a:has(#logo)
        outline: 1px solid transparent
        transition: all .3s
        &:focus-visible
            outline: 1px solid g.$green-acc2


@media (prefers-color-scheme:dark)
    li 
        a
            color: g.$tan-primary

            &:hover, &:focus, &:focus-visible, &:focus-within
                outline-color: g.$green-light
                background-color: g.$green-light
                color: g.$green-acc2

</style>