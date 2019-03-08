<template>
  <i-col class="col" span="24">
    <card :bordered="false">
      <p slot="title" class="title"><Icon type="stats-bars"></Icon> <span style="margin-left: 5px;">{{$t('lang_homePage.employee.title')}}</span></p>
      <a href="#" slot="extra">
        <Icon type="more"></Icon>
      </a>
      <div class="data">
        <div class="data_block" style="background-color: #f7fcff;">
          <div class="data_title">
            {{$t('lang_homePage.employee.currentEmp')}}
          </div>
          <div class="data_content">
            <div style="background-image: url('../../../static/homeImg/DQRS.png');width: 60px;height: 60px;background-repeat: no-repeat;background-size: 100%;background-position: center;"></div>
            <div>{{current}}</div>
          </div>
        </div>
        <div class="data_block" style="background-color: #f6fcf3;">
          <div class="data_title">
            {{$t('lang_homePage.employee.monenEmp')}}
          </div>
          <div class="data_content">
            <div style="background-image: url('../../../static/homeImg/DYRZ.png');width: 60px;height: 60px;background-repeat: no-repeat;background-size: 100%;background-position: center;"></div>
            <div>{{ru}}</div>
          </div>
        </div>
        <div class="data_block" style="background-color: #fffcf5;">
          <div class="data_title">
            {{$t('lang_homePage.employee.monlevEmp')}}
          </div>
          <div class="data_content">
            <div style="background-image: url('../../../static/homeImg/DQLZ.png');width: 60px;height: 60px;background-repeat: no-repeat;background-size: 100%;background-position: center;"></div>
            <div>{{li}}</div>
          </div>
        </div>
        <div class="data_block">
          <div ref="echart" style="width: 100%;height: 100%"></div>
        </div>
        <div class="data_block">
          <div ref="echartxl" style="width: 100%;height: 100%"></div>
        </div>
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
        data: [],
        current: '',
        ru: '',
        li: '',
        man: 0,
        woman: 0,
        education1: '',
        education2: '',
        education3: '',
        education4: '',
      }
    },
    mounted() {
      this.getDate()
    },
    methods: {
      getDate() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'ansrptStatistics.getStaffConditionStatisticForPc',
        }).then((res) => {
          if (isSuccess(res, t)) {
            const result = res.data.content[0].value
            t.li = result.split(',')[0]
            t.ru = result.split(',')[1]
            t.current = result.split(',')[2]
//            console.log(data)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        getDataLevelUserLogin({
          _mt: 'ansrptStatistics.getGenderStatisticForPc',
        }).then((res) => {
          if (isSuccess(res, t)) {
            const result = res.data.content[0].value
            t.man = Number(result.split(',')[0])
            t.woman = Number(result.split(',')[1])
            const pop = t.man + t.woman
            t.man = parseInt(t.man / pop * 100)
            t.woman = parseInt(t.woman / pop * 100)
//            console.log(parseInt(t.man))
//            console.log(parseInt(t.woman))
            this.$echarts.init(this.$refs.echart).setOption({
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)',
              },
              series: [
                {
                  name: this.$t('lang_homePage.employee.sexRate'),
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
                    { value: this.man, name: this.$t('lang_homePage.employee.man') },
                    { value: this.woman, name: this.$t('lang_homePage.employee.woman') },
                  ],
                },
              ],
              color: [
                '#89c5e9',
                '#ffdc99',
              ],
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        getDataLevelUserLogin({
          _mt: 'ansrptStatistics.getStaffEducationStatisticForPc',
        }).then((res) => {
          if (isSuccess(res, t)) {
            const result = res.data.content[0].value
            t.education1 = result.split(',')[0]
            t.education2 = result.split(',')[1]
            t.education3 = result.split(',')[2]
            t.education4 = result.split(',')[2]
//            console.log(data)
            this.$echarts.init(this.$refs.echartxl).setOption({
              color: ['#fdd5c9'],
              grid: {
                top: '5%',
                left: '3%',
                right: '2%',
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
                  data: [this.$t('lang_homePage.employee.education1'), this.$t('lang_homePage.employee.education2'), this.$t('lang_homePage.employee.education3'), this.$t('lang_homePage.employee.education4')],
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
                  name: this.$t('lang_homePage.employee.education'),
                  type: 'bar',
                  barWidth: '60%',
                  data: [this.education1, this.education2, this.education3, this.education4],
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
  .data{
    width: 100%;
    display: flex;
  .data_block{
    height: 100px;
    padding: 0 10px;
    width: 19%;
    margin-right: 1%;
  .data_title{
    height: 40px;
    font-weight: bold;
    line-height: 40px;
  }
  .data_content{
    display: flex;
    font-size: 36px;
    line-height: 60px;
    justify-content: space-between;
  }
  }
  }
</style>
