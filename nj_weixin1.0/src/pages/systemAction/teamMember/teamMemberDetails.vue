<template>
  <div class="wrap" style="overflow: hidden">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <memberResume :dataList="dataList" style="height: auto;" :styleShow="false"></memberResume>
    <mu-container v-show="showContainer" center style="">
      <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll"  class="tabs">
        <mu-tab style="font-size: 15px">员工信息</mu-tab>
        <mu-tab style="font-size: 15px">公司信息</mu-tab>
        <mu-tab style="font-size: 15px">合同信息</mu-tab>
        <mu-tab style="font-size: 15px">学历信息</mu-tab>
        <mu-tab style="font-size: 15px">联系方式</mu-tab>
      </mu-tabs>
    </mu-container>
    <div class="teamDetail">
      <div class="demo-text" v-if="active === 0 && showDetails">
        <memberBase :empkiWorkno="empkiWorkno" :empId="id"></memberBase>
      </div>
      <div class="demo-text" v-if="active === 1">
        <memberCompany :empkiEmptypeDis="empkiEmptypeDis" :empId="id"></memberCompany>
      </div>
      <div class="demo-text" v-if="active === 2">
        <memberContract :empId="id"></memberContract>
      </div>
      <div class="demo-text" v-if="active === 3">
        <memberEducation :empId="id"></memberEducation>
      </div>
      <div class="demo-text" v-if="active === 4">
        <memberContact :empId="id"></memberContact>
      </div>
    </div>
  </div>
</template>

<script>
  import memberBase from './memberBase.vue'
  import memberResume from './memberResume.vue'
  import memberCompany from './memberCompany.vue'
  import memberContract from './memberContract.vue'
  import memberEducation from './memberEducation.vue'
  import memberContact from './memberContact.vue'
  import headTitle from '../../.././components/headTitle.vue'
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: "teamMemberDetails",
    data() {
      return {
        title: '团队成员',
        flagImg: true,
        active: 0,
        textShow:false,
        dataList:[],
        id: '',
        showDetails: false,
        showContainer: false,
        empkiWorkno: '',
        empkiEmptypeDis: '',
      }
    },
    components:{
      headTitle,
      memberBase,
      memberResume,
      memberCompany,
      memberContract,
      memberEducation,
      memberContact,
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
          _mt: "weiXinTeamMember.getTeamMemberByIds",
          companyId: pubsource.companyId,
          ids: this.id
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.dataList = JSON.parse(res.data.content[0].value)
            if (this.dataList) {
              this.empkiWorkno = this.dataList[0].empkiWorkno
              this.empkiEmptypeDis = this.dataList[0].empkiEmptypeDis
            }
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
  @import '../../css/common_inform';

  .teamDetail{
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
