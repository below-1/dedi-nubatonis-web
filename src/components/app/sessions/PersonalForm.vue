<script setup>
  import {
    reactive,
    onMounted
  } from 'vue'

  const props = defineProps({
    label: {
      type: String,
      default: 'Anda'
    },
    name: String,
    gender: String,
    back: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits([
    'done',
    'back'
  ])

  const payload = reactive({
    gender: 'man',
    name: ''
  })

  onMounted(() => {
    const { back, ...subset } = props
    console.log(subset)
    Object.assign(payload, subset)
  })

  function onDone() {
    emit('done', {
      payload: {
        ...payload
      },
      type: 'personal'
    })
  }
</script>

<template>
  <div>
    <label class="text-2xl text-gray-500 mb-2">Nama {{ label }}...</label>
    <input 
      v-model="payload.name"
      type="text" 
      class="appearance-none border-b border-gray-300 py-2 px-2 w-full text-xl font-medium focus:outline-none mb-10"  />
  </div>

  <div class="flex flex-col justify-center">
    <label class="text-2xl text-gray-500 mb-2">Jenis Kelamin Anda...</label>
    <div class="flex items-center">
      <div class="flex items-center mr-8">
        <input type="radio" v-model="payload.gender" value="man" class="mr-2" />
        <label>Laki - Laki</label>
      </div>
      <div class="flex items-center">
        <input v-model="payload.gender" type="radio" value="woman" class="mr-2" />
        <label>Perempuan</label>
      </div>
    </div>
    <div class="flex justify-center">
      <button 
        @click="onDone"
        class="btn btn-primary my-12"
      >
        Selanjutnya
      </button>
      <button 
        @click="$emit('back')"
        class="btn btn-ghost my-12"
      >
        Kembali
      </button>
    </div>
  </div>
</template>