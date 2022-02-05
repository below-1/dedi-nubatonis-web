<script setup>
  import { provide, ref } from 'vue'
  import { DefaultApolloClient } from '@vue/apollo-composable'
  import { apollo } from '@quick/serv/apollo'

  const currentUser = ref(null)

  provide('currentUser', currentUser)
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>

<template>
  <div id="main" class="w-screen">
  	<!-- <h1>Hallo</h1> -->
    <router-view/>
  </div>
</template>
