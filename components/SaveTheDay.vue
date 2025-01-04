<template>
    <div class="flex flex-col items-center mt-6 py-12 px-6 save">
        <div class="text-center flex flex-col gap-4">
            <h2 class="text-4xl font-bold">Reciplease Saves the Day!</h2>
            <p class="font-light">
                Get into the groove with Reciplease's easy-to-use features.<br>
            </p>
        </div>
        <div class="max-w-screen-lg w-full mt-12">
            <div class="flex flex-col justify-center items-center gap-8 w-full md:flex-row">
                <div class="flex flex-col gap-4 md:w-1/2">
                    <div class="flex flex-col rounded-2xl overflow-hidden md:flex-row ">
                        <img src="/public/img/IMG_5210.webp" alt="" class="w-full">
                    </div>
                </div>
                <div class="flex flex-col justify-center gap-6 md:w-1/2 md:pl-8">
                    <div
                        @click=""
                        @keyup.enter=""
                        class="border-b p-4 cursor-pointer transition-all duration-200 flex flex-col gap-4 pic-change"
                        tabindex="0"
                    >
                        <h3 class="text-2xl font-semibold">Easy Recipe Planning</h3>
                        <p>Find new recipes and get all the details in seconds. Then, you can save recipes to plan out your meals for the week or month!</p>
                    </div>
                    <div
                        @click=""
                        @keyup.enter=""
                        class="border-b p-4 cursor-pointer transition-all duration-200 flex flex-col gap-4 pic-change"
                        tabindex="0"
                    >
                        <h3 class="text-2xl font-semibold">Smarter Grocery Planning</h3>
                        <p>Compile your shopping list and get accurate pricing estimates for every item. Cross items off as you use it, or, take it to whatever app you like.</p>
                    </div>
                    <div
                        @click=""
                        @keyup.enter=""
                        class="border-b p-4 cursor-pointer transition-all duration-200 flex flex-col gap-4 pic-change"
                        tabindex="0"
                    >
                        <h3 class="text-2xl font-semibold">Everything Stays Organized</h3>
                        <p>Save recipes to your profile for easy access. See all your activity and previous shopping lists you've generated.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="sass" scoped>
.save
    width: 100vw
    background-color: #fafafa

img
    width: 100%
    max-height: 600px
    object-fit: cover

.pic-change
    outline: 2px solid transparent
    border-radius: 1.25rem

    &:hover, &:focus
        background-color: #abc46f46
        outline: 2px solid g.$green-primary

@media (prefers-color-scheme:dark) 
    .save
        background-color: g.$green-acc3
</style>