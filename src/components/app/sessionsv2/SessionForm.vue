<script setup>
	import {
    ref,
    toRef,
    reactive,
    computed,
    onMounted,
    provide,
    inject,
    watch
  } from 'vue'
  import { api } from '@quick/serv/axios'
  import {
    useSession
  } from '@quick/compose/session';
  import { useGET, usePUT } from '@quick/compose/axios'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'

  const props = defineProps({
    id: String
  })

  const id = toRef(props, 'id')

  const payload = reactive([
    { label: 'jarak', key: 'distance', value: 1 },
    { label: 'transportasi', key: 'transportation', value: 1 },
    { label: 'harga', key: 'price', value: 1 },
    { label: 'tema', key: 'theme', value: 1 },
    { label: 'waktu', key: 'waktu', value: 1 },
    { label: 'jumlah spot', key: 'numberOfSpots', value: 1 }
  ])

  const {
    $session,
    loadSession,
    updateSession,
    onSuccessUpdate,
    onErrorUpdate,
    $updateStatus
  } = useSession({ $id: id, payload })

  onSuccessUpdate(() => {
    alert('sukses mengubah bobot')
  })

  onErrorUpdate(() => {
    alert('gagal mengubah bobot')
  })

  onMounted(loadSession)
</script>

<template>
	<PageHeader
    title="Penentuan Lokasi"
    subtitle="Menentukan Lokasi Berdasarkan Preferensi Anda"
  >
  </PageHeader>
  <PageContainer>
    <h1 class="text-2xl text-gray-500 text-center mb-12">Input Bobot Kriteria  </h1>
    <h1 class="text-xl font-medium text-gray-700 text-center mb-12">Silahkan Masukan Nilai Bobot 1 sampai 100 Secara Random </h1>
    <div class="w-4/5 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <template v-for="item in payload">
          <q-field :label="item.label" class="mb-4">
            <q-input type="number" v-model="item.value" />
          </q-field>
        </template>
      </div>
      <div class="flex justify-center">
        <button 
          @click="updateSession"
          class="btn btn-primary my-12"
        >
          <template v-if="$updateStatus == 'idle'">
            Simpan Bobot
          </template>
          <q-spinner v-else class="w-4 h-4">
          </q-spinner>
        </button>
      </div>
    </div>
  </PageContainer>
</template>