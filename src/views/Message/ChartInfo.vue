<!-- 帮助管理员了解不同区域的内容更新频率和趋势，
  从而判断哪些板块或话题最受用户关注，
  哪些可能存在冷淡或缺乏内容的情况。这对于调整社区运营策略、优化内容推荐机制至关重要 -->
<template>
  <div>
    <!-- 绑定用来选择要显示数据的区域，在选项改变时触发updateChart方法。 -->
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
//   mounted生命周期钩子中：
// 调用initMockData方法生成模拟数据。
// 调用initChart方法初始化并渲染Echarts图表
  mounted() {
    this.initMockData();
    this.initChart();
  },
  methods: {
    initMockData() {
      // 模拟数据，生成5天内每个区域每天的随机发帖量数据
      const fixedAreas = ['讨论区', '专业区'];
      const days = 5;

      this.mockData = fixedAreas.flatMap(area => (
        Array.from({ length: days }, (_, index) => ({
          date: `第${index + 1}天`,
          area,
          postCount: Math.floor(Math.random() * 5) + 1 // 随机生成1到20的数值（根据需求调整范围）
        }))
      ));
    },
    // 查找页面上的main元素并使用Echarts对其进行初始化
    initChart() {
      const mainElement = document.getElementById('main');
      if (!mainElement) return;

      this.chart = echarts.init(mainElement);
      this.updateChart();
    },
    // 根据当前选定的selectedArea过滤数据，并重新配置图表的option，更新图表内容以展示所选区域对应的最近五天发帖量情况
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
