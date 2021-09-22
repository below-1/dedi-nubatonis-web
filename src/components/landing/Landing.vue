<script setup>
import QuickFooter from '@quick/components/QuickFooter.vue'
import LandingCollage from './LandingCollage.vue'
import LandingLoginPane from './LandingLoginPane.vue'
</script>


<template>
  <div class="h-20 border-b border-gray-200 flex flex-col justify-center items-center">
    <h1 class="font-bold text-gray-800 text-xl">Quick Photography</h1>
    <h2 class="text-gray-600 text-sm">Aplikasi Penentuan Spot Prewedding</h2>
  </div>
  <LandingLoginPane/>
  <LandingCollage/>
  <QuickFooter/>
</template>
