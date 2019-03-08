<!--合同续签自评-->
<template>
  <div class="wrap">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->

    <router-link tag="div" :to="{path:'/flowContractList',query:{dataList:dataList}}">
      <probationTime :dataList="dataList"></probationTime>
    </router-link>
    <no-Info v-loading="isLoading" v-show="noInfo"></no-Info>
  </div>

</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
  import probationTime from './flowContractView.vue'
  import {getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'
  export default {
    name: "probationPeriod",
    data() {
      return {
        title: '合同续签自评',
        flagImg: true,
        dataList:[],
        noInfo: true,
        isLoading: true,
      }
    },
    components: {
      headTitle,
      probationTime
    },
    created(){

    },
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        const t = this
        t.isLoading = true
        t.dataList = []
        let params = {
          _mt: "wxEmpFlowContract.getEmpFlowContract",
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
            }
            this.dataList.push(JSON.parse(res.data.content[0].value))
          }
        }).catch((res) =>{
          console.error(res.data.state.stateList[0].desc)
        })
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../css/public';
</style>
