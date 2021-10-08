<script setup>
  import {
    reactive
  } from 'vue'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'

  const payload = reactive({
    nama: '',
    facebook: '',
    instagram: ''
  })
</script>

<template>
  <PageHeader
    title="Fotografer"
    subtitle="Tambah fotografer"
  >
    <template #actions>
      <button class="btn btn-primary">simpan data</button>
    </template>
  </PageHeader>
  <PageContainer>
    <div class="w-2/5 mx-auto">
      <form class="form-control p-6 bg-white">
        <q-field label="Nama" class="mb-4">
          <q-input v-model="payload.nama" />
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
