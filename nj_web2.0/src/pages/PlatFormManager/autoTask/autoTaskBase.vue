<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              {{$t('lang_platform.autoTask.autoTask')}}
            </MenuItem>
            <MenuItem name="content" v-show="id">
              {{$t('lang_platform.autoTask.autoTaskInfo')}}
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
            <fOption v-show="option" :logType="logType" ref="fOption" :id="id" @getid="getid" @update="update" @newdata="newdata"></fOption>
            <sContent v-show="content" :logType="logType" ref="sContent" :id="id" ></sContent>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
	import fOption from './fOption'
	import sContent from './sContent'

  export default {
    data() {
      return {
        active: 'option',
        option: true,
        content: false,
        id: NaN,
        data: {
          _mt: 'platAutotask.getById',
          funId: '1',
        },
      }
    },
    components: {
    	fOption,
    	sContent,
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
    		const t = this
    		t.$refs.fOption.clear()
    		t.clear()
    		t.$emit('closeUp')
    	},
    	pageTo(name) {
    		this.option = false
	        this.content = false
	        this.active = name
	        this[name] = true
	        if (name === 'content') {
	          this.$refs.sContent.get(this.id)
	        }
    	},
    	getid(id) {
    		const t = this
    		t.id = id
    	},
      getOption(id, logType) {
        this.id = parseInt(id, 10)
        this.data.id = id
        this.data.logType = logType
        this.$refs.fOption.getdata(this.data)
      },
    	clear() {
        this.option = true
        this.content = false
        this.id = NaN
        this.active = 'option'
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
