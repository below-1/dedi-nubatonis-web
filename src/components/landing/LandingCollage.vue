<script setup>
  import { ref } from 'vue'

  const weddingPhotos = ref([
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    'https://images.unsplash.com/flagged/photo-1620830102229-9db5c00d4afc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2VkZGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2VkZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8d2VkZGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1519741497674-611481863552?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2VkZGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d2VkZGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHdlZGRpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlZGRpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1580151134699-e0cfbeb763d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHdlZGRpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHdlZGRpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1498979237786-9c35706bd45e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHdlZGRpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  ])
</script>

<style>
  #photo-collage {
    column-count: 3;
    column-gap: 6px;

    padding: 6px;
  }

  #photo-collage > img {
    width: 100% !important;
    height: auto !important;
    margin-bottom: 6px;
  }
</style>


<template>
  <section id="photo-collage">
    <template v-for="url, index in weddingPhotos" :key="index">
      <img :src="url" />
    </template>
  </section>
</template>
