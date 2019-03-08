<!---->
<template>
  <div style="width: 100%;">
    <div id="EchatsSix" ref="EchatsSix" style="width: 100%;height: 350px"></div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  export default {
    name: 'responsibleTask',
    data() {
      return {
        dataNum: {},
        normTime: [], // 标准处理时间
        averageTime: [], // 平均处理时间
        flowName: [],
      }
    },
    mounted() {
//      this.getEchatsColumnNum()
    },
    methods: {
      getDataPieNum(name) {
        const t = this
        t.dataNum = {}
        t.normTime = []
        t.averageTime = []
        t.flowName = []
        const data = {
          _mt: 'ansrptFlowStatistic.getFlowStepStatisticList',
          logType: '统计各流程步骤平均处理时间、标准处理时间',
//          userId: t.$store.state.user.userId,
          companyId: pubsource.companyId,
          flowCode: name,
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            let Value = []
            if (res.data.content[0].value) {
              Value = res.data.content[0].value
            }
            Value.forEach((item) => {
              // Pie 数据
              this.normTime.push(item.stddealtime)
              this.averageTime.push(item.avgdealtime)
              this.flowName.push(item.stepDis)
            })
            t.dataNum.normTime = this.normTime
            t.dataNum.averageTime = this.averageTime
            t.dataNum.flowName = this.flowName
            this.getEchatsColumnNum(t.dataNum)
            // 存按照工单大类统计工单数量的数据
          }
        }).catch(err => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEchatsColumnNum(data) {
        let echats3 = this.$echarts.init(document.getElementById('EchatsSix'))
        echats3.setOption({
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            show: true,
            x: 'center',
            y: 'top',
            data: [this.$t('lang_operatmonitor.monitorBoard.legend6'), this.$t('lang_operatmonitor.monitorBoard.legend7')],
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataZoom: {
                show: true,
                title: {
                  dataZoom: this.$t('lang_operatmonitor.monitorBoard.areaZoom'),
                  dataZoomReset: this.$t('lang_operatmonitor.monitorBoard.areaZoomRes'),
                },
              },
//              dataView: { show: true, readOnly: true },
//              magicType: { show: true, type: ['line', 'bar'] },
//              restore: { show: true },
//              saveAsImage: { show: true },
            },
          },
          calculable: true,
          xAxis: [
            {
              show: true,
              type: 'category',
              data: data.flowName,
              axisLabel: {
                interval: 0,
                rotate: 40,
              },
            },

          ],
          yAxis: [
            {
              show: true,
              type: 'value',
              splitArea: { show: true },
            },
          ],
          series: [
            {
              name: this.$t('lang_operatmonitor.monitorBoard.legend6'),
              type: 'bar',
              data: data.normTime,
              markPoint: {
                data: [
                  { type: 'max', name: this.$t('lang_operatmonitor.monitorBoard.pointMax') },
                  { type: 'min', name: this.$t('lang_operatmonitor.monitorBoard.pointMin') },
                ],
              },
//              markLine: {
//                data: [
//                  { type: 'average', name: '平均值' },
//                ],
//              },
            },
            {
              name: this.$t('lang_operatmonitor.monitorBoard.legend7'),
              type: 'bar',
              data: data.averageTime,
              markPoint: {
                data: [
                  { type: 'max', name: this.$t('lang_operatmonitor.monitorBoard.pointMin') },
                  { type: 'min', name: this.$t('lang_operatmonitor.monitorBoard.pointMin') },
                ],
              },
//              markLine: {
//                data: [
//                  { type: 'average', name: '平均值' },
//                ],
//              },
            },
          ],
        })
      },
    },
  }
</script>

