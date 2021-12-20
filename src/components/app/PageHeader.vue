<script setup>
  import { computed, unref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import useCurrentUser from '@quick/compose/current-user';
  import { usePOST } from '@quick/compose/axios';

  const props = defineProps({
    title: String,
    subtitle: String
  })

  const route = useRoute()
  const router = useRouter()

  const {
    currentUser,
    loadUser
  } = useCurrentUser();

  const currentSession = computed(() => currentUser.value ? currentUser.value.currentSession : null);

  const {
    post: createSession,
    status: createSessionStatus
  } = usePOST({
    url: '/v1/api/sessions',
    payload: {}
  });

  const showCreateSession = computed(() => {
    console.log(route.fullPath)
    return route.fullPath != '/app/session'
  })

  async function editCurrentSession() {
    const user = unref(currentUser)
    const session = user.currentSession
    router.push(`/app/sessionv3/${session._id}`);
  }

  async function onOpenSession() {
    if (!currentUser.value) {
      return;
    }
    if (!currentUser.value.currentSession) {
      await createSession();
      // Reload user with the new session
      await loadUser();
      const session = currentUser.value.currentSession;
      console.log('session');
      console.log(session);
      // After creating new session...
      router.push(`/app/sessionv3/${session._id}`);
      // console.log('time open new session...');
    }
  }
</script>

<template>
  <div class="py-6 md:py-0 md:h-20 flex flex-col md:flex-row md:items-center px-8 border-b border-gray-200">
    <div class="flex-grow mb-4 md:mb-0">
      <h1 class="text-2xl font-bold text-gray-700" style="line-height: 100%;">{{ title }}</h1>
      <h2 class="text-gray-700">{{ subtitle }}</h2>
    </div>
    <slot name="actions">
    </slot>
    <div class="flex items-center">
      <button 
        v-if="currentSession"
        @click="editCurrentSession"
        class="btn btn-info flex my-2 md:ml-4"
        tag="button"
      >
        <span>edit data bobot anda</span>
      </button>

      <button 
        v-if="showCreateSession"
        @click="onOpenSession"
        class="btn btn-info flex my-2 md:ml-4"
        tag="button"
      >
        <template v-if="createSessionStatus != 'loading'">
          <span>tentukan lokasi</span>
        </template>
        <q-spinner v-else class="w-4 h-4">
        </q-spinner>
      </button>
    </div>
  </div>
</template>