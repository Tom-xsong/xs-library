<template>
<<<<<<< HEAD
<div>
    home
</div>
</template>
<script>
export default {
components:{},
data(){
return {
}
},
methods:{},
mounted(){},
}
</script>
<style scoped>
=======
  <div>
    <p class="title">周一到周五的销量情况</p>
    <div class="box" id="main"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
   var option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['周一', '周二', '周三', '周四', '周五']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 335, name: '周一'},
                {value: 310, name: '周二'},
                {value: 234, name: '周三'},
                {value: 135, name: '周四'},
                {value: 1548, name: '周五'}
            ]
        }
    ]
};


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
};
</script>
<style scoped>
.title{
 text-align: center;
 margin: 20px auto;
 color: #cccccc;
}
.box {
  width: 80%;
  height: 500px;
  margin: 20px auto;
}
>>>>>>> d807809... bug修复
</style>