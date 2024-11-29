<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-4 gap-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">About</h1>
				<span class="w-full text-lg font-light text-center">What is Reciplease and how can it help you?</span>
				<span class="text-3xl font-semibold mt-12">Reciplease is a...</span>
			</div>
			<div class="grid grid-rows-4 gap-16">
				<AboutGridItem
					:image="'./src/assets/svg/time.svg'"
					:alt="''"
					:title="'Time Saver'"
					:subline="`No more staring in the fridge, stressing about tonight's dinner.`"
					:desc="`Reciplease takes the guesswork out of cooking by finding recipes based on ingredients you already have in your pantry. Then, once you find recipes that you like, you can create one organized shopping list with everything you need.`"
					:lastLine="`Spend less time in recipe books or at the grocery store and more time with family and friends.`"
					id="first-about"
				>
				</AboutGridItem>
				<AboutGridItem
					:image="'./src/assets/svg/stars.svg'"
					:alt="''"
					:title="'Creativity Catalyst'"
					:subline="`Spice things up for your family & friends...and Instagram!`"
					:desc="`You cook pretty often and you've got a nice rotation of meals, but we all get tired of eating the same things over and over. You can find new recipes from dozens of different cuisines that use interesting new ingredients on Reciplease.`"
					:lastLine="`Expand your culture and feed people something that will make them wonder.`"
				>
				</AboutGridItem>
				<AboutGridItem
					:image="'./src/assets/svg/money.svg'"
					:alt="''"
					:title="'Budget Booster'"
					:subline="`Forget about surprises at the cash register.`"
					:desc="'We all know that food prices are rising and our budgets need to be better. Take the guesswork out of the grocery store by knowing how much your meals are going to cost with our Shopping List Generator.'"
					lastLine="Plan your grocery budget smarter and earlier - and make sure your money isn't wasted."
				>
				</AboutGridItem>
				<AboutGridItem
					:image="'./src/assets/svg/smile.svg'"
					:alt="''"
					:title="'Headache Reliever'"
					:subline="`No more clutter, scrolling, and ads.`"
					:desc="`Scrolling through endless stories, anecdotes, and ads can be a real pain when you just need to see two things - ingredients and instructions. There's none of that here on Reciplease; just grab what you need and go.`"
					lastLine="Enjoy cooking again. We can't help with the dishes though!"
				>
				</AboutGridItem>
			</div>
			<div class="about-cta flex flex-col my-24 gap-6 border p-16 rounded-xl shadow-2xl">
				<h2 class="font-semibold text-4xl text-center">Ready to Level Up?</h2>
				<span class="font-normal text-base text-center">Start using Reciplease today!</span>
				<div 
					class="
						flex flex-col justify-center mt-6 gap-8
						md:flex-row
					"
				>
					<div 
						class="
							flex flex-col items-center
							md:pr-16
						"
					>
						<ButtonPrimary :link="'pricing'">View Pricing Plans</ButtonPrimary>
					</div>
					<div 
						class="
							flex flex-col gap-4 items-center
							md:pl-16 md:border-l
						"
					>
						<ButtonPrimary :link="'auth'" :class="'toggled'">Get Started for Free</ButtonPrimary>
						<span class="text-center font-light mt-4">
							Have an account? <br>
							<RouterLink class="underline font-medium rounded-sm p-0.5" to="auth">Log In</RouterLink>
						</span>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import AboutGridItem from '@/components/AboutGridItem.vue';
import ButtonPrimary from '@/components/ButtonPrimary.vue';
import AppFooter from '@/components/AppFooter.vue';
import { annotate } from 'rough-notation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onMounted } from 'vue';
import { useSeoMeta } from '@unhead/vue';

useSeoMeta({
	title: 'About - Reciplease',
	description: 'Learn how to cook better and save money with Reciplease. Save time, money, and headaches when cooking and grocery shopping.',
	ogDescription: 'Learn how to cook better and save money with Reciplease. Save time, money, and headaches when cooking and grocery shopping.',
	ogTitle: 'About - Reciplease',
	// ogImage: '/src/assets/img/og-img.jpg',
	twitterCard: 'summary_large_image'
})

onMounted(() => {
	gsap.registerPlugin(ScrollTrigger)

	const cards = {
		card1: document.querySelectorAll('h2')[0],
		card2: document.querySelectorAll('h2')[1],
		card3: document.querySelectorAll('h2')[2],
		card4: document.querySelectorAll('h2')[3]
	}
	const ann = {
		a1: annotate(cards.card1, { 
				type: 'underline',
				color: '#687441'
			}),
		a2: annotate(cards.card2, { 
				type: 'underline',
				color: '#687441'
			}),
		a3: annotate(cards.card3, { 
				type: 'underline',
				color: '#687441'
			}),
		a4: annotate(cards.card4, { 
				type: 'underline',
				color: '#687441'
			})
	}

	function showUnderlines(el, annotateEl){
		gsap.to(el, {
			scrollTrigger:{
				trigger: el,
				start: 'bottom bottom-=20%',
				onEnter: ()=>{
					annotateEl.show()
				}
			}
		})
	}

	showUnderlines(cards.card1, ann.a1)
	showUnderlines(cards.card2, ann.a2)
	showUnderlines(cards.card3, ann.a3)
	showUnderlines(cards.card4, ann.a4)

	gsap.from(".about-cta", {
		scrollTrigger: {
			trigger: ".about-cta",
			start: 'top+=20% bottom',
			end: '+=15%'
		},
		opacity: 0,
		y: 50
	})


})

</script>

<style lang="sass">
main
	margin-top: calc( 81px + 3rem )
a
	color: g.$green-primary
	transition: all .15s

	&:hover
		color: g.$green-acc1

	&:focus-visible
		outline: 2px solid g.$green-primary
		outline-offset: 3px

#first-about
	gap: 3rem

@media (prefers-color-scheme:dark)
	div
		border-color: g.$green-primary

	.about-cta
		background-color: g.$green-acc3

	a
		color: g.$green-light

		&:hover
			color: g.$green-primary

		&:focus-visible
			outline: 2px solid g.$green-light
			outline-offset: 3px

</style>
