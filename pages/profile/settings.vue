<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-4 gap-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">Settings</h1>
			</div>
			<div class="flex flex-col gap-16 mt-8">
				<div class="meta-wrap flex flex-col text-xl p-4 rounded-xl border items-start">
					<div class="flex flex-col gap-6">
						<div class="flex flex-col gap-2 flex-wrap">
							<Transition name="fade" mode="out-in">
								<span v-if="authStore.user" class="text-3xl font-semibold text-center">{{ authStore.displayName }}</span>
							</Transition>
						</div>
						<div class="flex gap-4 w-full justify-center items-center">
							<span class="max-w-20 md:max-w-none">Account Tier: </span>
							<span class="tier-badge border p-2 rounded-lg w-fit">Free{{ tier }}</span>
						</div>
					</div>
					<ButtonSecondary
						class="cursor-pointer text-center w-fit mt-8 self-center"
						@click="authStore.signOutUser()"
						@keyup.enter="authStore.signOutUser()"
					>
						Sign Out
					</ButtonSecondary>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
definePageMeta({
  requiresAuth: true,
})
useHead({
  title: 'Settings',
  meta: [
	{
		name: 'description',
		content: 'Manage your Reciplease account.'
	},
	{
		name: 'og:description',
		content: 'Manage your Reciplease account.'
	},
	{
		name: 'og:title',
		content: 'Settings · Reciplease'
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

const authStore = useAuthStore()
</script>

<style lang="scss" scoped>

</style>