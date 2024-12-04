<template>
    <header class="flex justify-center w-full py-4 z-50 fixed top-0">
        <nav 
            class="
                flex justify-between px-8 w-full max-w-screen-xl items-center relative z-10
            "
        >
            <RouterLink 
                :to="'/'" 
                class="p-1 rounded-lg cursor-pointer"
                @click.prevent="$event.target.blur(); mobileMenuTransition($event)"
                id="logo-link"
            >
                <div id="logo" class="flex items-center">
                    <picture id="logo-pic">
                        <source media="(prefers-color-scheme:dark)" srcset="@/assets/logo/logo-full-green-light.svg">
                        <img id="logo-img" src="@/assets/logo/logo-full-green-dark.svg" alt="a Fork, Knife, Spoon, and a Question-Mark, followed by 'Reciplease'">
                    </picture>
                </div>
            </RouterLink>
            <div class="flex gap-6" v-if="!isSmallScreen">
                <ul class="flex gap-4">
                    <li>
                        <RouterLink to="about">About</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="pricing">Pricing</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="list">Shopping List</RouterLink>
                    </li>
                </ul>
                <ButtonPrimary class="justify-self-end toggled" :link="'auth'">Log In</ButtonPrimary>
            </div>
            <div 
                class="flex gap-12 h-full w-8 items-center justify-center" 
                v-else
                @click="mobileMenuTransition"
            >
                <MobileMenuIcon class="overflow-visible flex flex-col items-center justify-center"></MobileMenuIcon>
            </div>

        </nav>
        <div v-if="isSmallScreen" id='mobile-menu' class="absolute top-0 opacity-0 w-full flex justify-center py-1 z-0 pb-4 invisible"> 
            <nav>
                <ul class="flex gap-5">
                    <li>
                        <RouterLink 
                            to="about"
                            @click="mobileMenuTransition"
                        >
                            About
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink 
                            to="pricing"
                            @click="mobileMenuTransition"
                        >
                            Pricing
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink 
                            to="auth" 
                            class="text-green-500"
                            @click="mobileMenuTransition"
                        >
                            Log In
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink 
                            to="list" 
                            class="text-green-500 inline-block p-1 rounded-md outline outline-1 outline-transparent transition-all duration-300 icon"
                            @click="mobileMenuTransition"
                        >
                            <CartIcon></CartIcon>
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup>
import ButtonPrimary from './ButtonPrimary.vue';
import MobileMenuIcon from './MobileMenuIcon.vue';
import CartIcon from './CartIcon.vue';

import { RouterLink } from 'vue-router';
import { useDark, useMediaQuery } from '@vueuse/core';
import gsap from 'gsap';
import { ref, watch } from 'vue';

const isSmallScreen = useMediaQuery('(max-width: 700px)')
const fontSize = ref(parseFloat(getComputedStyle(document.documentElement).fontSize))

const mobileMenuOpen = ref(false)
const mobileMenuTL = gsap.timeline({
    defaults: {
        ease: 'power2.inOut'
    }
})
const isDark = useDark()

function mobileMenuTransition($event){
    if (($event.target.id == 'logo-img' || $event.target.id == 'logo-link') && mobileMenuOpen.value == false){}
    else {
        if (mobileMenuOpen.value == false) {
            mobileMenuTL.addLabel('start')
            .to('#mobile-menu', {
                y: 32 + (fontSize.value * 2),
                duration: .3
            })
            .to('#mobile-menu', {
                autoAlpha: 1,
                duration: .15
            }, "<+=.135") 

            .to('#mm-top', {
                y: 6,
                duration: 0.25
            }, "start")
            .to('#mm-end', {
                y: -6,
                duration: 0.25
            }, "<")
            .to(['#mm-top', '#mm-mid'], {
                rotate: 45 * 3,
                transformOrigin: 'center',
                duration: .5
            }, "<+=.125")
            .to('#mm-end', {
                rotate: 45 * 5,
                transformOrigin: 'center',
                duration: .5
            }, "<")

            mobileMenuOpen.value = true
        }
        else {
            mobileMenuTL.addLabel('reverse-start')
            .to('#mobile-menu', {
                autoAlpha: 0,
                duration: .20
            }) 
            .to('#mobile-menu', {
                y: fontSize.value * 2,
                duration: .3
            }, "<+=.575")

            .to(['#mm-top', '#mm-mid'], {
                rotate: 0,
                transformOrigin: 'center',
                duration: .5
            }, "reverse-start")
            .to('#mm-end', {
                rotate: 0,
                transformOrigin: 'center',
                duration: .5
            }, "<")
            .to('#mm-top', {
                y: 0,
                duration: 0.25
            }, ">-=.225")
            .to('#mm-end', {
                y: 0,
                duration: 0.25
            }, "<")

            mobileMenuOpen.value = false
        }
    }
}
</script>

<style lang="sass" scoped>
header
    background-color:  white
    border-bottom: 1px solid g.$grey-divider
#logo
    max-width: 200px
li
    align-self: center

    a:not(.icon)
        color: g.$green-acc2
        padding: .75rem .5rem
        border-radius: .5rem
        outline: 1px solid transparent
        text-decoration: underline
        text-decoration-color: transparent
        text-underline-offset: 8px
        transition: all .3s

        &:hover, &:focus, &:active, &.router-link-exact-active, &.router-link-active
            color: g.$green-primary
            text-decoration-color: g.$green-primary


#mobile-menu
    background-color: white
    border-bottom: 1px solid g.$grey-divider

    a:has(#logo)
        outline: 1px solid transparent
        transition: all .3s
        &:focus-visible
            outline: 1px solid g.$green-acc2


.router-link-exact-active:has(svg), .router-link-active:has(svg)
    outline-color: g.$green-acc1

@media (prefers-color-scheme:dark)
    header, nav, #mobile-menu
        background-color: g.$green-acc2
        border-color: g.$green-primary

    li 
        a:not(.icon)
            color: g.$tan-primary

            &:hover, &:focus, &.router-link-exact-active, &.router-link-active
                color: g.$green-light
                text-decoration: underline
                text-underline-offset: 8px

    nav
        a:has(#logo)
            &:focus-visible
                outline: 1px solid g.$tan-primary

@media (max-width: 700px)
    #logo-link
        width: 150px

</style>