<template>
    <main
        class="search-results flex flex-col items-center h-full px-8 relative"
        style="margin-top: calc(69.4px + 2rem);"
    >
        <div
            class="flex items-center gap-3 self-start mb-8 cursor-pointer back-text"
            @click="
                searchStore.clearSearchTerms(); 
                searchStore.clearServerSearchTerms(); 
                searchStore.submittedRequest = false; 
                searchStore.requestFulfilled = false; 
                searchStore.viewingSearchItems = false;
                searchStore.changeSearchMode('pantry');
                searchStore.clearRecipeResponseList();
                $router.back();
            "
            @keyup.enter="
                searchStore.clearSearchTerms(); 
                searchStore.clearServerSearchTerms(); 
                searchStore.submittedRequest = false; 
                searchStore.requestFulfilled = false; 
                searchStore.viewingSearchItems = false;
                searchStore.changeSearchMode('pantry');
                searchStore.clearRecipeResponseList();
                $router.back();
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
		<div v-if="searchStore.isValidRequest">
            <Transition name="fade" mode="out-in">
                <ButtonPrimary 
                    class="my-8"
                    @click="searchStore.sendSearchTerms"
                    @keyup.enter="searchStore.sendSearchTerms"
                    v-if="searchStore.additionalRequestFulfilled"
                >
                    View More
                </ButtonPrimary>
                <LoadingAnimation class="my-8" :svg-width="'50px'" v-else></LoadingAnimation>
            </Transition>
        </div>
        <UModal v-model="searchStore.searchLimit" :ui="{ container: 'items-center', background: 'bg-white dark:bg-neutral-900' }">
            <ButtonClose :svg-size="'15px'" :solo="true" class="absolute top-4 right-4 z-50" @click="searchStore.searchLimit = false" @keyup.enter="searchStore.searchLimit = false"></ButtonClose>
            <div class="p-4 py-6 flex flex-col items-center text-center gap-6 self-center relative">
                <h4 class="font-semibold text-2xl">Limit Reached</h4>
                <p>
                    You've hit the limit for the free plan. <br>
                    Please wait until next month or upgrade your plan.
                </p>
                <div class="flex flex-col items-center justify-center gap-4 mt-4 md:flex-row">
                    <ButtonPrimary
                        class="toggled"
                        :link="'/pricing'"
                    >
                        View Pricing Plans
                    </ButtonPrimary>
                    <ButtonSecondary
                        class="toggled cursor-pointer"
                        @click="searchStore.searchLimit = false"
                        @keyup.enter="searchStore.searchLimit = false"
                        tabindex="0"
                    >
                        Close
                    </ButtonSecondary>
                </div>
            </div>
        </UModal>
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