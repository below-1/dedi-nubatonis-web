import { ref } from 'vue'

export default function useDialog() {
  const open = ref(true)
  const title = ref('')
  const description = ref('')
  const _onYes = ref(null)
  const _onCancel = ref(null)
  return {
    open,
    title,
    description,
    close: () => {
      open.value = false
    },
    show: () => {
      open.value = true
    },
    onYes: (f) => {
      _onYes.value = f
    },
    onCancel: (f) => {
      _onYes.value = f
    }
  }
}