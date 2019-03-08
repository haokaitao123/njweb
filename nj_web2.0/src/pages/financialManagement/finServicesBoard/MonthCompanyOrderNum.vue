<!---->
<template>
  <div style="width: 100%;">
    <div id="MonthCompanyOrderNum" ref="MonthCompanyOrderNum" style="width: 100%;height: 400px"></div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  export default {
    data() {
      return {
        Object: [],
        echatsName: [],
        echatsMonth: [],
      }
    },
    mounted() {
//      this.getEchatsColumn()
    },
    methods: {
      getCompany() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'ansrptWorkorderChat.getFrontFiveNumCompany',
          logType: '返回最近6个月中工单数最多的5家公司',
          userId: t.$store.state.user.userId,
          companyId: pubsource.companyId,
        }).then(res => {
          this.companyList = res.data.content[0].value
        }).catch(err => {
          console.log(err)
        })
      },
      getDataPieNum() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'ansrptWorkorderChat.getNumByLastMon',
          logType: '返回最近6个月中工单数最多的5家公司',
          userId: t.$store.state.user.userId,
          companyId: pubsource.companyId,
        }).then((res) => {
          if (isSuccess(res, t)) {
            let Value = []
            if (res.data.content[0].value) {
              Value = JSON.parse(res.data.content[0].value)
            }
            let arr = []
            let ArrMonth = []
            let arrName = []
            for (let i in Value) {
              arrName.push(i)
              arr[i] = []
              ArrMonth[i] = []
              for (let key in Value[i]) {
//                debugger
                arr[i].push(key)
               ArrMonth[i].push(Value[i][key])
              }
            }
            console.log(arrName)
            console.log(arr)
            console.log(ArrMonth)
            this.Object = []
            this.echatsName = []
            this.echatsMonth = []
            for (let j = 0; j < arrName.length; j++) {
//              debugger
              let obj = {}
              obj['name'] = arrName[j].slice(5)
              obj['data'] = ArrMonth[arrName[j]]
              obj['type'] = 'line'
              console.log(obj, 'obj')
              this.Object.push(obj)
              this.echatsName.push(arrName[j].slice(5))
              this.echatsMonth.push(arr[arrName[j]])
            }
            this.getEchatsColumn(this.echatsName, this.echatsMonth[0], this.Object)
          }
        }).catch(err => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEchatsColumn(name, month, Obj) {
        let echats = this.$echarts.init(document.getElementById('MonthCompanyOrderNum'))
        echats.setOption({
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data: name,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          toolbox: {
            itemSize: 20,
            itemGap: 30,
            right: 50,
            top: 10,
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: month,
            axisLabel: {
              interval: 0,
              rotate: 20,
            },
          },
          yAxis: {
            type: 'value',
          },
          series: Obj,
        })
      },
    },
  }
</script>

