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
      top: 5,
      textStyle: { color: '#fff', fontSize: 13 }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: {
      left: '5%',
      right: '5%',
      top: '18%',
      bottom: '25%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(i => i.name),
      axisLabel: { color: '#fff', rotate: 45, interval: 0 },
      axisTick: { alignWithLabel: true }
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
            color: store.countryColors[item.name] || '#3498db', // Use global color
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
  position: relative;
}
.chart {
  height: 100%;
  width: 100%;
  min-height: 300px;
}
</style>
