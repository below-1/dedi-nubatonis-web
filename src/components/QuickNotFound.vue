<script setup>
	const props = defineProps({
		message: String
	})
</script>

<template>
	<div class="bg-red-300 p-8 rounded flex items-center justify-center">
		<h1 class="text-gray-900 text-2xl">{{ message }}</h1>
	</div>
</template>