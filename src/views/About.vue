<template>
  <div class="page-container">
    <h2 class="page-title">📖 关于项目</h2>
    
    <section class="about-section">
      <h3>项目简介</h3>
      <p>
        "丝路智汇"是一个专注于一带一路中文化与科技互鉴的数据可视化项目。
        通过现代化的可视化技术，我们希望让更多人了解丝绸之路悠久的历史、
        深厚的文化底蕴，以及当代"一带一路"倡议下的科技合作与交流成果。
      </p>
    </section>

    <section class="about-section">
      <h3>技术栈</h3>
      <div class="tech-stack">
        <div class="tech-item">
          <span class="tech-icon">⚡</span>
          <div>
            <h4>Vue 3 + Vite</h4>
            <p>现代化前端框架与构建工具</p>
          </div>
        </div>
        <div class="tech-item">
          <span class="tech-icon">📊</span>
          <div>
            <h4>ECharts</h4>
            <p>强大的数据可视化图表库</p>
          </div>
        </div>
        <div class="tech-item">
          <span class="tech-icon">🗂️</span>
          <div>
            <h4>Pinia</h4>
            <p>Vue 3 状态管理方案</p>
          </div>
        </div>
        <div class="tech-item">
          <span class="tech-icon">🧭</span>
          <div>
            <h4>Vue Router</h4>
            <p>官方路由管理工具</p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-section">
      <h3>数据来源</h3>
      <p>
        项目数据综合了历史文献、现代科技合作数据、地理信息等多方面资料，
        经过整理和可视化处理，以更直观的方式呈现。数据持续更新中。
      </p>
    </section>

    <section class="about-section">
      <h3>开发团队</h3>
      <p>
        本项目由信息可视化课程团队开发，旨在通过技术手段传播文化、展示历史。
      </p>
    </section>

    <section class="about-section">
      <h3>联系我们</h3>
      <p>
        如有任何问题或建议，欢迎通过 GitHub Issues 与我们联系。
      </p>
      <div class="contact-links">
        <a href="https://github.com/Erick-xinyaowu/Visualization_of_BR" target="_blank" class="contact-btn">
          🔗 GitHub 仓库
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>

<style scoped>
.about-section {
  margin: 2rem 0;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.about-section h3 {
  color: #667eea;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.about-section p {
  line-height: 1.8;
  color: #555;
  font-size: 1.1rem;
}

.tech-stack {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.tech-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tech-icon {
  font-size: 2.5rem;
}

.tech-item h4 {
  color: #333;
  margin-bottom: 0.3rem;
}

.tech-item p {
  color: #666;
  font-size: 0.9rem;
}

.contact-links {
  margin-top: 1.5rem;
}

.contact-btn {
  display: inline-block;
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s;
}

.contact-btn:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}
</style>
