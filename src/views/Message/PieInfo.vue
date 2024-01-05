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
        value: Math.floor(Math.random() * 5) + 1 // 随机生成10-100的数值（包含10和100）
      }));

      return dataWithUserIds;
    }
    // ...
  }
};

// import axios from 'axios'; // 导入axios库

// export default {
//   name: 'UserActivityChart',
//   data() {
//     return {
//       userActivityData: [ ] // 初始化用户活跃度数据为空数组
//     };
//   },
//   async mounted() {
//     await this.fetchUserData();
//     this.initChart();
//   },
//   methods: {
//     async fetchUserData() {
//       try {
//         const response = await axios.get('your-backend-api-url'); // 替换为你的后端API URL
//         this.userActivityData = response.data; // 假设后端返回的数据直接是[{name: '用户A', value: 10}, ...]这样的格式
//       } catch (error) {
//         console.error('Error fetching user activity data:', error);
//       }
//     },
//     initChart() {
//       const mainElement = document.getElementById('test2');
//       if (!mainElement) return;

//       const myChart = echarts.init(mainElement);
//       myChart.setOption({
//         title: { text: '用户活跃度' },
//         tooltip: { trigger: 'item' },
//         series: [
//           {
//             name: '活跃度',
//             type: 'pie',
//             radius: '55%',
//             data: this.userActivityData.map(item => ({
//               name: item.name,
//               value: item.value,
//               itemStyle: { color: '#' + (Math.floor(Math.random() * 16777215).toString(16)) } // 随机生成颜色
//             })),
//             emphasis: {
//               itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' }
//             }
//           }
//         ]
//       });
//     }
//   }
// };
  </script>
  <style>
  #test2{
    width: 600px;
     height: 400px;
      float: right;
  }

</style>