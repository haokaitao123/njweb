<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card style="margin: 0">
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{$t('lang_financialMan.finServiceboard.title')}}
        </p>
        <Row>
          <div class="echats" :style="{height:tableheight + 'px'}">
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_financialMan.finServiceboard.subTitle1')}}
              <Tabs type="card"  style="border: 0;" @on-click="tablePie">
                <TabPane :label="$t('lang_financialMan.finServiceboard.histogram')" name="name1">
                  <!--<div id="echartNum" ref="echartNum" style="width: 100%;height: 350px"></div>-->
                  <companyOrderNum ref="companyOrderNum"></companyOrderNum>
                </TabPane>
                <TabPane :label="$t('lang_financialMan.finServiceboard.piechart')" name="name2">
                  <companyOrderPie ref="companyOrderPie"></companyOrderPie>
                </TabPane>
              </Tabs>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_financialMan.finServiceboard.subTitle2')}}
              <Tabs type="card"  style="border: 0;" @on-click="tablePie">
                <TabPane :label="$t('lang_financialMan.finServiceboard.histogram')" name="name3">
                  <OrderClassNum ref="OrderClassNum"></OrderClassNum>
                </TabPane>
                <TabPane :label="$t('lang_financialMan.finServiceboard.piechart')" name="name4">
                  <OrderClassPie ref="OrderClassPie"></OrderClassPie>
                </TabPane>
              </Tabs>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_financialMan.finServiceboard.subTitle3')}}
              <MonthCompanyOrderNum ref="MonthCompanyOrderNum"></MonthCompanyOrderNum>
              </Tabs>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_financialMan.finServiceboard.subTitle4')}}
              <Tabs type="card"  style="border: 0;" @on-click="tablePie">
                <TabPane :label="$t('lang_financialMan.finServiceboard.histogram')" name="name5">
                  <companyOrderPrice ref="companyOrderPrice"></companyOrderPrice>
                </TabPane>
                <TabPane :label="$t('lang_financialMan.finServiceboard.piechart')" name="name6">
                  <companyOrderPricePie ref="companyOrderPricePie"></companyOrderPricePie>
                </TabPane>
              </Tabs>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_financialMan.finServiceboard.subTitle5')}}
              <Tabs type="card"  style="border: 0;" @on-click="tablePie">
                <TabPane :label="$t('lang_financialMan.finServiceboard.histogram')" name="name7">
                  <OrderClassPrice ref="OrderClassPrice"></OrderClassPrice>
                </TabPane>
                <TabPane :label="$t('lang_financialMan.finServiceboard.piechart')" name="name8">
                  <OrderClassPricePie ref="OrderClassPricePie"></OrderClassPricePie>
                </TabPane>
              </Tabs>
            </i-col>
            <i-col span="20" style="width: 33.333% !important;height: 460px;border: 2px solid #F0F0F0;padding: 10px;box-sizing: border-box">
              {{$t('lang_financialMan.finServiceboard.subTitle6')}}
              <MonthCompanyOrderPrice ref="MonthCompanyOrderPrice"></MonthCompanyOrderPrice>
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
  import companyOrderNum from './companyOrderNum.vue'
  import companyOrderPie from './companyOrderPie.vue'
  import OrderClassPie from './OrderClassPie.vue'
  import OrderClassNum from './OrderClassNum.vue'
  import MonthCompanyOrderNum from './MonthCompanyOrderNum.vue'
  import companyOrderPrice from './companyOrderPrice.vue'
  import companyOrderPricePie from './companyOrderPricePie.vue'
  import OrderClassPrice from './OrderClassPrice.vue'
  import OrderClassPricePie from './OrderClassPricePie.vue'
  import MonthCompanyOrderPrice from './MonthCompanyOrderPrice.vue'
  export default{
    data() {
      return {
        tableheight: document.body.offsetHeight - 180,
      }
    },
    components: {
      companyOrderNum,
      companyOrderPie,
      OrderClassPie,
      OrderClassNum,
      MonthCompanyOrderNum,
      MonthCompanyOrderPrice,
      companyOrderPrice,
      companyOrderPricePie,
      OrderClassPrice,
      OrderClassPricePie,
    },
    mounted() {
      this.$refs.companyOrderNum.getDataPie()
      this.$refs.OrderClassNum.getDataPieNum()
      this.$refs.companyOrderPrice.getDataPie()
      this.$refs.OrderClassPrice.getDataPieNum()
      this.$refs.MonthCompanyOrderNum.getDataPieNum()
      this.$refs.MonthCompanyOrderPrice.getDataPieNum()
    },
    computed: {
        companyOrderData() {
          return this.$store.state.finServicesBoardList.companyOrderData
        },
        companyOrderNumObj() {
          return this.$store.state.finServicesBoardList.companyOrderNumObj
        },
        OrderClassNumData() {
              return this.$store.state.finServicesBoardList.OrderClassNumData
        },
        OrderClassNumObj() {
              return this.$store.state.finServicesBoardList.OrderClassNumObj
        },
        companyOrderPriceData() {
            return this.$store.state.finServicesBoardList.companyOrderPriceData
        },
        companyOrderPricePieObj() {
            return this.$store.state.finServicesBoardList.companyOrderPricePieObj
        },
        OrderClassPriceData(){
            return this.$store.state.finServicesBoardList.OrderClassPriceData
        },
        OrderClassPricePieObj() {
            return this.$store.state.finServicesBoardList.OrderClassPricePieObj
        },
  },
    methods: {
      tablePie(name) {
        if (name === 'name2') {
          this.$refs.companyOrderPie.getEchatsPie(this.companyOrderData, this.companyOrderNumObj)
        } else if (name === 'name4') {
          this.$refs.OrderClassPie.getEchatsPieNum(this.OrderClassNumData, this.OrderClassNumObj)
        } else if (name === 'name6') {
          this.$refs.companyOrderPricePie.getEchatsPie(this.companyOrderPriceData, this.companyOrderPricePieObj)
        } else if (name === 'name8') {
          this.$refs.OrderClassPricePie.getEchatsPieNum(this.OrderClassPriceData, this.OrderClassPricePieObj)
        }
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
