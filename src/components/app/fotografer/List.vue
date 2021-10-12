<script setup>
  import { onMounted } from 'vue'
  import { useQuery, useResult } from '@vue/apollo-composable'
  import { find as GQL_find } from '@quick/gql/fotografer'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import { PencilIcon } from '@heroicons/vue/solid'
  import FacebookRSVG from '@quick/assets/facebook.svg'
  import InstagramRSVG from '@quick/assets/instagram.svg'

  const { result } = useQuery(GQL_find)
  const photographers = useResult(result, [], data => data.photographers.nodes)
</script>

<template>
  <PageHeader
    title="Fotografer"
    subtitle="Daftar fotografer"
  >
    <template #actions>
      <a class="btn"><router-link to="/app/fotografer/create">tambah fotografer</router-link></a>
    </template>
  </PageHeader>
  <PageContainer>
    <ul v-if="result">
      <template 
        v-for="item, i in photographers"
        :key="item.id"
      >
        <li class="flex py-4 px-6 bg-white border-b border-gray-200">
          <img 
            class="w-20 h-20 mr-4" 
            :src="`https://i.pravatar.cc/150?img=${i + 1}`" />
          <div class="flex-grow">
            <div class="text-gray-800 capitalize text-xl">{{ item.nama }}</div>
            <div class="text-sm md:w-3/5">{{ item.description }}</div>
          </div>
          <div class="flex items-center">
            <a 
              :href="item.instagram"
              target="_blank"
              class="btn btn-ghost btn-circle btn-sm mr-4 border-none">
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
            <router-link :to="`/app/fotografer/${item.id}/edit`">
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
