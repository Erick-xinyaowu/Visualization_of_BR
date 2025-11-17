<template>
  <div class="graph-container">
    <v-chart ref="chartRef" :option="chartOption" :style="{ height: '700px', width: '100%' }" autoresize />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const chartRef = ref(null)

// 示例数据 - 一带一路国家科技交流网络
const nodes = [
  { name: '中国', value: 100, category: 0 },
  { name: '俄罗斯', value: 85, category: 1 },
  { name: '印度', value: 75, category: 1 },
  { name: '巴基斯坦', value: 60, category: 2 },
  { name: '新加坡', value: 70, category: 2 },
  { name: '马来西亚', value: 55, category: 2 },
  { name: '泰国', value: 50, category: 2 },
  { name: '土耳其', value: 65, category: 3 },
  { name: '埃及', value: 45, category: 3 },
  { name: '沙特阿拉伯', value: 55, category: 3 },
  { name: '意大利', value: 70, category: 4 },
  { name: '德国', value: 80, category: 4 },
  { name: '法国', value: 75, category: 4 }
]

const links = [
  { source: '中国', target: '俄罗斯', value: 90 },
  { source: '中国', target: '印度', value: 70 },
  { source: '中国', target: '巴基斯坦', value: 85 },
  { source: '中国', target: '新加坡', value: 75 },
  { source: '中国', target: '马来西亚', value: 65 },
  { source: '中国', target: '泰国', value: 60 },
  { source: '中国', target: '土耳其', value: 55 },
  { source: '中国', target: '埃及', value: 50 },
  { source: '中国', target: '沙特阿拉伯', value: 60 },
  { source: '中国', target: '意大利', value: 70 },
  { source: '中国', target: '德国', value: 80 },
  { source: '中国', target: '法国', value: 75 },
  { source: '俄罗斯', target: '土耳其', value: 45 },
  { source: '印度', target: '新加坡', value: 50 },
  { source: '巴基斯坦', target: '沙特阿拉伯', value: 40 },
  { source: '新加坡', target: '马来西亚', value: 55 },
  { source: '德国', target: '法国', value: 70 }
]

const categories = [
  { name: '核心国家' },
  { name: '主要伙伴' },
  { name: '亚太地区' },
  { name: '中东地区' },
  { name: '欧洲地区' }
]

const chartOption = computed(() => ({
  title: {
    text: '一带一路科技交流网络',
    subtext: '国家间科技合作关系图',
    left: 'center',
    textStyle: {
      fontSize: 24,
      color: '#667eea'
    }
  },
  tooltip: {
    formatter: (params) => {
      if (params.dataType === 'edge') {
        return `${params.data.source} → ${params.data.target}<br/>合作强度: ${params.data.value}`
      }
      return `${params.name}<br/>科技影响力: ${params.data.value}`
    }
  },
  legend: [{
    data: categories.map(c => c.name),
    orient: 'vertical',
    left: 'left',
    top: 'center'
  }],
  series: [{
    type: 'graph',
    layout: 'force',
    data: nodes,
    links: links,
    categories: categories,
    roam: true,
    label: {
      show: true,
      position: 'right',
      fontSize: 12
    },
    labelLayout: {
      hideOverlap: true
    },
    force: {
      repulsion: 300,
      gravity: 0.1,
      edgeLength: [100, 200]
    },
    emphasis: {
      focus: 'adjacency',
      lineStyle: {
        width: 5
      }
    },
    lineStyle: {
      color: 'source',
      curveness: 0.3,
      opacity: 0.6
    },
    symbolSize: (val, params) => params.value * 0.6,
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 1,
      shadowBlur: 10,
      shadowColor: 'rgba(0, 0, 0, 0.3)'
    }
  }]
}))
</script>

<style scoped>
.graph-container {
  width: 100%;
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
