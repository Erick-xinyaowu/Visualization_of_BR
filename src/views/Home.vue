<template>
  <div class="home-container">
    <section class="hero">
      <h1 class="hero-title">🌏 丝路智汇</h1>
      <h2 class="hero-subtitle">一带一路中的文化与科技互鉴可视化</h2>
      <p class="hero-description">
        探索古今丝绸之路上的文化传播与科技交流，通过数据可视化展现千年文明的交汇与融合
      </p>
      <div class="hero-buttons">
        <router-link to="/map" class="btn btn-primary">开始探索</router-link>
        <router-link to="/about" class="btn btn-secondary">了解更多</router-link>
      </div>
    </section>

    <section class="features">
      <h3 class="section-title">核心功能</h3>
      <div class="feature-grid">
        <div class="feature-card" @click="$router.push('/map')">
          <div class="feature-icon">🗺️</div>
          <h4>地理可视化</h4>
          <p>展示丝绸之路的地理路线、重要城市节点和贸易往来</p>
        </div>
        <div class="feature-card" @click="$router.push('/network')">
          <div class="feature-icon">🔗</div>
          <h4>科技交流网络</h4>
          <p>呈现一带一路国家间的科技合作与知识交流网络</p>
        </div>
        <div class="feature-card" @click="$router.push('/timeline')">
          <div class="feature-icon">📈</div>
          <h4>时间轴演进</h4>
          <p>追溯历史发展脉络，展现文化与科技的时空演变</p>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="stat-item">
        <h3>65+</h3>
        <p>参与国家</p>
      </div>
      <div class="stat-item">
        <h3>2000+</h3>
        <p>历史数据点</p>
      </div>
      <div class="stat-item">
        <h3>100+</h3>
        <p>重要城市节点</p>
      </div>
      <div class="stat-item">
        <h3>千年</h3>
        <p>文明交流史</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Home page mounted')
})
</script>

<style scoped>
.home-container {
  max-width: 1200px;
  margin: 0 auto;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 16px;
  margin-bottom: 3rem;
}

.hero-title {
  font-size: 3.5rem;
  color: #667eea;
  margin-bottom: 1rem;
  animation: fadeInDown 0.8s ease;
}

.hero-subtitle {
  font-size: 1.8rem;
  color: #764ba2;
  margin-bottom: 1.5rem;
  animation: fadeInDown 1s ease;
}

.hero-description {
  font-size: 1.2rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.8;
  animation: fadeInUp 1.2s ease;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  animation: fadeInUp 1.4s ease;
}

.btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  cursor: pointer;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.btn-secondary:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.section-title {
  font-size: 2rem;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.features {
  margin: 4rem 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h4 {
  font-size: 1.5rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  padding: 3rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-item {
  text-align: center;
}

.stat-item h3 {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.stat-item p {
  font-size: 1.1rem;
  color: #666;
}

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
</style>
