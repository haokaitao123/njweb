<template>
  <div class="menu" :style="{width: shrink?'64px':'200px',overflowX: shrink?'visible':'hidden',overflowY:  shrink?'visible':'auto'}">
    <div class="btn" @click="toggleClick">
      <Icon  v-if="shrink" type="navicon-round" size="16" color="#fff"></Icon>
      <img v-if="!shrink" src="../../../static/employee/111.png" alt="">
    </div>
    <el-menu
      class="el-menu"
      :unique-opened="true"
      :collapse="shrink"
      :default-active="$route.query.id"
      :router="true"
      @select="changeMenu"
      background-color="#495060"
      text-color="#fff"
      active-text-color="#2DB7F5">

<template v-for="(item,index) in menu">
        <el-submenu v-if="item.children" :index="item.id" :key="index">
          <template slot="title">
            <Icon :type="item.funImg" size="16" color="#fff" style="margin-right: 5px;width: 15px;text-align: center"></Icon>
            <span>{{item.funLancodeDis}}</span>
          </template>
          <template v-for="(item2,index2) in item.children">
            <el-submenu v-if="item2.children" :index="item2.id" :key="index2">
              <template slot="title">
                <span>{{item2.funLancodeDis}}</span>
              </template>
              <template v-for="(item3,index3) in item2.children">
                <el-submenu v-if="item3.children" :index="item3.id" :key="index3">
                  <template slot="title">
                    <span>{{item3.funLancodeDis}}</span>
                  </template>
                  <el-menu-item :index="item4.id" :route="{path:item4.funAction,query:{id:item4.id,code:item4.funCode}}" v-for="(item4,index4) in item3.children" :key="index4">{{item4.funLancodeDis}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="item3.id" :route="{path:item3.funAction,query:{id:item3.id,code:item3.funCode}}">{{item3.funLancodeDis}}</el-menu-item>
              </template>
              <!--<el-menu-item index="userManage" v-for="(item2,index) in item.children" :key="index">{{item2.id}}</el-menu-item>-->
            </el-submenu>
            <el-menu-item v-else :index="item2.id" :route="{path:item2.funAction,query:{id:item2.id,code:item2.funCode}}">{{item2.funLancodeDis}}</el-menu-item>
          </template>
          <!--<el-menu-item index="userManage" v-for="(item2,index) in item.children" :key="index">{{item2.funLancodeDis}}</el-menu-item>-->
        </el-submenu>
        <el-menu-item v-else :index="item.id" :route="{path:item.funAction,query:{id:item.id,code:item.funCode}}" :key="index">
        <!--<el-menu-item v-else :index="item.funAction+'?id='+item.id" :key="index">-->
          <template slot="title" v-if="!shrink">
            <Icon :type="item.funImg" size="16" color="#fff" style="margin-right: 5px;width: 15px;text-align: center"></Icon>
            <span>{{item.funLancodeDis}}</span>
          </template>
          <Icon v-else :type="item.funImg" size="16" color="#fff" style="margin-right: 5px;width: 15px;text-align: center"></Icon>
        </el-menu-item>
      </template>

    </el-menu>
    <div class="btn1">
    </div>
  </div>
</template>
<style  lang="scss" scoped>
  .menu{
    .btn{
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  .btn1{
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
    .btn:hover{
      cursor: pointer;
      background-color: RGBA(92,173,255,.2);
    }
  }

</style>
<script>
export default{
    data() {
      return {
        menu: [],
        data: [],
        shrink: false,
      }
    },
  props: {
    userFuns: Array,
  },
  mounted() {
  },
  methods: {
    changeMenu(id) {
        /* 通过name查询funid和显示字段 */
      let funId = ''
      let name = ''
      let funCode = ''
      let title = ''
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].id === id) {
          funId = this.data[i].id
          name = this.data[i].funAction
          title = this.data[i].funLancodeDis
          funCode = this.data[i].funCode
          break
        }
      }
      const tag = {
        title: title,
        path: '/' + name,
        name: name,
        query: { id: funId, code: funCode },
      }
      this.$store.commit('increateTag', tag)
    },
    /* 把后台数据转化为tree的格式 */
    toTree(data) {
      data.forEach((item) => {
        delete item.children
      })
      const map = {}
      data.forEach((item) => {
        map[item.id] = item
      })
      const val = []
      data.forEach((item) => {
        const parent = map[item.funPid]
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          val.push(item)
        }
      })
      return val
    },
    subdata(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].funCode === '100' || data[i].funCode === '200' || data[i].funCode === '300') {
          data.splice(i, 1)
          break
        }
      }
      this.data = data
      this.menu = this.toTree(data)
      console.log(this.menu)
    },
    toggleClick() {
      this.shrink = !this.shrink
      this.$emit('toggleClick', this.shrink)
    },
  },
  watch: {
    /*
    * 监听路由的变化为funid赋值
    * */
//    $route(newValue, oldValue) {
//      let funId = ''
//      console.log(newValue)
//      this.changeMenu(newValue.query.id)
//      for (let i = 0; i < this.data.length; i++) {
//        if (this.data[i].funAction === newValue.name) {
//          funId = this.data[i].id
//          break
//        }
//      }
//      this.$store.commit('setFunId', funId)
//    },
  },
}
</script>
