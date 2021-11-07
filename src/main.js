import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { router } from './router'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full.css'

import InlineSvg from 'vue-inline-svg'

import QuickPageHeader from '@quick/components/QuickPageHeader.vue'
import QuickField from '@quick/components/QuickField.vue'
import QuickInput from '@quick/components/QuickInput.vue'
import QuickSelect from '@quick/components/QuickSelect.vue'
import QuickFormButton from '@quick/components/QuickFormButton.vue'
import QuickPadContainer from '@quick/components/QuickPadContainer.vue'
import QuickActionBar from '@quick/components/QuickActionBar.vue'
import QuickLoadingPane from '@quick/components/QuickLoadingPane.vue'
import QuickLoading from '@quick/components/QuickLoading.vue'
import QuickConfirmDelete from '@quick/components/QuickConfirmDelete.vue'
import QuickSpinner from '@quick/components/QuickSpinner.vue'
import FileInput from '@quick/components/FileInput.vue'

createApp(App)
  .use(Oruga)
  .use(router)
  // Registering global components
  .component('q-page-header', QuickPageHeader)
  .component('q-field', QuickField)
  .component('q-input', QuickInput)
  .component('q-select', QuickSelect)
  .component('q-form-btn', QuickFormButton)
  .component('q-pad-container', QuickPadContainer)
  .component('q-action-bar', QuickActionBar)
  .component('q-loading-pane', QuickLoadingPane)
  .component('q-loading', QuickLoading)
  .component('q-confirm-delete', QuickConfirmDelete)
  .component('q-spinner', QuickSpinner)
  .component('file-input', FileInput)
  .component('inline-svg', InlineSvg)
  .mount('#app')
