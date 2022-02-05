<script setup>
	// Vue
	import { reactive } from 'vue'

	// Third party libraries
	import { useRouter } from 'vue-router'

	// Internal composables
	import { usePOST } from '@quick/compose/axios'
	import useCurrentUser from '@quick/compose/current-user';

	// Internal Components
	import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'

	const payload = reactive({
		date: null
	})

	const router = useRouter()

	const {
		loadUser
	} = useCurrentUser()

	const {
		post: createSession,
		status: createStatus,
		onSuccess: onSuccessCreate
	} = usePOST({
		url: '/v1/api/sessions',
		payload
	})

	onSuccessCreate(async (data) => {
		const { _id } = data
		const nextURL = `/app/sessionV3/${_id}`
		await loadUser()
		router.replace(nextURL)
	})
</script>

<template>
	<PageHeader
    title="Sesi Baru"
    subtitle="Tentukan Tanggal"
  >
  </PageHeader>
  <PageContainer>
  	<div class="m-2">
  		<p class="px-4 py-2 mb-6 bg-gray-200 rounded">Masukan Tanggal Photoshot</p>
  		<q-field label="Tanggal Photoshoot">
  			<q-input type="date" v-model="payload.date" required />
  		</q-field>
  		<button 
  			@click="createSession" 
  			class="btn btn-primary my-4"
  		>
  			simpan
  		</button>
  	</div>
  </PageContainer>
</template>