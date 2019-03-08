<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              {{$t('lang_sysform.sysForm.option')}}
            </MenuItem>
            <MenuItem name="content" v-show="$store.state.sysData.mainId">
              {{$t('lang_sysform.sysForm.content')}}
            </MenuItem>
            <MenuItem name="field" v-show="$store.state.sysData.mainId">
              {{$t('lang_sysform.sysForm.field')}}
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
            <mOption v-show="option" ref="option"></mOption>
            <mContent v-show="content" ref="content" ></mContent>
            <field v-show="field" ref="field"></field>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import mOption from './option'
  import mContent from './content'
  import field from './field'

  export default {
    data() {
      return {
        title: this.$t('lang_sysform.sysForm.option'),
        active: 'option',
        option: true,
        content: false,
        field: false,
      }
    },
    components: {
      mOption,
      mContent,
      field,
    },
    props: {
      logType: String,
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
        this.$refs.option.getdata()
      },
      reset() {
        this.option = true
        this.content = false
        this.field = false
        this.active = 'option'
        this.title = this.$t('lang_sysform.sysForm.option')
        this.$refs.option.clear()
        this.$refs.content.clear()
      },
      pageTo(name) {
        this.active = name
        this.option = false
        this.content = false
        this.field = false
        switch (name) {
          case 'option':
            this.title = this.$t('lang_sysform.sysForm.option')
            this.$refs.content.clear()
            break
          case 'content':
            this.title = this.$t('lang_sysform.sysForm.content')
            break
          case 'field':
            this.title = this.$t('lang_sysform.sysForm.field')
            this.$refs.content.clear()
            break
        }
        this[name] = true
        if (name !== 'option') {
          this.$refs[name].getdata(1)
        } else {
          this.$refs[name].getdata()
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
