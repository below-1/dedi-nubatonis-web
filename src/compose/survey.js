import { inject, onMounted, computed, ref } from 'vue'
import { usePOST, useGET } from '@quick/compose/axios'
import { useRouter } from 'vue-router'

export default function useSurvey() {
	const survey = ref(null);
	const {
    get,
    result
  } = useGET({
    url: '/v1/api/survey'
  })

  const status = computed(() => result.value.type);

  async function loadSurvey() {
    const response = await get();
    survey.value = response.survey;
  }

  return {
  	survey,
  	status,
  	loadSurvey
  };
}