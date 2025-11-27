<template>
  <div class="sankey-container">
    <v-chart ref="chartRef" class="sankey-chart" :option="chartOption" autoresize />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const chartRef = ref(null)

// 桑基图数据 - 科技交流流向
const data = {
  nodes: [
    { name: '中国科研机构' },
    { name: '俄罗斯科研机构' },
    { name: '欧盟科研机构' },
    { name: '东南亚科研机构' },
    { name: '中东科研机构' },
    { name: '人工智能' },
    { name: '新能源技术' },
    { name: '生物医药' },
    { name: '航空航天' },
    { name: '信息通信' },
    { name: '基础设施建设' },
    { name: '绿色能源应用' },
    { name: '医疗健康改善' },
    { name: '太空探索' },
    { name: '数字经济发展' }
  ],
  links: [
    { source: '中国科研机构', target: '人工智能', value: 150 },
    { source: '中国科研机构', target: '新能源技术', value: 120 },
    { source: '中国科研机构', target: '生物医药', value: 80 },
    { source: '中国科研机构', target: '航空航天', value: 100 },
    { source: '中国科研机构', target: '信息通信', value: 140 },
    
    { source: '俄罗斯科研机构', target: '航空航天', value: 110 },
    { source: '俄罗斯科研机构', target: '新能源技术', value: 60 },
    
    { source: '欧盟科研机构', target: '人工智能', value: 100 },
    { source: '欧盟科研机构', target: '新能源技术', value: 90 },
    { source: '欧盟科研机构', target: '生物医药', value: 85 },
    
    { source: '东南亚科研机构', target: '信息通信', value: 70 },
    { source: '东南亚科研机构', target: '生物医药', value: 50 },
    
    { source: '中东科研机构', target: '新能源技术', value: 65 },
    
    { source: '人工智能', target: '数字经济发展', value: 250 },
    { source: '新能源技术', target: '绿色能源应用', value: 335 },
    { source: '生物医药', target: '医疗健康改善', value: 215 },
    { source: '航空航天', target: '太空探索', value: 210 },
    { source: '信息通信', target: '数字经济发展', value: 210 },
    { source: '信息通信', target: '基础设施建设', value: 0 }
  ]
}

const chartOption = computed(() => ({
  backgroundColor: '#FBFBFD',
  title: {
    text: '一带一路科技交流流向',
    subtext: '从研究机构到技术领域再到实际应用',
    left: 'center',
    textStyle: {
      fontSize: 22,
      color: '#2C3E50',
      fontFamily: '"Noto Serif SC", serif'
    },
    subtextStyle: {
      color: '#86868B'
    }
  },
  tooltip: {
    trigger: 'item',
    triggerOn: 'mousemove',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#E5E7EB',
    textStyle: {
      color: '#1F2937'
    },
    formatter: (params) => {
      if (params.dataType === 'edge') {
        return `${params.data.source} → ${params.data.target}<br/>合作项目数: ${params.data.value}`
      }
      return `${params.name}`
    }
  },
  series: [{
    type: 'sankey',
    data: data.nodes,
    links: data.links,
    emphasis: {
      focus: 'adjacency'
    },
    lineStyle: {
      color: 'gradient',
      curveness: 0.5,
      opacity: 0.4
    },
    label: {
      fontSize: 12,
      color: '#333',
      fontFamily: '"Source Han Sans CN", sans-serif'
    },
    itemStyle: {
      borderWidth: 1,
      borderColor: '#fff',
      color: '#2C5578' // 默认节点颜色
    },
    levels: [
      {
        depth: 0,
        itemStyle: { color: '#C0392B' }, // 源头：红色
        lineStyle: { color: 'source', opacity: 0.2 }
      },
      {
        depth: 1,
        itemStyle: { color: '#B49356' }, // 中间：金色
        lineStyle: { color: 'source', opacity: 0.2 }
      },
      {
        depth: 2,
        itemStyle: { color: '#2C5578' }, // 终点：蓝色
        lineStyle: { color: 'source', opacity: 0.2 }
      }
    ],
    layoutIterations: 32,
    nodeGap: 20,
    nodeWidth: 20
  }]
}))
</script>

<style scoped>
.sankey-container {
  width: 100%;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0,0,0,0.05);
}

.sankey-chart {
  width: 100%;
  height: clamp(320px, 60vh, 640px);
}

@media (max-width: 768px) {
  .sankey-chart {
    height: 340px;
  }
}
</style>
