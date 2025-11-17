import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './assets/main.css'

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

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.component('v-chart', ECharts)

app.mount('#app')
