<script setup>
  import { 
    ref,
    computed,
    onMounted
  } from 'vue'
  import { useRouter } from 'vue-router'
  import { usePUT, useGET } from '@quick/compose/axios'
  import SpotForm from './SpotForm.vue'

  const props = defineProps({
    id: String
  })
  const putURL = computed(() => `/spots/${props.id}`)
  const getURL = computed(() => `/spots/${props.id}`)
  const router = useRouter()

  const {
    put,
    status: putStatus
  } = usePUT({
    url: putURL
  })

  const dataReady = ref(false)
  const {
    result: getResult,
    get
  } = useGET({
    url: getURL
  })

  async function loadInitialData() {
    dataReady.value = false
    await get()
    if (getResult.value.type != 'data') {
      alert('gagal mengambil data spot')
    }
    const initialData = getResult.value
    const { _id, type, ...rest } = initialData
    payload.value = rest
    dataReady.value = true
  }

  const payload = ref({})
  function onPayloadChange(v) {
    payload.value = v
  }

  async function onSubmit() {
    // console.log('submitting...')
    try {
      await put(payload.value)
      router.back()
    } catch (err) {
      console.log(err)
      alert('gagal mengubah data spot')
    }

  }

  const loading = computed(() => status.value == 'loading')
  const title = computed(() => getResult.value.type == 'data' ? getResult.value.name : '')

  onMounted(loadInitialData)
</script>

<template>
  <q-action-bar
    :title="title"
    subtitle="Ubah data spot"
  >
  </q-action-bar>
  <q-pad-container v-if="dataReady">
    <spot-form
      :initial-data="payload"
      @update:payload="onPayloadChange"
    ></spot-form>
  </q-pad-container>
  <q-loading-pane v-else>
  </q-loading-pane>
  <div class="flex">
    <q-form-btn 
      @click="onSubmit" 
      :loading="loading" 
      label="Submit" 
    />
  </div>
</template>
