<script setup>
  import { HomeIcon } from '@heroicons/vue/solid'
  import QuickFooter from '@quick/components/QuickFooter.vue'
  import Navigation from './Navigation.vue'
</script>

<style>
  #app-nav {
    background: linear-gradient(to right, #6d28d9, #a65fec);
  }
</style>

<template>
  <nav class="w-64 fixed top-0 bottom-0 left-0 bg-gray-800">
    <router-link 
      to="/app"
      class="block h-20 px-4 font-bold text-xl bg-indigo-900 flex items-center text-gray-100"
    >
      Quick Photography
    </router-link>
    <Navigation/>
  </nav>
  <div id="app-wrapper" class="flex flex-col min-h-screen ml-64">
    <div class="flex-grow flex flex-col">
      <router-view/>
    </div>
    <QuickFooter/>
  </div>
</template>