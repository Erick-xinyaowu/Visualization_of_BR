import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDashboardStore = defineStore('dashboard', () => {
  // --- State ---
  const selectedYear = ref(2023)
  const selectedCountries = ref([]) // Array of country names
  const hoveredCountry = ref(null)
  
  // --- Mock Data Generation ---
  const countries = [
    { name: 'China', region: 'East Asia' },
    { name: 'Kazakhstan', region: 'Central Asia' },
    { name: 'Pakistan', region: 'South Asia' },
    { name: 'Singapore', region: 'Southeast Asia' },
    { name: 'Russia', region: 'Eastern Europe' },
    { name: 'Poland', region: 'Eastern Europe' },
    { name: 'Greece', region: 'Southern Europe' },
    { name: 'Egypt', region: 'North Africa' },
    { name: 'Kenya', region: 'East Africa' },
    { name: 'Saudi Arabia', region: 'West Asia' },
    { name: 'UAE', region: 'West Asia' },
    { name: 'Thailand', region: 'Southeast Asia' },
    { name: 'Malaysia', region: 'Southeast Asia' },
    { name: 'Indonesia', region: 'Southeast Asia' },
    { name: 'Turkey', region: 'West Asia' },
    { name: 'Iran', region: 'West Asia' },
    { name: 'Uzbekistan', region: 'Central Asia' },
    { name: 'Hungary', region: 'Eastern Europe' },
    { name: 'Italy', region: 'Southern Europe' },
    { name: 'South Africa', region: 'Southern Africa' }
  ]

  const years = [2018, 2019, 2020, 2021, 2022, 2023]

  // Helper to generate random data
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
  const randomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(2))

  // Generate comprehensive dataset
  const rawData = countries.map(country => {
    const yearlyData = {}
    years.forEach(year => {
      // Base growth factor based on year
      const growth = (year - 2018) * 0.1 + 1
      
      yearlyData[year] = {
        culturalIndex: random(40, 90) + (country.name === 'China' ? 10 : 0),
        techIndex: random(30, 85) * growth,
        tradeVolume: random(100, 1000) * growth, // In millions
        connectivity: randomFloat(0.4, 0.95),
        investment: random(50, 500) * growth,
        projects: random(5, 50),
        // Composition for stacked bar
        techComposition: {
          '5G': random(10, 30),
          'AI': random(5, 20),
          'GreenEnergy': random(20, 40),
          'Infrastructure': random(20, 50)
        }
      }
    })
    return {
      ...country,
      data: yearlyData
    }
  })

  // --- Getters ---
  
  // Get data for the currently selected year
  const currentYearData = computed(() => {
    return rawData.map(c => ({
      name: c.name,
      region: c.region,
      ...c.data[selectedYear.value]
    }))
  })

  // Get trend data for a specific metric across all years (for Step Chart)
  // Aggregated or for specific countries
  const getTrendData = (metric) => {
    const trend = {}
    years.forEach(year => {
      let sum = 0
      rawData.forEach(c => {
        sum += c.data[year][metric]
      })
      trend[year] = parseFloat((sum / rawData.length).toFixed(2)) // Average
    })
    return trend
  }

  // Get specific country trend
  const getCountryTrend = (countryName, metric) => {
    const country = rawData.find(c => c.name === countryName)
    if (!country) return []
    return years.map(y => country.data[y][metric])
  }

  // --- Actions ---
  function setYear(year) {
    selectedYear.value = year
  }

  function toggleCountrySelection(countryName) {
    const index = selectedCountries.value.indexOf(countryName)
    if (index === -1) {
      selectedCountries.value.push(countryName)
    } else {
      selectedCountries.value.splice(index, 1)
    }
  }

  function setHoveredCountry(countryName) {
    hoveredCountry.value = countryName
  }

  function clearSelection() {
    selectedCountries.value = []
  }

  return {
    selectedYear,
    selectedCountries,
    hoveredCountry,
    rawData,
    years,
    currentYearData,
    getTrendData,
    getCountryTrend,
    setYear,
    toggleCountrySelection,
    setHoveredCountry,
    clearSelection
  }
})
