<template>
    <div class="flex flex-col justify-center relative">
        <div class="flex flex-col justify-center">
            <h1 class="text-4xl font-semibold text-center">Search Results</h1>
            <span class="text-center mt-6" v-if="searchStore.getSearchMode == 'pantry'"> You searched for recipes containing the following ingredients: </span>
            <span class="text-center mt-6" v-else> You searched for recipes with this title: </span>
            <div class="flex mt-3 gap-4 justify-center flex-wrap">
                <span
                    v-if="searchStore.getSearchMode !== 'pantry'"
                    v-for="term in userSearchTerms"
                    :key="term"
                    class="text-center text-2xl font-semibold"
                >
                    "{{ term }}"
                </span>
                <ButtonSecondary
                    v-else
                    v-for="searchTerm in userSearchTerms"
                    :key="searchTerm"
                    class="inactive cursor-not-allowed"
                    role="presentation"
                >
                    {{ searchTerm }}
                </ButtonSecondary>
            </div>
        </div>
    </div>
</template>

<script setup>
const searchStore = useSearchModeStore()
const userSearchTerms = Array.from(searchStore.getServerSearchTerms).length > 0 ? Array.from(searchStore.getServerSearchTerms) : JSON.parse(sessionStorage.getItem("searchTerms"))
</script>

<style lang="sass" scoped>

</style>