<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="3">
          <Menu :active-name="active" width="auto"  @on-select="pageTo">
            <MenuItem name="baseInfo">
              {{$t('lang_approval.platapprovalbase.title1')}}
            </MenuItem>
            <MenuItem name="dataBlock" v-show="$store.state.platApproval.mainId">
              {{$t('lang_approval.platapprovalbase.title2')}}
            </MenuItem>
            <MenuItem name="mailList" v-show="$store.state.platApproval.mainId">
              {{$t('lang_approval.platapprovalbase.title3')}}
            </MenuItem>
            <MenuItem name="smsList" v-show="$store.state.platApproval.mainId">
              {{$t('lang_approval.platapprovalbase.title4')}}
            </MenuItem>
            <MenuItem name="wxList" v-show="$store.state.platApproval.mainId">
              {{$t('lang_approval.platapprovalbase.title5')}}
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
  import baseInfo from './editPlatApproval'     //  审批流程信息页面
  import dataBlock from './dataBlock'        //  流程表单定义页面
  import mailList from './mailList'             //  流程邮件信息页面
  import smsList from './smsList'            //  流程短信信息短信
  import wxList from './wxList'            //  流程微信信息短信

  export default {
    data() {
      return {
        title: this.$t('lang_approval.platapprovalbase.title1'),
        active: 'baseInfo',
        baseInfo: true,
        dataBlock: false,
        mailList: false,
        smsList: false,
        wxList: false,
      }
    },
    props: {
      logType: String,
    },
    components: {
      baseInfo,
      dataBlock,
      mailList,
      smsList,
      wxList,
    },
    methods: {
      handleReset() {
        this.reset()
        this.$emit('closeUp')
      },
      setMainId(id) {
        if (!id) {
          this.$refs.baseInfo.formValidate.aprvStatus = '02valid'
          return
        }
        this.$store.commit('platApproval/setMainId', id)
        this.$refs.baseInfo.getData()
      },
      reset() {
        this.baseInfo = true
        this.mailList = false
        this.smsList = false
        this.wxList = false
        this.dataBlock = false
        this.active = 'baseInfo'
        this.title = this.$t('lang_approval.platapprovalbase.title1'),
        this.$store.commit('platApproval/setMainId', '')
        this.$refs.baseInfo.clear()
      },
      pageTo(name) {
        this.active = name
        this.baseInfo = false
        this.dataBlock = false
        this.mailList = false
        this.smsList = false
        this.wxList = false
        switch (name) {
          case 'baseInfo': this.title = this.$t('lang_approval.platapprovalbase.title1')
            break
          case 'dataBlock': this.title = this.$t('lang_approval.platapprovalbase.title2')
            break
          case 'mailList': this.title = this.$t('lang_approval.platapprovalbase.title3')
            break
          case 'smsList': this.title = this.$t('lang_approval.platapprovalbase.title4')
            break
          case 'wxList': this.title = this.$t('lang_approval.platapprovalbase.title5')
            break
        }
        this[name] = true
        if (name === 'baseInfo') {
          this.$refs[name].getData()
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

