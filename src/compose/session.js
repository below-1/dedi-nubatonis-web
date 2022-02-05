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

export function useGetSession(options) {
  const url = computed(() => {
    let result = null
    if (options.$id) {
      const id = unref(options.$id)
      result = `/v1/api/sessions/${id}`
    } else if (options.$token) {
      const token = unref(options.$token)
      result = `/v1/api/sessions/${token}`
    }
    return result
  })

  const { 
    result,
    get
  } = useGET({
    url
  })

  return {
    getSession: get,
    sessionResult: result
  }
}

export const defaultWeights = [
  { label: 'jarak', key: 'distance', value: 1 },
  { label: 'transportasi', key: 'transportation', value: 1 },
  { label: 'harga', key: 'price', value: 1 },
  { label: 'tema', key: 'theme', value: 1 },
  { label: 'waktu', key: 'waktu', value: 1 },
  { label: 'jumlah spot', key: 'numberOfSpots', value: 1 }
]

export function mutateArrayWeights({ $session, $gender, $weights }) {
  if (!$session || !$gender) {
    return [];
  }
  const session = unref($session)
  const gender = unref($gender)
  if (!session.weights || !session.weights[gender]) {
    return []
  }
  $weights.forEach(row => {
    row.value = session.weights[gender][row.key];
  })
}

export function useSession({ $id, $token, payload, $gender }) {
  const url = computed(() => {
    const id = unref($id)
    return `/v1/api/sessions/${id}`
  })

  const updateWeightsURL = computed(() => `${url.value}/weights`)

  const { 
    get: loadSession, 
    result: $getResponse,
    onSuccess
  } = useGET({ url });
  const doneLoad = ref(false);

  onSuccess((data) => {
    const gender = unref($gender);
    if (data.weights && data.weights[gender]) {
      const weights = data.weights[gender];
      if (weights) {
        payload.forEach(row => {
          row.value = weights[row.key];
        });
      }
    }
    doneLoad.value = true;
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
  } = usePUT({ 
    url: updateWeightsURL, 
    payload: $updatePayload 
  });

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
    $doneLoad: doneLoad
  }
}