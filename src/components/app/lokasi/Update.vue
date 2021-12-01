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
  import imgToBase64 from '@quick/serv/imgToBase64'

  const router = useRouter()
  const props = defineProps({
    id: String
  })

  const payload = reactive({
    nama: '',
    price: 0,
    latitude: '',
    longitude: '',
    numberOfSpots: 0,
    waktu: 4,
    theme: 'indoor',
    avatar: ''
  })

  const transportationOptions = [
    { value: 'bike', text: 'Motor' },
    { value: 'car', text: 'Mobil Pribadi' },
    { value: 'rental-car', text: 'Rental Mobil' }
  ]

  const waktuOptions = [
    { value: 4, text: '06:00 AM - 06:00 PM' },
    { value: 2, text: '12:00 PM - 06:00 PM' }
  ]

  async function avatarChangeHandler(event) {
    let files = event.target.files || event.dataTransfer.files;
    if (!files.length) {
      return;
    }
    const base64 = await imgToBase64( files[0] )
    payload.avatar = base64
  }

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
        <q-field label="Transportasi" class="mb-4">
          <q-select
            v-model="payload.transportation"
            :options="transportationOptions"
          />
        </q-field>
        <q-field label="Jarak" class="mb-4">
          <q-input type="number" v-model="payload.distance" />
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
          <q-input type="number" v-model="payload.numberOfSpots" />
        </q-field>
        <q-field label="Waktu" class="mb-4">
          <q-select
            v-model="payload.waktu"
            :options="waktuOptions"
          />
        </q-field>
        <q-field label="Transportasi" class="mb-4">
          <q-select
            v-model="payload.transportation"
            :options="transportationOptions"
          />
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
        <q-field label="Avatar" class="mb-4">
          <file-input @change="avatarChangeHandler" />
        </q-field>
      </form>
    </div>
  </PageContainer>
</template>
