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
          
          <!-- 移动端汉堡菜单按钮 -->
          <a-button 
            class="mobile-menu-btn" 
            type="text" 
            @click="drawerVisible = true"
          >
            <MenuOutlined :style="{ fontSize: '20px', color: '#2C5578' }" />
          </a-button>

          <!-- 桌面端导航菜单 -->
          <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="horizontal"
            class="nav-menu desktop-menu"
            :style="{ lineHeight: '72px', borderBottom: 'none' }"
          >
            <a-menu-item key="/">
              <router-link to="/">
                <HomeOutlined />
                首页概览
              </router-link>
            </a-menu-item>
            <a-menu-item key="/dashboard">
              <router-link to="/dashboard">
                <AppstoreOutlined />
                数据表盘
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

          <!-- 移动端抽屉导航 -->
                  <a-drawer
                    v-model:open="drawerVisible"
                    placement="right"
                    :closable="false"
                    :width="drawerWidth"
                    class="mobile-drawer"
                  >
            <a-menu
              v-model:selectedKeys="selectedKeys"
              mode="vertical"
              class="mobile-nav-menu"
              @click="drawerVisible = false"
            >
              <a-menu-item key="/">
                <router-link to="/">
                  <HomeOutlined />
                  <span>首页概览</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="/dashboard">
                <router-link to="/dashboard">
                  <AppstoreOutlined />
                  <span>数据表盘</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="/map">
                <router-link to="/map">
                  <GlobalOutlined />
                  <span>丝路地图</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="/network">
                <router-link to="/network">
                  <ShareAltOutlined />
                  <span>贸易网络</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="/timeline">
                <router-link to="/timeline">
                  <HistoryOutlined />
                  <span>历史长河</span>
                </router-link>
              </a-menu-item>
              <a-menu-item key="/about">
                <router-link to="/about">
                  <InfoCircleOutlined />
                  <span>关于项目</span>
                </router-link>
              </a-menu-item>
            </a-menu>
          </a-drawer>
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
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { theme } from 'ant-design-vue';
import { 
  HomeOutlined, 
  GlobalOutlined, 
  ShareAltOutlined, 
  HistoryOutlined, 
  InfoCircleOutlined,
  AppstoreOutlined,
  MenuOutlined
} from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const selectedKeys = ref(['/']);
const drawerVisible = ref(false);
const drawerWidth = ref(320);

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

const updateDrawerWidth = () => {
  const width = window.innerWidth;
  if (width <= 480) {
    drawerWidth.value = Math.max(260, width * 0.9);
  } else if (width <= 768) {
    drawerWidth.value = 320;
  } else {
    drawerWidth.value = 360;
  }
};

onMounted(() => {
  updateDrawerWidth();
  window.addEventListener('resize', updateDrawerWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateDrawerWidth);
});
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

.desktop-menu {
  display: flex;
  flex: 1;
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
  padding: 24px 24px 40px;
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

/* 移动端汉堡菜单按钮 */
.mobile-menu-btn {
  display: none;
  padding: 4px 8px;
  height: auto;
  align-items: center;
}

/* 移动端导航菜单样式 */
.mobile-nav-menu {
  border: none;
}

.mobile-nav-menu :deep(.ant-menu-item) {
  padding: 16px 20px;
  font-size: 16px;
  height: auto;
  line-height: 1.5;
  margin: 4px 0;
}

.mobile-nav-menu :deep(.ant-menu-item-selected) {
  background: rgba(44, 85, 120, 0.1);
  color: #2C5578;
}

.mobile-nav-menu :deep(a) {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-nav-menu :deep(.anticon) {
  font-size: 18px;
}

@media (max-width: 1024px) {
  .header {
    height: 64px;
  }

  .header-content {
    padding: 0 16px;
  }

  .content-wrapper {
    margin-top: 64px;
    padding: 16px 16px 32px;
  }

  .desktop-menu {
    display: none;
  }

  .mobile-menu-btn {
    display: inline-flex;
  }
}

@media (max-width: 768px) {
  .header {
    height: 60px;
  }

  .logo-seal {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }

  .logo-main {
    font-size: 18px;
  }

  .logo-sub {
    display: none;
  }

  .site-footer {
    padding: 40px 16px;
  }

  .footer-logo {
    font-size: 20px;
  }
}

@media (max-width: 480px) {
  .header {
    height: 56px;
  }

  .content-wrapper {
    margin-top: 56px;
    padding: 12px;
  }

  .logo-seal {
    width: 32px;
    height: 32px;
    font-size: 14px;
  }

  .logo-main {
    font-size: 16px;
  }
}
</style>
