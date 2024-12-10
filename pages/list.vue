<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-4 gap-16 mb-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6 text-center">
				<h1 class="text-6xl font-semibold">Shopping List</h1>
				<span class="w-full text-lg font-light">View, modify, and generate your shopping list.</span>
			</div>
			<div class="flex flex-col gap-16 max-w-96 w-full md:grid md:grid-cols-2 md:gap-12 md:max-w-3xl">
				<Transition name="fade" mode="out-in">
					<div class="flex flex-col gap-24 md:flex-row" v-if="searchStore.getShoppingList.size > 0" ref="listWrap">
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
										@click="searchStore.clearShoppingList"
										@keyup.enter="searchStore.clearShoppingList"
										tabindex="0"
										:key="'clear'"
									>
											Clear
									</ButtonSecondary>
								</div>
							</div>
							<li v-for="(item, index) in Array.from(searchStore.getShoppingList)" :key="JSON.parse(item).name" ref="listItems" class="my-2 border-b pb-4 pl-6 transition-all duration-300 last-of-type:border-transparent">
								<ListViewItem :item="JSON.parse(item)"></ListViewItem>
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
				<div v-if="searchStore.getShoppingList.size > 0" class="flex flex-col gap-10 text-start px-6 py-4 rounded-xl border max-w-96">
					<form class="flex flex-col">
						<span class="text-2xl font-semibold mb-2 w-full">Generate List &nbsp;✨</span>
						<span class="text-base font-light mb-8 max-w-xl">Generate your shopping list to get pricing estimates for real grocery items.</span>
						<fieldset class="flex flex-col gap-4 w-full self-center">
							<legend class="text-lg font-medium mb-4 w-full underline underline-offset-4">List Style:</legend>
							<div class="flex flex-col items-baseline gap-1">
								<div class="flex gap-3 text-lg w-full items-center">
									<input type="radio" id="default" name="list-format" value="Default" selected>
									<label for="default" class="w-full text-start">Default</label>
								</div>
								<i class="text-xs self-start ml-6">Bullet points</i>
							</div>
							<div class="flex flex-col items-baseline gap-1">
								<div class="flex gap-3 text-lg w-full items-center">
									<input type="radio" id="markdown" name="list-format" value="Markdown">
									<label for="markdown" class="w-full text-start">Markdown</label>
								</div>
								<i class="text-xs self-start ml-6">Great for apps like Notion or Obsidian</i>
							</div>
						</fieldset>
					</form>
					<ButtonPrimary
						:class="'toggled'"
						class="self-center"
					>
						Export List
					</ButtonPrimary>
				</div>
			</Transition>
		</main>
	</div>
</template>

<script setup>
import { annotate } from 'rough-notation';
const { $gsap } = useNuxtApp()

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

const searchStore = useSearchModeStore()
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
		y.value = listWrap.value.clientHeight - 200
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
</style>