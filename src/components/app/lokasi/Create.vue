<script setup>
  import {
    reactive
  } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMutation } from '@vue/apollo-composable'
  import { create as GQL_create } from '@quick/gql/lokasi'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import { usePOST } from '@quick/compose/axios'

  const router = useRouter()

  const payload = reactive({
    nama: '',
    price: 0,
    latitude: '',
    longitude: '',
    numberOfSpots: 0,
    time: 0,
    theme: 'indoor'
  })

  const {
    post: createLokasi,
    status,
    onSuccess
  } = usePOST({
    url: '/v1/api/locations',
    payload
  })

  onSuccess(() => {
    alert('sukses menambah data lokasi')
    router.back()
  })
</script>

<template>
  <PageHeader
    title="Lokasi"
    subtitle="Tambah Lokasi"
  >
    <template #actions>
      <button
        @click="createLokasi"
        class="btn btn-primary"
      >simpan data</button>
    </template>
  </PageHeader>
  <PageContainer>
    <div class="w-2/5 mx-auto p-4 border border-gray-300 rounded">
      <form class="form-control p-6 bg-white">
        <q-field label="Nama" class="mb-4">
          <q-input v-model="payload.nama" />
        </q-field>
        <q-field label="Harga" class="mb-4">
          <q-input type="number" v-model="payload.price" />
        </q-field>
        <q-field label="Latitude" class="mb-4">
          <q-input v-model="payload.latitude" />
        </q-field>
        <q-field label="Longitude" class="mb-4">
          <q-input v-model="payload.longitude" />
        </q-field>
        <q-field label="Jumlah Spot" class="mb-4">
          <q-input type="number" v-model="payload.numberOfSpots" />
        </q-field>
        <q-field label="Waktu Sewa" class="mb-4">
          <q-input type="number" v-model="payload.waktu" />
        </q-field>

        <q-field label="Tema" class="mb-4">
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Indoor</span> 
              <input type="radio" v-model="payload.theme" class="radio radio-primary" value="indoor">
            </label>
          </div> 
          <div class="form-control">
            <label class="cursor-pointer label">
              <span class="label-text">Outdoor</span> 
              <input type="radio" v-model="payload.theme" class="radio radio-primary" value="outdoor">
            </label>
          </div> 
        </q-field>

      </form>
    </div>
  </PageContainer>
</template>
