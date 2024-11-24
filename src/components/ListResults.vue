<template>
    <div class="flex flex-col justify-center relative">
        <h1 class="text-6xl font-semibold text-center">Search Results</h1>
        <span 
            class="text-center mt-8"
            v-if="searchStore.getSearchMode == 'pantry'"
        >
            You searched for recipes containing the following ingredients:
        </span>
        <span 
            class="text-center mt-8"
            v-else-if="searchStore.getSearchMode == 'recipe'"
        >
            You searched for recipes with this title:
        </span>
        <span 
            class="text-center mt-8"
            v-else
        >
            You searched for a recipe at the following link:
        </span>
        <div 
            class="flex mt-4 gap-4 justify-center"
        >
            <span
                v-if="searchStore.getSearchMode !== 'pantry'"
                v-for="term in userSearchTerms"
                :key="term"
                class="text-center text-2xl font-semibold"
            >
                {{ term }}
            </span>
            <ButtonSecondary
                v-else
                v-for="searchTerm in userSearchTerms"
                :key="searchTerm"
                class="static"
            >
                {{ searchTerm }}
            </ButtonSecondary>
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