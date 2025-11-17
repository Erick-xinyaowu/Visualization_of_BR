<template>
  <div class="page-container">
    <h2 class="page-title">🔗 一带一路科技交流网络</h2>
    <p class="page-subtitle">展现国家间的科技合作与知识交流关系</p>
    
    <div class="chart-wrapper">
      <TechExchangeGraph />
    </div>

    <div class="flow-section">
      <h3>科技交流流向分析</h3>
      <SankeyFlow />
    </div>
  </div>
</template>

<script setup>
import TechExchangeGraph from '../components/TechExchangeGraph.vue'
import SankeyFlow from '../components/SankeyFlow.vue'
</script>

<style scoped>
.flow-section {
  margin-top: 3rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.flow-section h3 {
  color: #667eea;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
</style>
