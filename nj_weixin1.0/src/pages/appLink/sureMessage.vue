<!--一条为一行-->
<template>
  <div class="messageAll">
    <!--<div class="message">-->
      <!--<div class="messOne">-->
        <!--<span>在线确认内容</span>-->
        <!--<span>-->
          <!--<mu-text-field v-model="empFlowNewhire.empnhOnlinecfmdesc"></mu-text-field>-->
        <!--</span>-->
      <!--</div>-->
    <!--</div>-->
    <div class="message">
      <div class="messOne">
        <span>我已知晓并确认</span>
        <span>
          <mu-text-field v-model="empnhOnlineconfirmName" @focus="empnhOnlineconfirms()"></mu-text-field>
          <!--<mu-select v-model="empFlowNewhire.empnhOnlineconfirm" full-width>-->
            <!--<mu-option v-for="option,index in YesOrNo" :key="option.id" :label="option.paramInfoCn" :value="option.paramCode"></mu-option>-->
          <!--</mu-select>-->
        </span>
      </div>
    </div>
    <div class="message" v-show="empFlowNewhire.curStepstate !== 'p_flowst_3'">
      <div class="messOne messTwo">
        <span @click="saveData">保存</span>
        <span @click="submitData">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin, getDataLevelNoneNew} from '@/axios/axios'
  import {isSuccess, deepCopy} from '@/lib/util'
  import Message from 'muse-ui-message'
  import Bus from '../../lib/bus'
  import {pointMessage} from './pointMessage'
  import { Toast } from 'mint-ui';
  export default {
    name: "sureMessage",
    data() {
      return {
        empnhOnlineconfirm:''
      }
    },
    props: {
      empFlowNewhire: Object,
      YesOrNo: Array
    },
    methods:{
      saveData() {
        const t = this
        if (t.empFlowNewhire.empnhBirthdate) {
          t.empFlowNewhire.empnhBirthdate = new Date(t.empFlowNewhire.empnhBirthdate).format('yyyy-MM-dd')
        }
        if (t.empFlowNewhire.empnhTechdate) {
          t.empFlowNewhire.empnhTechdate = new Date(t.empFlowNewhire.empnhTechdate).format('yyyy-MM-dd')
        }
        if (t.empFlowNewhire.empnhGreencardsdate) {
          t.empFlowNewhire.empnhGreencardsdate = new Date(t.empFlowNewhire.empnhGreencardsdate).format('yyyy-MM-dd')
        }
        if (t.empFlowNewhire.empnhGreencardedate) {
          t.empFlowNewhire.empnhGreencardedate = new Date(t.empFlowNewhire.empnhGreencardedate).format('yyyy-MM-dd')
        }
        if (t.empFlowNewhire.empnhEdusdate) {
          t.empFlowNewhire.empnhEdusdate = new Date(t.empFlowNewhire.empnhEdusdate).format('yyyy-MM-dd')
        }
        if (t.empFlowNewhire.empnhEduedate) {
          t.empFlowNewhire.empnhEduedate = new Date(t.empFlowNewhire.empnhEduedate).format('yyyy-MM-dd')
        }

        const data = deepCopy(this.empFlowNewhire)
        data._mt = 'weixinEmpFlowNewhire.saveStep2'
        data.companyId = pubsource.companyId
        if(pointMessage(t.empFlowNewhire)) {
//          alert(123)
          getDataLevelNoneNew(data).then(res => {
            if (isSuccess(res, t)) {
              Toast({
                message: '保存成功',
                position: 'middle',
                duration: 2000
              });
            }
          }).catch((err) => {
            Toast({
              message: '网络错误',
              position: 'middle',
              duration: 2000
            });
          })
        } else {
          Toast({
            message: '必填项没有填完',
            position: 'middle',
            duration: 2000
          });
        }

      },
      // 提交方法
      submitData() {
        const t = this
//        const obj = deepCopy(this.empFlowNewhire)
        const data = deepCopy(this.empFlowNewhire)
        data._mt = 'weixinEmpFlowNewhire.submitStep2'
        data.companyId = pubsource.companyId
        if(pointMessage(t.empFlowNewhire)) {
          getDataLevelNoneNew(data).then(res => {
            if (isSuccess(res, t)) {
              Toast({
                message: '提交成功',
                position: 'middle',
                duration: 2000
              });
              window.location.reload()
            }
          }).catch((err) => {
            Toast({
              message: '网络错误',
              position: 'middle',
              duration: 2000
            });
          })
        }
      },
      empnhOnlineconfirms() {
        Bus.$emit('getSelectValue',this.YesOrNo,19)
        Bus.$emit('show')
      }
    },
    mounted() {
      Bus.$on('rtnValue19',(value1,value2)=>{
        this.empnhOnlineconfirmName = value2
        this.empFlowNewhire.empnhOnlineconfirm = value1
        this.empFlowNewhire.empnhOnlineconfirmDis = value2
      })
    },
    created() {
      this.empnhOnlineconfirmName = this.empFlowNewhire.empnhOnlineconfirmDis
    }

  }
</script>

<style scoped type="text/less" lang="less">
  .messageAll {
    height: 100%;
    overflow: scroll;
  }

  .message {
    /*border-bottom: 1px solid #E3E3E3;*/
    width: 100%;
    .messOne {
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 45px 35px 26px 32px;
      align-items: center;
      .mu-input{
        width:3.713333rem;
        font-size: 30px;
      }
    }
    .messTwo{
      display: flex;
      justify-content: space-around;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      align-items: center;
      span{
        flex: 1;
        text-align: center;
        height: 70px;
        line-height: 70px;
        font-size: 32px;
      }
      span:nth-of-type(1){
        border:2px solid #3399FF;
        border-radius: 10px;
        margin-right: 10px;
      }
      span:nth-of-type(2){
        background:#3399FF;
        border-radius: 10px;
        color: white;
      }
    }
  }
</style>
