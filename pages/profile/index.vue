<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-6 gap-6">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">Profile</h1>
				<span class="w-full text-lg font-light text-center">View saved recipes, history, and account settings.</span>
			</div>
			<div id="acctMeta" class="flex flex-col gap-16 mt-8 w-full md:w-fit">
				<div class="meta-wrap flex flex-col text-xl p-4 gap-10 rounded-xl border shadow-xl items-center md:flex-row md:gap-16">
					<div class="flex flex-col gap-3">
						<div class="flex flex-col gap-4 md:flex-row">
							<div class="flex flex-col gap-2 flex-wrap justify-center">
								<span v-if="authStore.user" class="text-2xl font-semibold text-center break-all">{{ authStore.displayName }}</span>
							</div>
						</div>
						<div class="flex gap-4 justify-center">
							<div class="flex gap-4 justify-center self-center verify-badge border p-2 rounded-lg w-fit text-xs">
								<span class="" v-if="authStore.user && authStore.user.emailVerified">Verified</span>
								<span class="" v-else>Not Verified</span>
							</div>
							<div class="flex gap-4 w-fit items-center">
								<span class="free-badge border p-2 rounded-lg w-fit text-xs font-semibold">Free</span>
							</div>
						</div>

					</div>
					<ButtonSecondary
						class="cursor-pointer text-center w-full h-fit md:w-fit"
						@click="authStore.signOutUser()"
						@keyup.enter="authStore.signOutUser()"
						tabindex="0"
					>
						Sign Out
					</ButtonSecondary>
				</div>
			</div>
			<ul class="mt-12 w-full flex flex-col justify-center items-center gap-4 md:flex-row md:flex-wrap">
				<li class="w-full md:w-fit">
					<ProfileOption 
						:optionTitle="'Saved Recipes'" 
						:link="'/profile/saved'"
						:subtitle="'Save recipes from your searches and view them here.'"
					>
					</ProfileOption>
				</li>
				<li class="w-full md:w-fit">
					<ProfileOption 
						:optionTitle="'Activity History'" 
						:link="'/profile/history'"
						:subtitle="'View your past searches and shopping list creations.'"
					>
					</ProfileOption>
				</li>
				<li class="w-full md:w-fit">
					<ProfileOption 
						:optionTitle="'Account Settings'" 
						:link="'/profile/settings'"
						:subtitle="'Change your account email and password, or delete your account.'"
					>
					</ProfileOption>
				</li>
				<li class="w-full md:w-fit">
					<ProfileOption 
						:optionTitle="'Billing & Plans'" 
						:subtitle="'View your invoices and change your subscription plan.'"
						:disabled="true"
					>
					</ProfileOption>
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

const authStore = useAuthStore()

// onMounted(()=>{
// 	const a1 = annotate(document.querySelectorAll('.annotate')[0], { type: 'underline', color: '#687441' })
// 	setTimeout(() => {
// 		a1.show()
// 	}, 300)
// })

const tier = ref('')

</script>

<style lang="sass" scoped>
main
	max-width: 1100px

.free-badge, .verify-badge
	background-color: g.$grey-fill

.free-badge
	border-color: g.$green-acc2
.pro-badge
	background-color: #E9EED8
	border-color: g.$green-acc2


@media (prefers-color-scheme:dark)
	.free-badge, .verify-badge
		background-color: g.$green-acc1

	.free-badge
		// background-color: #E9EED8
		border-color: g.$green-light
</style>