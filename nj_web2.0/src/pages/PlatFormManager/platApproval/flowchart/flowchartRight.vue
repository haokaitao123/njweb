<template>
  <div class="right-area" ref="right">
    <div v-if="nodes.length" v-for="(node, index) in nodes" :key="index" class="node" :class="node.className" :id="node.id" ref="nodes"
      :style="node.style" @dblclick="editNodeText(node)">
      <!-- <Button class="close" type="error" @click="selectNode(node)" shape="circle" icon="close-circled"></Button> -->
      <i class="close ivu-icon ivu-icon-close-circled" size="14" @click="selectNode(node, index)"></i>

      <div v-show="node.className=='start'" class="text">
        <Icon type="record"></Icon>
      </div>
      <div v-show="node.className=='end'" class="text">
        <Icon type="close-round"></Icon>
      </div>

      <svg v-show="node.className=='start'" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" version="1.1">
        <ellipse cx="15" cy="15" rx="15" ry="15" style="fill:#19be6b" />
      </svg>
      <Poptip trigger="hover" :content="node.show" v-if="node.className=='approval'">
        <div v-show="node.className=='approval'" class="text">
          <!--{{ '[ ' + node.text + ' ]'}}-->
          <!--<br />-->
          {{ node.show }}
        </div>
        <svg v-show="node.className=='approval'" xmlns="http://www.w3.org/2000/svg" width="80px" height="36px" version="1.1">
          <rect width="80" height="36" rx="6" ry="6" style="fill:#f1a710" />
        </svg>
      </Poptip>
      <svg v-show="node.className=='end'" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" version="1.1">
        <ellipse cx="15" cy="15" rx="15" ry="15" style="fill:#ff6600" />
      </svg>

    </div>
    <div class="demo"></div>
    <updFlowStep v-show="showStep" @closeUp="closeNode" ref="flowStep"></updFlowStep>
    <updFlsRelation v-show="showLine" @closeUp="closeLine" ref="flowLine"></updFlsRelation>
  </div>
</template>

<script>
  import updFlowStep from '../flowStep/baseInfo'
  import updFlsRelation from '../flowStep/updFlsRelation'
  import Bus from '../../../.././lib/bus'
  import {
    getDataLevelUserLoginSenior,
    getDataLevelUserLoginNew,
    getDataLevelUserLogin,
  } from '../../../../axios/axios'
  import searchTable from '../../../../components/searchTable/searchTable'
  import {
    isSuccess,
    deepCopy,
  } from '../../../../lib/util'

  const DynamicAnchors = ['Left', 'Right', 'Top', 'Bottom']
  const connectorStyle = {
    stroke: '#ccc',
    strokeWidth: 2,
    joinstyle: 'round',
  }
  const connectorHoverStyle = {
    stroke: '#5c96bc',
    strokeWidth: 2,
  }
  const endpointStyle = {
    fill: 'transparent',
    stroke: 'transparent',
    radius: 5,
    strokeWidth: 1,
  }
  const endpointHoverStyle = {
    fill: '#5c96bc',
    stroke: '#5c96bc',
    radius: 5,
    strokeWidth: 1,
  }
  const anEndpoint = {
    connector: 'Flowchart',
    endpoint: 'Dot',
    isSource: true,
    isTarget: true,
    paintStyle: endpointStyle,
    hoverPaintStyle: endpointHoverStyle,
    connectorStyle: connectorStyle,
    connectorHoverStyle: connectorHoverStyle,
  }
  const Common = {
    anchor: 'AutoDefault',
    connector: 'Flowchart',
    endpoint: 'Dot',
    paintStyle: connectorStyle,
    hoverPaintStyle: connectorHoverStyle,
    endpointStyle,
    endpointHoverStyle,
  }
  export default {
    name: 'RightArea',
    props: {
      flstepFlow: NaN,
      jsp: {
        type: Object,
      },
      pos: {
        type: Array,
      },
    },
    data() {
      return {
        nowId: '',
        nodeId: '',
        index: '',
        showStep: false,
        showLine: false,
        datas: null,
        dialogVisible: false,
        dialogTitle: '',
        dialogText: '',
        nodes: [],
        edges: [],
        info: null,
        wait: false,
        rjsp: this.$jsplumb.getInstance({
          ConnectionOverlays: [
            ['Arrow', {
              location: 1,
              id: 'arrow',
              width: 6,
              length: 6,
            }],
            ['Label', {
              location: 0.3,
              id: 'label',
              cssClass: 'jsp-label',
              labelStyle: {
                color: '#ddd',
              },
            }],
          ],
        }),
        sourceNodeid: '',
        targetNodeid: '',
        lineArray: [],
        infos: '',
      }
    },
    components: {
      updFlowStep,
      updFlsRelation,
    },
    methods: {
      init() {
        this.jsp.droppable(this.$refs.right, {
          drop: this._jspDrop,
        })
        this.rjsp.bind('beforeDrop', this._jspBeforeDrop)
        //        this._fetchData()
      },
      /*
       * 保存单个节点
       * */
      addNodeToStore(node) {
        const t = this
        if (t.wait) {
          return
        }
        t.wait = true
        const data = {
          _mt: 'platAprvstep.addOrUpd',
          apstAprvid: t.flstepFlow,
          nodeClass: node.className,
          logType: '新增',
          nodeId: node.id,
          styleLeft: node.style.left,
          styleTop: node.style.top,
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            node.storeId = res.data.content[0].id
            t.nodes.push(node)
            t.wait = false
            t.$nextTick(_ => t._initNode(this.$refs.nodes[this.nodes.length - 1]))
            return
          }
          t.wait = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: res.data.stat.desc,
          })
        }).catch(() => {
          t.wait = false
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
       * 保存连线的方法
       * */
      saveEages(info) {
        const t = this
        const data = {
          _mt: 'platAprvsteprelation.addOrUpd',
          apstrelAprvid: t.flstepFlow,
          apstrelSourcenodeid: info.sourceId,
          logType: '新增',
          apstrelTargetnodeid: info.targetId,
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            let connections = t.rjsp.getConnections({
              source: info.sourceId,
              target: info.dropEndpoint.elementId
            })
            if (connections.length === 0) { // 检察是否已经建立过连接
              t.info = info
              t._addEdge(t.info, res.data.content[0].id)
            }
            return
          }
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: res.data.stat.desc,
          })
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      _jspDrop(info) {
        this.info = info
        this.addNodeToStore(this._createNode(this.info.drag.el, this.info.drop.el))
      },
      _jspBeforeDrop(info) {
        this.saveEages(info)
        /*        let connections = this.rjsp.getConnections({ source: info.sourceId, target: info.targetId })
                if (connections.length === 0) {  // 检察是否已经建立过连接
                  this.info = info
                  this._addEdge(this.info)
                }
                else {
                  this.editLabelText(connections[0].getOverlay('label'))
                } */
      },
      editNodeText(node) {
        if (node.className === 'start' || node.className === 'end') {
          return
        }
        // this.$refs.flowStep.setMainId(node.storeId)
        this.$refs.flowStep.setId(node.storeId)
        this.showStep = true
      },
      closeNode() {
        this.showStep = false
      },
      editLabelText(info) {
        this.$refs.flowLine.setLineId(info.edgeId)
        this.showLine = true
        // Bus.$emit('setAprvLineId')
      },
      closeLine() {
        this.showLine = false
      },
      summit() {
        //        if (this.dialogTitle === '输入新建节点的文本') {
        //          this.addNodeToStore(this._createNode(this.info.drag.el, this.info.drop.el))
        //        } else if (this.dialogTitle === '编辑节点的文本') {
        //          this.info.text = this.dialogText
        //        } else if (this.dialogTitle === '输入新建连接的文本') {
        //          this._addEdge(this.info)
        //        } else if (this.dialogTitle === '编辑连接的文本') {
        //          let labelText = this.dialogText
        //          this.$nextTick(_ => (this.info.getOverlay('label').setLabel(labelText)))
        //        }
        //        this.closeDialog()
      },
      saveDatas() {
        this.datas = {
          nodes: this.nodes.map((node, index) => {
            node.style = this._getStyle(this.$refs.nodes[index])
            return node
          }),
          edges: this.rjsp.getAllConnections().map(connection => {
            return {
              source: connection.sourceId,
              target: connection.targetId,
              labelText: connection.getOverlay('label').labelText,
            }
          }),
        }
      },
      _getStyle(node) {
        const container = this.$refs.right.getBoundingClientRect()
        const rect = node.getBoundingClientRect()
        return {
          left: rect.left - container.left - node.clientLeft + 'px',
          top: rect.top - container.top - node.clientTop + 'px',
          //          lineHeight: node.clientHeight + 'px',
        }
      },
      clearAll() {
        this.rjsp.reset()
        this.nodes = []
        this.info = null
      },
      reload() {
        this.clearAll()
        this.rjsp.bind('beforeDrop', this._jspBeforeDrop)
        this.nodes = this.datas.nodes
        this.$nextTick(() => {
          this._initNodes(this.$refs.nodes)
          this._initEdges(this.datas.edges)
        })
      },
      remove() {
        if (this.dialogTitle === this.$t('lang_payroll.platAplInfo.editText')) {
          this._removeNode(this.info)
        } else if (this.dialogTitle === this.$t('lang_payroll.platAplInfo.editNode')) {
          this._removeEgde(this.info)
        }
        this.closeDialog()
      },
      _removeNode(node) {
        this.rjsp.deleteConnectionsForElement(node.id)
        //        this.saveDatas()
        this.nodes.splice(this.nodes.findIndex(n => n.id === node.id), 1)
        //        this.datas.nodes.splice(this.datas.nodes.findIndex(n => n.id === node.id), 1)
        //        this.reload()
      },
      _removeEgde(egde) {
        this.rjsp.deleteConnection(egde)
        this.saveDatas()
      },
      _addEdge(info, id) {
        Common.events = {
          dblclick: this.editLabelText,
          contextmenu: this.deleteLine,
        }
        const c = this.rjsp.connect({
          source: info.sourceId,
          target: info.targetId,
        }, Common)
        c.edgeId = id
        this.edges.push(c)
        this.$nextTick(() => c.getOverlay('label').setLabel(this.$t('lang_payroll.platAplInfo.newAplic')))
      },
      _createNode(dragEl, dropEl) {
        const rect = dropEl.getBoundingClientRect()
        return {
          className: dragEl.classList[0],
          id: this.$util.uuid(),
          text: this.dialogText,
          style: {
            left: this.pos[0] - rect.left - dragEl.clientLeft + 'px',
            top: this.pos[1] - rect.top - dragEl.clientTop + 'px',
            lineHeight: dragEl.clientHeight + 'px',
          },
        }
      },
      _initNode(node) {
        const t = this
        t.rjsp.draggable(node, {
          constrain: true
        })
        DynamicAnchors.map(anchor => t.rjsp.addEndpoint(node, anEndpoint, {
          anchor
        }))
        t.rjsp.makeTarget(node)
      },
      _initNodes(nodes) {
        const t = this
        nodes.map(node => t._initNode(node))
      },
      _initEdges(edges) {
        const t = this
        Common.events = {
          dblclick: this.editLabelText,
          contextmenu: this.deleteLine,
        }
        edges.map(edge => {
          let c = t.rjsp.connect(edge, Common)
          c.edgeId = edge.id
          t.edges.push(c)
          return null
        })
      },
      _fetchData() {},
      /*
       * 获取nodo节点
       * */
      getListById(id) {
        const t = this
        const data = {
          _mt: 'platAprvstep.getByFlowId',
          logType: this.$t('button.ser'),
          apstAprvid: id,
          isDisStartAndEnd: '1',
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length === 0) {
              return
            }
            t.nodes = res.data.content[0].value.map(node => {
              return {
                id: node.nodeId,
                className: node.nodeClass,
                // text: node.flstepDisorder,
                show: node.apstName,
                storeId: node.id,
                style: {
                  left: node.styleLeft,
                  top: node.styleTop,
                },
              }
            })
            t.$nextTick(_ => {
              t._initNodes(t.$refs.nodes)
              t.getListByIdEdge(id)
            })
            return
          }
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: res.data.stat.desc,
          })
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getListByIdEdge(id) {
        const t = this
        const data = {
          _mt: 'platAprvsteprelation.getByFlowId',
          logType: this.$t('button.ser'),
          apstrelAprvid: id,
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length === 0) {
              return
            }
            let edges = res.data.content[0].value.map(node => {
              return {
                id: node.id,
                source: node.apstrelSourcenodeid,
                target: node.apstrelTargetnodeid,
                //                labelText: node.getOverlay('label').labelText,
              }
            })
            t._initEdges(edges)
            //            t.nodes = res.data.content[0].value.map(node => {
            //              return {
            //                id: node.nodeId,
            //                className: node.nodeClass,
            //                text: node.apstName,
            //                style: {
            //                  left: node.styleLeft,
            //                  top: node.styleTop,
            //                },
            //              }
            //            })
            //            t.$nextTick(_ => {
            //              t._initNodes(t.$refs.nodes)
            //            })
            return
          }
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: res.data.stat.desc,
          })
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      /*
       * 保存整个图形的接口
       * 这里只需要保存最新的node位置信息
       * 因为其他信息已经分开保存过了
       * */
      saveAll() {
        const t = this
        let nodes = deepCopy(t.nodes)
        const b = nodes.map((node, index) => {
          node.style = t._getStyle(t.$refs.nodes[index])
          return {
            id: node.storeId,
            styleLeft: node.style.left,
            styleTop: node.style.top,
          }
        })
        const data = {
          _mt: 'platAprvstep.updNodeInfo',
          logType: '保存',
          nodeInfo: JSON.stringify(b),
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
            return
          }
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: res.data.stat.desc,
          })
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      selectNode(node, index) {
        let t = this
        let data = {
          _mt: 'platAprvstep.delCheck',
          logType: '刪除校验',
          id: node.storeId,
        }
        this.nowId = node.storeId
        this.index = index
        this.nodeId = node.id
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].value <= 0) {
              t.$Modal.confirm({
                title: this.$t('reminder.remind'),
                content: this.$t('reminder.isDelete'),
                onOk: this.deleteNode,
              })
            } else {
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.noDelete'),
              })
            }
          }
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
      deleteNode() {
        let t = this
        let data2 = {
          _mt: 'platAprvstep.delByIds',
          logType: '刪除',
          delIds: this.nowId,
        }
        getDataLevelUserLogin(data2).then((res2) => {
          if (isSuccess(res2, this)) {
            if (res2.data.content[0].value == 1) {
              t.nodes.splice(t.index, 1)
              t.rjsp.deleteConnectionsForElement(t.nodeId)
              setTimeout(function(){
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.deletesuccess'),
                })
              },300)
            }
          }
        }).catch((res2) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res2,
          })
        })
      },
      deleteLine(info, id) {
        this.infos = info
        const t = this
        t.sourceNodeid = info.sourceId
        t.targetNodeid = info.targetId
        t.$Modal.confirm({
          title: this.$t('reminder.remind'),
          content: this.$t('reminder.isDelete'),
          okText: this.$t('button.cal'),
          cancelText: this.$t('button.confirm'),
          onCancel: t.deleteLines,
        })
      },
      deleteLines() {
        let t = this
        let data2 = {
          _mt: 'platAprvsteprelation.delByNode',
          logType: '刪除',
          sourcenodeid: t.sourceNodeid,
          targetnodeid: t.targetNodeid,
        }
        getDataLevelUserLogin(data2).then((res2) => {
          if (isSuccess(res2, this)) {
            if (res2.data.content[0].value === 1) {
//              t.nodes.splice(t.index, 1)
//              t.rjsp.deleteConnectionsForElement(t.nodeId)
              for (let i = 0; i < t.lineArray.length; i++) {
                if (t.lineArray[i].source === t.sourceNodeid) {
                  t.lineArray.splice(t.lineArray[i], 1)
                }
              }
              t._removeEgde(this.infos)
              setTimeout(function () {
                t.$Modal.success({
                  title: this.$t('reminder.suc'),
                  content: this.$t('reminder.deletesuccess'),
                })
              },300)
            } else {
              setTimeout(function () {
                t.$Modal.error({
                  title: this.$t('reminder.err'),
                  content: this.$t('reminder.noDelete'),
                })
              },300)
            }
          }
        }).catch((res2) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res2,
          })
        })
      },
    },
    watch: {},
    mounted() {
      Bus.$on('ApprovaleditText', (id) => {
        this.getListById(id)
      })
    },
  }

</script>

<style lang="scss" scoped>
  .right-area {
    position: relative;
  }

  .aaa {
    margin-top: 10px;
  }

  .demo {
    position: fixed;
  }

  .approval {
    position: absolute;
    width: 80px;
    height: 36px;
    box-sizing: border-box;
    top: calc(50% - 18px);
    left: calc(50% - 40px);
  }

  .node {
    // position: relative; // overflow: hidden;
    color: #fff;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    text-align: center;
    cursor: pointer;
  }

  .close {
    position: absolute;
    display: none;
    z-index: 99999;
    right: -5px;
    top: -5px;
    color: #f00;
  }

  .node:hover .close {
    display: block;
  }


  .text {
    position: absolute;
    color: #fff;
    width: 100%;
    height: 36px;
    line-height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }

  .center {
    position: absolute;
    width: 80px;
    height: 36px;
    top: calc(50% - 18px);
    left: calc(50% - 40px);
    div {
      cursor: pointer;
    }
  }

  .start,
  .end {
    position: absolute;
    width: 30px;
    height: 30px;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    .text {
      position: absolute;
      color: #fff;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }

</style>
