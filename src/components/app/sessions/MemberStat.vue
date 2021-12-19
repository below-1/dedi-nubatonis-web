<script setup>
  import {
    CheckCircleIcon
  } from '@heroicons/vue/solid'

  const props = defineProps({
    done: Boolean,
    label: String
  })
</script>

<template>
  <div class="flex items-center py-1 px-2 rounded bg-gray-200">
    <CheckCircleIcon 
      class="w-4 h-4 mr-2"
      v-bind:class="[done ? 'text-green-600' : 'text-gray-500']"
    />
    <div>{{ label }}</div>
  </div>
</template>