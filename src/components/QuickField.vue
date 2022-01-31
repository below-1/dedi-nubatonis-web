<script setup>
  const props = defineProps({
    label: String
  })
</script>

<template>
  <div>
    <label class="text-gray-600">
      {{ label }}
    </label>
    <slot></slot>
  </div>
</template>
