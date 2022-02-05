<script setup>
	import {
    computed,
    reactive,
    ref,
    watch,
    onMounted
  } from 'vue'
  import WhatsAppSVG from '@quick/assets/whatsapp-svgrepo-com.svg'

  const props = defineProps({
    weights: Array
  })

  const emit = defineEmits([
    'done'
  ]);

  const weights = reactive([]);

  const totalWeights = computed(() => weights.map(it => it.value).reduce((a, b) => a + b, 0))
  const weightDiff = computed(() => Math.abs(totalWeights.value - 100))
  const lessThan100 = computed(() => totalWeights.value < 100)
  const moreThan100 = computed(() => totalWeights.value > 100)

  onMounted(() => {
    props.weights.forEach(w => {
      weights.push(w);
    });
  })

</script>

<template>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <template 
      v-for="item in weights">
      <q-field 
        :label="item.label" 
        class="mb-4"
      >
        <q-input 
          type="number" 
          v-model="item.value"
          :max="100"
          :min="0"
        />
      </q-field>
    </template>
  </div>
  <div class="flex flex-col justify-center">
    <div v-if="moreThan100">
      <h3 class="text-red-500 font-bold text-2xl">Jumlah Bobot Lebih {{ weightDiff }}</h3>
    </div>
    <div v-else-if="lessThan100">
      <h3 class="text-red-500 font-bold text-2xl">Jumlah bobot Kurang {{ weightDiff }}</h3>
    </div>

    <button 
      @click="emit('done')"
      :disabled="lessThan100 || moreThan100"
      class="btn btn-primary my-12 disabled:opacity-50"
    >
      Simpan Bobot
    </button>
  </div>
</template>