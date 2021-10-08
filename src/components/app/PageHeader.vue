<script setup>
  const props = defineProps({
    title: String,
    subtitle: String
  })
</script>

<template>
  <div class="h-20 flex items-center px-8 border-b border-gray-200">
    <div class="flex-grow">
      <h1 class="text-2xl font-bold text-gray-700" style="line-height: 100%;">{{ title }}</h1>
      <h2 class="text-gray-700">{{ subtitle }}</h2>
    </div>
    <slot name="actions">
    </slot>
  </div>
</template>