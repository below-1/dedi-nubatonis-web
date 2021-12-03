import { inject, onMounted, computed } from 'vue'
import { usePOST, useGET } from '@quick/compose/axios'
import { useRouter } from 'vue-router'

export default function useCurrentUser() {
	const currentUser = inject('currentUser');
	const {
    get,
    result
  } = useGET({
    url: '/auth/me'
  })

  const status = computed(() => result.value.type);
  const router = useRouter();

  onMounted(async () => {
  	const user = await get();
  	if (!user) {
  		router.replace('/auth/login');
  		return;
  	}
  	currentUser.value = user;
  });

  return {
  	currentUser,
  	status
  };
}