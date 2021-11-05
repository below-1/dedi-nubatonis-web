<script setup>
  import { computed } from 'vue'
  const props = defineProps({
    size: {
      type: [Number, String],
      default: 4
    }
  })

  const sizeClass = computed(() => `w-${props.size} h-${props.size}`)
</script>

<style scoped>
  .blue-circle{
    animation-delay: 0.1s;
  }
  .green-circle{
    animation-delay: 0.2s;
  }
  .red-circle{
    animation-delay: 0.3s;
  }
</style>

<template>
  <div class="flex items-center justify-center flex-grow">
    <div
      class="bg-blue-600 p-2  rounded-full animate-bounce blue-circle mr-2"
      :class="sizeClass"
    ></div>
    <div
      class="bg-green-600 p-2 rounded-full animate-bounce green-circle mr-2"
      :class="sizeClass"
    ></div>
    <div
      class="bg-red-600 p-2 rounded-full animate-bounce red-circle"
      :class="sizeClass"
    ></div>
  </div>
</template>