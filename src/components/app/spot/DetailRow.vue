<script setup>
  defineProps({
    label: null,
    value: null
  })
</script>

<template>
  <div class="py-2 border-b border-gray-200 flex justify-between items-center">
    <div class="text-gray-700">{{ label }}</div>
    <div class="text-lg">{{ value }}</div>
  </div>
</template>