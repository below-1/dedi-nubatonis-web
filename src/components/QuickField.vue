<script setup>
  const props = defineProps({
    label: String
  })
</script>

<template>
  <div>
    <label class="text-gray-500 text-sm">
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>
