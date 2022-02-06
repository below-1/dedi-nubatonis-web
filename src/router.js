import { createRouter, createWebHashHistory } from 'vue-router'

import AuthSignup from '@quick/components/auth/Signup.vue'
import AuthSignupUser from '@quick/components/auth/SignupUser.vue'
import AuthLogin from '@quick/components/auth/Login.vue'
import Landing from '@quick/components/landing/Landing.vue'
import LandingPreferensi from '@quick/components/landing/Preferensi.vue'
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
import LokasiUpdate from '@quick/components/app/lokasi/Update.vue'
import LokasiDetail from '@quick/components/app/lokasi/Detail.vue'

import SessionFormPage from '@quick/components/app/sessionsv2/SessionFormPage.vue'
import SessionNew from '@quick/components/app/sessionsv2/SessionNew.vue'
import NewSession2 from '@quick/components/app/sessions/NewSession2.vue'
import ListSession from '@quick/components/app/sessions/List.vue'
import SessionDetail from '@quick/components/app/sessions/Detail.vue'
import SessionSendWA from '@quick/components/app/sessions/SendWA.vue'
import SessionChoosePhotographer from '@quick/components/app/sessions/SessionChoosePhotographer.vue'
import SessionTokenInput from '@quick/components/app/sessions/SessionTokenInput.vue'

import GuestContainer from '@quick/components/guest/GuestContainer.vue'

import Dashboard from '@quick/components/app/Dashboard.vue'
import Survey from '@quick/components/app/Survey.vue'
import SurveyResult from '@quick/components/app/SurveyResult.vue'

import Account from '@quick/components/app/Account.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/pref', component: LandingPreferensi },
  { path: '/auth/signup', component: AuthSignup },
  { path: '/auth/signup_user', component: AuthSignupUser },
  { path: '/auth/login', component: AuthLogin },
  { path: '/app', component: AppLayout, children: [
    { path: '', component: Dashboard },
    { path: 'account', component: Account },
    { path: 'survey', component: Survey },
    { path: 'survey-result', component: SurveyResult },
    { path: 'dashboard', component: Dashboard },
    { path: 'spots', component: SpotList },
    { path: 'spots/create', component: SpotCreate },
    { path: 'spots/:id', component: SpotDetail, props: true },
    { path: 'spots/:id/confirm-delete', component: SpotConfirmDelete, props: true },
    { path: 'spots/:id/update', component: SpotUpdate, props: true },
    { path: 'fotografer', component: FotograferList },
    { path: 'fotografer/create', component: FotograferCreate },
    { path: 'fotografer/:id/edit', component: FotograferEdit, props: true },
    { path: 'lokasi', component: LokasiList },
    { path: 'lokasi/create', component: LokasiCreate },
    { path: 'lokasi/:id/edit', component: LokasiUpdate, props: true },
    { path: 'lokasi/:id/detail', component: LokasiDetail, props: true },
    { 
      path: 'weights',
      component: WeightEditor
    },
    
    { path: 'sessions/new', component: SessionNew },
    { path: 'sessions/:id', component: SessionDetail, props: true },
    { path: 'sessions/:id/choose-photographer', component: SessionChoosePhotographer, props: true },
    { path: 'session-send-wa/:token', component: SessionSendWA, props: true },
    { 
      path: 'sessionv3/:id',
      component: SessionFormPage,
      props: true
    },
    { 
      path: 'session',
      component: ListSession
    }
  ]},
  {
    path: '/guest',
    component: GuestContainer,
    children: [
      { path: 'token-input/:token', props: true, component: SessionTokenInput },
      { path: 'token-survey/:token', props: true, component: SessionTokenInput },
      { path: 'sessions/:id', component: SessionDetail, props: true }
    ]
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})
