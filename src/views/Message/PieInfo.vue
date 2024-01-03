<template>  
    <div id="test2"></div>  
  </template>  
    
  <script>  
  import * as echarts from 'echarts';  
    
  export default {  
    name: 'UserActivityChart',  
    mounted() {  
      this.initChart();  
    },  
    methods: {  
      initChart() {  
        const mainElement = document.getElementById('test2');  
        const mockData = this.generateMockData();  
    
        const myChart = echarts.init(mainElement);  
        myChart.setOption({  
          title: { text: '用户活跃度' },  
          tooltip: { trigger: 'item' },  
          series: [  
            {  
              name: '活跃度',  
              type: 'pie',  
              radius: '55%',  
              data: mockData.map(item => ({  
                name: item.name,  
                value: item.value,  
                itemStyle: { color: '#' + (Math.floor(Math.random() * 16777215).toString(16)) } // 随机生成颜色  
              })),  
              emphasis: {  
                itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }  
              }  
            }  
          ]  
        });  
      },  
      generateMockData() {
      const userIds = ['用户A', '用户B', '用户C', '用户D', '用户E']; // 定义固定的5个用户ID数组

      // 按照用户ID数组的顺序，为每个用户生成一个代表活跃度的随机数值
      const dataWithUserIds = userIds.map((userId, index) => ({
        name: userId,
        value: Math.floor(Math.random() * 91) + 10 // 随机生成10-100的数值（包含10和100）
      }));

      return dataWithUserIds;
    }
    // ...
  }
};
  </script>
  <style>
  #test2{
    width: 600px;
     height: 400px;
      float: right;
  }

</style>