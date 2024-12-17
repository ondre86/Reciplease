<template>
    <main
        class="flex flex-col items-center justify-center h-full self-center px-6 pb-6"
        ref="mainWrap"
    >
        <MainLogo></MainLogo>
        <div v-if="windowSize.height > 700">
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
const windowSize = useWindowSize()
</script>

<style lang="sass" scoped>
</style>