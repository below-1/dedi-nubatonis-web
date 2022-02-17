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
    TrashIcon,
    ViewListIcon
  } from '@heroicons/vue/solid'
  import FacebookRSVG from '@quick/assets/facebook.svg'
  import InstagramRSVG from '@quick/assets/instagram.svg'
  import { useGET, useDELETE } from '@quick/compose/axios'

  const currentUser = inject('currentUser')
  const alert = inject('alert')

  const isAdmin = computed(() => currentUser.value.role == 'admin')

  const {
    del,
    status: deleteStatus
  } = useDELETE()

  async function removeItem(id) {
    console.log('here')
    try {
      const response = await del(`/v1/api/locations/${id}`)
      alert('sukses menghapus data')
    } catch (err) {
      alert('gagal menghapus data')
    }
  }

  function promptDelete(item) {
    alert({
      title: 'Hapus data lokasi',
      description: 'Apakah anda yakin akan menghapus data lokasi',
      onYes: async () => {
        await removeItem(item._id)
        get()
      }
    })
  }

  const { get, result } = useGET({
    url: '/v1/api/locations'
  })
  const locations = computed(() => {
    if (result.value.type != 'data') {
      return []
    }
    return result.value.data
  })

  onMounted(get)
</script>

<template>
  <PageHeader
    title="Lokasi"
    subtitle="Daftar lokasi"
  >
    <template v-if="isAdmin" #actions>
      <a class="btn"><router-link to="/app/lokasi/create">tambah lokasi</router-link></a>
    </template>
  </PageHeader>
  <PageContainer>
    <ul v-if="result">
      <template 
        v-for="item, i in locations"
        :key="item.id"
      >
        <li class="flex py-4 px-3 md:px-6 bg-white border-b border-gray-200">
          <img 
            class="w-12 h-12 md:w-20 md:h-20 mr-4" 
            :src="item.avatarUrl ? item.avatarUrl : item.avatar"
          />
          <div class="flex-grow">
            <div class="text-gray-800 capitalize text-xl">{{ item.nama }}</div>
            <div class="text-sm md:w-3/5">IDR {{ parseInt(item.price.$numberDecimal).toLocaleString() }}, {{ item.distance }} km, {{ item.numberOfSpots }} spot</div>
          </div>
          <div class="flex items-center" v-if="isAdmin">
            <router-link :to="`/app/lokasi/${item._id}/edit`">
              <button class="btn btn-circle btn-primary btn-sm mr-2">
                <PencilIcon class="w-4 h-4" />
              </button>
            </router-link>
            <button 
              @click="promptDelete(item)"
              class="btn btn-circle btn-sm bg-red-600 border-red-600">
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
          <div class="flex items-center" v-else>
            <router-link :to="`/app/lokasi/${item._id}/detail`">
              <button class="btn btn-circle btn-primary btn-sm mr-2">
                <ViewListIcon class="w-4 h-4" />
              </button>
            </router-link>
          </div>
        </li>
      </template>
    </ul>
  </PageContainer>
</template>
