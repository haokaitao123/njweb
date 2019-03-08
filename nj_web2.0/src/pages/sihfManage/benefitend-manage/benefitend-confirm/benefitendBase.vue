<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              {{$t('lang_sihfPolicy.sihfBenefitend.baseTitle')}}
            </MenuItem>
            <MenuItem name="content" v-show="id">
              {{$t('lang_sihfPolicy.sihfBenefitend.subTitle')}}
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
            <mOption v-show="option" :logType="logType" ref="option" @getLastemployday="getLastemployday" :id="id" @update="update" @newdata="newdata"></mOption>
            <mContent v-show="content" :logType="logType" ref="content" :id="id"  :idname="idname"></mContent>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mOption from './editBenefitend'
  import mContent from './insuranceList'


  export default {
    data() {
      return {
        active: 'option',
        option: true,
        content: false,
        sibeLastemployday: '',
        id: NaN,
        idname: '',
        data: {
          _mt: 'sihfBenefitend.getById',
          funId: '1',
        },
      }
    },
    components: {
      mOption,
      mContent,
    },
    props: {
      logType: String,
      index: Number,
      params: Object,
    },
    mounted() {
    },
    methods: {
      handleReset() {
        this.clear()
        this.$refs.option.clear()
        this.$refs.content.clear()
        this.$emit('closeUp')
      },
      changeMenu() {
        this.active = 'content'
      },
      getOption(id, logType) {
        this.id = parseInt(id, 10)
        this.data.id = id
        this.data.logType = logType
        this.$refs.option.getdata(this.data)
      },
      getLastemployday(date) {
        this.sibeLastemployday = date
      },
      pageTo(name) {
        this.option = false
        this.content = false
        this.active = name
        this[name] = true
        if (name === 'content') {
          this.$refs.content.get(this.id, this.sibeLastemployday)
        } else {
          this.getOption(this.id, this.$t('button.upd'))
        }
      },
      clear() {
        this.option = true
        this.content = false
        this.id = NaN
        this.active = 'option'
        this.$refs.option.clear()
      },
      update(data) {
        this.$emit('update', data)
      },
      newdata(data) {
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
  @import "../../../../sass/updateAndAdd";
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


