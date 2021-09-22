<script setup>
  import {
    onMounted,
    reactive,
    computed
  } from 'vue'
  import { useGET, usePOST } from '@quick/compose/axios'

  const url = '/weights'
  const {
    result: getResult,
    get
  } = useGET({
    url
  })

  const {
    status,
    post
  } = usePOST({
    url
  })

  const payload = reactive({
    c1: 1,
    c2: 1,
    c3: 1,
    c4: 1,
    c5: 1,
    c6: 1
  })

  async function loadInitialData() {
    try {
      const data = await get()
      if (!data) {
        console.log('data not found')
        return
      }
      payload.c1 = data.c1
      payload.c2 = data.c2
      payload.c3 = data.c3
      payload.c4 = data.c4
      payload.c5 = data.c5
      payload.c6 = data.c6
    } catch (err) {
      console.log(err)
    }
  }

  const loading = computed(() => status.value == 'loading')
  async function onSubmit() {
    try {
      await post(payload)
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
  <q-pad-container>
    <form>
      <q-field label="Jarak" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.c1"></q-input>
      </q-field>
      <q-field label="Jumlah Spot" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.c2"></q-input>
      </q-field>
      <q-field label="Biaya" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.c3"></q-input>
      </q-field>
      <q-field label="Transportasi" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.c4"></q-input>
      </q-field>
      <q-field label="Tema" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.c5"></q-input>
      </q-field>
      <q-field label="Waktu" class="mb-4">
        <q-input type="number" :min="1" v-model="payload.c6"></q-input>
      </q-field>
    </form>
  </q-pad-container>
  <div class="flex">
    <q-form-btn 
      @click="onSubmit" 
      :loading="loading" 
      label="Submit" 
    />
  </div>
</template>