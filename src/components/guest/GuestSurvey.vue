<script setup>
	import { inject, computed } from 'vue';
	import { StarIcon as StarSolid } from '@heroicons/vue/solid'
	import { StarIcon as StarOutline } from '@heroicons/vue/outline'
	import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import SurveyForm from '@quick/components/app/SurveyForm.vue'
  import useCurrentUser from '@quick/compose/current-user';

  const guestUser = inject('guestUser');

  const userId = computed(() => guestUser.value ? guestUser.value._id : null);
</script>

<template>
	<PageHeader
    title="Survey"
    subtitle="Bantu kami dengan menjawab pertanyaan dibawah ini"
  >
  </PageHeader>
  <PageContainer>
  	<SurveyForm v-if="guestUser" :id="userId" />
    <div v-else>
      Anda belum menginput data bobot
    </div>
  </PageContainer>
</template>