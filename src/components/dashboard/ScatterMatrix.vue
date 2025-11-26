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
  const data = store.currentYearData
  
  // Helper to format data for scatter
  // [x, y, size, name, region]
  const getSeriesData = (xKey, yKey) => {
    return data.map(item => {
      return {
        value: [item[xKey], item[yKey], item.projects, item.name, item.region],
        itemStyle: {
          color: store.selectedCountries.includes(item.name) ? '#C4975B' : 
                 (store.hoveredCountry === item.name ? '#E6B87D' : '#3498db'),
          opacity: (store.selectedCountries.length > 0 && !store.selectedCountries.includes(item.name)) ? 0.1 : 0.7
        }
      }
    })
  }

  return {
    title: {
      text: '多维关联分析 (SPLOM)',
      left: 'center',
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return `${params.value[3]}<br/>
                X: ${params.value[0]}<br/>
                Y: ${params.value[1]}<br/>
                Projects: ${params.value[2]}`
      }
    },
    grid: [
      { left: '7%', top: '15%', width: '38%', height: '35%' },
      { right: '7%', top: '15%', width: '38%', height: '35%' },
      { left: '7%', bottom: '7%', width: '38%', height: '35%' },
      { right: '7%', bottom: '7%', width: '38%', height: '35%' }
    ],
    xAxis: [
      { gridIndex: 0, name: 'Tech', nameTextStyle: { color: '#aaa' }, axisLabel: { color: '#aaa' }, splitLine: { show: false } },
      { gridIndex: 1, name: 'Trade', nameTextStyle: { color: '#aaa' }, axisLabel: { color: '#aaa' }, splitLine: { show: false } },
      { gridIndex: 2, name: 'Conn.', nameTextStyle: { color: '#aaa' }, axisLabel: { color: '#aaa' }, splitLine: { show: false } },
      { gridIndex: 3, name: 'Culture', nameTextStyle: { color: '#aaa' }, axisLabel: { color: '#aaa' }, splitLine: { show: false } }
    ],
    yAxis: [
      { gridIndex: 0, name: 'Culture', nameTextStyle: { color: '#aaa' }, axisLabel: { color: '#aaa' }, splitLine: { show: false } },
      { gridIndex: 1, name: 'Invest', nameTextStyle: { color: '#aaa' }, axisLabel: { color: '#aaa' }, splitLine: { show: false } },
      { gridIndex: 2, name: 'Tech', nameTextStyle: { color: '#aaa' }, axisLabel: { color: '#aaa' }, splitLine: { show: false } },
      { gridIndex: 3, name: 'Trade', nameTextStyle: { color: '#aaa' }, axisLabel: { color: '#aaa' }, splitLine: { show: false } }
    ],
    series: [
      {
        name: 'Tech vs Culture',
        type: 'scatter',
        xAxisIndex: 0,
        yAxisIndex: 0,
        symbolSize: 8,
        data: getSeriesData('techIndex', 'culturalIndex')
      },
      {
        name: 'Trade vs Invest',
        type: 'scatter',
        xAxisIndex: 1,
        yAxisIndex: 1,
        symbolSize: 8,
        data: getSeriesData('tradeVolume', 'investment')
      },
      {
        name: 'Conn vs Tech',
        type: 'scatter',
        xAxisIndex: 2,
        yAxisIndex: 2,
        symbolSize: 8,
        data: getSeriesData('connectivity', 'techIndex')
      },
      {
        name: 'Culture vs Trade',
        type: 'scatter',
        xAxisIndex: 3,
        yAxisIndex: 3,
        symbolSize: 8,
        data: getSeriesData('culturalIndex', 'tradeVolume')
      }
    ],
    brush: {
      toolbox: ['rect', 'polygon', 'keep', 'clear'],
      xAxisIndex: 'all',
      brushLink: 'all',
      outOfBrush: {
        colorAlpha: 0.1
      }
    }
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
