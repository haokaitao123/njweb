<!--通知公告-->
<template>
  <div class="wrap">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <div class="readList">
      <div class="readListOne">
        <div v-html="msgContentList">{{msgContentList}}</div>
        <div><a>{{Attach}}</a></div>
      </div>
    </div>
  </div>
</template>
<script>
  import headTitle from '../../.././components/headTitle.vue'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: 'policyDetails',
    data() {
      return {
        flagImg:true,
        title:'政策具体描述',
        msgContentList:'',
        cmutKldAuth: '',
        Attach: '',
      }
    },
    created() {
      this.msgContentList = getUrlKey('cmutKldContent')
      this.cmutKldAuth = getUrlKey('cmutKldAuth')
      if(this.cmutKldAuth ==='0' || this.cmutKldAuth ===null){
        this.Attach = ''
      }else {
        this.Attach = this.cmutKldAuth
      }
//      alert(getUrlKey('cmutKldContent'))
    },
    methods:{
      goIndex() {
        this.$router.go(-1)
      }
    },
    components:{
      headTitle
    }
  }
</script>
<style lang="less" type="text/less" scoped>
  @import '../../css/common_inform';
</style>
