import { ref, unref, inject, onMounted, computed } from 'vue'
import { usePUT, useGET } from '@quick/compose/axios'

export function useCurrentSession({ payload }) {
  const {
    get: getCurrentUser,
    result: $response,
    onSuccess
  } = useGET({
    url: '/auth/me'
  });

  const $sessionId = ref(null);

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

  const $updatePayload = computed(() => {
    let result = {};
    payload.forEach(it => {
      result[it.key] = it.value;
    });
    return result;
  })

  const $updateURL = computed(() => {
    const sessionId = unref($sessionId);
    if (!sessionId) {
      return '';
    }
    return `/v1/api/sessions/${sessionId}`
  });

  const {
    put: updateSession,
    status: $updateStatus,
    onSuccess: onSuccessUpdate,
    onError: onErrorUpdate
  } = usePUT({
    url: $updateURL,
    payload: $updatePayload
  })

  onMounted(getCurrentUser);

  return {
    updateSession,
    $updateStatus,
    onSuccessUpdate,
    onErrorUpdate
  }
}