<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-4 gap-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">Profile</h1>
				<span class="w-full text-lg font-light text-center">View saved recipes, history, and account settings.</span>
			</div>
			<div id="acctMeta" class="flex flex-col gap-16 mt-8">
				<div class="meta-wrap flex flex-col text-xl p-4 rounded-xl border items-start">
					<h2 class="mb-8 text-2xl font-medium annotate"> Your Info:</h2>
					<div class="flex flex-col gap-12">
						<div class="flex w-full justify-between gap-6">
							<div class="flex flex-col gap-2 flex-wrap">
								<Transition name="fade" mode="out-in">
									<span v-if="userStore.user" class="text-3xl font-semibold text-center">{{ userStore.displayName }}</span>
								</Transition>
							</div>
							<ButtonSecondary
								class="cursor-pointer w-full text-center md:w-fit"
								@click="userStore.signOutUser()"
								@keyup.enter="userStore.signOutUser()"
							>
								Sign Out
							</ButtonSecondary>
						</div>
						<div class="flex gap-6">
							<div class="flex gap-4 items-center">
								<span class="max-w-20 md:max-w-none">Account Tier: </span>
								<span class="tier-badge border p-2 rounded-lg w-fit">Free{{ tier }}</span>
							</div>
							<div class="flex gap-4 items-center">
								<span class="max-w-20 md:max-w-none">Date Joined: </span>
								<span class="tier-badge border p-2 rounded-lg w-fit">{{ userStore.dateCreated }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<ul class="mt-12 w-full flex flex-col justify-center items-center gap-12 md:flex-row md:flex-wrap">
				<li class="w-full md:w-fit">
					<ProfileOption :optionTitle="'Saved Recipes'" :link="'/profile/saved'"></ProfileOption>
				</li>
				<li class="w-full md:w-fit">
					<ProfileOption :optionTitle="'Activity History'" :link="'/profile/history'"></ProfileOption>
				</li>
				<li class="w-full md:w-fit">
					<ProfileOption :optionTitle="'Account Settings'" :link="'/profile/settings'"></ProfileOption>
				</li>
				<li class="w-full md:w-fit">
					<ProfileOption :optionTitle="'Billing & Plans'" :link="'/profile/billing'"></ProfileOption>
				</li>

			</ul>
		</main>
	</div>
</template>

<script setup>
import { annotate } from 'rough-notation';

definePageMeta({
  requiresAuth: true,
})

const userStore = useAuthStore()

onMounted(()=>{
	const a1 = annotate(document.querySelectorAll('.annotate')[0], { type: 'underline', color: '#687441' })
	setTimeout(() => {
		a1.show()
	}, 2000)
})

const tier = ref('')

</script>

<style lang="sass" scoped>
main
	max-width: 1100px
.tier-badge
	background-color: g.$grey-fill


@media (prefers-color-scheme:dark)
	.tier-badge
		background-color: g.$green-acc1
</style>