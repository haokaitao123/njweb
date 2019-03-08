<!--一条为一行-->
<template>
  <div class="messageAll">
    <div class="message">
      <div class="messOne">
        <span>薪资开户银行</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="cuntryName9" @focus="openBank()"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>薪资银行账号</span>
        <span class="point">*</span>
        <span>
          <span>
          <mu-text-field placeholder="必填项" v-model="empFlowNewhire.empnhSalaccount"></mu-text-field>
        </span>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>薪资银行户名</span>
        <span class="point">*</span>
        <span>
           <span>
          <mu-text-field placeholder="必填项" v-model="empFlowNewhire.empnhSalaccname"></mu-text-field>
        </span>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>报销是否另卡发放</span>
        <span class="point1">*</span>
        <span class="messRadio">
          <mt-radio
            v-model="value"
            :options=this.options
            @change="orderRadio"
          >
          </mt-radio>
          <!--<mu-text-field v-model="empnhIsexpensecardName" @focus="empnhIsexpensecards()"></mu-text-field>-->
          <!--<mu-select v-model="empFlowNewhire.empnhIsexpensecard" full-width placeholder="必填项">-->
            <!--<mu-option v-for="option,index in YesOrNo" :key="option.id" :label="option.paramInfoCn" :value="option.paramCode"></mu-option>-->
          <!--</mu-select>-->
        </span>
      </div>
    </div>
    <div class="message" v-show="empFlowNewhire.empnhIsexpensecard == 1">
      <div class="messOne">
        <span>报销开户银行</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="cuntryName10" @focus="openBankNone()"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message" v-show="empFlowNewhire.empnhIsexpensecard == 1">
      <div class="messOne">
        <span>报销银行账号</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="empFlowNewhire.empnhExpenseaccount"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message" v-show="empFlowNewhire.empnhIsexpensecard == 1">
      <div class="messOne">
        <span>报销银行户名</span>
        <span class="point">*</span>
        <span>
          <span>
          <mu-text-field placeholder="必填项" v-model="empFlowNewhire.empnhExpenseaccname"></mu-text-field>
        </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin,getDataLevelNoneNew} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'
  import Bus from '../../lib/bus'
  export default {
    name: "bankCardMessage",
    data() {
      return {
        cuntryName9: '',
        cuntryName10: '',
        empnhIsexpensecardName: '',
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
        value:'0'
      }
    },
    props: {
      empFlowNewhire: Object,
      YesOrNo: Array
    },
    methods:{
      openBank(){
        let data = {
          _mt:'weixinEmpFlowNewhire.baseBankinfogetPage',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          companyId: pubsource.companyId
        }
        getDataLevelNoneNew(data).then((res)=>{
          Bus.$emit('getSelectValue',JSON.parse(res.data.content[0].value).rows,9,'bank')
        }).catch((err)=>{
          console.log(err)
        })
        Bus.$emit('show')
      },
      openBankNone(){
        let data = {
          _mt:'weixinEmpFlowNewhire.baseBankinfogetPage',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          companyId: pubsource.companyId
        	}
          getDataLevelNoneNew(data).then((res)=>{
          	console.log(res)
            Bus.$emit('getSelectValue',JSON.parse(res.data.content[0].value).rows,10,'bank')
          }).catch((err)=>{
            console.log(err)
          })
          Bus.$emit('show')
      },
      empnhIsexpensecards() {
        console.log(this.YesOrNo)
        Bus.$emit('getSelectValue',this.YesOrNo,18)
        Bus.$emit('show')
      },
      orderRadio(value) {
        if (value === '1') {
          this.empnhIsexpensecardName = '是'
          this.empFlowNewhire.empnhIsexpensecardsDis = '是'
        } else {
          this.empnhIsexpensecardName = '否'
          this.empFlowNewhire.empnhIsexpensecardsDis = '否'
        }
        this.empFlowNewhire.empnhIsexpensecard = value

      }
    },
    mounted(){

      Bus.$on('rtnValue9',(value1,value2)=>{
        this.cuntryName9 = value2
        this.empFlowNewhire.empnhSalbankDis = value2
        this.empFlowNewhire.empnhSalbank = value1
      })

      Bus.$on('rtnValue10',(value1,value2)=>{
        this.cuntryName10 = value2
        this.empFlowNewhire.empnhExpensebankDis = value2
        this.empFlowNewhire.empnhExpensebank = value1
      })
      Bus.$on('rtnValue18',(value1,value2)=>{
        this.empnhIsexpensecardName = value2
        this.empFlowNewhire.empnhIsexpensecard = value1
        this.empFlowNewhire.empnhIsexpensecardsDis = value2
      })
    },
    created(){
      this.cuntryName9 = this.empFlowNewhire.empnhSalbankDis
      this.cuntryName10 = this.empFlowNewhire.empnhExpensebankDis
      this.empnhIsexpensecardName = this.empFlowNewhire.empnhIsexpensecardsDis
      this.value = this.empFlowNewhire.empnhIsexpensecard
      this.empFlowNewhire.empnhIsexpensecardsDis = '是'
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
      padding: 20px 35px 20px 32px;
      align-items: center;
      position: relative;
      .messRadio{
        .mint-radiolist{
          display: flex;
          width:360px;
        }
      }
      .mu-input{
        width:4.3rem;
        font-size: 30px;
      }
      .point{
        position: absolute;
        top:40px;
        left:0;
        color: red;
      }
      .point1{
        position: absolute;
        top:25px;
        left:0;
        color: red;
      }
    }
  }
</style>
