<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card style="margin: 0">
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_empManage.monitorBoard.title')}}
        </p>
        <Row>
          <div class="echats" :style="{height:tableheight + 'px'}">
            <i-col span="20" style="width: 33.333% !important;height: 520px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_empManage.monitorBoard.subTitle1')}}
              <EchatsOne ref="EchatsOne"></EchatsOne>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 520px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_empManage.monitorBoard.subTitle2')}}
              <EchatsTwo ref="EchatsTwo"></EchatsTwo>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 520px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_empManage.monitorBoard.subTitle3')}}
              <EchatsThree ref="EchatsThree"></EchatsThree>
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
  import EchatsOne from './EchatsOne.vue'
  import EchatsTwo from './EchatsTwo.vue'
  import EchatsThree from './EchatsThree.vue'
//   import EchatsSix from './EchatsSix.vue'
//   import EchatsFour from './EchatsFour.vue'
//   import EchatsFive from './EchatsFive.vue'
  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 180,
        selectFlow: this.$t('lang_empManage.monitorBoard.selectFlow1'),
        knowledgeStatus: [
          {
            flowCode: 100,
            flowName: this.$t('lang_empManage.monitorBoard.selectFlow1'),
          },
          {
            flowCode: 110,
              flowName: this.$t('lang_empManage.monitorBoard.selectFlow2'),
          },
          {
            flowCode: 120,
              flowName: this.$t('lang_empManage.monitorBoard.selectFlow3'),
          },
          {
            flowCode: 130,
              flowName: this.$t('lang_empManage.monitorBoard.selectFlow4'),
          },
          {
            flowCode: 140,
              flowName: this.$t('lang_empManage.monitorBoard.selectFlow5'),
          },
        ],
      }
    },
    components: {
      EchatsOne,
      EchatsTwo,
      EchatsThree,
      // EchatsFour,
      // EchatsFive,
      // EchatsSix,
    },
    mounted() {
      this.$refs.EchatsOne.getDataPieNum()
      this.$refs.EchatsTwo.getDataPieNum()
      this.$refs.EchatsThree.getDataPieNum()
      // this.$refs.EchatsFour.getDataPieNum()
      // this.$refs.EchatsFive.getDataPieNum()
      // this.$refs.EchatsSix.getDataPieNum(100)
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
