<template>
    <div class="flex flex-col justify-center relative">
        <div class="flex flex-col justify-center">
            <h1 class="text-4xl font-semibold text-center">Search Results</h1>
            <span class="text-center mt-6" v-if="searchStore.getSearchMode == 'pantry'"> You searched for recipes containing the following ingredients: </span>
            <span class="text-center mt-6" v-else> You searched for recipes with this title: </span>
            <div class="flex mt-2 gap-4 justify-center flex-wrap">
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
                    class="inactive"
                >
                    {{ searchTerm }}
                </ButtonSecondary>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSearchModeStore } from '@/stores/search';
import ButtonSecondary from './ButtonSecondary.vue';

const searchStore = useSearchModeStore()
const userSearchTerms = Array.from(searchStore.getServerSearchTerms)
</script>

<style lang="sass" scoped>

</style>