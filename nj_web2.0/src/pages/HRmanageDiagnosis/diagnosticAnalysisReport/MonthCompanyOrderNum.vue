<!---->
<template>
  <div style="width: 100%;">
    <div id="MonthCompanyOrderNum" ref="MonthCompanyOrderNum" style="width: 100%;height: 350px;margin-top:10px;"></div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  export default {
    data() {
      return {
        Object: [],
        nameLst: [],
        yearLst: [],
      }
    },
    mounted() {
      // this.getData(1020,1000)
    },
    methods: {
      getData(indId,resEmpid) {
        const t = this

        getDataLevelUserLogin({
          _mt: 'evaluationResult.analysisChart2',
          logType: '查询折线图',
          indId: indId,
          resEmpid: resEmpid,
          resType: "01eval",
        }).then((res) => {
          if (isSuccess(res, t)) {
             t.yearLst = [];
             t.Object = [];
             if(res.data.content[0].value!=''&&res.data.content[0].value!=undefined){
               let value = JSON.parse(res.data.content[0].value);
                for(let key in value){
                  t.yearLst.push(key);
                  t.Object.push(value[key])
                }
                this.getEchatsColumn(t.yearLst,t.Object)
             }

          }
        }).catch(err => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEchatsColumn(yearLst, Object) {
        let echats = this.$echarts.init(document.getElementById('MonthCompanyOrderNum'))
        echats.setOption({
          tooltip: {
            trigger: 'axis',
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          // toolbox: {
          //   itemSize: 20,
          //   itemGap: 30,
          //   right: 50,
          //   top: 10,
          //   feature: {
          //     saveAsImage: {},
          //   },
          // },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: yearLst,
            axisLabel: {
              interval: 0,
              rotate: 20,
            },
          },
          yAxis: {
            type: 'value',
          },
          series: [{
		        data: Object,
		        type: 'line'
    			}]
        })
      },
    },
  }
</script>

