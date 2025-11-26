<template>
  <div class="chart-container">
    <v-chart class="chart" :option="option" autoresize @click="handleClick" @mouseover="handleMouseOver" @mouseout="handleMouseOut" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '../../store/dashboardStore'

const store = useDashboardStore()

const option = computed(() => {
  const data = store.currentYearData
    .sort((a, b) => b.tradeVolume - a.tradeVolume)
    .slice(0, 15)

  return {
    title: {
      text: '贸易额 Top 15 (百万美元)',
      left: 'center',
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(i => i.name),
      axisLabel: { color: '#fff', rotate: 45 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    series: [
      {
        name: 'Trade Volume',
        type: 'bar',
        data: data.map(item => ({
          value: item.tradeVolume,
          itemStyle: {
            color: store.selectedCountries.includes(item.name) ? '#C4975B' : '#3498db',
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

function handleMouseOver(params) {
  store.setHoveredCountry(params.name)
}

function handleMouseOut() {
  store.setHoveredCountry(null)
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
