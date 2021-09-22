<script setup>
  import { onMounted } from 'vue'
  import { PlusIcon } from '@heroicons/vue/solid'
  import { useGET } from '@quick/compose/axios'
  import SpotItem from './SpotItem.vue'

  const {
    result,
    get
  } = useGET({
    url: '/spots'
  })

  onMounted(get)
</script>

<template>
  <q-action-bar
    title="Spot"
    subtitle="daftar spot yang tersedia"
  >
    <template #actions>
      <router-link to="/app/spots/create">
        <PlusIcon class="w-8 h-8 text-purple-500"/>
      </router-link>
    </template>
  </q-action-bar>
  <q-loading-pane v-if="result.type == 'loading'" />
  <ul v-else-if="result.type == 'data'">
    <template v-for="item in result.items" :key="item._id">
      <SpotItem
        :name="item.name"
        :id="item._id"
        :jarak="item.c1"
        :spots="item.c2"
      />
    </template>
  </ul>
</template>
