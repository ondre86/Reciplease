// Generated by @hypernym/nuxt-gsap
import { defineNuxtPlugin } from '#app';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
const plugin = defineNuxtPlugin(() => {
  if(process.client) {
  gsap.registerPlugin(ScrollTrigger,TextPlugin);
  
  
}
  return {
    provide: {
      gsap,
      ScrollTrigger,
TextPlugin
    }
  }
})
export default plugin;