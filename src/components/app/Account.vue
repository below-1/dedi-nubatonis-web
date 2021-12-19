<script setup>
  import { reactive, inject, unref, onMounted, computed } from 'vue';
  import imgToBase64 from '@quick/serv/imgToBase64'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import { useGET, usePUT } from '@quick/compose/axios'
  import useCurrentUser from '@quick/compose/current-user'

  const {
    currentUser: $currentUser,
    loadUser
  }= useCurrentUser();

  const payload = reactive({
    nama: '',
    avatar: ''
  })

  const avatarLabel = computed(() => {
    if (!payload.avatar) {
      return 'Belum ada foto'
    }
    return payload.avatar
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
    put: updateUser,
    onSuccess: onSuccessUpdate,
    onError: onErrorUpdate
  } = usePUT({
    url: '/auth/me',
    payload
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
        <div>Avatar</div>
        <img v-if="payload.avatar" :src="payload.avatar" class="my-3 p-2 rounded" />
        <file-input @change="avatarChangeHandler" />
      </div>
      <button @click="updateUser" class="btn btn-primary my-2">simpan</button>
    </div>
  </PageContainer>
</template>