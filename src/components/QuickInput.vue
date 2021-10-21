<script setup>
  import {
    computed
  } from 'vue'

  const props = defineProps({
    modelValue: null,
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    rules: {
      type: Array,
      required: false,
      default: []
    },
    min: {
      type: Number,
      required: false
    },
    max: {
      type: Number,
      required: false
    }
  })
  const emit = defineEmits([
    'update:modelValue'
  ])

  function onChange(event) {
    const val = event.target.value
    if (props.type == 'number') {
      emit('update:modelValue', parseInt(val))
    } else {
      emit('update:modelValue', val)
    }
  }

  const error = computed(() => {
    const first = props.rules.find(r => {
      const res = r(props.modelValue)
      return res
    })
    return first
  })
</script>

<template>
  <div class="flex flex-col">
    <input 
      :value="modelValue"
      @change="onChange"
      :type="type"
      :max="max"
      :min="min"
      class="px-2 py-1 border-b-2 border-gray-300 focus:border-indigo-500 focus:border-b-3 focus:bg-white outline-none ring-none text-sm text-gray-800 py-1 transition-colors duration-300"
    />
    <span v-if="error" class="text-red-700 text-sm">{{ error }}</span>
  </div>
</template>