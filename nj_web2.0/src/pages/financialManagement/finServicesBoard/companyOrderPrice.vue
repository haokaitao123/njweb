<!---->
<template>
  <div style="width: 100%;">
    <div id="companyOrderPrice" ref="companyOrderPrice" style="width: 100%;height: 350px"></div>
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
        cmutKntypeDesc: [],
        cmutKntypeName: [],
        Object: [],
      }
    },
    mounted() {},
    methods: {
      getDataPie() {
        const t = this
        t.Object = []
        t.data = {}
        t.cmutKntypeDesc = []
        t.cmutKntypeName = []
        getDataLevelUserLogin({
          _mt: 'ansrptWorkorderChat.getCostByComp',
          logType: '按照公司统计工单费用Num',
          userId: t.$store.state.user.userId,
          companyId: pubsource.companyId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            let Value = res.data.content[0].value
            Value.forEach((item) => {
              console.log(item.authorComp)
              let Obj = {}
              Obj["value"] = item.orderCost
              Obj["name"] = item.orderCompDis
              this.cmutKntypeDesc.push(item.orderCost)
              this.cmutKntypeName.push(item.orderCompDis)
              this.Object.push(Obj)
            })
            t.data.cmutKntypeDesc = this.cmutKntypeDesc
            t.data.cmutKntypeName = this.cmutKntypeName
            this.getEchatsColumn(t.data)
            // 存按照公司统计工单数量饼状图的数据
            t.$store.commit('finServicesBoardList/setcompanyOrderPriceData', t.data)
            t.$store.commit('finServicesBoardList/setcompanyOrderPricePieObj', t.Object)
          }
        }).catch(err => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEchatsColumn(data) {
        let echats = this.$echarts.init(document.getElementById('companyOrderPrice'))
        echats.setOption({
          color: ['#F77F9A'],
          grid: {
            top: '5%',
            left: '3%',
            right: '0%',
            bottom: '5%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}',
          },
          xAxis: [
            {
              type: 'category',
              data: data.cmutKntypeName,
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
              name: this.$t('lang_financialMan.finServiceboard.histGroservies4'),
              type: 'bar',
              barWidth: '10%',
              data: data.cmutKntypeDesc,
            },
          ],
        })
      },
    },
  }
</script>

