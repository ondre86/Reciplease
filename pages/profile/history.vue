<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-6 gap-8 mb-12" style="margin-top: calc(69.4px + 2rem);">
			<div
				class="flex items-center gap-3 self-start cursor-pointer back-text"
				@click="navigateTo('/profile')"
				@keyup.enter="navigateTo('/profile')"
			>
				<ButtonSearch
					:svg-width="'12px'"
					:svg-height="'12px'"
					class="rotate-180"
				>
				</ButtonSearch>
				<span>Go Back</span>
			</div>
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-4xl font-semibold">History</h1>
			</div>
			<ul class="flex flex-col gap-6" v-if="db.historyItems.length > 0">
				<li v-for="(item, index) in db.historyItems.sort((a,b)=>{b.time-a.time})" :key="index">
					<div
						class="
							flex flex-col p-6 border rounded-xl justify-between gap-6
							md:flex-row md:gap-16
						"
					>
						<div class="flex flex-col gap-3 max-w-xl md:max-w-half">
							<h2 class="text-3xl font-bold">{{ item.type }}</h2>
							<span class="text-lg font-light">{{ new Date(item.time).toLocaleString() }}</span>
							<div v-if="typeof(item.query) == 'string' || Array.isArray(item.query)">
								<span class="text-xl font-medium italic mt-4" v-if="typeof(item.query) == 'string'"> {{ item.query }}</span>
								<ul class="flex flex-wrap gap-4 mt-4" v-else-if="Array.isArray(item.query)">
									<li v-for="(queryItem, index) in item.query" :key="index">
										<ButtonSecondary class="inactive">{{ queryItem }}</ButtonSecondary>
									</li>
								</ul>
							</div>
						</div>
						<div class="flex flex-wrap gap-4 items-center md:flex-col md:justify-center" v-if="(typeof(item.query) !== 'string') && !Array.isArray(item.query)">
							<ButtonPrimary
								class="toggled"
								@click="openModal(item)"
								@keyup.enter="openModal(item)"
							>
								View List
							</ButtonPrimary>
						</div>
						<UModal v-model="modalOpen" :ui="{ container: 'items-center', background: 'bg-white dark:bg-neutral-900' }" prevent-close>
							<ButtonClose 
								:svg-size="'10px'" 
								:solo="true" 
								class="z-40 absolute -top-2 -right-2" 
								@click="openModal" 
								@keyup.enter="openModal"
							>
							</ButtonClose>
							<div class="gen-modal-wrap rounded-lg p-4 w-full h-full flex flex-col items-center text-center gap-6 self-center">
								<div class="gen-modal max-h-80 w-full rounded-md overflow-y-auto flex justify-center p-4">
									<div class="text-start flex flex-col gap-4" id="historyList" ref="historyList">
										<span class="text-center font-semibold text-lg">
											{{ modalList.query.title }}
										</span>
										<ul class="pt-4">
											<li v-for="(listItem, index) in modalList.query.listItems" :key="index">
												{{ listItem }}
											</li>
										</ul>
										<span class="font-semibold pb-4 text-center">
											{{ modalList.query.totalEstimate }}
										</span>
									</div>
								</div>
								<ButtonPrimary 
									@click="copyList"
									@keyup.enter="copyList"
									class="toggled"
								>
									{{ copyStatus }}
								</ButtonPrimary>
								<ButtonPrimary 
									@click="useWebShare"
									@keyup.enter="useWebShare"
									class="flex items-center gap-2"
								>
									Share <Icon name="i-heroicons-arrow-top-right-on-square" class="mb-1"></Icon>
								</ButtonPrimary>
							</div>

						</UModal>
					</div>
				</li>
			</ul>
			<div class="flex flex-col gap-2 mt-6 text-center" v-else>
				<span class="text-lg font-semibold">
					No account history. <br>
				</span>
				<span>Use Reciplease to see your usage history here.</span>
			</div>
		</main>
	</div>
</template>

<script setup>
definePageMeta({
  requiresAuth: true,
})
useHead({
  title: 'History',
  meta: [
	{
		name: 'description',
		content: 'View previous searches and shopping lists.'
	},
	{
		name: 'og:description',
		content: 'View previous searches and shopping lists.'
	},
	{
		name: 'og:title',
		content: 'History · Reciplease'
	},
	{
		name: 'og:image',
		ogImage: '/og-img.jpg'
	},
	{
		name: 'twitter:card',
		twitterCard: 'summary_large_image'
	}
  ],
  titleTemplate: '%s %seperator %siteName',
  templateParams: {
    seperator: '·',
    siteName: 'Reciplease'
  }
})

const db = useFirestoreStore()
await db.fetchHistoryItems()

const modalOpen = ref(false)
const modalList = ref(null)

const historyList = ref()
const copyStatus = ref('Copy To Clipboard')
const webShare = useShare()

async function copyList() {
	try{
		await navigator.clipboard.writeText(historyList.value[0].innerText)
		copyStatus.value = "Copied!"
	}
	catch (error){
		copyStatus.value = "Error!"
	}
}
function useWebShare(){
	if (webShare.isSupported){
		webShare.share({
			title: "Your Shopping List",
			text: historyList.value[0].innerText
		})
	}
}

function openModal(item) {
	if (!modalOpen.value) {
		modalOpen.value = true
		modalList.value = item
	}
	else {
		modalOpen.value = false
		setTimeout(() => {
			copyStatus.value = "Copy To Clipboard"
		}, 1000)
	}
}
</script>

<style lang="sass" scoped>
.gen-modal-wrap
	background-color: white

	@media (prefers-color-scheme: dark)
		background-color: g.$green-acc2

.gen-modal
	background-color: g.$grey-fill

	@media (prefers-color-scheme: dark)
		background-color: g.$green-acc3
</style>