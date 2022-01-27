<script setup>
	import {
    ref,
    onMounted
  } from 'vue'
  import { useGET } from '@quick/compose/axios'

  const {
    get: getPhotographers,
    result: photographersResult
  } = useGET({
    url: '/v1/api/photographers'
  })

  onMounted(getPhotographers)
</script>

<template>	
	<section id="sec-fotografer" class="py-12 md:py-12 flex flex-col items-center justify-center">
    <h2 class="text-xl text-yellow-400 tracking-widest uppercase text-center">Daftar Photographer</h2>
    <h3 class="font-bold text-3xl text-center">Daftar Fotografer Pada Quick Photography</h3>
    <div 
      v-if="photographersResult.type == 'data'"
      class="grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-2 md:container md:mx-auto w-full my-6"
    >
      <div
        v-for="item in photographersResult.data"
        :key="item._id"
        :style="`background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${item.avatar}'); background-position: center; background-size: cover;`"
        class="h-60 flex items-center justify-center"
      >
        <h1 class="text-white font-black text-xl">{{ item.nama }}</h1>
      </div>
    </div>
  </section>
</template>