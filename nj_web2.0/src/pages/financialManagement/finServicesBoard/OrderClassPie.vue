<!---->
<template>
  <div style="width: 100%;">
    <div id="OrderClassPie" ref="OrderClassPie" style="width: 100%;height: 350px;background: white"></div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  export default {
    name: 'responsibleTask',
    data() {
      return {}
    },
    methods: {
      getEchatsPieNum(data, obj) {
        let echats4 = this.$echarts.init(document.getElementById('OrderClassPie'))
        echats4.setOption({
          tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, callback) {
              return params.seriesName + '<br/>' + data.cmutKntypeNameNum[params.dataIndex] + ':' + params.value
            },
          },
          color: ['#A1CFFD', '#7288D5', '#F77F9A', '#77D8CF', "#FDD5DC", "#F99772", "#DAD794", "#AD95D5", "#C7DCD3"],
          legend: {
            type: 'plain',
            orient: 'vertical',
            right: 0,
            top: 10,
            bottom: 20,
            width: 50,
            height: 250,
            itemWidth: 15,
            itemHeight: 8,
            textStyle: {
              fontSize: 10
            },
            data: data.cmutKntypeNameNumSubString, //
          },
          series: [{
            name: this.$t('lang_financialMan.finServiceboard.piechartservies2'),
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: obj,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  fontSize: 12,
                },
                labelLine: {
                  show: true //隐藏标示线
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
            },
          }],
        })
      },
    },
  }
</script>

