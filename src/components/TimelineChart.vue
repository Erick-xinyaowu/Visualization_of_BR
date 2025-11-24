<template>
  <div class="timeline-container">
    <v-chart ref="chartRef" :option="chartOption" :style="{ height: '600px', width: '100%' }" autoresize />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const chartRef = ref(null)

// 示例数据 - 丝绸之路历史时间线数据
const timelineData = [
  { year: '-138', event: '张骞出使西域', value: 50, category: '外交' },
  { year: '73', event: '班超经营西域', value: 65, category: '军事' },
  { year: '166', event: '大秦使者来华', value: 55, category: '外交' },
  { year: '629', event: '玄奘西行取经', value: 70, category: '文化' },
  { year: '713', event: '唐朝设安西都护府', value: 80, category: '政治' },
  { year: '1271', event: '马可·波罗来华', value: 85, category: '文化' },
  { year: '1405', event: '郑和下西洋', value: 90, category: '航海' },
  { year: '2013', event: '一带一路倡议提出', value: 100, category: '经济' }
]

const categories = [
  { name: '外交', itemStyle: { color: '#B49356' } }, // 金色
  { name: '军事', itemStyle: { color: '#C0392B' } }, // 红色
  { name: '文化', itemStyle: { color: '#2C5578' } }, // 蓝色
  { name: '政治', itemStyle: { color: '#27AE60' } }, // 绿色
  { name: '航海', itemStyle: { color: '#8E44AD' } }, // 紫色
  { name: '经济', itemStyle: { color: '#E67E22' } }  // 橙色
]

const chartOption = computed(() => ({
  backgroundColor: 'transparent',
  title: {
    text: '丝绸之路历史时间轴',
    subtext: '重要历史事件演进',
    left: 'center',
    textStyle: {
      fontSize: 24,
      color: '#2C3E50',
      fontFamily: '"Noto Serif SC", serif'
    },
    subtextStyle: {
      color: '#86868B'
    }
  },
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#E5E7EB',
    textStyle: {
      color: '#1F2937'
    },
    formatter: (params) => {
      const year = params.data.year < 0 ? `公元前${Math.abs(params.data.year)}年` : `公元${params.data.year}年`
      return `${year}<br/>${params.data.event}<br/>影响力: ${params.data.value}`
    }
  },
  legend: {
    data: categories.map(c => c.name),
    bottom: 10,
    textStyle: {
      color: '#2C3E50'
    }
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%',
    top: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: timelineData.map(d => {
      const year = parseInt(d.year)
      return year < 0 ? `公元前${Math.abs(year)}` : `公元${year}`
    }),
    axisLabel: {
      rotate: 45,
      fontSize: 11,
      color: '#2C3E50'
    },
    axisLine: {
      lineStyle: {
        color: '#E5E7EB'
      }
    }
  },
  yAxis: {
    type: 'value',
    name: '历史影响力',
    min: 0,
    max: 100,
    axisLabel: {
      color: '#2C3E50'
    },
    splitLine: {
      lineStyle: {
        color: '#F3F4F6'
      }
    }
  },
  series: [
    {
      name: '历史事件',
      type: 'scatter',
      data: timelineData.map((item, index) => ({
        value: [index, item.value],
        year: item.year,
        event: item.event,
        category: item.category,
        itemStyle: {
          color: categories.find(c => c.name === item.category).itemStyle.color,
          shadowBlur: 10,
          shadowColor: 'rgba(0,0,0,0.2)'
        }
      })),
      symbolSize: (val) => val[1] * 0.5,
      label: {
        show: true,
        formatter: (params) => params.data.event,
        position: 'top',
        fontSize: 12,
        color: '#2C3E50',
        fontFamily: '"Source Han Sans CN", sans-serif',
        fontWeight: 500
      },
      emphasis: {
        focus: 'self',
        label: {
          fontSize: 14,
          fontWeight: 'bold'
        }
      }
    },
    {
      name: '趋势线',
      type: 'line',
      data: timelineData.map(d => d.value),
      smooth: true,
      lineStyle: {
        color: '#B49356',
        width: 2,
        type: 'dashed'
      },
      symbol: 'none',
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(180, 147, 86, 0.2)' },
            { offset: 1, color: 'rgba(180, 147, 86, 0.01)' }
          ]
        }
      }
    }
  ]
}))
</script>

<style scoped>
.timeline-container {
  width: 100%;
  background: #FBFBFD;
  border-radius: 16px;
  padding: 1rem;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); */
}
</style>
