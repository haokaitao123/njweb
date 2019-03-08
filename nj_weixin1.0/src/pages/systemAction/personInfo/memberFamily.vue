<!--使用期时间-->
<template>
  <div class="EmployeeInformation">
    <ul v-for="item in dataList">
      <li>
        成员关系：{{item.empfmRelationDis}}
      </li>
      <li>
        中文名称：{{item.empfmCname}}
      </li>
      <li>
        First name: {{item.empfmFirstname}}
      </li>
      <li>
        Last name：{{item.empfmLastname}}
      </li>
      <li>
        证件类型：{{item.empfmIdtypeDis}}
      </li>
      <li>
        证件号码：{{item.empfmIdno}}
      </li>
      <li>
        性别：{{item.empfmGenderDis}}
      </li>
      <li>
        出生日期：{{item.empfmBirthdate}}
      </li>
      <li>
        联系电话：{{item.empfmPhone}}
      </li>
      <li>
        婚育状况：{{item.empfmMarriageDis}}
      </li>
      <li>
        政治面貌：{{item.empfmPoliticalDis}}
      </li>
      <li>
        国籍：{{item.empfmCuntryDis}}
      </li>
      <li>
        居住地址：{{item.empfmAddress}}
      </li>
      <li>
        邮编：{{item.empfmZip}}
      </li>
      <li>
        工作单位：{{item.empfmCompany}}
      </li>
      <li>
        职务：{{item.empfmPost}}
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
          _mt: "weiXinEmpInfo.getEmpFamilyByEmpId",
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
