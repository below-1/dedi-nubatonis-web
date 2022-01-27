<script setup>
  import { inject, unref, computed } from 'vue';
  import { useDELETE } from '@quick/compose/axios';
  import ManSVG from '@quick/assets/man-svgrepo-com.svg'
  import WomanSVG from '@quick/assets/woman-svgrepo-com.svg'
  import MemberStat from './MemberStat.vue';
  import MemberCard from './MemberCard.vue';
  import useCurrentUser from '@quick/compose/current-user';

  const emit = defineEmits([
    'deleted'
  ])

  const props = defineProps({
    session: Object
  })

  const { loadUser } = useCurrentUser();

  const id = computed(() => {
    if (props.session) return props.session._id;
    return null;
  })

  const $currentUser = inject('currentUser');
  const title = computed(() => {
    const currentUser = unref($currentUser);
    if (currentUser.role != 'user') {
      return 'fotografer';
    }
    if (currentUser.gender == 'man') {
      return 'mempelai pria';
    }
    return 'mempelai wanita';
  })

  const isOwner = computed(() => {
    const currentUser = unref($currentUser)
    return currentUser._id == props.session.user._id;
  })

  const isComplete = computed(() => {
    return props.session.complete
  })

  const alert = inject('alert')
  const {
    del,
    status: deleteStatus
  } = useDELETE()

  async function removeItem(id) {
    console.log('here')
    try {
      const response = await del(`/v1/api/sessions/${id}`)
      alert('sukses menghapus data')
    } catch (err) {
      alert('gagal menghapus data')
    }
  }

  function promptDelete() {
    alert({
      title: 'Hapus data session',
      description: 'Apakah anda yakin akan menghapus data sesi',
      onYes: async () => {
        await removeItem(id.value)
        await loadUser()
        emit('deleted')
      }
    })
  }
</script>

<template>
  <li class="rounded bg-white border border-gray-300">
    <div class="p-2 flex items-stretch">
      <MemberCard
        :member="session.man"
        title="Mempelai Pria"
        class="mr-3 w-1/3"
      />
      <MemberCard
        :member="session.woman"
        title="Mempelai Wanita"
        class="mr-3 w-1/3"
      />
      <MemberCard
        :member="session.photographer"
        title="Fotografer"
        class="w-1/3"
      />
    </div>
    <div class="p-2 border-t border-gray-200 flex justify-between items-center">
      <div>
        <p class="font-bold text-gray-600">{{ session.user.nama }}</p>
        <p class="font-bold text-gray-500 text-sm">{{ session.createdAt }}</p>
      </div>
      <div v-if="session.complete" class="">
        <div class="font-bold text-xl">{{ session.location.nama }}</div>
      </div>
      <div class="flex items-center">
        <button v-if="isOwner" @click="promptDelete" class="btn btn-sm mr-2">hapus</button>
        <router-link 
          v-if="!(!isOwner && isComplete)"
          :to="`/app/sessionv3/${id}`"
          class="btn btn-info btn-sm">input data {{ title }}</router-link>
      </div>
    </div>
  </li>
</template>
