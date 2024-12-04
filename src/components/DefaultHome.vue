<template>
    <main
        class="flex flex-col items-center h-full px-8"
        ref="mainWrap"
        :style="{ paddingTop: ((windowSize.height.value / 2) - (desktopMainWrapSize / 2.5) - 81) + 'px' }"
    >
        <MainLogo></MainLogo>
        <div v-if="!isSmallScreen">
            <SearchModeWrapper></SearchModeWrapper>
            <AppInput></AppInput>
            <SearchItemWrapper></SearchItemWrapper>
        </div>
        <div v-else>
            <AppInput></AppInput>
            <SearchItemWrapper></SearchItemWrapper>
            <SearchModeWrapper></SearchModeWrapper>
        </div>
    </main>
</template>

<script setup>
import { useWindowSize, useMediaQuery } from '@vueuse/core';
import { ref, onMounted, watch } from 'vue';

import MainLogo from '@/components/MainLogo.vue';
import SearchModeWrapper from '@/components/SearchModeWrapper.vue';
import SearchItemWrapper from '@/components/SearchItemWrapper.vue';
import AppInput from '@/components/AppInput.vue';


const windowSize = useWindowSize()

const desktopMainWrapSize = 494
const fontSize = ref(parseFloat(getComputedStyle(document.documentElement).fontSize))

const isSmallScreen = useMediaQuery('(max-width: 700px)')
</script>

<style lang="sass" scoped>

</style>