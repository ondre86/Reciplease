<template>
    <div v-if="session">
        <h1>Thank you for subscribing!</h1>
        <p>Your subscription ID: {{ session.subscription }}</p>
    </div>
</template>

<script setup>
import { loadStripe } from '@stripe/stripe-js'

const authStore = useAuthStore()

if (!authStore.user) await navigateTo('/auth')

const router = useRouter()
const session = ref(null)
const config = useRuntimeConfig()

onMounted(async () => {
    const stripe = await loadStripe(config.public.stripePublishableKey)
    const query = router.currentRoute.value.query

    if (query.session_id) {
        const result = await stripe.retrieveCheckoutSession(query.session_id)
        session.value = result.session
    }
})
</script>
