<!--使用期时间-->
<template>
  <div class="EmployeeInformation">
    <ul v-for="item in dataList">
      <li>
        公司：{{item.empctHirecompanyDis}}
      </li>
      <li>
        部门：{{item.empctDeptDis}}
      </li>
      <li>
        合同类别：{{item.empctContracttypeDis}}
      </li>
      <li>
        合同期限：{{item.empctContractperiodDis}}
      </li>
      <li>
        合同开始日：{{item.empctContractsdate}}
      </li>
      <li>
        合同到期日：{{item.empctContractedate}}
      </li>
      <li>
        保密协议：{{item.empctConfidentialDis}}
      </li>
      <li>
        试用期限：{{item.empctProbationDis}}
      </li>
      <li>
        试用到期日：{{item.empctProbationdate}}
      </li>
      <!--<div v-show="dataList.length === 1?false:true" style="height: 30px;"></div>-->
    </ul>
  </div>
</template>
<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: "memberContract",
    data() {
      return {
        dataList: []
      }
    },
    mounted() {
      this.getData()
    },
    props: {
      empId: String,
    },
    methods: {
      getData(){
        const t = this
        let params = {
          _mt: "weiXinEmpInfo.getEmpContrByEmpId",
          companyId: pubsource.companyId,
          empId: this.empId
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.dataList = JSON.parse(res.data.content[0].value)
          }
        }).catch((res) =>{
          console.error(res.data.stat.desc)
        })
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .EmployeeInformation {
    width: 100%;
    background: white;
    position: relative;
    margin-bottom: 20px;
    box-sizing: border-box;
    height: calc(100% - 180px);
    overflow: scroll;
    ul{
      margin-top: 20px;
      padding: 40px 54px 0px 30px;
      border-bottom: 3px solid #d9d9d9;
    }
    ul > li {
      list-style: none;
      font-size: 28px;
      color: #666666;
      margin-bottom: 20px;
    }
    .Li{
      position: relative;;
    }
    .dateTime{
      position: absolute;
      top:0;
      right:0;
      color: #84DC76;
    }
    .dateColor {
      color: #FF850E;
      margin-bottom: 0;
    }
    .state {
      position: absolute;
      top: 50px;
      right: 30px;
      color: #F44336;
      font-size: 28px;
    }
  }
</style>
