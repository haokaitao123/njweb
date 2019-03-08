<!---->
<template>
  <div style="width: 100%;">
    <div id="companyOrderPricePie" ref="companyOrderPricePie" style="width: 100%;height: 350px;background: white"></div>
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
    methods: {
      getEchatsPie(data, obj) {
        console.log(obj)
        let echats1 = this.$echarts.init(document.getElementById('companyOrderPricePie'))
        echats1.setOption({
//          tooltip: {
//            trigger: 'item',
//          },
//          color: ['#A1CFFD', '#7288D5', '#F77F9A', '#77D8CF', "#FDD5DC", "#F99772", "#DAD794", "#AD95D5", "#C7DCD3"],
//          legend: {
//            type: 'plain',
//            orient: 'vertical',
//            right: 0,
//            top: 10,
//            bottom: 20,
//            width: 100,
//            height: 250,
//            itemWidth: 15,
//            itemHeight: 8,
//            textStyle: {
//              fontSize: 10
//            },
//            data: data.cmutKntypeName,
//          },
//          series: [{
//            name: '公司工单数量统计',
//            type: 'pie',
//            radius: '60%',
//            center: ['50%', '50%'],
//            data: obj,
//            itemStyle: {
//              normal: {
//                label: {
//                  show: true,
//                  fontSize: 12,
//                },
//                labelLine: {
//                  show: true //隐藏标示线
//                },
//              },
//              emphasis: {
//                shadowBlur: 10,
//                shadowOffsetX: 0,
//                shadowColor: 'rgba(0, 0, 0, 0.5)'
//              },
//            },
//          }],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: data.cmutKntypeName,
          },
          color: ['#77D8CF', '#7288D5'],
          series: [
            {
              name: this.$t('lang_financialMan.finServiceboard.piechartservies4'),
              type: 'pie',
              radius: ['50%', '60%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center',
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                  },
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: obj,
            },
          ],
        })
      },
    },
  }
</script>

