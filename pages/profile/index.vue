<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-4 gap-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">Profile</h1>
				<span class="w-full text-lg font-light text-center">View saved recipes, history, and account settings.</span>
			</div>
			<div id="acctMeta" class="flex flex-col gap-4 mt-8">
				<h2 class="text-3xl font-semibold text-center">Hello, User{{ user }}</h2>
				<div class="meta-wrap flex flex-col gap-12 text-xl p-4 rounded-xl border items-start md:flex-row">
					<div class="flex gap-6 items-center">
						<span class="max-w-20 md:max-w-none">Account Tier: </span>
						<span class="tier-badge border p-2 rounded-lg w-fit">Free{{ tier }}</span>
					</div>
					<div class="flex gap-6 items-center">
						<span class="max-w-20 md:max-w-none">Date Joined: </span>
						<span class="tier-badge border p-2 rounded-lg w-fit">{{ new Date().toUTCString() }}</span>
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