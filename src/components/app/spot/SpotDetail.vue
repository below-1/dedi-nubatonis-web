<script setup>
  import { 
    computed, 
    onMounted, 
    watch,
    unref
  } from 'vue'
  import { 
    TrashIcon, 
    PencilIcon
  } from '@heroicons/vue/solid'
  import { useGET } from '@quick/compose/axios'
  import DetailRow from './DetailRow.vue'
  import { 
    transportasiOptions,
    temaOptions,
    waktuOptions
  } from '@quick/data'

  const props = defineProps({
    id: String
  })

  const url = computed(() => `/spots/${props.id}`)

  const {
    result,
    get
  } = useGET({
    url
  })

  const formattedOptions = computed(() => {
    const res = unref(result)
    if (res.type != 'data') {
      return null
    }
    const transportasi = transportasiOptions.find(v => v.value == res.c4).text
    const tema = temaOptions.find(v => v.value == res.c5).text
    const waktu = waktuOptions.find(v => v.value == res.c6).text
    return {
      transportasi,
      tema,
      waktu
    }
  })

  const title = computed(() => {
    const res = unref(result)
    return res.type == 'data' ? res.name : '---'
  })

  const removeURL = computed(() => `/app/spots/${props.id}/confirm-delete`)
  const updateURL = computed(() => `/app/spots/${props.id}/update`)

  onMounted(() => {
    get()
  })
</script>

<template>
  <q-action-bar
    :title="title"
    subtitle="detail spot"
  >
    <template #actions>
      <router-link :to="removeURL" class="mr-2">
        <TrashIcon class="w-8 h-8 text-red-500"/>
      </router-link>
      <router-link :to="updateURL">
        <PencilIcon class="w-8 h-8 text-blue-500"/>
      </router-link>
    </template>
  </q-action-bar>
  <q-pad-container v-if="result.type == 'data'">
    <DetailRow label="Nama" :value="result.name" />
    <DetailRow label="Jarak" :value="`${result.c1} km`" />
    <DetailRow label="Jumlah Spot" :value="result.c2" />
    <DetailRow label="Biaya" :value="`Rp ${result.c3.toLocaleString()}`" />
    <DetailRow label="Transportasi" :value="formattedOptions.transportasi" />
    <DetailRow label="Tema" :value="formattedOptions.tema" />
    <DetailRow label="Waktu" :value="formattedOptions.waktu" />
  </q-pad-container>
</template>
