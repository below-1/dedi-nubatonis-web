import { ref, reactive } from 'vue'

export function useNotification() {
	return reactive({
		open: false,
		title: '',
		description: '',
		okLabel: 'lanjutkan',
		onOk: null
	})

}