import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// 引入全局样式
import './styles/global.css'

// 引入 Ant Design Vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'

// 注册 ECharts 组件
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'

// 手动引入 ECharts 各模块
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, ScatterChart, GraphChart, SankeyChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GeoComponent,
  TimelineComponent,
  VisualMapComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  ScatterChart,
  GraphChart,
  SankeyChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  GeoComponent,
  TimelineComponent,
  VisualMapComponent
])

// Ant Design Vue 主题配置
const customTheme = {
  token: {
    colorPrimary: '#1E3F66',
    colorInfo: '#1E3F66',
    colorSuccess: '#C4975B',
    colorWarning: '#C4975B',
    colorTextBase: '#EAEAEA',
    colorBgBase: '#1B263B',
    fontFamily: 'Montserrat, "Source Han Sans CN", "Noto Sans SC", sans-serif',
    borderRadius: 12,
    fontSize: 14,
  }
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Antd)
app.component('v-chart', ECharts)

// 应用主题配置
app.provide('theme', customTheme)

app.mount('#app')
