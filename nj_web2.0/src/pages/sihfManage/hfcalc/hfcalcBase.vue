<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-right" span="19" style="width: 100%;">
          <div class="title">
            <div class="title-text">
              <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{this.dataTatle}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="close-round" size="16"></Icon>
            </Button>
          </div>
          <div style="margin-top: 40px;padding: 10px 10px 30px 10px;">
            <mOption v-show="option" :logType="logType" ref="option" @update="update" @newdata="newdata"></mOption>
            <mContent v-show="content" :logType="logType"  :sihfcalcPeriodDis="sihfcalcPeriodDis" ref="content" ></mContent>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mOption from './edithfCalc'
  import mContent from './hfcalcChild'


  export default {
    data() {
      return {
        active: 'option',
        option: true,
        content: false,
        showChi: false,
        logType: this.$t('button.ser'),
        dataTatle: '',
        sihfcalcPeriodDis: '',
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
      getOptionData(row) {
        let ti = this.$store.state.hfcalcJsBase.dataType
        console.log(ti)
        if (ti === 'sel') {
          this.option = true
          this.content = false
          this.$refs.option.getdata()
        } else if (ti === 'detail') {
          this.dataTatle = row.sihfcalcPeriodDis + ' ' + row.sihfcalcBfareaDis + ' ' + row.sihfcalcRoundDis + ' 公积金明细'
          this.sihfcalcPeriodDis = row.sihfcalcPeriodDis
          this.option = false
          this.content = true
          this.$refs.content.getdata(1)
        }
      },
      getOption(logType) {
        let ti = this.$store.state.hfcalcJsBase.dataType
        if (ti === 'add') {
          this.dataTatle = '新增'
        } else if (ti === 'sel') {
          this.dataTatle = '查看'
        }
        this.logType = logType
        this.$refs.option.getSelect()
      },
      clear() {
        this.option = true
        this.content = false
        this.active = 'option'
        this.dataTatle = ''
        this.logType = ''
        this.sihfcalcPeriodDis = ''
        this.showChi = false
        this.$refs.option.clear()
        localStorage.removeItem('types')
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
  @import "../../../sass/updateAndAdd.scss";
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
    /*border-left: 2px solid #efefef;*/
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
