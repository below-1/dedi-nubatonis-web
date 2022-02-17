<script setup>
	// Vue
	import { inject, ref, toRef, unref, computed, reactive, onMounted } from 'vue'

  // Third Party Composables
  import { useRouter } from 'vue-router'

	// Internal Components
  import PageContainer from '@quick/components/app/PageContainer.vue'

  // Internal Composables
  import { useUpdateSessionByToken, useSessionWeights, mutateArrayWeights } from '@quick/compose/session'
  import { useComputeLocation } from '@quick/compose/session'
  import { useBase64Input } from '@quick/compose/base64input'

  const props = defineProps({
  	token: String
  })
  const router = useRouter()

  const showNotification = inject('notification.show')

  const guestUser = inject('guestUser')
  const guestSession = inject('guestSession')
  const reloadGuestSession = inject('reloadGuestSession')
  const sessionCreator = inject('sessionCreator')

  const token = toRef(props, 'token')
  const nama = ref('')

  const {
    weights,
    weightDiff,
    lessThan100,
    moreThan100,
    totalWeigths
  } = useSessionWeights()

  const {
    image,
    imageChangeHandler
  } = useBase64Input()

  const payload = computed(() => {
    let result = {}
    weights.forEach(it => {
      result[it.key] = it.value;
    })
    result = {
      ...result,
      nama: nama.value,
      avatar: image.value
    }
    return result;
  })

  const {
    updateSessionByToken,
    updateStatus,
    onSuccessUpdate
  } = useUpdateSessionByToken({
    token: guestSession.value.token,
    payload
  })

  const notFound = computed(() => {
    const sessionResultVal = unref(sessionResult)
    return sessionResultVal.type == 'error' && sessionResultVal.response && sessionResultVal.response.status == '404'
  })

  const computeLocation = useComputeLocation();

  onSuccessUpdate(async (response) => {
    // After user created or updated
    // We should update guestUser
    await reloadGuestSession()
    
    if (response.man && response.man.role == 'spouse') {
      guestUser.value = response.man
    } else if (response.woman && response.woman.role == 'spouse') {
      guestUser.value = response.woman
    }

    if (response.status == 'READY') {
      const locationComputed = await computeLocation(response)

      if (locationComputed) {
        showNotification({
          title: 'Lokasi Photoshoot telah ditentukan',
          description: 'Berdasarkan perhitungan sistem. Lokasi yang dipilih adalah Pantai Manikin',
          okLabel: 'Lihat Detail',
          onOk: () => {
            router.push(`/guest/${response.token}/detail`)
          }
        })
      }
    } else {
      showNotification({
        title: 'Berhasil disimpan',
        description: 'Kami telah menyimpan data anda. Lokasi anda akan ditentukan secara otomatis ketika fotografer selesai menginput data',
        okLabel: 'Lihat Detail',
        onOk: () => {
          router.push(`/guest/${response.token}/detail`)
        }
      })
    }
  })

  onMounted(async () => {
    if (!guestSession.value) return

    const guestSessionVal = unref(guestSession)
    if (guestSessionVal.man && guestSessionVal.man.role == 'spouse') {
      mutateArrayWeights({
        $session: guestSessionVal,
        $gender: 'man',
        $weights: weights
      })
    } else if (guestSessionVal.woman && guestSessionVal.woman.role == 'spouse') {
      mutateArrayWeights({
        $session: guestSessionVal,
        $gender: 'woman',
        $weights: weights
      })
    }

    if (guestUser.value) {
      const guestUserVal = unref(guestUser)
      nama.value = guestUserVal.nama
    }
  })
</script>

<template>
  <PageContainer>
  	<h1 class="text-xl">Selamat datang... Pasangan Anda <span class="font-bold">{{ sessionCreator.nama }}</span>, 
  		mengirimkan permintaan penginputan data</h1>
    <div class="my-8">

      <!-- User Payload -->
      <q-field label="Nama" class="mb-4">
        <q-input type="text" v-model="nama" />
      </q-field>
      <q-field label="Avatar" class="mb-4">
        <file-input @change="imageChangeHandler" />
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
          <template v-if="updateStatus == 'idle'">
            Simpan Bobot
          </template>
          <q-spinner v-else class="w-4 h-4">
          </q-spinner>
        </button>
      </div>
    </div>
  </PageContainer>
</template>
