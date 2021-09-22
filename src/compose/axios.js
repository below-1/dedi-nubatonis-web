import { 
  ref, 
  unref,
  reactive,
  watch
} from 'vue'
import { api } from '@quick/serv/axios'

export function usePOST(options) {
  if (!options.url) {
    throw new Error(`url is undefined`)
  }

  const status = ref('idle')
  async function post(payload) {
    status.value = 'loading'
    try {
      const response = await api.post(unref(options.url), payload)
      status.value = 'idle'
      return response.data
    } catch (err) {
      console.log(err)
      status.value = 'error'
    }
  }

  return {
    status,
    post
  }
}

export function useGET(options) {
  if (!options.url) {
    throw new Error(`url is undefined`)
  }
  const result = ref({
    type: 'loading'
  })
  const status = ref('idle')
  async function get(params) {
    let realParams = params ? params : {}
    result.value = {
      type: 'loading'
    }
    try {
      const response = await api.get(unref(options.url), { params: realParams })
      result.value = {
        type: 'data',
        ...response.data
      }
      return response.data
    } catch (err) {
      console.log(err)
      result.value = {
        type: 'error',
        error: err
      }
    }
  }

  return {
    get,
    result
  }
}

export function useDELETE(options) {
  if (!options.url) {
    throw new Error(`url is undefined`)
  }

  const status = ref('idle')
  async function del(payload) {
    status.value = 'loading'
    try {
      const response = await api.delete(unref(options.url))
      status.value = 'idle'
      return response.data
    } catch (err) {
      console.log(err)
      status.value = 'error'
    }
  }

  return {
    status,
    del
  }
}

export function usePUT(options) {
  if (!options.url) {
    throw new Error(`url is undefined`)
  }

  const status = ref('idle')
  async function put(payload) {
    status.value = 'loading'
    try {
      const response = await api.put(unref(options.url), payload)
      status.value = 'idle'
      return response.data
    } catch (err) {
      console.log(err)
      status.value = 'error'
    }
  }

  return {
    status,
    put
  }
}