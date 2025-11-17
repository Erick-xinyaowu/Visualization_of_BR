<template>
  <a-config-provider :theme="{ algorithm: theme.darkAlgorithm, token: themeToken }">
    <a-layout class="main-layout">
      <!-- 顶部导航栏 -->
      <a-layout-header class="site-header">
        <div class="header-content">
          <div class="logo">
            <span class="logo-icon">🌏</span>
            <span class="logo-text">丝路智汇</span>
          </div>
          <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="horizontal"
            class="nav-menu"
            :style="{ lineHeight: '64px', borderBottom: 'none' }"
          >
            <a-menu-item key="/">
              <router-link to="/">
                <HomeOutlined />
                首页
              </router-link>
            </a-menu-item>
            <a-menu-item key="/map">
              <router-link to="/map">
                <EnvironmentOutlined />
                地理可视化
              </router-link>
            </a-menu-item>
            <a-menu-item key="/network">
              <router-link to="/network">
                <ApartmentOutlined />
                科技互鉴网络
              </router-link>
            </a-menu-item>
            <a-menu-item key="/timeline">
              <router-link to="/timeline">
                <ClockCircleOutlined />
                时间轴演进
              </router-link>
            </a-menu-item>
            <a-menu-item key="/about">
              <router-link to="/about">
                <InfoCircleOutlined />
                关于项目
              </router-link>
            </a-menu-item>
          </a-menu>
        </div>
      </a-layout-header>

      <!-- 内容区域 -->
      <a-layout-content class="site-content">
        <div class="content-wrapper">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </a-layout-content>

      <!-- 页脚 -->
      <a-layout-footer class="site-footer">
        <div class="footer-content">
          <p>&copy; 2025 丝路智汇 - 一带一路中的文化与科技互鉴可视化</p>
          <p class="footer-tech">
            <a-tag color="blue">Vue 3</a-tag>
            <a-tag color="blue">Vite</a-tag>
            <a-tag color="blue">ECharts</a-tag>
            <a-tag color="gold">Ant Design Vue</a-tag>
          </p>
        </div>
      </a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { theme } from 'ant-design-vue'
import {
  HomeOutlined,
  EnvironmentOutlined,
  ApartmentOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons-vue'

const route = useRoute()
const selectedKeys = ref([route.path])

// 监听路由变化，更新选中的菜单项
watch(() => route.path, (newPath) => {
  selectedKeys.value = [newPath]
})

// 主题配置
const themeToken = {
  colorPrimary: '#1E3F66',
  colorInfo: '#1E3F66',
  colorSuccess: '#C4975B',
  colorWarning: '#C4975B',
  colorTextBase: '#EAEAEA',
  colorBgBase: '#1B263B',
  fontFamily: 'Montserrat, "Source Han Sans CN", sans-serif',
  borderRadius: 12,
}
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  background: var(--bg-dark);
}

/* 头部样式 */
.site-header {
  background: linear-gradient(135deg, #1E3F66 0%, #2a5a8f 100%);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
  padding: 0;
  height: 64px;
  line-height: 64px;
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 2px solid var(--accent-gold);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo 样式 */
.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-icon {
  font-size: 2rem;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-gold);
  font-family: Montserrat, "Source Han Serif CN", serif;
  letter-spacing: 2px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* 导航菜单 */
.nav-menu {
  background: transparent;
  border: none;
  flex: 1;
  justify-content: flex-end;
}

.nav-menu :deep(.ant-menu-item) {
  color: #EAEAEA;
  font-size: 15px;
  font-weight: 500;
  margin: 0 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-menu :deep(.ant-menu-item:hover) {
  background: rgba(196, 151, 91, 0.15);
  color: var(--accent-gold);
}

.nav-menu :deep(.ant-menu-item-selected) {
  background: rgba(196, 151, 91, 0.2);
  color: var(--accent-gold);
  font-weight: 600;
}

.nav-menu :deep(.ant-menu-item-selected::after) {
  border-bottom: 3px solid var(--accent-gold);
}

.nav-menu :deep(a) {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-menu :deep(.anticon) {
  font-size: 16px;
}

/* 内容区域 */
.site-content {
  background: var(--bg-dark);
  min-height: calc(100vh - 200px);
}

.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
}

/* 页脚 */
.site-footer {
  background: var(--bg-dark-2);
  border-top: 2px solid var(--border-color);
  text-align: center;
  padding: 32px 24px;
}

.footer-content p {
  margin: 8px 0;
  color: var(--text-secondary);
}

.footer-tech {
  margin-top: 12px;
}

.footer-tech :deep(.ant-tag) {
  margin: 4px;
}

/* 页面切换动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 响应式 */
@media (max-width: 768px) {
  .header-content {
    padding: 0 16px;
  }
  
  .logo-text {
    font-size: 1.2rem;
  }
  
  .nav-menu :deep(.ant-menu-item) {
    font-size: 13px;
    margin: 0 4px;
    padding: 0 12px;
  }
  
  .nav-menu :deep(a span:last-child) {
    display: none;
  }
  
  .content-wrapper {
    padding: 16px;
  }
}
</style>
