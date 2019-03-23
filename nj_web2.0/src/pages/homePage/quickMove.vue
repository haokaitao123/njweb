<template>
  <i-col class="col" span="8">
    <card :bordered="false">
      <p slot="title" class="title"><Icon type="ios-paperplane"></Icon> <span style="margin-left: 5px;">{{$t('lang_homePage.quickMove.title')}}</span></p>
      <a href="#" slot="extra" @click="openUp()">
        <Icon type="more"></Icon>
      </a>
      <div class="block" :class="height">
        <div class="fast_block">
          <div class="fast_item" @click="openFun1(item.funName , item.id , item.funCode, item.funAction)" v-for="(item , index) in sysmlvarComment.value" :key="index">
            <div class="item_admin" :style="'background-image: url(../../../static/indexImg/'+item.authFunImg +')'"></div>
            <div class="item_title">
              {{item.funName}}
            </div>
          </div>
        </div>
      </div>
    </card>
    <transition name="fade">
      <editQuickMove v-if="openUpdate" @getIndexFun="getIndexFun" @close="close" @changeinput="changeinput" ref="editQuickMove"></editQuickMove>
    </transition>
  </i-col>
</template>
<script>
  import editQuickMove from './editQuickMove'
  import { isSuccess, deepCopy } from '../../lib/util'
  import  Bus  from '../../lib/bus'
  import { getDataLevelUserLogin } from '../../axios/axios'

  export default{
    data() {
      return {
        openUpdate: false,
        sysmlvarComment: [],
        indexFun: [],
        indexFun2: '',
        indexFun3: '',
        indexFun4: '',
        indexFun5: '',
        indexFun6: '',
      }
    },
    props: {
      roleType: String,
      height: String,
    },
    computed: {
      authFunType() {
        return this.$store.state.user.roleType
      },
    },
    components: {
      editQuickMove,
    },
    mounted() {
      Bus.$on('setCommonFlag', (res) => {
        if (res) {
          this.getIndexFun()
        }
      })
    },
    methods: {
      openFun1(name, id, code, funAction) {
        const t = this
        const tag = {
          title: name,
          path: '/' + funAction,
          name: funAction,
          query: { id: id, code: code },
        }
        this.$store.commit('increateTag', tag)
        t.$router.push({ path: funAction, query: {
          id: id,
          code: code,
        }})
      },
      openUp() {
        const t = this
        t.openUpdate = true
        setTimeout(() => {
          t.$refs.editQuickMove.getData()
        }, 100)
      },
      close() {
        const t = this
        t.openUpdate = false
      },
      getIndexFun() {
        console.log(this.$store.state.app.lang)
        const t = this
        getDataLevelUserLogin({
          _mt: 'sysFunctions.getIndexList',
          logType: '分配快捷操作节点',
          authFunType: t.$store.state.user.roleType,
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.sysmlvarComment = res.data.content[0]
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      changeinput(name, id) {
        const t = this
        t.rolegrpCode = name
        t.rolegrpCname = id
      },
    },
    watch: {
      authFunType(value) {
        this.getIndexFun()
      },
      $lang(value) {
        setTimeout(() => {
          this.getIndexFun()
        }, 500)
      },
    },
  }
</script>
<style lang="scss" scoped>
  .item_fun_img{
    /*border-radius: 50%;*/
    /*transition:all .3s;*/
    height:100%;
    width:100%;
    /*background-image: url('../../../static/homeImg/1.png');*/
    /*background-size: 50%;*/
    /*background-repeat: no-repeat;*/
    /*background-position: center;*/
  }
  .item_admin{
    border-radius: 50%;
    transition:all .3s;
    height:100%;
    width:100%;
    /*background-image: url('../../../static/homeImg/1.png');*/
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
  }
  .short{
    height: 220px;
  }
  .height{
    height: 280px;
  }
  .fast_block{
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 12px;
    flex-wrap: wrap;
  .fast_item{
    width: 33%;
    cursor: pointer;
    transition: all .3s;
    display: flex;
    margin-top: 20px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  .item_admin{
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  .item_title{
    height: 20px;
    width: 100%;
    text-align: center;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  }
  .fast_item:hover .item_icon div{
    background-color: rgba(255,255,255,.3);
  }
  }
</style>
