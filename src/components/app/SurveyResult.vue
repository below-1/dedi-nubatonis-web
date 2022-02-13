<script setup>
	import { onMounted, reactive, ref, computed } from 'vue';
	import { useGET } from '@quick/compose/axios'
	// import { StarIcon as StarSolid } from '@heroicons/vue/solid'
	// import { StarIcon as StarOutline } from '@heroicons/vue/outline'
	import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import useCurrentUser from '@quick/compose/current-user';

  const MAX_STAR = 5;
  const N_QUESTION = 5;

  const result = ref(null)

  const {
  	result: surveyResult,
  	get: getSurveyResult
  } = useGET({
  	url: '/v1/api/survey/result'
  });

  const presentase = computed(() => {
    if (surveyResult.value.type != 'data') {
      return null;
    }
    const svs = surveyResult.value.data;
    let max = 0;
    const N_question = 15;
    const N_users = svs.length;
    let sh = 0;
    svs.forEach(row => {
      row.survey.forEach(x => {
        sh += x;
        if (x > max) {
          max = x;
        }
      })
    });
    const sk = max * N_question * N_users;
    console.log(`sk=${sk}`);
    console.log(`sh=${sh}`);
    const result = sh / sk;
    return result.toFixed(2) + '%';
  });

  const surveys = computed(() => {
    if (!surveyResult.value.data) {
      return [];
    }
    return surveyResult.value.data.map(it => {
      const n = it.survey.reduce((a, b) => a + b, 0);
      const ratio = n / 60 * 100;
      return {
        ratio,
        ...it
      }
    });

  })

  function calculateUAT(xs, label) {
    let aggregate = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }
    xs.forEach(row => {
      row.forEach(x => {
        aggregate[x] += 1;
      })
    })

    const userVals = Object.keys(aggregate).map(x => {
      return parseInt(x) * aggregate[x];
    });

    const totalStars = Object.keys(aggregate).map(x => {
      return aggregate[x];
    }).reduce((a, b) => a + b, 0);

    const totalSkor = userVals.reduce((a, b) => a + b, 0);

    const Y = MAX_STAR * totalStars;
    const X = 1 * totalStars;

    const index = (totalSkor * 1.0 / Y) * 100.0;

    return {
      xs,
      Y,
      X,
      totalSkor,
      totalStars,
      index,
      label
    }
  }

	onMounted(async () => {
    const response = await getSurveyResult();
    if (!response || response.length == 0) return [];

    const Survs = response.map(r => r.survey)

    let XuserFriendly = []
    let Xfungsional = []

    Survs.forEach(row => {
      const userFriendly = row.slice(0, 5);
      const fungsional = row.splice(5)
      XuserFriendly.push(userFriendly)
      Xfungsional.push(fungsional)
    })

    const UAT_Result_UF = calculateUAT(XuserFriendly, 'User Friendly')
    const UAT_Result_F = calculateUAT(Xfungsional, 'Fungsionalitas')

    result.value = [
      UAT_Result_UF,
      UAT_Result_F
    ]
    // console.log(UAT_Result_UF)
    // console.log(UAT_Result_F)
  });
</script>

<template>
	<PageHeader
    title="Survey"
    subtitle="Hasil Survey User"
  >
  </PageHeader>
  <PageContainer>
  	<div class="w-full md:w-4/5 mx-auto">
  		<div class="text-center text-2xl font-bold">
  			Hasil Pengujian UAT
  		</div>
  		<ul class="my-6">
        <li 
          v-for="row in result"
          class="flex items-center border-b border-gray-200 py-4"
        >
          <div class="w-1/5 font-bold">{{ row.label }}</div>
          <div class="w-3/5 flex">
            <div class="bg-green-500 rounded h-4" :style="`width: ${row.index.toFixed(2)}%`"></div>
          </div>
          <div class="w-1/5 font-bold">{{ row.index.toFixed(2) }}%</div>
        </li>
  		</ul>

      <div v-for="part in result" class="my-6">
        <h1 class="text-xl font-bold">{{ part.label }}</h1>
        <table class="table w-full table-compact">
          <tbody>
            <tr v-for="xs, i in part.xs">
              <td>{{ surveyResult.data[i].nama }}</td>
              <td v-for="x, j in xs" :key="`${part.label}-${i}-${j}`">{{ x }}</td>
            </tr>
          </tbody>
        </table>
      </div>

  	</div>
  </PageContainer>
</template>