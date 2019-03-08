<!---->
<template>
  <div style="width: 100%;">
    <div id="EchatsOne" ref="EchatsOne" style="width: 100%;height: 450px"></div>
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
          _mt: 'visaReturnStatistic.getOverdueNum',
          logType: '逾期未回国人数人数查询',
          // userId: t.$store.state.user.userId,
          // companyId: pubsource.companyId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            let Value = []
            if (res.data.content[0].value) {
              Value = res.data.content[0].value
            }
            Value.forEach((item) => {
              // Pie 数据
              let Obj = {}
              Obj["name"] = item.returnCompDis.substring(0,4)
              Obj["value"] = item.overdueNum
              this.cmutKntypeDescNum.push(item.overdueNum)
              this.cmutKntypeNameNum.push(item.returnCompDis)
              this.cmutKntypeNameNumSubString.push(item.returnCompDis.substring(0,4))
              this.ObjectNum.push(Obj)
            })
            t.dataNum.cmutKntypeDescNum = this.cmutKntypeDescNum
            t.dataNum.cmutKntypeNameNum = this.cmutKntypeNameNum
            t.dataNum.cmutKntypeNameNumSubString = this.cmutKntypeNameNumSubString
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
          color: ['#77D8CF'],
          grid: {
            top: '10%',
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
              name: '人数',
              type: 'value',
              minInterval:1,
              splitArea: { show: true },
            },
          ],
          series: [
            {
              name: this.$t('lang_empManage.monitorBoard.series1'),
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

