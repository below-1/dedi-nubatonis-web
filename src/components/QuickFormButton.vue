<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    label: String,
    loading: Boolean,
    disabled: Boolean
  })

  const buttonDynamicClass = computed(() => {
    const opacity = props.loading || props.disabled ? 'opacity-50' : ''
    return [ opacity ]
  })
</script>

<template>
  <button
    class="px-2 py-4 bg-green-600 text-white text-center font-bold text-lg flex-grow flex justify-center"
    :class="buttonDynamicClass"
    :disabled="disabled"
  >
    <span v-if="!loading">{{ label }}</span>
    <img v-else class="w-6 h-6" src="/svg-loaders/bars.svg"/>
  </button>
</template>
