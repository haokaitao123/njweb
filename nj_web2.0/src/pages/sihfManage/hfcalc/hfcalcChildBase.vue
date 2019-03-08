<template>
  <div class="cover">
    <div class="box">
      <row>
        <!--<i-col class="meau-left" span="5">-->
          <!--<Menu :active-name="active" width="auto" @on-select="pageTo">-->
            <!--<MenuItem name="mCalcChild">-->
              <!--{{$t('lang_sihfCalc.sihfHfcalc.emptitle')}}-->
            <!--</MenuItem>-->
            <!--&lt;!&ndash;<MenuItem name="content" v-show="$store.state.platRole.mainId">&ndash;&gt;-->
            <!--<MenuItem name="mGrand" v-show="showChi">-->
              <!--{{$t('lang_sihfCalc.sihfHfcalc.institle')}}-->
            <!--</MenuItem>-->
          <!--</Menu>-->
        <!--</i-col>-->
        <i-col class="meau-right" span="19" style="width: 100%">
          <div class="title">
            <div class="title-text">
              <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{logType}}
            </div>
            <Button type="text" @click="handleRese">
              <Icon type="close-round" size="16"></Icon>
            </Button>
          </div>
          <div style="margin-top: 40px;padding: 10px;">
            <mCalcChild v-show="mCalcChild" :logType="logType" ref="mCalcChild" @update="update" @newdata="newdata"></mCalcChild>
            <mGrand v-show="mGrand" :logType="logType" ref="mGrand" ></mGrand>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mCalcChild from './edithfCalcChild'
  import mGrand from './hfcalcGrand'


  export default {
    data() {
      return {
        active: 'mCalcChild',
        mCalcChild: false,
        mGrand: false,
        showChi: false,
        logType: this.$t('button.ser'),
      }
    },
    components: {
      mCalcChild,
      mGrand,
    },
    props: {
      index: Number,
      params: Object,
    },
    mounted() {

    },
    methods: {
      handleRese() {
        this.$emit('hideMsg')
        this.clearChildBase()
      },
      getOptionData(row) {
        let ti = this.$store.state.hfcalcJsBase.dataType
        if (ti === 'check') {
          this.mCalcChild = true
          this.mGrand = false
          this.$refs.mCalcChild.getdata()
        } else if (ti === 'detail') {
          this.mCalcChild = false
          this.mGrand = true
          this.$refs.mGrand.getdata()
        }
      },
      getOption(sihfcalcPeriodDis) {
        if (sihfcalcPeriodDis !== '') {
          this.logType = sihfcalcPeriodDis + ' 公积金明细'
        } else {
          this.logType = '查看'
        }
      },
      clearChildBase() {
        this.mCalcChild = true
        this.active = 'mCalcChild'
        this.mGrand = false
        this.showChi = false
      },
      update(data) {
        this.showChi = true
        this.$emit('update', data)
      },
      newdata(data) {
        this.showChi = true
        this.$emit('getData', data)
      },
      hideMsg() {
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
