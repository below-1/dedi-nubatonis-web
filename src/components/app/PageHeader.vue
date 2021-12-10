<script setup>
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const showCreateSession = computed(() => {
    console.log(route.fullPath)
    return route.fullPath != '/app/session'
  })

  const props = defineProps({
    title: String,
    subtitle: String
  })
</script>

<template>
  <div class="py-6 md:py-0 md:h-20 flex flex-col md:flex-row md:items-center px-8 border-b border-gray-200">
    <div class="flex-grow mb-4 md:mb-0">
      <h1 class="text-2xl font-bold text-gray-700" style="line-height: 100%;">{{ title }}</h1>
      <h2 class="text-gray-700">{{ subtitle }}</h2>
    </div>
    <slot name="actions">
    </slot>
    <div>
      <router-link 
        v-if="showCreateSession"
        to="/app/session/new" 
        class="btn btn-info flex my-2 md:ml-4"
        tag="button"
      >Tentukan Lokasi</router-link>
    </div>
  </div>
</template>