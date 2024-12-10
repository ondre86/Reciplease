<template>
    <main
        class="flex flex-col items-center h-full self-center"
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
main
    padding: 0 5%
</style>