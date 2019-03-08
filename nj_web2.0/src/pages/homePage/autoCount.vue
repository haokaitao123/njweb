<template>
  <i-col class="col" span="8">
    <card :bordered="false">
      <p slot="title" class="title">
        <Icon type="hammer"></Icon>
        <span style="margin-left: 5px;">{{$t('lang_homePage.autotask.title')}}</span></p>
      <a href="#" slot="extra">
        <Icon type="more"></Icon>
      </a>
      <div class="block short">
        <div ref="echart1"></div>
        <div ref="echart2"></div>
        <div ref="echart3"></div>
      </div>
    </card>
  </i-col>
</template>
<script>
  import { isSuccess, deepCopy } from '../../lib/util'
  import { getDataLevelUserLogin } from '../../axios/axios'

  export default {
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
          _mt: 'ansrptStatistics.Autotaskstatistics',
        }).then((res) => {
          if (isSuccess(res, t)) {
            const data = JSON.parse(res.data.content[0].value)
//            console.log(data)
            this.$echarts.init(this.$refs.echart1).setOption({
              title: {
                subtext: this.$t('lang_homePage.autotask.count'),
                x: 'center',
                y: '80%',
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
              },
              series: [
                {
                  name: this.$t('lang_homePage.autotask.countstat'),
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center',
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
                      show: false,
                    },
                  },
                  data: [
                    {
                      value: data.sum, name: this.$t('lang_homePage.autotask.count'),
                    },
                    {
                      value: data.validity, name: this.$t('lang_homePage.autotask.validity'),
                    },
                    {
                      value: data.invalid, name: this.$t('lang_homePage.autotask.invalid'),
                    },
                  ],
                },
              ],
              color: [
                '#89c5e9',
                '#fecd81',
                '#f895a7',
              ],
            })
            this.$echarts.init(this.$refs.echart2).setOption({
              title: {
                subtext: this.$t('lang_homePage.autotask.typestat'),
                x: 'center',
                y: '80%',
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
              },
              series: [
                {
                  name: this.$t('lang_homePage.autotask.typestat'),
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center',
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
                      show: false,
                    },
                  },
                  data: data.autotasktype,
                },
              ],
              color: [
                '#e5f4df',
                '#d7d7ef',
                '#c3f5ff',
                '#cccccc',
                '#ffa669',
                '#daa5e7',
              ],
            })
            this.$echarts.init(this.$refs.echart3).setOption({
              title: {
                subtext: this.$t('lang_homePage.autotask.plstat'),
                x: 'center',
                y: '80%',
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
              },
              series: [
                {
                  name: this.$t('lang_homePage.autotask.plstat'),
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    normal: {
                      show: false,
                      position: 'center',
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
                      show: false,
                    },
                  },
                  data: data.runfrequency,
                },
              ],
              color: [
                '#a5946e',
                '#8bf0c5',
                '#d3ec77',
                '#598873',
                '#d0f0dd',
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
  .short {
    height: 220px;
    display: flex;
    div {
      width: 33%;
      height: 100%;
    }
  }
</style>
