
<template>
  <div class="EmployeeInformation">
    <ul >
      <li class="approSet">
        我的审批设置
      </li>
      <li>
        设置同一业务审批中多个步骤参与时的方式
      </li>
      <li>
            <mt-radio
              v-model="value"
              :options=this.options
              @change="selectOption"
            >
          </mt-radio>
      </li>
      <li class="dateColor" @click="subMit">
        保存
      </li>
    </ul>
  </div>
</template>

<script>
  import {getDataLevelNone, getDataLevelUserLogin} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  import {getDataLevelUserLoginNew} from "../../../../axios/axios";
  import { Toast } from 'mint-ui';
    export default {
        name: "probationTime",
        data() {
          return {
            options:[],
            value: '',
            showId: false,
            Id:'',
            platApvsetVal:''
          }
        },
      methods:{
        selectOption(value) {
          this.platApvsetVal = value
        },
        subMit() {
          const t = this
          const data = {
            _mt:'wxPlatPersonalset.addOrUpd',
            companyId: pubsource.companyId,
            logType: '新增或修改',
            platApvset:this.platApvsetVal,
            platEmpid:localStorage.getItem('bus_empid'),
            funId:'0',
          }
          if (this.showId) {
            data.id = this.Id.id
          }
          getDataLevelUserLoginNew(data).then(res => {
            if (isSuccess(res, t)) {
              this.value = JSON.parse(res.data.content[0].value).platApvset
              Toast({
                message: '设置成功',
                position: 'middle',
                duration: 2000
              });
              this.$router.push({
                path:'/mains/mainMine'
              })
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
            typeCode:'personalapvset'
          }
          getDataLevelNone(data).then(res => {
            if (isSuccess(res, t)) {
              let data = JSON.parse(res.data.content[0].value)[0].paramList
              for (let i = 0; i < data.length; i++) {
                let obj = {}
                obj['value'] = data[i].paramCode
                obj['label'] = data[i].paramInfoName
                this.options.push(obj)
              }
              console.log(this.options)
              this.getData()
            }
          }).catch((err) => {
            console.log(err)
          })
        },
        getData() {
          const t = this
          const data = {
            _mt: 'wxPlatPersonalset.getByEmpId',
            logType: '获取详细信息',
            funId: '0',
            id: localStorage.getItem('bus_empid'),
          }
          getDataLevelUserLogin(data).then((res) => {
            if (isSuccess(res, t)) {
              this.Id = JSON.parse(res.data.content[0].value)
//              console.log(typeof this.Id)
              if (this.Id === null) {
                this.showId = false
                this.value = '01stepbystep'
              } else {
                this.showId = true
                this.value = this.Id.platApvset
              }
              console.log()
            }
          }).catch((err) =>{
            console.log(err)
          })
        },
      },
      mounted() {
          this.getSelectValue()
      }
    }
</script>

<style scoped type="text/less" lang="less">
  .EmployeeInformation {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 40px 54px 48px 30px;
    background: white;
    position: relative;
    ul > li {
      list-style: none;
      font-size: 30px;
      color: #666666;
      margin-bottom: 20px;
    }
    .approSet{
      font-size: 32px;
      font-weight: bold;
    }
    .dateColor {
      position: absolute;
      margin-bottom: 0;
      left: 60px;
      bottom: 20px;
      width:600px;
      height:90px;
      background:#3399FF ;
      text-align: center;
      border-radius: 10px;
      font-size: 34px;
      color: white;
      line-height: 90px;
    }
    .state1 {
      position: absolute;
      top: 50px;
      right: 30px;
      color: #F44336;
      font-size: 28px;
    }
    .state2 {
      position: absolute;
      top: 50px;
      right: 30px;
      color: #4cb050;
      font-size: 28px;
    }
  }
</style>
