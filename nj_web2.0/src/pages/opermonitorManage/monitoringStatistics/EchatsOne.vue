<!---->
<template>
  <div style="width: 100%;">
    <div id="EchatsOne" ref="EchatsOne" style="width: 100%;height: 350px"></div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'

  export default {
    name: 'responsibleTask',
    data() {
      return {
        companyName: [],
        flowTotal: [], // 流程总数量
        flowDealCount: [], // 处理中数量
        dataNum: {},
      }
    },
    methods: {
      getDataPieNum() {
        const t = this
        t.companyName = []
        t.flowTotal = []
        t.flowDealCount = []
        t.flowClosedCount = []
        t.dataNum = {}
        getDataLevelUserLogin({
          _mt: 'ansrptWorkorderChat.getAllDealedByComp',
          logType: '按照公司统计工单总数量、已处理数量',
          userId: t.$store.state.user.userId,
          companyId: pubsource.companyId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            let Value = []
            if (res.data.content[0].value) {
              Value = res.data.content[0].value
            }
            Value.forEach((item) => {
              this.companyName.push(item.orderCompDis)
              this.flowTotal.push(item.orderNum)
              this.flowDealCount.push(item.dealedOrder)
            })
            t.dataNum.companyName = this.companyName
            t.dataNum.flowTotal = this.flowTotal
            t.dataNum.flowDealCount = this.flowDealCount
            this.getEchatsColumnNum(t.dataNum)
          }
        }).catch(err => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEchatsColumnNum(data) {
        let echats3 = this.$echarts.init(document.getElementById('EchatsOne'))
        echats3.setOption({
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            show: true,
            x: 'center',
            y: 'top',
            data: [this.$t('lang_operatmonitor.monitorBoard.legend1'), this.$t('lang_operatmonitor.monitorBoard.legend2')],
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataZoom: {
                show: true,
                title: {
                  dataZoom: this.$t('lang_operatmonitor.monitorBoard.areaZoom'),
                  dataZoomReset: this.$t('lang_operatmonitor.monitorBoard.areaZoom'),
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
              data: data.companyName,
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
              name: this.$t('lang_operatmonitor.monitorBoard.legend1'),
              type: 'bar',
              data: data.flowTotal,
              barWidth: '10%',
              itemStyle: {
                normal: { color: '#13c2c2' },
              },
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
              name: this.$t('lang_operatmonitor.monitorBoard.legend2'),
              type: 'bar',
              data: data.flowDealCount,
              barWidth: '10%',
              itemStyle: {
                normal: { color: '#1890ff' },
              },
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
          ],
        })
      },
    },
  }
</script>

