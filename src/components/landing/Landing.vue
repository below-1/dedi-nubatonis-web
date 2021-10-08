<script setup>
  import QuickFooter from '@quick/components/QuickFooter.vue'
  import LandingCollage from './LandingCollage.vue'
  import LandingLoginPane from './LandingLoginPane.vue'
  import CakeSvg from '@quick/assets/cake.svg'
  import CameraSvg from '@quick/assets/camera.svg'
  import CoupleSvg from '@quick/assets/couple.svg'
  import InlineSvg from 'vue-inline-svg'

  const menus = [
    { path: '/#', label: 'home' },
    { path: '/#', label: 'fotografer' },
    { path: '/#', label: 'lokasi' },
    { path: '/#', label: 'tentang kami' },
    { path: '/#', label: 'tentang kami' },
    { path: '/#', label: 'produk' }
  ]
</script>

<style scoped>
  #hero {
    background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/landing.jpg);
    background-size: cover;
    background-position: 0% 100%;
    height: 100vh;
  }

  #hero > nav {
    /*background: rgba(0, 0, 0, 0.1);*/
  }
</style>

<template>
  <section id="hero" class="w-screen flex flex-col text-white">
    <nav class="w-4/5 h-20 flex items-center mx-auto">
      <h1 class="flex-grow font-black text-2xl">quick photography</h1>
      <div class="w-3/5 flex items-center justify-between">
        <button class="hover:text-pink-400" v-for="menu in menus" :key="menu.label">
          {{ menu.label }}
        </button>
      </div>
    </nav>  
    <div class="flex-grow flex flex-col items-center justify-center">
      <h2 class="text-4xl font-thin">Applikasi SPK Penentuan Lokasi Prewedding</h2>
      <h1 class="font-mono text-6xl font-black">Quick Photography</h1>
      <button class="btn">tentukan lokasi anda</button>
    </div>
  </section>
  <section class="w-screen h-64">
  </section>
  <!-- <div class="gradient bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 text-white flex flex-col">
    <div class="h-24 container mx-auto flex items-center">
      <div class="flex items-center">
        <router-link to="/">
           <InlineSvg
            :src="CameraSvg"
            class="w-8 h-8 mr-2"
          />
        </router-link>
        <h1 class="font-black text-lg lowercase">Quick Photography</h1>
      </div>
      <div class="flex-grow"></div>
      <div>
      </div>
    </div>

    <div class="flex-grow container mx-auto flex items-center">
      <div class="md:w-1/2 text-white">
        <h1 class="text-6xl font-bold mb-2 lowercase">Quick Photography</h1>
        <h2 class="text-3xl mb-2">SPK Penentuan Lokasi Foto Prewedding</h2>
        <h3 class="text-sm">If you want to create fantastic and unique visual experiences on the web, you will eventually need two elements to overlap or exist in the same place. Free Download Wedding Cake 29 SVG vector file in monocolor and multicolor type for Sketch or Illustrator from Wedding Cake 29 Vectors svg vector collection.</h3>
      </div>
      <div class="md:w-1/2 flex items-center justify-center">
        <InlineSvg
          :src="CakeSvg"
          class="w-64 h-64 mr-2"
        />
      </div>
    </div>

    <QuickFooter/>
  </div> -->
</template>
