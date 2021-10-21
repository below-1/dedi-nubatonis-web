import { createRouter, createWebHashHistory } from 'vue-router'

import AuthSignup from '@quick/components/auth/Signup.vue'
import AuthLogin from '@quick/components/auth/Login.vue'
import Landing from '@quick/components/landing/Landing.vue'
import AppLayout from '@quick/components/app/AppLayout.vue'
import Home from '@quick/components/app/Home.vue'
import SpotList from '@quick/components/app/spot/List.vue'
import SpotCreate from '@quick/components/app/spot/Create.vue'
import SpotDetail from '@quick/components/app/spot/SpotDetail.vue'
import SpotConfirmDelete from '@quick/components/app/spot/ConfirmDelete.vue'
import SpotUpdate from '@quick/components/app/spot/Update.vue'
import WeightEditor from '@quick/components/app/weights/WeightEditor.vue'
import FotograferList from '@quick/components/app/fotografer/List.vue'
import FotograferCreate from '@quick/components/app/fotografer/Create.vue'
import FotograferEdit from '@quick/components/app/fotografer/Edit.vue'
import LokasiList from '@quick/components/app/lokasi/List.vue'
import LokasiCreate from '@quick/components/app/lokasi/Create.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/auth/signup', component: AuthSignup },
  { path: '/auth/login', component: AuthLogin },
  { path: '/app', component: AppLayout, children: [
    { path: '', component: Home },
    { path: 'spots', component: SpotList },
    { path: 'spots/create', component: SpotCreate },
    { path: 'spots/:id', component: SpotDetail, props: true },
    { path: 'spots/:id/confirm-delete', component: SpotConfirmDelete, props: true },
    { path: 'spots/:id/update', component: SpotUpdate, props: true },
    { path: 'fotografer', component: FotograferList },
    { path: 'fotografer/create', component: FotograferCreate },
    { path: 'fotografer/:id/edit', component: FotograferEdit, 
      props: route => ({ id: parseInt(route.params.id) })
    },
    { path: 'lokasi', component: LokasiList },
    { path: 'lokasi/create', component: LokasiCreate },
    { 
      path: 'weights',
      component: WeightEditor
    }
  ]}
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
