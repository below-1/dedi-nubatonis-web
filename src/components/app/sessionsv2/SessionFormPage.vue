<script setup>
	import {
    ref,
    toRef,
    unref,
    reactive,
    computed,
    onMounted,
    provide,
    inject,
    watch
  } from 'vue'
  import { api } from '@quick/serv/axios'
  import {
    defaultWeights,
    useSession,
    useComputeLocation
  } from '@quick/compose/session';
  import WhatsAppSVG from '@quick/assets/whatsapp-svgrepo-com.svg'
  import { useGET, usePUT } from '@quick/compose/axios'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import SessionForm from './SessionForm.vue'
  import SessionSendToken from './SessionSendToken.vue'

  const props = defineProps({
    id: String
  })

  const id = toRef(props, 'id')
  const $currentUser = inject('currentUser');

  const payload = reactive(defaultWeights)
  const totalWeights = computed(() => payload.map(it => it.value).reduce((a, b) => a + b, 0))
  const weightDiff = computed(() => Math.abs(totalWeights.value - 100))
  const lessThan100 = computed(() => totalWeights.value < 100)
  const moreThan100 = computed(() => totalWeights.value > 100)

  const $gender = computed(() => {
    const currentUser = unref($currentUser);
    return currentUser.gender;
  })

  const {
    $session,
    loadSession,
    updateSession,
    onSuccessUpdate,
    onErrorUpdate,
    $updateStatus,
    $doneLoad
  } = useSession({ $id: id, payload, $gender  })
  const showNotification = inject('notification.show')
  const computeLocation = useComputeLocation();

  const isCreator = computed(() => {
    const session = unref($session)
    const currentUser = unref($currentUser)
    if (!session || !currentUser) return false;
    return session.user._id == currentUser._id;
  })

  onSuccessUpdate(async (response) => {
    if (response.status == 'READY') {

      // const weightsDummy = {
      //   "distance": 1,
      //   "transportation": 1,
      //   "price": 1,
      //   "theme": 1,
      //   "waktu": 95,
      //   "numberOfSpots": 1
      // }
      // response.weights.man = weightsDummy
      // response.weights.woman = weightsDummy
      // response.weights.photographer = weightsDummy
      // console.log(response)
      // throw new Error('stop')

      const locationComputed = await computeLocation(response)

      if (locationComputed) {
        showNotification({
          title: 'Lokasi Photoshoot telah ditentukan',
          description: 'Berdasarkan perhitungan sistem. Lokasi yang dipilih adalah Pantai Manikin',
          okLabel: 'Lihat Detail'
        })
      }
    }
  })

  onErrorUpdate(() => {
    alert('gagal mengubah bobot')
  })

  onMounted(loadSession)
</script>

<template>
	<PageHeader
    title="Penentuan Lokasi"
    subtitle="Menentukan Lokasi Berdasarkan Preferensi Anda"
  >
  </PageHeader>
  <PageContainer>
    <template v-if="$session">
      <SessionSendToken
        v-if="isCreator"
        :session="$session" 
      />
      <h1 class="text-2xl text-gray-500 text-center mb-12">Input Bobot Kriteria  </h1>
      <h1 class="text-xl font-medium text-gray-700 text-center mb-12">Silahkan Masukan Nilai Bobot maksimal 100</h1>
      <div class="px-4 mx-auto md:px-0 md:w-4/5">
        <SessionForm
          v-if="$doneLoad && $updateStatus != 'loading'"
          :weights="payload"
          @done="updateSession"
        />
        <q-spinner v-else />
      </div>
    </template>
  </PageContainer>
</template>