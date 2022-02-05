<script setup>
	import { CheckIcon } from '@heroicons/vue/solid'

	// CSS class for image or icon
	const imageClass = "w-12 h-12 mr-4"

	const props = defineProps({
		nama: String,
		label: String,
		icon: null,
		doneInput: Boolean,
		avatar: null
	})
</script>

<template>
	<div 
		class="text-lg font-bold bg-gray-200 p-2 rounded flex items-center"
	>
		<img 
			v-if="avatar"
			:src="avatar"
			:class="imageClass"
		/>
    <inline-svg
    	v-else
      :src="icon"
      :class="imageClass"
    >
    </inline-svg>
    <div class="flex-grow">
	    <div class="text-xl">{{ nama }}</div>
	    <div class="text-sm font-medium">{{ label }}</div>
    </div>
    <CheckIcon 
    	v-if="doneInput"
    	class="h-6 w-8 text-green-700" />
  </div>
</template>