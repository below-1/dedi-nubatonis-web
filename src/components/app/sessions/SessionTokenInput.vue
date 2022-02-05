<script setup>
	// Vue
	import { ref, unref, computed, reactive, onMounted } from 'vue'

	// Page Header and Container
  import PageContainer from '@quick/components/app/PageContainer.vue'

  // Composable services
  import { useGET, usePUT } from '@quick/compose/axios'

  // Local services
  import imgToBase64 from '@quick/serv/imgToBase64'

  const props = defineProps({
  	token: String
  })

  const sessionByTokenURL = computed(() => {
  	const result = `/v1/api/sessions/by-token/${props.token}`
  	return result
  })

  const {
  	get: getSessionByToken,
  	result: sessionResult
  } = useGET({
  	url: sessionByTokenURL
  })

  const session = computed(() => {
  	const sr = unref(sessionResult)
  	let result = null
  	if (sr.type == 'data') {
  		result = sr.data
  	}
  	return result
  })

  const spouse = computed(() => {
  	let result = null
  	const sess = unref(session)
  	if (!sess) return {}
  	result = sess.man ? sess.man : sess.woman;
  	return result;
  })

  const weights = reactive([
    { label: 'jarak', key: 'distance', value: 1 },
    { label: 'transportasi', key: 'transportation', value: 1 },
    { label: 'harga', key: 'price', value: 1 },
    { label: 'tema', key: 'theme', value: 1 },
    { label: 'waktu', key: 'waktu', value: 1 },
    { label: 'jumlah spot', key: 'numberOfSpots', value: 1 }
  ])

  const totalWeights = computed(() => weights.map(it => it.value).reduce((a, b) => a + b, 0))
  const weightDiff = computed(() => Math.abs(totalWeights.value - 100))
  const lessThan100 = computed(() => totalWeights.value < 100)
  const moreThan100 = computed(() => totalWeights.value > 100)

  const userPayload = reactive({
    nama: '',
    avatar: null
  })

  async function avatarChangeHandler(file) {
    if (!file) {
      throw new Error('file is undefined');
    }
    const base64 = await imgToBase64( file )
    userPayload.avatar = base64
  }

  const payload = computed(() => {
    let result = {}
    weights.forEach(it => {
      result[it.key] = it.value;
    })
    result = {
      ...result,
      ...userPayload
    }
    return result;
  })

  const {
    put: updateSessionByToken,
    status: updateSessionStatus
  } = usePUT({
    url: sessionByTokenURL,
    payload
  })

  onMounted(getSessionByToken)
</script>

<template>
  <nav class="h-28 px-6 flex items-center mx-auto border-b border-gray-300">
    <h1 class="flex-grow font-black text-2xl"><span class="text-pink-600">quick</span> photography</h1>
  </nav>
	<div>
	  <PageContainer class="px-6">
	  	<h1 class="text-xl">Selamat datang... Pasangan Anda <span class="font-bold">{{ spouse.nama }}</span>, 
	  		mengirimkan permintaan penginputan data</h1>
      <div class="my-8">

        <!-- User Payload -->
        <q-field label="Nama" class="mb-4">
          <q-input type="text" v-model="userPayload.nama" />
        </q-field>
        <q-field label="Avatar" class="mb-4">
          <file-input @change="avatarChangeHandler" />
        </q-field>

        <!-- Kriteria Weights -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <template v-for="item in weights">
            <q-field :label="item.label" class="mb-4">
              <q-input type="number" v-model="item.value" :max="100" :min="0" />
            </q-field>
          </template>
        </div>

        <div class="flex flex-col justify-center">

          <!-- Validation Messages -->
          <div v-if="moreThan100">
            <h3 class="text-red-500 font-bold text-2xl">Jumlah Bobot Lebih {{ weightDiff }}</h3>
          </div>
          <div v-else-if="lessThan100">
            <h3 class="text-red-500 font-bold text-2xl">Jumlah bobot Kurang {{ weightDiff }}</h3>
          </div>

          <button 
            :disabled="lessThan100 || moreThan100"
            @click="updateSessionByToken"
            class="btn btn-primary my-12 disabled:opacity-50"
          >
            <template v-if="updateSessionStatus == 'idle'">
              Simpan Bobot
            </template>
            <q-spinner v-else class="w-4 h-4">
            </q-spinner>
          </button>
        </div>

      </div>
	  </PageContainer>
	</div>
</template>
