<template>
  <div class="global-legend">
    <div 
      v-for="(color, country) in store.countryColors" 
      :key="country" 
      class="legend-item"
      @click="store.toggleCountrySelection(country)"
      :class="{ active: store.selectedCountries.includes(country), dimmed: store.selectedCountries.length > 0 && !store.selectedCountries.includes(country) }"
    >
      <span class="color-box" :style="{ backgroundColor: color }"></span>
      <span class="country-name">{{ country }}</span>
    </div>
  </div>
</template>

<script setup>
import { useDashboardStore } from '../../store/dashboardStore'
const store = useDashboardStore()
</script>

<style scoped>
.global-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  padding: 5px;
  justify-content: center;
  max-height: 60px;
  overflow-y: auto;
}

/* Custom Scrollbar */
.global-legend::-webkit-scrollbar {
  width: 4px;
}
.global-legend::-webkit-scrollbar-track {
  background: #1e293b; 
}
.global-legend::-webkit-scrollbar-thumb {
  background: #475569; 
  border-radius: 2px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.75rem;
  color: #94a3b8;
  user-select: none;
}

.legend-item:hover {
  color: #e2e8f0;
  transform: translateY(-1px);
}

.legend-item.dimmed {
  opacity: 0.3;
}

.legend-item.active {
  opacity: 1;
  color: #fff;
  font-weight: 600;
}

.color-box {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0,0,0,0.5);
}
</style>
