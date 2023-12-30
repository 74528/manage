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
      const topics = ['话题A', '话题B', '话题C', '话题D', '话题E'];  
      const randomData = [];  
      for (let i = 0; i < 5; i++) {  
        const randomIndex = Math.floor(Math.random() * topics.length);  
        randomData.push({  
          name: topics[randomIndex],  
          value: Math.floor(Math.random() * 10) + 1 // 随机生成100-1000的数值  
        });  
      }  
      return randomData;  
    }  
  }  
};  
</script>