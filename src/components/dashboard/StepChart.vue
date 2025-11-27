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
  const years = store.years
  const series = []

  // If countries are selected, show their individual trends
  if (store.selectedCountries.length > 0) {
    store.selectedCountries.forEach(country => {
      series.push({
        name: country,
        type: 'line',
        step: 'start',
        data: store.getCountryTrend(country, 'techIndex'),
        smooth: false,
        itemStyle: {
          color: store.countryColors[country]
        }
      })
    })
  } else {
    // Otherwise show average trend
    const trend = store.getTrendData('techIndex')
    series.push({
      name: 'Average Tech Index',
      type: 'line',
      step: 'start',
      data: Object.values(trend),
      areaStyle: { opacity: 0.2 }
    })
  }

  return {
    title: {
      text: '科技合作指数演变',
      left: 'center',
      top: 5,
      textStyle: { color: '#fff', fontSize: 14 }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      bottom: 5,
      textStyle: { color: '#fff', fontSize: 10 }
    },
    grid: {
      left: '8%',
      right: '5%',
      top: '20%',
      bottom: '18%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: years,
      axisLabel: { color: '#fff', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff' },
      splitLine: { lineStyle: { color: '#333' } }
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
