<script setup>
  import { 
    ref,
    computed
  } from 'vue'
  import {
    useRouter
  } from 'vue-router'
  import { 
    usePOST
  } from '@quick/compose/axios'
  import SpotForm from './SpotForm.vue'

  const router = useRouter()

  const initialData = {
    name: '',
    c1: 1,
    c2: 1,
    c3: 1,
    c4: 1,
    c5: 1,
    c6: 1
  }

  const {
    post,
    status
  } = usePOST({
    url: '/spots',
    initialData
  })

  const payload = ref({})
  function onPayloadChange(v) {
    payload.value = v
  }

  async function onSubmit() {
    // console.log('submitting...')
    await post(payload.value)
    router.back()
  }

  const loading = computed(() => status.value == 'loading')
  // const loading = computed(() => true)
</script>

<template>
  <q-action-bar
    title="Tambah Spot"
    subtitle="Tambahkan data spot kedalam sistem"
  >
  </q-action-bar>
  <q-pad-container>
    <spot-form
      @update:payload="onPayloadChange"
    ></spot-form>
  </q-pad-container>
  <div class="flex">
    <q-form-btn 
      @click="onSubmit" 
      :loading="loading" 
      label="Submit" 
    />
  </div>
</template>
