<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-right" span="19" style="width: 100%">
          <div class="title">
            <div class="title-text">
              <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
              {{this.showTitle}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="close-round" size="16"></Icon>
            </Button>
          </div>
          <div style="margin-top: 40px;padding: 10px 10px 30px 10px;">
            <mOption v-show="option" :logType="logType" ref="option" @update="update" @newdata="newdata"></mOption>
            <mContent v-show="content" :logType="logType" :sicalcPeriodDis="sicalcPeriodDis" ref="content" ></mContent>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mOption from './editCalc'
  import mContent from './calcChild'


  export default {
    data() {
      return {
        active: 'option',
        option: true,
        content: false,
        showChi: false,
        sicalcPeriodDis: '', // 显示期间
        logType: '',
        showTitle: '', // 显示标题
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
        console.log(this.$store.state.calcJsBase.dataType)
        if (this.$store.state.calcJsBase.dataType === 'change') {
          this.option = true
          this.content = false
          this.$refs.option.getdata()
          this.showTitle = '查看'
        } else if (this.$store.state.calcJsBase.dataType === 'detail') {
          this.option = false
          this.content = true
          this.$refs.content.getdata(1)
          this.row = row
          this.showTitle = row.sicalcPeriodDis + ' ' + row.sicalcBfareaDis + ' ' + row.sicalcRoundDis + ' 社保明细'
          this.sicalcPeriodDis = row.sicalcPeriodDis
        }
      },
      getOption(logType) {
        let dataType = this.$store.state.calcJsBase.dataType
        if (dataType === 'add') {
          this.showTitle = '新增'
        }
        this.logType = logType
        this.$refs.option.getSelect()
      },
      clear() {
        this.$store.commit('calcJsBase/setDataType', '')
        this.option = true
        this.content = false
        this.active = 'option'
        this.showChi = false
        this.$refs.option.clear()
        this.showTitle = ''
        this.logType = ''
        this.sicalcPeriodDis = ''
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
