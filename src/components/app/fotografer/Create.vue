<script setup>
  import {
    reactive
  } from 'vue'
  import useCreate from '@quick/compose/fotografer/create'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'

  const payload = reactive({
    nama: 'dedi nubatonis',
    description: '',
    facebook: 'abcde',
    instagram: 'abcde'
  })

  const { mutate } = useCreate()
  function createFotografer() {
    mutate({
      payload
    })
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
