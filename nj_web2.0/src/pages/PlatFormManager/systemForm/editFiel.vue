<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;自定义选项内容
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <!--<div class="content">-->
        <Row class="content">
          <Form :model="data.item" label-position="right" :label-width="100" v-for="(item,index) in data" :key="index" :rules="item.rule">
            <div class="input-box">
              <i-col span="10">
                <FormItem label="字段中文名称" prop="sffFieldNameCnDis" required>
                  <Input v-model="item.sffName" placeholder="请输入编号"></Input>
                </FormItem>
              </i-col>
              <i-col span="10" offset="1">
                <FormItem label="字段英文名称" prop="sffFieldNameEnDis" required>
                  <Input v-model="item.sffFieldNameEnDis" placeholder="请输入编号"></Input>
                </FormItem>
              </i-col>
              <!--<i-col span="1">-->
                <span @click="remove(index)" class="close-btn">
                  <Icon type="ios-close" size="18" color="red"></Icon>
                </span>
              <!--</i-col>-->
            </div>
          </Form>
        </Row>
      <!--</div>-->
      <div class="btn">
        <Button type="primary" icon="plus-round" @click="add">添加选项</Button>
        <Button type="primary" @click="save">{{$t('button.sav')}}</Button>
      </div>
    </div>
  </div>
</template>
<script>
  import { deepCopy } from '../../../lib/util'

export default {
  data() {
    const validorsffFieldNameCnDis = (rule, value, callback) => {
      console.log(this.data)
      if (this.data[rule.index].sffName === '') {
        callback(new Error(rule.message))
      } else {
        callback()
      }
    }
    const validorsffFieldNameEnDis = (rule, value, callback) => {
      console.log(this.data)
      if (this.data[rule.index].sffFieldNameEnDis === '') {
        callback(new Error(rule.message))
      } else {
        callback()
      }
    }
    return {
      validorsffFieldNameEnDis: validorsffFieldNameEnDis,
      validorsffFieldNameCnDis: validorsffFieldNameCnDis,
      data: [
        {
//          form: {
          sffName: '',
//          },
          rule: {
            sffName: [
//              { required: true, message: '请填写字段中文名', trigger: 'blur' },
              { validator: validorsffFieldNameCnDis, message: '请填写字段名称', trigger: 'blur', index: 0 },
            ],
          },
        },
      ],
      retureStr: '',
      showStr: '',
    }
  },
  methods: {
    add() {
      let a = this.data.length
      this.data.push(
        {
          sffName: '',
          rule: {
            sffName: [
              { validator: this.validorsffFieldNameCnDis, message: '请填写字段名称', trigger: 'blur', index: a },
            ],
          },
        },
      )
    },
    save() {
      const arr = deepCopy(this.data)
      const arrShow = []
      for (let i = 0; i < arr.length; i++) {
        const str1 = arr[i].sffName
        arr[i] = str1
        arrShow[i] = str1
      }
      this.retureStr = arr.join(';')
      this.showStr = arrShow.join(';')
      this.$emit('setsffCustopt', this.showStr, this.retureStr)
      this.close()
    },
    remove(index) {
      this.data.splice(index, 1)
    },
    clear() {
      this.data = [
        {
          sffName: '',
        },
      ]
      this.retureStr = ''
      this.showStr = ''
    },
    close() {
      this.$emit('close')
    },
  },
}
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";

  .cover{
    .box{
      width: 600px;
      .content{
        max-height: 300px;
        overflow-y: auto;
      }
        .input-box{
          position: relative;
          height: 57px;
        }
        .input-box:hover .close-btn{
          display: block;
        }
        .close-btn{
          z-index: 99;
          position: absolute;
          right: 20px;
          top: 6px;
          display: none;
          cursor: pointer;
        }
      .btn{
        margin-top: 10px;
        text-align: right;
      }
      input{
        cursor: default;
        font-size: 14px;
        outline: none;
        margin: 0 20px;
        -webkit-appearance: none;
        height: 31px;
        width: 100%;
        line-height: 31px;
        border-radius: 0;
        border: none;
      }
    }
  }
</style>
