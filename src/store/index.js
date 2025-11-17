import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDataStore = defineStore('data', () => {
  // 状态
  const geoRoutes = ref([])
  const techExchange = ref([])
  const timelineData = ref([])
  const loading = ref(false)
  const error = ref(null)

  // 计算属性
  const hasData = computed(() => {
    return geoRoutes.value.length > 0 && 
           techExchange.value.length > 0 && 
           timelineData.value.length > 0
  })

  // 加载地理路线数据
  const loadGeoRoutes = async () => {
    try {
      const response = await fetch('/src/data/geo_routes.json')
      geoRoutes.value = await response.json()
    } catch (err) {
      console.error('加载地理路线数据失败:', err)
      error.value = '加载地理路线数据失败'
    }
  }

  // 加载科技交流数据
  const loadTechExchange = async () => {
    try {
      const response = await fetch('/src/data/tech_exchange.json')
      techExchange.value = await response.json()
    } catch (err) {
      console.error('加载科技交流数据失败:', err)
      error.value = '加载科技交流数据失败'
    }
  }

  // 加载时间轴数据
  const loadTimelineData = async () => {
    try {
      const response = await fetch('/src/data/timeline.csv')
      const text = await response.text()
      timelineData.value = parseCSV(text)
    } catch (err) {
      console.error('加载时间轴数据失败:', err)
      error.value = '加载时间轴数据失败'
    }
  }

  // CSV 解析辅助函数
  const parseCSV = (text) => {
    const lines = text.trim().split('\n')
    const headers = lines[0].split(',')
    return lines.slice(1).map(line => {
      const values = line.split(',')
      const obj = {}
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index]?.trim() || ''
      })
      return obj
    })
  }

  // 加载所有数据
  const loadAllData = async () => {
    loading.value = true
    error.value = null
    try {
      await Promise.all([
        loadGeoRoutes(),
        loadTechExchange(),
        loadTimelineData()
      ])
    } catch (err) {
      console.error('加载数据失败:', err)
      error.value = '数据加载失败，请刷新页面重试'
    } finally {
      loading.value = false
    }
  }

  return {
    geoRoutes,
    techExchange,
    timelineData,
    loading,
    error,
    hasData,
    loadGeoRoutes,
    loadTechExchange,
    loadTimelineData,
    loadAllData
  }
})
