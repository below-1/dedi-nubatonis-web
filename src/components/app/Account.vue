<script setup>
  import { reactive, inject, unref, onMounted, computed } from 'vue';
  import imgToBase64 from '@quick/serv/imgToBase64'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import { useGET, usePUT } from '@quick/compose/axios'
  import useCurrentUser from '@quick/compose/current-user'
  import { useBase64Input } from '@quick/compose/base64input'

  const {
    image,
    imageChangeHandler
  } = useBase64Input()

  const {
    currentUser: $currentUser,
    loadUser
  }= useCurrentUser();


  const payload = reactive({
    nama: ''
  })
  const withImage = computed(() => ({
    ...payload,
    avatar: image.value
  }))

  const {
    put: updateUser,
    status: updateStatus,
    onSuccess: onSuccessUpdate,
    onError: onErrorUpdate
  } = usePUT({
    url: '/auth/me',
    payload: withImage
  })

  onSuccessUpdate(async data => {
    await loadUser();
    alert('sukses mengubah data user');
  })

  onErrorUpdate(data => {
    alert('gagal mengubah data user')
  })

  onMounted(() => {
    const currentUser = unref($currentUser);
    payload.nama = currentUser.nama;
    payload.avatar = currentUser.avatar;
  })
</script>

<template>
  <PageHeader
    title="Dashboard"
    subtitle="Rangkuman Session"
  >
  </PageHeader>
  <PageContainer>
    <h1 class="font-bold text-xl my-4">Informasi Akun Anda</h1>
    <div class="w-4/5 p-4 border border-gray-300 rounded">
      <q-field label="Nama" class="mb-4">
        <q-input v-model="payload.nama" />
      </q-field>
      <div class="mb-4">
        <q-field label="Avatar" class="mb-4">
          <file-input @change="imageChangeHandler" />
        </q-field>
      </div>
      <button 
        @click="updateUser" 
        :disabled="updateStatus == 'loading'" 
        class="btn btn-primary my-2"
      >
        <template v-if="updateStatus != 'loading'">
          <span>simpan</span>
        </template>
        <q-spinner v-else class="w-4 h-4">
        </q-spinner>
      </button>
    </div>
  </PageContainer>
</template>