import { ref, unref, inject, onMounted, computed } from 'vue'
import { usePUT, useGET } from '@quick/compose/axios'
import useCurrentUser from '@quick/compose/current-user';
import { api } from '@quick/serv/axios';
import rank from '@quick/serv/rank';

async function updateSessionResult({ id, location, borda }) {
  const url = `/v1/api/sessions/${id}/result`;
  try {
    const response = await api.put(url, {
      location,
      borda
    })
  } catch (err) {
    console.log(err);
    alert('gagal menyimpan hasil sistem');
  }
}

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

  const {
    loadUser
  } = useCurrentUser();

  const decoratedOnSuccess = (f) => {
    const decorated = async (response) => {
      console.log('response')
      console.log(response)
      if (response.complete) {
        const rankResult = await rank(response.weights);
        console.log(rankResult);
        await updateSessionResult({
          id: $id.value,
          ...rankResult
        })
        await loadUser();
      }
      return f(response);
    }
    onSuccessUpdate(decorated);
  }

  return {
    loadSession,
    $session,
    onSuccessUpdate: decoratedOnSuccess,
    onErrorUpdate,
    updateSession,
    $updateStatus,
  }
}