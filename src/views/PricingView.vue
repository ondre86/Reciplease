<template>
	<div>
		<main class="flex flex-col justify-start items-center px-4 gap-16 mb-16">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">Pricing</h1>
				<span class="w-full text-lg font-light text-center">Save time and take your cooking to the next level.</span>
			</div>
			<div class="flex flex-col text-4xl justify-center gap-12">
				<div class="flex justify-center gap-12 ">
					<PricingPlan
						:plan="'Free'"
						:price="0"
						:subtitle="'Try Reciplease for free.'"
						:features="[
							'10 Ingredient Recipe Searches/Week',
							'5 Recipe Extractions/Week',
							'3 Saved Recipes/Week',
							'1 Custom Shopping List/Week',
							'Limited Features'
						]"
						class="bg-transparent"
						id="free"
					>
					</PricingPlan>
					<PricingPlan
						:plan="'Unlimited'"
						:price="5"
						:subtitle="'Unlimited access.'"
						:features="[
							'Ingredient Recipe Searches',
							'Recipe Extractions',
							'Saved Recipes',
							'Custom Shopping Lists',
							'Access To ALL New Features',
						]"
						class="shadow-2xl"
						id="unlimited"
					>
					</PricingPlan>
				</div>
			</div>
		</main>
		<AppFooter></AppFooter>
	</div>
</template>

<script setup>
import PricingPlan from '@/components/PricingPlan.vue';
import AppFooter from '@/components/AppFooter.vue';
import { RouterLink } from 'vue-router';
import gsap from 'gsap';
import { onMounted } from 'vue';

onMounted(()=>{
	gsap.from("#unlimited", {
		y:30,
		opacity: 0,
		duration: .5,
		delay: .5
	})
})
</script>

<style lang="sass" scoped>
main
	margin-top: calc( 81px + 3rem )
	min-height: calc( 100vh - 81px - 36px )
</style>
