<script setup>
	import { onMounted, reactive, ref, toRef, computed } from 'vue';
	import { StarIcon as StarSolid } from '@heroicons/vue/solid'
	import { StarIcon as StarOutline } from '@heroicons/vue/outline'
	import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import { useSurvey } from '@quick/compose/survey';

  const props = defineProps({
  	id: String
  })
  const userId = toRef(props, 'id')

  const { 
  	survey,
  	loadSurvey,
  	updateSurvey,
  	updateSurveyResult,
  	answers
  } = useSurvey({ userId })

	const activeIndex = ref(0);
	const canBack = computed(() => activeIndex.value == 0);
	const canNext = computed(() => activeIndex.value == (questions.length - 1));

	const activeQuestion = computed(() => {
		return questions[activeIndex.value];
	});

	const currentRate = computed(() => answers[activeIndex.value])

	function onRateStar(i) {
		answers[activeIndex.value] = i;
	}

	async function onNext() {
		const current = activeIndex.value;
		if (current == questions.length - 1) {
			await saveSurvey();
			await loadSurvey();
			alert('sukses menyimpan data');
			return;
		}
		activeIndex.value = activeIndex.value + 1;
	}

	function onBack() {
		const current = activeIndex.value;
		if (current == 0) {

		}
		activeIndex.value = activeIndex.value - 1;
	}

	onMounted(loadSurvey)
</script>

<template>
	<div v-if="!survey || !survey.length">
  	<div class="text-center font-bold text-2xl">
  		{{ activeQuestion }}
  	</div>
  	<div class="flex items-center justify-center gap-x-2 my-6">
  		<template v-for="i in 4">
  			<StarSolid 
  				@click="onRateStar(i)" 
  				class="w-16 h-16" 
  				v-bind:class="(i - 1) < currentRate ? 'text-yellow-500' : 'text-gray-200'"
  			/>
  		</template>
  	</div>
  	<div class="flex justify-center items-center gap-x-2">
  		<button :disabled="canBack" @click="onBack" class="btn">kembali</button>
  		<button @click="onNext" class="btn btn-info">simpan</button>
  	</div>
	</div>
	<div class="w-2/3 mx-auto" v-else>
		<h1 class="text-center text-2xl">Terimakasih atas masukan anda...</h1>
	</div>
</template>