import { ref, unref, inject, onMounted, computed } from 'vue'
import { usePUT, useGET } from '@quick/compose/axios'

export function useSession({ $id, payload, $gender }) {
  const url = computed(() => {
    const id = unref($id)
    return `/v1/api/sessions/${id}`
  })

  const { 
    get: loadSession, 
    result: $getResponse,
    onSuccess } = useGET({ url })

  onSuccess((data) => {
    const gender = unref($gender);
    const weights = data.weights[gender];
    if (weights) {
      payload.forEach(row => {
        row.value = weights[row.key];
      });
    }
  });

  const $session = computed(() => {
    const response = unref($getResponse)
    if (response.type != 'data') {
      return null
    }
    return response.data
  })

  const $updatePayload = computed(() => {
    let result = {};
    payload.forEach(it => {
      result[it.key] = it.value;
    });
    return result;
  })

  const { 
    put: updateSession,
    status: $updateStatus,
    onSuccess: onSuccessUpdate,
    onError: onErrorUpdate
  } = usePUT({ url, payload: $updatePayload });

  return {
    loadSession,
    $session,
    onSuccessUpdate,
    onErrorUpdate,
    updateSession,
    $updateStatus,
  }
}