<!--调动确认-->
<template>
  <div class="wrap" >
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->

    <router-link tag="div" :to="{path:'/internaltransferConfirmList',query:{dataList:dataList}}">
      <probationTime :dataList="dataList"></probationTime>
    </router-link>
    <noInfo v-loading="isLoading" v-show="noInfo"></noInfo>
  </div>

</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
  import probationTime from './internaltransferConfirmView.vue'
  import {getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'
  import noInfo from '../../.././components/NoInfo.vue'
  export default {
    name: "internaltransferConfirm",
    data() {
      return {
        title: '调动确认',
        flagImg: true,
        dataList:[],
        noInfo: true,
        isLoading: true,
      }
    },
    components: {
      headTitle,
      probationTime,
      noInfo
    },
    created(){

    },
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        const t = this
        t.dataList = []
        t.isLoading = true
        let params = {
          _mt: "wxEmpFlowInternaltransfer.getEmpFlowInternaltransfer",
          companyId: pubsource.companyId,
          busEmpid:localStorage.getItem('bus_empid'),
          busEmpGid:localStorage.getItem('bus_empGid')
        }
        getDataLevelUserLogin(params).then((res) => {
           t.isLoading = false
          if (isSuccess(res, t)) {
            if (res.data.content[0].value === '' || res.data.content[0].value === undefined) {
              t.noInfo = true
            } else {
              t.noInfo = false
              this.dataList.push(JSON.parse(res.data.content[0].value))
            }
          }
        }).catch((res) =>{
          console.error(res.data.stat.stateList[0].desc)
        })
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../css/public';
</style>
