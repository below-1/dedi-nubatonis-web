<script setup>
	import { onMounted, reactive, ref, computed } from 'vue';
	import { StarIcon as StarSolid } from '@heroicons/vue/solid'
	import { StarIcon as StarOutline } from '@heroicons/vue/outline'
	import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import useCurrentUser from '@quick/compose/current-user';
  import useSurvey from '@quick/compose/survey';
  import { usePOST } from '@quick/compose/axios'

  const { 
  	survey,
  	loadSurvey,
  	status: surveyNetStat
  } = useSurvey();

	const questions = [
		'Saya mudah mempelajari cara menggunakan Aplikasi pemilihan loksi pre-wedding',
		'Saya menggunakan Apliakasi pemilihan lokasi pre-wedding untuk mempermudah pekerjaan saya',
		'Saya dapat berinteraksi dengan Aplikasi pemeilihan lokasi pre-wedding dengan jelas',
		'Saya dapat menggunakan Apliaksi pemilihan lokasi pre-wedding  dengan mudah',
		'Saya beranggapan bahwa Aplikasi pemilihan lokasi pre-wedding merupakan program yang fleksibel',
		'Saya mampu mengerjakan pekerjaan lebih cepat  dengan Aplikasi pemilihan lokasi pre-wedding',
		'Saya beranggapan bahwa pekerjaan saya menjadi lebih mudah dengan menggunakan Aplikasi pemilihan lokasi pre-wedding',
		'Saya dapat meningkatkan produktivitas kerja dengan Aplikasi pemilihan lokasi pre-wedding',
		'Saya beranggapan bahwa Aplikasi pemilihan lokasi pre-wedding dapat berguna untuk saya',
		'Saya nyaman menggunakan Apliakasi pemilihan loksi pre-wedding',
		'Saya menikmati penggunaan Aplikasi pemilihan lokasi Pre-wedding',
		'saya beranggapan bahwa Aplikasi pemilihan lokasi pre-wedding tidak membosankan',
		'Aplikasi pemilihan lokasi pre-wedding menyediakan informasih yang saya butuhkan',
		'Aplikasi pemilihan lokasi pre-wedding menyediakan informasih yang akurat',
		'Saya menggunakan Aplikasi pemilihan lokasi pre-wedding dalam durasi waktu yang panjang'
	];

	const answers = reactive(questions.map((x, i) => {
		return 4;
	}));

	const payload = computed(() => {
		return {
			answers
		}
	})

	const {
  	post: saveSurvey
  } = usePOST({
  	payload,
  	url: '/v1/api/survey'
  })

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
	<PageHeader
    title="Survey"
    subtitle="Bantu kami dengan menjawab pertanyaan dibawah ini"
  >
  </PageHeader>
  <PageContainer>
  	<div v-if="!survey || !survey.length" class="w-2/3 mx-auto">
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
  </PageContainer>
</template>