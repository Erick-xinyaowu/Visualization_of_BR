<template>
  <div class="network-page">
    <a-card title="🔗 一带一路科技交流网络" class="page-card" :bordered="false">
      <template #extra>
        <a-space>
          <a-tag color="#2C5578">网络图</a-tag>
          <a-tag color="#B49356">数据分析</a-tag>
        </a-space>
      </template>
      
      <a-typography-paragraph class="page-description">
        展现国家间的科技合作与知识交流关系，揭示现代丝路的科技互鉴网络
      </a-typography-paragraph>
      
      <div class="chart-wrapper">
        <TechExchangeGraph />
      </div>
    </a-card>

    <a-card title="科技交流流向分析" class="flow-card" :bordered="false">
      <div class="chart-wrapper">
        <SankeyFlow />
      </div>
    </a-card>
  </div>
</template>

<script setup>
import TechExchangeGraph from '../components/TechExchangeGraph.vue'
import SankeyFlow from '../components/SankeyFlow.vue'
</script>

<style scoped>
.network-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-card,
.flow-card {
  margin-bottom: 24px;
  background: #FFFFFF;
}

.page-description {
  font-size: 1.05rem !important;
  color: #666 !important;
  margin-bottom: 24px !important;
}

/* 覆盖 chart-wrapper 样式以适应亮色 */
.chart-wrapper {
  background: #FBFBFD;
  border: 1px solid rgba(0,0,0,0.03);
}
</style>
