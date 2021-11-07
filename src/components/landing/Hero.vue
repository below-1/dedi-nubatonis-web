<style scoped>
  #hero {
    background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.1)), url(/landing.jpg);
    background-size: cover;
    background-position: 0% 100%;
    background-attachment: fixed;
  }
</style>

<template>
  <section id="hero" class="flex flex-col text-white" style="height: calc(100vh - 7rem);">
    <div class="flex-grow flex flex-col items-center justify-center">
      <h1 class="font-mono text-6xl font-black text-center">Simpan Semua Memori</h1>
      <router-link to="/pref" class="btn bg-pink-600">tentukan lokasi anda</router-link>
    </div>
  </section>
</template>