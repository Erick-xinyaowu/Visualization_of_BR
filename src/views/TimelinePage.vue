<template>
  <div class="page-container">
    <h2 class="page-title">📈 历史时间轴演进</h2>
    <p class="page-subtitle">追溯丝绸之路上的重要历史事件与发展脉络</p>
    
    <div class="chart-wrapper">
      <TimelineChart />
    </div>

    <div class="timeline-description">
      <h3>重要历史节点</h3>
      <ul>
        <li><strong>公元前138年</strong> - 张骞出使西域，开辟丝绸之路</li>
        <li><strong>公元73年</strong> - 班超经营西域，巩固丝路贸易</li>
        <li><strong>7-9世纪</strong> - 唐朝时期丝路贸易达到鼎盛</li>
        <li><strong>13-14世纪</strong> - 马可·波罗游历东方，促进东西方交流</li>
        <li><strong>2013年</strong> - "一带一路"倡议提出，开启新时代合作</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import TimelineChart from '../components/TimelineChart.vue'
</script>

<style scoped>
.timeline-description {
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 2rem;
}

.timeline-description h3 {
  color: #667eea;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.timeline-description ul {
  list-style: none;
  padding: 0;
}

.timeline-description li {
  padding: 1rem;
  margin: 0.5rem 0;
  background: white;
  border-left: 4px solid #667eea;
  border-radius: 4px;
  font-size: 1.05rem;
  color: #555;
}

.timeline-description strong {
  color: #764ba2;
}
</style>
