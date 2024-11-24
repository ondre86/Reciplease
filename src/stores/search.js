import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useSearchModeStore = defineStore('search', ()=>{
	const searchMode = ref('pantry')
	const searchTerms = ref(new Set([]))
	const searchTermsForServer = ref(new Set([]))
	const submittedRequest = ref(null)
	const requestFulfilled = ref(null)

	const getSearchMode = computed(()=>{
		return searchMode.value
	})
	const getSearchTerms = computed(()=>{
		return searchTerms.value
	})
	const getServerSearchTerms = computed(()=>{
		return searchTermsForServer.value
	})

	function changeSearchMode(mode){
		searchMode.value = mode
	}
	function addSearchTerm(term){
		searchTerms.value.add(term)
	}
	function addServerSearchTerm(term){
		searchTermsForServer.value.add(term)
	}
	function deleteSearchTerm(term){
		searchTerms.value.delete(term)
	}
	function deleteServerSearchTerm(term){
		searchTermsForServer.value.delete(term)
	}
	function clearSearchTerms(){
		searchTerms.value.clear()
	}
	function clearServerSearchTerms(){
		searchTermsForServer.value.clear()
	}

	async function sendSearchTerms(mode){
		submittedRequest.value = true
		const values = Array.from(searchTermsForServer.value)
		fetch(import.meta.env.VITE_SERVER_URL, {
            method: "POST",
            body: JSON.stringify({
                message: values
            })
        })
        .then(response => response.json())
        .then(json => console.log(json))
		.then(
			setTimeout(() => {
				requestFulfilled.value = true
			}, 3000)
		)
	}

	return { 
		searchMode, 
		searchTerms, 
		searchTermsForServer, 
		getSearchMode, 
		getSearchTerms, 
		getServerSearchTerms, 
		submittedRequest,
		requestFulfilled,
		changeSearchMode, 
		addSearchTerm, 
		addServerSearchTerm, 
		deleteSearchTerm, 
		deleteServerSearchTerm, 
		clearSearchTerms,
		clearServerSearchTerms,
		sendSearchTerms 
	}
})
