<!---->
<template>
  <div style="width: 100%;">
    <div id="echartPie" ref="echartPie" style="width: 100%;height: 350px;background: white"></div>
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
        let echats1 = this.$echarts.init(document.getElementById('echartPie'))
        echats1.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data: data.cmutKntypeName,
          },
          color: ['#A1CFFD', '#7288D5'],
          series: [
            {
              name: this.$t('lang_financialMan.finServiceboard.piechartservies1'),
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

