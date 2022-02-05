<script setup>
	import WhatsAppSVG from '@quick/assets/whatsapp-svgrepo-com.svg'

	const props = defineProps({
		session: Object
	})
</script>

<template>
	<div class="py-6 bg-gray-200 rounded mb-12 text-center flex flex-col items-center justify-center">
    <h2 class="text-lg mx-4">Kirimkan Token dibawah kepada pasangan anda</h2>
    <h1 class="text-3xl font-bold">{{ session.token }}</h1>
    <router-link :to="`/app/session-send-wa/${session.token}`" class="my-4 bg-white p-2 rounded flex items-center shadow-lg">
      <span class="mr-2 font-bold">Kirim Melalui WhatsApp</span>
      <inline-svg
        :src="WhatsAppSVG"
        class="w-8 h-8"
      ></inline-svg>
    </router-link>
  </div>
</template>