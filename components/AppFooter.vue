<template>
    <footer 
        class="w-full flex justify-center font-light text-sm py-2 self-end"
        :class="{'hidden': isHome}"
    >
        <span>© 2024 Reciplease</span>
    </footer>
</template>

<script setup>
const route = useRoute()
const isHome = ref(null)

watch(route, (currentRoute)=>{
    setTimeout(() => {
        if (currentRoute.path == '/') isHome.value = true
        else isHome.value = false  
    }, 300)
})

</script>

<style lang="sass" scoped>
span
    color: g.$grey-divider
    color: #595959

@media (prefers-color-scheme:dark)
    span
        color: g.$green-light
</style>