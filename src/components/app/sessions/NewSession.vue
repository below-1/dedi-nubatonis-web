<script setup>
  import {
    ref,
    reactive,
    computed,
    onMounted,
    provide,
    watch
  } from 'vue'
  import { useGET } from '@quick/compose/axios'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import PersonalForm from './PersonalForm.vue'
  import LocationForm from './LocationForm.vue'
  import Bobot from './Bobot.vue'

  const position = ref([0, 0])
  const initDone = ref(false)
  const itemIndex = ref(0)
  const formItems = reactive([])
  const {
    get,
    result,
    onSuccess
  } = useGET({
    url: '/v1/api/locations'
  })
  const activeItem = computed(() => formItems[itemIndex.value])

  provide('position', position)

  onMounted(async () => {
    await get()
    navigator.geolocation.getCurrentPosition(
      (geoPos) => {
        position.value = [ geoPos.coords.latitude, geoPos.coords.longitude ]
      }, 
      (geoPosError) => {
        alert('gagal mengambil data lokasi')
      })
  })

  onSuccess((data) => {
    formItems.push({ payload: { selected: ['distance', 'price', 'theme'] }, type: 'criteria' })
    formItems.push({ payload: { name: '', gender: 'man' }, type: 'personal' })
    data.forEach(item => {
      formItems.push({ 
        payload: {          
          location: item,
          distance: 0,
          transportation: 'bike',
        },
        type: 'location'
      })
    })
    formItems.push({ payload: { selected: [] }, type: 'criteria' })
    formItems.push({ payload: { name: '', gender: 'woman' }, type: 'personal' })
    data.forEach(item => {
      formItems.push({ 
        payload: {          
          location: item,
          distance: 0,
          transportation: 'bike',
        },
        type: 'location'
      })
    })
    initDone.value = true
  })

  function onDoneItem(payload) {
    formItems[itemIndex.value] = payload
    nextItem()
  }

  function nextItem() {
    itemIndex.value += 1
  }

  function onBack() {
    itemIndex.value -= 1
  }
</script>

<template>
  <PageHeader
    title="Penentuan Lokasi"
    subtitle="Menentukan Lokasi Berdasarkan Preferensi Anda"
  >
  </PageHeader>
  <PageContainer>
    <div v-if="initDone" class="w-full md:w-3/5 mx-auto">
      <Bobot
        v-if="activeItem.type == 'criteria'"
        v-bind="activeItem.payload"
        @done="onDoneItem"
      />
      <PersonalForm
        v-if="activeItem.type == 'personal'"
        :back="itemIndex != 0"
        v-bind="activeItem.payload"
        @back="onBack"
        @done="onDoneItem"
      />
      <LocationForm
        v-if="activeItem.type == 'location'"
        v-bind="activeItem.payload"
      />
    </div>
  </PageContainer>
</template>