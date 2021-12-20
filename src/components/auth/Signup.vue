<script setup>
  import {
    reactive
  } from 'vue'
  import Container from './Container.vue'
  import { usePOST } from '@quick/compose/axios'
  import { useRouter } from 'vue-router'

  const genderOptions = [
    { value: 'man', text: 'Pria' },
    { value: 'woman', text: 'Wanita' }
  ]

  const payload = reactive({
    nama: '',
    gender: 'man',
    username: '',
    password: '',
    role: 'admin'
  })

  const { post, status } = usePOST({
    url: '/auth/signup',
    payload
  })

  const router = useRouter()

  async function signup() {
    const response = await post()
    router.push('/auth/login')
  }
</script>

<template>
  <Container>
    <div class="card bg-white shadow-2xl">
      <div class="card-body">
        <h2 class="card-title">Daftar untuk masuk kedalam sistem</h2>
        <form>
          <q-field label="Nama" class="mb-3">
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
        </form>
        <div class="justify-center card-actions">
          <button 
            @click="signup"
            class="btn btn-primary"
          >
            <template v-if="status == 'idle'">
              <span>signup</span>
            </template>
            <q-spinner v-else class="w-4 h-4">
            </q-spinner>
          </button>
        </div>
      </div>
    </div>
  </Container>
</template>