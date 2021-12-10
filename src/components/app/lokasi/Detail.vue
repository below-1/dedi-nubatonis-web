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
    transportation: 'car',
    waktu: 4,
    theme: 'indoor',
    avatar: ''
  })

  const transportationOptions = [
    { value: 'bike', text: 'Motor' },
    { value: 'car', text: 'Mobil Pribadi' },
    { value: 'rental-car', text: 'Rental Mobil' }
  ]
  const transportationFormat = computed(() => {
    return transportationOptions.find(it => it.value == payload.transportation).text;
  });

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
    <div class="w-full md:w-2/5">
      <ul>
        <li class="py-4 px-2 flex justify-between items-center border-b border-grey-200">
          <span>Nama</span>
          <span class="font-bold">{{ payload.nama }}</span>
        </li>
        <li class="py-4 px-2 flex justify-between items-center border-b border-grey-200">
          <span>Transportasi</span>
          <span class="font-bold">{{ transportationFormat }}</span>
        </li>
        <li class="py-4 px-2 flex justify-between items-center border-b border-grey-200">
          <span>Jarak</span>
          <span class="font-bold">{{ payload.distance }} km</span>
        </li>
        <li class="py-4 px-2 flex justify-between items-center border-b border-grey-200">
          <span>Harga</span>
          <span class="font-bold">IDR {{ payload.price }}</span>
        </li>
        <li class="py-4 px-2 flex justify-between items-center border-b border-grey-200">
          <span>Lokasi</span>
          <span class="text-xs font-bold">{{ payload.latitude }}, {{ payload.longitude }}</span>
        </li>
        <li class="py-4 px-2 flex justify-between items-center border-b border-grey-200">
          <span>Jumlah Spot</span>
          <span class="font-bold">{{ payload.numberOfSpots }}</span>
        </li>
        <li class="py-4 px-2 flex justify-between items-center border-b border-grey-200">
          <span>Waktu</span>
          <span class="font-bold">{{ payload.waktu }}</span>
        </li>
        <li class="py-4 px-2 flex justify-between items-center border-b border-grey-200">
          <span>Tema</span>
          <span class="font-bold capitalize">{{ payload.theme }}</span>
        </li>
      </ul>
    </div>
  </PageContainer>
</template>
