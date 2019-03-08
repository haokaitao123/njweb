<!--app-->
<template>
  <div class="appLink">
    <headeTitle :title="headTitle" :flag="flagImg"></headeTitle>
    <div class="EmployeeInformation">
      <ul>
        <li class="Li">
          员工工号：{{empFlowNewhire.empnhWorkno}}
          <!--<span class="dateTime">待提交</span>-->
          <span v-show="empFlowNewhire.curStepstate === 'p_flowst_3'" class="dateTime1">已提交</span>
          <span v-show="empFlowNewhire.curStepstate !== 'p_flowst_3'" class="dateTime2">待提交</span>
        </li>
        <li>
          员工姓名：{{empFlowNewhire.empnhCname}}
        </li>
      </ul>
    </div>
    <mu-container center style="">
      <mu-tabs :value.sync="active" color="#FD9DBD" :inverse='true' style="display: flex;overflow-x: scroll"  class="tabs">
        <mu-tab style="font-size: 15px">雇佣信息</mu-tab>
        <mu-tab style="font-size: 15px">个人信息</mu-tab>
        <mu-tab style="font-size: 15px">联系地址信息</mu-tab>
        <mu-tab style="font-size: 15px">最高学历</mu-tab>
        <mu-tab style="font-size: 15px">银行卡信息</mu-tab>
        <mu-tab style="font-size: 15px">资料上传</mu-tab>
        <!--<mu-tab style="font-size: 15px">在线确认</mu-tab>-->
      </mu-tabs>
    </mu-container>
    <div class="teamDetail">
      <div class="demo-text" v-if="active === 0">
        <employMessage :empFlowNewhire="empFlowNewhire" :Gender="Gender" :Idtype="Idtype" ></employMessage>
      </div>
      <div class="demo-text" v-if="active === 1">
        <Info :empFlowNewhire="empFlowNewhire" :NationType="NationType" :Political="Political" :Techlevel="Techlevel" :YesOrNo="YesOrNo"></Info>
      </div>
      <div class="demo-text" v-if="active === 2">
        <addressMessage :empFlowNewhire="empFlowNewhire" :Registerproperty="Registerproperty" :RelationShip="RelationShip"></addressMessage>
      </div>
      <div class="demo-text" v-if="active === 3">
        <educationMessage :empFlowNewhire="empFlowNewhire" :Education="Education"></educationMessage>
      </div>
      <div class="demo-text" v-if="active === 4">
        <bankCardMessage :empFlowNewhire="empFlowNewhire" :YesOrNo="YesOrNo"></bankCardMessage>
      </div>
      <div class="demo-text" v-if="active === 5">
        <uploadMessage :empFlowNewhire="empFlowNewhire" :Files="Files" :YesOrNo="YesOrNo"></uploadMessage>
      </div>
      <!--<div class="demo-text" v-if="active === 6">-->
        <!--<sureMessage :empFlowNewhire="empFlowNewhire" :YesOrNo="YesOrNo"></sureMessage>-->
      <!--</div>-->
    </div>
    <MaskIng v-show="flag" @close="closeMask"></MaskIng>
  </div>
</template>
<script>
  import headeTitle from '../../components/headTitle.vue'
  import employMessage from './employMessage.vue'
  import Info from './InformMation.vue'
  import addressMessage from './addressMessage.vue'
  import bankCardMessage from './bankCardMessage.vue'
  import educationMessage from './educationMessage.vue'
  import sureMessage from './sureMessage.vue'
  import uploadMessage from './uploadMessage.vue'
  import MaskIng from './maskIng/masking.vue'
  import Bus from '../../lib/bus'
  import {getDataLevelNone, getDataLevelNoneNew} from '../.././axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  export default {
    name: 'appLink',
    data() {
      return {
        headTitle:'入职材料提交',
        flagImg:false,
        active:0,
        flag:false,
        /**
         * 下拉列表
         * 页面显示： item.paramInfoCn
         * 保存值： item.paramCode
         */
        SelectList: [],
        NationType: [], // 民族
        Political: [],  // 政治面貌
        Techlevel: [],  // 职称级别
        YesOrNo: [],    // 是否
        RelationShip: [], // 联系人关系
        Registerproperty: [], //户籍性质
        Education: [],  // 学历
        Gender: [], // 性别
        Idtype: [], // 证件类型
        empFlowNewhire:{},
        Files: [ // 用于文件上传，显示
          {fileKey: '',fileName: ''},
          {fileKey: '',fileName: ''},
          {fileKey: '',fileName: ''},
          {fileKey: '',fileName: ''},
          {fileKey: '',fileName: ''},
          {fileKey: '',fileName: ''},
          {fileKey: '',fileName: ''},
        ],
        idno:''
      }
    },
    components:{
      headeTitle,
      employMessage,
      Info,
      MaskIng,
      addressMessage,
      bankCardMessage,
      educationMessage,
      sureMessage,
      uploadMessage
    },
    created(){
    },
    methods:{
      closeMask() {
        this.flag = false
      },
      init() {
        this.getDatatoKen()
        this.getSelectValue()
        this.idno = getUrlKey('idno');
      },
      getDatatoKen(){
        const t = this
        const data = {
          _mt:'userMgmt.getTempToken',
        }
        getDataLevelNone(data).then(res => {
          if (isSuccess(res, t)) {
            let rtndata = res.data.content[0].value;
            let storage = window.localStorage;
            storage.setItem("token", rtndata);
          }

        }).catch((err) => {
          console.log(err)
        })
      },
      getSelectValue(){
        const t = this

        const data = {
          _mt:'weixinEmpFlowNewhire.getSelectValue',
          companyId: '1000',
          typeCode:'nationtype,political,techlevel,yesno,relationship,registerproperty,education,gender,idtype'
        }
        getDataLevelNone(data).then(res => {
          if (isSuccess(res, t)) {
            t.selectList = JSON.parse(res.data.content[0].value)
            t.NationType = t.selectList[0].paramList
            t.Political = t.selectList[1].paramList
            t.Techlevel = t.selectList[2].paramList
            t.YesOrNo = t.selectList[3].paramList
            t.RelationShip = t.selectList[4].paramList
            t.Registerproperty = t.selectList[5].paramList
            t.Education = t.selectList[6].paramList
            t.Gender = t.selectList[7].paramList
            t.Idtype = t.selectList[8].paramList
            t.getData()
          }

        }).catch((err) => {
          console.log(err)
        })
      },
      getData() {
        const t = this
        let params = {
          _mt: "weixinEmpFlowNewhire.getEmpFlowNewhire",
          companyId: '1000',
          busEmpGid: this.idno,
        }
        getDataLevelNone(params).then((res) => {
//          alert(33)
          if (isSuccess(res, t)) {
            this.empFlowNewhire = JSON.parse(res.data.content[0].value)
            console.log(this.empFlowNewhire)
            this.getFiles()
          }
        }).catch((res) =>{
          console.error(res.data.stat.desc)
        })
      },
      /**
       * 获取上传材料的文件key 和 value
       */
      getFiles() {
        const t = this
          for (let i = 1; i < 8; i++) {
            let valueName = 'empnhUpload0' + i
            if (this.empFlowNewhire[valueName]) {
                this.Files[i - 1].fileName = this.empFlowNewhire[valueName].split(':')[0]
                this.Files[i - 1].fileKey = this.empFlowNewhire[valueName].split(':')[1]
            }
          }
      }
    },
    mounted(){
      this.init()
      Bus.$on('show',()=>{
        this.flag = true
      })
      Bus.$on('removeShow',()=>{
        this.flag = false
      })
    }
  }
</script>
<style scoped lang="less" type="text/less">
  @import '../css/common_inform';
.appLink{
  width:100%;
  height:100%;
  position: relative;

  .EmployeeInformation {
    width: 100%;
    background: white;
    position: relative;
    margin-bottom: 20px;
    box-sizing: border-box;
    overflow: scroll;
    ul{
      padding: 40px 54px 0px 30px;
      border-bottom: 20px solid #F2F2F2;
    }
    ul > li {
      list-style: none;
      font-size: 28px;
      color: #666666;
      margin-bottom: 20px;
    }
    .Li{
      position: relative;
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
    /*.dateTime{*/
      /*position: absolute;*/
      /*top:0;*/
      /*right:0;*/
      /*color: #84DC76;*/
    /*}*/
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
  .teamDetail{
    height: calc(100% - 354px);
    overflow: scroll;
  }
}
</style>
