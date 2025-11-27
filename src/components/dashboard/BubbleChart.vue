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

  // Group by region for color coding
  const regions = [...new Set(data.map(item => item.region))]
  const series = regions.map(region => {
    return {
      name: region,
      type: 'scatter',
      data: data.filter(item => item.region === region).map(item => {
        return {
          value: [
            item.techIndex,
            item.tradeVolume,
            item.investment, // Size
            item.name,
            item.region
          ],
          itemStyle: {
            opacity: (store.selectedCountries.length > 0 && !store.selectedCountries.includes(item.name)) ? 0.1 : 0.7
          }
        }
      }),
      symbolSize: function (data) {
        return Math.sqrt(data[2]) * 1.5 // Scale size
      },
      emphasis: {
        focus: 'series',
        label: {
          show: true,
          formatter: function (param) {
            return param.data.value[3];
          },
          position: 'top'
        }
      }
    }
  })

  return {
    title: {
      text: '宏观定位 (气泡图)',
      left: 'center',
      textStyle: { color: '#fff' }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        return `${params.value[3]} (${params.value[4]})<br/>
                Tech Index: ${params.value[0]}<br/>
                Trade Volume: ${params.value[1]}<br/>
                Investment: ${params.value[2]}`
      }
    },
    legend: {
      right: 10,
      top: 30,
      orient: 'vertical',
      textStyle: { color: '#fff' }
    },
    grid: {
      left: '8%',
      top: '15%',
      right: '15%', // Add right padding for axis name
      bottom: '10%', // Ensure bottom labels are visible
      containLabel: true
    },
    xAxis: {
      name: 'Tech Index',
      nameLocation: 'end', // Explicitly set location
      nameGap: 10, // Adjust gap
      nameTextStyle: { color: '#fff' },
      splitLine: { lineStyle: { type: 'dashed', color: '#333' } },
      axisLabel: { color: '#fff' }
    },
    yAxis: {
      name: 'Trade Volume',
      nameTextStyle: { color: '#fff' },
      splitLine: { lineStyle: { type: 'dashed', color: '#333' } },
      axisLabel: { color: '#fff' },
      scale: true
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
  position: relative;
}
.chart {
  height: 100%;
  width: 100%;
  min-height: 300px;
}
</style>
