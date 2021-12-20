<script setup>
  import { inject, unref, computed } from 'vue';
  import ManSVG from '@quick/assets/man-svgrepo-com.svg'
  import WomanSVG from '@quick/assets/woman-svgrepo-com.svg'
  import MemberStat from './MemberStat.vue';
  import MemberCard from './MemberCard.vue';

  const props = defineProps({
    session: Object
  })

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
    <div class="p-2 border-t border-gray-200 flex items-center">
      <div class="flex-grow">
        <p class="font-bold text-gray-600">{{ session.user.nama }}</p>
        <p class="font-bold text-gray-500 text-sm">{{ session.createdAt }}</p>
      </div>
      <button v-if="isOwner" class="btn btn-sm mr-2">hapus</button>
      <router-link 
        :to="`/app/sessionv3/${id}`"
        class="btn btn-info btn-sm">input data {{ title }}</router-link>
    </div>
  </li>
</template>
