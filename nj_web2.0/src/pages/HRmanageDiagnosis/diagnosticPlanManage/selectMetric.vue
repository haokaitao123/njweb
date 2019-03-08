<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          {{$t('lang_evaluation.evaluation.selectMetric')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Col class="col" span="18">
        <Tree :data="data" show-checkbox multiple ref="tree" :render="renderContent"></Tree>
        </Col>
        <Col span="4" offset="2">
        <div class="btn-group">
          <Button type="primary" @click="expand">{{$t('lang_evaluation.evaluation.expand')}}</Button>
          <Button type="primary" @click="disExpand">{{$t('lang_evaluation.evaluation.disExpand')}}</Button>
          <Button type="primary" @click="allPick">{{$t('lang_evaluation.evaluation.allPick')}}</Button>
          <Button type="primary" @click="resetTree">{{$t('lang_evaluation.evaluation.resetTree')}}</Button>
          <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
        </div>
        </Col>
      </Row>

    </div>
  </div>
</template>
<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin} from '../../../axios/axios'
  import {isSuccess, deepCopy} from '../../../lib/util'

  export default {
    data() {
      return {
        id: NaN,
        data: [],
        dataInput: [],
        wholeDdata: new Array(),
        selectData: [],
        proceListAll: [],
      }
    },
    components: {},
    props: {},
    mounted() {
    },
    methods: {
      getData(id) {
        const t = this
        t.id = id;
        const data = {
          _mt: 'evaluationIndex.getSelectValue',
          logType: this.$t('button.ser'),
          indType: '01eval',
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.wholeDdata = res.data.content[0].value;
            t.getSelectData(id)
          }
        }).catch(() => {
//        t.$Modal.error({
//          title: this.$t('reminder.err'),
//          content: this.$t('reminder.errormessage'),
//        })
        })
      },
      getSelectData(id) {
        const t = this
        const data = {
          _mt: 'evaluationProinfo.getByPId',
          logType: this.$t('button.ser'),
          indType: '01eval',
          pid: id,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.selectData = res.data.content[0].value;
            console.log(t.selectData)
            t.dataProcessing();
          }
        }).catch(() => {
//        t.$Modal.error({
//          title: this.$t('reminder.err'),
//          content: this.$t('reminder.errormessage'),
//        })
        })
      },
      dataProcessing() {
        const t = this
        let proceList = []
        let shouldList = []
        t.proceListAll = []
        if (undefined == t.selectData || t.selectData.length == 0) {
          let list = [];
          for (let i = 0; i < t.wholeDdata.length; i++) {
            let map = {};
            map["indName"] = t.wholeDdata[i].indName;
            map["expand"] = false;
            map["indPid"] = t.wholeDdata[i].indPid;
            map["id"] = t.wholeDdata[i].id;
            list.push(map);
          }
          t.data = t.toTree(list);
          return;
        }
        for (let k = 0; k < t.selectData.length; k++) {
          proceList.push(t.selectData[k].proIndid);
          t.proceListAll.push(t.selectData[k].proIndid);
        }
        console.log(proceList)
//        console.log(t.wholeDdata)
        for (let p = 0; p < t.wholeDdata.length; p++) {
          let obj = {}
          obj['indName'] = t.wholeDdata[p].indName
          obj['expand'] = false
          obj['indPid'] = t.wholeDdata[p].indPid
          obj['id'] = t.wholeDdata[p].id
          if (t.wholeDdata[p].indPid !== '0') {
            for (let j = 0; j < proceList.length; j++) {
              if (obj['id'] === proceList[j]) {
                obj['checkedDes'] = true
                t.wholeDdata.forEach((item1) => {
                  if (item1.indPid === obj['id']) {
                    obj['checkedDes'] = false
                  }
                })
//                const childids = t.retLists(t.wholeDdata, obj['id'], [])
              }
            }
          }
          shouldList.push(obj)
        }
        console.log(shouldList)
        t.data = t.toTree(shouldList)
      },
      save() {
        const t = this
        const checkedId = []
        let ids = [];
        let indexId = "";
        for (let i = 0; i < t.$refs.tree.flatState.length; i++) {
          if (t.$refs.tree.flatState[i].node.indeterminate === true) {
            checkedId.push(t.$refs.tree.flatState[i].node.id);
          }
        }
        const checked = t.$refs.tree.getCheckedNodes()
        for (let i = 0; i < checked.length; i++) {
          checkedId.push(checked[i].id)
        }
        indexId = checkedId.join(',');
        const data = {
          _mt: 'evaluationProinfo.saveEvaluateProinfo',
          logType: '选择指标',
          pid: t.id,
          indexIds: indexId,
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
          if (item.hasOwnProperty('checkedDes')) {
            item.checked = item.checkedDes
          } else {
            item.checked = undefined
          }
          item.expand = false
          item.title = item.indName
          delete item.children
          delete item.checkedDes
        })
        const map = {}
        data.forEach((item) => {
          map[item.id] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.indPid]
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
      renderContent(h, {root, node, data}) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%',
          },
        }, [
          h('Button', {
            props: {
              type: 'text',
              size: 'small',
            },
            on: {
              click: () => {
                this.selectChange(data)
              },
            },
          }, [
            h('Icon', {
              props: {
                type: 'ios-speedometer',
                size: '15',
                color: '#3399ff',
              },
              style: {
                marginRight: '8px',
              },
            }),
            h('span', data.title),
          ]),
        ])
      },
    },
    watch: {},
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";

  .cover .box {
    width: 900px;
    height: 500px !important;
  }

  .col {
    height: 400px;
    overflow-y: auto;
    border: 1px #efefef solid;
    padding: 20px 10px;
  }

  .btn-group {
    width: 80%;
    height: 220px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
</style>
