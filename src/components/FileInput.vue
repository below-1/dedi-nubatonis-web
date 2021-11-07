<script setup>
	const emit = defineEmits(['onChange'])

	function onChange(event) {
		emit('onChange', event)
	}
</script>

<template>
	<label
    class="
      w-64
      flex flex-col
      items-center
      px-4
      py-6
      bg-white
      rounded-md
      shadow-md
      tracking-wide
      uppercase
      border border-blue
      cursor-pointer
      hover:bg-purple-600 hover:text-white
      text-purple-600
      ease-linear
      transition-all
      duration-150
    "
  >
    <i class="fas fa-cloud-upload-alt fa-3x"></i>
    <span class="mt-2 text-base leading-normal">Select a file</span>
    <input @change="onChange" type="file" class="hidden" />
  </label>
</template>