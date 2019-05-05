<template>
  <div class="cover">
    <div class="box">
      <row>
        <i-col class="meau-left" span="5">
          <Menu :active-name="active" width="auto" @on-select="pageTo">
            <!--主子表左侧页面布局-->
            <MenuItem name="depoMoption">
              押金信息管理
            </MenuItem>
            <MenuItem name="depoContent" >
              押金明细管理
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
            <!--主表详细信息页面 visaare为特殊参数一般不传 其余无需变更-->
            <depoMoption v-show="depoMoption" :logType="logType" ref="depoMoption" :id="id" @update="update" @newdata="newdata"></depoMoption>
            <!--子表分页页面 mainid为主表id-->
            <depoContent v-show="depoContent" :logType="logType" ref="depoContent" :mainId="id"></depoContent>
          </div>
        </i-col>
      </row>
    </div>
  </div>
</template>
<script>
  import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin,
  } from "../../../axios/axios";
  import depoMoption from './addNewDepManage.vue'
  import depoContent from './depoManageDetail.vue'
  import { isSuccess, deepCopy, getUrlKey, GetQueryString } from "../../../lib/util";

  export default {
    data() {
      return {
//        默认参数 无需变更
        active: 'depoMoption',
        depoMoption: true,
        depoContent: false,
        id: NaN,
        disabled: false,
//        主表查询单条数据的mt
      }
    },
    components: {
      depoMoption,
      depoContent,
    },
    props: {
//      父页面传递参数  visaare一般不传
      logType: String,
      index: Number,
      params: Object,
    },
    mounted() {
    },
    methods: {
//      关闭方法 分别调用本页面 父页面 主表详细信息页面 子表分页的清除方法  无需变更
      handleReset() {
        this.$emit('closeUp')
        this.clear()
      },
//      默认方法
      changeMenu() {
        this.active = 'depoContent'
      },
      // 主表信息查询方法 无需变更
      getOption(id, logType) {
        this.id = parseInt(id, 10)
        this.$refs.depoMoption.getData(this.id)
        this.$refs.depoMoption.disabled = true
      },
//       根据name分别调用 主表或子表的查询方法 无需变更
      pageTo(name) {
        if(isNaN(this.id) || this.id == ''){
          this.$Message.warning('请先保存主表数据');
          return;
        }
        this.depoMoption = false
        this.depoContent = false
        this.active = name
        this.$refs.depoMoption.clear()
        this.$refs.depoContent.clear()
        this[name] = true
        if (name !== 'depoMoption') {
          this.$refs.depoContent.disabled = this.disabled
          this.$refs.depoContent.id = this.id
          this.$refs.depoContent.getData(1)
          this.$refs.depoContent.logType = this.logType
        } else {
          this.getOption(this.id, '修改')
        }
      },
//      清空方法 初始化本页面参数 无需变更
      clear() {
        this.depoMoption = true
        this.depoContent = false
        this.id = NaN
        this.active = 'depoMoption'
        this.$refs.depoMoption.clear()
        this.$refs.depoContent.clear()
      },
      baseclear() {
        this.depoMoption = true
        this.depoContent = false
        this.id = NaN
        this.active = 'depoMoption'
        this.$refs.depoMoption.formValidate.empId = '';
        this.$refs.depoMoption.empName = '';
        this.$refs.depoMoption.formValidate.deptId = '';
        this.$refs.depoMoption.deptIdName = '';
        this.$refs.depoMoption.formValidate.postId = '';
        this.$refs.depoMoption.postName = '';
        this.$refs.depoMoption.formValidate.empnhIdno = '';
        this.$refs.depoMoption.formValidate.moneyNum = '';
      },
//      更新父页面列表 无需变更
      update(data) {
        this.$emit('update', data)
      },
//      更新父页面列表 无需变更
      newdata(data) {
        this.id = data.id
        this.$emit('newdata', data)
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
  @import "../../../sass/updateAndAdd";
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

