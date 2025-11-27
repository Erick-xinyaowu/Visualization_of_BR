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
  isPlaying.value = true
  startPlay()
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
  height: 100vh; /* Fixed height */
  overflow: hidden; /* No scroll */
  background-color: #0f172a;
  color: #e2e8f0;
  padding: 10px 20px; /* Reduced padding */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  margin-bottom: 10px;
  border-bottom: 1px solid #334155;
  padding-bottom: 10px;
  flex-shrink: 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  margin: 0;
  font-size: 1.5rem; /* Smaller title */
  color: #C4975B;
  font-weight: 600;
}

.controls {
  display: flex;
  align-items: center;
  gap: 15px;
}

.label {
  color: #94a3b8;
}

.dashboard-grid {
  flex: 1;
  display: flex;
  gap: 15px;
  height: 100%;
  overflow: hidden;
}

.grid-column {
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid #334155;
  position: relative;
}

.small-card {
  flex: 1;
  min-height: 0; /* Allow shrinking */
}

.main-card {
  flex: 2; /* Takes more space */
  min-height: 0;
}

.play-btn {
  color: #fff !important;
  border-color: #1890ff !important;
}

.play-btn:hover {
  color: #40a9ff !important;
  border-color: #40a9ff !important;
}

/* Responsive fallback */
@media (max-width: 1200px) {
  .dashboard-page {
    height: auto;
    overflow-y: auto;
    padding: 8px 12px;
  }
  .dashboard-grid {
    flex-direction: column;
    gap: 12px;
  }
  .grid-item {
    height: 350px;
  }
  .dashboard-header h1 {
    font-size: 1.2rem;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 8px;
  }
  
  .dashboard-header {
    margin-bottom: 8px;
    padding-bottom: 8px;
  }
  
  .header-content {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .header-content h1 {
    font-size: 1.1rem;
  }
  
  .controls {
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
  }
  
  .grid-item {
    height: 300px;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .dashboard-page {
    padding: 4px;
  }
  
  .header-content h1 {
    font-size: 1rem;
  }
  
  .play-btn,
  .controls button {
    font-size: 12px;
    padding: 4px 8px;
  }
  
  .grid-item {
    height: 250px;
  }
}
</style>
