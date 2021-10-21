<script setup>
  import {
    reactive
  } from 'vue'
  import { useMutation } from '@vue/apollo-composable'
  import Container from './Container.vue'
  import { signup as GQL_signup } from '@quick/gql/auth'

  const payload = reactive({
    nama: '',
    username: '',
    password: ''
  })

  const { 
    mutate: signup, 
    loading: signupLoading 
  } = useMutation(GQL_signup, () => ({
    variables: {
      payload
    }
  }))
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
            <template v-if="!signupLoading">
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