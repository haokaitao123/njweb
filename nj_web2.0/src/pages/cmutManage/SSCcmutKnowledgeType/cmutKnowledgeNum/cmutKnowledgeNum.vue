<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card style="margin: 0">
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_knowBase.knowlegeStatistic.title')}}
        </p>
        <Row>
          <i-col span="20" style="width: 50% !important;height: 450px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
          {{$t('lang_knowBase.knowlegeStatistic.paneTitle1')}}
          <Tabs type="card" @on-click="tabClick" style="border: 0;">
            <TabPane :label="$t('lang_knowBase.knowlegeStatistic.label1')" name="name1">
              <div id="echartNum" ref="echartNum" style="width: 100%;height: 350px"></div>
            </TabPane>
            <TabPane :label="$t('lang_knowBase.knowlegeStatistic.label2')" name="name2">
              <div id="echartPie" ref="echartPie" style="width: 100%;height: 350px;background: white"></div>
            </TabPane>
          </Tabs>
        </i-col>
          <i-col span="20" style="width: 50% !important;height: 450px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
            {{$t('lang_knowBase.knowlegeStatistic.paneTitle2')}}
            <Tabs type="card" @on-click="tabClickNum" style="border: 0;">
              <TabPane :label="$t('lang_knowBase.knowlegeStatistic.label1')" name="name3">
                <div id="clickNum" style="width: 100%;height: 350px"></div>
              </TabPane>
              <TabPane :label="$t('lang_knowBase.knowlegeStatistic.label2')" name="name4">
                <div id="clickPie" style="width: 100%;height: 350px"></div>
              </TabPane>
            </Tabs>
          </i-col>
        </Row>
      </card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess } from '../../../../lib/util'
  export default{
    data() {
      return {
        data: {},
        cmutKntypeDesc: [],
        cmutKntypeName: [],
        Object: [],
        cmutKntypeNameSubString: [],
        dataNum: {},
        cmutKntypeDescNum: [],
        cmutKntypeNameNum: [],
        cmutKntypeNameNumSubString: [],
        ObjectNum: [],
      }
    },
    computed: {
    },
    mounted() {
      this.cmutKntypeNameNumSubString = []
      this.getDataPie()
      this.getDataPieNum()
    },
    methods: {
      // 数量统计
      getDataPie() {
        const t = this
        let data = {
          _mt: 'ansrptKnowledge.getStatistic',
          logType: '按照知识大类统计数量',
        }
        t.Object = []
        t.data = {}
        t.cmutKntypeDesc = []
        t.cmutKntypeName = []
        t.cmutKntypeNameSubString = []
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            JSON.parse(res.data.content[0].value).forEach((item) => {
              let Obj = {}
              Obj["name"] = item.cmutKntypeName
              Obj["value"] = item.cmutKntypeDesc
              this.cmutKntypeDesc.push(item.cmutKntypeDesc)
              this.cmutKntypeName.push(item.cmutKntypeName)
              this.cmutKntypeNameSubString.push(item.cmutKntypeName.substring(0,7))
              this.Object.push(Obj)
            })
            t.data.cmutKntypeDesc = this.cmutKntypeDesc
            t.data.cmutKntypeName = this.cmutKntypeName
            t.data.cmutKntypeNameSubString = this.cmutKntypeNameSubString
            this.getEchatsPie(t.data, t.Object)
            this.getEchatsColumn(t.data)
          }
        }).catch(err => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 点击量统计
      getDataPieNum() {
        const t = this
        let data = {
          _mt: 'ansrptKnowledge.getClicks',
          logType: '按照知识大类统计数量',
        }
        t.ObjectNum = []
        t.dataNum = {}
        t.cmutKntypeDescNum = []
        t.cmutKntypeNameNum = []
        t.cmutKntypeNameNumSubString = []
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            JSON.parse(res.data.content[0].value).forEach((item) => {
              let Obj = {}
              Obj["name"] = item.cmutKntypeName
              Obj["value"] = item.cmutEdgecount
              this.cmutKntypeDescNum.push(item.cmutEdgecount)
              this.cmutKntypeNameNum.push(item.cmutKntypeName)
              this.cmutKntypeNameNumSubString.push(item.cmutKntypeName.substring(0,7))
              this.ObjectNum.push(Obj)
            })
            t.data.cmutKntypeDescNum = this.cmutKntypeDescNum
            t.data.cmutKntypeNameNum = this.cmutKntypeNameNum
            t.data.cmutKntypeNameNumSubString = this.cmutKntypeNameNumSubString
            this.getEchatsPieNum(t.data, t.ObjectNum)
            this.getEchatsColumnNum(t.data)
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
          color: ['#77D8CF'],
          grid: {
            top: '5%',
            left: '3%',
            right: '0%',
            bottom: '5%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, callback) {
              return params.seriesName + '<br/>' + data.cmutKntypeName[params.dataIndex] + ':' + params.value
            },
          },
          xAxis: [
            {
              type: 'category',
              data: data.cmutKntypeNameSubString,
              axisTick: {
                alignWithLabel: true,
              },
              axisLabel: {
                interval: 0,
                rotate: -60,
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
              name: this.$t('lang_knowBase.knowlegeStatistic.seriesName'),
              type: 'bar',
              barWidth: '60%',
              data: data.cmutKntypeDesc,
            },
          ],
        })
      },
      getEchatsPie(data, obj) {
        console.log(obj)
        let echats1 = this.$echarts.init(document.getElementById('echartPie'))
        echats1.setOption({
          tooltip: {
            trigger: 'item',
          },
          color: ['#A1CFFD', '#7288D5', '#F77F9A', '#77D8CF', "#FDD5DC", "#F99772", "#DAD794", "#AD95D5", "#C7DCD3"],
          legend: {
            type: 'plain',
            orient: 'vertical',
            right: 0,
            top: 10,
            bottom: 20,
            width: 100,
            height: 250,
            itemWidth: 15,
            itemHeight: 8,
            textStyle: {
              fontSize: 10
            },
            data: data.cmutKntypeName,
          },
          series: [{
            name: this.$t('lang_knowBase.knowlegeStatistic.seriesName'),
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
      getEchatsColumnNum(data) {
        console.log()
        let echats3 = this.$echarts.init(document.getElementById('clickNum'))
        echats3.setOption({
          color: ['#fdd5c9'],
          grid: {
            top: '5%',
            left: '3%',
            right: '0%',
            bottom: '5%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'item',
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
                rotate: -60,
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
              name: this.$t('lang_knowBase.knowlegeStatistic.seriesName'),
              type: 'bar',
              barWidth: '60%',
              data: data.cmutKntypeDescNum,
            },
          ],
        })
      },
      getEchatsPieNum(data, obj) {
        console.log(data.cmutKntypeNameNumSubString)
        let echats4 = this.$echarts.init(document.getElementById('clickPie'))
        echats4.setOption({
          tooltip: {
            trigger: 'item',
          },
          color: ['#A1CFFD', '#7288D5', '#F77F9A', '#77D8CF', "#FDD5DC", "#F99772", "#DAD794", "#AD95D5", "#C7DCD3"],
          legend: {
            type: 'plain',
            orient: 'vertical',
            right: 0,
            top: 10,
            bottom: 20,
            width: 100,
            height: 250,
            itemWidth: 15,
            itemHeight: 8,
            textStyle: {
              fontSize: 10
            },
            data: data.cmutKntypeNameNum, //
          },
          series: [{
            name: this.$t('lang_knowBase.knowlegeStatistic.seriesName'),
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
      tabClick(name) {
        this.data = {}
        this.Object = []
        if (name === 'name1') {
          this.getDataPie()
        } else if (name === 'name2') {
          this.getDataPie()
        } else if (name === 'name3') {
          this.getDataPieNum()
        } else if (name === 'name4') {
          this.getDataPieNum()
        }
      },
      tabClickNum(name) {
        this.data = {}
        this.ObjectNum = []
        if (name === 'name3') {
          this.getDataPieNum()
        } else if (name === 'name4') {
          this.getDataPieNum()
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  .table{
    height: 500px;
  }
  .ivu-card-body{
    padding-top: 0px;
  }
  .table-form{
    margin: 10px 0;
  }
  .ivu-card-head{
    padding: 0;
  }
  .ivu-tabs-bar{
    border:0 !important;
  }
  .margin-right-10{
    margin-right: 10px;
  }
  .colTree{
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
  }
  .divtree{
    padding-left: 10px;
    overflow: auto;
    border: 1px #efefef solid;
  }
</style>
