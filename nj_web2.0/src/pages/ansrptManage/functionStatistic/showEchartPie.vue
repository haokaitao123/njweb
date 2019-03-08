<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_ansrptEmpSihf.functionStatistic.statistics')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div ref="echartPie" style="width: 100%;height: 100%"></div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLoginNew } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
      	data: {},
      	legendData: [],
      	seriesData: []
      }
    },
    props: {
      userId: String,
      selectedType: Number,
    },
    methods: {
      getData() {
        const t = this
        t.data = {};
        t.legendData = [];
        t.seriesData = [];
        getDataLevelUserLoginNew({
          _mt: 'ansrptSysLogs.getStatistic',
          logType: '报表',
          log_userid: t.userId,
          userFunType: t.selectedType
        }).then((res) => {
          if(isSuccess(res, t)) {
						let list = res.data.content[0].value;
						for(let i=0;i<list.length;i++){
							let map = {};
							map["name"] = list[i].log_funname;
							map["value"] = list[i].log_opttype;
							t.legendData.push(list[i].log_funname);
	            t.seriesData.push(map);
						}
						t.data["legendData"] = t.legendData;
						t.data["seriesData"] = t.seriesData;
						t.getEchartFn(t.data);
						console.log(t.data)
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      handleReset() {
        this.$emit('closeUp')
      },
      getEchartFn(data){
      	console.log(data)
      	let myChart = this.$echarts.init(this.$refs.echartPie);
				let option = {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : <br/>{c}"+this.$t('lang_ansrptEmpSihf.functionStatistic.times')+"({d}%)"
					},
					color: ['#A1CFFD', '#7288D5', '#F77F9A', '#77D8CF', "#FDD5DC", "#F99772", "#DAD794", "#AD95D5", "#C7DCD3"],
					legend: {
						type: 'plain',
						orient: 'vertical',
						right: 0,
						top: 10,
						bottom: 20,
						width: 0,
						height: 250,
						itemWidth: 15,
						itemHeight: 8,
						textStyle: {
							fontSize: 10
						},
						data: [],
					},
					series: [{
						name: this.$t('lang_ansrptEmpSihf.functionStatistic.visits'),
						type: 'pie',
						radius: '60%',
						center: ['50%', '50%'],
						data: data.seriesData,
						itemStyle: {
							normal: {
								label: {
									show: true,
									fontSize: 12,
								},
								labelLine: {
									show: true //隐藏标示线
								}
							},
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				}
				myChart.setOption(option);
      }
    },
  }
</script>
<style lang="scss" scoped>
 .cover{
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,.5);
  -webkit-overflow-scrolling: touch;
  outline: 0;
  .box{
    position:relative;
    width: 500px;
    height: 400px;
    background-color: #fff;
    padding: 60px 20px 30px 20px;
    border-radius: 10px;
    .title{
      display: flex;
      position: absolute;
      height: 40px;
      width: 100%;
      line-height: 40px;
      justify-content: space-between;
      align-items: center;
      padding-left: 20px;
      top: 0;
      border-bottom: 1px solid #efefef;
      left: 0;
      .title-text{
        font-weight: bold;
        font-size: 14px;
      }
    }
  }
}
</style>
