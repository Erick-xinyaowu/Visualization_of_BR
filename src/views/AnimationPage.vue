<template>
  <div class="animation-page">
    <!-- ECharts 地图底层 -->
    <div ref="chartContainer" class="echarts-layer"></div>

    <!-- Canvas 动画层 -->
    <canvas ref="canvasRef" class="canvas-layer"></canvas>

    <!-- 顶部遮罩与标题 -->
    <div class="cinematic-bar top"></div>
    <div id="main-title" :style="{ opacity: titleOpacity }">
      <h1>丝路智汇</h1>
      <h2>Silk Road Wisdom: Culture & Tech</h2>
    </div>

    <!-- 浮动信息卡片 -->
    <div class="info-card" :class="{ 'card-visible': showCardCulture }" style="top: 30%; left: 15%;">
      <h3>数字敦煌 Digital Dunhuang</h3>
      <p>利用高精度数字扫描技术，将千年的壁画与石窟永久保存，并通过云端让全球观众身临其境。</p>
    </div>
    
    <div class="info-card" :class="{ 'card-visible': showCardTech }" style="top: 30%; right: 15%;">
      <h3>5G与智慧港口 Smart Ports</h3>
      <p>中国技术赋能比雷埃夫斯港等节点，引入5G自动化与绿色能源，提升全球物流效率。</p>
    </div>

    <!-- 底部字幕区域 -->
    <div class="cinematic-bar bottom">
      <div id="subtitle-container" :class="{ 'active-sub': showSubtitle }">
        <div class="subtitle">{{ currentSubtitle.cn }}</div>
        <div class="subtitle-en">{{ currentSubtitle.en }}</div>
      </div>
      
      <!-- 控制按钮 -->
      <div class="controls">
        <a-button type="text" shape="circle" size="large" @click="togglePlay" class="play-btn">
          <template #icon>
            <component :is="isPlaying ? 'PauseCircleOutlined' : 'PlayCircleOutlined'" />
          </template>
        </a-button>
        <a-button type="text" shape="circle" size="large" @click="restart" class="play-btn">
          <template #icon><ReloadOutlined /></template>
        </a-button>
        <a-button type="text" shape="circle" size="large" @click="toggleMute" class="play-btn">
          <template #icon>
            <component :is="isMuted ? 'AudioMutedOutlined' : 'SoundOutlined'" />
          </template>
        </a-button>
        <a-button type="text" shape="circle" size="large" @click="$router.push('/')" class="play-btn">
          <template #icon><HomeOutlined /></template>
        </a-button>
      </div>
    </div>

    <!-- 播放进度 -->
    <div id="progress-bar" :style="{ width: progressPercentage + '%' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as echarts from 'echarts'
import worldJson from '../assets/map/world.json'
import { PlayCircleOutlined, PauseCircleOutlined, ReloadOutlined, HomeOutlined, SoundOutlined, AudioMutedOutlined } from '@ant-design/icons-vue'

const router = useRouter()
const chartContainer = ref(null)
const canvasRef = ref(null)
let myChart = null
let ctx = null
let animationFrameId = null

// 状态
const isPlaying = ref(true)
const startTime = ref(null)
const pausedTime = ref(0)
const lastPauseTimestamp = ref(0)
const progressPercentage = ref(0)
const titleOpacity = ref(0)
const showCardCulture = ref(false)
const showCardTech = ref(false)
const showSubtitle = ref(false)
const currentSubtitle = ref({ cn: '', en: '' })
const isMuted = ref(false)
const lastPlayedIndex = ref(-1)

const totalDuration = 32000 // 32秒

// 颜色配置
const colors = {
  gold: '#d4af37',
  red: '#c0392b',
  blue: '#3498db',
  text: '#2c3e50'
}

// 地理坐标 (经纬度)
const geoCoords = {
  xian: [108.93, 34.27],
  dunhuang: [94.66, 40.14],
  centralAsia: [66.97, 39.65], // 撒马尔罕
  istanbul: [28.98, 41.01],
  duisburg: [6.76, 51.43],
  fuzhou: [119.30, 26.08],
  colombo: [79.86, 6.92],
  nairobi: [36.82, -1.29],
  athens: [23.72, 37.98]
}

// 剧本
const script = [
  {
    start: 0, end: 5000,
    cn: "两千年前，驼铃声声回荡在古老的丝绸之路上，连接起东西方的文明。",
    en: "Two millennia ago, camel bells echoed across the Silk Road, connecting East and West.",
    scene: "ancient"
  },
  {
    start: 5000, end: 11000,
    cn: "如今，“一带一路”倡议以铁路、港口和光缆，重塑了现代化的互联互通。",
    en: "Today, the BRI revitalizes this spirit with railways, ports, and digital networks.",
    scene: "modern"
  },
  {
    start: 11000, end: 18000,
    cn: "这不仅是贸易的通道，更是文化与科技深度融合的舞台。",
    en: "It is not just a trade route, but a stage for the deep fusion of Culture and Technology.",
    scene: "fusion_intro"
  },
  {
    start: 18000, end: 24000,
    cn: "从数字敦煌的云端漫游，到智慧港口的5G赋能，文明因互鉴而精彩。",
    en: "From Digital Dunhuang to 5G Smart Ports, civilizations flourish through mutual learning.",
    scene: "fusion_detail"
  },
  {
    start: 24000, end: 32000,
    cn: "丝路智汇，科技与文化双轮驱动，共建人类命运共同体的美好未来。",
    en: "Silk Road Wisdom: Technology and Culture driving together towards a shared future for mankind.",
    scene: "future"
  }
]

// 粒子系统
let particles = []
for(let i=0; i<100; i++) {
  particles.push({
    x: Math.random(), y: Math.random(),
    vx: (Math.random()-0.5)*0.0005, vy: (Math.random()-0.5)*0.0005,
    size: Math.random() * 2,
    alpha: Math.random()
  })
}

// 辅助函数：获取屏幕坐标
function getScreenPoint(geoName) {
  if (!myChart || !geoCoords[geoName]) return { x: 0, y: 0 }
  const pixel = myChart.convertToPixel('geo', geoCoords[geoName])
  return { x: pixel[0], y: pixel[1] }
}

// 辅助函数：绘制路径
function drawPath(ctx, points, color, lineWidth, dash = null, progress = 1) {
  if (!points || points.length < 2) return

  ctx.save()
  ctx.beginPath()

  ctx.moveTo(points[0].x, points[0].y)

  for (let i = 1; i < points.length - 1; i++) {
    let xc = (points[i].x + points[i + 1].x) / 2
    let yc = (points[i].y + points[i + 1].y) / 2
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y)

  ctx.strokeStyle = color
  ctx.lineWidth = lineWidth
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  if (dash && dash.length) {
    ctx.setLineDash(dash)
  } else if (progress < 1) {
    // 简单模拟路径生长，实际贝塞尔曲线长度计算较复杂，这里用虚线偏移模拟
    const L = 3000
    ctx.setLineDash([L * progress, L])
  }

  ctx.stroke()
  ctx.restore()
}

// 辅助函数：绘制节点
function drawNode(ctx, point, name, color, scale = 1, pulse = false) {
  const { x, y } = point
  
  if (pulse) {
    const glow = 10 + Math.sin(Date.now() / 200) * 5
    const grad = ctx.createRadialGradient(x, y, 2, x, y, glow * scale)
    grad.addColorStop(0, color)
    grad.addColorStop(1, "transparent")
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(x, y, glow * scale, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, 4 * scale, 0, Math.PI * 2)
  ctx.fill()

  if (scale > 0.5 && name) {
    ctx.fillStyle = colors.text
    ctx.font = "bold 12px 'Noto Serif SC'"
    ctx.textAlign = "center"
    ctx.fillText(name.split(" ")[0], x, y + 20)
  }
}

// 语音合成函数
function speak(text) {
  if (isMuted.value) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'zh-CN'
  utterance.rate = 1.0
  window.speechSynthesis.speak(utterance)
}

function toggleMute() {
  isMuted.value = !isMuted.value
  if (isMuted.value) {
    window.speechSynthesis.cancel()
  }
}

// 动画主循环
function animate(timestamp) {
  if (!isPlaying.value) {
    lastPauseTimestamp.value = timestamp
    animationFrameId = requestAnimationFrame(animate)
    return
  }

  if (!startTime.value) startTime.value = timestamp
  
  // 调整时间戳以处理暂停
  if (lastPauseTimestamp.value > 0) {
    pausedTime.value += (timestamp - lastPauseTimestamp.value)
    lastPauseTimestamp.value = 0
  }

  const elapsed = timestamp - startTime.value - pausedTime.value
  
  if (elapsed > totalDuration) {
    progressPercentage.value = 100
    isPlaying.value = false
    return 
  }

  progressPercentage.value = (elapsed / totalDuration * 100)

  // 清空画布
  const width = canvasRef.value.width
  const height = canvasRef.value.height
  ctx.clearRect(0, 0, width, height)

  // 剧本逻辑
  let scriptIndex = script.findIndex(s => elapsed >= s.start && elapsed < s.end)
  let currentScript = null
  
  if (scriptIndex !== -1) {
    currentScript = script[scriptIndex]
  } else if (elapsed >= script[script.length-1].end) {
    currentScript = script[script.length-1]
  }
  
  if (currentScript) {
    if (currentSubtitle.value.cn !== currentScript.cn) {
      showSubtitle.value = false
      setTimeout(() => {
        currentSubtitle.value = { cn: currentScript.cn, en: currentScript.en }
        showSubtitle.value = true
      }, 200)
    }

    // 配音逻辑
    if (scriptIndex !== -1 && scriptIndex !== lastPlayedIndex.value) {
      lastPlayedIndex.value = scriptIndex
      speak(currentScript.cn)
    }
  }

  // 标题淡入淡出
  if (elapsed > 1000 && elapsed < 5000) titleOpacity.value = 1
  else if (elapsed > 5000) titleOpacity.value = 0

  // 粒子背景
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy
    if(p.x>1) p.x=0; if(p.x<0) p.x=1
    if(p.y>1) p.y=0; if(p.y<0) p.y=1
    ctx.fillStyle = `rgba(200, 200, 200, ${p.alpha})`
    ctx.beginPath()
    ctx.arc(p.x*width, p.y*height, p.size, 0, Math.PI*2)
    ctx.fill()
  })

  // 场景绘制
  if (currentScript) {
    const landPoints = ['xian', 'dunhuang', 'centralAsia', 'istanbul', 'duisburg'].map(getScreenPoint)
    const seaPoints = ['fuzhou', 'colombo', 'nairobi', 'athens', 'istanbul'].map(getScreenPoint)
    // 海上丝路加一个中间点模拟绕过印度洋
    // 这里简单处理，直接连线。如果需要更精细，可以在 geoCoords 加中间点。

    if (currentScript.scene === "ancient") {
      let progress = Math.min(1, (elapsed - 0) / 4000)
      drawPath(ctx, landPoints, colors.gold, 3, null, progress)
      
      landPoints.forEach((p, i) => {
        if (progress > i / (landPoints.length - 1)) {
          const names = ["西安", "敦煌", "中亚", "伊斯坦布尔", "杜伊斯堡"]
          drawNode(ctx, p, names[i], colors.gold, 1, true)
        }
      })
    } else if (currentScript.scene === "modern") {
      // 保持古丝路
      drawPath(ctx, landPoints, colors.gold, 1, [5, 5])
      
      let progress = Math.min(1, (elapsed - 5000) / 5000)
      // 现代铁路 (沿用陆路但变色)
      drawPath(ctx, landPoints, colors.blue, 3, null, progress)
      // 海上丝路
      drawPath(ctx, seaPoints, colors.blue, 3, null, progress)

      seaPoints.forEach((p, i) => {
        if (progress > i / (seaPoints.length - 1)) {
          const names = ["福州", "科伦坡", "内罗毕", "雅典", "伊斯坦布尔"]
          drawNode(ctx, p, names[i], colors.blue, 1, true)
        }
      })
    } else if (currentScript.scene.includes("fusion")) {
      // 全图展示
      drawPath(ctx, landPoints, colors.gold, 1, [5, 5])
      drawPath(ctx, seaPoints, colors.blue, 1, [5, 5])
      
      // 节点脉冲
      landPoints.forEach(p => drawNode(ctx, p, "", colors.gold, 0.8, true))
      seaPoints.forEach(p => drawNode(ctx, p, "", colors.blue, 0.8, true))

      // 卡片显示
      if (currentScript.scene === "fusion_detail") {
        showCardCulture.value = true
        showCardTech.value = true
        
        // 连线到卡片
        const dunhuang = getScreenPoint('dunhuang')
        const athens = getScreenPoint('athens') // 雅典/比雷埃夫斯港
        
        ctx.strokeStyle = colors.gold
        ctx.setLineDash([2, 2])
        ctx.beginPath()
        ctx.moveTo(dunhuang.x, dunhuang.y)
        ctx.lineTo(width * 0.15 + 150, height * 0.3 + 50) // 连到左侧卡片
        ctx.stroke()

        ctx.strokeStyle = colors.blue
        ctx.beginPath()
        ctx.moveTo(athens.x, athens.y)
        ctx.lineTo(width * 0.85 - 150, height * 0.3 + 50) // 连到右侧卡片
        ctx.stroke()
        ctx.setLineDash([])
      } else {
        showCardCulture.value = false
        showCardTech.value = false
      }
    } else if (currentScript.scene === "future") {
      showCardCulture.value = false
      showCardTech.value = false
      
      // 汇聚效果
      const center = getScreenPoint('centralAsia')
      const radius = (elapsed - 24000) / 8000 * Math.max(width, height)
      
      const grad = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius)
      grad.addColorStop(0, 'rgba(212, 175, 55, 0.1)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)
      
      drawPath(ctx, landPoints, colors.gold, 2)
      drawPath(ctx, seaPoints, colors.blue, 2)
    }
  }

  animationFrameId = requestAnimationFrame(animate)
}

function togglePlay() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    window.speechSynthesis.resume()
  } else {
    window.speechSynthesis.pause()
  }
}

function restart() {
  startTime.value = null
  pausedTime.value = 0
  lastPauseTimestamp.value = 0
  progressPercentage.value = 0
  isPlaying.value = true
  showCardCulture.value = false
  showCardTech.value = false
  
  window.speechSynthesis.cancel()
  lastPlayedIndex.value = -1
}

onMounted(() => {
  // 初始化 ECharts
  echarts.registerMap('world', worldJson)
  myChart = echarts.init(chartContainer.value)
  
  const option = {
    backgroundColor: '#fdfbf7', // 米白宣纸色
    geo: {
      map: 'world',
      roam: false, // 动画模式下禁用漫游，保证坐标对齐
      zoom: 1.8,
      center: [70, 30],
      label: { show: false },
      itemStyle: {
        areaColor: '#f0ece1',
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        itemStyle: { areaColor: '#e6dfcc' }
      }
    },
    series: [] // 不使用 ECharts 绘制数据，只做底图
  }
  
  myChart.setOption(option)

  // 初始化 Canvas
  const resize = () => {
    if (canvasRef.value && chartContainer.value) {
      canvasRef.value.width = chartContainer.value.clientWidth
      canvasRef.value.height = chartContainer.value.clientHeight
      myChart.resize()
    }
  }
  window.addEventListener('resize', resize)
  resize()
  
  ctx = canvasRef.value.getContext('2d')
  
  // 启动动画
  animationFrameId = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (myChart) myChart.dispose()
  window.speechSynthesis.cancel()
})
</script>

<style scoped>
.animation-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #fdfbf7;
  font-family: "Noto Serif SC", serif;
}

.echarts-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.canvas-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.cinematic-bar {
  position: absolute;
  left: 0;
  width: 100%;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(255,255,255,0.9), transparent);
}

.cinematic-bar.top {
  top: 0;
  height: 10vh;
}

.cinematic-bar.bottom {
  bottom: 0;
  height: 15vh;
  background: linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0.8), transparent);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#main-title {
  position: absolute;
  top: 4vh;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 20;
  transition: opacity 2s ease;
}

#main-title h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  letter-spacing: 5px;
  margin-bottom: 5px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

#main-title h2 {
  font-size: 1rem;
  color: #d4af37;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
}

#subtitle-container {
  text-align: center;
  z-index: 20;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.subtitle-en {
  font-size: 0.9rem;
  color: #7f8c8d;
  font-style: italic;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s;
}

.active-sub .subtitle, .active-sub .subtitle-en {
  opacity: 1;
  transform: translateY(0);
}

#progress-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #d4af37;
  width: 0%;
  z-index: 30;
  transition: width 0.1s linear;
}

.info-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border-left: 4px solid #d4af37;
  width: 300px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.8s ease;
  z-index: 15;
}

.info-card h3 {
  font-size: 1.2rem;
  color: #c0392b;
  margin-bottom: 8px;
}

.info-card p {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
}

.card-visible {
  opacity: 1;
  transform: scale(1);
}

.controls {
  display: flex;
  gap: 16px;
  margin-top: 10px;
}

.play-btn {
  color: #2c3e50;
  transition: all 0.3s;
}

.play-btn:hover {
  color: #d4af37;
  background: rgba(0,0,0,0.05);
}
</style>