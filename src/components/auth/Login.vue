<script setup>
  import {
    reactive,
    computed,
    ref,
    unref,
    inject
  } from 'vue'
  import { useRouter } from 'vue-router'
  import { usePOST, useGET } from '@quick/compose/axios'
  import Container from './Container.vue'

  const payload = reactive({
    username: '',
    password: ''
  })
  const currentUser = inject('currentUser')

  const router = useRouter()
  const { post, status, error } = usePOST({
    url: '/auth/login',
    payload
  })
  const errorMessage = computed(() => {
    const err = unref(error);
    if (!err) return null;
    if (!err.response) return 'terjadi kesalahan';
    if (!err.response.data) return 'terjadi kesalahan';
    const errorData = err.response.data;
    const code = errorData.code;
    switch (code) {
      case 'FST_PASSWORD_NOT_MATCH': return 'Password tidak cocok';
      case 'FST_USER_NOT_FOUND': return 'Username tidak ditemukan';
      default: return 'terjadi kesalahan';
    }
  })
  const buttonLoading = computed(() => status.value == 'loading')

  const {
    get: getCurentUser
  } = useGET({
    url: '/auth/me'
  })

  async function login() {
    const response = await post()
    
    if (response) {
      await localStorage.setItem('quick.token', response)
      const user = await getCurentUser()
      currentUser.value = user
      setTimeout(() => {
        router.push('/app')
      }, 2000)
    } else {
      setTimeout(() => {
        alert(errorMessage.value)
      }, 500)
    }
  }
</script>

<template>
  <Container>
    <div class="card bg-white shadow-2xl">
      <div class="card-body">
        <h2 class="card-title">Login untuk masuk kedalam sistem</h2>
        <h4 v-if="errorMessage" class="text-red-600 font-bold">{{ errorMessage }}</h4>
        <form>
          <q-field label="Username" class="mb-3">
            <q-input v-model="payload.username" />
          </q-field>
          <q-field label="Password" class="mb-3">
            <q-input type="password" v-model="payload.password" />
          </q-field>
        </form>
        <div class="justify-center card-actions">
          <button 
            @click="login"
            class="btn btn-primary"
          >
            <template v-if="!buttonLoading">
              <span>login</span>
            </template>
            <q-spinner v-else class="w-4 h-4">
            </q-spinner>
          </button>
        </div>
        <div class="flex-col justify-center items-center card-actions">
          <h4>Belum Punya Akun?</h4>
          <router-link to="/auth/signup_user" class="underline font-bold text-blue-800">Daftar</router-link>
        </div>
      </div>
    </div>
  </Container>
</template>