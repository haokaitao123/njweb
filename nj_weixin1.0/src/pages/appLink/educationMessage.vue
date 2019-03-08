<!--一条为一行-->
<template>
  <div class="messageAll">
    <div class="message">
      <div class="messOne">
        <span>最高教育程度</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="empnhEducationlevelName"  @focus="empnhEducationlevels()"></mu-text-field>
          <!--<mu-select v-model="empFlowNewhire.empnhEducationlevel" full-width placeholder="必填项">-->
            <!--<mu-option v-for="option,index in Education" :key="option.id" :label="option.paramInfoCn" :value="option.paramCode"></mu-option>-->
          <!--</mu-select>-->
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>最高教育国家</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="cuntryName8"  @focus="Educountry()"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>最高教育学校</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="empFlowNewhire.empnhSchool"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>最高教育学位</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="empFlowNewhire.empnhDegree"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>最高教育专业</span>
        <span class="point">*</span>
        <span>
          <mu-text-field placeholder="必填项" v-model="empFlowNewhire.empnhSpecialty"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>最高教育开始时间</span>
        <span class="point">*</span>
        <span>
        <mu-text-field v-model="empnhEdusdate" placeholder="必填项" @focus="empnhEdusdates(1)"></mu-text-field>
        </span>
      </div>
    </div>
    <div class="message">
      <div class="messOne">
        <span>最高教育结束时间</span>
        <span class="point">*</span>
        <span>
        <mu-text-field v-model="empnhEduedate" placeholder="必填项" @focus="empnhEduedates(2)"></mu-text-field>
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
  import Bus from '../../lib/bus'
  import { DatetimePicker } from 'mint-ui'
  import moment from 'moment'// 格式化时间
  export default {
    name: "educationMessage",
    data() {
      return {
        cuntryName8: '',
        empnhEducationlevelName: '',
        typeNum: '',
        empnhEdusdate: this.empFlowNewhire.empnhEdusdate,
        empnhEduedate: this.empFlowNewhire.empnhEduedate,
        startDate: new Date('1960-01-01'),
      }
    },
    props:{
      Education:Array,
      empFlowNewhire:Object
    },
    methods:{
      Educountry(){
        let data = {
          _mt:'weixinEmpFlowNewhire.baseCountrygetPage',
          rows: 10,
          page: 1,
          sort: 'id',
          order: 'asc',
          companyId: pubsource.companyId
        }
        getDataLevelNoneNew(data).then((res)=>{
          Bus.$emit('getSelectValue',JSON.parse(res.data.content[0].value).rows,8)
        }).catch((err)=>{
          console.log(err)
        })
        Bus.$emit('show')
      },
      empnhEducationlevels() {
        Bus.$emit('getSelectValue',this.Education,16)
        Bus.$emit('show')
      },
      empnhEdusdates(num) {
        this.typeNum = num
        this.$refs.picker.open();
      },
      empnhEduedates(num) {
        this.typeNum = num
        this.$refs.picker.open();
      },
      handleConfirm (data) {
        let date = moment(data).format('YYYY-MM-DD')
        if (this.typeNum == 1) {
          this.empFlowNewhire.empnhEdusdate = date
          this.empnhEdusdate = date
        }
        if (this.typeNum == 2) {
          this.empFlowNewhire.empnhEduedate = date
          this.empnhEduedate = date
        }
      },
    },
    mounted(){
      Bus.$on('rtnValue8',(value1,value2)=>{
        this.cuntryName8 = value2
        this.empFlowNewhire.empnhEducuntryDis = value2
        this.empFlowNewhire.empnhEducuntry = value1
      })
      Bus.$on('rtnValue16',(value1,value2)=>{
        this.empnhEducationlevelName = value2
        this.empFlowNewhire.empnhEducationlevelDis = value2
        this.empFlowNewhire.empnhEducationlevel = value1
      })
    },
    created(){
      this.cuntryName8 = this.empFlowNewhire.empnhEducuntryDis
      this.empnhEducationlevelName = this.empFlowNewhire.empnhEducationlevelDis
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
        font-size: 30px;
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
