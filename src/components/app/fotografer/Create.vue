<script setup>
  import {
    reactive
  } from 'vue'
  import { useRouter } from 'vue-router'
  import { usePOST } from '@quick/compose/axios'
  import useCreate from '@quick/compose/fotografer/create'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import imgToBase64 from '@quick/serv/imgToBase64'

  const router = useRouter()

  const genderOptions = [
    { value: 'man', text: 'Pria' },
    { value: 'woman', text: 'Wanita' }
  ]

  const payload = reactive({
    username: '',
    password: '',
    nama: 'dedi nubatonis',
    summary: '',
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

  const {
    post,
    status,
    onSuccess
  } = usePOST({
    url: '/v1/api/photographers',
    payload
  })

  onSuccess(() => {
    alert('sukses menambah data fotografer')
    router.back()
  })
</script>

<template>
  <PageHeader
    title="Fotografer"
    subtitle="Tambah fotografer"
  >
    <template #actions>
      <button @click="post" class="btn btn-primary">simpan data</button>
    </template>
  </PageHeader>
  <PageContainer>
    <div class="w-2/5 mx-auto">
      <form class="form-control p-6 bg-white">
        <q-field label="Nama" class="mb-4">
          <q-input v-model="payload.nama" />
        </q-field>
        <q-field label="Gender" class="mb-3">
          <q-select v-model="payload.gender" :options="genderOptions" />
        </q-field>
        <q-field label="Username" class="mb-3">
          <q-input v-model="payload.username" />
        </q-field>
        <q-field label="Password" class="mb-3">
          <q-input type="password" v-model="payload.password" />
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
          <file-input @change="avatarChangeHandler" />
        </q-field>
      </form>
    </div>
  </PageContainer>
</template>
