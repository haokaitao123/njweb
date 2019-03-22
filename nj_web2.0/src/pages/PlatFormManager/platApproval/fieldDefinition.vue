<template>
	<div class="cover">
		<div class="box">
			<div class="title">
		        <div class="title-text">
		        	<Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{$t('lang_approval.dataBlock.fieldDeTitle')}}
		        </div>
		        <Button type="text" @click="close">
		        	<Icon type="close-round" size="16"></Icon>
		        </Button>
	        </div>
			<Row>
				<Col span="8" class="txtsize">{{$t('lang_approval.dataBlock.txtsize1')}}</Col>
				<Col span="15" offset="1" class="txtsize">{{$t('lang_approval.dataBlock.txtsize2')}}</Col>
			</Row>
			<Row class="positionBox">
				<Col span="8">
					<!-- 可选择字段表格 -->
					<Table border ref="optionalField" :columns="optionalFieldColumns" :data="optionalFieldData" @on-selection-change="selectOpt" height="500"></Table>
          <!-- <Row style="display: flex">          <Page :total="total1" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" style="margin-top:20px;":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row> -->
				</Col>
				<Col span="1">
					<ButtonGroup vertical size="small" class="btnFa">
						<Button type="ghost" size="small" icon="chevron-up" @click="toTop(1)"></Button>
						<Button type="ghost" size="small" icon="chevron-right" @click="toRight()"></Button>
						<Button type="ghost" size="small" icon="chevron-left" @click="toLeft()"></Button>
						<Button type="ghost" size="small" icon="chevron-down" @click="toTop(2)"></Button>
					</ButtonGroup>
				</Col>
				<Col span="15">
					<!-- 已选择字段表格 -->
					<Table border ref="selectedField" :columns="selectedFieldColumns" :data="selectedFieldData" height="500" @on-selection-change="selectOpt2" @on-select-cancel="cancelSelect"></Table>
          <!-- <Row style="display: flex">          <Page :total="total2" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange2" @on-change="pageChange2" style="margin-top:20px;":page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row> -->
          <div style="text-align: right;">
            <Button type="primary" class="position" @click="saveField()">{{$t('button.sav')}}</Button>
          </div>
				</Col>
			</Row>
		</div>
	</div>

</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2 } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        // 可选择字段表格分页
        total1: NaN,
        sort1: 'sffOrder',
        order1: 'asc',
        rows1: '0',
        page1: '0',
        // 已选择字段表格分页
        total2: NaN,
        sort2: 'aprvdbfdOrder',
        order2: 'asc',
        rows2: '0',
        page2: '0',
        // 可选择字段表格开始
        optionalFieldColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_approval.dataBlock.sffFieldName'),
            key: 'sffName',
            align: 'center',
          },
          {
            title: this.$t('lang_approval.dataBlock.sffLayout'),
            key: 'sffLayoutDis',
            align: 'center',
          },
        ],
        optionalFieldData: [],  //  从后台接收到的值
        optSelected: [],        //  存放左边已选择的值
        optSelected2: [],       //  存放右边已选择的值
        // 可选择字段表格结束
        // 已选择字段表格开始
        selectArr: [],          //  存放默认是否显示的option值
        selectedFieldColumns: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: this.$t('lang_approval.dataBlock.aprvdbfdField'),
            key: 'aprvdbfdFieldDis',
            align: 'center',
          },
          {
            title: this.$t('lang_approval.dataBlock.layouType'),
            key: 'layouType',
            align: 'center',
          },
          {
            title: this.$t('lang_approval.dataBlock.aprvdbfdDisdefault'),
            align: 'center',
            render: (h, params) => {
              let opts = []
              for (let i = 0; i < this.selectArr.length; i++) {
                opts.push(h('i-option', {
                  props: {
                    value: this.selectArr[i].paramCode,
                  },
                }, this.selectArr[i].paramInfoName))
              }
              return h('div', [
                h('i-select', {
                  props: {
                    value: this.selectedFieldData[params.index].aprvdbfdDisdefault,
                  },
                  on: {
                    'on-change': (value) => {
                      this.selectedFieldData[params.index].aprvdbfdDisdefault = value
                    },
                  },
                }, opts),
              ])
            },
          },
        ],
        selectedFieldData: [],  //  存放用户向右移动的值
        Datablock: '',
        // 已选择字段表格结束
      }
    },
    props: {
    },
    components: {
    },
    mounted() {
      this.getSelect()
    },
    methods: {
      // 可选择字的请求
      getOptional(id) {
        const t = this
        const data = {
          _mt: 'platSformfield.getAppFieldList',
          appId: t.$store.state.platApproval.mainId,
          logType: this.$t('button.ser'),
          rows: t.rows1,
          page: t.page1,
          sort: t.sort1,
          order: t.order1,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.optionalFieldData = res.data.content[0].rows
            // t.resetField()
            // t.total1 = res.data.content[0].records
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 可选择字的请求----------------------------------
      // 已经选择字的请求
      getselected(id) {
        const t = this
        t.Datablock = id
        const data = {
          _mt: 'platAprvdbfield.getPage',
          aprvdbfdDatablock: t.Datablock,
          aprvId: t.$store.state.platApproval.mainId,
          logType: this.$t('button.ser'),
          rows: t.rows2,
          page: t.page2,
          sort: t.sort2,
          order: t.order2,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            if (Object.keys(res.data.content[0]).length !== 0) {
              t.selectedFieldData = res.data.content[0].rows
              // t.total2 = res.data.content[0].records
            } else {
              t.selectedFieldData = []
              t.total2 = 0
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 已经选择字的请求--------------------------------
      // 可选择字段的分页
      /* sizeChange(size) {
        const t = this
        t.rows1 = size
        t.getOptional()
      },
      pageChange(page) {
        const t = this
        t.page1 = page
        t.getOptional()
      }, */
      // 可选择字段的分页--------------------------------
      // 已經选择字段的分页
      /* sizeChange2(size) {
        const t = this
        t.rows2 = size
        t.getselected(t.Datablock)
      },
      pageChange2(page) {
        const t = this
        t.page2 = page
        t.getselected(t.Datablock)
      }, */
      // 已經选择字段的分页--------------------------------
      // 关闭流程定义弹窗页面
      close() {
        this.$emit('hideField')
      },
      // 关闭流程定义弹窗页面----------------------------
      // 可选择字段的选中方法
      selectOpt(selection) {
        this.optSelected = selection
      },
      // 可选择字段的选中方法----------------------------
      // 已选择字段的选中方法
      selectOpt2(selection) {
        this.optSelected2 = selection
      },
      // 已选择字段的选中方法----------------------------
      // 向右移动可选择字段数据到右侧已选择字段
      toRight() {
        const t = this
        // 去重
        if (t.selectedFieldData.length !== 0) {
          for (const dat1 in t.optSelected) {
            if (t.optSelected[dat1].sffName) {
              for (const dat2 in t.selectedFieldData) {
                if (t.selectedFieldData[dat2].aprvdbfdFieldDis) {
                  if (t.optSelected[dat1].sffName === t.selectedFieldData[dat2].aprvdbfdFieldDis) {
                    t.optSelected.splice(dat1, 1)
                    // return
                  }
                }
              }
            }
          }
        }
        t.selectedFieldData.push(...t.optSelected)
        t.selectedFieldData.forEach((item, index) => {
          let flag1 = item.sffName
          let flag2 = item.sffLayoutDis
          let flag3 = item.sffPhyfield
          if (flag1) {
            item['aprvdbfdFieldDis'] = flag1
            item['layouType'] = flag2
            item['aprvdbfdDisdefault'] = ''
            item['aprvdbfdDisdefault'] = t.selectArr[0].paramCode
            item['aprvdbfdField'] = flag3
          }
        })
        // t.removeSet(t.optSelected, t.optionalFieldData)
      },
      // 向右移动可选择字段数据到右侧已选择字段----------
      // 左移已选择字段
      toLeft() {
        const t = this
        t.moveLeft(t.optSelected2, t.selectedFieldData)
        t.optSelected2.forEach((item, index) => {
          let flag1 = item.aprvdbfdFieldDis
          let flag2 = item.layouType
          let flag3 = item.aprvdbfdField
          if (flag1) {
            item['sffName'] = flag1
            item['sffLayoutDis'] = flag2
            item['sffPhyfield'] = flag3
          }
        })
        // t.optionalFieldData.unshift(...t.optSelected2)
      },
      // 左移已选择字段----------------------------------
      // 向上、向下移已选择字段
      cancelSelect(selection, row) {
        if (row._checked) {
          for (let i = 0; i < this.selectedFieldData.length; i++) {
            if (row.id === this.selectedFieldData[i].id) {
              this.selectedFieldData[i]._checked = false
            }
          }
        }
      },
      toTop(num) {
        const t = this
        const keys = []
        for (let i = 0; i < t.selectedFieldData.length; i++) {
          keys.push(t.selectedFieldData[i])
        }
        if (num === 1) {
          // 向上
          let flag = false
          for (let i = 0; i < keys.length; i++) {
            if (t.optSelected2.containsObj(keys[i]) && !t.optSelected2.containsObj(keys[i - 1]) && i > 0) {
              keys.splice(i, 1, ...keys.splice(i - 1, 1, keys[i]))
              keys[i - 1]._checked = true
              flag = true
            }
          }
          if (flag) {
            t.selectedFieldData = keys
          }
        } else if (num === 2) {
          // 向下
          let flag = false
          for (let i = keys.length - 2; i > -1; i--) {
            if (t.optSelected2.containsObj(keys[i]) && !t.optSelected2.containsObj(keys[i + 1]) && i > -1) {
              keys.splice(i, 1, ...keys.splice(i + 1, 1, keys[i]))
              keys[i + 1]._checked = true
              flag = true
            }
          }
          if (flag) {
            t.selectedFieldData = keys
          }
        }
      },
      // 向上、向下移已选择字段--------------------------------
      // 获取可选择字段option的值
      getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          typeCode: 'yesno',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectArr = res.data.content[0].value[0].paramList  //  默认是否显示的option的值
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 获取可选择字段option的值------------------------
      // 保存提交已选择字段
      saveField() {
        const t = this
        const field = t.selectedFieldData.map(item => {
          return {
            aprvdbfdField: item.aprvdbfdField,
            aprvdbfdDisdefault: item.aprvdbfdDisdefault,
          }
        })
        let fieldString = JSON.stringify(field)
        const data = {
          _mt: 'platAprvdbfield.addOrUpd',
          aprvdbfdDatablock: t.Datablock,
          aprvId: t.$store.state.platApproval.mainId,
          stepBlockData: fieldString,
          logType: '新增',
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            this.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.savsuccess'),
            })
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      // 保存提交已选择字段-------------------------------
      // 向左移动字段公共方法
      removeSet(arr1, arr2) {
        for (const dat1 in arr1) {
          if (arr1[dat1].sffName) {
            for (const dat2 in arr2) {
              if (arr2[dat2].sffName) {
                if (arr1[dat1].sffName === arr2[dat2].sffName) {
                  arr2.splice(dat2, 1)
                }
              }
            }
          }
        }
      },
      moveLeft(arr1, arr2) {
        for (const dat1 in arr1) {
          if (arr1[dat1].aprvdbfdFieldDis) {
            for (const dat2 in arr2) {
              if (arr2[dat2].aprvdbfdFieldDis) {
                if (arr1[dat1].aprvdbfdFieldDis === arr2[dat2].aprvdbfdFieldDis) {
                  arr2.splice(dat2, 1)
                }
              }
            }
          }
        }
      },
      moveLeft2(arr1, arr2) {
        for (const dat1 in arr1) {
          if (arr1[dat1].aprvdbfdFieldDis) {
            for (const dat2 in arr2) {
              if (arr2[dat2].sffName) {
                if (arr1[dat1].aprvdbfdFieldDis === arr2[dat2].sffName) {
                  arr2.splice(dat2, 1)
                }
              }
            }
          }
        }
      },
      // 向左移动字段公共方法 end----------------------------------
      resetField() {
        const t = this
        t.moveLeft2(t.selectedFieldData, t.optionalFieldData)
      },
    },
  }
</script>
<style lang="scss" scoped>
.cover{
	position: fixed;overflow: auto;top: 0;right: 0;bottom: 0;left: 0; z-index: 1000;
    display: -webkit-box; display: -ms-flexbox;display: flex;
    -webkit-box-pack: center; -ms-flex-pack: center;justify-content: center;
    -webkit-box-align: center; -ms-flex-align: center; align-items: center;
    background-color: rgba(0, 0, 0, 0.5); -webkit-overflow-scrolling: touch; outline: 0;
}
.box{
	position: relative; width: 70%; min-width:600px; max-height: 650px; background-color: #fff;
  padding: 60px 20px 20px 20px; border-radius: 10px;
}
.title{
	display: flex; position: absolute; height: 40px; width: 100%; line-height: 40px;
	justify-content: space-between; align-items: center; padding-left: 20px;
	top: 0; border-bottom: 1px solid #efefef; left: 0;
	.title-text{ font-weight: bold; font-size: 14px;}
}
.txtsize{font-size: 14px; color: #495060; line-height:30px; font-weight:bold;}
.btnFa{display:block; max-width:80%; margin:100px auto 0;}
.position{margin-top:15px;}
</style>
