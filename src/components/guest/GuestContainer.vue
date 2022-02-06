<script setup>
	// Vue
	import {
    ref,
    provide,
    onMounted
  } from 'vue'

  // External Components
  import { MenuIcon } from '@heroicons/vue/solid'

  // Internal Components
  import QuickFooter from '@quick/components/QuickFooter.vue'

  // Keep track of guest user
  const guestUser = ref(null)
  provide('guestUser', guestUser)

	const menus = [
    { path: '/#', label: 'home', target: 'hero' },
    { path: '/#', label: 'lokasi', target: 'lokasi' },
    { path: '/#', label: 'fotografer', target: 'fotografer' },
    { path: '/#', label: 'tentang kami', target: 'about' }
  ]

  const showMobileMenu = ref(false)

  function toggleMobileMenu() {
  	showMobileMenu.value = !showMobileMenu.value
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
      >
        {{ menu.label }}
      </button>
    </div>
    <button class="md:hidden p-2" @click="toggleMobileMenu">
      <MenuIcon class="w-6 h-6 text-black"/>
    </button>
  </nav>  
  <nav v-if="showMobileMenu" class="flex flex-col text-white md:hidden px-8">
    <button 
      class="hover:text-pink-400 text-pink-800 font-bold text-xl text-left mb-4" 
      v-for="menu in menus" 
      :key="menu.label"
      @click="onNavLinkClick(menu.target)"
    >
      {{ menu.label }}
    </button>
  </nav>
  <router-view/>
  <QuickFooter/>
  <div class="py-6 bg-gray-100 text-center">
    <router-link to="/auth/login" class="font-bold text-blue-600">login Admin</router-link>
  </div>
</template>