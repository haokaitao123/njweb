<!---->
<template>
  <div style="width: 100%;">
    <div id="OrderClassPrice" ref="OrderClassPrice" style="width: 100%;height: 350px"></div>
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
        t.cmutKntypeNameNumSubString = []
        getDataLevelUserLogin({
          _mt: 'ansrptWorkorderChat.getCostByPType',
          logType: '按照工单大类统计工单费用',
          userId: t.$store.state.user.userId,
          companyId: pubsource.companyId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            let Value = []
            if (res.data.content[0].value) {
              Value = res.data.content[0].value
            }
            Value.forEach((item) => {
              // Pie 数据
              let Obj = {}
              Obj["name"] = item.orderTypeName.substring(0,4)
              Obj["value"] = item.orderCost
              this.cmutKntypeDescNum.push(item.orderCost)
              this.cmutKntypeNameNum.push(item.orderTypeName)
              this.cmutKntypeNameNumSubString.push(item.orderTypeName.substring(0,4))
              this.ObjectNum.push(Obj)
            })
            t.dataNum.cmutKntypeDescNum = this.cmutKntypeDescNum
            t.dataNum.cmutKntypeNameNum = this.cmutKntypeNameNum
            t.dataNum.cmutKntypeNameNumSubString = this.cmutKntypeNameNumSubString
            this.getEchatsColumnNum(t.dataNum)
            // 存按照工单大类统计工单数量的数据
            t.$store.commit('finServicesBoardList/setOrderClassPriceData', t.dataNum)
            t.$store.commit('finServicesBoardList/setOrderClassPricePieObj', t.ObjectNum)
            console.log(res)
          }
        }).catch(err => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEchatsColumnNum(data) {
        let echats3 = this.$echarts.init(document.getElementById('OrderClassPrice'))
        echats3.setOption({
          color: ['#facc14'],
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
            },
          ],
          series: [
            {
              name: this.$t('lang_financialMan.finServiceboard.histGroservies5'),
              type: 'bar',
              barWidth: '60%',
              data: data.cmutKntypeDescNum,
            },
          ],
        })
      },
    },
  }
</script>

