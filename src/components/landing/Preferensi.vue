<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  import {
    MenuIcon
  } from '@heroicons/vue/solid'
  import QuickFooter from '@quick/components/QuickFooter.vue'
  import Hero from './Hero.vue'
  import About from './About.vue'
  import Fotografer from './Fotografer.vue'
  import NewSession from '@quick/components/app/sessions/NewSession2.vue'
  import Lokasi from './Lokasi.vue'

  const showMobileMenu = ref(false)

  const menus = [
    { path: '/#', label: 'home', target: 'hero' },
    { path: '/#', label: 'lokasi', target: 'lokasi' },
    { path: '/#', label: 'fotografer', target: 'fotografer' },
    { path: '/#', label: 'tentang kami', target: 'about' }
  ]

  function onNavLinkClick(target) {
    window.document.querySelector(`#sec-${target}`).scrollIntoView({ 
      behavior: 'smooth' 
    });
  }
</script>

<template>
  <nav class="w-4/5 h-28 flex items-center mx-auto">
    <h1 class="flex-grow font-black text-2xl"><span class="text-pink-600">quick</span> photography</h1>
    <div class="hidden md:flex w-2/5 items-center justify-between">
      <button 
        class="hover:text-pink-400 text-pink-700 font-bold" 
        v-for="menu in menus" 
        :key="menu.label"
        @click="onNavLinkClick(menu.target)"
      >
        {{ menu.label }}
      </button>
    </div>
    <button class="md:hidden p-2" @click="toggleMobileMenu">
      <MenuIcon class="w-6 h-6"/>
    </button>
  </nav>  
  <nav v-if="showMobileMenu" class="flex flex-col text-white md:hidden px-8">
    <button 
      class="hover:text-pink-400 text-pink-700 font-bold text-xl text-left mb-4" 
      v-for="menu in menus" 
      :key="menu.label"
      @click="onNavLinkClick(menu.target)"
    >
      {{ menu.label }}
    </button>
  </nav>
  <NewSession />
  <About />
  <QuickFooter/>
  <div class="py-6 bg-gray-100 text-center">
    <router-link to="/auth/login" class="font-bold text-blue-600">login Admin</router-link>
  </div>
</template>
