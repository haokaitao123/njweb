<!--负责任务-->
<template>
  <div class="setPassword">
    <!--<header-title :title="title" :flag="flag"></header-title>-->
    <div class="set">
      <div class="setAll">
        <div class="logo"></div>
        <div class="test">
          密&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp码 :
          <!--:type="{visibility : 'password' ? 'text'}"-->
          <mu-text-field v-model="value1" @blur="Input1()"   placeholder="" type="password"></mu-text-field><br/>
        </div>
        <div class="test">
          新&nbsp&nbsp密&nbsp&nbsp码 :
          <mu-text-field v-model="value2" @blur="Input2()"   placeholder="" type="password"></mu-text-field><br/>
        </div>
        <div class="test">
          确认密码 :
          <mu-text-field v-model="value3"  @blur="Input3()" placeholder="" type="password"></mu-text-field><br/>
        </div>
        <div class="submit" @click="submit">
          提交
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headerTitle from '../../../components/headTitle.vue';
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile} from '@/axios/axios'
  import {isSuccess, strIsnull, getUrlKey} from '@/lib/util'
  import { Toast } from 'mint-ui';
  export default {

    name: 'setPassword',
    data() {
      return {
        title: '设置薪资密码',
        flag:true,
        value1:'',
        value2:'',
        value3:'',
//        visibility: false, // 新密码的显示隐藏
        type:'',  //根据类型判断是 1新增还是 2修改
      }
    },
    created(){
//      this.getData()
      this.type = parseInt(getUrlKey('type'))
    },
    components:{
      headerTitle
    },
    methods:{
      getData(){
        const t = this;
        let data = {
          _mt:'wxSalaryPwd.getUserPwd',
          companyId:pubsource.companyId,
//          wxUserId:localStorage.getItem('wx_userId'),
          wxUserId:'1000',
          userId:localStorage.getItem('bus_userid'),
          busEmpid:localStorage.getItem('bus_empid'),
          md5pwd:'',
          oldPwd:''
        }
        getDataLevelUserLogin(data).then(res =>{
            if (isSuccess(res,t)){
//              console.log(res.data.content[0].value)
              this.type = res.data.content[0].value
//              alert(this.type)
              if(res.data.content[0].value === 1) {  /// == 1 新增
                  this.visibility = false
              } else if(res.data.content[0].value === 2) {  /// == 2 修改
                this.visibility = true
              }
            }
        }).catch(err =>{
          console.log(err)
        })
      },
      submitPassword(type,value){
        const t = this;
        let Type = type
        let Value = value
        let data = {
          _mt:'wxSalaryPwd.addOrUpd',
          companyId:pubsource.companyId,
//          wxUserId:localStorage.getItem('wx_userId'),
          wxUserId:'1000',
          userId:localStorage.getItem('bus_userid'),
          busEmpid:localStorage.getItem('bus_empid'),
          md5pwd: md5(Value),
          type:Type
        }
        getDataLevelUserLogin(data).then(res =>{
          if (isSuccess(res,t)){
            if(this.type === 1){
               if (res.data.content[0].value !== ''){
                 layer.msg("密码设置成功!");
                 this.$router.push({
                   path:'/mains/mainMine'
                 })
               }
            }
            if(this.type === 2){
              if (res.data.content[0].value !== ''){
                layer.msg("密码修改成功!");
                this.$router.push({
                  path:'/mains/mainMine'
                })
              }
            }
          }
        }).catch(err =>{
          console.log(err)
        })
      },
      Input1(){
        let regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/
        if(this.type === 1){
          if(!this.value1 === ''){
            if(!regx.test(this.value1)){
              layer.msg("密码必须包含数字和字母,并且大于6位!");
            }
          }
        }
        if(this.type === 2){
          ////判断原密码是否有误
          if (this.value1 !== ''){
            const t = this;
            let data = {
              _mt:'wxSalaryPwd.getUserPwd',
              companyId:pubsource.companyId,
//          wxUserId:localStorage.getItem('wx_userId'),
              wxUserId:'1000',
              userId:localStorage.getItem('bus_userid'),
              busEmpid:localStorage.getItem('bus_empid'),
              md5pwd:'',
              oldPwd:md5(this.value1)
            }
            getDataLevelUserLogin(data).then(res =>{
              if (isSuccess(res,t)){
                console.log(res.data.content[0].value)
                if (res.data.content[0].value == 1) {
                  layer.msg("输入原始密码错误");
                }
              }
            }).catch(err =>{
              console.log(err)
            })
          }
        }
      },
      Input2(){

        if (this.type === 2) {
          let regx = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/
            if( this.value2 !== ''){
              if(!regx.test(this.value2)){
                layer.msg("密码必须包含数字和字母,并且大于6位");
              }
            }
        }
      },
      Input3(){
        //新增
        if(this.type === 1){
          if (this.value1 !== this.value3){
            layer.msg("密码确认错误");
          }
        } else if (this.type === 2){  //修改
          if (this.value1 === this.value2 === this.value3){
            layer.msg("不能输入和原始密码相同");
          }
          if (this.value2 !== this.value3){
            layer.msg("密码确认错误");
          }
        }

      },
      submit(){
        if (this.type === 1){
          if (this.value1 === '' && this.value3 === ''){
            layer.msg("密码不能为空");
          } else {
            if(this.value1 !== this.value3){
              layer.msg("密码确认错误");
            } else {
              this.submitPassword(1,this.value3)
            }
          }

        }
        if(this.type === 2){
          if (this.value1 === this.value2 === this.value3 && this.value2 !== this.value3){
            layer.msg("设置密码不正确");
          } else {
            this.submitPassword(2,this.value3)
          }
        }
      }
    }
  }
</script>
<style scoped lang="less" type="text/less">
.setPassword{
  width:100%;
  height:100%;
  .mu-input{
    width:4.413333rem !important;
    .mu-input-content{
      border-bottom: 1px solid #6666 !important;
    }
  }

  .set{
    background-image: url("../../../../static/main/bg.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width:100%;
    height: calc(100% - 180px);
    padding: 146px 30px 0 30px;
    .setAll{
      .logo{
        background-image: url("../../../../static/main/logo.png");
        width:306px;
        height:74px;
        background-size: 100% 100%;
        margin: 0 auto;
        margin-bottom: 128px;
      }
    }
    .test{
      padding-left: 130px;
      box-sizing: border-box;
      font-size: 30px;
      color: #6666;
      margin-bottom: 20px;
    }
    .submit{
      width:100%;
      height:90px;
      text-align: center;
      line-height: 90px;
      font-size: 36px;
      background-color: #3399FF;
      color: white;
      border-radius: 10px;
      margin-top: 150px;
    }
  }
}
</style>
