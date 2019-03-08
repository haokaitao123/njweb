<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="updPlatDocTemp">
              {{$t('lang_platdoc.platDoc.title1')}}
            </MenuItem>
            <MenuItem name="docTempVar" v-show="$store.state.docTemp.mainId">
              {{$t('lang_platdoc.platDoc.title2')}}
            </MenuItem>
          </Menu>
        </i-col>
        <i-col class="meau-right" span="19">
          <div class="title">
            <div class="title-text">
              <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>{{title}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="close-round" size="16"></Icon>
            </Button>
          </div>
          <div style="margin-top: 40px;padding: 10px;">
            <updPlatDocTemp v-show="updPlatDocTemp" ref="updPlatDocTemp"></updPlatDocTemp>
            <docTempVar v-show="docTempVar" ref="docTempVar" ></docTempVar>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import updPlatDocTemp from './updPlatDocTemp'
  import docTempVar from './docTempVar'

  export default {
    data() {
      return {
        title: this.$t('lang_platdoc.platDoc.title1'),
        active: 'updPlatDocTemp',
        updPlatDocTemp: true,
        docTempVar: false,
      }
    },
    components: {
      updPlatDocTemp,
      docTempVar,
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
        this.$refs.updPlatDocTemp.getdata()
      },
      reset() {
        this.updPlatDocTemp = true
        this.docTempVar = false
        this.active = 'updPlatDocTemp'
        this.title = this.$t('lang_platdoc.platDoc.title1')
        this.$refs.updPlatDocTemp.clear()
      },
      pageTo(name) {
        this.active = name
        this.updPlatDocTemp = false
        this.docTempVar = false
        switch (name) {
          case 'updPlatDocTemp': this.title = this.$t('lang_platdoc.platDoc.title1')
            break
          case 'docTempVar': this.title = this.$t('lang_platdoc.platDoc.title2')
            break
        }
        this[name] = true
        this.$refs[name].getdata()
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
