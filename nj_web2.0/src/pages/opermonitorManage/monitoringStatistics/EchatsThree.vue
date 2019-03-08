<!---->
<template>
  <div style="width: 100%;">
    <div id="EchatsThree" ref="EchatsThree" style="width: 100%;height: 350px"></div>
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
        cmutKntypeDescNum: [],
        cmutKntypeNameNum: [],
        cmutKntypeNameNumSubString: [],
        ObjectNum: [],
      }
    },
    methods: {
      getDataPieNum() {
        const t = this
        t.ObjectNum = []
        t.dataNum = {}
        t.cmutKntypeDescNum = []
        t.cmutKntypeNameNum = []
        getDataLevelUserLogin({
          _mt: 'ansrptWorkorderChat.getOrderAavgEvaluate',
          logType: '按照工单大类统计工单费用',
          userId: t.$store.state.user.userId,
          companyId: pubsource.companyId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            console.log(res.data.content[0].value)
            let Value = []
            if (res.data.content[0].value) {
              Value = res.data.content[0].value
            }
            Value.forEach((item) => {
              // Pie 数据
              let Obj = {}
              Obj["name"] = item.orderTypeName.substring(0,4)
              Obj["value"] = item.orderTypeCode
              this.cmutKntypeDescNum.push(item.orderAavgEvaluate)
              this.cmutKntypeNameNum.push(item.orderTypeName)
              this.cmutKntypeNameNumSubString.push(item.orderTypeName.substring(0,4))
              this.ObjectNum.push(Obj)
            })
            t.dataNum.cmutKntypeDescNum = this.cmutKntypeDescNum
            t.dataNum.cmutKntypeNameNum = this.cmutKntypeNameNum
            t.dataNum.cmutKntypeNameNumSubString = this.cmutKntypeNameNumSubString
            this.getEchatsColumnNum(t.dataNum)
            // 存按照工单大类统计工单数量的数据
            t.$store.commit('finServicesBoard/setOrderClassNumData', t.dataNum)
            t.$store.commit('finServicesBoard/setOrderClassNumObj', t.ObjectNum)
          }
        }).catch(err => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEchatsColumnNum(data) {
        let echats3 = this.$echarts.init(document.getElementById('EchatsThree'))
        echats3.setOption({
          color: ['#77D8CF'],
          grid: {
            top: '5%',
            left: '3%',
            right: '0%',
            bottom: '5%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'item',
//            formatter: '{a} <br/>{b}: {c}',
            formatter: function (params, ticket, callback) {
              return params.seriesName + '<br/>' + data.cmutKntypeNameNum[params.dataIndex] + ':' + params.value
            },
          },
          xAxis: [
            {
              type: 'category',
              data: data.cmutKntypeNameNumSubString,
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                interval: 0,
                rotate: 40,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              splitArea: { show: true },
            },
          ],
          series: [
            {
              name: this.$t('lang_operatmonitor.monitorBoard.series1'),
              type: 'bar',
              barWidth: '20%',
              data: data.cmutKntypeDescNum,
            },
          ],
        })
      },
    },
  }
</script>

