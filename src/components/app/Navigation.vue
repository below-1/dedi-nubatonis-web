<script setup>
  import {
    ChartBarIcon,
    UserIcon,
    DocumentIcon,
    LocationMarkerIcon,
    CameraIcon
  } from '@heroicons/vue/solid'
  const menus = [
    { path: '/app/dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { path: '/app/fotografer', label: 'Fotografer', icon: CameraIcon },
    { path: '/app/lokasi', label: 'Lokasi', icon: LocationMarkerIcon },
    { path: '/app/user', label: 'User', icon: UserIcon },
    { path: '/app/weights', label: 'Bobot', icon: DocumentIcon }
  ]
</script>

<template>
  <ul>
    <li v-for="menu in menus" :key="menu.path">
      <router-link 
        :to="menu.path"
        class="flex items-center justify-start py-4 px-4 text-gray-200 hover:bg-gray-600" 
      >
        <template v-if="menu.icon">
          <component :is="menu.icon" class="mr-4 w-6 h-6"/>
        </template>
        <span class="lowercase text-lg font-bold">{{ menu.label }}</span>
      </router-link>
    </li>
  </ul>
</template>
