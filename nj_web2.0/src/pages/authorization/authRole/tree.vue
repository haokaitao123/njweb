<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{roleName}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Col class="col" span="19">
          <Tree :data="data" show-checkbox multiple ref="tree"></Tree>
        </Col>
        <Col span="4" offset="1">
          <div class="btn-group">
            <Button type="primary" @click="expand">{{$t('lang_user.rootrole.expand')}}</Button>
            <Button type="primary" @click="disExpand">{{$t('lang_user.rootrole.disExpand')}}</Button>
            <Button type="primary" @click="allPick">{{$t('lang_user.rootrole.allPick')}}</Button>
            <Button type="primary" @click="resetTree">{{$t('lang_user.rootrole.resetTree')}}</Button>
            <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
          </div>
        </Col>
      </Row>

    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        id: NaN,
        data: [],
        params: {
          _mt: 'sysFunctions.selSysFunctionsByTree',
          funType: '1admin',
        },
      }
    },
    components: {
    },
    props: {
      roleName: String,
    },
    mounted() {
    },
    methods: {
      getData(id, companyId) {
        const t = this
        t.id = id
        const data = deepCopy(t.params)
        data.authRoleId = id
        data.rootCompId = companyId
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = t.toTree(res.data.content[0].value)
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      save() {
        const t = this
        const checkedId = []

        let ids = []
        for (let i = 0; i < t.$refs.tree.flatState.length; i++) {
          if (t.$refs.tree.flatState[i].node.indeterminate === true) {
            ids.push({
              sysFunctionsId: t.$refs.tree.flatState[i].node.id,
              funState: 2,
            })
          }
        }
        const checked = t.$refs.tree.getCheckedNodes()
        for (let i = 0; i < checked.length; i++) {
          checkedId.push(checked[i].id)
        }
        for (let j = 0; j < checkedId.length; j++) {
          ids.push({
            sysFunctionsId: checkedId[j],
            funState: 1,
          })
        }

        const data = {
          _mt: 'authRole.addOrUpdRoleFun',
          funId: '1',
          companyId: '1',
          logType: '节点分配',
          authRoleId: t.id,
          data: JSON.stringify(ids),
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
            t.$emit('closePower')
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false
          item.checked = item.authRoleFunDis === '1'
          item.title = item.funLancodeDis
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
      handleReset() {
        const t = this
        t.$emit('closePower')
      },
      resetTree() {
        this.treeData2(this.data, 'checked', false)
        this.treeData(this.data, 'checked', false)
      },
      allPick() {
        this.treeData2(this.data, 'checked', true)
      },
      expand() {
        this.treeData(this.data, 'expand', true)
      },
      disExpand() {
        this.treeData(this.data, 'expand', false)
      },
      /* 遍历树形数组对象 */
      treeData(data, item, value) {
        const t = this
        for (let i = 0; i < data.length; i++) {
          if (data[i].children !== undefined) {
            data[i][item] = value
            t.treeData(data[i].children, item, value)
          }
        }
      },
      treeData2(data, item, value) {
        const t = this
        for (let i = 0; i < data.length; i++) {
          if (data[i].children !== undefined) {
            t.treeData2(data[i].children, item, value)
          } else {
            data[i][item] = value
          }
        }
      },
    },
    watch: {
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .cover .box{
    width: 750px;
  }
.col{
  height: 300px;
  overflow-y: auto;
  border: 1px #efefef solid;
  padding: 20px 10px;
}
  .btn-group{
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
</style>
