<script setup>
  import { computed, toRef, unref } from 'vue';

  const props = defineProps({
    member: Object,
    title: String
  })

  const avatar = computed(() => {
    if (props.member && props.member.avatar) {
      return props.member.avatar
    }
    return '/user.png'
  })
</script>

<template>
  <div class="bg-gray-100 rounded p-2 flex items-center">
    <img :src="avatar" class="h-20 mr-2" />
    <div v-if="member">
      <p>{{ member.nama }}</p>
      <p>{{ title }}</p>
    </div>
    <div v-else>
      <p>{{ title }} belum mengisi data</p>
    </div>
  </div>
</template>