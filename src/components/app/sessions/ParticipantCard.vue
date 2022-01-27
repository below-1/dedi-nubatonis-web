<script setup>
	import MemberCard from './MemberCard.vue';
  import BobotCard from './BobotCard.vue'

	const props = defineProps({
		member: Object,
		title: String,
		weights: Object
	})
</script>

<template>
	<div class="border border-gray-300 rounded">
		<MemberCard
      :member="member"
      :title="title"
    />
		<ul>
			<li class="font-bold flex items-center justify-between border-b border-gray-300 py-2 px-4">
				<span>Jarak</span> <span>{{ weights.distance }}</span>
			</li>
			<li class="font-bold flex items-center justify-between border-b border-gray-300 py-2 px-4">
				<span>Jumlah Spot</span> <span>{{ weights.numberOfSpots }}</span>
			</li>
			<li class="font-bold flex items-center justify-between border-b border-gray-300 py-2 px-4">
				<span>Harga</span> <span>{{ weights.price }}</span>
			</li>
			<li class="font-bold flex items-center justify-between border-b border-gray-300 py-2 px-4">
				<span>Tema</span> <span>{{ weights.theme }}</span>
			</li>
			<li class="font-bold flex items-center justify-between border-b border-gray-300 py-2 px-4">
				<span>Transportasi</span> <span>{{ weights.transportation }}</span>
			</li>
			<li class="font-bold flex items-center justify-between border-b border-gray-300 py-2 px-4">
				<span>Waktu</span> <span>{{ weights.waktu }}</span>
			</li>
		</ul>
	</div>
</template>