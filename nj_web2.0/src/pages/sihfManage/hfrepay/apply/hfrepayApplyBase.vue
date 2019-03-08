<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              {{$t('lang_hfrepay.sihfHfrepay.title')}}
            </MenuItem>
            <!--<MenuItem name="content" v-show="$store.state.platRole.mainId">-->
            <MenuItem name="content" v-show="showChi">
              {{$t('lang_hfrepay.sihfHfrepayInsurance.title')}}
            </MenuItem>
          </Menu>
        </i-col>
        <i-col class="meau-right" span="19">
          <div class="title">
            <div class="title-text">
              <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>{{logType}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="close-round" size="16"></Icon>
            </Button>
          </div>
          <div style="margin-top: 40px;padding: 10px;">
            <mOption v-show="option" :logType="logType" ref="option" @getid="getid" :id="id" @update="update" @newdata="newdata"></mOption>
            <mContent v-show="content" :logType="logType" ref="content" :id="id" :idname="idname"></mContent>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mOption from './editHfrepayApply'
  import mContent from './hfrepayApplyChild'


  export default {
    data() {
      return {
        active: 'option',
        option: true,
        content: false,
        showChi: false,
        id: NaN,
        logType: "查询",
        idname: '',
        data: {
          _mt: 'sihfRepay.getById',
        },
      }
    },
    components: {
      mOption,
      mContent,
    },
    props: {
      index: Number,
      params: Object,
    },
    mounted() {

    },
    methods: {
      handleReset() {
        this.clear()
        this.$emit('closeUp')
      },
      changeMenu() {
        this.active = 'content'
      },
      getOptionData() {
        this.$refs.option.getdata()
        this.showChi = true
      },
      getOption(logType) {
        this.$refs.option.getSelect()
        this.data.id = this.$store.state.repayHfrepay.mainId
        this.logType = logType
      },
      getid(id, name) {
        this.id = parseInt(id, 10)
        this.idname = name
      },
      pageTo(name) {
        this.option = false
        this.content = false
        this.active = name
        this[name] = true
        if (name === 'content') {
          this.$refs.content.getdata()
        }
      },
      clear() {
        this.option = true
        this.content = false
        this.id = NaN
        this.active = 'option'
        this.showChi = false
        this.$refs.option.clear()
      },
      update(data) {
        this.showChi = true
        this.$emit('update', data)
      },
      newdata(data) {
        this.showChi = true
        this.$emit('getData', data)
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
  @import "../../../../sass/updateAndAdd.scss";
  .header-box{
    display: flex;
    position: relative;
    justify-content: flex-end;
  }
  .cover .box{
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
