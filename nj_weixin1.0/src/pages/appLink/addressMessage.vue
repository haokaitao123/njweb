<!--一条为一行-->
<template>
  <div class="messageAll">
    <div class="message">
      <div class="messOne">
        <span>QQ</span>
        <span>
            <mu-text-field v-model="empFlowNewhire.empnhQq"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>微信</span>
        <span>
          <mu-text-field v-model="empFlowNewhire.empnhWechat"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>紧急联系人</span>
        <span class="point">*</span>
        <span>
          <mu-text-field v-model="empFlowNewhire.empnhEmergcontact" placeholder="必填项"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>紧急联系人关系</span>
        <span class="point">*</span>
        <span>
          <mu-text-field v-model="empnhEmcrelation" @focus="empnhEmcrelations()" placeholder="必填项"></mu-text-field>
          <!--<mu-select v-model="empFlowNewhire.empnhEmcrelation" full-width placeholder="必填项">-->
            <!--<mu-option  v-for="option,index in RelationShip" :key="option.id" :label="option.paramInfoCn" :value="option.paramCode"></mu-option>-->
          <!--</mu-select>-->
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>紧急联系电话</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" @blur="Phone()"  v-model="empFlowNewhire.empnhEmcphone"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>居住国家</span>
        <span class="point">*</span>
        <span>
          <!--empFlowNewhire.empnhResidecuntry-->
          <mu-text-field placeholder="必填项" v-model="cuntryName2" @focus="country()"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>居住省份</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="cuntryName3" @focus="province()"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>居住城市</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="cuntryName4" @focus="citys()"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>居住详细地址</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="empFlowNewhire.empnhResideaddr"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>居住地邮编</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="empFlowNewhire.empnhResidezip"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>户口性质</span>
        <span class="point">*</span>
        <span>
          <mu-text-field v-model="empnhRegisterproperty" @focus="empnhRegisterpropertys()" placeholder="必填项"></mu-text-field>
          <!--<mu-select v-model="empFlowNewhire.empnhRegisterproperty" full-width placeholder="必填项">-->
            <!--<mu-option v-for="option,index in Registerproperty" :key="option.id" :label="option.paramInfoCn" :value="option.paramCode"></mu-option>-->
          <!--</mu-select>-->
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>户籍国籍</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="cuntryName5" @focus="countryNone()"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>户籍省份</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="cuntryName6" @focus="provinceNone()"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>户籍城市</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="cuntryName7" @focus="citysNone()"></mu-text-field>
        </span>
      </div>
    </div><div class="message">
    <div class="messOne">
      <span>户籍详细地址</span>
      <span class="point">*</span>
      <span>
          <mu-text-field placeholder="必填项" v-model="empFlowNewhire.empnhRegisteaddr"></mu-text-field>
      </span>
    </div>
  </div>

  </div>
</template>

<script>
  import {isSuccess} from '@/lib/util'
  import {getDataLevelNone, getDataLevelUserLogin, getDataLevelNoneNew} from '@/axios/axios'
  import Bus from '../../lib/bus'
  import valid from '@/lib/pub_valid'
  import { Toast } from 'mint-ui';
  export default {
    name: "addressMessage",
    data() {
      return {
//        value3: undefined,
        cuntryName2: '',
        cuntryName3: '',
        cuntryName4: '',
        cuntryName5: '',
        cuntryName6: '',
        cuntryName7: '',
        empnhEmcrelation: '',
        empnhRegisterproperty: '',
      }
    },
    props:{
      Registerproperty:Array,
      RelationShip:Array,
      empFlowNewhire:Object
    },
    components:{

    },
    methods:{
      country(){
        let data = {
          _mt:'weixinEmpFlowNewhire.baseCountrygetPage',
          rows: 14,
          page: 1,
          sort: 'id',
          order: 'asc',
          companyId: pubsource.companyId
        }
        getDataLevelNoneNew(data).then((res)=>{
          console.log(JSON.parse(res.data.content[0].value).rows)
          Bus.$emit('getSelectValue',JSON.parse(res.data.content[0].value).rows,2)
        }).catch((err)=>{
          console.log(err)
        })
        Bus.$emit('show')
      },
      province(){
        let data = {
          _mt:'weixinEmpFlowNewhire.baseCitygetPage',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          companyId: pubsource.companyId,
          cityType: '01prov',
          cityIsvalid: '1',
//          data: '{"cityType":"01prov","cityIsvalid":"1"}',

        }
        getDataLevelNoneNew(data).then((res)=>{
          Bus.$emit('getSelectValue',JSON.parse(res.data.content[0].value).rows,3,'01prov')
        }).catch((err)=>{
          console.log(err)
        })
        Bus.$emit('show')
      },
      citys(){
//        02city
        let data = {
          _mt:'weixinEmpFlowNewhire.baseCitygetPage',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          companyId: pubsource.companyId,
          cityType: '02city',
          cityIsvalid: '1',
//          data: '{"cityType":"02city","cityIsvalid":"1"}',
        }
        getDataLevelNoneNew(data).then((res)=>{
          Bus.$emit('getSelectValue',JSON.parse(res.data.content[0].value).rows,4, '02city')
        }).catch((err)=>{
          console.log(err)
        })
        Bus.$emit('show')
      },
      countryNone(){
        let data = {
          _mt:'weixinEmpFlowNewhire.baseCountrygetPage',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          companyId: pubsource.companyId
        }
        getDataLevelNoneNew(data).then((res)=>{
          Bus.$emit('getSelectValue',JSON.parse(res.data.content[0].value).rows,5)
        }).catch((err)=>{
          console.log(err)
        })
        Bus.$emit('show')
      },
      provinceNone(){
        let data = {
          _mt:'weixinEmpFlowNewhire.baseCitygetPage',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          companyId: pubsource.companyId,
          cityType: '01prov',
          cityIsvalid: '1',
//          data: '{"cityType":"01prov","cityIsvalid":"1"}',
        }
        getDataLevelNoneNew(data).then((res)=>{
          Bus.$emit('getSelectValue',JSON.parse(res.data.content[0].value).rows,6,'01prov')
        }).catch((err)=>{
          console.log(err)
        })
        Bus.$emit('show')
      },
      citysNone(){
        Bus.$emit('getSelectValue',1,7,'02city');
        Bus.$emit('show')
      },
      Phone() {

        if(valid.val_mobile(this.empFlowNewhire.empnhEmcphone)) {
          return
        } else {
          Toast({
            message: '手机号输入错误',
            position: 'middle',
            duration: 500
          });
        }
      },
      empnhEmcrelations() {
        Bus.$emit('getSelectValue',this.RelationShip,14)
        Bus.$emit('show')
      },
      empnhRegisterpropertys() {
        Bus.$emit('getSelectValue',this.Registerproperty,15)
        Bus.$emit('show')
      }
    },
    mounted(){

      Bus.$on('rtnValue2',(value1,value2)=>{
        this.cuntryName2 = value2
        this.empFlowNewhire.empnhResidecuntryDis = value2
        this.empFlowNewhire.empnhResidecuntry = value1
      })

      Bus.$on('rtnValue3',(value1,value2)=>{
        this.cuntryName3 = value2
        this.empFlowNewhire.empnhResideprovince = value1
        this.empFlowNewhire.empnhResideprovinceDis = value2
      })

      Bus.$on('rtnValue4',(value1,value2)=>{
        this.cuntryName4 = value2
        this.empFlowNewhire.empnhResidecity = value1
        this.empFlowNewhire.empnhResidecityDis = value2
      })

      Bus.$on('rtnValue5',(value1,value2)=>{
        this.cuntryName5 = value2
        this.empFlowNewhire.empnhRegistercuntry = value1
        this.empFlowNewhire.empnhRegistercuntryDis = value2
      })

      Bus.$on('rtnValue6',(value1,value2)=>{
        this.cuntryName6 = value2
        this.empFlowNewhire.empnhRegisterprovince = value1
        this.empFlowNewhire.empnhRegisterprovinceDis = value2
      })

      Bus.$on('rtnValue7',(value1,value2)=>{
        this.cuntryName7 = value2
        this.empFlowNewhire.empnhRegistercityDis = value2
        this.empFlowNewhire.empnhRegistercity = value1
      })
      Bus.$on('rtnValue14',(value1,value2)=>{
        this.empnhEmcrelation = value2
        this.empFlowNewhire.empnhEmcrelationDis = value2
        this.empFlowNewhire.empnhEmcrelation = value1
      })
      Bus.$on('rtnValue15',(value1,value2)=>{
        this.empnhRegisterproperty = value2
        this.empFlowNewhire.empnhRegisterpropertyDis = value2
        this.empFlowNewhire.empnhRegisterproperty = value1
      })

    },
    created(){
      this.cuntryName2 = this.empFlowNewhire.empnhResidecuntryDis
      this.cuntryName3 = this.empFlowNewhire.empnhResideprovinceDis
      this.cuntryName4 = this.empFlowNewhire.empnhResidecityDis
      this.cuntryName5 = this.empFlowNewhire.empnhRegistercuntryDis
      this.cuntryName6 = this.empFlowNewhire.empnhRegisterprovinceDis
      this.cuntryName7 = this.empFlowNewhire.empnhRegistercityDis
      this.empnhEmcrelation = this.empFlowNewhire.empnhEmcrelationDis
      this.empnhRegisterproperty = this.empFlowNewhire.empnhRegisterpropertyDis
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
      .mu-input{
        width:4.3rem;
        font-size: 28px;
      }
      .point{
        position: absolute;
        top:40px;
        left:0;
        color: red;
      }
    }
  }
</style>
