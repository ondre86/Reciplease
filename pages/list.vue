<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-6 gap-16 mb-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6 text-center">
				<h1 class="text-6xl font-semibold">Shopping List</h1>
				<span class="w-full text-lg font-light">View, modify, and generate your shopping list.</span>
			</div>
			<div class="flex flex-col gap-16 max-w-96 w-full md:grid md:grid-cols-2 md:gap-12 md:max-w-3xl">
				<Transition name="fade" mode="out-in">
					<div class="flex flex-col gap-24 md:flex-row" v-if="db.shoppingListItems.size > 0" ref="listWrap">
						<TransitionGroup 
							name="shoppinglist" 
							tag="ul" 
							class="shopping-list border py-6 px-6 pl-4 rounded-xl shadow-2xl flex flex-col h-fit w-full md:w-96"
							@before-leave="beforeLeave"
						>
							<div class="grid grid-cols-2 justify-items-end pb-4 mb-6" :key="'title'" ref="listTitle">
								<h2 class="shopping-list-header text-4xl font-semibold text-center inline-flex self-center justify-self-center text-nowrap">My List</h2>
								<div class="flex justify-end w-fit">
									<ButtonSecondary
										class="self-end cursor-pointer text-base"
										@click="clearShoppingList"
										@keyup.enter="clearShoppingList"
										tabindex="0"
										:key="'clear'"
									>
											Clear
									</ButtonSecondary>
								</div>
							</div>
							<li v-for="(item, index) in Array.from(db.shoppingListItems).sort((a,b)=>{return a.time - b.time})" :key="item.name" ref="listItems" class="my-2 border-b pb-4 pl-6 transition-all duration-300 last-of-type:border-transparent">
								<ListViewItem :item="item"></ListViewItem>
							</li>
						</TransitionGroup>
					</div>
					<div v-else class="text-start flex flex-col gap-12">
						<div class="flex flex-col gap-2 text-center md:text-start">
							<h2 ref="emptyList" class="text-2xl font-semibold w-fit mb-4 self-center">Your List is Empty!</h2>
							<span class="font-light text-center">
								Add items to your list to manage them here. <br><br>
								You can add items using this tool or in the recipe viewer, under the "Ingredients" section.
							</span>
						</div>
					</div>
				</Transition>
				<ListInput @newItem="scrollToListEnd($event)" class="md:sticky list-input"></ListInput>
			</div>
			<Transition name="fade" mode="out-in">
				<div v-if="db.shoppingListItems.size > 0" class="flex flex-col gap-10 text-start px-6 py-4 rounded-xl border max-w-96">
					<form class="flex flex-col">
						<span class="text-2xl font-semibold mb-2 w-full">Generate List</span>
						<span class="text-base font-light mb-8 max-w-xl">Generate your shopping list to get pricing estimates for real grocery items.</span>
						<fieldset class="flex flex-col gap-4 w-full self-center">
							<legend class="text-lg font-medium mb-4 w-full underline underline-offset-4">List Style:</legend>
							<div class="flex flex-col items-baseline gap-1">
								<div class="flex gap-3 text-lg w-full items-center">
									<input type="radio" id="default" name="list-format" value="default" v-model="listMode" checked>
									<label for="default" class="w-full text-start">Default</label>
								</div>
								<i class="text-xs self-start ml-6">Bullet points</i>
							</div>
							<div class="flex flex-col items-baseline gap-1">
								<div class="flex gap-3 text-lg w-full items-center">
									<input type="radio" id="markdown" name="list-format" value="markdown" v-model="listMode">
									<label for="markdown" class="w-full text-start">Markdown</label>
								</div>
								<i class="text-xs self-start ml-6">Great for apps like Notion or Obsidian</i>
							</div>
						</fieldset>
					</form>
					<div class="flex flex-col gap-4 justify-center items-center">
						<Transition name="fade" mode="out-in">
							<ButtonPrimary
								:class="'toggled'"
								class="self-center"
								@click="toggleGenModal"
								@keyup.enter="toggleGenModal"
								v-if="!waitingForListStatus"
							>
								Generate List
							</ButtonPrimary>
							<LoadingAnimation :svg-width="'50px'" v-else></LoadingAnimation>
						</Transition>
						<span class="text-xs italic text-center">List generations can be viewed in your profile history.</span>
					</div>
					<UModal v-model="genModalOpen" :ui="{ container: 'items-center', background: 'bg-white dark:bg-neutral-900' }" prevent-close>
						<ButtonClose 
							:svg-size="'10px'" 
							:solo="true" 
							class="z-40 absolute -top-2 -right-2" 
							@click="toggleGenModal" 
							@keyup.enter="toggleGenModal"
						>
						</ButtonClose>
						<div class="gen-modal-wrap rounded-lg p-4 w-full h-full flex flex-col items-center text-center gap-6 self-center">
							<div class="gen-modal max-h-80 w-full rounded-md overflow-y-auto flex justify-center p-4">
								<Transition name="fade" mode="out-in">
									<div v-if="!searchStore.generatingShoppingList && searchStore.generatedList" class="text-start flex flex-col gap-4" id="list" ref="list">
										<ul class="pt-4">
											<li v-for="(listItem, index) in searchStore.generatedList.listItems" :key="index">
												{{ listItem }}
											</li>
										</ul>
										<span class="font-semibold pb-4">
											{{ searchStore.generatedList.totalEstimate }}
										</span>
									</div>
									<LoadingAnimation :svg-width="'50px'" class="self-center" v-else-if="searchStore.generatingShoppingList && !searchStore.generatedList"></LoadingAnimation>
								</Transition>
							</div>
							<div class="flex flex-col gap-4 md:flex-row">
								<ButtonPrimary
									v-if="!searchStore.generatingShoppingList"
									@click="copyList"
									@keyup.enter="copyList"
									class="toggled"
								>
									{{ copyStatus }}
								</ButtonPrimary>
								<ButtonPrimary
									v-if="!searchStore.generatingShoppingList && webShare.isSupported"
									@click="useWebShare"
									@keyup.enter="useWebShare"
									class="flex items-center gap-2"
								>
									Share <Icon name="i-heroicons-arrow-top-right-on-square" class="mb-1"></Icon>
								</ButtonPrimary>
							</div>
						</div>
					</UModal>
				</div>
			</Transition>
			<UModal v-model="searchStore.generationLimit" :ui="{ container: 'items-center', background: 'bg-white dark:bg-neutral-900' }">
				<ButtonClose :svg-size="'15px'" :solo="true" class="absolute top-4 right-4" @click="searchStore.generationLimit = false; waitingForListStatus = false" @keyup.enter="searchStore.generationLimit = false; waitingForListStatus = false"></ButtonClose>
				<div class="p-4 py-6 flex flex-col items-center text-center gap-6 self-center relative">
					<h4 class="font-semibold text-2xl">Limit Reached</h4>
					<p>
						You've hit the limit for the free plan. <br>
						Please wait until next month or upgrade your plan.
					</p>
					<div class="flex flex-col gap-4 mt-4 md:flex-row">
						<ButtonPrimary
							class="toggled"
							:link="'/pricing'"
						>
							View Pricing Plans
						</ButtonPrimary>
						<ButtonSecondary
							class="toggled cursor-pointer"
							@click="searchStore.generationLimit = false; waitingForListStatus = false"
							@keyup.enter="searchStore.generationLimit = false; waitingForListStatus = false"
							tabindex="0"
						>
							Close
						</ButtonSecondary>
					</div>
				</div>
			</UModal>
		</main>
	</div>
</template>

<script setup>
import { annotate } from 'rough-notation';

const searchStore = useSearchModeStore()
const db = useFirestoreStore()
await db.fetchListItems()
await db.subscribeToShoppingList()

const { $gsap } = useNuxtApp()
const genModalOpen = ref(false)

const listMode = ref('default')
const list = ref()
const copyStatus = ref('Copy To Clipboard')
const waitingForListStatus = ref(false)

const webShare = useShare()

definePageMeta({
  requiresAuth: true,
})

useHead({
  title: 'Shopping List',
  meta: [
	{
		name: 'description',
		content: 'View and generate your shopping lists to help you grocery shop smarter and budget better.'
	},
	{
		name: 'og:description',
		content: 'View and generate your shopping lists to help you grocery shop smarter and budget better.'
	},
	{
		name: 'og:title',
		content: 'Shopping List · Reciplease'
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

function clearShoppingList() {
	searchStore.clearShoppingList()
	db.shoppingListItems.forEach((item)=>{
		db.deleteListItem(item.id)
	})
}

const listItems = useTemplateRef('listItems')
const listWrap = useTemplateRef('listWrap')
const { y } = useWindowScroll({ behavior: 'smooth' })

const listTitle = ref(null)
const emptyList = ref(null)

function beforeLeave(el) {
    const {paddingLeft, paddingTop, width, height} = window.getComputedStyle(el)

    el.style.left = `${el.offsetLeft - parseFloat(paddingLeft, 10)}px`
    el.style.top = `${el.offsetTop - parseFloat(paddingTop, 10)}px`
    el.style.width = width
    el.style.height = height
}

function scrollToListEnd($event) {
	if (!listWrap.value){
		y.value = emptyList.value.clientHeight - 200
	}
	else {
		y.value = listWrap.value.clientHeight - 100
	}
}

watch(listTitle, (cur)=>{
	if (cur){
		annotate(cur, { type: 'underline', animate: false, color: '#687441' }).show()
	}
})
watch(emptyList, (cur)=>{
	if (cur){
		annotate(cur, { type: 'underline', animate: false, color: '#687441' }).show()
	}
})

async function toggleGenModal() {
	waitingForListStatus.value = true
	if (genModalOpen.value == false) {
		await searchStore.generateShoppingList(db.shoppingListItems, listMode.value)
		if (!searchStore.generationLimit){
			genModalOpen.value = true
			waitingForListStatus.value = false
		}
	}
	else {
		waitingForListStatus.value = false
		genModalOpen.value = false
		copyStatus.value = "Copy To Clipboard"
	}
}

async function copyList() {
	try{
		await navigator.clipboard.writeText(list.value.innerText)
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
			text: list.value.innerText
		})
	}
}


onMounted(()=>{
	if (listTitle.value){
		$gsap.from('.shopping-list', {
			y: 30,
			opacity: 0,
			duration: .5,
			delay: 0.15
		})
	}
})

onUnmounted(()=>{
	db.unsubscribeFromShoppingList()
})
</script>

<style lang="sass" scoped>
input[type=radio]
	accent-color: g.$green-primary

	@media (prefers-color-scheme: dark)
		accent-color: g.$green-light

.shopping-list
	background-color: g.$grey-fill

	@media (prefers-color-scheme: dark)
		background-color: g.$green-acc3

.shoppinglist-move,
.shoppinglist-enter-active,
.shoppinglist-leave-active 
	transition: all 0.4s ease

.shoppinglist-enter-from,
.shoppinglist-leave-to 
	opacity: 0
	transform: translate3d(-50px, 0px, 0px)

.shoppinglist-leave-active 
	position: absolute

.list-input
	top: 100px

.gen-modal-wrap
	background-color: white

	@media (prefers-color-scheme: dark)
		background-color: g.$green-acc2

.gen-modal
	background-color: g.$grey-fill

	@media (prefers-color-scheme: dark)
		background-color: g.$green-acc3
</style>