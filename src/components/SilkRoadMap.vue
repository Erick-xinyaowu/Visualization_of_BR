<template>
  <div class="map-container">
    <v-chart ref="chartRef" :option="chartOption" :style="{ height: '600px', width: '100%' }" autoresize />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useDataStore } from '../store'

const dataStore = useDataStore()
const chartRef = ref(null)

// 示例数据 - 丝绸之路主要城市坐标
const cities = [
  { name: '长安', coord: [108.93, 34.27], value: 100 },
  { name: '敦煌', coord: [94.66, 40.14], value: 80 },
  { name: '喀什', coord: [75.98, 39.47], value: 75 },
  { name: '撒马尔罕', coord: [66.97, 39.65], value: 85 },
  { name: '巴格达', coord: [44.36, 33.31], value: 90 },
  { name: '大马士革', coord: [36.29, 33.51], value: 70 },
  { name: '君士坦丁堡', coord: [28.98, 41.01], value: 95 },
  { name: '罗马', coord: [12.50, 41.90], value: 100 }
]

// 路线数据
const routes = [
  { coords: [[108.93, 34.27], [94.66, 40.14]] }, // 长安-敦煌
  { coords: [[94.66, 40.14], [75.98, 39.47]] },  // 敦煌-喀什
  { coords: [[75.98, 39.47], [66.97, 39.65]] },  // 喀什-撒马尔罕
  { coords: [[66.97, 39.65], [44.36, 33.31]] },  // 撒马尔罕-巴格达
  { coords: [[44.36, 33.31], [36.29, 33.51]] },  // 巴格达-大马士革
  { coords: [[36.29, 33.51], [28.98, 41.01]] },  // 大马士革-君士坦丁堡
  { coords: [[28.98, 41.01], [12.50, 41.90]] }   // 君士坦丁堡-罗马
]

const chartOption = computed(() => ({
  title: {
    text: '丝绸之路地理路线图',
    subtext: '主要贸易路线与城市节点',
    left: 'center',
    textStyle: {
      fontSize: 24,
      color: '#667eea'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: (params) => {
      if (params.componentSubType === 'scatter') {
        return `${params.name}<br/>重要程度: ${params.value[2]}`
      }
      return params.name
    }
  },
  geo: {
    map: 'world',
    roam: true,
    zoom: 1.2,
    center: [60, 35],
    itemStyle: {
      areaColor: '#f3f3f3',
      borderColor: '#999'
    },
    emphasis: {
      itemStyle: {
        areaColor: '#e0e0e0'
      }
    }
  },
  series: [
    {
      name: '丝路城市',
      type: 'scatter',
      coordinateSystem: 'geo',
      data: cities.map(city => ({
        name: city.name,
        value: [...city.coord, city.value],
        itemStyle: {
          color: '#667eea'
        }
      })),
      symbolSize: (val) => val[2] / 5,
      label: {
        show: true,
        formatter: '{b}',
        position: 'right',
        fontSize: 12,
        color: '#333'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 14,
          fontWeight: 'bold'
        }
      }
    },
    {
      name: '贸易路线',
      type: 'lines',
      coordinateSystem: 'geo',
      data: routes,
      lineStyle: {
        color: '#764ba2',
        width: 2,
        opacity: 0.6,
        curveness: 0.2
      },
      effect: {
        show: true,
        period: 6,
        trailLength: 0.1,
        symbol: 'arrow',
        symbolSize: 8
      }
    }
  ]
}))

onMounted(async () => {
  // 可以在这里加载真实的地理数据
  console.log('SilkRoadMap mounted')
})
</script>

<style scoped>
.map-container {
  width: 100%;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
