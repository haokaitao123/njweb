<!--护照信息-->
<template>
  <div>
    <!--<data value="" v-for="item in dataList">-->
      <div class="message">
        <div>
          <span>工作城市</span>
          <span>{{this.$store.state.goAbroad.empprobSelfeva.passCityDis}}</span>
        </div>
      </div>
      <div class="message1">
        <div>
          <span>是否已有护照</span>
          <span class="messRadio">
            <mt-radio
            v-model="value"
            :options=this.options
            @change="orderRadio"
          >
          </mt-radio>
          </span>
        </div>
      </div>
      <div class="message" v-if="this.value === '1'">
        <div>
          <span>护照签发领区</span>
          <span class="point">*</span>
          <span @click="citys">{{this.passAreaDis}} <img src="../../../../static/action/05.png" alt=""></span>
        </div>
      </div>
      <div class="message" v-if="this.value === '1'">
        <div>
          <span>护照号码</span>
          <span class="point">*</span>
          <span><input type="text" class="ipt" @blur="passNum()" v-model="passNumber"></span>
          <!--<span>{{empprobSelfeva.passNumber}}</span>-->
        </div>
      </div>
      <div class="message1">
        <div>
          <span>本次签证办理领区</span>
          <span @click="passNowarea">{{this.passNowareaDis}} <img src="../../../../static/action/05.png" alt=""></span>
        </div>
      </div>
      <div class="message2" v-if="this.$store.state.goAbroad.empprobSelfeva.thisStepstate !== 'undefined' && (this.$store.state.goAbroad.empprobSelfeva.thisStepstate === 'p_flowst_1' || this.$store.state.goAbroad.empprobSelfeva.thisStepstate === 'p_flowst_2')">
        <div @click="submit">
          提交
        </div>
      </div>
      <!--</data>-->
    </div>
</template>

<script>
  import {getDataLevelUserLoginNew,getDataLevelNone} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey,deepCopy} from '@/lib/util'
  import Bus from '../../../lib/bus'
  export default {
    name: "protectionMsg",
    props:{
      empprobSelfeva:Object,
    },
    data() {
      return{
        options:[
          {
            label: '是',
            value: '1'
          },
          {
            label: '否',
            value: '0'
          }
        ],
        value: this.$store.state.goAbroad.empprobSelfeva.passHaspass,
        passAreaDis: this.$store.state.goAbroad.empprobSelfeva.passAreaDis,
        passNowareaDis:this.$store.state.goAbroad.empprobSelfeva.passNowareaDis,
        passNumber: this.$store.state.goAbroad.empprobSelfeva.passNumber
      }
    },
    methods:{
      citys(){
        const data = {
          _mt:'weixinEmpFlowNewhire.getSelectValue',
          companyId: '1000',
          typeCode:'visaarea'
        }
        getDataLevelNone(data).then((res)=>{
          Bus.$emit('getSelectValue',JSON.parse(res.data.content[0].value)[0].paramList,20)
        }).catch((err)=>{
          console.log(err)
        })
        this.$store.commit('goAbroad/setcityFlag',true)
      },
      passNowarea() {
        this.$store.commit('goAbroad/setareaContryDis',true)
      },
      orderRadio(value) {

      },
      submit() {
        if (this.value === '1') {
          this.$store.state.goAbroad.empprobSelfeva.passHaspass = '1'
          if(this.$store.state.goAbroad.empprobSelfeva.passArea == '' && this.passNumber == '') {
            layer.msg("请把必填项补充完整");
            return
          }
          if(this.passNumber == '') {
            layer.msg("请把必填项补充完整");
            return
          }
        } else {
          this.$store.state.goAbroad.empprobSelfeva.passHaspass = '0'
        }
        const data = deepCopy(this.$store.state.goAbroad.empprobSelfeva)
        data._mt = 'wxVisaPassport.submitStep'
        data.companyId = '1000'
        data.userId = localStorage.getItem('bus_userid')
        data.thisStep = '1'
        delete data.passCityDis
        delete data.passAreaDis
        delete data.passNowareaDis
        delete data.passCityDis
        if (this.value === '0') {
          data.passArea = ''
          data.passNumber = ''
        }
        console.log(data)
        getDataLevelUserLoginNew(data).then((res)=>{
          console.log(res.data.content[0].value)
          if (res.data.content[0].value === '1') {
            this.$router.push({
              path:'/goAbroadSureList'
            })
          }
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
      },
      passNum() {
        this.$store.state.goAbroad.empprobSelfeva.passNumber = this.passNumber
      }
    },
    mounted() {
      Bus.$on('rtnValue20', (value1, value2) => {
        this.$store.state.goAbroad.empprobSelfeva.passAreaDis = value2
        this.$store.state.goAbroad.empprobSelfeva.passArea = value1
        this.passAreaDis = value2
      })
      Bus.$on('removeShow', () => {
        this.$store.commit('goAbroad/setcityFlag',false)
      })
      Bus.$on('close1', (id,name) => {
        this.$store.state.goAbroad.empprobSelfeva.passNowarea = id
        this.$store.state.goAbroad.empprobSelfeva.passNowareaDis = name
        this.passNowareaDis = name
      })
    }
  }
</script>

<style scoped type="text/less" lang="less">
  @import '../../css/appLink';
  .messRadio{
    .mint-radiolist{
      display: flex;
      width:360px;
    }
  }
  .message{
    border-bottom: 3px solid #E3E3E3;
    width: 100%;
    position: relative;
    .point{
      position: absolute;
      top:50px;
      left:0;
      color: red;
    }
    div{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      padding: 45px 35px  26px 32px;
      span:nth-of-type(3){
        display: flex;
        align-items: center;
        img{
          width:20px;
          height:30px;
          margin-left: 10px;
        }
        .ipt{
          border:0;
          outline: none;
          width:170px;
        }
      }
    }
  }
  .message1{
    border-bottom: 3px solid #E3E3E3;
    width: 100%;
    padding: 45px 35px  26px 32px;
    div{
      display: flex;
      justify-content: space-between;
      background: #FFFFFF;
      font-size: 30px;
      color: #666666;
      span:nth-of-type(2){
        display: flex;
        align-items: center;
        img{
          width:20px;
          height:30px;
          margin-left: 10px;
        }
        .ipt{
          border:0;
          outline: none;
          width:170px;
        }
      }
    }
  }
</style>
