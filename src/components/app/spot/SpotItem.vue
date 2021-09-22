<script setup>
  const props = defineProps({
    id: String,
    name: String,
    jarak: Number,
    spots: Number
  })
  const url = `https://source.unsplash.com/random`
</script>

<template>
  <router-link 
    :to="`/app/spots/${id}`"
    class="flex items-center px-4 py-4 border-b border-gray-200"
  >
    <img :src="url" class="h-12 w-12 mr-2" />
    <div>
      <h4 class="font-medium">{{ name }}</h4>
      <h5 class="text-sm">Jarak {{ jarak }} km, {{ spots }} jumlah spot</h5>
    </div>
  </router-link>
</template>
