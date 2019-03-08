<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="3">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="baseInfo">
              {{$t('lang_flow.step.baseInfo')}}
            </MenuItem>
            <MenuItem name="dataBlock" v-show="$store.state.flowStepData.flstepDisorder">
              {{$t('lang_flow.step.dataBlock')}}
            </MenuItem>
            <MenuItem name="genDocument" v-show="$store.state.flowStepData.flstepDisorder">
              {{$t('lang_flow.step.genDocument')}}
            </MenuItem>
            <MenuItem name="mailList" v-show="$store.state.flowStepData.flstepDisorder">
              {{$t('lang_flow.step.mailList')}}
            </MenuItem>
            <MenuItem name="smsList" v-show="$store.state.flowStepData.flstepDisorder">
              {{$t('lang_flow.step.smsList')}}
            </MenuItem>
            <MenuItem name="wxList" v-show="$store.state.flowStepData.flstepDisorder">
              {{$t('lang_flow.step.wxList')}}
            </MenuItem>
          </Menu>
        </i-col>
        <i-col class="meau-right" span="21">
          <div class="title">
            <div class="title-text">
              <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>{{title}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="close-round" size="16"></Icon>
            </Button>
          </div>
          <div style="margin-top: 40px;padding: 10px;">
            <baseInfo v-show="baseInfo" ref="baseInfo"></baseInfo>
            <dataBlock v-show="dataBlock" ref="dataBlock" ></dataBlock>
            <genDocument v-show="genDocument" ref="genDocument" ></genDocument>
            <mailList v-show="mailList" ref="mailList"></mailList>
            <smsList v-show="smsList" ref="smsList"></smsList>
            <wxList v-show="wxList" ref="wxList"></wxList>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import baseInfo from './baseInfo'          //  步骤信息页面
  import dataBlock from './dataBlock'        //  步骤表单定义页面
  import genDocument from './genDocument'    //  步骤生成文件页面
  import mailList from './mailList'          //  步骤邮件页面
  import smsList from './smsList'            //  步骤短信
  import wxList from './wxList'            //  步骤微信

  export default {
    data() {
      return {
        title: this.$t('lang_flow.step.baseInfo'),
        active: 'baseInfo',
        baseInfo: true,
        dataBlock: false,
        genDocument: false,
        mailList: false,
        smsList: false,
        wxList: false,
      }
    },
    components: {
      baseInfo,
      dataBlock,
      genDocument,
      mailList,
      smsList,
      wxList,
    },
    methods: {
      handleReset() {
        this.reset()
        this.$emit('closeUp')
      },
      /*
       * Option修改时初始数据
       * */
      getOptionData() {
        this.$refs.baseInfo.getdata()
      },
      setMainId(id) {
        this.$store.commit('flowStepData/setMainId', id)
        this.$refs.baseInfo.getdata()
      },
      reset() {
        this.baseInfo = true
        this.dataBlock = false
        this.genDocument = false
        this.mailList = false
        this.smsList = false
        this.wxList = false
        this.active = 'baseInfo'
        this.title = this.$t('lang_flow.step.baseInfo')
        this.$store.commit('flowStepData/setflstepDisorder', '')
        this.$refs.baseInfo.clear()
      },
      pageTo(name) {
        this.active = name
        this.baseInfo = false
        this.dataBlock = false
        this.genDocument = false
        this.mailList = false
        this.smsList = false
        this.wxList = false
        switch (name) {
          case 'baseInfo': this.title = this.$t('lang_flow.step.baseInfo')
            break
          case 'dataBlock': this.title = this.$t('lang_flow.step.dataBlock')
            break
          case 'genDocument': this.title = this.$t('lang_flow.step.genDocument')
            break
          case 'mailList': this.title = this.$t('lang_flow.step.mailList')
            break
          case 'smsList': this.title = this.$t('lang_flow.step.smsList')
            break
          case 'wxList': this.title = this.$t('lang_flow.step.wxList')
            break
        }
        this[name] = true
        if (name === 'baseInfo') {
          this.$refs[name].getdata()
        } else {
          this.$refs[name].getdata(1)
        }
      },
    },
  }
</script>
<style>
  .ivu-menu-vertical.ivu-menu-light:after{
    background-color: transparent;
  }
</style>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .header-box{
    display: flex;
    position: relative;
    justify-content: flex-end;
  }
  .cover .box{
    width: 1100px;
    padding: 0;
  }
  .cover .box .form{
    margin-top: 60px;
  }
  .meau-left{
    margin-top: 30px;
  }
  .meau-right{
    position: relative;
    border-left: 2px solid #efefef;
  }
  .header-cover{
    display: none;
    top: 0;
    right: 0;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 150px;
    height: 150px;
    background-color: rgba(0,0,0,.3);
  }
  .header-box:hover .header-cover{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-box:hover {
    cursor: pointer;
  }
  .header{
    height: 150px;
    width: 150px;
    border-radius: 50%;
    overflow: hidden;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
