<script setup>
	// Vue
	import { ref } from 'vue'

	const showMobileMenu = ref(false)

	const menus = [
    { path: '/#', label: 'home', target: 'hero' },
    { path: '/#', label: 'lokasi', target: 'lokasi' },
    { path: '/#', label: 'fotografer', target: 'fotografer' },
    { path: '/#', label: 'tentang kami', target: 'about' }
  ]

  function toggleMobileMenu() {
  	showMobileMenu.value = !showMobileMenu.value
  }

  function onNavLinkClick(target) {
    window.document.querySelector(`#sec-${target}`).scrollIntoView({ 
      behavior: 'smooth' 
    });
  }
</script>

<template>
	<nav class="w-4/5 h-28 flex items-center mx-auto">
    <h1 class="flex-grow font-black text-2xl"><span class="text-pink-600">quick</span> photography</h1>
  </nav>
</template>