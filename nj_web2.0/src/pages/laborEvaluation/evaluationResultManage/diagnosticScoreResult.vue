<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_evaluation.evaluation.diagnosticScoreResult1')}}
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Col class="col" span="18">
        	<div style="height:25px;line-height:25px;">
            <span style="height:25px;display:inline-block;text-align:center">{{$t('lang_evaluation.evaluation.diagproject1')}}</span>
            <span style="height:25px;display:inline-block;float:right;width:100px;margin-right:50px;text-align:center">{{$t('lang_evaluation.evaluation.diagscore1')}}</span>
            <span style="height:25px;display:inline-block;float:right;width:100px;margin-right:20px;text-align:center">{{$t('lang_evaluation.evaluation.diagscoring1')}}</span>
          </div>
          <Tree :data="data" multiple ref="tree" :render = "renderContent"></Tree>
        </Col>
        <Col span="4" offset="2">
          <div class="btn-group">
            <Button type="primary" @click="expand">{{$t('lang_evaluation.evaluation.expand')}}</Button>
            <Button type="primary" @click="disExpand">{{$t('lang_evaluation.evaluation.disExpand')}}</Button>
            <!--<Button type="primary" @click="allPick">全选</Button>-->
            <!--<Button type="primary" @click="resetTree">重置</Button>-->
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
        score: '',
        data: [],
        dataDInput: [],
        dataPInput: [],
      }
    },
    components: {
    },
    props: {

    },
    mounted() {
    },
    methods: {
      getData(id) {
        const t = this
        t.id = id;
        const data={
        	_mt: 'evaluationProinfo.getListByResid',
        	logType: this.$t('button.ser'),
        	resId: id,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.data = t.toTree(res.data.content[0].value);
          }
        }).catch(() => {
//        t.$Modal.error({
//          title: this.$t('reminder.err'),
//          content: this.$t('reminder.errormessage'),
//        })
        })
      },
      save() {
	      const t = this;
	      this.score = "";
	      let scorePList = [];
	      let scoreDList = [];
	      let scoreLst = [];
	      for (let i = this.dataPInput.length - 1; i >= 0; i--) {
	        if (scorePList.indexOf(this.dataPInput[i].id) == -1) {
	          scorePList.push(this.dataPInput[i].id);
	          scoreLst.push(JSON.stringify(this.dataPInput[i]));
	        }
	      }
	      for (let j = this.dataDInput.length - 1; j >= 0; j--) {
	        if (scoreDList.indexOf(this.dataDInput[j].id) == -1) {
	          scoreDList.push(this.dataDInput[j].id);
	          scoreLst.push(JSON.stringify(this.dataDInput[j]));
	        }
	      }
	      this.score = scoreLst.join("#");
        const data = {
          _mt: 'evaluationProinfo.addOrUpd',
          logType: '指标评分结果保存',
          data: this.score,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
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
	    renderContent(h, { root, node, data }) {
	      this.dataInput = [];
	      return h(
	        "span",
	        {
	          style: {
	            display: "inline-block",
	            width: "90%"
	          }
	        },
	        [
	          h("span", [h("span", data.title)]),
	          h(
	            "span",
	            {
	              style: {
	                display: "inline-block",
	                width: "100px",
	                float: "right",
	                marginRight: "20px"
	              }
	            },
	            [
	              h("input", {
	                props: Object.assign({}),
	                domProps: {
	                  value: data.proScore
	                },
	                style: {
	                  marginRight: "8px",
	                  height: "20px",
	                  lineHeight: "20px",
	                  padding: 0,
	                  width: "100px",
	                  borderRadius: "2px",
	                  border: "1px solid #ddd"
	                },
	                on: {
	                  blur: $event => {
	                    let map = {};
	                    map["id"] = data.id;
	                    map["proScore"] = $event.target.value;
	                    this.dataDInput.push(map);
	                  }
	                }
	              })
	            ],

	          ),
	          h(
	            "span",
	            {
	              style: {
	                display: "inline-block",
	                width: "100px",
	                float: "right",
	                marginRight: "20px"
	              }
	            },
	            [
	              h("input", {
	                props: Object.assign({}),
	                domProps: {
	                  value: data.proResult
	                },
	                style: {
	                  marginRight: "8px",
	                  height: "20px",
	                  lineHeight: "20px",
	                  padding: 0,
	                  width: "100px",
	                  borderRadius: "2px",
	                  border: "1px solid #ddd"
	                },
	                on: {
	                  blur: $event => {
	                    let map = {};
	                    map["id"] = data.id;
	                    map["proResult"] = $event.target.value;
	                    this.dataPInput.push(map);
	                  }
	                }
	              })
	            ],

	          )
	        ]

	      );
	    },
      /* 把后台数据转化为tree的格式 */
      toTree(data) {
        data.forEach((item) => {
          item.expand = false;
//        item.checked = item.authRoleFunDis === '1'
          item.checked = false;
          item.title = item.proIndidDis
          delete item.children
        })
        const map = {}
        data.forEach((item) => {
          map[item.proIndid] = item
        })
        const val = []
        data.forEach((item) => {
          const parent = map[item.proIndPid]
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
  height: 400px;
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
