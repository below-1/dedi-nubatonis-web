<script setup>
  import {
    reactive
  } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMutation } from '@vue/apollo-composable'
  import { create as GQL_create } from '@quick/gql/lokasi'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'

  const router = useRouter()

  const payload = reactive({
    nama: '',
    harga: 0,
    latitude: '',
    longitude: '',
    spots: 0,
    waktu: 0
  })

  const { 
    mutate, 
    loading, 
    error,
    onDone,
    onError
  } = useMutation(GQL_create, {
    fetchPolicy: 'network-only'
  })

  onDone(() => {
    alert('sukses menambah data lokasi')
    router.back()
  })

  onError(err => {
    console.log(err)
    alert('gagal menambah data lokasi')
  })

  function createLokasi() {
    mutate({
      payload
    })
  }
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
    <div class="w-2/5 mx-auto">
      <form class="form-control p-6 bg-white">
        <q-field label="Nama" class="mb-4">
          <q-input v-model="payload.nama" />
        </q-field>
        <q-field label="Harga" class="mb-4">
          <q-input type="number" v-model="payload.harga" />
        </q-field>
        <q-field label="Latitude" class="mb-4">
          <q-input v-model="payload.latitude" />
        </q-field>
        <q-field label="Longitude" class="mb-4">
          <q-input v-model="payload.longitude" />
        </q-field>
        <q-field label="Jumlah Spot" class="mb-4">
          <q-input type="number" v-model="payload.spots" />
        </q-field>
        <q-field label="Waktu Sewa" class="mb-4">
          <q-input type="number" v-model="payload.waktu" />
        </q-field>
      </form>
    </div>
  </PageContainer>
</template>
