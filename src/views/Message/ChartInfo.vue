<!-- 帮助管理员了解不同区域的内容更新频率和趋势，
  从而判断哪些板块或话题最受用户关注，
  哪些可能存在冷淡或缺乏内容的情况。这对于调整社区运营策略、优化内容推荐机制至关重要 -->
<template>
  <div>
    <select v-model="selectedArea" @change="updateChart">
      <option value="讨论区">讨论区</option>
      <option value="专业区">专业区</option>
    </select>

    <div id="main" style="width: 500px; height: 400px;float: left;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'HotTopicChart',
  data() {
    return {
      chart: null,
      selectedArea: '讨论区',
      mockData: []
    };
  },
  mounted() {
    this.initMockData();
    this.initChart();
  },
  methods: {
    initMockData() {
      // 模拟数据，这里以5天为例，实际应从后端获取
      const fixedAreas = ['讨论区', '专业区'];
      const days = 5;

      this.mockData = fixedAreas.flatMap(area => (
        Array.from({ length: days }, (_, index) => ({
          date: `第${index + 1}天`,
          area,
          postCount: Math.floor(Math.random() * 20) + 1 // 随机生成1到20的数值（根据需求调整范围）
        }))
      ));
    },
    initChart() {
      const mainElement = document.getElementById('main');
      if (!mainElement) return;

      this.chart = echarts.init(mainElement);
      this.updateChart();
    },
    updateChart() {
      const filteredData = this.mockData.filter(item => item.area === this.selectedArea);

      const dateLabels = filteredData.map(item => item.date);
      const postCounts = filteredData.map(item => item.postCount);

      this.chart.setOption({
        title: { text: `${this.selectedArea}最近5天发帖量统计` },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: dateLabels
        },
        yAxis: {
          name: '发帖量'
        },
        series: [{
          name: '帖子数',
          type: 'bar',
          data: postCounts
        }]
      });
    }
  }
};
</script>
<!-- 
<template>
  <div>
    <select v-model="selectedArea" @change="updateChart">
      <option v-for="area in areas" :key="area" :value="area">{{ area }}</option>
    </select>

    <div id="main" style="width: 600px; height: 400px;float: left;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
  name: 'AreaPostCountChart',
  data() {
    return {
      chart: null,
      postData: [],
      areas: ['讨论区', '专业区'],
      selectedArea: '讨论区',
      dateLabels: [],
      areaPostCounts: {}
    };
  },
  async mounted() {
    await this.fetchPostData();
    this.initChart();
    this.updateChart(); // 初始化时加载选定区域的数据
  },
  methods: {
    async fetchPostData() {
      try {
        const response = await axios.get('your-backend-api-url'); // 替换为你的后端API URL
        this.postData = response.data;
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    },
    initChart() {
      const mainElement = document.getElementById('main');
      if (!mainElement) return;

      // 保持对图表实例的引用，以便后续更新数据
      this.chart = echarts.init(mainElement);
    },
    updateChart() {
      // 获取最近5天的日期标签
      this.dateLabels = [...new Set(this.postData.filter(item => item.area === this.selectedArea).map(item => item.date))]
        .sort((a, b) => new Date(b) - new Date(a))
        .slice(-5);

      // 统计选定区域每天的发帖数量
      this.areaPostCounts = {};
      this.postData.forEach(item => {
        if (item.area === this.selectedArea && !this.areaPostCounts[item.date]) this.areaPostCounts[item.date] = 0;
        if (item.area === this.selectedArea) this.areaPostCounts[item.date] += item.postCount;
      });

      const seriesData = [{
        name: this.selectedArea,
        type: 'bar',
        data: this.dateLabels.map(date => this.areaPostCounts[date] || 0)
      }];

      this.chart.setOption({
        title: { text: `${this.selectedArea}近5天发帖量统计` },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: this.dateLabels
        },
        yAxis: {
          name: '发帖量'
        },
        series: seriesData
      });
    }
  }
};
</script> -->