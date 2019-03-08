<template>
  <i-col class="col" span="8">
    <Card :bordered="false">
      <p slot="title" class="title"><Icon type="ios-email"></Icon> <span style="margin-left: 5px;">{{$t('lang_homePage.email.title')}}</span></p>
      <a href="#" slot="extra">
        <Icon type="more"></Icon>
      </a>
      <div class="block">
        <div ref="echartxl" style="width: 100%;height: 100%"></div>
      </div>
    </Card>
  </i-col>
</template>
<script>
  import { isSuccess, deepCopy } from '../../lib/util'
  import { getDataLevelUserLogin } from '../../axios/axios'

export default{
  data() {
    return {
        data: [],
    }
  },
  mounted() {
    this.getDate()
  },
  methods: {
    getDate() {
      const t = this
      getDataLevelUserLogin({
        _mt: 'ansrptStatistics.Emailstatistics',
      }).then((res) => {
        if (isSuccess(res, t)) {
          this.data = res.data.content[0].value.split(',')
          this.$echarts.init(this.$refs.echartxl).setOption({
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c}',
            },
            legend: {
              data: [this.$t('lang_homePage.email.failtoday'), this.$t('lang_homePage.email.failcount'), this.$t('lang_homePage.email.weekcount')],
              orient: 'vertical',
              left: 'left',
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              top: '5%',
              containLabel: true,
            },
            xAxis: [
              {
                type: 'category',
                data: [this.$t('lang_homePage.email.failtoday'), this.$t('lang_homePage.email.failcount'), this.$t('lang_homePage.email.weekcount')],
                axisTick: {
                  alignWithLabel: true,
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
                name: this.$t('lang_homePage.email.title'),
                type: 'bar',
                data: this.data,
                barWidth: 30,
                itemStyle: {
                  normal: {
                    color: function (params) {
                      let colorList = ['#89c5e9', '#d9f1cd', '#fdd5c9']
                      return colorList[params.dataIndex]
                    },
                  },
                },
              },
            ],
          })
        }
      }).catch(() => {
        t.$Modal.error({
          title: this.$t('reminder.err'),
          content: this.$t('reminder.errormessage'),
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
  .block{
    font-size: 12px;
    height: 280px;
    overflow-y: auto;
    overflow-x: hidden;
  .block_row{
    height: 36px;
    position: relative;
    cursor: pointer;
    transition: all .3s;
    line-height: 36px;
  .icon{
    line-height: 36px;
    position: absolute;
  }
  .div{
    padding-left: 20px;
    padding-right: 30px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  }
  /*.block_row:hover{*/
    /*color: #2d8cf0;*/
  /*}*/
  }
</style>
