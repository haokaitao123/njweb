<!--一条为一行-->
<template>
  <div class="wrap" style="overflow: hidden;position: relative">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <goAbroadSure v-loading="isLoading" data-mu-loading-overlay-color="white"
                       style="position: relative; width: 100%;height: 100%"
                       :dataList="dataList"></goAbroadSure>
    <noInfo v-show="noInfo"></noInfo>
  </div>
</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
  import goAbroadSure from './goAbroadSure.vue'
  import noInfo from '../../.././components/NoInfo.vue'
  import {getDataLevelNone, getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../.././axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'

  export default {
    name: "goAbroadSureList",
    data() {
      return {
        title: '出国信息',
        flagImg: true,
        isLoading: true,
        noInfo: false,
        sort: 'id',
        order: 'desc',
        dataList: [],
      }
    },
    props: {
    },
    components: {
      headTitle,
      goAbroadSure,
      noInfo,
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData(){
        const t = this
        const data = {
          _mt:'wxVisaPassport.getVisaPassport',
          companyId:pubsource.companyId,
          busEmpid: localStorage.getItem('bus_empid'),
          busEmpGid: localStorage.getItem('bus_empGid'),
          thisStep: '2-1',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLogin(data).then(res => {
          t.dataList = []
          if (!res.data.content[0].hasOwnProperty('value')) {
            t.noInfo = true
            t.isLoading = false
          } else {
            t.dataList.push(JSON.parse(res.data.content[0].value))
            t.isLoading = false
          }
        }).catch((err) => {
          console.log(11)
        })
      },
    },
  }
</script>

<style scoped type="text/less" lang="less">
  @import '../../css/common_inform';
  .wrap{
    width:100%;
    height: 100%;
  }
  .EmployeeInformation {
    width: 100%;
    padding: 40px 54px 48px 30px;
    background: white;
    position: relative;
    margin-bottom: 20px;
    box-sizing: border-box;
    ul > li {
      list-style: none;
      font-size: 28px;
      color: #666666;
      margin-bottom: 20px;
    }
    .Li{
      position: relative;;
    }
    .dateTime1{
      position: absolute;
      top:0;
      right:0;
      color: #84DC76;
    }
    .dateTime2{
      position: absolute;
      top:0;
      right:0;
      color: #ff0000;
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
