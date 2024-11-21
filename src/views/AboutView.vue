<template>
	<div>
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
					:desc="'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt eaque culpa aperiam velit odit saepe, natus, quidem enim illo perferendis vero, repudiandae assumenda. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt eaque culpa aperiam velit odit saepe, natus, quidem enim illo perferendis vero, repudiandae assumenda.'"
				>
				</AboutGridItem>
				<AboutGridItem
					:image="'./src/assets/svg/stars.svg'"
					:alt="''"
					:title="'Creativity Catalyst'"
					:subline="`Spice things up for your family & friends...and Instagram!`"
					:desc="'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt eaque culpa aperiam velit odit saepe, natus, quidem enim illo perferendis vero, repudiandae assumenda. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt eaque culpa aperiam velit odit saepe, natus, quidem enim illo perferendis vero, repudiandae assumenda.'"
				>
				</AboutGridItem>
				<AboutGridItem
					:image="'./src/assets/svg/money.svg'"
					:alt="''"
					:title="'Budget Booster'"
					:subline="`Forget about surprises at the cash register.`"
					:desc="'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt eaque culpa aperiam velit odit saepe, natus, quidem enim illo perferendis vero, repudiandae assumenda. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt eaque culpa aperiam velit odit saepe, natus, quidem enim illo perferendis vero, repudiandae assumenda.'"
				>
				</AboutGridItem>
				<AboutGridItem
					:image="'./src/assets/svg/smile.svg'"
					:alt="''"
					:title="'Headache Reliever'"
					:subline="`Keep everything together - without clutter, scrolling, and ads.`"
					:desc="'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt eaque culpa aperiam velit odit saepe, natus, quidem enim illo perferendis vero, repudiandae assumenda. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt eaque culpa aperiam velit odit saepe, natus, quidem enim illo perferendis vero, repudiandae assumenda.'"
				>
				</AboutGridItem>
			</div>
			<div class="about-cta flex flex-col my-24 mt-36 gap-6 border p-16 rounded-xl shadow-2xl">
				<h2 class="font-semibold text-4xl text-center">Ready to Level Up?</h2>
				<span class="font-normal text-base text-center">Start using Reciplease today!</span>
				<div class="flex justify-center mt-6">
					<div class="flex flex-col pr-16">
						<ButtonPrimary :link="'pricing'">View Pricing Plans</ButtonPrimary>
					</div>
					<div class="flex flex-col gap-4 items-center pl-16 border-l">
						<ButtonPrimary :link="'auth'" :class="'toggled'">Get Started for Free</ButtonPrimary>
						<span class="text-center font-light mt-4">
							Have an account? <br><RouterLink class="underline font-medium" to="auth">Log In</RouterLink>
						</span>
					</div>
				</div>
			</div>
		</main>
		<AppFooter></AppFooter>
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
				start: 'bottom bottom+=20%',
				onEnter: ()=>{
					annotateEl.show()
				}
			}
		})
	}

	showUnderlines(cards.card1.parentElement.parentElement, ann.a1)
	showUnderlines(cards.card2.parentElement.parentElement, ann.a2)
	showUnderlines(cards.card3.parentElement.parentElement, ann.a3)
	showUnderlines(cards.card4.parentElement.parentElement, ann.a4)

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
</style>
