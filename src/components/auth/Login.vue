<script setup>
  import {
    reactive,
    ref,
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
  const { post, status } = usePOST({
    url: '/auth/login',
    payload
  })
  const buttonLoading = ref(false)

  const {
    get: getCurentUser
  } = useGET({
    url: '/auth/me'
  })

  async function login() {
    buttonLoading.value = true
    const response = await post()
    localStorage.setItem('quick.token', response)
    const user = await getCurentUser()
    currentUser.value = user
    setTimeout(() => {
      buttonLoading.value = false
      router.push('/app')
    }, 2000)
  }
</script>

<template>
  <Container>
    <div class="card bg-white shadow-2xl">
      <div class="card-body">
        <h2 class="card-title">Login untuk masuk kedalam sistem</h2>
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
          <router-link to="/auth/signup" class="underline font-bold text-blue-800">Daftar</router-link>
        </div>
      </div>
    </div>
  </Container>
</template>