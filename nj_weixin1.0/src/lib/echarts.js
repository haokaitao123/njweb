import echarts from 'echarts'
const chartFn = function(data,id) {
	let myChart = echarts.init(document.getElementById(id));
	let option = {};
	if("pieChart" == id){
		option = pieOption(data);
	}else if("columChart" == id){
		option = columOption(data);
	}
	
	myChart.setOption(option);
}

function pieOption(data) {
	let option = {
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b} : <br/>{c}元 ({d}%)"
		},
		color: ['#A1CFFD', '#7288D5', '#F77F9A', '#77D8CF', "#FDD5DC", "#F99772", "#DAD794", "#AD95D5", "#C7DCD3"],
		legend: {
			type: 'plain',
			orient: 'vertical',
			right: 0,
			top: 10,
			bottom: 20,
			width: 0,
			height: 160,
			itemWidth: 8,
			itemHeight: 8,
			textStyle: {
				fontSize: 10
			},
			data: data.legendData,
			selected: data.selected
		},
		series: [{
			name: '固定薪资',
			type: 'pie',
			radius: '70%',
			center: ['40%', '50%'],
			data: data.seriesData,
			itemStyle: {
				normal: {
					label: {
						show: false //隐藏标示文字
					},
					labelLine: {
						show: false //隐藏标示线
					}
				},
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
		}]
	};
	return option;
}

function columOption(data) {
	let legendData = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
	let option = {
		color: ['#3398DB'],
		tooltip: {
			trigger: 'axis',
			axisPointer: { // 坐标轴指示器，坐标轴触发有效
				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		grid: {
			top: '12%',
			left: '2%',
			right: '6%',
			bottom: '0%',
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			data: legendData,
			axisTick: {
				alignWithLabel: true
			},
			axisLabel: {
				fontSize: 8, 
				interval: 0,
				rotate:30
			}
			
		}],
		yAxis: [{
			type: 'value',
			axisLabel: {
				fontSize: 8 
			}
		}],
		series: [{
			name: '输入金额(元)',
			type: 'bar',
			barWidth: '30%',
			data: data
		}]
	};
	return option;
}
export default chartFn