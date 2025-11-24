<template>
  <div class="graph-container">
    <v-chart ref="chartRef" :option="chartOption" :style="{ height: '700px', width: '100%' }" autoresize />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)

// 模拟地理坐标映射 (简单投影)
// 经度 x: (lon + 20) * 5
// 纬度 y: (60 - lat) * 8
const geoMap = {
  '中国': [650, 250],
  '俄罗斯': [600, 100],
  '印度': [500, 350],
  '巴基斯坦': [460, 320],
  '新加坡': [630, 450],
  '马来西亚': [620, 430],
  '泰国': [600, 380],
  '土耳其': [300, 220],
  '埃及': [280, 300],
  '沙特阿拉伯': [350, 320],
  '意大利': [150, 200],
  '德国': [140, 150],
  '法国': [100, 180]
}

// 示例数据 - 一带一路国家科技交流网络
const rawNodes = [
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

const nodes = rawNodes.map(node => ({
  ...node,
  x: geoMap[node.name] ? geoMap[node.name][0] : Math.random() * 800,
  y: geoMap[node.name] ? geoMap[node.name][1] : Math.random() * 500,
  symbolSize: node.value * 0.5,
  itemStyle: {
    color: node.name === '中国' ? '#C0392B' : '#2C5578' // 中国用红色，其他用蓝色
  },
  label: {
    show: true,
    position: 'right',
    formatter: '{b}',
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold'
  }
}))

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
].map(link => ({
  ...link,
  lineStyle: {
    width: link.value / 15, // 边粗细基于数值
    curveness: 0.2
  }
}))

const categories = [
  { name: '核心国家' },
  { name: '主要伙伴' },
  { name: '亚太地区' },
  { name: '中东地区' },
  { name: '欧洲地区' }
]

// 简单的世界地图背景 SVG (极简轮廓)
const worldMapSVG = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 500'%3E%3Cpath fill='%23E0E0E0' d='M850,150 Q900,100 950,150 T900,250 T850,150 M100,150 Q150,100 200,150 T150,250 T100,150 M300,250 Q350,200 400,250 T350,350 T300,250 M600,100 Q650,50 700,100 T650,200 T600,100' opacity='0.3'/%3E%3Ctext x='500' y='250' font-size='100' fill='%23F0F0F0' text-anchor='middle' dominant-baseline='middle'%3EWORLD MAP%3C/text%3E%3C/svg%3E`
// 注意：真实的 SVG 地图路径太长，这里用一个占位符背景，实际项目中建议引入真实地图图片

const chartOption = computed(() => ({
  backgroundColor: '#FBFBFD',
  title: {
    text: '一带一路科技交流网络',
    subtext: '基于地理位置的合作关系图',
    left: 'center',
    top: 20,
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
      if (params.dataType === 'edge') {
        return `<div style="font-weight:bold;color:#2C5578">${params.data.source} ⇄ ${params.data.target}</div>
                <div>合作强度: <span style="color:#C0392B;font-weight:bold">${params.data.value}</span></div>`
      }
      return `<div style="font-weight:bold;font-size:16px;margin-bottom:4px;">${params.name}</div>
              <div>科技影响力: <span style="color:#B49356;font-weight:bold">${params.data.value}</span></div>
              <div>所属区域: ${categories[params.data.category]?.name || '未知'}</div>`
    }
  },
  legend: [{
    data: categories.map(c => c.name),
    orient: 'vertical',
    left: '20',
    bottom: '20',
    textStyle: {
      color: '#666'
    }
  }],
  // 使用 graphic 组件添加一个简单的背景图或水印
  graphic: [
    {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: 'The Silk Road',
        fontSize: 100,
        fontWeight: 'bold',
        fill: 'rgba(0,0,0,0.03)',
        fontFamily: '"Noto Serif SC", serif'
      }
    }
  ],
  series: [{
    type: 'graph',
    layout: 'none', // 使用手动坐标
    data: nodes,
    links: links,
    categories: categories,
    roam: true,
    label: {
      show: true,
      position: 'right',
      fontSize: 12,
      fontFamily: '"Source Han Sans CN", sans-serif'
    },
    labelLayout: {
      hideOverlap: true
    },
    lineStyle: {
      color: '#B49356', // 金色连线
      curveness: 0.2,
      opacity: 0.4
    },
    emphasis: {
      focus: 'adjacency',
      lineStyle: {
        width: 4,
        opacity: 1
      }
    },
    itemStyle: {
      borderColor: '#fff',
      borderWidth: 2,
      shadowBlur: 5,
      shadowColor: 'rgba(0, 0, 0, 0.2)'
    }
  }]
}))
</script>

<style scoped>
.graph-container {
  width: 100%;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0,0,0,0.05);
  position: relative;
  overflow: hidden;
}

/* 添加一个伪元素作为地图背景（如果需要更复杂的背景） */
.graph-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(#E5E7EB 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
  pointer-events: none;
}
</style>
