import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MapPage from '../views/MapPage.vue'
import NetworkPage from '../views/NetworkPage.vue'
import TimelinePage from '../views/TimelinePage.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页 - 丝路智汇' }
  },
  {
    path: '/map',
    name: 'MapPage',
    component: MapPage,
    meta: { title: '地理可视化 - 丝路智汇' }
  },
  {
    path: '/network',
    name: 'NetworkPage',
    component: NetworkPage,
    meta: { title: '科技交流网络 - 丝路智汇' }
  },
  {
    path: '/timeline',
    name: 'TimelinePage',
    component: TimelinePage,
    meta: { title: '时间轴演进 - 丝路智汇' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '关于项目 - 丝路智汇' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '丝路智汇'
  next()
})

export default router
