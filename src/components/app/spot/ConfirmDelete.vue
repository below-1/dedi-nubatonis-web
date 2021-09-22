<script setup>
  import { 
    onMounted, 
    computed,
    unref
  } from 'vue'
  import { useRouter } from 'vue-router'
  import { ChevronLeftIcon } from '@heroicons/vue/outline'
  import { ExclamationIcon } from '@heroicons/vue/solid'
  import { 
    useDELETE,
    useGET
  } from '@quick/compose/axios'

  const props = defineProps({
    id: String
  })
  const url = computed(() => `/spots/${props.id}`)
  const { status, del } = useDELETE({ url })
  const { result: getResult, get } = useGET({ url })

  const title = computed(() => {
    const res = unref(getResult)
    return res.type == 'data' ? res.name : '---'
  })

  const router = useRouter()

  async function onDelete() {
    await del()
    router.push('/app/spots')
  }

  function onBack() {
    router.back()
  }

  onMounted(get)
</script>

<template>
  <q-confirm-delete 
    v-if="getResult.type == 'data'"
    :name="title"
    @delete="onDelete"
    @cancel="onBack"
  >
  </q-confirm-delete>
  <q-loading-pane v-else>
  </q-loading-pane>
</template>
