import { ref, unref, inject, onMounted, computed } from 'vue'
import { usePUT, useGET } from '@quick/compose/axios'

export function useSession({ $id, payload }) {
  const url = computed(() => {
    const id = unref($id)
    return `/v1/api/sessions/${id}`
  })

  const { 
    get: loadSession, 
    result: $getResponse,
    onSuccess } = useGET({ url })

  onSuccess((data) => {
    if (data.currentSession) {
      const sess = data.currentSession;
      const gender = data.gender;

      if (sess.weights) {
        const weights = sess.weights[gender];
        payload.forEach(row => {
          row.value = weights[row.key];
        });
      }

      $sessionId.value = sess._id;
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