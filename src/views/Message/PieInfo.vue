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
        const userIds = ['用户A', '用户B', '用户C', '用户D', '用户E'];  
        const randomData = [];  
        for (let i = 0; i < 5; i++) {  
          const randomIndex = Math.floor(Math.random() * userIds.length);  
          randomData.push({  
            name: userIds[randomIndex],  
            value: Math.floor(Math.random() * 10) + 1 // 随机生成10-100的数值，代表用户的活跃度  
          });  
        }  
        return randomData;  
      }  
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