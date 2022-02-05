<script setup>
	import { inject, ref, unref, computed, onMounted } from 'vue';
	import { useSession } from '@quick/compose/session';
	import { useGET } from '@quick/compose/axios'
	import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import MemberCard from './MemberCard.vue';
  import BobotCard from './BobotCard.vue'
  import ParticipantCard from './ParticipantCard.vue'
  import rank from '@quick/serv/rank';
  import rankGroup from '@quick/serv/rankGroup';

	const props = defineProps({
    id: String
  })

	const detailURL = computed(() => `/v1/api/sessions/${props.id}`)
  const {
  	get: getSession,
  	result: sessionResult
  } = useGET({
  	url: detailURL
  })
  const session = computed(() => {
  	const sr = unref(sessionResult)
  	if (sr.type != 'data') {
  		return null;
  	}
  	return sr.data;
  })

  async function onRecalc() {
    console.log('recalc')
    console.log(session.value.weights)
    await rank(session.value.weights)
  }

  const topFives = ref(null)

	onMounted(async () => {
    await getSession()
    console.log('session.value')
    console.log(session.value)
    if (session.value.weights) {
      topFives.value = await rankGroup(session.value.weights)
    }
  });
</script>

<template>
	<PageHeader
    title="Session"
    subtitle="Detail Session"
  >
    <template #actions>
      <button class="btn" @click="onRecalc">recalc</button>
    </template>
  </PageHeader>
  <PageContainer>
  	<div class="grid grid-cols-1 gap-y-2 md:grid-cols-3" v-if="session && session.weights">
  		<div>
  			<template v-if="session.weights.man">
	  			<ParticipantCard
	  				:member="session.man"
	  				title="mempelai pria"
	  				:weights="session.weights.man"
	  			/>
  			</template>
  		</div>
  		<div v-if="session.weights.woman">
  			<template v-if="session.woman && session.weights.woman">
	  			<ParticipantCard 
	  				:member="session.woman"
	  				title="mempelai wanita"
	  				:weights="session.weights.woman"
	  			/>
  			</template>
  		</div>
  		<div v-if="session.weights.photographer">
  			<template v-if="session.photographer && session.weights.photographer">
	  			<ParticipantCard 
	  				:member="session.photographer"
	  				title="fotografer"
	  				:weights="session.weights.photographer"
	  			/>
  			</template>
  		</div>
  	</div>
  	<div class="flex items-center justify-center p-16 bg-gray-100" v-else>
  		<div class="text-xl font-bold text-gray-700">Data Bobot Belum Diinput Oleh User</div>
  	</div>
    <div v-if="session && session.complete">
      <template v-for="pack, i in topFives">
        <div class="flex items-start justify-start my-12">
          <div class="py-6 px-6 text-center">
            <h1 class="font-bold text-2xl">{{ i + 1 }}</h1>
          </div>
        	<div>
        		<div class="flex items-center">
        			<img class="w-10 h-10 md:w-20 md:h-20 mr-4" :src="pack.location.avatar" />
      	  		<div>
      	  			<h2 class="text-xl font-bold">{{ pack.location.nama }}</h2>
      	  			<a 
      	  				target="_blank" 
      	  				:href="`https://maps.google.com/?z=15&q=${pack.location.latitude},${pack.location.longitude}`"
      	  				class="text-underline"
      	  			>
      	  				{{ pack.location.latitude }}, {{ pack.location.longitude }}
      	  			</a>
      	  			<p class="font-bold">Nilai Borda: {{ pack.borda }}</p>
      	  		</div>
        		</div>
        	</div>
        </div>
      </template>
    </div>
  </PageContainer>
</template>