<script setup>
  import {
    reactive,
    onMounted,
    watch,
    computed
  } from 'vue'
  import {
    useGET,
    usePUT
  } from '@quick/compose/axios'
  import { useRouter } from 'vue-router'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import imgToBase64 from '@quick/serv/imgToBase64'

  const router = useRouter()

  const props = defineProps({
    id: [Number, String]
  })

  const payload = reactive({
    nama: '',
    description: '',
    facebook: 'abcde',
    instagram: 'abcde',
    avatar: ''
  })

  async function avatarChangeHandler(event) {
    let files = event.target.files || event.dataTransfer.files;
    if (!files.length) {
      return;
    }
    const base64 = await imgToBase64( files[0] )
    payload.avatar = base64
  }

  const url = computed(() => `/v1/api/photographers/${props.id}`)
  const {
    get: getInitialData,
    onSuccess: onSuccessGetInitialData
  } = useGET({
    url
  })

  onSuccessGetInitialData((data) => {
    Object.assign(payload, data)
  })

  const {
    status,
    put: updatePhotographer,
    onSuccess: onSuccessUpdate
  } = usePUT({
    url,
    payload
  })

  onSuccessUpdate(() => {
    alert('sukses mengubah data fotografer')
    router.back()
  })

  onMounted(() => {
    getInitialData()
  })
</script>

<template>
  <PageHeader
    title="Fotografer"
    subtitle="Tambah fotografer"
  >
    <template #actions>
      <button @click="updatePhotographer" class="btn btn-primary">simpan data</button>
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
        <q-field label="Avatar" class="mb-4">
          <file-input @change="avatarChangeHandler" />
        </q-field>
      </form>
    </div>
  </PageContainer>
</template>
