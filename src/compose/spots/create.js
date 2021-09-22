import { 
  ref, 
  reactive,
  watch
} from 'vue'
import { usePOST } from '@quick/serv/axios'

export function useCreateSpot(options) {
  const payload = reactive({
    name: '',
    c1: 1,
    c2: 1,
    c3: 1,
    c4: 1,
    c5: 1,
    c6: 1
  })
  const {
    post,
    status
  } = usePOST('/spot')

  async function createSpot() {
    post(payload)
  }

  return {
    payload,
    status,
    createSpot
  }
}