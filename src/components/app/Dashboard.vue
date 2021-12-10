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

  import { BarChart, PieChart } from 'vue-chart-3';

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
        backgroundColor: ['#000D6B', '#9C19E0', '#FF5DA2', '#99DDCC', '#9A0680']
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
    },
     plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          footer: (ttItem) => {
            let sum = 0;
            let dataArr = ttItem[0].dataset.data;
            dataArr.map(data => {
              sum += Number(data);
            });

            let percentage = (ttItem[0].parsed * 100 / sum).toFixed(2) + '%';
            return `Presentase data: ${percentage}`;
          }
        }
      }
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
    <h1 class="text-center font-bold text-xl md:text-3xl my-4">Presentase Jumlah Data Lokasi Yang Dipilih</h1>
    <PieChart :chartData="chartData" :options="chartOptions" />
  </PageContainer>
</template>
