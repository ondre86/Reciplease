<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-6 gap-16 mb-12">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">Pricing</h1>
				<span class="w-full text-lg font-light text-center">Save time and take your cooking to the next level.</span>
			</div>
			<div class="flex flex-col text-4xl justify-center gap-12">
				<div 
					class="
							flex flex-col justify-center gap-12
							md:flex-row
						"
					>
					<PricingPlan
						:text="subscriptionStatus == 'active' ? 'Switch Plan' : 'Sign Up Free'"
						:link="'/auth'"
						:plan="'Free'"
						:price="0"
						:subtitle="'Try Reciplease for free.'"
						:extraSubtitle="'No credit card required.'"
						:features="[
							'10 Recipe Searches/Month',
							'20 Recipe Generations/Month',
							'10 Saved Recipes Max',
							'Unlimited Shopping List Items',
							'3 Shopping List Generations/Month'
						]"
						:darkEmphasis="false"
						:disabled="subscriptionStatus !== 'active'"
						class="bg-transparent"
						id="free"
					>
					</PricingPlan>
					<PricingPlan
						:text="subscriptionStatus == 'active' ? 'Active' : 'Subscribe'"
						:hasFunction="subscriptionStatus !== 'active'"
						:plan="'Unlimited'"
						:price="5"
						:subtitle="'Enjoy full access to Reciplease.'"
						:features="[
							'Unlimited Recipe Searches',
							'Unlimited Recipe Generations',
							'Unlimited Saved Recipes',
							'Unlimited Shopping List Items',
							'Unlimited Shopping List Generations',
							'Access to Latest Features',
						]"
						:darkEmphasis="true"
						:disabled="subscriptionStatus == 'active'"
						class="shadow-2xl opacity-0"
						id="unlimited"
					>
					</PricingPlan>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import { annotate } from 'rough-notation';
const { $gsap } = useNuxtApp()

const db = useFirestoreStore()
const { subscriptionStatus } = await db.fetchUser()

useHead({
  title: 'Pricing',
  meta: [
	{
		name: 'description',
		content: 'Make cooking and grocery shopping easier with Reciplease. Choose a free or paid plan to help find and manage recipes and maximize your budget.'
	},
	{
		name: 'og:description',
		content: 'Make cooking and grocery shopping easier with Reciplease. Choose a free or paid plan to help find and manage recipes and maximize your budget.'
	},
	{
		name: 'og:title',
		content: 'Pricing · Reciplease'
	},
	{
		name: 'og:image',
		content: '/og-img.jpg'
	},
	{
		name: 'twitter:card',
		content: 'summary_large_image'
	}
  ],
  titleTemplate: '%s %seperator %siteName',
  templateParams: {
    seperator: '·',
    siteName: 'Reciplease'
  }
})

onMounted(()=>{
	const a1 = annotate(document.querySelectorAll('h2')[0], { type: 'underline', animate: false, color: '#687441' })
	const a2 = annotate(document.querySelectorAll('h2')[1], { type: 'underline', animate: false, color: '#687441' })

	a1.show()
	a2.show()

	$gsap.fromTo("#unlimited", {
		y:30
	}, {
		opacity: 1,
		y: 0,
		duration: .5,
		delay: .5
	})
})
</script>

<style lang="sass" scoped>
main
	margin-top: calc( 81px + 3rem )

@media (prefers-color-scheme:dark)
	div
		border-color: g.$green-acc1

	#unlimited
		border-color: g.$green-primary
</style>
