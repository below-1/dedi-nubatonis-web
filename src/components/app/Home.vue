<script setup>
  import { ref } from 'vue'
  import { 
    HeartIcon, 
    LocationMarkerIcon, 
    SearchIcon,
    CameraIcon,
    CollectionIcon,
    InformationCircleIcon,
    CalculatorIcon
  } from '@heroicons/vue/outline'

  const menus = [
    { 
      path: 'find-spot', 
      label: 'Temukan Spot Yang Cocok', 
      icon: SearchIcon, 
      color: 'indigo-500' 
    },
    { 
      path: 'spots', 
      label: 'List Spot', 
      icon: LocationMarkerIcon, 
      color: 'pink-500' 
    },
    { 
      path: 'weights', 
      label: 'Bobot', 
      icon: CalculatorIcon, 
      color: 'yellow-600' 
    },
    { 
      path: 'sessions', 
      label: 'List Sesi', 
      icon: CollectionIcon, 
      color: 'blue-500' 
    },
    { 
      path: 'about', 
      label: 'Tentang Kami', 
      icon: InformationCircleIcon, 
      color: 'green-500' 
    }
  ]
</script>

<template>
  <q-pad-container>
    <nav class="grid grid-cols-2 gap-6 px-4">
      <template v-for="menu in menus" :key="menu.path">
        <router-link 
          :to="'/app/' + menu.path" 
          class="flex flex-col justify-center items-center py-4 text-white rounded"
          :class="[`bg-${menu.color}`]"
        >
          <component :is="menu.icon" class="w-10 h-10" />
          <span class="text-center text-sm">{{ menu.label }}</span>
        </router-link>
      </template>
    </nav>
  </q-pad-container>
  <nav class="flex flex-col items-center justify-center items-center p-8">
  </nav>
</template>