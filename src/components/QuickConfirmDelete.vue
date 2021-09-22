<script setup>
  import { 
    onMounted, 
    computed,
    unref
  } from 'vue'
  import { useRouter } from 'vue-router'
  import { ChevronLeftIcon } from '@heroicons/vue/outline'
  import { ExclamationIcon } from '@heroicons/vue/solid'
  import { 
    useDELETE,
    useGET
  } from '@quick/compose/axios'

  const props = defineProps({
    name: String
  })

  const emit = defineEmits([
    'delete',
    'cancel'
  ])
</script>

<template>
  <q-action-bar
    :title="name"
    subtitle="hapus data"
  >
    <template #actions>
      <button @click="$emit('cancel')">
        <ChevronLeftIcon class="w-8 h-8 text-gray-500"/>
      </button>
    </template>
  </q-action-bar>
  <div class="bg-gray-100 py-16 px-6 flex flex-col items-center justify-center">
    <ExclamationIcon class="text-yellow-600 my-2 h-24 w-24" />
    <h1 class="text-gray-700 text-xl text-center">Anda akan menghapus data {{ name }}?</h1>
    <div class="flex items-center py-4">
      <button class="bg-red-600 rounded text-white px-2 py-1 mr-2" @click="$emit('delete')">
        lanjutkan
      </button>
      <button class="bg-gray-100 border border-gray-300 rounded px-2 py-1" @click="$emit('cancel')">
        batalkan
      </button>
    </div>
  </div>
</template>
