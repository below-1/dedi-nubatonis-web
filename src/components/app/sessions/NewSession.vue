<script setup>
  import {
    ref,
    reactive,
    computed,
    onMounted,
    provide,
    watch
  } from 'vue'
  import { useGET } from '@quick/compose/axios'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import PersonalForm from './PersonalForm.vue'
  import LocationForm from './LocationForm.vue'
  import Bobot from './Bobot.vue'
  import useORS from '@quick/compose/ors'
  import { changeWeights, asArray } from '@quick/serv/weights'
  import { topsis, transformRow } from '@quick/serv/topsis'

  const position = ref([0, 0])
  const initDone = ref(false)
  const rankingResult = ref(null)
  const rankingResultGMapLink = computed(() => {
    if (!rankingResult.value) {
      return ''
    }
    return `https://www.google.co.id/maps/@${rankingResult.value.latitude},${rankingResult.value.longitude},15z`
  })
  const itemIndex = ref(0)
  const formItems = reactive([])
  const {
    get,
    result,
    onSuccess
  } = useGET({
    url: '/v1/api/locations'
  })
  const activeItem = computed(() => itemIndex.value < formItems.length ? formItems[itemIndex.value] : null)
  const {
    calculateDistance
  } = useORS()

  provide('position', position)
  provide('calculateDistance', calculateDistance)

  onMounted(async () => {
    await get()
    navigator.geolocation.getCurrentPosition(
      (geoPos) => {
        position.value = [ geoPos.coords.latitude, geoPos.coords.longitude ]
      }, 
      (geoPosError) => {
        alert('gagal mengambil data lokasi')
      })
  })

  onSuccess((data) => {
    formItems.push({ payload: { selected: ['distance', 'price', 'theme'] }, type: 'criteria' })
    formItems.push({ payload: { name: 'A', gender: 'man' }, type: 'personal' })
    data.forEach(item => {
      formItems.push({ 
        payload: {          
          location: item,
          distance: 0,
          transportation: 'bike',
        },
        type: 'location'
      })
    })
    formItems.push({ payload: { selected: [] }, type: 'criteria' })
    formItems.push({ payload: { name: 'B', gender: 'woman' }, type: 'personal' })
    data.forEach(item => {
      formItems.push({ 
        payload: {          
          location: item,
          distance: 0,
          transportation: 'bike',
        },
        type: 'location'
      })
    })
    initDone.value = true
  })

  function buildPayload() {
    const altValues = []
    const weights = []
    for (let i = 0; i < formItems.length; i++) {
      const fi = formItems[i]
      switch (fi.type) {
        case 'criteria':
          weights.push(changeWeights(fi.payload.selected))
          break;
        case 'personal':
          break;
        case 'location':
          // The edge of location form item
          altValues.push([
            fi.payload.distance,
            fi.payload.location.numberOfSpots,
            parseInt(fi.payload.location.price.$numberDecimal),
            fi.payload.transportation,
            fi.payload.location.theme,
            fi.payload.location.waktu
          ])
          break;
        default:
          break;
      }
    }
    const middleIndex = Math.ceil(altValues.length / 2)
    const firstHalf = altValues.splice(0, middleIndex)
    const secondHalf = altValues.splice(-middleIndex)

    return {
      altValues: [ firstHalf, secondHalf ],
      weights
    }
  }

  function runTopsis() {
    const { altValues, weights } = buildPayload()
    let topsisResults = []
    for (let i = 0; i < 2; i++) {
      const _AV = altValues[i]
      const _W = weights[i]
      const AV = _AV.map(transformRow)
      const W = asArray(_W)
      const ranked = topsis({ data: AV, weights: W })
      topsisResults.push(ranked)
    }
    console.log('topsisResults')
    console.log(topsisResults)
    const N_ALT = 3;
    // Alternatif Index
    let bordaResults = []
    for (let i = 0; i < N_ALT; i++) {
      let bordaAltRow = []
      // Ranking Index
      for (let j = 0; j < N_ALT; j++) {
        let bordaCell = 0
        topsisResults.forEach(topsisPrefResult => {
          if (topsisPrefResult[j].i == i) {
            bordaCell += topsisPrefResult[j].p * (N_ALT - j)
          }
        })
        bordaAltRow.push(bordaCell)
      }
      // console.log('bordaAltRow')
      // console.log(bordaAltRow)

      // console.log('bordaResults')
      // console.log(bordaResults)
      bordaResults.push(bordaAltRow.reduce((a, b) => a + b, 0))
      // console.log('bordaResults')
      // console.log(bordaResults)
    }
    console.log('bordaResults')
    console.log(bordaResults)
    const totalBordaPoints = bordaResults.reduce((a, b) => a + b, 0)
    const bordaNormalized = bordaResults.map(x => x / totalBordaPoints)
    const bordaPacked = bordaNormalized.map((b, i) => {
      return {
        b,
        i
      }
    })
    bordaPacked.sort((a, b) => a.b - b.b)
    bordaPacked.reverse()
    const choosen = bordaPacked[0]
    rankingResult.value = result.value.data[choosen.i]
    return choosen
  }

  function onDoneItem(payload) {
    formItems[itemIndex.value] = payload
    nextItem()
    if (itemIndex.value == formItems.length) {
      runTopsis()
    }
  }

  function nextItem() {
    itemIndex.value += 1
  }

  function onBack() {
    itemIndex.value -= 1
  }
</script>

<template>
  <PageHeader
    title="Penentuan Lokasi"
    subtitle="Menentukan Lokasi Berdasarkan Preferensi Anda"
  >
  </PageHeader>
  <PageContainer>
    <div v-if="initDone" class="w-full md:w-3/5 mx-auto">
      <template v-if="activeItem && !rankingResult">
        <Bobot
          v-if="activeItem.type == 'criteria'"
          v-bind="activeItem.payload"
          :label="itemIndex > 0 ? 'Pasangan Anda' : 'Anda'"
          @done="onDoneItem"
        />
        <PersonalForm
          v-if="activeItem.type == 'personal'"
          :back="itemIndex != 0"
          :label="itemIndex > 0 ? 'Pasangan Anda' : 'Anda'"
          v-bind="activeItem.payload"
          @back="onBack"
          @done="onDoneItem"
        />
        <LocationForm
          v-if="activeItem.type == 'location'"
          v-bind="activeItem.payload"
          @back="onBack"
          @done="onDoneItem"
        />
      </template>
      <q-loading v-else />
      <div v-if="rankingResult" class="text-center">
        <h1 class="block text-4xl text-gray-500 mb-4 font-black">{{ rankingResult.nama }}</h1>
        <h2 class="text-3xl text-gray-700 mb-4">Lokasi yang disarankan sistem</h2>
        <a :href="rankingResultGMapLink" target="_blank">Buka Di Google Map</a>
      </div>
    </div>
  </PageContainer>
</template>