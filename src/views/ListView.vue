<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-4 gap-16 mb-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold text-center">Shopping List</h1>
				<span class="w-full text-lg font-light text-center">View, modify, and generate your shopping list.</span>
			</div>
			<div class="flex gap-24" v-if="searchStore.getShoppingList.size > 1">
				<ul class="border py-4 px-6 pl-4 rounded-xl shadow-2xl">
					<li v-for="item in searchStore.getShoppingList" :key="JSON.parse(item).name" class="my-2 border-b pb-2 px-6 last-of-type:border-none">
						<ListViewItem :item="JSON.parse(item)"></ListViewItem>
					</li>
				</ul>
				<div class="flex flex-col gap-10">
					<form class="flex flex-col items-center">
						<fieldset class="flex flex-col gap-4">
							<legend class="text-2xl font-semibold mb-6 w-full">List Style:</legend>
							<div>
								<div class="flex gap-3 text-lg">
									<input type="radio" id="default" name="list-format" value="Default" selected>
									<label for="default">Default</label>
								</div>
								<i class="text-xs">Bullet points</i>
							</div>
							<div>
								<div class="flex gap-3 text-lg">
									<input type="radio" id="markdown" name="list-format" value="Markdown">
									<label for="markdown">Markdown</label>
								</div>
								<span class="italic text-xs">Great for apps like Notion or Obsidian</span>
							</div>

						</fieldset>
					</form>
					<ButtonPrimary
						:class="'toggled'"
					>
						Export Shopping List
					</ButtonPrimary>
				</div>
			</div>
			<div v-else class="text-center flex flex-col gap-6">
				<h2 class="text-3xl font-semibold">Your List is Empty!</h2>
				<span>Search for recipes and add items to your list to see them appear here.</span>
			</div>
		</main>
	</div>
</template>

<script setup>
import ListViewItem from '@/components/ListViewItem.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import { useSeoMeta } from '@unhead/vue';
import { useSearchModeStore } from '@/stores/search';

useSeoMeta({
	title: 'Shopping List - Reciplease',
	description: 'View and generate your shopping lists to help you grocery shop smarter and budget better.',
	ogDescription: 'View and generate your shopping lists to help you grocery shop smarter and budget better.',
	ogTitle: 'Shopping List - Reciplease',
	// ogImage: '/src/assets/img/og-img.jpg',
	twitterCard: 'summary_large_image'
})

const searchStore = useSearchModeStore()

</script>

<style>
</style>