<template>
  <div class="timeline-page">
    <a-card title="📈 历史时间轴演进" class="page-card" :bordered="false">
      <template #extra>
        <a-tag color="purple">时间轴</a-tag>
      </template>
      
      <a-typography-paragraph class="page-description">
        追溯丝绸之路上的重要历史事件与发展脉络，见证千年文明的时空对话
      </a-typography-paragraph>
      
      <div class="chart-wrapper">
        <TimelineChart />
      </div>
    </a-card>

    <a-card title="重要历史节点" class="timeline-card" :bordered="false">
      <a-timeline mode="left">
        <a-timeline-item color="blue">
          <template #dot>
            <ClockCircleOutlined style="font-size: 16px;" />
          </template>
          <p><strong>公元前138年</strong></p>
          <p>张骞出使西域，开辟丝绸之路</p>
        </a-timeline-item>
        <a-timeline-item color="green">
          <p><strong>公元73年</strong></p>
          <p>班超经营西域，巩固丝路贸易</p>
        </a-timeline-item>
        <a-timeline-item color="orange">
          <p><strong>7-9世纪</strong></p>
          <p>唐朝时期丝路贸易达到鼎盛</p>
        </a-timeline-item>
        <a-timeline-item color="purple">
          <p><strong>13-14世纪</strong></p>
          <p>马可·波罗游历东方，促进东西方交流</p>
        </a-timeline-item>
        <a-timeline-item color="red">
          <template #dot>
            <StarOutlined style="font-size: 16px;" />
          </template>
          <p><strong>2013年</strong></p>
          <p>"一带一路"倡议提出，开启新时代合作</p>
        </a-timeline-item>
      </a-timeline>
    </a-card>
  </div>
</template>

<script setup>
import TimelineChart from '../components/TimelineChart.vue'
import { ClockCircleOutlined, StarOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.timeline-page {
  max-width: 1400px;
  margin: 0 auto;
}

.page-card,
.timeline-card {
  margin-bottom: 24px;
}

.page-description {
  font-size: 1.05rem !important;
  color: var(--text-secondary) !important;
  margin-bottom: 24px !important;
}

.timeline-card :deep(.ant-timeline-item-content p) {
  color: var(--text-primary);
  margin: 4px 0;
}

.timeline-card :deep(.ant-timeline-item-content strong) {
  color: var(--accent-gold);
  font-size: 1.1rem;
}
</style>
