import { computed, reactive, ref, unref } from 'vue'
import { usePOST, useGET } from '@quick/compose/axios'
import { useRouter } from 'vue-router'

export const questions = [
  'Apakah tampilan pada aplikasi ini menarik ?',
  'Apakah tampilan menu pada aplikasi ini sesui dengan yang diharapkan ?',
  'Apakah tampilan menu login pada aplikasi ini sesuai dengan yang diharapkan ?',
  'Apakah tampilan menu pada aplikasi ini sesuai dengan yang diharapkan?',
  'Apakah komposisi warna pada aplikasi ini menarik?',
  'Apakah aplikasi ini sesuai dengan yang diharapkan ?',
  'Apakah aplikasi ini pada saat dijalankan terdapat eror ?',
  'Apakah aplikasi ini saat dijalankan tidak terdapat menu yang tidak berjalan ? ',
  'Apakah aplikasi ini cocok diterapkan di tempat kerja?',
  'Apakah aplikasi ini bersifat user friendly (mudah digunakan) ?',
];

export function useSurvey(options) {
  const url = computed(() => {
    const userId =unref(options.userId)
    if (!userId) {
      throw new Error('unknown userId')
    }
    let result =  `/v1/api/survey/${userId}`
    return result
  })

	const { 
    get: loadSurvey, 
    result: surveyResult
  } = useGET({ url })

  const survey = computed(() => surveyResult.value.type == 'data' ? surveyResult.value.data.survey : null)

  const answers = reactive(questions.map((x, i) => {
    return 5;
  }));

  const payload = computed(() => {
    return {
      answers
    }
  })

  const {
    post: updateSurvey,
    result: updateResult
  } = usePOST({
    url,
    payload
  })

  return {
    answers,
  	surveyResult,
    survey,
  	loadSurvey,
    updateSurvey,
    updateResult,
    questions
  };
}