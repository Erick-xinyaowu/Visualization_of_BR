<template>
  <div class="map-page">
    <a-card title="🗺️ 丝绸之路地理可视化" class="page-card" :bordered="false">
      <template #extra>
        <a-tag color="blue">互动地图</a-tag>
      </template>
      
      <a-typography-paragraph class="page-description">
        探索古今丝路的地理路线与重要节点城市，追溯千年商道的历史足迹
      </a-typography-paragraph>
      
      <div class="chart-wrapper">
        <SilkRoadMap />
      </div>
    </a-card>

    <a-card title="关于丝绸之路" class="info-card" :bordered="false">
      <a-typography-paragraph>
        丝绸之路是古代连接东西方文明的重要商贸通道，起源于西汉时期（公元前202年-公元9年），
        从长安出发，经河西走廊，通过中亚、西亚，最终抵达地中海沿岸和欧洲。
      </a-typography-paragraph>
      <a-typography-paragraph>
        它不仅是商品贸易之路，更是文化、科技、宗教交流的桥梁，促进了东西方文明的交流互鉴。
      </a-typography-paragraph>
    </a-card>
  </div>
</template>

<script setup>
import SilkRoadMap from '../components/SilkRoadMap.vue'
</script>

<style scoped>
.map-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-card {
  margin-bottom: 24px;
}

.page-description {
  font-size: 1.05rem !important;
  color: var(--text-secondary) !important;
  margin-bottom: 24px !important;
}

.info-card {
  background: linear-gradient(135deg, var(--bg-dark-2) 0%, var(--bg-dark-3) 100%);
}

.info-card :deep(.ant-typography) {
  color: var(--text-primary) !important;
  line-height: 1.8 !important;
  margin-bottom: 16px !important;
}
</style>
