<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <MenuItem name="option">
              	{{$t('lang_evaluation.evaluation.diagnosticManage')}}
            </MenuItem>
            <MenuItem name="content" v-show = "logType != $t('button.add')">
              	{{$t('lang_evaluation.evaluation.evaluationAct')}}
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
            <addOrUpdate v-show="option" :logType="logType" @newdata="newdata" @updata="updata" ref="addOrUpdate"></addOrUpdate>
            <childTable v-show="content" :logType="logType" ref="childTable"></childTable>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import addOrUpdate from './editEvaluationAct'
  import childTable from './childTable'


  export default {
    data() {
      return {
        active: 'option',
        option: true,
        content: false,
        id: '',
      }
    },
    components: {
      addOrUpdate,
      childTable,
    },
    props: {
      logType: String,
    },
    methods: {
      handleReset() {
        this.clear()
        this.closeUpd();
      },
      getOptionData(id){
      	this.id = id;
      	if(id){
      		this.$refs.addOrUpdate.getData(id);
      	}else{
      		this.$refs.addOrUpdate.getData("");
      	}
      },
      pageTo(name) {
        this.option = false
        this.content = false
        this.active = name
        this[name] = true
        if (name === 'content') {
          this.$refs.childTable.getData(this.id)
        }
        if (name === 'option') {
          this.$refs.addOrUpdate.getData(this.id)
        }
      },
      closeUpd(){
      	this.$emit('closeUpd')
      },
      clear() {
        this.option = true;
        this.content = false;
        this.id = "";
        this.active = 'option';
        this.$refs.addOrUpdate.clear();
      },
      updata(data) {
        this.$emit('updateArray');
				this.handleReset();
      },
      newdata(data) {
        this.$emit('addNewArray', data);
				this.handleReset();
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
