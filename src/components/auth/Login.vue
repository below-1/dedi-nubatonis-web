<script setup>
  import {
    reactive
  } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMutation } from '@vue/apollo-composable'
  import Container from './Container.vue'
  import { login as GQL_login } from '@quick/gql/auth'

  const payload = reactive({
    username: '',
    password: ''
  })

  const router = useRouter()

  const { 
    mutate: login, 
    loading: loginLoading,
    onDone
  } = useMutation(GQL_login, () => ({
    variables: {
      payload
    }
  }))

  onDone((result) => {
    localStorage.setItem('quick.token', result.data.login)
    router.push('/app')
  })
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
            <template v-if="!loginLoading">
              <span>login</span>
            </template>
            <q-spinner v-else class="w-4 h-4">
            </q-spinner>
          </button>
        </div>
      </div>
    </div>
  </Container>
</template>