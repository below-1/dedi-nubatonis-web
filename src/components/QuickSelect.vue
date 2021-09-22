<script setup>
  import { computed } from 'vue'

  const emit = defineEmits([
    'update:modelValue'
  ])

  const props = defineProps({
    modelValue: null,
    parseValue: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: false,
      default: []
    }
  })

  function onChange(v) {
    const targetValue = v.target.value
    let result = props.parseValue ? parseInt(targetValue) : targetValue
    emit('update:modelValue', result)
  }
</script>

<template>
  <div class="flex flex-col">
    <select
      :value="modelValue"
      @change="onChange"
      class="border-b-2 border-gray-300 focus:border-indigo-500 focus:border-b-3 outline-none ring-none text-sm text-gray-800 py-1 transition-colors duration-300"
    >
      <option 
        v-for="item in options" 
        :key="item.value"
        :value="item.value">
        {{ item.text }}
      </option>
    </select>
  </div>
</template>