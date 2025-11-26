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
  // Show Top Countries by Investment instead of Region to match Global Legend
  const data = store.currentYearData
    .sort((a, b) => b.investment - a.investment)
    .slice(0, 8) // Top 8

  return {
    title: {
      text: '各国家投资占比 (Top 8)',
      left: 'center',
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'item'
    },
    // Legend removed
    series: [
      {
        name: 'Investment',
        type: 'pie',
        radius: '50%',
        center: ['50%', '52%'],
        data: data.map(item => ({
          value: item.investment,
          name: item.name,
          itemStyle: {
            color: store.countryColors[item.name] || '#5470c6',
            opacity: (store.selectedCountries.length > 0 && !store.selectedCountries.includes(item.name)) ? 0.3 : 1
          }
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
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
