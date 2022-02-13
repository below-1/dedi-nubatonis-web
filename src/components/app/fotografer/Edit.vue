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
  import { useBase64Input } from '@quick/compose/base64input'

  const router = useRouter()

  const props = defineProps({
    id: [Number, String]
  })

  const genderOptions = [
    { value: 'man', text: 'Pria' },
    { value: 'woman', text: 'Wanita' }
  ]

  const {
    image,
    imageChangeHandler
  } = useBase64Input()

  const payload = reactive({
    username: '',
    nama: 'dedi nubatonis',
    summary: '',
    facebook: 'abcde',
    instagram: 'abcde'
  })

  const withImage = computed(() => ({
    ...payload,
    avatar: image.value
  }))

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
    console.log('data')
    console.log(data)
    Object.assign(payload, data)
  })

  const {
    status,
    put: updatePhotographer,
    onSuccess: onSuccessUpdate
  } = usePUT({
    url,
    payload: withImage
  })

  onSuccessUpdate(() => {
    alert('sukses mengubah data fotografer')
    // router.back()
  })

  const updatePasswordPayload = reactive({
    password: ''
  })
  const updatePasswordURL = computed(() => `/v1/api/photographers/${props.id}/password`)
  const {
    put: updatePassword,
    status: updatePasswordStatus,
    onSuccess: onSuccessUpdatePassword
  } = usePUT({
    url: updatePasswordURL,
    payload: updatePasswordPayload
  })

  onSuccessUpdatePassword(() => {
    alert('sukses mengubah password')
  })

  onMounted(() => {
    getInitialData()
  })
</script>

<template>
  <PageHeader
    title="Fotografer"
    subtitle="Edit fotografer"
  >
  </PageHeader>
  <PageContainer>
    <div class="flex items-start flex-wrap gap-x-10 gap-y-10">
      <div class="md:w-1/2">
        <form class="form-control bg-white">
          <q-field label="Nama" class="mb-4">
            <q-input v-model="payload.nama" />
          </q-field>
          <q-field label="Gender" class="mb-3">
            <q-select v-model="payload.gender" :options="genderOptions" />
          </q-field>
          <q-field label="Username" class="mb-3">
            <q-input v-model="payload.username" />
          </q-field>
          <q-field label="Info singkat fotografer" class="mb-4">
            <textarea v-model="payload.summary" class="w-full border border-gray-300"></textarea>
          </q-field>
          <q-field label="Facebook" class="mb-4">
            <q-input v-model="payload.facebook" />
          </q-field>
          <q-field label="Instagram" class="mb-4">
            <q-input v-model="payload.instagram" />
          </q-field>
          <q-field label="Avatar" class="mb-4">
            <file-input @change="imageChangeHandler" />
          </q-field>
          <button @click="updatePhotographer" class="btn btn-primary">simpan</button>
        </form>
      </div>
      <div class="w-full md:w-1/2">
        <form>
          <q-field label="Ganti Password" class="mb-4">
            <q-input v-model="updatePasswordPayload.password" />
          </q-field>
          <button @click="updatePassword" class="btn btn-primary">simpan</button>
        </form>
      </div>
    </div>
  </PageContainer>
</template>
