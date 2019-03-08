<!--试用期自评-->
<template>
  <div class="wrap">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->

    <router-link tag="div" :to="{path:'/probationPeriodList',query:{dataList:dataList}}">
      <probationTime :dataList="dataList"></probationTime>
    </router-link>
    <noInfo v-loading="isLoading" v-show="noInfo"></noInfo>
  </div>

</template>

<script>
  import headTitle from '../../.././components/headTitle.vue'
  import probationTime from './probationTime.vue'
  import {getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull} from '@/lib/util'
  import noInfo from '../../.././components/NoInfo.vue'
  export default {
    name: "probationPeriod",
    data() {
      return {
        title: '试用期自评',
        flagImg: true,
        dataList:[],
        noInfo: true,
        isLoading: true,
      }
    },
    components: {
      headTitle,
      probationTime,
      noInfo,
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
          _mt: "wxEmpFlowProbation.getEmpFlowProbation",
          companyId: pubsource.companyId,
          userCode: 1,
          state: localStorage.getItem('bus_empStatus'),
          wxMobile: localStorage.getItem('wx_mobile'),
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
          console.error(res)
        })
      }
    }
  }
</script>

<style scoped lang="less" type="text/less">
  @import '../../css/public';
</style>
