<script setup>
  // Vue
  import { inject, unref, computed } from 'vue';

  // Third Party Libraries
  import { CheckIcon } from '@heroicons/vue/solid'
  import { format } from 'date-fns'
  import { id as localeID } from 'date-fns/locale'

  // SVG Files
  import ManSVG from '@quick/assets/man-svgrepo-com.svg';
  import WomanSVG from '@quick/assets/woman-svgrepo-com.svg';
  import CameraSVG from '@quick/assets/camera.svg';

  // Custom Local Components
  import MemberStat from './MemberStat.vue';
  import MemberChip from './MemberChip.vue';
  import MemberCard from './MemberCard.vue';
  import SessionPopoverActions from './SessionPopoverActions.vue';

  // Composable Functions
  import { useDELETE } from '@quick/compose/axios';
  import useCurrentUser from '@quick/compose/current-user';
  import rank from '@quick/serv/rank';

  const emit = defineEmits([
    'deleted'
  ])

  const props = defineProps({
    session: Object
  })

  const formattedDate = computed(() => {
    const session = props.session
    return format(new Date(session.date), 'PPPP', { locale: localeID })
  })
  const memberKeys = ['man', 'woman', 'photographer'];

  // Mapping for members' icon
  const memberIcons = {
    man: ManSVG,
    woman: WomanSVG,
    photographer: CameraSVG
  }

  // Mapping for members' label
  const memberLabels = {
    man: 'Mempelai Pria',
    woman: 'Mempelai Wanita',
    photographer: 'Fotografer'
  }

  const members = computed(() => {
    return memberKeys.map(key => {
      const member = props.session[key];
      return {
        key,
        icon: memberIcons[key],
        label: memberLabels[key],
        avatar: (member && member.avatar) ? member.avatar : null,
        nama: member ? member.nama : '-- belum menginput --',
        doneInput: props.session.weights && !!props.session.weights[key]
      }
    })
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

  const isAdmin = computed(() => {
    const currentUser = unref($currentUser)
    return currentUser.role == 'admin'
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
    console.log('ON PROMPT DELETE')
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

  async function onRecalc() {
    await rank(props.session.weights)
  }
</script>

<template>
  <li>
    <div class="rounded bg-gray-100 py-2">
      <div class="flex items-center justify-between pb-2 px-4">
        <div class="text-gray-600">{{ formattedDate }}</div>
        <SessionPopoverActions 
          :session="session" 
          @delete="promptDelete"
        />
      </div>
      <div class="flex flex-col flex-grow gap-y-2">
        <MemberChip
          v-for="member in members"
          :key="member.key"
          :label="member.label"
          :icon="member.icon"
          :avatar="member.avatar"
          :nama="member.nama"
          :done-input="member.doneInput"
        />
        <div 
          v-if="session.status == 'DONE'"
          class="bg-indigo-100 px-4 py-2"
        >
          <div class="font-black text-2xl text-indigo-900">{{ session.location.nama }}</div>
          <div class="text-sm text-indigo-900">{{ session.location.latitude }}, {{ session.location.longitude }}</div>
        </div>
      </div>
    </div>

  </li>
</template>
