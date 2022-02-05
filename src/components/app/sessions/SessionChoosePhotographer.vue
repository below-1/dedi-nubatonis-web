<script setup>
	import { computed, onMounted, reactive } from 'vue'
	import { useGET, usePUT } from '@quick/compose/axios'
	import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'

  const props = defineProps({
  	id: String
  })
  const updateURL = computed(() => `/v1/api/sessions/${props.id}/photographer`);

  const { result, get } = useGET({
    url: '/v1/api/photographers'
  })

  const payload = reactive({
  	photographer: null
  })
  const {
  	status: updatePhotographerStatus,
  	put: updatePhotographer,
  	onSuccess: onSuccessUpdatePhotographer
  } = usePUT({
  	url: updateURL,
  	payload
  })

  onSuccessUpdatePhotographer(data => {
  	alert('sukses mengubah data sesi');
  })

  const photographers = computed(() => result.value.type == 'data' ? result.value.data : null)
  const options = computed(() => {
  	if (!photographers.value) return [];
  	return photographers.value.map(it => ({
  		value: it._id,
  		text: it.nama
  	}))
  })

  onMounted(get)
</script>

<template>
	<PageHeader
    title="Pilih Fotografer"
    subtitle="Pilih Fotografer untuk Sesi"
  >
  </PageHeader>
  <PageContainer>
		<div class="p-4">
  		<q-field label="Pilih Fotografer" class="mb-4">
	  		<q-select
	  			v-model="payload.photographer"
	  			:options="options"
	  		></q-select>
  		</q-field>
  		<button 
  			@click="updatePhotographer"
  			class="btn btn-primary"
  		>Simpan</button>
		</div>
  </PageContainer>
</template>