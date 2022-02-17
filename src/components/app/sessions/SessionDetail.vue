<script setup>
	import { inject, ref, unref, computed, onMounted } from 'vue';
	import { useSession } from '@quick/compose/session';
	import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import MemberCard from './MemberCard.vue';
  import BobotCard from './BobotCard.vue'
  import ParticipantCard from './ParticipantCard.vue'
  import rank from '@quick/serv/rank';
  import rankGroup from '@quick/serv/rankGroup';

	const props = defineProps({
    session: Object
  })

  async function onRecalc() {
    console.log('recalc')
    console.log(props.session.weights)
    await rank(props.session.weights)
  }

  const topFives = ref(null)

	onMounted(async () => {
    if (props.session.weights) {
      topFives.value = await rankGroup(props.session.weights)
    }
  });
</script>

<template>
	<div class="grid grid-cols-1 gap-y-2 md:gap-x-4 md:grid-cols-3" v-if="session && session.weights">
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
  <div v-if="session && session.status == 'DONE'">
    <template v-for="pack, i in topFives">
      <div class="flex items-start justify-start my-12 px-4">
        <div class="hidden md:block py-6 text-center">
          <h1 class="font-bold text-2xl">{{ i + 1 }}</h1>
        </div>
      	<div>
      		<div class="flex">
      			<img class="w-16 h-16 md:w-20 md:h-20 mr-4" :src="pack.location.avatar" />
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
</template>