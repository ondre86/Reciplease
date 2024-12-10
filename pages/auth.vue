<template>
	<div id="app-wrap">
		<main class="flex flex-col justify-start items-center px-4 gap-8">
			<div class="flex flex-col text-4xl justify-center items-center gap-6">
				<h1 class="text-6xl font-semibold">{{authMode}}</h1>
				<span class="w-full text-lg font-light text-center">{{authMode}} to use Reciplease.</span>
			</div>
			<div class="auth-wrap flex flex-col gap-12 border shadow-2xl mt-12 rounded-xl p-4 py-8 md:p-12">
				<div class="flex flex-col gap-6">
					<h2 class="opacity-45 text-center text-md font-light mb-2">Sign in with External Provider</h2>
					<div class="flex justify-evenly gap-4">
						<ButtonPrimary id="appleAuth" class="shadow-md flex justify-center">
							<img src="~/assets/other-logo/apple.svg" alt="" height="33px" width="30px">
						</ButtonPrimary>
						<ButtonPrimary id="googleAuth" class="shadow-lg flex justify-center">
							<img src="~/assets/other-logo/google.svg" alt="" height="24px" width="24px">
						</ButtonPrimary>
						<ButtonPrimary id="facebookAuth" class="shadow-md flex justify-center">
							<img src="~/assets/other-logo/facebook.svg" alt="" height="30px" width="30px">
						</ButtonPrimary>
					</div>
				</div>
				<div class="w-2/4 h-px self-center divide-x-8 divider"></div>
				<div class="flex flex-col gap-4">
					<h2 class="opacity-45 text-center text-md font-light mb-4">Sign in with Email</h2>
					<div class="flex flex-col gap-2">
						<label for="email">Email Address</label>
						<input
							id="email"
							type="text"
							ref="email"
							autocomplete="email"
							v-model="emailInput"
							class="
								h-12 w-full px-4 py-2 pr-20 rounded-lg text-xl transition-all duration-300 bg-transparent relative z-10 border-2
								focus:shadow-2xl focus-within:shadow-lg focus-visible:shadow-lg
							"
						/>
						<Transition name="fade" mode="out-in"><span id="error-email" ref="error-email">{{ errorEmail }}</span></Transition>
					</div>
					<div class="flex flex-col gap-4">
						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-3">
								<label for="password">Password</label>
								<UPopover class="w-fit self-center">
									<UButton id="pop-btn" color="white" label="?" class="rounded-full p-1 px-2 text-xs text-gray-500 flex self-center" />
									<template #panel>
										<div id="pop-modal" class="p-4 flex flex-col gap-2">
											<span class="text-center text-sm">Password must be at least: </span>
											<span class="text-xs text-gray-500 text-center">8 characters long<br>1 lowercase letter + 1 uppercase letter<br>1 number + 1 symbol</span>
										</div>
									</template>
								</UPopover>
							</div>
							<input
								id="password"
								type="password"
								ref="password"
								autocomplete="current-password"
								v-model="passwordInput"
								minlength="8"
								class="
									h-12 w-full px-4 py-2 pr-20 rounded-lg text-xl transition-all duration-300 bg-transparent relative z-10 border-2
									focus:shadow-2xl focus-within:shadow-lg focus-visible:shadow-lg
								"
							/>
							<Transition name="fade" mode="out-in">
								<div class="flex flex-col gap-2" v-show="authMode == 'Sign Up'" :key="1">
									<label for="confirm-password">Confirm Password</label>
									<input
										id="confirm-password"
										type="password"
										ref="confirmPassword"
										v-model="confirmPasswordInput"
										class="
											h-12 w-full px-4 py-2 pr-20 rounded-lg text-xl transition-all duration-300 bg-transparent relative z-10 border-2
											focus:shadow-2xl focus-within:shadow-lg focus-visible:shadow-lg
										"
									/>
									<Transition name="fade" mode="out-in"><span id="error-password" ref="error-password">{{ confirmErrorPassword }}</span></Transition>
								</div>
							</Transition>
							<UMeter id='meter' ref="meter" :min="0" :max="65" :value="passwordStrength" :color="meterColor" class="my-4 items-center" :ui="{ meter: {background: 'dark:bg-neutral-900'} }" />
							<Transition name="fade" mode="out-in"><span id="error-password" ref="error-password">{{ errorPassword }}</span></Transition>
						</div>
					</div>
				</div>
				<div class="flex flex-col gap-6 mt-2">
					<div class="flex justify-center mb-4">
						<NuxtLink to="/" class="forgot underline underline-offset-4 hover:underline-offset-8 transition-all duration-200 rounded-md">Forgot your Password?</NuxtLink>
					</div>
					<ButtonPrimary class="toggled" style="width: 100%;" :class="{'disabled': invalid}" :tabIndex="{0: invalid}">{{ authMode }}</ButtonPrimary>
					<span 
						@click.prevent="switchAuthMode();"
						@keyup.enter="switchAuthMode();"
						class="auth-switch text-lg self-center underline underline-offset-4 hover:underline-offset-8 transition-all duration-200 cursor-pointer rounded-md" tabindex="0">
						{{authSwitchLink}}
					</span>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup>
import validator from 'validator'

useHead({
  title: 'Sign In',
  meta: [
	{
		name: 'description',
		content: 'Sign in to use Reciplease. Gain access to account features like saved recipes, view history, and previous shopping lists.'
	},
	{
		name: 'og:description',
		content: 'Sign in to use Reciplease. Gain access to account features like saved recipes, view history, and previous shopping lists.'
	},
	{
		name: 'og:title',
		content: 'Sign In · Reciplease'
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

const email = ref(null)
const emailInput = defineModel('email')
const password = ref(null)
const passwordInput = defineModel('password')
const passwordStrength = ref(null)
const meterColor = ref('red')
const confirmPassword = ref(null)
const confirmPasswordInput = defineModel('confirmPassword')
const invalid = ref(true)
const errorEmail = ref('')
const errorPassword = ref('')
const confirmErrorPassword = ref('')

const authMode = ref('Sign In')
const authSwitchLink = ref('Create an Account')

function switchAuthMode(){
	authMode.value == "Sign In" ? authMode.value = 'Sign Up' : authMode.value = "Sign In"
	authSwitchLink.value == "Create an Account" ? authSwitchLink.value = 'Use Existing Account' : authSwitchLink.value = "Create an Account"
	email.value.focus()
}

watch([emailInput, passwordInput, confirmPasswordInput, passwordStrength, authMode], ([currentEmail, currentPass, currentCPass, currentPasswordStrength, currentAuthMode])=>{
	console.log(currentEmail, currentPass, currentCPass, currentAuthMode)
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

	if (
		(currentEmail && validator.isEmail(currentEmail)) && 
		(currentPass && validator.isStrongPassword(currentPass)) && 
		((currentAuthMode == "Sign In" || currentCPass == currentPass))
	){
		invalid.value = false
	}
	else {invalid.value = true}
})

</script>

<style lang="sass" scoped>
.meter-bg
	background-color: g.$grey-fill
button
	transition: all .3s
	&:focus, &:focus-visible
		outline: 2px solid g.$green-primary
		outline-offset: 4px
		--tw-ring-color: #DADADA


#email, #password, #confirm-password
	background-color: g.$grey-fill

	&:focus
		outline: 2px solid g.$green-primary

.auth-switch, .forgot
	color: g.$green-primary

	@media (hover:hover)
		&:hover, &:focus-visible
			color: g.$green-acc2

.divider
	background-color: #DADADA
	opacity: .45

a, span
	transition: all .3s
	&:focus, &:focus-visible	
		outline: none
		text-underline-offset: 16px

#googleAuth, #facebookAuth, #appleAuth
	width: 100%
	height: 48px

#googleAuth
	background-color: white
	background-image: radial-gradient(circle at 100% 100%, transparent 4px, #d50000 4px, #d50000 6px, transparent 6px), linear-gradient(to right, #d50000, #304ffe), radial-gradient(circle at 0% 100%, transparent 4px, #304ffe 4px, #304ffe 6px, transparent 6px), linear-gradient(to bottom, #304ffe, #27bc27), radial-gradient(circle at 0% 0%, transparent 4px, #27bc27 4px, #27bc27 6px, transparent 6px), linear-gradient(to left, #27bc27, #ffd600), radial-gradient(circle at 100% 0%, transparent 4px, #ffd600 4px, #ffd600 6px, transparent 6px), linear-gradient(to top, #ffd600, #d50000)
	background-size:6px 6px,calc(100% - 12px) 2px,6px 6px,2px calc(100% - 12px)
	background-position: top left,top center,top right,center right, bottom right,bottom center,bottom left,center left
	background-repeat: no-repeat
	border: 1px solid white
	--tw-ring-color: #DADADA

	@media (hover:hover)
		&:hover, &:focus-visible
			background-color: g.$grey-fill
			--tw-ring-color: g.$grey-fill
			color: g.$tan-primary

	&:focus-visible
		outline: 3px solid #3388ff
		outline-offset: 3px

	&:active
		background-color: #e9e9e9
		--tw-ring-color: #141B0C

#facebookAuth
	background-color: #4167b2
	border: 1px solid white
	--tw-ring-color: #4167b2
	outline: 3px solid transparent

	@media (hover:hover)
		&:hover, &:focus-visible
			background-color: #355899
			--tw-ring-color: #355899
			color: g.$tan-primary

	&:focus-visible
		outline: 3px solid #355899
		outline-offset: 3px

	&:active
		background-color: #2a487d
		--tw-ring-color: #141B0C

#appleAuth
	background-color: black
	border: 1px solid white
	--tw-ring-color: #000000
	outline: 3px solid transparent

	@media (hover:hover)
		&:hover, &:focus-visible
			background-color: #333333
			--tw-ring-color: #333333
			color: g.$tan-primary

	&:focus-visible
		outline: 3px solid #333333
		outline-offset: 3px

	&:active
		background-color: #5c5c5c
		--tw-ring-color: #5c5c5c

@media (prefers-color-scheme:dark)
	.meter-bg
		background-color: g.$green-acc3

	.auth-wrap
		background-color: g.$green-acc3
		
	#email, #password, #confirm-password
		border-color: g.$tan-acc1	
		background-color: g.$green-acc2
		border-color: g.$green-acc1

	.divider
		background-color: g.$green-light

	button
		span
			color: g.$green-primary

	.auth-switch, .forgot
		color: g.$green-light

		@media (hover:hover)
			&:hover, &:focus-visible
				color: g.$tan-primary

	#pop-btn, #pop-modal, #headlessui-popover-panel-v-5
		background-color: g.$green-acc3
		--tw-ring-color: #687441

		span
			color: g.$tan-primary

	#appleAuth, #googleAuth, #facebookAuth
		&:focus-visible
			outline: 3px solid #ffffff
			outline-offset: 3px

</style>
