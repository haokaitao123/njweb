<template>
  <div class="cover">
    <div class="box box1">
      <row>
        <i-col class="meau-right" span="19" style="width:100%;">

          <div class="title">
            <div class="title-text">
              <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{this.chiDataTitle}}
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
  import mCalcChild from './editCalcChild'
  import mGrand from './calcGrand'


  export default {
    data() {
      return {
        active: 'mCalcChild',
        mCalcChild: false,
        mGrand: false,
        showChi: false,
        logType: '',
        chiDataTitle: '',
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
//        this.clearChildBase()
      },
      getOptionData() {
        if (localStorage.getItem('type') === 'check') {
          this.mCalcChild = true
          this.mGrand = false
          this.$refs.mCalcChild.getdata()
        } else if (localStorage.getItem('type') === 'detail') {
          this.mCalcChild = false
          this.mGrand = true
          this.$refs.mGrand.getdata(1)
        }
      },
      getOption(row, sicalcPeriodDis) {
        if (row === null) {
          this.chiDataTitle = sicalcPeriodDis
        } else {
          this.chiDataTitle = row.siccempCname + ' ' + sicalcPeriodDis + ' 社保明细'
        }
      },
      clearChildBase() {
        console.log('clearChildBase')
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
  .box1{
    height:500px;
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
