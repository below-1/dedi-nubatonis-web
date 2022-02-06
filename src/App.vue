<script setup>
  import { provide, ref } from 'vue'
  import { DefaultApolloClient } from '@vue/apollo-composable'
  import { apollo } from '@quick/serv/apollo'

  import QuickNotif from '@quick/components/QuickNotif.vue'
  import { useNotification } from '@quick/compose/notification'

  const currentUser = ref(null)
  const notification = useNotification()

  provide('currentUser', currentUser)
  provide('notification.show', (options) => {
    notification.open = true
    notification.title = options.title
    notification.description = options.description
    notification.okLabel = options.okLabel
    notification.onOk = options.onOk
  })

</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>

<template>
  <div id="main" class="w-screen">
  	<!-- <h1>Hallo</h1> -->
    <QuickNotif 
      v-model="notification.open"
      :title="notification.title"
      :description="notification.description"
      :ok-label="notification.okLabel"
      :on-ok="notification.onOk"
    />
    <router-view/>
  </div>
</template>
