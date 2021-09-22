<script setup>
  import {
    reactive,
    watch
  } from 'vue'
  import { spot as defaultSpot } from '@quick/defaults'
  import { 
    transportasiOptions,
    temaOptions,
    waktuOptions
  } from '@quick/data'

  const emit = defineEmits(['update:payload'])

  const props = defineProps({
    initialData: {
      type: Object,
      default: defaultSpot
    }
  })

  const payload = reactive(props.initialData)

  watch(payload, (v) => {
    emit('update:payload', {...v})
  })
</script>

<template>
  <form>
    <q-field label="Nama Lokasi" class="mb-4">
      <q-input v-model="payload.name"></q-input>
    </q-field>
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
      <q-select
        v-model="payload.c4"
        :options="transportasiOptions"
        parse-value
      ></q-select>
    </q-field>
    <q-field label="Tema" class="mb-4">
      <q-select
        v-model="payload.c5"
        :options="temaOptions"
        parse-value
      ></q-select>
    </q-field>
    <q-field label="Waktu" class="mb-4">
      <q-select
        v-model="payload.c6"
        :options="waktuOptions"
        parse-value
      ></q-select>
    </q-field>
  </form>
</template>
