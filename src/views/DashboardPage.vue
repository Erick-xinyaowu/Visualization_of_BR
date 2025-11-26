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
          
          <a-button v-if="store.selectedCountries.length" type="primary" danger ghost size="small" @click="store.clearSelection">
            清除筛选 ({{ store.selectedCountries.length }})
          </a-button>
        </div>
      </div>
    </header>

    <!-- Main Grid -->
    <div class="dashboard-grid">
      <!-- Row 1 -->
      <div class="grid-item card">
        <RoseChart />
      </div>
      <div class="grid-item card">
        <StepChart />
      </div>

      <!-- Row 2 -->
      <div class="grid-item card">
        <BarChart />
      </div>
      <div class="grid-item card">
        <StackedBarChart />
      </div>

      <!-- Row 3 -->
      <div class="grid-item card">
        <ScatterMatrix />
      </div>
      <div class="grid-item card">
        <BubbleChart />
      </div>

      <!-- Row 4 -->
      <div class="grid-item card full-width">
        <PieChart />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDashboardStore } from '../store/dashboardStore'
import RoseChart from '../components/dashboard/RoseChart.vue'
import StepChart from '../components/dashboard/StepChart.vue'
import BarChart from '../components/dashboard/BarChart.vue'
import StackedBarChart from '../components/dashboard/StackedBarChart.vue'
import ScatterMatrix from '../components/dashboard/ScatterMatrix.vue'
import BubbleChart from '../components/dashboard/BubbleChart.vue'
import PieChart from '../components/dashboard/PieChart.vue'

const store = useDashboardStore()

function handleYearChange(val) {
  store.setYear(val)
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background-color: #0f172a; /* Dark background */
  color: #e2e8f0;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #334155;
  padding-bottom: 15px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-content h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #C4975B; /* Gold */
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  /* Auto rows */
}

.grid-item {
  height: 400px;
  background: #1e293b;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #334155;
  transition: transform 0.2s, box-shadow 0.2s;
}

.grid-item:hover {
  border-color: #475569;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.full-width {
  grid-column: 1 / -1;
  height: 350px;
}

/* Responsive */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}
</style>
