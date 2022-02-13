<script setup>
	// Vue
	import {
    ref,
    unref,
    toRef,
    computed,
    provide,
    onMounted
  } from 'vue'

  // External Components
  import { MenuIcon } from '@heroicons/vue/solid'

  // Internal Components
  import QuickFooter from '@quick/components/QuickFooter.vue'

  // Internal Composables
  import { useGetSessionByToken } from '@quick/compose/session'

  const props = defineProps({
    token: String
  })
  const token = toRef(props, 'token')

  const {
    session,
    loadSessionByToken,
    sessionResult,
    loadStatus
  } = useGetSessionByToken({ token })

  // Keep track of guest user
  const guestUser = ref(null)
  const sessionCreator = computed(() => {
    if (!session) return null;
    return session.value.user;
  })

  provide('guestUser', guestUser)
  provide('guestSession', session)
  provide('sessionCreator', sessionCreator)

	const menus = computed(() => {
    let result = [
      { path: `/`, label: 'home' },
    ]
    const sessionResultValue = unref(sessionResult)
    if (sessionResultValue.type != 'data') {
      return result
    }
    const sessionValue = sessionResultValue.data
    if (sessionValue && sessionValue.token) {
      result = [
        ...result,
        { path: `/guest/${sessionValue.token}/token-input`, label: 'input' },
        { path: `/guest/${sessionValue.token}/token-survey`, label: 'survey' },
        { path: `/guest/${sessionValue.token}/detail`, label: 'detail' }
      ]
    }
    return result
  })

  const showMobileMenu = ref(false)

  function toggleMobileMenu() {
  	showMobileMenu.value = !showMobileMenu.value
  }

  onMounted(async () => {
    const response = await loadSessionByToken()
    if (!response) return

    if (response.man && response.man.role == 'spouse') {
      guestUser.value = response.man
    } else if (response.woman && response.woman.role == 'spouse') {
      guestUser.value = response.woman
    }
  })
</script>

<template>
	<nav class="w-4/5 h-28 flex items-center mx-auto">
    <h1 class="flex-grow font-black text-2xl"><span class="text-pink-600">quick</span> photography</h1>
    <div class="hidden md:flex w-2/5 items-center justify-between">
      <router-link
        class="hover:text-pink-400 text-pink-700 font-bold" 
        v-for="menu in menus" 
        :key="menu.label"
        :to="menu.path"
      >
        {{ menu.label }}
      </router-link>>
    </div>
    <button class="md:hidden p-2" @click="toggleMobileMenu">
      <MenuIcon class="w-6 h-6 text-black"/>
    </button>
  </nav>  
  <nav v-if="showMobileMenu" class="flex flex-col text-white px-8">
    <router-link
      class="hover:text-pink-400 text-pink-800 font-bold text-xl text-left mb-4" 
      v-for="menu in menus" 
      :key="menu.label"
      :to="menu.path"
    >
      {{ menu.label }}
    </router-link>
  </nav>

  <q-spinner v-if="sessionResult.type == 'loading'" />
  <div v-else-if="sessionResult.type == 'data'" class="w-full md:w-4/5 md:mx-auto">
    <router-view/>
  </div>

  <QuickFooter/>
  <div class="py-6 bg-gray-100 text-center">
    <router-link to="/auth/login" class="font-bold text-blue-600">login Admin</router-link>
  </div>
</template>