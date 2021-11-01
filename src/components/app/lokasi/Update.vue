<script setup>
  import {
    reactive,
    computed,
    onMounted
  } from 'vue'
  import { useRouter } from 'vue-router'
  import { useGET, usePUT } from '@quick/compose/axios'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'

  const router = useRouter()
  const props = defineProps({
    id: String
  })

  const payload = reactive({
    nama: '',
    price: 0,
    latitude: '',
    longitude: '',
    spots: 0,
    waktu: 0
  })

  const url = computed(() => `/v1/api/locations/${props.id}`)

  const {
    get: getInitialData,
    result: initialData,
    onSuccess: onSuccessInitialData
  } = useGET({ url })

  onSuccessInitialData((data) => {
    const _initialData = {
      ...data,
      price: parseInt(data.price.$numberDecimal)
    }
    Object.assign(payload, _initialData)
  })

  const {
    put: updateLocation,
    result,
    onSuccess: onSuccessUpdate
  } = usePUT({ 
    url,
    payload,
    transformPayload: p => ({
      ...p,
      price: `${p.price}`
    })
  })

  onSuccessUpdate(() => {
    router.push('/app/lokasi')
  })

  onMounted(getInitialData)
</script>

<template>
  <PageHeader
    title="Lokasi"
    subtitle="Tambah Lokasi"
  >
    <template #actions>
      <button
        :disabled="initialData.type != 'data'"
        @click="updateLocation"
        class="btn btn-primary"
      >Simpan</button>
    </template>
  </PageHeader>
  <PageContainer>
    <div class="w-2/5 mx-auto">
      <form class="form-control p-6 bg-white">
        <q-field label="Nama" class="mb-4">
          <q-input v-model="payload.nama" />
        </q-field>
        <q-field label="Price" class="mb-4">
          <q-input type="number" v-model="payload.price" />
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
