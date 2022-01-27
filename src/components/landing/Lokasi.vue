<script setup>
	import {
    ref,
    onMounted
  } from 'vue'
  import { useGET } from '@quick/compose/axios'

  const {
    get: getLocation,
    result: locationsResult
  } = useGET({
    url: '/v1/api/locations'
  })

  onMounted(getLocation)
</script>

<template>
	<section id="sec-lokasi" class="bg-gray-100 py-12 md:py-12 flex flex-col items-center justify-center">
    <h2 class="text-xl text-yellow-400 tracking-widest uppercase text-center">Lokasi Foto</h2>
    <h3 class="font-bold text-3xl text-center">Daftar Lokasi Foto Prewedding</h3>
    <div 
      v-if="locationsResult.type == 'data'"
      class="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-2 md:container md:mx-auto my-6 w-full"
    >
      <div
        v-for="item in locationsResult.data"
        :key="item._id"
        :style="`background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${item.avatar}'); background-position: center; background-size: cover;`"
        class="h-60 flex items-center justify-center"
      >
        <h1 class="text-white font-black text-xl">{{ item.nama }}</h1>
      </div>
    </div>
  </section>
</template>