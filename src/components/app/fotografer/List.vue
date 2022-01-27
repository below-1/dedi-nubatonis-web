<script setup>
  import { onMounted, computed, inject } from 'vue'
  import { useGET, useDELETE } from '@quick/compose/axios'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import { 
    PencilIcon,
    TrashIcon
  } from '@heroicons/vue/solid'
  import FacebookRSVG from '@quick/assets/facebook.svg'
  import InstagramRSVG from '@quick/assets/instagram.svg'

  const currentUser = inject('currentUser')
  const alert = inject('alert')

  const isAdmin = computed(() => currentUser.value.role == 'admin')

  const {
    del,
    status: deleteStatus
  } = useDELETE()

  async function removeItem(id) {
    try {
      const response = await del(`/v1/api/photographers/${id}`)
      alert('sukses menghapus data')
    } catch (err) {
      alert('gagal menghapus data')
    }
  }

  function promptDelete(item) {
    alert({
      title: 'Hapus data lokasi',
      description: 'Apakah anda yakin akan menghapus data Fotografer',
      onYes: async () => {
        await removeItem(item._id)
        get()
      }
    })
  }

  const {
    result,
    get
  } = useGET({
    url: '/v1/api/photographers'
  })
  const photographers = computed(() => result.value.type == 'data' ? result.value.data : null)

  onMounted(get)
</script>

<template>
  <PageHeader
    title="Fotografer"
    subtitle="Daftar fotografer"
  >
    <template #actions>
      <a class="btn" v-if="isAdmin"><router-link to="/app/fotografer/create">tambah fotografer</router-link></a>
    </template>
  </PageHeader>
  <PageContainer>
    <ul v-if="result">
      <template 
        v-for="item, i in photographers"
        :key="item._id"
      >
        <li class="flex py-4 px-3 md:px-6 bg-white border-b border-gray-200">
          <img 
            class="w-12 h-12 rounded-full md:w-20 md:h-20 mr-2 md:mr-4" 
            :src="item.avatar" />
          <div class="flex-grow">
            <div class="text-gray-800 capitalize text-xl">{{ item.nama }}</div>
            <div class="hidden md:block text-sm md:w-3/5">{{ item.summary }}</div>
          </div>
          <div class="flex items-center">
            <a 
              :href="item.instagram"
              target="_blank"
              class="btn btn-ghost btn-circle btn-sm mr-2 md:mr-4 border-none">
              <inline-svg
                :src="InstagramRSVG"
                class="w-6 h-6"
              >
              </inline-svg>
            </a>
            <a 
              class="btn btn-ghost btn-circle btn-sm mr-4 border-none"
              target="_blank"
              :href="item.facebook"
            >
              <inline-svg
                :src="FacebookRSVG"
                class="w-6 h-6"
              >
              </inline-svg>
            </a>
            <template v-if="isAdmin">
              <router-link :to="`/app/fotografer/${item._id}/edit`">
                <button class="btn btn-circle btn-sm mr-4">
                  <PencilIcon class="w-4 h-4" />
                </button>
              </router-link>
              <button 
                @click="promptDelete(item)"
                class="btn btn-circle btn-sm bg-red-600 border-red-600">
                <TrashIcon class="w-4 h-4" />
              </button>
            </template>
          </div>
        </li>
      </template>
    </ul>
  </PageContainer>
</template>
