<script setup>
  import { ref, provide } from 'vue'
  import { HomeIcon } from '@heroicons/vue/solid'
  import QuickFooter from '@quick/components/QuickFooter.vue'
  import Navigation from './Navigation.vue'
  import {
    Dialog,
    DialogOverlay,
    DialogTitle,
    DialogDescription,
    TransitionRoot,
    TransitionChild
  } from '@headlessui/vue'

  const dialogIsOpen = ref(false)
  const setDialogIsOpen = (v) => { dialogIsOpen.value = v }
  const dialogClose = () => { setDialogIsOpen(false) }
  const dialogOpen = () => { setDialogIsOpen(true) }
  const dialogTitle = ref('')
  const dialogDescription = ref('')
  const dialogOnYes = ref(() => {

  })

  provide('alert', (options) => {
    dialogOnYes.value = async () => {
      await options.onYes()
      dialogClose()
    }
    dialogTitle.value = options.title
    dialogDescription.value = options.description
    dialogIsOpen.value = true
  })
</script>

<style>
  #app-nav {
    background: linear-gradient(to right, #6d28d9, #a65fec);
  }
</style>

<template>
  <nav class="w-64 fixed top-0 bottom-0 left-0 bg-gray-800">
    <router-link 
      to="/app"
      class="block h-20 px-4 font-bold text-xl bg-indigo-900 flex items-center text-gray-100"
    >
      Quick Photography
    </router-link>
    <Navigation/>
  </nav>
  <div id="app-wrapper" class="flex flex-col min-h-screen ml-64">
    <div class="flex-grow flex flex-col">
      <router-view/>
    </div>
    <QuickFooter/>
  </div>

  <TransitionRoot appear :show="dialogIsOpen" as="template">
    <Dialog as="div" @close="dialogClose">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-30"
            leave="duration-200 ease-in"
            leave-from="opacity-30"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{dialogTitle}}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  {{dialogDescription}}
                </p>
              </div>

              <div class="mt-4">
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 mr-2"
                  @click="dialogClose"
                >
                  Batalkan
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ringred-500"
                  @click="dialogOnYes"
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>

</template>