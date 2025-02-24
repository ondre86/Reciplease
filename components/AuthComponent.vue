<template>
    <div 
		class="auth-wrap flex flex-col gap-12 border shadow-2xl mt-6 rounded-xl p-4 py-8 md:p-8"
		:class="{'gap-2': forgotPassword}"
	>
        <!-- <div class="flex flex-col gap-6">
            <h2 class="opacity-45 text-center text-md font-light mb-2">{{authMode}} with External Provider</h2>
            <div class="flex justify-evenly gap-4">
                <ButtonPrimary 
					id="appleAuth" 
					class="shadow-md flex justify-center"
				>
                    <img src="~/assets/other-logo/apple.svg" alt="" height="33px" width="30px">
                </ButtonPrimary>
                <ButtonPrimary 
					id="googleAuth" 
					class="shadow-lg flex justify-center" 
				>
                    <img src="~/assets/other-logo/google.svg" alt="" height="24px" width="24px">
                </ButtonPrimary>
                <ButtonPrimary 
					id="facebookAuth" 
					class="shadow-md flex justify-center"
				>
                    <img src="~/assets/other-logo/facebook.svg" alt="" height="30px" width="30px">
                </ButtonPrimary>
            </div>
        </div> -->
        <div class="w-2/4 h-px self-center divide-x-8 divider hidden"></div>
        <div class="flex flex-col gap-4">
            <h2 class="opacity-45 text-center text-md font-light mb-4 hidden">{{authMode}} with Email</h2>
            <div class="flex flex-col gap-2">
                <label for="email">Email Address</label>
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
					:class="{'red-border': forgotPassword ? false : authStore.authMsg}"
                />
                <Transition name="fade" mode="out-in"><span id="error-email" ref="error-email">{{ errorEmail }}</span></Transition>
            </div>
            <div class="flex flex-col gap-4" v-if="!forgotPassword">
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-3">
                        <label for="password">Password</label>
                        <UPopover class="w-fit self-center" :ui="{ ring: 'ring-0 border border-gmain-500' }">
                            <UButton id="pop-btn" color="white" label="?" class="rounded-full p-1 px-2 text-xs text-gray-500 flex self-center" />
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
							@keyup.enter="submitCredentials"
						/>
						<div class="pw-icon flex justify-center items-center cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 z-50 w-fit h-fit p-2 rounded-full transition-all duration-300"
							tabindex="0"
							role="button"
							aria-label="Show Password"
							@click="passwordVisible ? passwordVisible = false : passwordVisible = true"
							@keyup.enter="passwordVisible ? passwordVisible = false : passwordVisible = true"
						>
							<Icon
								:name="passwordVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
							></Icon>
						</div>
					</div>
                    <Transition name="fade" mode="out-in">
                        <div class="flex flex-col gap-2" v-show="authMode == 'Sign Up'" :key="1">
                            <label for="confirm-password">Confirm Password</label>
                            <div class="relative">
								<input
									id="confirm-password"
									:type="passwordVisible ? 'text' : 'password'"
									ref="confirmPassword"
									v-model="confirmPasswordInput"
									class="
										cpw-input h-12 w-full px-4 py-2 rounded-lg text-xl transition-all duration-300 bg-transparent relative z-10 border-2 pr-12
										focus:shadow-2xl focus-within:shadow-lg focus-visible:shadow-lg
									"
									:class="{'red-border': authStore.authMsg}"
									@keyup.enter="submitCredentials"
								/>
								<div class="pw-icon flex justify-center items-center cursor-pointer absolute top-1/2 -translate-y-1/2 right-2 z-50 w-fit h-fit p-2 rounded-full transition-all duration-300"
									tabindex="0"
									role="button"
									aria-label="Show Password"
									@click="passwordVisible ? passwordVisible = false : passwordVisible = true"
									@keyup.enter="passwordVisible ? passwordVisible = false : passwordVisible = true"
								>
									<Icon
										:name="passwordVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
									></Icon>
								</div>
							</div>
                            <Transition name="fade" mode="out-in"><span id="error-password" ref="error-password">{{ confirmErrorPassword }}</span></Transition>
                        </div>
                    </Transition>
                    <UMeter v-show="authMode == 'Sign Up'" id='meter' ref="meter" :label="'Password Strength'" :min="0" :max="65" :value="passwordStrength" :color="meterColor" class="my-4 items-center" :ui="{ meter: {background: 'dark:bg-neutral-800'} }" />
                    <Transition name="fade" mode="out-in">
                        <span class="w-full text-center" id="error-password" ref="error-password" v-if="authStore.authMsg">Invalid Email or Password</span>
                    </Transition>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-6 mt-2">
            <div class="flex justify-center mb-4">
				<span v-if="authStore.authMsg && forgotPassword">{{ authStore.authMsg }}</span>
				<span 
					v-else-if="!forgotPassword" 
					tabindex="0" 
					role="button"
					aria-label="Forgot Your Password?"
					@click="forgotPassword = true" 
					@keyup.enter="forgotPassword = true" 
					class="forgot underline cursor-pointer underline-offset-4 hover:underline-offset-8 transition-all duration-200 rounded-md"
					>
						Forgot your Password?
					</span>
            </div>
            <div class="flex justify-center">
				<Transition name="fade" mode="out-in">
					<ButtonPrimary
						class="toggled"
						style="width: 100%"
						:class="{'disabled': invalid}"
						:tabIndex="{0: invalid}"
						:disabled="invalid == true"
						@click.prevent="submitCredentials()"
						@keyup.enter="submitCredentials()"
						v-if="!authStore.loadingState"
					>
							{{ forgotPassword ? "Send Reset Link" : authMode }}
					</ButtonPrimary>
					<LoadingAnimation v-else :svgWidth="'50px'"></LoadingAnimation>
				</Transition>
			</div>
            <span 
                @click.prevent="switchAuthMode()"
                @keyup.enter="switchAuthMode()"
                class="auth-switch text-lg self-center underline underline-offset-4 hover:underline-offset-8 transition-all duration-200 cursor-pointer rounded-md" 
				tabindex="0"
				role="button"
			>
                {{authSwitchLink}}
            </span>
			<span
				class="auth-switch text-lg self-center underline underline-offset-4 hover:underline-offset-8 transition-all duration-200 cursor-pointer rounded-md" 
				tabindex="0"
				role="button"
				aria-label="Log In"
				v-if="forgotPassword"
				@click="forgotPassword = false"
				@keyup.enter="forgotPassword = false"
			>
				Log in
			</span>
        </div>
    </div>
</template>

<script setup>
import validator from 'validator'

const authStore = useAuthStore()

const emit = defineEmits(['authModeSwitch'])

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

const forgotPassword = ref(false)
const passwordVisible = ref(false)

const authMode = ref('Sign In')
const authSwitchLink = ref('Create an Account')

function switchAuthMode(){
	forgotPassword.value = false
	authMode.value == "Sign In" ? authMode.value = 'Sign Up' : authMode.value = "Sign In"
    authMode.value == "Sign In" && (emailInput.value && passwordInput.value) ? invalid.value = false : invalid.value = true
	authSwitchLink.value == "Create an Account" ? authSwitchLink.value = 'Use Existing Account' : authSwitchLink.value = "Create an Account"
	email.value.focus()
    emit('authModeSwitch', authMode.value)
}

watch([emailInput, passwordInput, confirmPasswordInput, passwordStrength, authMode, forgotPassword], ([currentEmail, currentPass, currentCPass, currentPasswordStrength, currentAuthMode, forgotPasswordStatus], [oldEmail, oldPass, oldCPass, oldPasswordStrength, oldAuthMode])=>{
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

	if (currentAuthMode == "Sign Up"){
        if (
			((currentEmail && validator.isEmail(currentEmail)) && 
            (currentPass && validator.isStrongPassword(currentPass)) && 
            (currentCPass == currentPass)) ||
			(currentEmail && validator.isEmail(currentEmail)) && (forgotPasswordStatus == true)
        ){
            invalid.value = false
        }
		else {
			invalid.value = true
		}
    }
    else {
        if ((currentEmail && validator.isEmail(currentEmail)) && (currentPass || forgotPasswordStatus == true)){
            invalid.value = false
        }
		else {
			invalid.value = true
		}
    }

	if (authStore.authMsg){
		if (currentEmail !== oldEmail || currentPass !== oldPass){
			authStore.authMsg = null
		}
	}
})

// firebase

async function submitCredentials(){
    if (invalid.value) return

	if (forgotPassword.value){
		authStore.resetPassword(emailInput.value)
		setTimeout(() => {
			forgotPassword.value = false
			authMode.value = "Sign In"
		}, 1000)
		return
	}

    if (authMode.value == "Sign In"){
        authStore.loginUser(emailInput.value, passwordInput.value)
    }
    else {
        authStore.createUser(emailInput.value, passwordInput.value)
    }
}

onMounted(() => {
	const pwMeter = document.querySelectorAll('meter')[0]	
	pwMeter.ariaLabel = 'Password Strength'
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

.email-input, .pw-input, .cpw-input
	background-color: g.$grey-fill

	&:focus
		outline: 2px solid g.$green-primary

.red-border
	border: 2px solid g.$red-primary
	
	&:focus, &:focus-visible, &:focus-within
		outline: 6px solid g.$red-primary

#error-password
	color: g.$red-primary

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

.pw-icon
	outline: 2px solid transparent

	&:hover, &:focus-visible
		outline-color: g.$green-primary

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

	#error-password
		color: g.$tan-primary

	.auth-wrap
		background-color: g.$green-acc3
		
	.email-input, .pw-input, .cpw-input
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

	.red-border
		border: 2px solid g.$red-primary
		
		&:focus, &:focus-visible, &:focus-within
			outline: 6px solid g.$red-primary

	.pw-icon
		outline: 2px solid transparent

		&:hover, &:focus-visible
			outline-color: g.$green-light

</style>