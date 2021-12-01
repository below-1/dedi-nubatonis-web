<script setup>
  import {
    reactive,
    computed,
    onMounted
  } from 'vue'

  const ncrit = 2
  const props = defineProps({
    label: {
      type: String,
      default: 'Anda'
    },
    selected: {
      type: Array,
      default: []
    }
  })
  const emit = defineEmits([
    'done',
    'back'
  ])
  const _bobots = [
    { label: 'Jarak', value: 'distance' },
    { label: 'Transportasi', value: 'transportation' },
    { label: 'Harga', value: 'price' },
    { label: 'Tema', value: 'theme' },
    { label: 'Waktu', value: 'waktu' },
    { label: 'Jumlah Spot', value: 'numberOfSpots' }
  ]
  const bobots = reactive(_bobots.map(it => {
    return {
      ...it,
      selected: false
    }
  }))
  const totalSelected = computed(() => bobots.map(it => it.selected).filter(x => x).length)
  const activeClass = 'border-4 border-green-400 font-bold text-green-600'

  onMounted(() => {
    bobots.forEach(it => {
      if (props.selected.includes(it.value)) {
        it.selected = true
      }
    })
  })

  function onClickCriteria(index) {
    const currentValue = bobots[index].selected
    // if (totalSelected.value == ncrit && !currentValue) {
    //   return
    // }
    bobots[index].selected = !currentValue
  }

  function onDone() {
    const payload = bobots.filter(it => it.selected).map(it => it.value)
    emit('done', { 
      payload: {
        selected: payload
      },
      type: 'criteria'
    })
  }
</script>

<template>
  <h1 class="text-2xl text-gray-500 text-center mb-12">Pilih 3 Kategori Yang {{ label }} Utamakan</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <button 
      v-for="item, index in bobots"
      :key="item.value"
      class="px-12 py-4 border-b-4 border-gray-200 text-xl"
      v-bind:class="{ [activeClass]: item.selected  }"
      @click="onClickCriteria(index)"
    >
      {{ item.label }}
    </button>
  </div>
  <div class="flex justify-center">
    <button 
      @click="onDone"
      class="btn btn-primary my-12"
    >
      Selanjutnya
    </button>
  </div>
</template>