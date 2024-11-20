import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchModeStore = defineStore('search', ()=>{
	const searchMode = ref('pantry')
	const searchTerms = ref([])

	const getSearchMode = computed(()=>{
		return searchMode.value
	})
	const getSearchTerms = computed(()=>{
		return searchTerms.value
	})

	function changeSearchMode(mode){
		searchMode.value = mode
	}
	function addSearchTerm(term){
		searchTerms.value.push(term)
	}
	function deleteSearchTerm(index, length){
		searchTerms.value.splice(index, length)
	}

	return { searchMode, searchTerms, getSearchMode, getSearchTerms, changeSearchMode, addSearchTerm, deleteSearchTerm }
})
