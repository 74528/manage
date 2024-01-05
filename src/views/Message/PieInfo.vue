<!-- 这些数据可以反映用户的参与热情、粘性及社区的整体健康状况。 -->
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
      const userIds = ['neroll', 'skyte', 'Kraze', 'Rainfo', 'sky']; // 定义固定的5个用户ID数组

      // 按照用户ID数组的顺序，为每个用户生成一个代表活跃度的随机数值
      const dataWithUserIds = userIds.map((userId, index) => ({
        name: userId,
        value: Math.floor(Math.random() * 5) + 1 // 随机生成
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