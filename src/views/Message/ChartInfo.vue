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
