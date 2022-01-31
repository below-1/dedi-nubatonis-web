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

  const payload = reactive([
    { label: 'jarak', key: 'distance', value: 1 },
    { label: 'transportasi', key: 'transportation', value: 1 },
    { label: 'harga', key: 'price', value: 1 },
    { label: 'tema', key: 'theme', value: 1 },
    { label: 'waktu', key: 'waktu', value: 1 },
    { label: 'jumlah spot', key: 'numberOfSpots', value: 1 }
  ])

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
    let result = {}
    for (let item of payload) {
      result[item.key] = item.value
    }
    emit('done', { 
      payload: result,
      type: 'criteria'
    })
  }
</script>

<template>
  <h1 class="text-2xl text-gray-500 text-center mb-12">Input Bobot Kriteria  </h1>
  <h1 class="text-xl font-medium text-gray-700 text-center mb-12">Silahkan Masukan Nilai Bobot maksimal 100</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <template v-for="item in payload">
      <q-field :label="item.label" class="mb-4">
        <q-input type="number" v-model="item.value" />
      </q-field>
    </template>
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