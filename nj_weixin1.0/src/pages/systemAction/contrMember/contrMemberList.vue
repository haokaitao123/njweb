<!--一条为一行-->
<template>
  <div class="wrap" style="overflow: hidden;position: relative">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <contrMemberResume v-loading="isLoading" data-mu-loading-overlay-color="white"
                       style="position: relative; width: 100%;"
                       :dataList="dataList"></contrMemberResume>
    <noInfo v-show="noInfo"></noInfo>
  </div>
</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
  import contrMemberResume from './contrMemberResume.vue'
  import noInfo from '../../.././components/NoInfo.vue'
  import {getDataLevelNone, getDataLevelUserLogin, getDataLevelUserLoginNew} from '../../.././axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'

  export default {
    name: "contrMemberList",
    data() {
      return {
        title: '合同续签评估',
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
      contrMemberResume,
      noInfo,
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData(){
        const t = this
        const data = {
          _mt:'weixinContrMember.getContrMemberList',
          companyId:pubsource.companyId,
          sort: t.sort,
          order: t.order,
          empconBuspmp: localStorage.getItem('bus_empid'),
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then(res => {
          t.dataList = JSON.parse(res.data.content[0].value)
          if (t.dataList.length === 0) {
            t.noInfo = true
          }
          t.isLoading = false
        }).catch((err) => {
          console.log(11)
        })
      },
    },
  }
</script>

<style scoped type="text/less" lang="less">
  @import '../../css/common_inform';
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
