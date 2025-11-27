<template>
  <div class="home-page fade-in-up">
    <!-- Hero 区域 -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="hero-decoration-top"></div>
        <h1 class="hero-title">
          <span class="title-seal">丝路</span>
          <span class="title-text">智汇</span>
        </h1>
        <h2 class="hero-subtitle">
          一带一路中的文化与科技互鉴可视化
        </h2>
        <p class="hero-description">
          探索古今丝绸之路上的文化传播与科技交流，通过数据可视化展现千年文明的交汇与融合。
          从张骞出使西域到"一带一路"倡议，见证东西方文明交流互鉴的辉煌历程。
        </p>
        <a-space :size="24" class="hero-buttons">
          <a-button type="primary" size="large" class="btn-glow" @click="$router.push('/map')">
            <template #icon><CompassOutlined /></template>
            开始探索
          </a-button>
          <a-button size="large" class="btn-outline" @click="$router.push('/animation')">
            <template #icon><PlayCircleOutlined /></template>
            动画简介
          </a-button>
          <a-button size="large" class="btn-outline" @click="$router.push('/about')">
            <template #icon><ReadOutlined /></template>
            了解更多
          </a-button>
        </a-space>
        <div class="hero-decoration-bottom"></div>
      </div>
    </div>

    <!-- 核心功能 -->
    <div class="features-section">
      <div class="section-header">
        <span class="section-subtitle">FEATURES</span>
        <h2 class="section-title">核心功能</h2>
      </div>
      <a-row :gutter="[32, 32]">
        <a-col :xs="24" :sm="12" :lg="6">
          <div class="feature-card-wrapper" @click="$router.push('/map')">
            <div class="feature-card-inner">
              <div class="feature-icon-box">
                <GlobalOutlined />
              </div>
              <h3 class="feature-title">地理可视化</h3>
              <p class="feature-description">
                展示丝绸之路的地理路线、重要城市节点和贸易往来，追溯历史商道的足迹
              </p>
              <div class="feature-tags">
                <span class="feature-tag">地理信息</span>
                <span class="feature-tag">路线图</span>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="6">
          <div class="feature-card-wrapper" @click="$router.push('/network')">
            <div class="feature-card-inner">
              <div class="feature-icon-box">
                <ShareAltOutlined />
              </div>
              <h3 class="feature-title">科技交流网络</h3>
              <p class="feature-description">
                呈现一带一路国家间的科技合作与知识交流网络，展现现代丝路的新篇章
              </p>
              <div class="feature-tags">
                <span class="feature-tag">网络图</span>
                <span class="feature-tag">数据分析</span>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="6">
          <div class="feature-card-wrapper" @click="$router.push('/timeline')">
            <div class="feature-card-inner">
              <div class="feature-icon-box">
                <HistoryOutlined />
              </div>
              <h3 class="feature-title">时间轴演进</h3>
              <p class="feature-description">
                追溯历史发展脉络，展现文化与科技的时空演变，从古至今的文明对话
              </p>
              <div class="feature-tags">
                <span class="feature-tag">时间轴</span>
                <span class="feature-tag">历史</span>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="6">
          <div class="feature-card-wrapper" @click="$router.push('/dashboard')">
            <div class="feature-card-inner">
              <div class="feature-icon-box">
                <AppstoreOutlined />
              </div>
              <h3 class="feature-title">多维协同分析</h3>
              <p class="feature-description">
                通过多视图联动探索文化、科技、经贸等多维数据的深层关联与模式
              </p>
              <div class="feature-tags">
                <span class="feature-tag">多视图</span>
                <span class="feature-tag">交互分析</span>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <!-- 统计数据 -->
    <div class="stats-section">
      <div class="stats-container">
        <a-row :gutter="[32, 32]" justify="center">
          <a-col :xs="12" :sm="6">
            <div class="stat-item">
              <div class="stat-value">65<span class="stat-suffix">+</span></div>
              <div class="stat-label">参与国家</div>
            </div>
          </a-col>
          <a-col :xs="12" :sm="6">
            <div class="stat-item">
              <div class="stat-value">2000<span class="stat-suffix">+</span></div>
              <div class="stat-label">历史数据点</div>
            </div>
          </a-col>
          <a-col :xs="12" :sm="6">
            <div class="stat-item">
              <div class="stat-value">100<span class="stat-suffix">+</span></div>
              <div class="stat-label">重要城市节点</div>
            </div>
          </a-col>
          <a-col :xs="12" :sm="6">
            <div class="stat-item">
              <div class="stat-value">千年</div>
              <div class="stat-label">文明交流史</div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>

    <!-- 项目亮点 -->
    <div class="highlights-section">
      <div class="section-header">
        <span class="section-subtitle">HIGHLIGHTS</span>
        <h2 class="section-title">项目亮点</h2>
      </div>
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :sm="12">
          <div class="highlight-item">
            <div class="highlight-icon"><CheckCircleOutlined /></div>
            <div class="highlight-text">基于 Vue 3 + Vite 现代化技术栈</div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12">
          <div class="highlight-item">
            <div class="highlight-icon"><CheckCircleOutlined /></div>
            <div class="highlight-text">使用 ECharts 5 强大可视化引擎</div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12">
          <div class="highlight-item">
            <div class="highlight-icon"><CheckCircleOutlined /></div>
            <div class="highlight-text">Ant Design Vue 企业级 UI 设计</div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12">
          <div class="highlight-item">
            <div class="highlight-icon"><CheckCircleOutlined /></div>
            <div class="highlight-text">响应式设计，多端适配</div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup>
import { 
  CompassOutlined, 
  ReadOutlined, 
  CheckCircleOutlined,
  GlobalOutlined,
  ShareAltOutlined,
  HistoryOutlined,
  PlayCircleOutlined,
  AppstoreOutlined
} from '@ant-design/icons-vue'
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 4rem;
}

/* Hero 区域 */
.hero-section {
  position: relative;
  padding: 8rem 2rem 6rem;
  text-align: center;
  margin-bottom: 2rem;
  background: radial-gradient(circle at 50% 30%, rgba(44, 85, 120, 0.05) 0%, transparent 70%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
}

.hero-title {
  font-size: 4.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  font-family: "Noto Serif SC", serif;
}

.title-seal {
  background: #C0392B;
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 12px;
  font-family: "Ma Shan Zheng", cursive;
  font-size: 3.5rem;
  transform: rotate(-5deg);
  box-shadow: 0 8px 24px rgba(192, 57, 43, 0.3);
  border: 2px solid rgba(255,255,255,0.3);
}

.title-text {
  color: #2C3E50;
  letter-spacing: 0.5rem;
  font-weight: 800;
}

.hero-subtitle {
  font-size: 1.8rem;
  color: #2C5578;
  margin-bottom: 2rem;
  font-weight: 400;
  letter-spacing: 2px;
  font-family: "Noto Serif SC", serif;
}

.hero-description {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 3rem;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons .ant-btn {
  height: 50px;
  padding: 0 32px;
  font-size: 16px;
  border-radius: 25px;
}

.btn-glow {
  box-shadow: 0 8px 20px rgba(44, 85, 120, 0.3);
}

.btn-outline {
  border-color: #B49356 !important;
  color: #B49356 !important;
}

.btn-outline:hover {
  background: rgba(180, 147, 86, 0.1) !important;
}

/* 装饰线 */
.hero-decoration-top,
.hero-decoration-bottom {
  height: 1px;
  background: radial-gradient(circle, #B49356 0%, transparent 100%);
  opacity: 0.3;
  margin: 2rem auto;
  width: 60%;
}

/* 章节通用 */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-subtitle {
  display: block;
  font-size: 0.9rem;
  color: #B49356;
  letter-spacing: 4px;
  margin-bottom: 0.5rem;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}

.section-title {
  font-size: 2.2rem;
  color: #2C3E50;
  font-family: "Noto Serif SC", serif;
  margin: 0;
  font-weight: 700;
}

/* 特性卡片 */
.features-section {
  margin: 4rem 0;
}

.feature-card-wrapper {
  height: 100%;
  cursor: pointer;
  perspective: 1000px;
}

.feature-card-inner {
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.05);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  transition: all 0.4s ease;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.feature-card-inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, transparent, #B49356, transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.feature-card-wrapper:hover .feature-card-inner {
  transform: translateY(-10px);
  border-color: rgba(180, 147, 86, 0.3);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

.feature-card-wrapper:hover .feature-card-inner::before {
  opacity: 1;
}

.feature-icon-box {
  font-size: 3rem;
  color: #B49356;
  margin-bottom: 1.5rem;
  background: rgba(180, 147, 86, 0.1);
  width: 80px;
  height: 80px;
  line-height: 80px;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
}

.feature-title {
  font-size: 1.4rem;
  color: #2C3E50;
  margin-bottom: 1rem;
  font-family: "Noto Serif SC", serif;
  font-weight: 600;
}

.feature-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.feature-tags {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.feature-tag {
  font-size: 0.8rem;
  padding: 2px 10px;
  background: #F5F5F7;
  border-radius: 12px;
  color: #86868B;
}

/* 统计区域 */
.stats-section {
  margin: 4rem 0;
  padding: 4rem 0;
  background: #F9FAFB;
  border-radius: 24px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 3.5rem;
  font-weight: 700;
  color: #2C5578;
  font-family: "Montserrat", sans-serif;
  margin-bottom: 0.5rem;
}

.stat-suffix {
  font-size: 2rem;
  vertical-align: top;
  margin-left: 4px;
  color: #B49356;
}

.stat-label {
  font-size: 1.1rem;
  color: #666;
  font-family: "Noto Serif SC", serif;
}

/* 亮点区域 */
.highlights-section {
  margin: 4rem 0;
}

.highlight-item {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.highlight-item:hover {
  border-color: #B49356;
  transform: translateX(5px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.highlight-icon {
  font-size: 1.5rem;
  color: #B49356;
  margin-right: 1rem;
}

.highlight-text {
  font-size: 1.1rem;
  color: #2C3E50;
  font-weight: 500;
}

/* 响应式 */
@media (max-width: 992px) {
  .hero-title {
    font-size: 3.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: 0;
  }
  
  .hero-section {
    min-height: 60vh;
    padding: 60px 20px 40px;
  }
  
  .hero-title {
    font-size: 2.5rem;
    flex-direction: column;
    gap: 8px;
  }
  
  .title-seal {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  .hero-description {
    font-size: 0.95rem;
    max-width: 100%;
  }
  
  .cta-buttons {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 280px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 40px 20px;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  .features-section {
    padding: 40px 20px;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .title-seal {
    font-size: 1.6rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
  }
  
  .hero-description {
    font-size: 0.9rem;
  }
  
  .stat-value {
    font-size: 1.8rem;
  }
  
  .stat-label {
    font-size: 0.85rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
  
  .feature-card {
    padding: 20px;
  }
  
  .feature-icon {
    font-size: 2rem;
  }
  
  .feature-title {
    font-size: 1.1rem;
  }
}
</style>
