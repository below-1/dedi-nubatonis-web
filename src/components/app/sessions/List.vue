<script setup>
  import { 
    onMounted, 
    computed,
    inject
  } from 'vue'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import { 
    PencilIcon,
    TrashIcon
  } from '@heroicons/vue/solid'
  import FacebookRSVG from '@quick/assets/facebook.svg'
  import InstagramRSVG from '@quick/assets/instagram.svg'
  import { useGET, useDELETE } from '@quick/compose/axios'
  import SessionItem from './SessionItem.vue'

  const alert = inject('alert')

  const {
    del,
    status: deleteStatus
  } = useDELETE()

  async function removeItem(id) {
    try {
      const response = await del(`/v1/api/sessions/${id}`)
      alert('sukses menghapus data')
    } catch (err) {
      alert('gagal menghapus data')
    }
  }

  function promptDelete(item) {
    alert({
      title: 'Hapus data sesi',
      description: 'Apakah anda yakin akan menghapus data sesi',
      onYes: async () => {
        await removeItem(item._id)
        get()
      }
    })
  }

  const { get, result } = useGET({
    url: '/v1/api/sessions'
  })
  
  const sessions = computed(() => {
    if (result.value.type != 'data') {
      return []
    }
    return result.value.data
  })

  onMounted(get)
</script>

<template>
  <PageHeader
    title="Sesi"
    subtitle="Daftar sesi"
  >
    <template #actions>
      <a class="btn btn-primary"><router-link to="/app/lokasi/create">Pilih Lokasi</router-link></a>
    </template>
  </PageHeader>
  <PageContainer>
    <ul v-if="sessions.length">
      <template 
        v-for="item, i in sessions"
        :key="item._id"
      >
        <SessionItem
          :session="item"
          @deleted="get"
          class="mb-4"
        />
        <!-- <li class="flex py-4 px-6 bg-white border-b border-gray-200">
          <img 
            v-if="item.location"
            class="w-20 h-20 mr-4" 
            :src="item.location.avatar" />
          <div class="flex-grow">
            <div class="text-gray-800 capitalize text-xl">{{ item.man }} dan {{ item.woman }}</div>
            <div v-if="item.location" class="text-sm md:w-3/5">{{ item.location.nama }}</div>
            <div class="text-sm italic text-gray-500 md:w-3/5">{{ item.createdAt }}</div>
          </div>
          <div class="flex items-center">
            <button 
              @click="promptDelete(item)"
              class="btn btn-circle btn-sm bg-red-600 border-red-600">
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </li> -->
      </template>
    </ul>
    <h1 class="bg-gray-200 p-12 text-2xl font-bold text-center" v-else>Belum ada data</h1>
  </PageContainer>
</template>
