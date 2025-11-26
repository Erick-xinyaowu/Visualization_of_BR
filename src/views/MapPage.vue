<template>
  <div class="map-page">
    <div class="dashboard-header">
      <div class="header-title">
        <h1 class="page-title">丝路智汇 · 时空演化</h1>
        <p class="page-subtitle">Cultural & Technological Exchange Visualization</p>
      </div>
      <div class="controls">
        <a-space>
          <a-button type="primary" class="control-btn" @click="togglePlay">
            <template #icon>
              <component :is="isPlaying ? 'PauseCircleOutlined' : 'PlayCircleOutlined'" />
            </template>
            {{ isPlaying ? '暂停演化' : '播放演化' }}
          </a-button>
          <a-button class="control-btn" @click="resetView">
            <template #icon><ReloadOutlined /></template>
            重置视图
          </a-button>
        </a-space>
      </div>
    </div>

    <div class="grid-container" v-if="!isLoading">
      <!-- 地图视图 -->
      <div id="map-view" class="chart-card main-card">
        <div class="card-header">
          <span class="card-title-icon">🗺️</span>
          <span class="card-title-text">GEOGRAPHIC FLOW 科技传播路径</span>
        </div>
        <div class="chart-wrapper">
          <v-chart class="chart" :option="mapOption" autoresize />
          <transition name="fade">
            <div class="period-watermark" v-if="currentPeriodLabel" :key="currentPeriodLabel">
              {{ currentPeriodLabel }}
            </div>
          </transition>
        </div>
      </div>

      <!-- 关系网络视图 -->
      <div id="network-view" class="chart-card side-card">
        <div class="card-header">
          <span class="card-title-icon">🕸️</span>
          <span class="card-title-text">RELATION NETWORK 互鉴关系网</span>
        </div>
        <div class="chart-wrapper">
          <v-chart class="chart" :option="networkOption" autoresize />
        </div>
      </div>

      <!-- 时间轴视图 -->
      <div id="timeline-view" class="chart-card side-card">
        <div class="card-header">
          <span class="card-title-icon">⏳</span>
          <span class="card-title-text">CHRONOLOGY 时间演化</span>
        </div>
        <div class="chart-wrapper">
          <v-chart class="chart" :option="timelineOption" @click="handleTimelineClick" autoresize />
        </div>
      </div>
    </div>

    <!-- 加载提示 -->
    <div v-else class="loading-container">
      <a-spin size="large" tip="正在加载地图数据..." />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined } from '@ant-design/icons-vue'
import * as echarts from 'echarts'
import worldJson from '../assets/map/world.json'

// State
const isPlaying = ref(false)
const isLoading = ref(true)
const currentPeriodLabel = ref('历史全览 All Periods')
let playInterval = null

const periodDisplayMap = {
    'Han': '汉代 Han Dynasty',
    'Tang': '唐代 Tang Dynasty',
    'Song': '宋代 Song Dynasty',
    'Yuan': '元代 Yuan Dynasty',
    'Ming': '明代 Ming Dynasty',
    'All': '历史全览 All Periods'
};

// Options Refs - 初始化为有效的空配置
const mapOption = ref({ title: { text: '加载中...' } })
const networkOption = ref({ title: { text: '加载中...' } })
const timelineOption = ref({ title: { text: '加载中...' } })

// --- 数据准备 ---

// 城市坐标 (模拟墨卡托投影相对坐标)
const geoCoordMap = {
    '长安': [108.93, 34.27],
    '敦煌': [94.66, 40.14],
    '喀什': [75.98, 39.47],
    '撒马尔罕': [66.97, 39.65],
    '巴格达': [44.36, 33.31],
    '伊斯坦布尔': [28.98, 41.01], // 君士坦丁堡
    '威尼斯': [12.31, 45.44],
    '罗马': [12.49, 41.90],
    '泉州': [118.67, 24.88],
    '广州': [113.26, 23.13],
    '马六甲': [102.25, 2.18],
    '卡利卡特': [75.78, 11.25], // 古里
    '开罗': [31.23, 30.04],
    '莫斯科': [37.61, 55.75],
    '麦加': [39.82, 21.42],
    '雅典': [23.72, 37.98],
    '德黑兰': [51.38, 35.68],
    '京都': [135.76, 35.01]
};

// 传播数据记录 (丰富版)
const rawData = [
    // 汉代 (Han) - 开辟
    { source: '长安', target: '敦煌', tech: '丝绸 Silk', period: 'Han', route: 'Land', dir: 'Out' },
    { source: '敦煌', target: '喀什', tech: '丝绸 Silk', period: 'Han', route: 'Land', dir: 'Out' },
    { source: '喀什', target: '撒马尔罕', tech: '丝绸 Silk', period: 'Han', route: 'Land', dir: 'Out' },
    { source: '撒马尔罕', target: '德黑兰', tech: '葡萄 Grapes', period: 'Han', route: 'Land', dir: 'In' },
    { source: '德黑兰', target: '长安', tech: '葡萄 Grapes', period: 'Han', route: 'Land', dir: 'In' },

    // 唐代 (Tang) - 繁荣
    { source: '长安', target: '撒马尔罕', tech: '造纸术 Paper', period: 'Tang', route: 'Land', dir: 'Out' },
    { source: '撒马尔罕', target: '巴格达', tech: '造纸术 Paper', period: 'Tang', route: 'Land', dir: 'Out' },
    { source: '罗马', target: '长安', tech: '玻璃工艺 Glass', period: 'Tang', route: 'Land', dir: 'In' },
    { source: '长安', target: '京都', tech: '佛教 Buddhism', period: 'Tang', route: 'Sea', dir: 'Out' },
    
    // 宋代 (Song) - 海路兴起
    { source: '长安', target: '喀什', tech: '火药 Gunpowder', period: 'Song', route: 'Land', dir: 'Out' },
    { source: '泉州', target: '马六甲', tech: '指南针 Compass', period: 'Song', route: 'Sea', dir: 'Out' },
    { source: '马六甲', target: '卡利卡特', tech: '指南针 Compass', period: 'Song', route: 'Sea', dir: 'Out' },
    { source: '开罗', target: '泉州', tech: '天文学 Astronomy', period: 'Song', route: 'Sea', dir: 'In' },
    { source: '广州', target: '马六甲', tech: '瓷器 Porcelain', period: 'Song', route: 'Sea', dir: 'Out' },

    // 元代 (Yuan) - 帝国互通
    { source: '喀什', target: '莫斯科', tech: '火药 Gunpowder', period: 'Yuan', route: 'Land', dir: 'Out' },
    { source: '撒马尔罕', target: '伊斯坦布尔', tech: '印刷术 Printing', period: 'Yuan', route: 'Land', dir: 'Out' },
    { source: '伊斯坦布尔', target: '威尼斯', tech: '印刷术 Printing', period: 'Yuan', route: 'Sea', dir: 'Out' },
    { source: '巴格达', target: '长安', tech: '数学 Math', period: 'Yuan', route: 'Land', dir: 'In' },
    { source: '威尼斯', target: '长安', tech: '旅行见闻 Travelogue', period: 'Yuan', route: 'Land', dir: 'In' },

    // 明代 (Ming) - 郑和下西洋
    { source: '广州', target: '马六甲', tech: '茶叶 Tea', period: 'Ming', route: 'Sea', dir: 'Out' },
    { source: '马六甲', target: '麦加', tech: '航海术 Navigation', period: 'Ming', route: 'Sea', dir: 'Out' },
    { source: '威尼斯', target: '长安', tech: '制图学 Cartography', period: 'Ming', route: 'Land', dir: 'In' },
    { source: '麦加', target: '泉州', tech: '香料 Spices', period: 'Ming', route: 'Sea', dir: 'In' }
];

// 颜色配置 (适配项目主题)
const colors = {
    land: '#B49356', // 琥珀金 (陆路)
    sea: '#2C5578',  // 深海蓝 (海路)
    inbound: '#C0392B', // 绛红 (传入/回流)
    node: '#1F2937'  // 深灰 (节点)
};

// --- Option 生成函数 ---

function updateMapOption(activePeriod = 'All') {
    const filteredData = activePeriod === 'All' ? rawData : rawData.filter(d => d.period === activePeriod);
    
    // 转换为散点图数据
    const linesData = filteredData.map(item => {
        return {
            coords: [geoCoordMap[item.source], geoCoordMap[item.target]],
            value: item.tech,
            routeType: item.route,
            direction: item.dir,
            lineStyle: {
                color: item.dir === 'In' ? colors.inbound : (item.route === 'Land' ? colors.land : colors.sea),
                type: item.dir === 'In' ? 'dashed' : 'solid',
                width: 2,
                opacity: 0.6
            }
        };
    });

    const pointsData = [];
    const visited = new Set();
    filteredData.forEach(item => {
        [item.source, item.target].forEach(city => {
            if (!visited.has(city) && geoCoordMap[city]) {
                pointsData.push({
                    name: city,
                    value: [...geoCoordMap[city], 1]
                });
                visited.add(city);
            }
        });
    });

    const newOption = {
        backgroundColor: 'transparent',
        title: {
            text: '丝绸之路技术交流路线图',
            left: 'center',
            top: 10,
            textStyle: {
                color: '#2C3E50',
                fontFamily: '"Noto Serif SC", serif',
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#B49356',
            borderWidth: 1,
            textStyle: { color: '#1F2937' },
            formatter: (params) => {
                if (params.seriesType === 'lines') {
                    const data = params.data;
                    return `<div style="font-family: 'Noto Serif SC'; font-weight: bold; color: ${data.lineStyle.color}; margin-bottom: 4px;">${data.value}</div>
                            <div style="font-size: 12px; color: #666">${data.routeType === 'Land' ? '🏜️ 陆上丝路' : '🌊 海上丝路'}</div>
                            <div style="font-size: 12px; color: #666">${data.direction === 'Out' ? '→ 输出' : '← 传入'}</div>`;
                }
                return `<div style="font-family: 'Noto Serif SC'; font-weight: bold; color: #B49356;">${params.name}</div>`;
            }
        },
        geo: {
            map: 'world',
            roam: false,
            zoom: 2.6,
            center: [74, 30],
            label: { emphasis: { show: false } },
            itemStyle: {
                areaColor: '#F0EFE9',
                borderColor: '#FFFFFF',
                borderWidth: 1
            },
            emphasis: {
                itemStyle: { areaColor: '#E2DBC6' }
            }
        },
        series: [
            {
                type: 'lines',
                coordinateSystem: 'geo',
                zlevel: 1,
                effect: { show: false },
                lineStyle: { 
                    width: 1, 
                    opacity: 0.2, 
                    curveness: 0.2, 
                    color: '#A0AEC0' 
                }, 
                data: linesData
            },
            {
                type: 'lines',
                coordinateSystem: 'geo',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 4,
                    trailLength: 0.4,
                    symbol: 'arrow',
                    symbolSize: 6,
                    color: '#B49356'
                },
                lineStyle: {
                    width: 2,
                    opacity: 0.7,
                    curveness: 0.2
                },
                data: linesData.map(d => ({
                    ...d,
                    effect: { color: d.lineStyle.color }
                }))
            },
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 3,
                rippleEffect: { brushType: 'stroke', scale: 3 },
                symbolSize: function(val, params) {
                    const name = params.name;
                    if (name === '长安' || name === '罗马' || name === '伊斯坦布尔') return 12;
                    return 8;
                },
                itemStyle: {
                    color: colors.node,
                    shadowBlur: 5,
                    shadowColor: colors.node
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{b}',
                    color: '#2C3E50',
                    fontSize: 10,
                    fontFamily: '"Source Han Sans CN", sans-serif',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    padding: [2, 4],
                    borderRadius: 2
                },
                data: pointsData
            }
        ]
    };
    
    mapOption.value = newOption;
    console.log('✅ Map option updated (geo mode):', newOption);
}

function updateNetworkOption(activePeriod = 'All') {
    const filteredData = activePeriod === 'All' ? rawData : rawData.filter(d => d.period === activePeriod);
    
    let nodes = [], links = [];
    let nodeSet = new Set();
    
    filteredData.forEach(d => {
        if (!nodeSet.has(d.source)) { 
            nodes.push({ name: d.source, category: 0, symbolSize: 20, itemStyle: { color: '#B49356' } }); 
            nodeSet.add(d.source); 
        }
        if (!nodeSet.has(d.target)) { 
            nodes.push({ name: d.target, category: 1, symbolSize: 15, itemStyle: { color: '#2C5578' } }); 
            nodeSet.add(d.target); 
        }
        links.push({
            source: d.source,
            target: d.target,
            value: d.tech,
            lineStyle: {
                color: d.dir === 'In' ? colors.inbound : (d.route === 'Land' ? colors.land : colors.sea)
            }
        });
    });

    networkOption.value = {
        backgroundColor: 'transparent',
        tooltip: { 
            trigger: 'item',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            textStyle: { color: '#1F2937' }
        },
        series: [{
            type: 'graph',
            layout: 'circular',
            circular: { rotateLabel: true },
            data: nodes,
            links: links,
            roam: false,
            label: { 
                show: true, 
                position: 'right', 
                fontSize: 10, 
                color: '#334155',
                fontFamily: '"Source Han Sans CN", sans-serif'
            }, 
            lineStyle: { curveness: 0.3, width: 2, opacity: 0.7 },
            emphasis: { focus: 'adjacency', lineStyle: { width: 4 } }
        }]
    };
}

function updateTimelineOption(activePeriod = 'All') {
    const periods = ['Han', 'Tang', 'Song', 'Yuan', 'Ming'];
    const periodNames = { 'Han': '汉', 'Tang': '唐', 'Song': '宋', 'Yuan': '元', 'Ming': '明' };
    const dataByPeriod = periods.map(p => {
        return rawData.filter(d => d.period === p).length;
    });

    timelineOption.value = {
        backgroundColor: 'transparent',
        grid: { top: 30, bottom: 20, left: 40, right: 20 },
        tooltip: { 
            trigger: 'axis',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            textStyle: { color: '#1F2937' }
        },
        xAxis: {
            type: 'category',
            data: periods.map(p => periodNames[p]),
            axisLine: { lineStyle: { color: '#A0AEC0' } }, 
            axisLabel: { color: '#2C3E50', fontFamily: '"Noto Serif SC", serif' } 
        },
        yAxis: {
            type: 'value',
            splitLine: { lineStyle: { color: 'rgba(148, 163, 184, 0.2)' } }, 
            axisLabel: { color: '#86868B' } 
        },
        series: [{
            type: 'bar',
            barWidth: '40%',
            itemStyle: {
                color: (params) => {
                    const p = periods[params.dataIndex];
                    if (activePeriod !== 'All' && p !== activePeriod) {
                        return '#E2E8F0';
                    }
                    return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#B49356' },
                        { offset: 1, color: 'rgba(180, 147, 86, 0.3)' } 
                    ]);
                },
                borderRadius: [4, 4, 0, 0]
            },
            data: dataByPeriod,
            showBackground: true,
            backgroundStyle: { color: 'rgba(148, 163, 184, 0.1)' } 
        }]
    };
}

// --- 交互逻辑 ---

function renderAll(period) {
    console.log('🎨 renderAll called with period:', period);
    currentPeriodLabel.value = periodDisplayMap[period] || period;
    updateMapOption(period);
    console.log('✅ updateMapOption done, mapOption:', mapOption.value);
    updateNetworkOption(period);
    console.log('✅ updateNetworkOption done');
    updateTimelineOption(period);
    console.log('✅ updateTimelineOption done');
}

function togglePlay() {
    const periods = ['Han', 'Tang', 'Song', 'Yuan', 'Ming', 'All'];
    
    if (isPlaying.value) {
        clearInterval(playInterval);
        playInterval = null;
        isPlaying.value = false;
    } else {
        isPlaying.value = true;
        let currentIndex = 0;
        renderAll(periods[currentIndex]);
        
        playInterval = setInterval(() => {
            currentIndex++;
            if (currentIndex >= periods.length) {
                currentIndex = 0;
                clearInterval(playInterval);
                playInterval = null;
                isPlaying.value = false;
                renderAll('All');
                return;
            }
            renderAll(periods[currentIndex]);
        }, 2000);
    }
}

function resetView() {
    if (playInterval) {
        clearInterval(playInterval);
        playInterval = null;
        isPlaying.value = false;
    }
    renderAll('All');
}

function handleTimelineClick(params) {
    const periods = ['Han', 'Tang', 'Song', 'Yuan', 'Ming'];
    const selectedPeriod = periods[params.dataIndex];
    renderAll(selectedPeriod);
}

// Lifecycle
onMounted(async () => {
    isLoading.value = true
    console.log('🗺️ MapPage mounted, initializing...')
    
    try {
        // 注册本地地图数据
        echarts.registerMap('world', worldJson)
        console.log('✅ World map registered from local asset')
        
        setTimeout(() => {
            renderAll('All')
            isLoading.value = false
            console.log('✅ Charts rendered successfully!')
        }, 100)
    } catch (error) {
        console.error('❌ Error initializing charts:', error)
        isLoading.value = false
    }
})

onUnmounted(() => {
    if (playInterval) clearInterval(playInterval);
})
</script>

<style scoped>
.map-page {
  width: 100%;
  height: calc(100vh - 64px);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;
}

.page-title {
  font-family: "Noto Serif SC", serif;
  font-size: 1.8rem;
  color: var(--text-primary);
  margin: 0;
  font-weight: 700;
}

.page-subtitle {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
}

.grid-container {
  flex: 1;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-template-rows: 1.5fr 1fr;
  gap: 16px;
  height: 100%;
  min-height: 0;
}

.chart-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s ease;
}

.chart-card:hover {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.card-header {
  padding: 12px 16px;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.4);
}

.card-title-icon {
  font-size: 1.2rem;
}

.card-title-text {
  font-family: "Source Han Sans CN", sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  letter-spacing: 1px;
  text-transform: uppercase;
}

.chart-wrapper {
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
  position: relative;
}

.chart {
  width: 100%;
  height: 100%;
}

/* 布局分配 */
#map-view {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}

#network-view {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}

#timeline-view {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
}

/* 响应式 */
@media (max-width: 1200px) {
  .map-page {
    height: auto;
    overflow-y: auto;
  }
  
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-rows: 600px 400px 300px;
    height: auto;
  }

  #map-view { grid-column: 1; grid-row: 1; }
  #network-view { grid-column: 1; grid-row: 2; }
  #timeline-view { grid-column: 1; grid-row: 3; }
}

.control-btn {
  border-radius: 20px;
  font-weight: 500;
}

.loading-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.loading-container :deep(.ant-spin) {
  color: var(--accent-gold);
}

.period-watermark {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  padding: 10px 20px;
  border-radius: 8px;
  border-left: 4px solid var(--accent-gold);
  font-family: "Noto Serif SC", serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  z-index: 10;
  pointer-events: none;
  letter-spacing: 1px;
  transition: all 0.5s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
