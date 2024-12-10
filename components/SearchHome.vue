<template>
    <main
        class="search-results flex flex-col items-center h-full px-8 relative"
        style="margin-top: calc(69.4px + 2rem);"
    >
        <div class="p-3 self-start back-btn">
            <div
                class="flex items-center gap-3 cursor-pointer back-text"
                @click="
                    searchStore.clearSearchTerms(); 
                    searchStore.clearServerSearchTerms(); 
                    searchStore.submittedRequest = false; 
                    searchStore.requestFulfilled = false; 
                    searchStore.viewingSearchItems = false;
                    searchStore.changeSearchMode('pantry')
                "
                @keyup.enter="
                    searchStore.clearSearchTerms(); 
                    searchStore.clearServerSearchTerms(); 
                    searchStore.submittedRequest = false; 
                    searchStore.requestFulfilled = false; 
                    searchStore.viewingSearchItems = false;
                    searchStore.changeSearchMode('pantry')
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
        </div>

        <SearchResultsHeader></SearchResultsHeader>
		<SearchResults></SearchResults>
		<ButtonPrimary class="my-8">
			View More
		</ButtonPrimary>
    </main>
</template>

<script setup>
const searchStore = useSearchModeStore()
</script>

<style lang="sass" scoped>
.back-btn
    top: calc(69.4px + 2rem)
    background-color: white

    @media (prefers-color-scheme:dark)
        background-color: g.$green-acc2



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