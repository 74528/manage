<template>  
  <div>  
    <div id="main" style="width: 600px; height: 400px;float: left;"></div>  
  </div>  
</template>  
  
<script>  
import * as echarts from 'echarts';  
  
export default {  
  name: 'HotTopicChart',  
  data() {  
    return {  
      chart: null,  
    };  
  },  
  mounted() {  
    this.initChart();  
  },  
  methods: {  
    initChart() {  
      const mainElement = document.getElementById('main');  
      const mockData = this.generateMockData();  
  
      this.chart = echarts.init(mainElement);  
      this.chart.setOption({  
        title: { text: '话题热门度' },  
        tooltip: {},  
        xAxis: { data: mockData.map(item => item.name) }, // 使用话题名称作为x轴数据  
        yAxis: {},  
        series: [{  
          name: '帖子数',  
          type: 'bar',  
          data: mockData.map(item => item.value) // 使用随机生成的数值作为y轴数据  
        }]  
      });  
    },  
    generateMockData() {
      const fixedTopics = ['话题A', '话题B', '话题C', '话题D', '话题E']; // 定义固定的5个话题数组

      // 按照固定话题数组的顺序，为每个话题生成一个随机的帖子数
      const dataWithFixedTopics = fixedTopics.map((topic, index) => ({
        name: topic,
        value: Math.floor(Math.random() * 10) + 1 // 随机生成1到10的数值（根据需求调整范围）
      }));

      return dataWithFixedTopics;
    }
  }
};
    </script>
