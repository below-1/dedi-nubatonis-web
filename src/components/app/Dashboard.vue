<script setup>
  import { 
    onMounted, 
    computed,
    inject,
    ref
  } from 'vue'
  import PageHeader from '@quick/components/app/PageHeader.vue'
  import PageContainer from '@quick/components/app/PageContainer.vue'
  import { useGET, useDELETE } from '@quick/compose/axios'

  import { BarChart } from 'vue-chart-3';

  const {
    get: getStat,
    result: stats
  } = useGET({
    url: '/v1/api/sessions/stat'
  })

  const chartData = computed(() => {
    if (stats.value.type != 'data') {
      return {
        labels: [],
        datasets: []
      }
    }
    const labels = stats.value.data.map(it => it._id);
    const datasets = [
      {
        label: 'Presentase Jumlah Lokasi Yang Dipilih',
        data: stats.value.data.map(it => it.total),
        backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED']
      }
    ]
    return {
      labels,
      datasets
    }
  })

  const chartOptions = ref({
    scales: {
       yAxes: [{
          ticks: {
            stepSize: 5
          },
          gridLines: {
              display: false
          }
       }]
    }
  })

  onMounted(getStat)
</script>

<template>
  <PageHeader
    title="Dashboard"
    subtitle="Rangkuman Session"
  >
  </PageHeader>
  <PageContainer>
    <BarChart :chartData="chartData" :options="chartOptions" />
  </PageContainer>
</template>
