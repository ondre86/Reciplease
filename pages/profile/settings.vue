<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-6 gap-8 mb-12" style="margin-top: calc(69.4px + 2rem);">
			<div
				class="flex items-center gap-3 self-start cursor-pointer back-text"
				@click="navigateTo('/profile')"
				@keyup.enter="navigateTo('/profile')"
			>
				<ButtonSearch
					:svg-width="'12px'"
					:svg-height="'12px'"
					class="rotate-180"
				>
				</ButtonSearch>
				<span>Profile</span>
			</div>
			<div class="flex flex-col text-4xl justify-center items-center">
				<h1 class="text-4xl font-semibold">Settings</h1>
			</div>
			<div class="flex flex-col gap-6 md:flex-row">
				<div class="flex flex-col gap-4 justify-between">
					<div
						class="flex flex-col p-6 border rounded-xl justify-between items-center gap-8 h-fit md:gap-12"
					>
						<h3 class="text-2xl font-semibold">Change Email</h3>
						<div class="flex flex-col gap-4 items-center">
							<div class="flex flex-col gap-2">
								<label for="email" class="self-start">New Email Address</label>
								<input
									id="email"
									type="text"
									ref="email"
									autocomplete="email"
									v-model="emailInput"
									class="
										email-input h-12 w-full px-4 py-2 rounded-lg text-xl transition-all duration-300 bg-transparent relative z-10 border-2
										focus:shadow-2xl focus-within:shadow-lg focus-visible:shadow-lg
									"
									:class="{'red-border': authStore.authMsg}"
								/>
							</div>
							<Transition name="fade" mode="out-in"><span id="email-msg" ref="email-msg" class="text-center" v-if="authStore.authMsg && !authStore.authMsg.includes('password')">{{ authStore.authMsg }}</span></Transition>
							<Transition name="fade" mode="out-in">
								<ButtonPrimary
									class="toggled mt-4"
									:class="{'disabled': emailInvalid}"
									@click="changeEmail"
									@keyup.enter="changeEmail"
									v-if="!authStore.loadingState"
								>
									Update Email
								</ButtonPrimary>
								<LoadingAnimation :svg-width="'50px'" v-else></LoadingAnimation>
							</Transition>
						</div>
					</div>
					<div
						class="flex-col p-6 border rounded-xl justify-between items-center gap-8 hidden md:gap-12 md:flex"
					>
						<h3 class="text-2xl font-semibold">Delete Account</h3>
						<ButtonSecondary 
							class="toggled cursor-pointer"
							@click="toggleDeleteModal()"
							@keyup.enter="toggleDeleteModal()"
							tabindex="0"
						>
							Delete Account
						</ButtonSecondary>
					</div>
				</div>
				<div
					class="flex flex-col p-6 border rounded-xl justify-between items-center gap-8 md:gap-12"
				>
					<h3 class="text-2xl font-semibold text-center">Change Password</h3>
					<div class="flex flex-col gap-2">
						<div class="flex gap-4">
							<label for="password">New Password</label>
							<UPopover class="w-fit self-center" :ui="{ ring: 'ring-0 border border-gmain-500' }">
								<UButton id="pop-btn" color="white" label="?" class="rounded-full p-1 px-2 text-xs text-gray-500 flex self-center " />
								<template #panel>
									<div id="pop-modal" class="p-4 flex flex-col gap-2">
										<span class="text-center text-sm">Password must be at least: </span>
										<span class="text-xs text-gray-500 text-center dark:text-white">8 characters long<br>1 lowercase letter + 1 uppercase letter<br>1 number + 1 symbol</span>
									</div>
								</template>
							</UPopover>
						</div>
						<div class="relative">
						<input
							id="password"
							:type="passwordVisible ? 'text' : 'password'"
							ref="password"
							autocomplete="current-password"
							v-model="passwordInput"
							minlength="8"
							class="
								pw-input h-12 w-full px-4 py-2 rounded-lg text-xl transition-all duration-300 bg-transparent relative z-10 border-2 pr-12
								focus:shadow-2xl focus-within:shadow-lg focus-visible:shadow-lg
							"
							:class="{'red-border': authStore.authMsg}"
						/>
						<div class="w-fit h-fit"
							tabindex="0"
							@click="passwordVisible ? passwordVisible = false : passwordVisible = true"
							@keyup.enter="passwordVisible ? passwordVisible = false : passwordVisible = true"
						>
							<Icon
								class="cursor-pointer absolute top-1/2 -translate-y-1/2 right-4 z-50"
								:name="passwordVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
							></Icon>
						</div>
					</div>
					</div>
					<div class="flex flex-col gap-2 w-full">
						<label for="confirm-password">Confirm Password</label>
						<div class="relative">
								<input
									id="confirm-password"
									:type="passwordVisible ? 'text' : 'password'"
									ref="confirmPassword"
									v-model="confirmPasswordInput"
									class="
										cpw-input h-12 w-full px-4 py-2 rounded-lg text-xl transition-all duration-300 bg-transparent relative z-10 border-2
										focus:shadow-2xl focus-within:shadow-lg focus-visible:shadow-lg
									"
									:class="{'red-border': authStore.authMsg}"
								/>
							</div>
						<UMeter id='meter' ref="meter" :min="0" :max="65" :value="passwordStrength" :color="meterColor" class="my-4 items-center" :ui="{ meter: {background: 'dark:bg-neutral-800'} }" />
						<Transition name="fade" mode="out-in"><span id="password-msg" ref="password-msg" class="text-center" v-if="authStore.authMsg && authStore.authMsg.includes('password')">{{ authStore.authMsg }}</span></Transition>
					</div>

					<ButtonPrimary 
						class="toggled" 
						:class="{'disabled': passInvalid}"
						@click="changePassword"
						@keyup.enter="changePassword"
					>
						Update Password
					</ButtonPrimary>
				</div>
			</div>
			<div
				class="flex flex-col p-6 border rounded-xl justify-between items-center gap-8 md:gap-12 md:hidden"
			>
				<h3 class="text-2xl font-semibold text-center">Delete Account</h3>
				<ButtonSecondary 
					class="toggled cursor-pointer" 
					@click="toggleDeleteModal()"
					@keyup.enter="toggleDeleteModal()"
					tabindex="0"
				>
					Delete Account
				</ButtonSecondary>
			</div>
			<UModal v-model="modalOpen" :ui="{ container: 'items-center', background: 'bg-white dark:bg-neutral-900' }">
				<ButtonClose :svg-size="'15px'" :solo="true" class="absolute top-4 right-4 z-50" @click="toggleDeleteModal" @keyup.enter="toggleDeleteModal"></ButtonClose>
				<div class="p-4 py-6 flex flex-col items-center text-center gap-6 self-center relative">
					<h4 class="font-semibold text-2xl">Confirm Deletion</h4>
					<p>
						Are you sure you want to delete your account? <br><br>
						This action is not reversible.
					</p>
					<ButtonSecondary 
						class="toggled cursor-pointer mt-4" 
						@click="confirmDelete()"
						@keyup.enter="confirmDelete()"
						tabindex="0"
					>
						Yes, I'm Sure
					</ButtonSecondary>
				</div>
			</UModal>
		</main>
	</div>
</template>

<script setup>
import validator from 'validator'

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

const links = [
	{
		label: 'Profile',
		icon: 'i-heroicons-user',
		to: '/profile'
	},
	{
		label: 'Settings',
		icon: 'i-heroicons-cog-6-tooth'
	},
]

const authStore = useAuthStore()

const email = ref(null)
const emailInput = defineModel('email')
const password = ref(null)
const passwordInput = defineModel('password')
const passwordStrength = ref(null)
const meterColor = ref('red')
const confirmPassword = ref(null)
const confirmPasswordInput = defineModel('confirmPassword')
const emailInvalid = ref(true)
const passInvalid = ref(true)

const passwordVisible = ref(false)

const modalOpen = ref(false)

watch([emailInput, passwordInput, confirmPasswordInput, passwordStrength], ([currentEmail, currentPass, currentCPass, currentPasswordStrength], [oldEmail, oldPass, oldCPass, oldPasswordStrength])=>{
	console.log(currentEmail, currentPass, currentCPass)
	if (currentPass || currentPass == ''){
		passwordStrength.value = validator.isStrongPassword(passwordInput.value, {returnScore: true})
	}
	if (currentPasswordStrength >= 0 && currentPasswordStrength < 20){
		meterColor.value = 'red'
	}
	else if (currentPasswordStrength >= 21 && currentPasswordStrength < 50){
		meterColor.value = 'yellow'
	}
	else {
		meterColor.value = 'green'
	}

	// email change validation
	if ((currentEmail && validator.isEmail(currentEmail))){
		emailInvalid.value = false
	}
	else {
		emailInvalid.value = true
	}

	// confirm password validation
	if ((currentPass && validator.isStrongPassword(currentPass)) && (currentCPass == currentPass)){
		passInvalid.value = false
	}
	else {
		passInvalid.value = true
	}

	if (authStore.authMsg){
		if (currentEmail !== oldEmail || currentPass !== oldPass){
			authStore.authMsg = null
			console.log(currentEmail !== oldEmail)
			console.log(currentPass !== oldPass)
		}
	}
})

function changeEmail(){
	if (!emailInvalid.value) {
		authStore.changeEmail(emailInput.value)

	}
}
function changePassword(){
	if (!passInvalid.value) {
		authStore.changePassword(passwordInput.value)
		setTimeout(() => {
			passwordInput.value = confirmPasswordInput.value = ''
		}, 2000)
	}
}

function toggleDeleteModal() {
	if (modalOpen.value == true) modalOpen.value = false
	else modalOpen.value = true
}
function confirmDelete() {
	authStore.deleteCurrentUser()
}

</script>

<style lang="sass" scoped>
.tier-badge
	background-color: g.$grey-fill

.email-input, .pw-input, .cpw-input
	background-color: g.$grey-fill

	&:focus
		outline: 2px solid g.$green-primary

.red-border
	border: 2px solid g.$red-primary
	
	&:focus, &:focus-visible, &:focus-within
		outline: 6px solid g.$red-primary

@media (prefers-color-scheme:dark)
	.tier-badge
		background-color: g.$green-acc3

	.email-input, .pw-input, .cpw-input
		border-color: g.$tan-acc1	
		background-color: g.$green-acc2
		border-color: g.$green-acc1

	.red-border
		border: 2px solid g.$red-primary
		
		&:focus, &:focus-visible, &:focus-within
			outline: 6px solid g.$red-primary

</style>