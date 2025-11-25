<template>
  <a-config-provider
    :theme="{
      algorithm: theme.defaultAlgorithm,
      token: themeToken
    }"
  >
    <a-layout class="layout-container">
      <!-- 顶部导航栏 - 亮色透明 -->
      <a-layout-header class="header">
        <div class="header-content">
          <div class="logo-container" @click="router.push('/')">
            <div class="logo-seal">丝路</div>
            <div class="logo-text">
              <span class="logo-main">丝路智汇</span>
              <span class="logo-sub">The Silk Road Visualization</span>
            </div>
          </div>
          
          <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="horizontal"
            class="nav-menu"
            :style="{ lineHeight: '72px', borderBottom: 'none' }"
          >
            <a-menu-item key="/">
              <router-link to="/">
                <HomeOutlined />
                首页概览
              </router-link>
            </a-menu-item>
            <a-menu-item key="/map">
              <router-link to="/map">
                <GlobalOutlined />
                丝路地图
              </router-link>
            </a-menu-item>
            <a-menu-item key="/network">
              <router-link to="/network">
                <ShareAltOutlined />
                贸易网络
              </router-link>
            </a-menu-item>
            <a-menu-item key="/timeline">
              <router-link to="/timeline">
                <HistoryOutlined />
                历史长河
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
      <a-layout-content class="content-wrapper">
        <router-view v-slot="{ Component }">
          <transition name="fade-scale" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </a-layout-content>

      <!-- 底部 -->
      <a-layout-footer class="site-footer">
        <div class="footer-content">
          <div class="footer-logo">丝路智汇</div>
          <p class="footer-desc">传承丝路精神 · 展现数据之美</p>
          <p class="copyright">©2024 Visualization Team. All Rights Reserved.</p>
        </div>
      </a-layout-footer>
    </a-layout>
  </a-config-provider>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { theme } from 'ant-design-vue';
import { 
  HomeOutlined, 
  GlobalOutlined, 
  ShareAltOutlined, 
  HistoryOutlined, 
  InfoCircleOutlined 
} from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const selectedKeys = ref(['/']);

// 自定义主题 Token - 亮色高级感
const themeToken = {
  colorPrimary: '#2C5578', // 黛蓝
  colorBgBase: '#FFFFFF',
  colorTextBase: '#1D1D1F',
  fontFamily: '"Source Han Sans CN", sans-serif',
  borderRadius: 8,
  wireframe: false,
};

watch(
  () => route.path,
  (path) => {
    selectedKeys.value = [path];
  },
  { immediate: true }
);
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  background: #F5F5F7;
}

/* 头部样式 */
.header {
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 72px;
  padding: 0;
  background: rgba(255, 255, 255, 0.8); /* 亮色磨砂 */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

/* Logo 样式 */
.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.logo-container:hover {
  opacity: 0.8;
}

.logo-seal {
  width: 40px;
  height: 40px;
  background: #C0392B; /* 胭脂红印章 */
  color: #fff;
  border-radius: 8px; /* 圆角矩形 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Noto Serif SC", serif;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(192, 57, 43, 0.3);
}

.logo-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo-main {
  font-size: 20px;
  font-weight: 700;
  color: #1D1D1F;
  font-family: "Noto Serif SC", serif;
  letter-spacing: 1px;
  line-height: 1.4;
  margin-bottom: 2px;
}

.logo-sub {
  font-size: 10px;
  color: #86868B;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.2;
}

/* 导航菜单 */
.nav-menu {
  background: transparent;
  border-bottom: none;
  min-width: 500px;
  justify-content: flex-end;
}

.nav-menu :deep(.ant-menu-item) {
  color: #86868B;
  font-size: 14px;
  font-weight: 500;
  margin: 0 4px;
}

.nav-menu :deep(.ant-menu-item:hover) {
  color: #2C5578 !important;
}

.nav-menu :deep(.ant-menu-item-selected) {
  color: #2C5578 !important;
  background: rgba(44, 85, 120, 0.08) !important;
  border-radius: 8px;
}

.nav-menu :deep(.ant-menu-item-selected::after) {
  display: none;
}

.nav-menu :deep(a) {
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 内容区域 */
.content-wrapper {
  margin-top: 72px;
  min-height: calc(100vh - 72px - 200px);
}

/* 底部样式 */
.site-footer {
  background: #FFFFFF;
  padding: 60px 0;
  text-align: center;
  border-top: 1px solid rgba(0,0,0,0.05);
}

.footer-logo {
  font-family: "Noto Serif SC", serif;
  font-size: 24px;
  font-weight: 700;
  color: #1D1D1F;
  margin-bottom: 12px;
}

.footer-desc {
  color: #86868B;
  margin-bottom: 24px;
  font-size: 14px;
}

.copyright {
  color: #D1D1D6;
  font-size: 12px;
}

/* 路由过渡动画 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.98) translateY(10px);
}

.fade-scale-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .header {
    height: 64px;
  }
  
  .content-wrapper {
    margin-top: 64px;
  }
  
  .logo-sub {
    display: none;
  }
  
  .nav-menu {
    min-width: auto;
  }
  
  .nav-menu :deep(a span:last-child) {
    display: none;
  }
}
</style>
