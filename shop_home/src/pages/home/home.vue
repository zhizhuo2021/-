<template>
  <div>
  <div id="main" style="width: 600px;height:400px;">

  </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
 mounted(){
    // 基于准备好的dom，初始化echarts实例
         var myChart = echarts.init(document.getElementById('main'),'light');

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '吸烟比赛'
            },
            tooltip: {},
            legend: {
                data:['人数']
            },
            xAxis: {
                data: ["亮仔","朱总","石总","卢总"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [8, 5, 7, 8,10 ]
            }]
            
        };
           // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
 }
}
</script>

<style scoped>
  #main{
    margin: 20px auto;
  }
</style>