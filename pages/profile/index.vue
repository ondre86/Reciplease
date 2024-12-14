<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-4 gap-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">Profile</h1>
				<span class="w-full text-lg font-light text-center">View saved recipes, history, and account settings.</span>
			</div>
			<div id="acctMeta" class="flex flex-col gap-16 mt-8 w-full md:w-fit">
				<div class="meta-wrap flex flex-col text-xl p-4 rounded-xl border items-center">
					<div class="flex flex-col gap-6">
						<div class="flex flex-col gap-2 flex-wrap">
							<Transition name="fade" mode="out-in">
								<span v-if="authStore.user" class="text-2xl font-semibold text-center break-all">{{ authStore.displayName }}</span>
							</Transition>
						</div>
						<div class="flex gap-4 w-full justify-center items-center">
							<span>Account Tier: </span>
							<span class="tier-badge border p-2 rounded-lg w-fit">Free{{ tier }}</span>
						</div>
						<div class="flex gap-4 justify-center self-center tier-badge border p-2 rounded-lg w-fit">
							<span v-if="authStore.user && authStore.user.emailVerified">Verified &nbsp;✅</span>
							<span v-else>Not Verified &nbsp;❌</span>
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
			<ul class="mt-12 w-full flex flex-col justify-center items-center gap-8 md:flex-row md:flex-wrap">
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
					<ProfileOption :optionTitle="'Billing & Plans'" :disabled="true"></ProfileOption>
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
.tier-badge
	background-color: g.$grey-fill


@media (prefers-color-scheme:dark)
	.tier-badge
		background-color: g.$green-acc1
</style>