<template>
  <div class="chart-container">
    <v-chart class="chart" :option="option" autoresize @click="handleClick" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '../../store/dashboardStore'

const store = useDashboardStore()

const option = computed(() => {
  const data = store.currentYearData
    .sort((a, b) => b.culturalIndex - a.culturalIndex)
    .slice(0, 10) // Top 10 for readability

  return {
    title: {
      text: '文化交流指数 Top 10',
      left: 'center',
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c}'
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff' }
    },
    series: [
      {
        name: 'Cultural Index',
        type: 'pie',
        radius: [20, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: data.map(item => ({
          value: item.culturalIndex,
          name: item.name,
          itemStyle: {
            color: store.selectedCountries.includes(item.name) ? '#C4975B' : 
                   (store.hoveredCountry === item.name ? '#E6B87D' : undefined),
            opacity: (store.selectedCountries.length > 0 && !store.selectedCountries.includes(item.name)) ? 0.3 : 1
          }
        }))
      }
    ]
  }
})

function handleClick(params) {
  store.toggleCountrySelection(params.name)
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
}
.chart {
  height: 100%;
  width: 100%;
}
</style>
