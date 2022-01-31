<script setup>
  const props = defineProps({
    modelValue: Number,
    max: Number,
    min: Number
  })

  const emit = defineEmits([
    'update:modelValue'
  ])

  function onChange(event) {
    const val = event.target.value
    emit('update:modelValue', parseInt(val))
  }

</script>

<template>
  <div class="flex items-center">
    <input
      type="range"
      :max="props.max"
      :min="props.min"
      :value="props.modelValue"
      @change="onChange"
      class="
        form-range
        w-full
        h-12
        py-4
        p-0
        focus:outline-none focus:ring-0 focus:shadow-none
      "
    />
    <label class="w-8 text-center m-2 px-3 py-1 bg-indigo-600 text-white">{{ props.modelValue }}</label>
  </div>
</template>