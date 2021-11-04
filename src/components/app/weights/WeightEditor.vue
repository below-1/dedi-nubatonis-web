<script setup>
  import {
    onMounted,
    reactive,
    computed
  } from 'vue'
  import { useGET, usePUT } from '@quick/compose/axios'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'

  const url = '/v1/api/settings/weights'
  const { get: getInitialData } = useGET({ url })

  const payload = reactive({
    distance: 1,
    numberOfSpots: 1,
    price: 1,
    transportation: 1,
    theme: 1,
    time: 1
  })

  const {
    status,
    put
  } = usePUT({ url, payload })

  async function loadInitialData() {
    try {
      const data = await getInitialData()
      if (!data) {
        console.log('data not found')
        return
      }
      Object.assign(payload, data)
    } catch (err) {
      console.log(err)
    }
  }

  const loading = computed(() => status.value == 'loading')
  async function onSubmit() {
    try {
      await put(payload)
    } catch (err) {
      console.log(err)
      alert('gagal mengubah bobot perangkingan')
    } finally {
      await loadInitialData()
    }
  }

  onMounted(loadInitialData)
</script>

<template>
  <q-action-bar
    title="Bobot"
    subtitle="Bobot yang digunakan pada perangkingan"
  >
  </q-action-bar>
  <PageContainer>
    <div class="w-1/3 mx-auto my-2 bg-white border border-gray-200 rounded p-4">
      <q-field label="Jarak" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.distance"></q-input>
      </q-field>
      <q-field label="Jumlah Spot" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.numberOfSpots"></q-input>
      </q-field>
      <q-field label="Biaya" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.price"></q-input>
      </q-field>
      <q-field label="Transportasi" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.transportation"></q-input>
      </q-field>
      <q-field label="Tema" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.theme"></q-input>
      </q-field>
      <q-field label="Waktu" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.time"></q-input>
      </q-field>
      <q-form-btn 
        @click="onSubmit" 
        :loading="loading" 
        label="Submit" 
      />
    </div>
  </PageContainer>
</template>