<template>
    <div class="flex flex-col items-center mt-6 py-12 px-6 save">
        <div class="text-center flex flex-col gap-6">
            <h2 id="home-title-3" class="text-4xl font-bold w-fit">Reciplease Saves the Day!</h2>
            <p class="font-light">
                Get into the groove with Reciplease's easy-to-use features.<br>
            </p>
        </div>
        <div class="max-w-screen-lg w-full mt-12">
            <div class="flex flex-col justify-start items-center gap-8 w-full lg:flex-row">
                <div class="flex flex-col gap-4 w-full lg:w-1/2">
                    <div class="flex flex-col items-center justify-center rounded-xl md:flex-row video-wrap">
                        <video class="rounded-2xl" ref="video" autoplay muted playsinline :src="videoSRC"></video>
                    </div>
                </div>
                <div class="flex flex-col justify-center gap-6 lg:w-1/2 lg:pl-8">
                    <div
                        @click="switchVideo($event)"
                        @keyup.enter="switchVideo($event)"
                        ref="RecipeDemo"
                        class="border-b p-4 cursor-pointer transition-all duration-200 flex flex-col gap-4 pic-change toggled"
                        tabindex="0"
                    >
                        <h3 class="text-2xl font-semibold">Easy Recipe Planning</h3>
                        <p>Find new recipes and get all the details in seconds. Then, you can save recipes to plan out your meals for the week or month!</p>
                    </div>
                    <div
                        @click="switchVideo($event)"
                        @keyup.enter="switchVideo($event)"
                        ref="IngredientDemo"
                        class="border-b p-4 cursor-pointer transition-all duration-200 flex flex-col gap-4 pic-change"
                        tabindex="0"
                    >
                        <h3 class="text-2xl font-semibold">Smarter Grocery Planning</h3>
                        <p>Compile your shopping list and get accurate pricing estimates for every item. Cross items off as you use it, or, take it to whatever app you like.</p>
                    </div>
                    <div
                        @click="switchVideo($event)"
                        @keyup.enter="switchVideo($event)"
                        ref="ProfileDemo"
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
import { annotate } from 'rough-notation'
const { $gsap } = useNuxtApp()
const { x, y } = useWindowScroll({behavior: 'smooth'})
const { width, height } = useWindowSize()


const videoSRC = ref('/video/Recipe-Demo.mp4')
const video = ref()
const RecipeDemo = ref()
const IngredientDemo = ref()
const ProfileDemo = ref()

function switchVideo(event) {
    let videoTL = $gsap.timeline()
    if (event.target == RecipeDemo.value || event.target.parentElement == RecipeDemo.value){
        videoTL.to(video.value, {
            opacity: 0,
            duration: .4
        })
        videoTL.call(()=>{
            videoSRC.value = '/video/Recipe-Demo.mp4'
            console.log(video.value)
            video.value.ariaDescription = RecipeDemo.value.innerText.replace('\n', '. ')
            video.value.ariaDescription = RecipeDemo.value.innerText.replace('\n', '')
            RecipeDemo.value.blur()
            IngredientDemo.value.blur()
            ProfileDemo.value.blur()
            RecipeDemo.value.classList.add('toggled')
            IngredientDemo.value.classList.remove('toggled')
            ProfileDemo.value.classList.remove('toggled')
            if (width.value < 1024){
                y.value = video.value.offsetTop - 100
            }
        })
        videoTL.to(video.value, {
            opacity: 1,
            duration: .4
        })
    }
    if (event.target == IngredientDemo.value || event.target.parentElement == IngredientDemo.value){
        videoTL.to(video.value, {
            opacity: 0,
            duration: .4
        })
        videoTL.call(()=>{
            videoSRC.value = '/video/Ingredient-Demo.mp4'
            video.value.ariaDescription = IngredientDemo.value.innerText.replace('\n', '. ')
            video.value.ariaDescription = IngredientDemo.value.innerText.replace('\n', '')
            RecipeDemo.value.blur()
            IngredientDemo.value.blur()
            ProfileDemo.value.blur()
            IngredientDemo.value.classList.add('toggled')
            RecipeDemo.value.classList.remove('toggled')
            ProfileDemo.value.classList.remove('toggled')
            if (width.value < 1024){
                y.value = video.value.offsetTop - 100
            }
        })
        videoTL.to(video.value, {
            opacity: 1,
            duration: .4
        })
    }
    if (event.target == ProfileDemo.value || event.target.parentElement == ProfileDemo.value){
        videoTL.to(video.value, {
            opacity: 0,
            duration: .4
        })
        videoTL.call(()=>{
            videoSRC.value = '/video/Profile-Demo.mp4'
            video.value.ariaDescription = ProfileDemo.value.innerText.replace('\n', '. ')
            video.value.ariaDescription = ProfileDemo.value.innerText.replace('\n', '')
            RecipeDemo.value.blur()
            IngredientDemo.value.blur()
            ProfileDemo.value.blur()
            ProfileDemo.value.classList.add('toggled')
            IngredientDemo.value.classList.remove('toggled')
            RecipeDemo.value.classList.remove('toggled')
            if (width.value < 1024){
                y.value = video.value.offsetTop - 100
            }
        })
        videoTL.to(video.value, {
            opacity: 1,
            duration: .4
        })
    }
}

watch(videoSRC, (cur)=>{
    if (cur == '/video/Recipe-Demo.mp4'){
        RecipeDemo.value.blur()
        IngredientDemo.value.blur()
        ProfileDemo.value.blur()
        RecipeDemo.value.classList.add('toggled')
        IngredientDemo.value.classList.remove('toggled')
        ProfileDemo.value.classList.remove('toggled')
    }
    if (cur == '/video/Ingredient-Demo.mp4'){
        RecipeDemo.value.blur()
        IngredientDemo.value.blur()
        ProfileDemo.value.blur()
        IngredientDemo.value.classList.add('toggled')
        RecipeDemo.value.classList.remove('toggled')
        ProfileDemo.value.classList.remove('toggled')
    }
    if (cur == '/video/Profile-Demo.mp4'){
        videoSRC.value = '/video/Profile-Demo.mp4'
        RecipeDemo.value.blur()
        IngredientDemo.value.blur()
        ProfileDemo.value.blur()
        ProfileDemo.value.classList.add('toggled')
        IngredientDemo.value.classList.remove('toggled')
        RecipeDemo.value.classList.remove('toggled')
    }
})

onMounted(()=>{
    video.value.addEventListener('ended', (e)=>{
        switch (videoSRC.value) {
            case '/video/Recipe-Demo.mp4':
                videoSRC.value = '/video/Ingredient-Demo.mp4'
                break;

            case '/video/Ingredient-Demo.mp4':
                videoSRC.value = '/video/Profile-Demo.mp4'
                break;

            case '/video/Profile-Demo.mp4':
                videoSRC.value = '/video/Recipe-Demo.mp4'
                break;
        }
    })

    const save = $gsap.timeline()

    save.from(video.value, {
        filter: 'blur(10px)',
        opacity: .5,
        scrollTrigger: {
            trigger: video.value,
            start: "top bottom-=15%",
            end: "+=40%",
            scrub: true,
            immediateRender: false
        }
    })

    const title3 = document.querySelectorAll('#home-title-3')[0]
    const titleAnnotation3 = annotate(title3, { 
        type: 'underline',
        color: '#687441'
    })

    save.to(title3, {
        scrollTrigger: {
            trigger: title3,
            start: 'bottom bottom-=20%',
            immediateRender: false,
            onEnter: ()=>{
                titleAnnotation3.show()
            }
        }
    })
})
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

.toggled
    background-color: #abc46f46
    outline: 2px solid g.$green-primary

.video-wrap
    background-color: g.$grey-divider

video
    height: 500px
    object-fit: contain
    object-position: 0px 0px

@media (prefers-color-scheme:dark) 
    .save
        background-color: g.$green-acc3

    .video-wrap
        background-color: g.$green-acc2
</style>