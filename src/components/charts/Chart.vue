<template>
	<div>
        <div ref="bar" class="chartcontainer lefttopchart">
        </div>

        <div ref="pie" class="chartcontainer righttopchart">
        </div>

         <div ref="line" class="chartcontainer leftbottomchart">
        </div>

         <div ref="area" class="chartcontainer rightbottomchart">
        </div>
    </div>
</template>

<script>
	import { AdminAPI } from '../../api';
    import echarts from 'echarts';

	export default {
		data() {			
			return {				
				form: {
					alarmPhone:'',
					errorTimes: '',					
				},				
				
				alarmPhone:'',
				errorTimes:'',
				formRules: {	
					alarmPhone:[
						{ required: true, message: '请输入手机号码', trigger: 'blur' },
					],		
					errorTimes: [
						{ required: true, message: '请输入次数', trigger: 'blur' },
					],				
				}
			}
		},
		methods: {
			onSubmit() {							
				
			},
			loadData() {
                let areaOption = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        type: 'line',
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        areaStyle: {}
                    }]
                };

                let lineOption = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        type: 'line',
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                    }]
                };
                let pieOption = {
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data:['A','B','C']
                        },
                        series: {
                            type: 'pie',
                            radius: ['40%', '80%'],
                            avoidLabelOverlap: true,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                },
                                emphasis: {
                                    show: false,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data: [
                                {name: 'A', value: 1},
                                {name: 'B', value: 50},
                                {name: 'C', value: 49}
                            ]
                        }
                    };

                let barOption = {
                        title: {text:"test char"},
                        color: ['#f44'],
                        tooltip : {
                        trigger: 'axis',
                        axisPointer : {
                            type : 'shadow'
                        }
                        },
                        xAxis : [
                        {
                            type : 'category',
                            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',],
                            axisTick: {
                            alignWithLabel: true
                            }
                        }
                        ],
                        yAxis : [
                        {
                            type : 'value'
                        }
                        ],
                        series : [
                        {
                            name:'每月花费',
                            type:'bar',
                            barWidth: '60%',
                            data:[995,666,444,858,654,236,645,546,846,225,547,356]
                        }
                        ]
                    };

                    let barChart = echarts.init(this.$refs.bar);
                    let pieChart = echarts.init(this.$refs.pie);
                    let lineChart = echarts.init(this.$refs.line);
                    let areaChart = echarts.init(this.$refs.area);
                    barChart.setOption(barOption);
                    pieChart.setOption(pieOption);
                    lineChart.setOption(lineOption);
                    areaChart.setOption(areaOption);
			}
		},
		mounted() {
			this.loadData();
		}
	}
</script>

<style  lang="scss">

    .chartcontainer{
        box-sizing:border-box;
        height:300px;
        padding:15px;
        float:left;
        
        canvas{
           box-shadow:rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
           background-color:rgb(249, 249, 249);
           border-radius:2px;
           border:1px solid black;
        }
        width:50%;
    }

    .lefttopchart {
        
    }
    .righttopchart{
         
    }

    .leftbottomchart {
        
    }
    .rightbottomchart {
        
    }

</style>