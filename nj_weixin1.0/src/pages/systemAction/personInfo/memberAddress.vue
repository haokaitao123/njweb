<!--使用期时间-->
<template>
  <div class="EmployeeInformation">
    <ul v-for="item in dataList">
      <li>
        <strong >地址类型：{{item.empaddrTypeDis}}</strong>
      </li>
      <li>
        国家：{{item.empaddrCuntryDis}}
      </li>
      <li>
        省份：{{item.empaddrProvinceDis}}
      </li>
      <li>
        城市：{{item.empaddrCityDis}}
      </li>
      <li>
        详细地址：{{item.empaddrStreet}}
      </li>
      <li>
        邮编：{{item.empaddrZip}}
      </li>
      <li>
        户口性质：{{item.empaddrRegisterpropertyDis}}
      </li>
      <li>
        生效日期：{{item.empaddrSdate}}
      </li>
      <li>
        失效日期：{{item.empaddrEdate}}
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
          _mt: "weiXinEmpInfo.getEmpAddressByEmpId",
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
