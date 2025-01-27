<template>
    <div class="grid p-8 px-9 rounded-lg gap-6 border justify-items-start auto-rows-min">
        <h2 class="font-semibold">{{ plan }}</h2>
        <span class="text-3xl max-w-sm block">${{ price }}/month</span>
        <div class="flex flex-col gap-2">
            <span class="text-xl max-w-sm block font-light">{{ subtitle }}</span>
            <span class="text-sm max-w-sm block font-light h-4">{{ extraSubtitle }}</span>
        </div>
        <ClientOnly>
            <Transition name="fade" mode="out-in">
                <ButtonPrimary
                    class="mt-4"
                    :class="{'disabled': disabled}"
                    :aria-disabled=disabled
                    :link="link"
                    :darkEmphasis="darkEmphasis"
                    @click="hasFunction ? subscribe() : null"
                    @keyup.enter="hasFunction ? subscribe() : null"
                    v-if="!loading"
                >
                    {{text}}
                </ButtonPrimary>
                <LoadingAnimation v-else :svg-width="'46px'" class="self-center mt-4"></LoadingAnimation>
            </Transition>
        </ClientOnly>
        <div class="grid gap-4 mt-4 border-t py-4 pt-8 justify-items-start">
            <h3 class="text-2xl font-medium ">Features</h3>
            <ul 
                class="list-disc text-base">
                <li 
                    v-for="(feature, index) in features" :key="feature"
                    class="list-item items-center h-fit mt-2 font-light pl-3"
                >
                    <span class="text-base leading-8">{{ feature }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { annotate } from 'rough-notation'

const config = useRuntimeConfig()
const authStore = useAuthStore()

const props = defineProps({
    plan: String,
    price: Number,
    subtitle: String,
    extraSubtitle: String,
    features: Array,
    darkEmphasis: Boolean,
    disabled: Boolean,
    link: String,
    text: String,
    hasFunction: Boolean,
})

const loading = ref()

async function subscribe(){
    if (!authStore.user) {
        console.error('User not authenticated.')
        return await navigateTo('/auth')
    }

    try {
        loading.value = true
        const { url } = await $fetch("/api/create-checkout-session", {
            method: 'POST',
            body: {
                email: authStore.user.email,
                userId: authStore.user.uid,
                priceId: config.public.stripePriceId,
            },
        })

        await navigateTo(url, { external: true })
    } catch (error) {
        console.error('Error initiating checkout:', error)
    }
}

onMounted(()=>{
    const features = document.querySelectorAll('.annotate')
    const spanAnn = []
    features.forEach((elem)=>{
        spanAnn.push(annotate(elem, { type: 'underline', color: '#687441' }))
    })
})
</script>

<style lang="sass" scoped>
ul
    list-style-type: url(/svg/fork-knife.svg)
li
    &::marker
        content: url(/svg/fork-knife.svg)

@media (prefers-color-scheme:dark)
    .pricing-plan
        background-color: g.$green-acc1  
        border-color: g.$green-acc1  

    #unlimited
        background-color: g.$green-acc3
</style>