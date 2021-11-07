<script setup>
  import { provide } from 'vue'
  import { DefaultApolloClient } from '@vue/apollo-composable'
  import { apollo } from '@quick/serv/apollo'

  provide(DefaultApolloClient, apollo)
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>

<template>
  <div id="main">
    <router-view/>
  </div>
</template>
