# 🌏 丝路智汇：一带一路中的文化与科技互鉴可视化

![Vue 3](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)
![ECharts](https://img.shields.io/badge/ECharts-5.x-AA344D.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

一个基于 Vue 3 + ECharts 的丝绸之路数据可视化项目，展现古今丝路上的文化传播与科技交流。

## 📖 项目简介

"丝路智汇"是一个专注于展示一带一路中文化与科技互鉴的数据可视化平台。通过地理可视化、网络图、时间轴等多种图表形式，生动呈现丝绸之路悠久的历史、深厚的文化底蕴，以及当代"一带一路"倡议下的科技合作与交流成果。

## ✨ 核心功能

- 🗺️ **地理可视化** - 展示丝绸之路的地理路线、重要城市节点和贸易往来
- 🔗 **科技交流网络** - 呈现一带一路国家间的科技合作与知识交流网络
- 📈 **时间轴演进** - 追溯历史发展脉络，展现文化与科技的时空演变
- 🌊 **桑基流向图** - 可视化科技交流的流向和强度

## 🛠 技术栈

| 技术 | 说明 |
|------|------|
| **Vue 3** | 渐进式 JavaScript 框架 |
| **Vite** | 下一代前端构建工具 |
| **ECharts** | 强大的数据可视化图表库 |
| **vue-echarts** | ECharts 的 Vue 3 组件封装 |
| **Vue Router** | Vue.js 官方路由管理器 |
| **Pinia** | Vue 3 官方状态管理库 |

## 📂 项目结构

```
silkroad-viz/
│
├── public/                      # 静态资源
│   └── favicon.ico
│
├── src/
│   ├── assets/                  # 样式和静态资源
│   │   └── main.css
│   │
│   ├── components/              # 图表组件
│   │   ├── SilkRoadMap.vue          # 丝绸之路地图
│   │   ├── TechExchangeGraph.vue    # 科技交流网络图
│   │   ├── TimelineChart.vue        # 时间轴图表
│   │   └── SankeyFlow.vue           # 桑基流向图
│   │
│   ├── data/                    # 数据文件
│   │   ├── geo_routes.json          # 地理路线数据
│   │   ├── tech_exchange.json       # 科技交流数据
│   │   └── timeline.csv             # 时间轴数据
│   │
│   ├── router/                  # 路由配置
│   │   └── index.js
│   │
│   ├── store/                   # 状态管理
│   │   └── index.js
│   │
│   ├── views/                   # 页面组件
│   │   ├── Home.vue                 # 首页
│   │   ├── MapPage.vue              # 地图页
│   │   ├── NetworkPage.vue          # 网络页
│   │   ├── TimelinePage.vue         # 时间轴页
│   │   └── About.vue                # 关于页
│   │
│   ├── App.vue                  # 根组件
│   └── main.js                  # 入口文件
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions 部署配置
│
├── vite.config.js               # Vite 配置
├── package.json                 # 项目依赖
└── README.md                    # 项目说明
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
cd silkroad-viz
npm install
```

### 开发模式

```bash
npm run dev
```

项目将在 `http://localhost:3000` 启动，支持热更新。

### 生产构建

```bash
npm run build
```

构建产物将生成在 `dist` 目录下。

### 预览构建

```bash
npm run preview
```

## 📦 部署

### GitHub Pages 自动部署

项目配置了 GitHub Actions 自动部署流程：

1. 推送代码到 `main` 分支
2. GitHub Actions 自动执行构建
3. 构建产物自动部署到 GitHub Pages

访问地址：`https://erick-xinyaowu.github.io/Visualization_of_BR/`

### 手动部署

```bash
# 构建项目
npm run build

# 部署 dist 目录到你的服务器
```

## 🎨 页面展示

- **首页** - 项目介绍和功能导航
- **地图页** - 丝绸之路地理可视化
- **网络页** - 科技交流网络和流向分析
- **时间轴页** - 历史事件演进时间轴
- **关于页** - 项目详情和技术栈介绍

## 📊 数据说明

项目使用的数据包括：

- **geo_routes.json** - 丝绸之路沿线城市的地理坐标和重要性评分
- **tech_exchange.json** - 一带一路国家间的科技合作关系和项目
- **timeline.csv** - 丝绸之路历史上的重要事件时间轴

数据来源于历史文献和公开资料整理，持续更新中。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 开源协议

本项目采用 [MIT](https://opensource.org/licenses/MIT) 协议。

## 📮 联系方式

- GitHub: [@Erick-xinyaowu](https://github.com/Erick-xinyaowu)
- Project Link: [https://github.com/Erick-xinyaowu/Visualization_of_BR](https://github.com/Erick-xinyaowu/Visualization_of_BR)

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [ECharts](https://echarts.apache.org/) - 强大的数据可视化库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- 所有为丝绸之路历史研究做出贡献的学者

---

⭐ 如果这个项目对你有帮助，欢迎 Star！

进一步优化：
1、首页添加动态效果（google）
2、丝路地图-时间演化 部分的数据需要替换
3、试试固定地图，不然下滑的时候容易错位
4、目前的数据和图、表太少了
多视图协调关联：多视图协同关联将不同类型的绘图组合起来，每个绘图单元可以展现数据某方面的属性，并通常允许用户进行交互分析，提升用户对数据的模式识别能力。在多视图协同关联应用中，“选择”操作作为一种探索方法，可以对某个对象和属性进行“取消选择”，也可以选择属性的子集或对象的子集，以查看每个部分之间的关系。如：某企业的云计算服务监控系统。
- 南丁格尔玫瑰图
- 阶梯图
- 柱形图
- 堆叠柱状图
- 饼图
- 散点图矩阵
- 气泡图


