import { inject, computed } from 'vue'
import {
    ChartBarIcon,
    UserIcon,
    DocumentIcon,
    LocationMarkerIcon,
    CameraIcon
  } from '@heroicons/vue/solid'

export function useMenus() {
	const currentUser = inject('currentUser')

  const baseMenus = [
    { path: '/app/dashboard', label: 'Dashboard', icon: ChartBarIcon },
    { path: '/app/fotografer', label: 'Fotografer', icon: CameraIcon },
    { path: '/app/lokasi', label: 'Lokasi', icon: LocationMarkerIcon },
    { path: '/app/session', label: 'Session', icon: DocumentIcon }
  ]

  const adminMenus = [
    ...baseMenus,
    { path: '/app/weights', label: 'Bobot', icon: DocumentIcon },
    { path: '/app/survey-result', label: 'Hasil Survey', icon: DocumentIcon }
  ]

  const userMenus = [
    ...baseMenus,
    { path: '/app/survey', label: 'Survey', icon: DocumentIcon }
  ]

  const menus = computed(() => {
    const cu = currentUser.value;
    if (cu && cu.role == 'admin') return adminMenus;
    return userMenus;
  })

  return {
  	menus
  }
}