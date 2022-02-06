import { ref } from 'vue'
import imgToBase64 from '@quick/serv/imgToBase64'

export function useBase64Input() {
	const image = ref(null)

	async function imageChangeHandler(file) {
    if (!file) {
      throw new Error('file is undefined');
    }
    const base64 = await imgToBase64( file )
    image.value = base64
  }

  return {
  	image,
  	imageChangeHandler
  }
}

