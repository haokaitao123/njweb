<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="4">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="updTeam">
              {{$t('lang_cmut.cmutTeam.title1')}}
            </MenuItem>
            <MenuItem name="teamMemberList" v-show="$store.state.orderTeam.mainId">
              {{$t('lang_cmut.cmutTeam.title2')}}
            </MenuItem>
          </Menu>
        </i-col>
        <i-col class="meau-right" span="20" style="width:  83.3333% !important">
          <div class="title">
            <div class="title-text">
              <Icon type="mouse" size="17" style="margin-right: 10px;"></Icon>
              &nbsp;{{title}}
            </div>
            <Button type="text" @click="handleReset">
              <Icon type="close-round" size="17"></Icon>
            </Button>
          </div>
          <div style="margin-top: 40px;padding: 10px;">
            <updTeam v-show="updTeam" ref="updTeam"></updTeam>
            <teamMemberList v-show="teamMemberList" ref="teamMemberList" ></teamMemberList>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import updTeam from './updTeam'
  import teamMemberList from './teamMemberList'

  export default {
    data() {
      return {
        title: this.$t('lang_cmut.cmutTeam.title1'),
        active: 'updTeam',
        updTeam: true,
        teamMemberList: false,
      }
    },
    components: {
      updTeam,
      teamMemberList,
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
        this.$refs.updTeam.getdata()
      },
      reset() {
        this.updTeam = true
        this.teamMemberList = false
        this.active = 'updTeam'
        this.title = this.$t('lang_cmut.cmutTeam.title1')
        this.$refs.updTeam.clear()
      },
      pageTo(name) {
        this.active = name
        this.updTeam = false
        this.teamMemberList = false
        switch (name) {
          case 'updTeam': this.title = this.$t('lang_cmut.cmutTeam.title1')
            break
          case 'teamMemberList': this.title = this.$t('lang_cmut.cmutTeam.title2')
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
