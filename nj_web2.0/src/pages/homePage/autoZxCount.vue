<template>
  <i-col class="col" span="8">
    <card :bordered="false">
      <p slot="title" class="title"><Icon type="android-arrow-dropright-circle"></Icon> <span style="margin-left: 5px;">{{$t('lang_homePage.autotaskrun.title')}}</span></p>
      <a href="#" slot="extra">
        <Icon type="more"></Icon>
      </a>
      <div class="block short">
        <div ref="echart1" style="width: 100%;height: 100%"></div>
      </div>
    </card>
  </i-col>
</template>
<script>
  import { isSuccess, deepCopy } from '../../lib/util'
  import { getDataLevelUserLogin } from '../../axios/axios'

  export default{
    data() {
      return {
        runsuccess: '',
        runfailure: '',
        startsuccess: '',
        startfailure: '',
      }
    },
    mounted() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'ansrptStatistics.Autotasklogstatistics',
        }).then((res) => {
          if (isSuccess(res, t)) {
            const result = res.data.content[0].value
            t.runsuccess = result.split(',')[0]
            t.runfailure = result.split(',')[1]
            t.startsuccess = result.split(',')[2]
            t.startfailure = result.split(',')[3]
            this.$echarts.init(this.$refs.echart1).setOption({
//        labelLine: {
//          normal: {
//            show: true,
//          },
//        },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
              },
              series: [
                {
                  name: this.$t('lang_homePage.autotaskrun.title'),
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: true,
                      textStyle: {
                        fontSize: '10',
                        fontWeight: 'bold',
                        color: '#53aae0',
                      },
                    },
                    emphasis: {
                      show: true,
                      textStyle: {
                        fontSize: '14',
                        fontWeight: 'bold',
                      },
                    },
                  },
                  labelLine: {
                    normal: {
                      show: true,
                    },
                  },
                  data: [
                    { value: t.runfailure, name: this.$t('lang_homePage.autotaskrun.runfailure') },
                    { value: t.runsuccess, name: this.$t('lang_homePage.autotaskrun.runsuccess') },
                    { value: t.startfailure, name: this.$t('lang_homePage.autotaskrun.startfailure') },
                    { value: t.startsuccess, name: this.$t('lang_homePage.autotaskrun.startsuccess') },
                  ],
                },
              ],
              color: [
                '#2a9869',
                '#bd9a6f',
                '#6d63ae',
                '#66efff',
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
  }
</script>
<style lang="scss" scoped>
  .short{
    height: 220px;
  }
</style>
