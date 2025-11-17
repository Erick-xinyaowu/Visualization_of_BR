<template>
  <div class="home-page fade-in-up">
    <!-- Hero 区域 -->
    <a-card class="hero-card" :bordered="false">
      <div class="hero-content">
        <a-typography-title :level="1" class="hero-title">
          🌏 丝路智汇
        </a-typography-title>
        <a-typography-title :level="2" class="hero-subtitle" :style="{ color: 'var(--accent-gold)' }">
          一带一路中的文化与科技互鉴可视化
        </a-typography-title>
        <a-typography-paragraph class="hero-description">
          探索古今丝绸之路上的文化传播与科技交流，通过数据可视化展现千年文明的交汇与融合。
          从张骞出使西域到"一带一路"倡议，见证东西方文明交流互鉴的辉煌历程。
        </a-typography-paragraph>
        <a-space :size="16" class="hero-buttons">
          <a-button type="primary" size="large" @click="$router.push('/map')">
            <template #icon><RocketOutlined /></template>
            开始探索
          </a-button>
          <a-button size="large" @click="$router.push('/about')">
            <template #icon><BookOutlined /></template>
            了解更多
          </a-button>
        </a-space>
      </div>
    </a-card>

    <!-- 核心功能 -->
    <div class="features-section">
      <a-typography-title :level="2" class="section-title">
        核心功能
      </a-typography-title>
      <a-row :gutter="[24, 24]">
        <a-col :xs="24" :sm="12" :lg="8">
          <a-card hoverable class="feature-card" @click="$router.push('/map')">
            <div class="feature-icon">🗺️</div>
            <a-typography-title :level="3" class="feature-title">地理可视化</a-typography-title>
            <a-typography-paragraph class="feature-description">
              展示丝绸之路的地理路线、重要城市节点和贸易往来，追溯历史商道的足迹
            </a-typography-paragraph>
            <a-tag color="blue">地理信息</a-tag>
            <a-tag color="cyan">路线图</a-tag>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="8">
          <a-card hoverable class="feature-card" @click="$router.push('/network')">
            <div class="feature-icon">🔗</div>
            <a-typography-title :level="3" class="feature-title">科技交流网络</a-typography-title>
            <a-typography-paragraph class="feature-description">
              呈现一带一路国家间的科技合作与知识交流网络，展现现代丝路的新篇章
            </a-typography-paragraph>
            <a-tag color="green">网络图</a-tag>
            <a-tag color="orange">数据分析</a-tag>
          </a-card>
        </a-col>
        <a-col :xs="24" :sm="12" :lg="8">
          <a-card hoverable class="feature-card" @click="$router.push('/timeline')">
            <div class="feature-icon">📈</div>
            <a-typography-title :level="3" class="feature-title">时间轴演进</a-typography-title>
            <a-typography-paragraph class="feature-description">
              追溯历史发展脉络，展现文化与科技的时空演变，从古至今的文明对话
            </a-typography-paragraph>
            <a-tag color="purple">时间轴</a-tag>
            <a-tag color="magenta">历史</a-tag>
          </a-card>
        </a-col>
      </a-row>
    </div>

    <!-- 统计数据 -->
    <a-card class="stats-card" :bordered="false">
      <a-row :gutter="[32, 32]">
        <a-col :xs="12" :sm="6">
          <div class="stat-item">
            <a-statistic 
              :value="65" 
              suffix="+"
              :value-style="{ color: 'var(--accent-gold)', fontSize: '2.5rem', fontWeight: 700 }"
            >
              <template #title>
                <span style="color: var(--text-secondary); font-size: 1rem;">参与国家</span>
              </template>
            </a-statistic>
          </div>
        </a-col>
        <a-col :xs="12" :sm="6">
          <div class="stat-item">
            <a-statistic 
              :value="2000" 
              suffix="+"
              :value-style="{ color: 'var(--accent-gold)', fontSize: '2.5rem', fontWeight: 700 }"
            >
              <template #title>
                <span style="color: var(--text-secondary); font-size: 1rem;">历史数据点</span>
              </template>
            </a-statistic>
          </div>
        </a-col>
        <a-col :xs="12" :sm="6">
          <div class="stat-item">
            <a-statistic 
              :value="100" 
              suffix="+"
              :value-style="{ color: 'var(--accent-gold)', fontSize: '2.5rem', fontWeight: 700 }"
            >
              <template #title>
                <span style="color: var(--text-secondary); font-size: 1rem;">重要城市节点</span>
              </template>
            </a-statistic>
          </div>
        </a-col>
        <a-col :xs="12" :sm="6">
          <div class="stat-item">
            <a-statistic 
              title="文明交流史" 
              value="千年"
              :value-style="{ color: 'var(--accent-gold)', fontSize: '2.5rem', fontWeight: 700 }"
            >
              <template #title>
                <span style="color: var(--text-secondary); font-size: 1rem;">文明交流史</span>
              </template>
            </a-statistic>
          </div>
        </a-col>
      </a-row>
    </a-card>

    <!-- 项目亮点 -->
    <a-card class="highlights-card" :bordered="false">
      <a-typography-title :level="3" :style="{ color: 'var(--accent-gold)', marginBottom: '24px' }">
        项目亮点
      </a-typography-title>
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :sm="12">
          <div class="highlight-item">
            <CheckCircleOutlined :style="{ fontSize: '24px', color: 'var(--accent-gold)', marginRight: '12px' }" />
            <span>基于 Vue 3 + Vite 现代化技术栈</span>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12">
          <div class="highlight-item">
            <CheckCircleOutlined :style="{ fontSize: '24px', color: 'var(--accent-gold)', marginRight: '12px' }" />
            <span>使用 ECharts 5 强大可视化引擎</span>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12">
          <div class="highlight-item">
            <CheckCircleOutlined :style="{ fontSize: '24px', color: 'var(--accent-gold)', marginRight: '12px' }" />
            <span>Ant Design Vue 企业级 UI 设计</span>
          </div>
        </a-col>
        <a-col :xs="24" :sm="12">
          <div class="highlight-item">
            <CheckCircleOutlined :style="{ fontSize: '24px', color: 'var(--accent-gold)', marginRight: '12px' }" />
            <span>响应式设计，多端适配</span>
          </div>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup>
import { RocketOutlined, BookOutlined, CheckCircleOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero 卡片 */
.hero-card {
  margin-bottom: 32px;
  background: linear-gradient(135deg, var(--bg-dark-2) 0%, var(--bg-dark-3) 100%);
}

.hero-content {
  text-align: center;
  padding: 3rem 2rem;
}

.hero-title {
  font-size: 3.5rem !important;
  color: var(--text-primary) !important;
  margin-bottom: 1rem !important;
  font-family: Montserrat, "Source Han Serif CN", serif !important;
  animation: fadeInDown 0.8s ease;
}

.hero-subtitle {
  font-size: 1.8rem !important;
  margin-bottom: 1.5rem !important;
  animation: fadeInDown 1s ease;
}

.hero-description {
  font-size: 1.1rem !important;
  color: var(--text-secondary) !important;
  max-width: 800px;
  margin: 0 auto 2rem !important;
  line-height: 1.8 !important;
  animation: fadeInUp 1.2s ease;
}

.hero-buttons {
  animation: fadeInUp 1.4s ease;
}

/* 核心功能区 */
.features-section {
  margin: 3rem 0;
}

.section-title {
  text-align: center;
  color: var(--accent-gold) !important;
  margin-bottom: 2rem !important;
  font-size: 2rem !important;
}

.feature-card {
  height: 100%;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card :deep(.ant-card-body) {
  padding: 2rem;
}

.feature-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-title {
  font-size: 1.3rem !important;
  color: var(--accent-gold) !important;
  margin-bottom: 1rem !important;
}

.feature-description {
  color: var(--text-secondary) !important;
  line-height: 1.8 !important;
  margin-bottom: 1rem !important;
}

/* 统计卡片 */
.stats-card {
  margin: 3rem 0;
  background: linear-gradient(135deg, var(--accent-blue) 0%, #2a5a8f 100%);
}

.stat-item {
  text-align: center;
  padding: 1rem;
}

/* 亮点卡片 */
.highlights-card {
  margin: 2rem 0;
}

.highlight-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background: var(--bg-dark-3);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 15px;
  transition: all 0.3s ease;
}

.highlight-item:hover {
  background: rgba(196, 151, 91, 0.1);
  transform: translateX(8px);
}

/* 动画 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.3rem !important;
  }
  
  .hero-content {
    padding: 2rem 1rem;
  }
}
</style>
