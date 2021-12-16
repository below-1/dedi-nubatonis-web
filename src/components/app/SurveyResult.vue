<script setup>
	import { onMounted, reactive, ref, computed } from 'vue';
	import { useGET } from '@quick/compose/axios'
	// import { StarIcon as StarSolid } from '@heroicons/vue/solid'
	// import { StarIcon as StarOutline } from '@heroicons/vue/outline'
	import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import useCurrentUser from '@quick/compose/current-user';

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

	onMounted(getSurveyResult);
</script>

<template>
	<PageHeader
    title="Survey"
    subtitle="Hasil Survey User"
  >
  </PageHeader>
  <PageContainer>
  	<div class="w-2/3 mx-auto">
  		<div class="text-center text-2xl font-bold">
  			Presentase Hasil Survey: {{ presentase }}
  		</div>
  		<ul class="my-6">
        <li 
          v-for="user in surveys"
          class="flex items-center border-b border-gray-200 py-4"
        >
          <div class="w-1/4 font-bold">{{ user.nama }}</div>
          <div class="w-3/4 flex">
            <div class="bg-green-500 rounded h-4" :style="`width: ${user.ratio.toFixed(2)}%`"></div>
          </div>
        </li>
  		</ul>
  	</div>
  </PageContainer>
</template>