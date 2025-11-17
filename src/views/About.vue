<template>
  <div class="about-page">
    <a-card title="📖 关于项目" class="page-card" :bordered="false">
      
      <a-typography-title :level="3" :style="{ color: 'var(--accent-gold)' }">
        项目简介
      </a-typography-title>
      <a-typography-paragraph>
        "丝路智汇"是一个专注于一带一路中文化与科技互鉴的数据可视化项目。
        通过现代化的可视化技术，我们希望让更多人了解丝绸之路悠久的历史、
        深厚的文化底蕴，以及当代"一带一路"倡议下的科技合作与交流成果。
      </a-typography-paragraph>

      <a-divider />

      <a-typography-title :level="3" :style="{ color: 'var(--accent-gold)' }">
        技术栈
      </a-typography-title>
      <a-descriptions :column="{ xs: 1, sm: 2, md: 3 }" bordered>
        <a-descriptions-item label="前端框架">
          <a-tag color="green">Vue 3</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="构建工具">
          <a-tag color="blue">Vite 5</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="UI 框架">
          <a-tag color="blue">Ant Design Vue</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="可视化">
          <a-tag color="red">ECharts 5</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="状态管理">
          <a-tag color="yellow">Pinia</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="路由">
          <a-tag color="green">Vue Router 4</a-tag>
        </a-descriptions-item>
      </a-descriptions>

      <a-divider />

      <a-typography-title :level="3" :style="{ color: 'var(--accent-gold)' }">
        数据来源
      </a-typography-title>
      <a-typography-paragraph>
        项目数据综合了历史文献、现代科技合作数据、地理信息等多方面资料，
        经过整理和可视化处理，以更直观的方式呈现。数据持续更新中。
      </a-typography-paragraph>

      <a-divider />

      <a-typography-title :level="3" :style="{ color: 'var(--accent-gold)' }">
        开发团队
      </a-typography-title>
      <a-typography-paragraph>
        本项目由信息可视化课程团队开发，旨在通过技术手段传播文化、展示历史。
      </a-typography-paragraph>

      <a-divider />

      <a-typography-title :level="3" :style="{ color: 'var(--accent-gold)' }">
        联系我们
      </a-typography-title>
      <a-space direction="vertical" :size="16">
        <a-typography-paragraph>
          如有任何问题或建议，欢迎通过 GitHub Issues 与我们联系。
        </a-typography-paragraph>
        <a-button type="primary" size="large" href="https://github.com/Erick-xinyaowu/Visualization_of_BR" target="_blank">
          <template #icon><GithubOutlined /></template>
          访问 GitHub 仓库
        </a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup>
import { GithubOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.about-page {
  max-width: 1000px;
  margin: 0 auto;
}

.page-card :deep(.ant-typography) {
  color: var(--text-primary) !important;
  line-height: 1.8 !important;
}

.page-card :deep(.ant-descriptions-item-label) {
  font-weight: 600 !important;
}

.page-card :deep(.ant-divider) {
  border-color: var(--border-color) !important;
  margin: 32px 0 !important;
}
</style>
