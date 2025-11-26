<template>
  <div class="chart-container">
    <v-chart class="chart" :option="option" autoresize />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '../../store/dashboardStore'

const store = useDashboardStore()

const option = computed(() => {
  // Filter to show only selected countries if any, otherwise top 5 by tech index
  let data = store.currentYearData
  if (store.selectedCountries.length > 0) {
    data = data.filter(c => store.selectedCountries.includes(c.name))
  } else {
    data = data.sort((a, b) => b.techIndex - a.techIndex).slice(0, 5)
  }

  const categories = ['5G', 'AI', 'GreenEnergy', 'Infrastructure']
  
  const series = categories.map(cat => ({
    name: cat,
    type: 'bar',
    stack: 'total',
    emphasis: { focus: 'series' },
    data: data.map(item => item.techComposition[cat])
  }))

  return {
    title: {
      text: '科技合作构成',
      left: 'center',
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
    },
    yAxis: {
      type: 'category',
      data: data.map(i => i.name),
      axisLabel: { color: '#fff' }
    },
    series: series
  }
})
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
