<script setup>
  import { ref, unref, computed, nextTick } from 'vue';

	const emit = defineEmits(['change', 'update:error'])
  const file = ref(null)
  const error = computed(() => {
    if (!file.value) return null;
    const f = unref(file);
    const filesize = f.size / 1024;
    return filesize <= 1024 ? null : 'Ukuran file terlalu besar. Harus kurang dari 1MB';
  })

  function emitFileUpdate() {
    const f = unref(file);
    if (error.value || !file.value) return;
    emit('change', file.value);
  }

	async function onChange(event) {
    file.value = event.currentTarget.files[0];
    await nextTick();
    emitFileUpdate();
    // setTimeout(emitFileUpdate, 1000);
	}
</script>

<template>
	<div>
    <i class="fas fa-cloud-upload-alt fa-3x"></i>
    <input @change.stop="onChange" type="file" />
    <div v-if="error" class="text-red-600">{{ error }}</div>
  </div>
</template>
