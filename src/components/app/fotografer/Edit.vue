<script setup>
  import {
    reactive,
    onMounted,
    watch
  } from 'vue'
  import { 
    useQuery,
    useResult,
    useMutation
  } from '@vue/apollo-composable'
  import { 
    getOne as GQL_getOne, 
    update as GQL_update 
  } from '@quick/gql/fotografer'
  import useCreate from '@quick/compose/fotografer/create'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'

  const props = defineProps({
    id: Number
  })

  const payload = reactive({
    nama: '',
    description: '',
    facebook: 'abcde',
    instagram: 'abcde'
  })

  const { 
    result: getResult, 
    onResult: onGetResult
  } = useQuery(GQL_getOne, props, {
    fetchPolicy: 'network-only'
  })
  const photographerData = useResult(getResult, data => data.photographer)

  onGetResult(result => {
    console.log('photographerData')
    console.log(photographerData)
    Object.assign(payload, { ...photographerData.value })
  })

  // watch(photographerData, (data) => {
  //   console.log('data')
  //   console.log(data)
  // })

  // const { mutate } = useCreate()
  function createFotografer() {
  }
</script>

<template>
  <PageHeader
    title="Fotografer"
    subtitle="Tambah fotografer"
  >
    <template #actions>
      <button @click="createFotografer" class="btn btn-primary">simpan data</button>
    </template>
  </PageHeader>
  <PageContainer>
    <div class="w-2/5 mx-auto">
      <form class="form-control p-6 bg-white">
        <q-field label="Nama" class="mb-4">
          <q-input v-model="payload.nama" />
        </q-field>
        <q-field label="Info singkat fotografer" class="mb-4">
          <textarea v-model="payload.description" class="w-full border border-gray-300"></textarea>
        </q-field>
        <q-field label="Facebook" class="mb-4">
          <q-input v-model="payload.facebook" />
        </q-field>
        <q-field label="Instagram" class="mb-4">
          <q-input v-model="payload.instagram" />
        </q-field>
      </form>
    </div>
  </PageContainer>
</template>
