<script setup>
	import { inject } from 'vue'
	import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import SessionDetail from '@quick/components/app/sessions/SessionDetail.vue'

  const session = inject('guestSession')
</script>

<template>
	<PageHeader
    title="Session"
    subtitle="Detail Session"
  >
  </PageHeader>
 	<PageContainer>
 		<SessionDetail :session="session" />
 	</PageContainer>
</template>
