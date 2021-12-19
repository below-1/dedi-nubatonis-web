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
  let _onSuccess = null
  async function post() {
    status.value = 'loading'
    const payload = unref(options.payload)
    try {
      const response = await api.post(unref(options.url), payload)
      status.value = 'idle'
      if (_onSuccess) {
        _onSuccess(response.data)
      }
      return response.data
    } catch (err) {
      console.log(err)
      status.value = 'error'
    }
  }

  return {
    status,
    post,
    onSuccess: (f) => {
      _onSuccess = f
    }
  }
}

export function useGET(options) {
  if (!options.url) {
    throw new Error(`url is undefined`)
  }
  console.log(options.url.value)
  const result = ref({
    type: 'loading'
  })
  const status = ref('idle')
  let _onSuccess = null
  async function get(getOptions) {
    const params = unref(options.params)
    result.value = {
      type: 'loading'
    }
    try {
      const response = await api.get(unref(options.url), { params })
      result.value = {
        type: 'data',
        data: response.data
      }
      if (_onSuccess) {
        _onSuccess(response.data)
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
    result,
    onSuccess: (f) => {
      _onSuccess = f;
    }
  }
}

export function useDELETE(options) {
  const status = ref('idle')
  async function del(url) {
    status.value = 'loading'
    try {
      const response = await api.delete(unref(url))
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
  let _onSuccess = null
  let _onError = null
  async function put() {
    status.value = 'loading'
    try {
      let payload = unref(options.payload)
      if (options.transformPayload) {
        payload = options.transformPayload(payload)
      }
      const response = await api.put(unref(options.url), payload)
      status.value = 'idle'
      if (_onSuccess) {
        _onSuccess(response.dat)
      }
      return response.data
    } catch (err) {
      if (_onError) {
        _onError(err)
      }
      console.log(err)
      status.value = 'error'
    }
  }

  return {
    status,
    put,
    onSuccess: (f) => {
      _onSuccess = f
    },
    onError: (f) => {
      _onError = f
    }
  }
}