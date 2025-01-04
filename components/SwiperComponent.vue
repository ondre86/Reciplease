<template>
	<ul class="flex overflow-x-scroll pb-4 items-start" ref="inspoList">
		<li v-for="(item, index) in inspo" :key="index">
			<InspoPic :img="item.img" :title="item.title" class="inspo"></InspoPic>
		</li>
	</ul>
</template>

<script setup>
const { $gsap, $ScrollTrigger } = useNuxtApp()

const inspo = ref([
	{
		img: '/img/IMG_5210.webp',
		title: 'BBQ Ribs, Mac & Cheese, Asparagus'
	},
	{
		img: '/img/IMG_5990.webp',
		title: 'Garden Salad with Breaded Chicken'
	},
	{
		img: '/img/IMG_6013.webp',
		title: 'Lo Mein, Orange Chicken & Steamed Dumplings'
	},
	{
		img: '/img/IMG_6036.webp',
		title: 'Salmon Flatbread'
	},
	{
		img: '/img/IMG_6045.webp',
		title: 'Grilled Cheese & Tomato Soup'
	},
	{
		img: '/img/IMG_6115.webp',
		title: 'Fried Rice, BBQ Wings, Chicken Ramen'
	},
	{
		img: '/img/IMG_6184.webp',
		title: 'Chicken Noodle Soup'
	},
	{
		img: '/img/IMG_6257.webp',
		title: 'Beef Stew over Mashed Potatoes'
	},
	{
		img: '/img/IMG_6332.webp',
		title: 'Berry Parfait with Orange Slices'
	},
	{
		img: '/img/IMG_6553.webp',
		title: 'Navy Beans, Green Beans, Baked Drumsticks & Cornbread'
	},
	{
		img: '/img/IMG_6480.webp',
		title: 'Angel Hair Pasta & Garlic Parmesan Chicken Wings'
	},
	{
		img: '/img/IMG_6514.webp',
		title: 'Pesto Pasta & Salmon'
	},
	{
		img: '/img/IMG_6526.webp',
		title: 'Crawfish Etoufée and Cod'
	},
	{
		img: '/img/IMG_6542.webp',
		title: 'Fried Shrimp Tacos'
	},

	{
		img: '/img/IMG_6566.webp',
		title: 'Jambalaya, Corn, BBQ Wings, Green Beans, Brioche'
	},
])
const inspoList = ref()

onMounted(() => {
	$ScrollTrigger.create({
		animation: $gsap.from(inspoList.value.children, {
			x: '100%',
			opacity: 0,
			filter: 'blur(5px)'
		}),
		trigger: inspoList.value,
		start: "top bottom-=10%",
		end: "+=50%",
		scrub: true
	})
})


</script>

<style lang="sass" scoped>

</style>