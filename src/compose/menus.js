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
    { path: '/app/session', label: 'Session', icon: DocumentIcon },
    // { path: '/app/user', label: 'User', icon: UserIcon, secure: true },
    { path: '/app/weights', label: 'Bobot', icon: DocumentIcon, secure: true }
  ]
  const menus = computed(() => baseMenus.filter(bm => {
    if (!bm.secure) return true;
    const cu = currentUser.value
    return bm.secure && cu && cu.role == 'admin'
  }))

  return {
  	menus
  }
}