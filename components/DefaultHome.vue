<template>
    <main
        class="flex flex-col items-center justify-center h-full self-center px-6 overflow-x-hidden"
        ref="mainWrap"
    >
        <MainLogo></MainLogo>
        <div v-if="windowSize.height > 700">
            <SearchModeWrapper></SearchModeWrapper>
            <AppInput></AppInput>
            <SearchItemWrapper></SearchItemWrapper>
        </div>
        <div v-else style="max-width: 600px;">
            <AppInput></AppInput>
            <SearchItemWrapper></SearchItemWrapper>
            <SearchModeWrapper></SearchModeWrapper>
        </div>
        <TitledImages></TitledImages>
        <!-- <TheStruggle></TheStruggle> -->
        <SaveTheDay></SaveTheDay>
        <GetInspiration></GetInspiration>
        <LandingCTA></LandingCTA>
        <BackToTop></BackToTop>
    </main>
</template>

<script setup>
const windowSize = useWindowSize()
</script>

<style lang="sass" scoped>
main
    margin-top: calc( 81px + 1.5rem)
@media (min-width: 768px)
    main
        margin-top: calc( 81px + 6rem )
</style>