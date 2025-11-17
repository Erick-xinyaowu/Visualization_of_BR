<template>
  <div class="page-container">
    <h2 class="page-title">🗺️ 丝绸之路地理可视化</h2>
    <p class="page-subtitle">探索古今丝路的地理路线与重要节点城市</p>
    
    <div class="chart-wrapper">
      <SilkRoadMap />
    </div>

    <div class="info-section">
      <h3>关于丝绸之路</h3>
      <p>
        丝绸之路是古代连接东西方文明的重要商贸通道，起源于西汉时期（公元前202年-公元9年），
        从长安出发，经河西走廊，通过中亚、西亚，最终抵达地中海沿岸和欧洲。
        它不仅是商品贸易之路，更是文化、科技、宗教交流的桥梁。
      </p>
    </div>
  </div>
</template>

<script setup>
import SilkRoadMap from '../components/SilkRoadMap.vue'
</script>

<style scoped>
.info-section {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 2rem;
}

.info-section h3 {
  color: #667eea;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.info-section p {
  line-height: 1.8;
  color: #555;
  font-size: 1.1rem;
}
</style>
