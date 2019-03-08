<!---->
<template>
  <div style="width: 100%;">
    <div id="echartNum" ref="echartNum" style="width: 100%;height: 350px;margin-top:40px;"></div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  export default {
    name: 'responsibleTask',
    data() {
      return {
        data: {},
				nameLst: [],
				maxLst: [],
				avgLat: [],
				minLst: [],
      }
    },
    mounted() {
      // this.getData(2018,1018)
    },
    methods: {
      getData(year,proId) {

      	year = year || (new Date()).getFullYear();
        const t = this
        const data = {
          _mt: 'evaluationResult.analysisChart1',
          logType: '测评分析报告柱状图',
          year: year,
          proId: proId,
          resType: '03eval',
        }

        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
             t.nameLst = []
              t.maxLst = []
              t.avgLat = []
              t.minLst = []
              t.data = {}
          	if(res.data.content[0].value!=''&&res.data.content[0].value!=undefined){
              let value = res.data.content[0].value;
              for(let i=0;i<value.length;i++){
                t.nameLst.push(JSON.parse(value[i]).name)
                t.maxLst.push(JSON.parse(value[i]).max)
                t.avgLat.push(JSON.parse(value[i]).avg)
                t.minLst.push(JSON.parse(value[i]).min)
              }
              t.data.nameLst = t.nameLst;
              t.data.maxLst = t.maxLst;
              t.data.avgLat = t.avgLat;
              t.data.minLst = t.minLst;
              console.log(t.data)
              this.getEchatsColumn(t.data)
              }

          }
        }).catch(err => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEchatsColumn(data) {
        let echats3 = this.$echarts.init(document.getElementById('echartNum'))
        // echats3.setOption({
        //   title: {
        //     textStyle: {
        //       color: '#436EEE',
        //       fontSize: 17,
        //     },
        //   },
        //   tooltip: {
        //     trigger: 'axis',
        //   },
        //   legend: {
        //     data: ['最小值', '平均值', '最大值'],
        //   },
        //   xAxis: {
        //     data: data.nameLst,
        //     splitLine: {
        //       show: false,
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       rotate: 40,
        //     },
        //   },
        //   yAxis: {
        //     splitLine: {
        //       show: false,
        //     },
        //   },
        //   series: [
        //     {
        //       name: '最小值',
        //       type: 'bar',
        //       stack: '业务',
        //       data: data.minLst,
        //       barWidth: '20%',
        //       itemStyle: {
        //         normal: { color: '#1890ff' },
        //       },
        //     },
        //     {
        //       name: '平均值',
        //       type: 'bar',
        //       stack: '业务',
        //       data: data.avgLat,
        //       barWidth: '20%',
        //       itemStyle: {
        //         normal: { color: '#ca1f19' },
        //       },
        //     },
        //     {
        //       name: '最大值',
        //       type: 'bar',
        //       stack: '业务',
        //       data: data.maxLst,
        //       barWidth: '20%',
        //       itemStyle: {
        //         normal: { color: '#ff7676' },
        //       },
        //     },
        //   ],
        // })
         echats3.setOption(
           {
              tooltip : {
                  trigger: 'axis'
              },
              legend: {
                  data:['最小值', '平均值', '最大值'],
              },

              xAxis : [
                  {
                      type : 'category',
                      data : data.nameLst,
                  }
              ],
              yAxis : [
                  {
                      type : 'value'
                  }
              ],
              series : [
                {
                  name: this.$t('lang_evaluation.evaluation.min'),
                  type:'bar',
                  data:data.minLst,
                  markPoint : {
                    data : [
                      {type : 'max', name: this.$t('lang_evaluation.evaluation.max')},
                      {type : 'min', name: this.$t('lang_evaluation.evaluation.min')}
                    ]
                  },
                  markLine : {
                    data : [
                      {type : 'average', name: this.$t('lang_evaluation.evaluation.avg')}
                    ]
                  }
                },
                {
                  name: this.$t('lang_evaluation.evaluation.avg'),
                  type:'bar',
                  data:data.avgLat,
                  markPoint : {
                    data : [
                      {name : this.$t('lang_evaluation.evaluation.yearmax'), value : 182.2, xAxis: 7, yAxis: 183},
                      {name : this.$t('lang_evaluation.evaluation.yearmin'), value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                  },
                  markLine : {
                    data : [
                      {type : 'average', name : this.$t('lang_evaluation.evaluation.avg')}
                    ]
                  }
                },
                {
                  name: this.$t('lang_evaluation.evaluation.max'),
                  type:'bar',
                  data:data.maxLst,
                  markPoint : {
                    data : [
                      {name : this.$t('lang_evaluation.evaluation.yearmax'), value : 182.2, xAxis: 7, yAxis: 183},
                      {name : this.$t('lang_evaluation.evaluation.yearmin'), value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                  },
                  markLine : {
                    data : [
                      {type : 'average', name : this.$t('lang_evaluation.evaluation.avg')}
                    ]
                  }
                }
              ]
           }

         )
      },
    },
  }
</script>

