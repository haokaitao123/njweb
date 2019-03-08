<!---->
<template>
  <div style="width: 100%;">
    <div id="echartNum" ref="echartNum" style="width: 100%;height: 350px"></div>
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
    mounted() {
//      this.getDataPie()
//      this.getDataPieNum()
    },
    methods: {
      getDataPie() {
        const t = this
        t.Object = []
        t.data = {}
        t.cmutKntypeDesc = []
        t.cmutKntypeName = []
        getDataLevelUserLogin({
          _mt: 'ansrptWorkorderChat.getByComp',
          logType: '按照公司统计工单数量Num',
          userId: t.$store.state.user.userId,
          companyId: pubsource.companyId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            let Value = []
            if (res.data.content[0].value) {
              Value = res.data.content[0].value
            }
            Value.forEach((item) => {
              console.log(item.authorComp)
              let Obj = {}
              Obj["value"] = item.orderNum
              Obj["name"] = item.orderCompDis
              this.cmutKntypeDesc.push(item.orderNum)
              this.cmutKntypeName.push(item.orderCompDis)
              this.Object.push(Obj)
            })
            t.data.cmutKntypeDesc = this.cmutKntypeDesc
            t.data.cmutKntypeName = this.cmutKntypeName
            // 存按照公司统计工单数量饼状图的数据
            t.$store.commit('finServicesBoardList/setcompanyOrderData', t.data)
            t.$store.commit('finServicesBoardList/setcompanyOrderNumObj', t.Object)
            this.getEchatsColumn(t.data)
          }
        }).catch(err => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEchatsColumn(data) {
        let echats = this.$echarts.init(document.getElementById('echartNum'))
        echats.setOption({
          color: ['#2cabe3'],
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
              name: this.$t('lang_financialMan.finServiceboard.histGroservies1'),
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

