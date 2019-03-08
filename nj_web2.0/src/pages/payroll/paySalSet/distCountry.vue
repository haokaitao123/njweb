<template>
  <div class="cover" >
    <div class="box" :style="{height:treeheight + 'px', witdh: '300px'}">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;薪资项目顺序调整
        </div>
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <div>
        <Row>
          <!--<i-col span="11" style="margin-bottom: 10px;">-->
          <!--<span style="font-size: 14px;color: #495060">可选择公司</span>-->
          <!--</i-col>-->
          <!--<i-col span="11" style="margin-bottom: 10px;" offset="1">-->
          <!--<span style="font-size: 14px;color: #495060">已选择公司</span>-->
          <!--</i-col>-->
          <i-col span="20">
            <!--<Table border :columns="columns1" @on-selection-change="selectColumn1" :data="data1" :style="{height:treeheight1 + 'px', witdh: '50px'}"></Table>-->
            <Table border ref="selectedField" :columns="columns1" :data="data1" :height="treeheight1" width="200px" @on-selection-change="selectOpt2" @on-select-cancel="cancelSelect"></Table>
          </i-col>
          <i-col span="2" class="btnFa">
            <ButtonGroup vertical size="small">
              <Button type="ghost" size="small" icon="chevron-up" @click="toTop(1)"></Button>
              <!--<Button type="ghost" size="small" icon="chevron-right" @click="toRight(1)"></Button>-->
              <!--<Button type="ghost" size="small" style="margin-top: 30px" icon="chevron-left" @click="toLeft(1)"></Button>-->
              <Button type="ghost" size="small" icon="chevron-down" @click="toTop(2)"></Button>
            </ButtonGroup>
          </i-col>
          <!--<i-col span="11">-->
          <!--</i-col>-->
          <!-- </Row>
      </Col> -->
        </Row>
      </div>
      <Row type="flex" style="padding-top: 5px;" justify="end">
        <Button type="primary" style="float:right;" @click="saveClumns1">{{$t('button.sav')}}</Button>
        <Button type="ghost" @click="handleReset" style="float:right;margin-left: 5px">取消</Button>
      </Row>
    </div>
  </div>
</template>

<script>
  import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin,
    getDataLevelUserLogin2,
  } from '../../../axios/axios'
  import {
    isSuccess,
    deepCopy,
  } from '../../../lib/util'

  export default {
    data() {
      return {
        data: [],
        treeheight: document.body.offsetHeight - 100,
        treeheight1: document.body.offsetHeight - 250,
        optSelected2: [],       //  存放右边已选择的值
        columns1: [{
          type: 'selection',
          width: 60,
          align: 'center',
        },
          {
            title: '薪资项目名称',
            key: 'payssiItemName',
            align: 'center',
          },
        ],
//        columns2: [{
//          type: 'selection',
//          width: 60,
//          align: 'center',
//        },
//          {
//            title: '公司名称',
//            key: 'bfacompCompidDis',
//            align: 'center',
//          },
//        ],
        selectColumns1: [],
        optRightArr1: [],
        data1: [],
        data2: [],
      }
    },
    props: {
      id: '',
    },
    mounted() {
    },
    methods: {
      getClumns1(id) {
        const t = this
        if (t.id === '') {
          t.id = id
        }
        getDataLevelUserLogin({
          _mt: 'paySalSetItem.getBySSid',
          id: id,
          logType: this.$t('button.ser'),
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.data1 = res.data.content[0].value
          }
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
      /*
       * 删除没有选中的节点
       * */
      deleteNode(data) {
        return data.filter(item => item.authRoleFunDis === '1')
      },
      /*
       * 分配列表左侧选中方法
       * */
      selectColumn1(param) {
        this.selectColumns1 = param
      },
      // 分配列表字段已选择字段的选中方法
      optRight1(select) {
        this.optRightArr1 = select
      },
      toMove(num) {
        const t = this
        const keys = []
        if (num === 1 || num === 2) {
          for (let i = 0; i < t.data2.length; i++) {
            keys.push(t.data2[i])
          }
        } else if (num === 3 || num === 4) {
          for (let i = 0; i < t.data4.length; i++) {
            keys.push(t.data4[i])
          }
        }
        if (num === 1) { //  分配列表字段向上移动
          let flag = false
          for (let i = 0; i < keys.length; i++) {
            if (t.optRightArr1.containsObj(keys[i]) && !t.optRightArr1.containsObj(keys[i - 1]) && i > 0) {
              keys.splice(i, 1, ...keys.splice(i - 1, 1, keys[i]))
              keys[i - 1]._checked = true
              flag = true
            }
          }
          if (flag) {
            t.data2 = keys
          }
        } else if (num === 2) { //  分配列表字段向下移动
          let flag = false
          for (let i = keys.length - 2; i > -1; i--) {
            if (t.optRightArr1.containsObj(keys[i]) && !t.optRightArr1.containsObj(keys[i + 1]) && i > -1) {
              keys.splice(i, 1, ...keys.splice(i + 1, 1, keys[i]))
              keys[i + 1]._checked = true
              flag = true
            }
          }
          if (flag) {
            t.data2 = keys
          }
        } else if (num === 3) { //  分配编辑字段向上移动
          let flag = false
          for (let i = 0; i < keys.length; i++) {
            if (t.optRightArr2.containsObj(keys[i]) && !t.optRightArr2.containsObj(keys[i - 1]) && i > 0) {
              keys.splice(i, 1, ...keys.splice(i - 1, 1, keys[i]))
              keys[i - 1]._checked = true
              flag = true
            }
          }
          if (flag) {
            t.data4 = keys
          }
        } else if (num === 4) { //  分配编辑字段向下移动
          let flag = false
          for (let i = keys.length - 2; i > -1; i--) {
            if (t.optRightArr2.containsObj(keys[i]) && !t.optRightArr2.containsObj(keys[i + 1]) && i > -1) {
              keys.splice(i, 1, ...keys.splice(i + 1, 1, keys[i]))
              keys[i + 1]._checked = true
              flag = true
            }
          }
          if (flag) {
            t.data4 = keys
          }
        }
      },
      /*
       * 移动字段数据到右侧
       * */
      toRight(num) {
        const t = this
        if (num === 1) { //  移动列表字段数据到右侧
          t.DuplicateRemove(t.selectColumns1, t.data2, num)
          // t.moveLeft(t.selectColumns1, t.data1)
        } else if (num === 2) { //  移动编辑字段数据到右侧
          t.DuplicateRemove(t.selectColumns3, t.data4, num)
          // t.moveLeft(t.selectColumns3, t.data3)
          // for (const dat in t.data4) {
          //   t.data4[dat].fieldauth = '02view'
          // }
        }
      },
      DuplicateRemove(arr1, arr2, num) {
        if (arr1.length !== 0) {
          for (const dat1 in arr1) {
            if (arr1[dat1].bfacompCompid) {
              for (const dat2 in arr2) {
                if (arr2[dat2].bfacompCompid) {
                  if (arr1[dat1].bfacompCompid === arr2[dat2].bfacompCompid) {
                    arr1.splice(dat1, 1)
                    // return
                  }
                }
              }
            }
          }
        }
        if (num === 2) {
          arr1.forEach((item, index) => {
            item['fieldauth'] = this.select[1].paramCode
          })
        }
        arr2.push(...arr1)
      },
      // 移动字段数据到右侧  end-----------------------------------
      // 右侧字段左移（删除）
      toLeft(num) {
        const t = this
        if (num === 1) {
          t.moveLeft(t.optRightArr1, t.data2) //  分配列表字段
          // t.data1.unshift(...t.optRightArr1)
        } else if (num === 2) {
          t.moveLeft(t.optRightArr2, t.data4, num) //  分配编辑字段
          // t.data3.unshift(...t.optRightArr2)
        }
      },
      // 向左移动字段公共方法
      moveLeft(arr1, arr2) {
        for (const dat1 in arr1) {
          if (arr1[dat1].bfacompCompid) {
            for (const dat2 in arr2) {
              if (arr2[dat2].bfacompCompid) {
                if (arr1[dat1].bfacompCompid === arr2[dat2].bfacompCompid) {
                  arr2.splice(dat2, 1)
                }
              }
            }
          }
        }
      },
      // 向左移动字段公共方法 end----------------------------------
      /*
       * 保存列表字段1
       * */
      saveClumns1() {
        const t = this
        const field = t.data1.map(item => {
          return item.id
        })
        getDataLevelUserLoginNew({
          _mt: 'paySalSetItem.changeOrder',
          payssiSsid: t.id,
          payssiC001: field.join(),
          logType: '修改',
        }).then((res) => {
          if (isSuccess(res, t)) {
            this.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '保存成功',
            })
            t.$emit('getdata')
            t.handleReset()
          }
        }).catch((res) => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: res,
          })
        })
      },
      handleReset() {
        const t = this
        t.selectColumns1 = []
        t.optRightArr1 = []
        t.data1 = []
        t.data2 = []
        t.$emit('closedistCountry')
      },
      // 左移已选择字段----------------------------------
      selectOpt2(selection) {
        this.optSelected2 = selection
      },
      // 向上、向下移已选择字段
      cancelSelect(selection, row) {
        if (row._checked) {
          for (let i = 0; i < this.data1.length; i++) {
            if (row.id === this.data1[i].id) {
              this.data1[i]._checked = false
            }
          }
        }
      },
      toTop(num) {
        const t = this
        const keys = []
        for (let i = 0; i < t.data1.length; i++) {
          keys.push(t.data1[i])
        }
        if (num === 1) {
          // 向上
          let flag = false
          console.log(t.optSelected2)
          console.log(keys)
          for (let i = 0; i < keys.length; i++) {
            if (t.optSelected2.containsObj(keys[i]) && !t.optSelected2.containsObj(keys[i - 1]) && i > 0) {
              keys.splice(i, 1, ...keys.splice(i - 1, 1, keys[i]))
              keys[i - 1]._checked = true
              flag = true
            }
          }
          if (flag) {
            t.data1 = keys
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
            t.data1 = keys
          }
        }
      },
      // 向上、向下移已选择字段--------------------------------
    },
  }

</script>
<style scoped lang="scss">
  @import "../../../sass/updateAndAdd";
  .col {
    height: 50px;
    overflow-y: auto;
    border: 1px #efefef solid;
    padding: 20px 10px;
  }

  .btnFa {
    padding-top: 100px;
    display: flex;
    justify-content: center;
  }
  .cover .box{
    width: 500px;
  }

</style>
