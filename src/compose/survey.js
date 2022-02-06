import { computed, reactive, ref, unref } from 'vue'
import { usePOST, useGET } from '@quick/compose/axios'
import { useRouter } from 'vue-router'

export const questions = [
  'Saya mudah mempelajari cara menggunakan Aplikasi pemilihan loksi pre-wedding',
  'Saya menggunakan Apliakasi pemilihan lokasi pre-wedding untuk mempermudah pekerjaan saya',
  'Saya dapat berinteraksi dengan Aplikasi pemeilihan lokasi pre-wedding dengan jelas',
  'Saya dapat menggunakan Apliaksi pemilihan lokasi pre-wedding  dengan mudah',
  'Saya beranggapan bahwa Aplikasi pemilihan lokasi pre-wedding merupakan program yang fleksibel',
  'Saya mampu mengerjakan pekerjaan lebih cepat  dengan Aplikasi pemilihan lokasi pre-wedding',
  'Saya beranggapan bahwa pekerjaan saya menjadi lebih mudah dengan menggunakan Aplikasi pemilihan lokasi pre-wedding',
  'Saya dapat meningkatkan produktivitas kerja dengan Aplikasi pemilihan lokasi pre-wedding',
  'Saya beranggapan bahwa Aplikasi pemilihan lokasi pre-wedding dapat berguna untuk saya',
  'Saya nyaman menggunakan Apliakasi pemilihan loksi pre-wedding',
  'Saya menikmati penggunaan Aplikasi pemilihan lokasi Pre-wedding',
  'saya beranggapan bahwa Aplikasi pemilihan lokasi pre-wedding tidak membosankan',
  'Aplikasi pemilihan lokasi pre-wedding menyediakan informasih yang saya butuhkan',
  'Aplikasi pemilihan lokasi pre-wedding menyediakan informasih yang akurat',
  'Saya menggunakan Aplikasi pemilihan lokasi pre-wedding dalam durasi waktu yang panjang'
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

  const answers = reactive(questions.map((x, i) => {
    return 4;
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
  	loadSurvey,
    updateSurvey,
    updateResult,
    questions
  };
}