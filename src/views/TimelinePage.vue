<template>
  <div class="timeline-page">
    <div class="page-header">
      <h1 class="page-title">历史时间轴演进</h1>
      <p class="page-subtitle">追溯丝绸之路上的重要历史事件与发展脉络，见证千年文明的时空对话</p>
    </div>

    <div class="content-card">
      <div class="chart-wrapper">
        <TimelineChart />
      </div>
    </div>

    <div class="timeline-section">
      <h2 class="section-title">重要历史节点</h2>
      <a-timeline mode="alternate">
        <a-timeline-item>
          <template #dot>
            <div class="custom-dot gold"></div>
          </template>
          <div class="timeline-content">
            <div class="timeline-year">公元前138年</div>
            <div class="timeline-event">张骞出使西域，开辟丝绸之路</div>
          </div>
        </a-timeline-item>
        <a-timeline-item>
          <template #dot>
            <div class="custom-dot blue"></div>
          </template>
          <div class="timeline-content">
            <div class="timeline-year">公元73年</div>
            <div class="timeline-event">班超经营西域，巩固丝路贸易</div>
          </div>
        </a-timeline-item>
        <a-timeline-item>
          <template #dot>
            <div class="custom-dot gold"></div>
          </template>
          <div class="timeline-content">
            <div class="timeline-year">7-9世纪</div>
            <div class="timeline-event">唐朝时期丝路贸易达到鼎盛</div>
          </div>
        </a-timeline-item>
        <a-timeline-item>
          <template #dot>
            <div class="custom-dot blue"></div>
          </template>
          <div class="timeline-content">
            <div class="timeline-year">13-14世纪</div>
            <div class="timeline-event">马可·波罗游历东方，促进东西方交流</div>
          </div>
        </a-timeline-item>
        <a-timeline-item>
          <template #dot>
            <StarOutlined style="font-size: 20px; color: var(--accent-red);" />
          </template>
          <div class="timeline-content highlight">
            <div class="timeline-year">2013年</div>
            <div class="timeline-event">"一带一路"倡议提出，开启新时代合作</div>
          </div>
        </a-timeline-item>
      </a-timeline>
    </div>
  </div>
</template>

<script setup>
import TimelineChart from '../components/TimelineChart.vue'
import { StarOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.timeline-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  font-family: "Noto Serif SC", serif;
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-weight: 700;
}

.page-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
}

.content-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.6);
  margin-bottom: 3rem;
}

.timeline-section {
  background: linear-gradient(135deg, #FBFBFD 0%, #F5F5F7 100%);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(0,0,0,0.05);
}

.section-title {
  font-family: "Noto Serif SC", serif;
  font-size: 1.8rem;
  color: var(--accent-blue);
  margin-bottom: 3rem;
  text-align: center;
}

.custom-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 2px currentColor;
}

.custom-dot.gold {
  color: var(--accent-gold);
  background-color: var(--accent-gold);
}

.custom-dot.blue {
  color: var(--accent-blue);
  background-color: var(--accent-blue);
}

.timeline-content {
  padding: 1rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  border: 1px solid rgba(0,0,0,0.02);
}

.timeline-content.highlight {
  background: linear-gradient(135deg, #FFFBF0 0%, #FFFFFF 100%);
  border: 1px solid var(--accent-gold);
}

.timeline-year {
  font-family: "Noto Serif SC", serif;
  font-size: 1.2rem;
  color: var(--accent-gold);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.timeline-event {
  font-size: 1rem;
  color: var(--text-primary);
}
</style>
