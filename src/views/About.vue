<template>
  <div class="about-page">
    <div class="page-header">
      <h1 class="page-title">关于项目</h1>
      <p class="page-subtitle">探索丝路文明，连接古今智慧</p>
    </div>

    <div class="content-card">
      <section class="about-section">
        <h2 class="section-title">项目简介</h2>
        <p class="section-text">
          "丝路智汇"是一个专注于一带一路中文化与科技互鉴的数据可视化项目。
          通过现代化的可视化技术，我们希望让更多人了解丝绸之路悠久的历史、
          深厚的文化底蕴，以及当代"一带一路"倡议下的科技合作与交流成果。
        </p>
      </section>

      <div class="divider"></div>

      <section class="about-section">
        <h2 class="section-title">技术栈</h2>
        <div class="tech-grid">
          <div class="tech-item">
            <span class="tech-label">前端框架</span>
            <span class="tech-value">Vue 3</span>
          </div>
          <div class="tech-item">
            <span class="tech-label">构建工具</span>
            <span class="tech-value">Vite 5</span>
          </div>
          <div class="tech-item">
            <span class="tech-label">UI 框架</span>
            <span class="tech-value">Ant Design Vue</span>
          </div>
          <div class="tech-item">
            <span class="tech-label">可视化</span>
            <span class="tech-value">ECharts 5</span>
          </div>
          <div class="tech-item">
            <span class="tech-label">状态管理</span>
            <span class="tech-value">Pinia</span>
          </div>
          <div class="tech-item">
            <span class="tech-label">路由</span>
            <span class="tech-value">Vue Router 4</span>
          </div>
        </div>
      </section>

      <div class="divider"></div>

      <section class="about-section">
        <h2 class="section-title">数据来源</h2>
        <p class="section-text">
          项目数据综合了历史文献、现代科技合作数据、地理信息等多方面资料，
          经过整理和可视化处理，以更直观的方式呈现。数据持续更新中。
        </p>
      </section>

      <div class="divider"></div>

      <section class="about-section">
        <h2 class="section-title">开发团队</h2>
        <p class="section-text">
          本项目由信息可视化课程团队开发，旨在通过技术手段传播文化、展示历史。
        </p>
      </section>

      <div class="divider"></div>

      <section class="about-section contact-section">
        <h2 class="section-title">联系我们</h2>
        <p class="section-text">
          如有任何问题或建议，欢迎通过 GitHub Issues 与我们联系。
        </p>
        <a-button type="primary" size="large" href="https://github.com/Erick-xinyaowu/Visualization_of_BR" target="_blank" class="github-btn">
          <template #icon><GithubOutlined /></template>
          访问 GitHub 仓库
        </a-button>
      </section>
    </div>
  </div>
</template>

<script setup>
import { GithubOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.about-page {
  max-width: 1000px;
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
}

.content-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.section-title {
  font-family: "Noto Serif SC", serif;
  font-size: 1.5rem;
  color: var(--accent-gold);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.section-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-primary);
  text-align: justify;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent);
  margin: 2.5rem 0;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.tech-item {
  background: #FBFBFD;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tech-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.tech-value {
  color: var(--accent-blue);
  font-weight: 600;
  font-family: "Source Han Sans CN", sans-serif;
}

.contact-section {
  text-align: center;
}

.contact-section .section-title {
  text-align: center;
}

.contact-section .section-text {
  text-align: center;
  margin-bottom: 2rem;
}

.github-btn {
  background-color: var(--accent-blue);
  border-color: var(--accent-blue);
  height: 48px;
  font-size: 1.1rem;
  padding: 0 2rem;
  border-radius: 24px;
}

.github-btn:hover {
  background-color: var(--accent-gold);
  border-color: var(--accent-gold);
}
</style>
