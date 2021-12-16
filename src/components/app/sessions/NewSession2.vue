<script setup>
  import {
    ref,
    reactive,
    computed,
    onMounted,
    provide,
    watch
  } from 'vue'
  import { api } from '@quick/serv/axios'
  import { useGET, usePOST } from '@quick/compose/axios'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import PersonalForm from './PersonalForm.vue'
  import LocationForm from './LocationForm.vue'
  import Bobot from './BobotRev1.vue'
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
    get: getLocations,
    result,
    onSuccess
  } = useGET({
    url: '/v1/api/locations'
  })

  const locations = computed(() => {
    if (result.value.type != 'data') {
      return []
    }
    return result.value.data
  })

  const activeItem = computed(() => itemIndex.value < formItems.length ? formItems[itemIndex.value] : null)
  const {
    calculateDistance
  } = useORS()

  provide('position', position)
  provide('calculateDistance', calculateDistance)

  onSuccess((data) => {
    formItems.push({ payload: {}, type: 'criteria' })
    formItems.push({ payload: { name: '', gender: 'man' }, type: 'personal' })
    formItems.push({ payload: {}, type: 'criteria' })
    formItems.push({ payload: { name: '', gender: 'woman' }, type: 'personal' })
    formItems.push({ payload: {}, type: 'criteria' })
    initDone.value = true
  })

  const criteriaLabel = computed(() => {
    if (itemIndex.value == formItems.length - 1) {
      return 'Fotografer'
    } else {
      if (itemIndex.value > 0) {
        return 'Pasangan Anda'
      } else {
        return 'Anda'
      }
    }
  })

  function buildPayload() {
    const altValues = []
    const weights = []
    for (let i = 0; i < formItems.length; i++) {
      const fi = formItems[i]
      switch (fi.type) {
        case 'criteria':
          weights.push([
            fi.payload.distance,
            fi.payload.numberOfSpots,
            fi.payload.price,
            fi.payload.transportation,
            fi.payload.theme,
            fi.payload.waktu
          ]);
          break;
        case 'personal':
          break;
        default:
          break;
      }
    }

    function buildLocationsValues() {
      return locations.value.map(fi => [
        fi.distance,
        fi.numberOfSpots,
        parseInt(fi.price.$numberDecimal),
        fi.transportation,
        fi.theme,
        fi.waktu
      ])
    }

    const firstHalf = buildLocationsValues()
    const secondHalf = buildLocationsValues()
    const lastHalf = buildLocationsValues()

    return {
      altValues: [ firstHalf, secondHalf, lastHalf ],
      weights
    }
  }

  function buildSessionData() {
    const sessionData = {
      man: null,
      woman: null,
      location: null
    }
    for (let item of formItems) {
      if (item.type == 'personal') {
        // It's a man
        if (!sessionData.man) {
          sessionData.man = item.payload.name
        } else {
          sessionData.woman = item.payload.name
        }
      }
    }
    sessionData.location = { ...rankingResult.value }
    return sessionData
  }

  function saveSessionData() {
    const sessionData = buildSessionData()
    api.post('/v1/api/sessions', sessionData)
      .catch((err) => {
        console.log(err)
      })
  }

  function runTopsis() {
    const { altValues, weights } = buildPayload()

    let topsisResults = []
    const N_PREF = 3;

    for (let i = 0; i < N_PREF; i++) {
      const _AV = altValues[i]
      const _W = weights[i]
      const AV = _AV.map(transformRow)
      const W = _W
      const ranked = topsis({ data: AV, weights: W })
      topsisResults.push(ranked)
    }

    const N_ALT = locations.value.length;

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
      bordaResults.push(bordaAltRow.reduce((a, b) => a + b, 0))
    }

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
    saveSessionData()
    return choosen
  }

  const currentSessionData = reactive({
    step: 0,
    items: [
      {
        name: '',
        gender: 'man',
        weights: {}
      },
      {
        name: '',
        gender: 'woman',
        weights: {}
      }
    ]
  });

  const {
    post: saveCurrentState
  } = usePOST({
    payload: currentSessionData,
    url: '/v1/api/sessions/current'
  });

  const {
    get: getCurrentSessionData
  } = useGET({
    url: '/v1/api/sessions/current'
  });

  async function buildCurrentSessionData(currentPayload) {
    const currentIndex = itemIndex.value;

    const items = [
      {
        name: formItems[1].payload.name,
        gender: formItems[1].payload.gender,
        weights: formItems[0].payload
      },
      {
        name: formItems[3].payload.name,
        gender: formItems[3].payload.gender,
        weights: formItems[2].payload
      }
    ];

    currentSessionData.items = items;
    currentSessionData.step = currentIndex;
    console.log('formItems');
    console.log(formItems);
    console.log('items');
    console.log(items);
    await saveCurrentState();
  }

  async function loadCurrentSessionData() {
    const response = await getCurrentSessionData();
    if (!isNaN(response.step) && response.items) {
      formItems[0].payload = response.items[0].weights;
      formItems[1].payload.name = response.items[0].name;
      formItems[1].payload.gender = response.items[0].gender;
      formItems[2].payload = response.items[1].weights;
      formItems[3].payload.name = response.items[1].name;
      formItems[3].payload.gender = response.items[1].gender;
      itemIndex.value = response.step;
    }
  }

  async function onDoneItem(payload) {
    formItems[itemIndex.value] = payload
    const currentIndex = itemIndex.value;
    // console.log('payload');
    // console.log(payload.payload);
    await buildCurrentSessionData(payload.payload);

    nextItem();
    if (itemIndex.value == formItems.length) {
      runTopsis()
    }
  }

  function nextItem() {
    itemIndex.value += 1
  }

  function onBack() {
    itemIndex.value -= 1;
  }

  onMounted(async () => {
    await getLocations();
    await loadCurrentSessionData();
  })
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
          :label="criteriaLabel"
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