<!---->
<template>
  <div style="width: 100%;">
    <div id="EchatsFive" ref="EchatsFive" style="width: 100%;height: 350px"></div>
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
        flowClosedCount: [], // 已完成数量
        dataNum: {},
      }
    },
    methods: {
      getDataPieNum() {
        const t = this
        const data = {
          _mt: 'ansrptFlowStatistic.getFlowStatisticList',
          logType: '按照业务流程统计总数量、已完成数量',
//          userId: t.$store.state.user.userId,
          companyId: pubsource.companyId,
        }
        t.companyName = []
        t.flowTotal = []
        t.flowDealCount = []
        t.flowClosedCount = []
        t.dataNum = {}
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            let Value = []
            if (res.data.content[0].value) {
              Value = res.data.content[0].value
            }
            Value.forEach((item) => {
              this.companyName.push(item.flowName)
              this.flowTotal.push(item.flowTotal)
              this.flowDealCount.push(item.flowDealCount)
              this.flowClosedCount.push(item.flowClosedCount)
            })
            t.dataNum.companyName = this.companyName
            t.dataNum.flowTotal = this.flowTotal
            t.dataNum.flowDealCount = this.flowDealCount
            t.dataNum.flowClosedCount = this.flowClosedCount
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
        console.log(data, 'data')
        let echats3 = this.$echarts.init(document.getElementById('EchatsFive'))
        echats3.setOption({
          title: {
//            text: "知识分类统计",
            textStyle: {
              color: '#436EEE',
              fontSize: 17,
            },
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: [
                this.$t('lang_operatmonitor.monitorBoard.legend3'),
                this.$t('lang_operatmonitor.monitorBoard.legend4'),
                this.$t('lang_operatmonitor.monitorBoard.legend5')
            ],
          },
          xAxis: {
            data: data.companyName,
            splitLine: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              rotate: 40,
            },
          },
          yAxis: {
            splitLine: {
              show: false,
            },
            splitArea: { show: true },
          },
          series: [
            {
              name: this.$t('lang_operatmonitor.monitorBoard.legend3'),
              type: 'bar',
              data: data.flowTotal,
              barWidth: '40%',
              itemStyle: {
                normal: { color: '#13c2c2' },
              },
            },
            {
              name: this.$t('lang_operatmonitor.monitorBoard.legend4'),
              type: 'bar',
              stack: '业务',
              data: data.flowDealCount,
              barWidth: '40%',
              itemStyle: {
                normal: { color: '#ff7676' },
              },
            },
            {
              name: this.$t('lang_operatmonitor.monitorBoard.legend5'),
              type: 'bar',
              stack: '业务',
              data: data.flowClosedCount,
              barWidth: '40%',
              itemStyle: {
                normal: { color: '#ffc36d' },
              },
            },
          ],
        })
      },
    },
  }
</script>

