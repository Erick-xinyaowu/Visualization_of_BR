<template>
  <div id="app">
    <nav class="navbar">
      <div class="nav-container">
        <h1 class="logo">🌏 丝路智汇</h1>
        <ul class="nav-menu">
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/map">地理可视化</router-link></li>
          <li><router-link to="/network">科技交流网络</router-link></li>
          <li><router-link to="/timeline">时间轴演进</router-link></li>
          <li><router-link to="/about">关于项目</router-link></li>
        </ul>
      </div>
    </nav>
    <main class="main-content">
      <router-view></router-view>
    </main>
    <footer class="footer">
      <p>&copy; 2025 丝路智汇 - 一带一路中的文化与科技互鉴可视化</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDataStore } from './store'

const dataStore = useDataStore()

onMounted(() => {
  // 初始化加载数据
  dataStore.loadAllData()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.8rem;
  color: #667eea;
  font-weight: bold;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-menu a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

.nav-menu a:hover,
.nav-menu a.router-link-active {
  color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.main-content {
  flex: 1;
  max-width: 1400px;
  width: 100%;
  margin: 2rem auto;
  padding: 0 2rem;
}

.footer {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
}

.footer p {
  font-size: 0.9rem;
}
</style>
