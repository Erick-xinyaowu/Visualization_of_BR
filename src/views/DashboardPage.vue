<template>
  <div class="dashboard-page">
    <!-- Header -->
    <header class="dashboard-header">
      <div class="header-content">
        <h1>丝路智汇 · 多维协同可视分析系统</h1>
        <div class="controls">
          <span class="label">年份选择:</span>
          <a-select
            v-model:value="store.selectedYear"
            style="width: 120px"
            @change="handleYearChange"
          >
            <a-select-option v-for="year in store.years" :key="year" :value="year">
              {{ year }}年
            </a-select-option>
          </a-select>

          <a-button 
            type="primary" 
            :ghost="!isPlaying"
            @click="togglePlay"
            class="play-btn"
          >
            <template #icon>
              <pause-circle-outlined v-if="isPlaying" />
              <play-circle-outlined v-else />
            </template>
            {{ isPlaying ? '停止播放' : '自动播放' }}
          </a-button>
          
          <a-button v-if="store.selectedCountries.length" type="primary" danger ghost size="small" @click="store.clearSelection">
            清除筛选 ({{ store.selectedCountries.length }})
          </a-button>
        </div>
      </div>
      <!-- Global Legend -->
      <GlobalLegend />
    </header>

    <!-- Main Grid -->
    <div class="dashboard-grid">
      <!-- Left Column: Rose & Pie -->
      <div class="grid-column left-col">
        <div class="grid-item card small-card">
          <RoseChart />
        </div>
        <div class="grid-item card small-card">
          <PieChart />
        </div>
      </div>

      <!-- Middle Column: Map/Bubble (Main Focus) & Scatter -->
      <div class="grid-column mid-col">
        <div class="grid-item card main-card">
          <BubbleChart />
        </div>
        <div class="grid-item card small-card">
          <ScatterMatrix />
        </div>
      </div>

      <!-- Right Column: Bar & Stacked & Step -->
      <div class="grid-column right-col">
        <div class="grid-item card small-card">
          <StepChart />
        </div>
        <div class="grid-item card small-card">
          <BarChart />
        </div>
        <div class="grid-item card small-card">
          <StackedBarChart />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { useDashboardStore } from '../store/dashboardStore'
import RoseChart from '../components/dashboard/RoseChart.vue'
import StepChart from '../components/dashboard/StepChart.vue'
import BarChart from '../components/dashboard/BarChart.vue'
import StackedBarChart from '../components/dashboard/StackedBarChart.vue'
import ScatterMatrix from '../components/dashboard/ScatterMatrix.vue'
import BubbleChart from '../components/dashboard/BubbleChart.vue'
import PieChart from '../components/dashboard/PieChart.vue'
import GlobalLegend from '../components/dashboard/GlobalLegend.vue'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons-vue'

const store = useDashboardStore()
const isPlaying = ref(false)
let playInterval = null

onMounted(() => {
  // Auto-play on load
  // 延迟启动以确保图表渲染完成
  setTimeout(() => {
    isPlaying.value = true
    startPlay()
  }, 500)
})

function handleYearChange(val) {
  store.setYear(val)
}

function togglePlay() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    startPlay()
  } else {
    stopPlay()
  }
}

function startPlay() {
  // Immediate move to next year or start over if at end
  playInterval = setInterval(() => {
    const currentIndex = store.years.indexOf(store.selectedYear)
    let nextIndex = currentIndex + 1
    if (nextIndex >= store.years.length) {
      nextIndex = 0
    }
    store.setYear(store.years[nextIndex])
  }, 2000) // Change every 2 seconds
}

function stopPlay() {
  if (playInterval) {
    clearInterval(playInterval)
    playInterval = null
  }
}

onUnmounted(() => {
  stopPlay()
})
</script>

<style scoped>
.dashboard-page {
  min-height: calc(100vh - 140px);
  background-color: #0f172a;
  color: #e2e8f0;
  padding: 16px 24px 32px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dashboard-header {
  margin-bottom: 8px;
  border-bottom: 1px solid #334155;
  padding-bottom: 12px;
  flex-shrink: 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.header-content h1 {
  margin: 0;
  font-size: 1.5rem;
  color: #C4975B;
  font-weight: 600;
}

.controls {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.label {
  color: #94a3b8;
}

.dashboard-grid {
  flex: 1;
  display: flex;
  gap: 16px;
  min-height: 0;
}

.grid-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}

.left-col {
  flex: 2;
}

.mid-col {
  flex: 4;
}

.right-col {
  flex: 2;
}

.grid-item {
  background: #1e293b;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.35);
  border: 1px solid #334155;
  position: relative;
  min-height: 220px;
}

.small-card {
  flex: 1;
  min-height: 260px;
}

.main-card {
  flex: 2;
  min-height: 420px;
}

.play-btn {
  color: #fff !important;
  border-color: #1890ff !important;
}

.play-btn:hover {
  color: #40a9ff !important;
  border-color: #40a9ff !important;
}

@media (max-width: 1440px) {
  .dashboard-grid {
    flex-direction: column;
  }

  .grid-column {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .grid-item {
    flex: 1 1 calc(50% - 16px);
  }

  .main-card {
    flex-basis: 100%;
  }
}

@media (max-width: 1200px) {
  .grid-column {
    flex-direction: column;
  }

  .grid-item {
    flex: 1 1 100%;
  }
}

@media (max-width: 1024px) {
  .dashboard-page {
    padding: 12px 16px 24px;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .grid-item {
    min-height: 240px;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 8px 12px 20px;
  }

  .dashboard-grid {
    gap: 12px;
  }

  .grid-column {
    gap: 12px;
  }

  .controls {
    width: 100%;
    justify-content: flex-start;
  }
}

@media (max-width: 600px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .play-btn,
  .controls :deep(.ant-btn) {
    width: 100%;
    justify-content: center;
  }

  .header-content h1 {
    font-size: 1.2rem;
  }
}
</style>
