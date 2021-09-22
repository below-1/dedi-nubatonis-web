<script setup>
  import { HomeIcon } from '@heroicons/vue/solid'
  import QuickFooter from '@quick/components/QuickFooter.vue'
</script>

<style>
  #app-nav {
    background: linear-gradient(to right, #6d28d9, #a65fec);
  }
</style>

<template>
  <div id="app-wrapper" class="flex flex-col min-h-screen">
    <nav id="app-nav" class="h-24 flex items-center px-4 text-white">
      <router-link to="/app">
        <HomeIcon class="mr-4 w-8 h-8"/>
      </router-link>
      <div class="flex-grow">
        <h1 class="text-2xl font-bold" style="line-height: 100%;">quick</h1>
        <h2 class="text-gray-100">Penentuan Spot Prewedding</h2>
      </div>
    </nav>
    <div class="flex-grow">
      <router-view/>
    </div>
    <QuickFooter/>
  </div>
</template>