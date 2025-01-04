<template>
    <div class="my-12 md:my-24">
        <div class="text-center flex flex-col gap-4">
            <h2 class="text-4xl font-bold">We All Know the Struggle...</h2>
            <p class="font-light">
                We listened to real people voice their opinions on their pain points with cooking and grocery shopping.<br>
            </p>
        </div>
        <div class="flex flex-col gap-8 mt-12">
            <Testimonial 
                :img="'/placeholder.png'" 
                :name="'Daisha C.'" 
                :text="'I like to cook for my friends and family...and Instagram! Cooking new recipes is always fun, but sometimes I get stagnant. I wish I could just get quick suggestions to spice up my recipe repertoire.'">
            </Testimonial>
            <Testimonial 
                :img="'/placeholder.png'"
                :name="'Aaron F.'" 
                :text="`Cooking is something that I have to do. I'd rather just get it over with as quickly and as painlessly as possible. I really dislike going shopping and not knowing what I need.`">
            </Testimonial>
            <Testimonial 
                :img="'/placeholder.png'"
                :name="'Trisha G.'" 
                :text="`My kids come first, and I've got to feed them food that they'll like. I want to let them try interesting foods without breaking the bank and being surprised when I go grocery shopping.`">
            </Testimonial>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="sass" scoped>

</style>