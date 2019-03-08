<!--一条为一行-->
<template>
  <div class="messageAll">
    <div class="message">
      <div class="messOne">
        <span>出生日期</span>
        <span>
          <mu-text-field v-model="empnhBirthdate" @focus="empnhBirthdates(1)"></mu-text-field>
            <!--<mu-date-input v-model="empFlowNewhire.empnhBirthdate"  label-float full-width no-display></mu-date-input>-->
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>民族</span>
        <span>
          <mu-text-field v-model="empnhNationName" @focus="NationTypes()"></mu-text-field>
          <!--<mu-select v-model="empFlowNewhire.empnhNation" full-width>-->
            <!--<mu-option  v-for="option,index in NationType" :key="option.id" :label="option.paramInfoCn"  :value="option.paramCode"></mu-option>-->
          <!--</mu-select>-->
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>政治面貌</span>
        <span>
          <mu-text-field v-model="empnhPoliticalName" @focus="Politicals()"></mu-text-field>
          <!--<mu-select v-model="empFlowNewhire.empnhPolitical" full-width>-->
            <!--<mu-option v-for="option,index in Political" :key="option.id" :label="option.paramInfoCn" :value="option.paramCode"></mu-option>-->
          <!--</mu-select>-->
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>职称</span>
        <span>
          <mu-text-field v-model="empnhTechnicaltitleName" @focus="Techlevels()"></mu-text-field>
          <!--<mu-select v-model="empFlowNewhire.empnhTechnicaltitle" full-width>-->
            <!--<mu-option v-for="option,index in Techlevel" :key="option.id" :label="option.paramInfoCn" :value="option.paramCode"></mu-option>-->
          <!--</mu-select>-->
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>职称专业</span>
        <span>
          <mu-text-field v-model="empFlowNewhire.empnhTechspec"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>职称取得时间</span>
        <span>
          <mu-text-field v-model="empnhTechdate" @focus="empnhTechdates(4)"></mu-text-field>
          <!--<mu-date-input v-model="empFlowNewhire.empnhTechdate"  label-float full-width no-display></mu-date-input>-->
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>是否有绿卡</span>
        <span class="messRadio">
          <mt-radio
            v-model="value"
            :options=this.options
            @change="orderRadio"
          >
          </mt-radio>
          <!--<mu-text-field v-model="empnhIsgreenName" @focus="empnhIsgreens()"></mu-text-field>-->
          <!--<mu-select v-model="empFlowNewhire.empnhIsgreen" full-width>-->
            <!--<mu-option v-for="option,index in YesOrNo" :key="option.id" :label="option.paramInfoCn" :value="option.paramCode"></mu-option>-->
          <!--</mu-select>-->
        </span>
      </div>
    </div>
    <div class="message" v-show="empFlowNewhire.empnhIsgreen == '1'">
      <div class="messOne">
        <span>绿卡国籍</span>
        <span>
          <!--empnhGreencardcuntry-->
            <mu-text-field v-model="cuntryName"  ref="Input" @focus="nationality()"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message" v-show="empFlowNewhire.empnhIsgreen == 1">
      <div class="messOne">
        <span>绿卡生效时间</span>
        <span>
          <mu-text-field v-model="empnhGreencardsdate" @focus="empnhGreencardsdates(2)"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message" v-show="empFlowNewhire.empnhIsgreen == 1">
      <div class="messOne">
        <span>绿卡失效时间</span>
        <span>
          <mu-text-field v-model="empnhGreencardedate" @focus="empnhGreencardedates(3)"></mu-text-field>
        </span>
      </div>
    </div>
    <mt-datetime-picker
    type="date"
    ref="picker"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日"
    @confirm="handleConfirm"
    :startDate="startDate"
  >
  </mt-datetime-picker>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin, getDataLevelNoneNew} from '@/axios/axios'
  import {isSuccess} from '@/lib/util'
  import { DatetimePicker } from 'mint-ui'
  import moment from 'moment'// 格式化时间
  import Bus from '../../lib/bus'
  export default {
    name: "memberBase",
    data() {
      return {
        cuntryName: '',
        empnhNationName:'',
        empnhPoliticalName:'',
        empnhTechnicaltitleName:'',
        empnhIsgreenName:'',
        empnhBirthdate: this.empFlowNewhire.empnhBirthdate,
        empnhGreencardsdate: this.empFlowNewhire.empnhGreencardsdate,
        empnhGreencardedate: this.empFlowNewhire.empnhGreencardedate,
        empnhTechdate: this.empFlowNewhire.empnhTechdate,
        startDate: new Date('1960-01-01'),
        typeNum: '',
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
    props:{
      empFlowNewhire:Object,
      Political:Array,
      NationType:Array,
      Techlevel:Array,
      YesOrNo:Array,
    },
    components:{

    },
    methods:{
      nationality(){
        let data = {
          _mt:'weixinEmpFlowNewhire.baseCountrygetPage',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          companyId: pubsource.companyId
        }
        getDataLevelNoneNew(data).then((res)=>{
          Bus.$emit('getSelectValue',JSON.parse(res.data.content[0].value).rows,1)
        }).catch((err)=>{
          console.log(err)
        })
         Bus.$emit('show')
      },
      NationTypes() {
        Bus.$emit('getSelectValue',this.NationType,11)
        Bus.$emit('show')
      },
      Politicals() {
        Bus.$emit('getSelectValue',this.Political,12)
        Bus.$emit('show')
      },
      Techlevels() {
        Bus.$emit('getSelectValue',this.Techlevel,13)
        Bus.$emit('show')
      },
      empnhIsgreens() {
        Bus.$emit('getSelectValue',this.YesOrNo,17)
        Bus.$emit('show')
      },
      orderRadio(value) {
        if (value === '1') {
          this.empnhIsgreenName = '是'
          this.empFlowNewhire.empnhIsgreenDis = '是'
        } else {
          this.empnhIsgreenName = '否'
          this.empFlowNewhire.empnhIsgreenDis = '否'
        }
        this.empFlowNewhire.empnhIsgreen = value

      },
      empnhBirthdates(num) {
        this.typeNum = num
        this.$refs.picker.open();
      },
      empnhTechdates(num) {
        this.typeNum = num
        this.$refs.picker.open();
      },
      empnhGreencardsdates(num) {
        this.typeNum = num
        this.$refs.picker.open();
      },
      empnhGreencardedates(num) {
        this.typeNum = num
        this.$refs.picker.open();
      },
      handleConfirm (data) {
        let date = moment(data).format('YYYY-MM-DD')
        if (this.typeNum == 1) {
          this.empFlowNewhire.empnhBirthdate = date
          this.empnhBirthdate = date
        }
        if (this.typeNum == 2) {
          this.empFlowNewhire.empnhGreencardsdate = date
          this.empnhGreencardsdate = date
        }
        if (this.typeNum == 3) {
          this.empFlowNewhire.empnhGreencardedate = date
          this.empnhGreencardedate = date
        }
        if (this.typeNum == 4) {
          this.empFlowNewhire.empnhTechdate = date
          this.empnhTechdate = date
        }
        console.log(this.empFlowNewhire.empnhBirthdate)
        console.log(this.empnhBirthdate)
      },
    },
    mounted(){
      Bus.$on('rtnValue',(value1,value2)=>{
        this.cuntryName = value2
        this.empFlowNewhire.empnhGreencardcuntry = value1
        this.empFlowNewhire.empnhGreencardcuntryDis = value2
      })
      Bus.$on('rtnValue11',(value1,value2)=>{
        this.empnhNationName = value2
        this.empFlowNewhire.empnhNation = value1
        this.empFlowNewhire.empnhNationDis = value2
      })
      Bus.$on('rtnValue12',(value1,value2)=>{
        this.empnhPoliticalName = value2
        this.empFlowNewhire.empnhPolitical = value1
        this.empFlowNewhire.empnhPoliticalDis = value2
      })
      Bus.$on('rtnValue13',(value1,value2)=>{
        this.empnhTechnicaltitleName = value2
        this.empFlowNewhire.empnhTechnicaltitle = value1
        this.empFlowNewhire.empnhTechnicaltitleDis = value2
      })
      Bus.$on('rtnValue17',(value1,value2)=>{
        this.empnhIsgreenName = value2
        this.empFlowNewhire.empnhIsgreen = value1
        this.empFlowNewhire.empnhIsgreenDis = value2
      })
    },
    created(){
      this.cuntryName = this.empFlowNewhire.empnhGreencardcuntryDis
      this.empnhNationName = this.empFlowNewhire.empnhNationDis
      this.empnhPoliticalName = this.empFlowNewhire.empnhPoliticalDis
      this.empnhTechnicaltitleName = this.empFlowNewhire.empnhTechnicaltitleDis
      this.empnhIsgreenName = this.empFlowNewhire.empnhIsgreenDis
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
    }
  }
</style>
