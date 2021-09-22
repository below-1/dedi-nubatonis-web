<script setup>
  const props = defineProps({
    title: String,
    subtitle: String
  })
</script>

<template>
  <div class="flex items-center h-20 px-4 border-b border-gray-200">
    <div class="flex-grow">
      <h1 class="font-medium text-lg">{{ title }}</h1>
      <h2 class="font-medium text-sm text-gray-500">{{ subtitle }}</h2>
    </div>
    <slot name="actions"></slot>
  </div>
</template>
