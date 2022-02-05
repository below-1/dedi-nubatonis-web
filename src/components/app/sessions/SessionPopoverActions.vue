<script setup>
  // Vue
	import { computed, inject, unref } from 'vue';

  // Third Party Libraries
	import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
  import { ChevronDoubleDownIcon } from '@heroicons/vue/solid'

  const props = defineProps({
    session: Object
  })
  const emit = defineEmits([
    'delete'
  ])

  const $currentUser = inject('currentUser');

  // Check current user is target photographer of this session
  const isTargetPhotographer = computed(() => {
    const currentUser = unref($currentUser)
    console.log('currentUser')
    console.log(currentUser)
    if (currentUser.role != 'photographer') {
      return
    }
    if (!props.session.photographer) {
      return
    }

    let result = currentUser._id == props.session.photographer._id
    return result
  })

  function onDelete() {
    console.log('about to emit delete')
    emit('delete')
  }

  const menus = computed(() => {
  	let result = [
  		{ 
  			id: 'choose_photographer', 
  			type: 'link', 
  			path: `/app/sessions/${props.session._id}/choose-photographer`, 
  			label: 'pilih photographer' 
      },
  		{ 
  			id: 'delete_sesi',
  			type: 'button', 
  			label: 'hapus sesi',
        action: onDelete
  		}
  	]
    if (isTargetPhotographer.value) {
      result.push({
        id: 'photographer_input', 
        type: 'link', 
        path: `/app/sessionv3/${props.session._id}`, 
        label: 'input nilai fotografer' 
      })
    }

    return result
  })
</script>

<template>
	<Popover v-slot="{ open }" class="relative">
    <PopoverButton
      :class="open ? '' : 'text-opacity-90'"
      class="inline-flex items-center px-3 py-2 text-base font-medium text-gray-600 bg-orange-700 rounded-md group hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      <ChevronDoubleDownIcon
        :class="open ? '' : 'text-opacity-70'"
        class="w-5 h-5 ml-2 text-orange-300 transition duration-150 ease-in-out group-hover:text-opacity-80"
        aria-hidden="true"
      />
    </PopoverButton>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        class="absolute z-10 w-screen max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl"
      >
        <ul class="w-screen bg-gray-100 shadow-sm">
          <li 
          	v-for="menu in menus"
          	:key="menu.id"
          	class="py-2 px-3 border-b border-gray-300"
          >
          	<router-link 
          		v-if="menu.type == 'link'"
          		:to="menu.path"
          	>
	          	{{ menu.label }}
          	</router-link>
          	<button v-else-if="menu.type == 'button'" @click="menu.action">
          		{{ menu.label }}
          	</button>
         	</li>
        </ul>
      </PopoverPanel>
    </transition>
  </Popover>
</template>