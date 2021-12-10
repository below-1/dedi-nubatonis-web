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
    { label: 'jarak', key: 'distance', value: 0 },
    { label: 'transportasi', key: 'transportation', value: 0 },
    { label: 'harga', key: 'price', value: 0 },
    { label: 'tema', key: 'theme', value: 0 },
    { label: 'waktu', key: 'waktu', value: 0 },
    { label: 'jumlah spot', key: 'numberOfSpots', value: 0 }
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
  <h1 class="text-2xl text-gray-500 text-center mb-12">Input Bobot Kriteria Yang {{ label }} Utamakan</h1>
  <h1 class="text-xl font-medium text-gray-700 text-center mb-12">In 2.15.0 and later (Postgres only), you can filter scalar lists - for example, a list of String or Enum types. The following example returns all posts where the tags list includes databases and typescript</h1>
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