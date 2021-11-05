<script setup>
  import { ref, reactive, computed, onMounted } from 'vue'

  const props = defineProps({
    location: Object,
    distance: Number,
    transportation: String,
    back: {
      type: Boolean,
      default: false
    }
  })
  const loading = ref(true)

  const payload = reactive({
    location: {},
    distance: 0,
    transportation: 'bike',
  })

  const watchedTransportation = computed(() => payload.transportation)

  const options = [
    { value: 'bike', label: 'Motor' },
    { value: 'car', label: 'Mobil Pribadi' },
    { value: 'rental-car', label: 'Rental Mobil' }
  ]
</script>

<template>
  <!-- <q-loading size="12" class="flex-grow" /> -->
  <section>
    <h2 class="text-3xl text-gray-700 font-bold mb-4">{{ location.nama }}</h2>
    <div>
      <label class="block text-2xl text-gray-500 mb-4">Pilih Mode Transportasi...</label>
      <select
        v-model="payload.transportation"
        class="appearance-none border-b border-gray-300 py-2 px-2 w-full text-xl font-medium focus:outline-none mb-10">
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >{{ option.label }}</option>
      </select>
    </div>
    <div class="flex justify-center">
      <q-loading v-if="loading" size="12" class="py-4" />
      <button 
        v-else
        class="btn btn-primary my-12"
      >
        Selanjutnya
      </button>
    </div>
  </section>
</template>