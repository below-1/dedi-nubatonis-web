import { 
  ref, 
  reactive,
  watch
} from 'vue'
import { api } from '@quick/serv/axios'

export async function useListSpots(options) {
  const params = reactive({
    keyword: '',
    page: 0,
    perPage: 10
  })

  const result = reactive({
    totalData: 23,
    totalPage: 3,
    items: [
    ]
  })

  async function getSpots(params) {

  }

  return {
    params,
    result
  }
}