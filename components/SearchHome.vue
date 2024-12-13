<template>
    <main
        class="search-results flex flex-col items-center h-full px-8 relative"
        style="margin-top: calc(69.4px + 2rem);"
    >
        <div
            class="flex items-center gap-3 self-start mb-6 cursor-pointer back-text"
            @click="
                searchStore.clearSearchTerms(); 
                searchStore.clearServerSearchTerms(); 
                searchStore.submittedRequest = false; 
                searchStore.requestFulfilled = false; 
                searchStore.viewingSearchItems = false;
                searchStore.changeSearchMode('pantry');
                searchStore.clearRecipeResponseList()
            "
            @keyup.enter="
                searchStore.clearSearchTerms(); 
                searchStore.clearServerSearchTerms(); 
                searchStore.submittedRequest = false; 
                searchStore.requestFulfilled = false; 
                searchStore.viewingSearchItems = false;
                searchStore.changeSearchMode('pantry');
                searchStore.clearRecipeResponseList()
            "
        >
            <ButtonSearch
                :svg-width="'12px'"
                :svg-height="'12px'"
                class="rotate-180"
            >
            </ButtonSearch>
            <span>Go Back</span>
        </div>

        <SearchResultsHeader></SearchResultsHeader>
		<SearchResults></SearchResults>
		<Transition name="fade" mode="out-in">
            <ButtonPrimary 
                class="my-8"
                @click="searchStore.sendSearchTerms"
                @keyup.enter="searchStore.sendSearchTerms"
                v-if="searchStore.additionalRequestFulfilled"
            >
                View More
            </ButtonPrimary>
            <LoadingAnimation class="my-8" v-else></LoadingAnimation>
        </Transition>
    </main>
</template>

<script setup>
const searchStore = useSearchModeStore()
</script>

<style lang="sass" scoped>
.back-text
    text-decoration: underline
    text-decoration-color: transparent
    text-underline-offset: 8px
    transition: all .3s

    &:focus, &:active
        color: g.$green-primary
        text-decoration-color: g.$green-primary

@media (hover:hover)
    .back-text
        &:hover
            color: g.$green-primary
            text-decoration-color: g.$green-primary

            @media (prefers-color-scheme:dark)
                color: g.$green-light
                text-decoration-color: g.$green-light
</style>