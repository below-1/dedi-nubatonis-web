<script setup>
  import { onMounted } from 'vue'
  import { useQuery, useResult } from '@vue/apollo-composable'
  import { find as GQL_find } from '@quick/gql/lokasi'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import { PencilIcon } from '@heroicons/vue/solid'
  import FacebookRSVG from '@quick/assets/facebook.svg'
  import InstagramRSVG from '@quick/assets/instagram.svg'

  const { result } = useQuery(GQL_find)
  const locations = useResult(result, [], data => data.locations.nodes)
</script>

<template>
  <PageHeader
    title="Lokasi"
    subtitle="Daftar lokasi"
  >
    <template #actions>
      <a class="btn"><router-link to="/app/lokasi/create">tambah lokasi</router-link></a>
    </template>
  </PageHeader>
  <PageContainer>
    <ul v-if="result">
      <template 
        v-for="item, i in locations"
        :key="item.id"
      >
        <li class="flex py-4 px-6 bg-white border-b border-gray-200">
          <img 
            class="w-20 h-20 mr-4" 
            :src="`https://i.pravatar.cc/150?img=${i + 1}`" />
          <div class="flex-grow">
            <div class="text-gray-800 capitalize text-xl">{{ item.nama }}</div>
            <div class="text-sm md:w-3/5">{{ item.harga }}</div>
          </div>
          <div class="flex items-center">
            <router-link :to="`/app/lokasi/${item.id}/edit`">
              <button class="btn btn-circle btn-sm">
                <PencilIcon class="w-4 h-4" />
              </button>
            </router-link>
          </div>
        </li>
      </template>
    </ul>
  </PageContainer>
</template>
