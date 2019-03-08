<template>
  <div class="wrap" style="overflow: hidden">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <dimissionResume :dataList="dataList" :isList="isList" style="height: auto"></dimissionResume>
    <mu-container v-show="showContainer">
      <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll" center :full-width="true" class="tabs">
        <mu-tab style="flex: 1;font-size: 15px">基本信息</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px">合同信息</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px">离职发起</mu-tab>
      </mu-tabs>
    </mu-container>
    <div class="firedetail">
      <div class="demo-text" v-if="active === 0 && showDetails">
        <dimissionBase :empFlowDimission="empFlowDimission"></dimissionBase>
      </div>
      <div class="demo-text" v-if="active === 1">
        <dimissionContract :empFlowDimission="empFlowDimission"></dimissionContract>
      </div>
      <div class="demo-text" v-if="active === 2">
        <dimissionInitial :empFlowDimission="empFlowDimission"></dimissionInitial>
      </div>
    </div>
  </div>
</template>

<script>
  import dimissionBase from './dimissionBase.vue'
  import dimissionResume from './dimissionResume.vue'
  import dimissionContract from './dimissionContract.vue'
  import dimissionInitial from './dimissionInitial.vue'
  import headTitle from '../../.././components/headTitle.vue'
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: "dimissionDetails",
    data() {
      return {
        title: '主动离职发起',
        flagImg: true,
        active: 0,
        textShow:false,
        id: '',
        isBase: false,
        isList: false,
        dataList: [],
        empFlowDimission: {},
        showDetails: false,
        showContainer: false,
      }
    },
    components:{
      headTitle,
      dimissionBase,
      dimissionResume,
      dimissionContract,
      dimissionInitial,
    },
    mounted() {
      this.id = getUrlKey('id')
      this.isBase = getUrlKey('isBase')
      this.getData()
    },
    methods:{
      getData(){
        const t = this
        t.dataList = []
        let params1 = {
          _mt: "weiXinFireMember.getFireMemberById",
          companyId: pubsource.companyId,
          id: this.id
        }
        let params2 = {
          _mt: "weiXinFireMember.getFireMemBaseByEmpId",
          companyId: pubsource.companyId,
          empId: this.id
        }
        let params = params1
        if (t.isBase) {
          params = params2
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.dataList.push(JSON.parse(res.data.content[0].value))
            if (!this.dataList[0].empdimApplydate) {
              this.dataList[0].empdimApplydate = new Date().format('yyyy-MM-dd')
              this.dataList[0].empdimApplicant = localStorage.getItem('bus_userid'),
              this.dataList[0].empdimLaskworkday = this.dataList[0].empdimApplydate // 最后工作日期初始化
              this.dataList[0].empdimLaskemployday = this.dataList[0].empdimApplydate // 最后雇佣日期初始化
              this.dataList[0].empdimGetcertificate = '1' // 是否需要离职证明初始化
              this.dataList[0].empdimDimtype = '01voluntary' // 是否需要离职证明初始化
            }
            this.empFlowDimission = this.dataList[0]
            this.showContainer = true
            this.showDetails = true
          }
        }).catch((res) =>{
          console.error(res.data.stat.desc)
        })
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .wrap{
    height: 100%;
  }
  .firedetail{
    height: calc(100% - 600px);
    overflow: scroll;
  }
  .personalText{
    wdth:100%;
    padding: 26px  0 0 30px;
    background: white;
    font-size: 30px;
    margin-bottom: 20px;
    .ipt{
      outline: none;
      border:0;
    }
  }
  .submit{
    width: 100%;
    height: 86px;
    line-height: 86px;
    text-align: center;

    font-size: 36px;
    background: #FFFFFF;
    button{
      background: #3399FF;
      width: 100%;
      outline: none;
      color: #FFFFFF;
    }
  }
</style>
