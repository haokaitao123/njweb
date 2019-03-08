<template>
  <div class="wrap" style="overflow: hidden">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <contrMemberResume :dataList="dataList"></contrMemberResume>
    <mu-container v-show="showContainer">
      <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll" center :full-width="true" class="tabs">
        <mu-tab style="flex: 1;font-size: 15px">合同信息</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px">合同历史</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px">员工自评</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px">经理评估</mu-tab>
      </mu-tabs>
    </mu-container>
    <div class="contrdetail">
      <div class="demo-text" v-if="active === 0 && showDetails">
        <contrMemberBase :empFlowContract="empFlowContract"></contrMemberBase>
      </div>
      <div class="demo-text" v-if="active === 1">
        <contrMemberhistory :empId="empFlowContract.empId"></contrMemberhistory>
      </div>
      <div class="demo-text" v-if="active === 2">
        <contrEmpSelfEva :empFlowContract="empFlowContract" ></contrEmpSelfEva>
      </div>
       <div class="demo-text" v-if="active === 3">
        <contrBuspmpEva :empFlowContract="empFlowContract"></contrBuspmpEva>
      </div>
    </div>
  </div>
</template>

<script>
  import contrMemberBase from './contrMemberBase.vue'
  import contrMemberResume from './contrMemberResume.vue'
  import contrMemberhistory from './contrMemberhistory.vue'
  import contrEmpSelfEva from './contrEmpSelfEva.vue'
  import contrBuspmpEva from './contrBuspmpEva.vue'
  import headTitle from '../../.././components/headTitle.vue'
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: "contrMemberDetails",
    data() {
      return {
        title: '合同续签评估',
        flagImg: true,
        active: 0,
        id: '',
        dataList: [],
        empFlowContract: {},
        showDetails: false,
        showContainer: false,
      }
    },
    components:{
      headTitle,
      contrMemberBase,
      contrMemberResume,
      contrMemberhistory,
      contrEmpSelfEva,
      contrBuspmpEva,
    },
    mounted() {
      this.id = getUrlKey('id')
      this.getData()
    },
    methods:{
      getData(){
        const t = this
        t.dataList = []
        let params = {
          _mt: "weixinContrMember.getContrMemberById",
          companyId: pubsource.companyId,
          id: this.id
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.dataList.push(JSON.parse(res.data.content[0].value))
            this.empFlowContract = this.dataList[0]
            this.showDetails = true
            this.showContainer = true
          }
        }).catch((res) =>{
          console.error(res.data.stat.desc)
        })
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  @import '../../css/common_inform';
  .wrap{
    height: 100%;
  }
  .contrdetail{
    height: calc(100% - 600px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .personalText{
    wdth:100%;
    padding: 40px  0 0 30px;
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
