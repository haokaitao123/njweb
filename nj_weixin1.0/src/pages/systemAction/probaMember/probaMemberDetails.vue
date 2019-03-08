<template>
  <div class="wrap" style="overflow: hidden">
    <!--<headTitle :flag="flagImg" :title="title"></headTitle>-->
    <probaMemberResume :dataList="dataList"></probaMemberResume>
    <mu-container v-show="showContainer">
      <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll" center :full-width="true" class="tabs">
        <mu-tab style="flex: 1;font-size: 15px">试用期到期信息</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px">员工自评</mu-tab>
        <mu-tab style="flex: 1;font-size: 15px">经理评估</mu-tab>
      </mu-tabs>
    </mu-container>
    <div class="propdetail">
      <div class="demo-text" v-if="active === 0 && showDetails">
        <probaMemberBase :empFlowProbation="empFlowProbation"></probaMemberBase>
      </div>
      <div class="demo-text" v-if="active === 1">
        <probaEmpSelfEva :empFlowProbation="empFlowProbation"></probaEmpSelfEva>
      </div>
      <div class="demo-text" v-if="active === 2">
        <probaBuspmpEva :empFlowProbation="empFlowProbation" :file="file" ></probaBuspmpEva>
      </div>
    </div>
  </div>
</template>

<script>
  import probaMemberBase from './probaMemberBase.vue'
  import probaMemberResume from './probaMemberResume.vue'
  import probaEmpSelfEva from './probaEmpSelfEva.vue'
  import probaBuspmpEva from './probaBuspmpEva.vue'
  import headTitle from '../../.././components/headTitle.vue'
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: "fireMemberDetails",
    data() {
      return {
        title: '试用期评估',
        flagImg: true,
        active: 0,
        id: '',
        dataList: [],
        empFlowProbation: {},
        // 评估上传表信息
        file: {
          fileKey: '',
          fileName: '',
        },
        showDetails: false,
        showContainer: false,
      }
    },
    components:{
      headTitle,
      probaMemberBase,
      probaMemberResume,
      probaEmpSelfEva,
      probaBuspmpEva,
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
          _mt: "weixinProbaMember.getProbaMemberById",
          companyId: pubsource.companyId,
          id: this.id
        }
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            this.dataList.push(JSON.parse(res.data.content[0].value))
            this.empFlowProbation = this.dataList[0]
            if (this.empFlowProbation.empprobUpload01) {
                let fileArry = this.empFlowProbation.empprobUpload01.split(':');
                if (fileArry.length > 1) {
                  this.file.fileName = fileArry[0]
                  this.file.fileKey = fileArry[1]
                }
            }
            this.showDetails = true
            this.showContainer = true
          }
        }).catch((res) =>{
          console.error(res.data.stat.desc)
        })
      }
    }
  }
</script>

<style scoped type="text/less" lang="less">
  .wrap{
    height: 100%;
  }
  .propdetail{
    height: calc(100% - 7.0rem);
    overflow-y: scroll;
    overflow-x: hidden;

  }
  .demo-text{
    height: 100px;
  }
  .personalText{
    wdth:100%;
    padding: 40px  0 0 30px;
    background: white;
    font-size: 30px;
    margin-bottom: 20px;
    color: #666666;
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
