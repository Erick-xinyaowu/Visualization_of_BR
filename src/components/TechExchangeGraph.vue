<template>
  <div class="graph-container">
    <v-chart ref="chartRef" :option="chartOption" :style="{ height: '700px', width: '100%' }" autoresize />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import * as echarts from 'echarts'
import worldJson from '../assets/map/world.json'

const chartRef = ref(null)

// 注册地图
echarts.registerMap('world', worldJson)

// 国家经纬度坐标
const geoCoordMap = {
  '中国': [104.1954, 35.8617],
  '俄罗斯': [105.3188, 61.5240],
  '印度': [78.9629, 20.5937],
  '巴基斯坦': [69.3451, 30.3753],
  '新加坡': [103.8198, 1.3521],
  '马来西亚': [101.9758, 4.2105],
  '泰国': [100.9925, 15.8700],
  '土耳其': [35.2433, 38.9637],
  '埃及': [30.8025, 26.8206],
  '沙特阿拉伯': [45.0792, 23.8859],
  '意大利': [12.5674, 41.8719],
  '德国': [10.4515, 51.1657],
  '法国': [2.2137, 46.2276]
}

// 颜色配置 - 对应不同区域/类别
const categoryColors = [
  '#C0392B', // 核心国家 (中国) - 红色
  '#2C5578', // 主要伙伴 (俄罗斯, 印度) - 深蓝
  '#B49356', // 亚太地区 - 金色
  '#27AE60', // 中东地区 - 绿色
  '#8E44AD'  // 欧洲地区 - 紫色
]

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
  // value 格式: [经度, 纬度, 数值]
  value: geoCoordMap[node.name] ? [...geoCoordMap[node.name], node.value] : [0, 0, node.value],
  symbolSize: node.value * 0.4 + 10, // 调整节点大小
  itemStyle: {
    color: categoryColors[node.category] || '#2C5578',
    borderColor: '#fff',
    borderWidth: 2,
    shadowBlur: 10,
    shadowColor: 'rgba(0, 0, 0, 0.3)'
  },
  label: {
    show: true,
    position: 'right',
    formatter: '{b}',
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: [2, 4],
    borderRadius: 4
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
    width: link.value / 20, // 边粗细基于数值
    curveness: 0.2,
    color: '#B49356', // 统一金色连线
    opacity: 0.6
  }
}))

const categories = [
  { name: '核心国家' },
  { name: '主要伙伴' },
  { name: '亚太地区' },
  { name: '中东地区' },
  { name: '欧洲地区' }
]

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
              <div>科技影响力: <span style="color:#B49356;font-weight:bold">${params.data.value[2]}</span></div>
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
    },
    itemGap: 15,
    selectedMode: 'multiple'
  }],
  geo: {
    map: 'world',
    roam: true,
    zoom: 1.8, // 放大地图
    center: [70, 35], // 聚焦在亚洲/欧洲交界处
    label: {
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      areaColor: '#F0EFE9', // 暖色调背景
      borderColor: '#FFFFFF',
      borderWidth: 1
    },
    emphasis: {
      itemStyle: {
        areaColor: '#E2DBC6'
      }
    }
  },
  series: [{
    type: 'graph',
    coordinateSystem: 'geo', // 使用地理坐标系
    data: nodes,
    links: links,
    categories: categories,
    roam: true, // 允许缩放和平移
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
      color: 'source',
      curveness: 0.2
    },
    emphasis: {
      focus: 'adjacency',
      lineStyle: {
        width: 4,
        opacity: 1
      }
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
</style>
