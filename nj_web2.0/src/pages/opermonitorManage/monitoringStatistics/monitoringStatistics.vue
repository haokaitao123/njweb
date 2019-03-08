<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card style="margin: 0">
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_operatmonitor.monitorBoard.title')}}
        </p>
        <Row>
          <div class="echats" :style="{height:tableheight + 'px'}">
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_operatmonitor.monitorBoard.subTitle1')}}
              <EchatsOne ref="EchatsOne"></EchatsOne>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_operatmonitor.monitorBoard.subTitle2')}}
              <EchatsTwo ref="EchatsTwo"></EchatsTwo>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_operatmonitor.monitorBoard.subTitle3')}}
              <EchatsThree ref="EchatsThree"></EchatsThree>
              <!-- </Tabs> -->
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_operatmonitor.monitorBoard.subTitle4')}}
              <EchatsFour ref="EchatsFour"></EchatsFour>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_operatmonitor.monitorBoard.subTitle5')}}
              <EchatsFive ref="EchatsFive"></EchatsFive>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_operatmonitor.monitorBoard.subTitle6')}}
              <Dropdown @on-click="selected">
              <Button type="primary">
              {{selectFlow}}
              <Icon type="arrow-down-b"></Icon>
              </Button>
              <DropdownMenu slot="list">
              <DropdownItem :name="item.flowCode" v-for="(item,index) in knowledgeStatus" :key="index">{{item.flowName}}</DropdownItem>
              </DropdownMenu>
              </Dropdown>
              <EchatsSix ref="EchatsSix"></EchatsSix>
            </i-col>
          </div>
        </Row>
      </card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import EchatsSix from './EchatsSix.vue'
  import EchatsTwo from './EchatsTwo.vue'
  import EchatsThree from './EchatsThree.vue'
  import EchatsFour from './EchatsFour.vue'
  import EchatsFive from './EchatsFive.vue'
  import EchatsOne from './EchatsOne.vue'
  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 180,
        selectFlow: this.$t('lang_operatmonitor.monitorBoard.selectFlow1'),
        knowledgeStatus: [
          {
            flowCode: 100,
            flowName: this.$t('lang_operatmonitor.monitorBoard.selectFlow1'),
          },
          {
            flowCode: 110,
              flowName: this.$t('lang_operatmonitor.monitorBoard.selectFlow2'),
          },
          {
            flowCode: 120,
              flowName: this.$t('lang_operatmonitor.monitorBoard.selectFlow3'),
          },
          {
            flowCode: 130,
              flowName: this.$t('lang_operatmonitor.monitorBoard.selectFlow4'),
          },
          {
            flowCode: 140,
              flowName: this.$t('lang_operatmonitor.monitorBoard.selectFlow5'),
          },
        ],
      }
    },
    components: {
      EchatsTwo,
      EchatsThree,
      EchatsFour,
      EchatsFive,
      EchatsSix,
      EchatsOne,
    },
    mounted() {
      this.$refs.EchatsThree.getDataPieNum()
      this.$refs.EchatsFour.getDataPieNum()
      this.$refs.EchatsFive.getDataPieNum()
      this.$refs.EchatsOne.getDataPieNum()
      this.$refs.EchatsSix.getDataPieNum(100)
      this.$refs.EchatsTwo.getDataPieNum()
    },
    methods: {
      selected(name) {
        for (let i = 0; i < this.knowledgeStatus.length; i++) {
          if (this.knowledgeStatus[i].flowCode === name) {
            this.selectFlow = this.knowledgeStatus[i].flowName
          }
        }
        this.$refs.EchatsSix.getDataPieNum(name)
      },
    },

  }
</script>
<style lang="scss" scoped>
  .table{
    height: 500px;
    .echats{
      width:100%;
      overflow-y: scroll;
      border:2px solid rgb(240, 240, 240);
    }
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
