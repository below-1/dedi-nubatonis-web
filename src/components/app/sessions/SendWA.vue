<script setup>
	// Third Party Libraries
	import { computed, onMounted, ref } from 'vue'
	import { useRouter, useRoute } from 'vue-router'

	// Page Header and Container
	import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'

  // NEED TO CHANGE TO BASE APP. DIFFER IN DEV AND PROD
  const BASE_APP_URL = import.meta.env.VITE_BASE_APP_URL

  const props = defineProps({
  	token: String
  })

	const route = useRoute()
	const spouseNumber = ref('6282297726443')

	const loginTokenLink = computed(() => {
		const result = encodeURIComponent(`${BASE_APP_URL}/#/guest/${props.token}/token-input`)
		console.log(`target = ${result}`)
		return result
	})

	const whatsAppURL = computed(() => {
		return ''
	})

	function sendMessage() {
		const url = `https://api.whatsapp.com/send?phone=${spouseNumber.value}&text=${loginTokenLink.value}`
		window.open(url, '_blank')
	}

	onMounted(() => {
		console.log(route)
	})
</script>

<template>
	<PageHeader
    title="Kirim Token"
    subtitle="Kirim Token kepada Pasangan Anda"
  >
  </PageHeader>
  <PageContainer>
  	<div class="px-4 py-">
  		<q-field label="Masukan Nomor Pasangan">
  			<q-input v-model="spouseNumber" />
  		</q-field>
  		<button @click="sendMessage" class="my-6 btn btn-primary">kirim</button>
  	</div>
  </PageContainer>
</template>