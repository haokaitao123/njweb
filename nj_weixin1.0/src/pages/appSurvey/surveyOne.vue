<template>
  <div class="cover">
    <div class="box">
      <Button type="text" @click="reset" class="closebtn"><Icon type="close-round" color="#f2f2f2" size="18"></Icon></Button>
      <div class="viewbg">
        <div class="viewbox">
          <Button type="primary" @click="openUp">新增</Button>
          <div class="headTitle">Service Satisfaction Survey</div>
          <div class="view">
            <div id="editorCon" class="txtarea" v-show="false"></div>
            <div v-html="dataTitle.platSuvContent" class="dataTitle" style="width: 100%;"></div>
            <!-- 1、逐个显示不分类 -->
            <div v-if="typeOne" class="typeOne">
              <div class="mar_bot20" v-for="(item, index) in ques1" :key="index">
                <p class="tit">{{item.platQusDisorder}}{{item.platQusDescen}}</p>
                  <div class="mar_bot20One" v-for="(item2,index2) in item.listQuesasw" :key="index2">
                    <mu-flex class="select-control-row">
                      <mu-radio :value="item2.id" @change="subMit()" v-model="item.platQusRadio"></mu-radio>
                    </mu-flex>
                    <span>
                      {{item2.platQasAswercn}}
                    </span>
                  </div>
              </div>
            </div>
            <h4 class="mar_bot20 tit">意见及建议</h4>
            <p class="mar_bot20 tit">您的意见及建议对我们极具价值，它将有利于提高我们的服务。如果您对 SIS 有其他的意见和建议，请填写在下面对话框内。非常感谢您的配合。</p>
            <div style="width: 100%;height: 10%;">
              <textarea name="" style="width: 100%;height: 100%;" id="" cols="55" rows="5"></textarea>
            </div>
            <div style="width: 100%">
              <button class="btn">提交</button>
            </div>
            <!--<Button type="primary" class="mar_bot20">【提交】</Button>-->
            <!--<div style="display: flex">-->
              <!--<p class="tit"><b>SIS 中国服务台</b></p>-->
              <!--<p class="tit">电话：×××××××××</p>-->
              <!--<p class="tit">地址：×××××××××</p>-->
              <!--<p class="tit">邮件：<span style="color:#2d8cf0; cursor: pointer;">×××××××××</span></p>-->
            <!--</div>-->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import E from 'wangeditor'
  import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelNone } from '../../axios/axios'
  import { isSuccess, getUrlKey } from '../../lib/util'

  let editorCon = new E('#editorCon')
  export default{
    data() {
      return {
        typeOne: false,     //  类型1逐个显示不分类
        typeTwo: false,     //  类型2逐个显示分类
        typeThree: false,   //  类型3矩阵显示不分类
        typeFour: false,    //  类型4矩阵显示表格内分类
        typeFive: false,    //  类型5矩阵显示分类显示表格
        ConRate: '1',       //  支持热线的接通率
        serAtt: '1',        //  服务态度
        quality: '1',       //  工程师服务质量
        option: '',         //  建议
        attitude: [
          {id: '1', name: '非常满意', label: ''},
          {id: '2', name: '比较满意', label: ''},
          {id: '3', name: '满意', label: ''},
          {id: '4', name: '不太满意', label: ''},
          {id: '5', name: '非常不满意', label: ''},
        ],
        ques1: [],          //  逐个显示不分类
        ques2: [],          //  逐个显示分类
        ques3: [],          //  矩阵显示不分类
        ques4: [],          //  矩阵显示表格内分类
        ques5: [],          //  矩阵显示分类显示表格
        platStyle: 'p_suvstyle_01',
        dataTitle:'',
        form:{
          radio:''
        },
        data:[
          {
            radio:false
          },
          {
            radio:false
          }

        ]
      }
    },
    props: {
      platId: String,
//      platStyle: String,
      platContent: String,
    },
    components: {
    },
    mounted() {
      // 创建正文富文本
      editorCon.create()
      this.showType()
    },
    methods: {
      reset() {
        this.$emit('closeView')
      },
      showType() {
        const t = this
//        editorCon.txt.append(t.platContent)
//        document.getElementById('txtCon').innerHTML = editorCon.txt.html()
        if (t.platStyle === 'p_suvstyle_01') {    //  类型1逐个显示不分类
          t.typeTwo = false
          t.typeThree = false
          t.typeFour = false
          t.typeFive = false
          t.typeOne = true
        } else if (t.platStyle === 'p_suvstyle_02') {    //  类型2逐个显示分类
          t.typeOne = false
          t.typeThree = false
          t.typeFour = false
          t.typeFive = false
          t.typeTwo = true
        } else if (t.platStyle === 'p_suvstyle_03') {    //  类型3矩阵显示不分类
          t.typeOne = false
          t.typeTwo = false
          t.typeFour = false
          t.typeFive = false
          t.typeThree = true
        } else if (t.platStyle === 'p_suvstyle_04') {    //  类型4矩阵显示表格内分类
          t.typeOne = false
          t.typeTwo = false
          t.typeThree = false
          t.typeFive = false
          t.typeFour = true
        } else if (t.platStyle === 'p_suvstyle_05') {    //  类型5矩阵显示分类显示表格
          t.typeOne = false
          t.typeTwo = false
          t.typeFour = false
          t.typeThree = false
          t.typeFive = true
        }
        // 显示题目
        t.getQue()
      },
      openUp() {
        const t = this
        let data = {
          _mt: 'platRecord.getLink',
          logType: '查询',
          companyId: 1000
        }
        getDataLevelNone(data).then((res) => {
          if (isSuccess(res, t)) {
            console.log(res)
          }
        }).catch(() => {
          this.$Modal.error({
            title: '错误',
            content: '网络错误',
          })
        })
      },
      getQue() {
//        alert(getUrlKey('empNo'))
//        alert(getUrlKey('surId'))
        let surId = getUrlKey('surId');
        let empNo = getUrlKey('empNo');
        const t = this
        let data = {
          _mt: 'platSurvery.getSurveryViewNone',
          id: surId,
          logType: '查询',
          platSuvStyle: 'p_suvstyle_02',
          companyId: 1000
        }
        getDataLevelNone(data).then((res) => {
          if (isSuccess(res, t)) {
            this.dataTitle = res.data.content[0]
            console.log(res.data.content[0].listQuestion)
            console.log(res.data.content[0].listCategory)
            if (t.platStyle === 'p_suvstyle_01') {
              t.ques1 = res.data.content[0].listQuestion
              console.log(t.ques1)
            } else if (t.platStyle === 'p_suvstyle_02') {
              t.ques2 = res.data.content[0].listCategory
            } else if (t.platStyle === 'p_suvstyle_03') {
              t.ques3 = res.data.content[0].listQuestion
            } else if (t.platStyle === 'p_suvstyle_04') {
              t.ques4 = res.data.content[0].listCategory
            } else if (t.platStyle === 'p_suvstyle_05') {
              t.ques5 = res.data.content[0].listCategory
            }

          }
        }).catch(() => {
          this.$Modal.error({
            title: '错误',
            content: '网络错误',
          })
        })
      },
    },
  }
</script>
<style lang="less" scoped>
  .cover{
    overflow: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    -webkit-overflow-scrolling: touch;
    outline: 0;
    width: 100%;
    height:100%;

    .box{
      position:relative;
      width: 100%;
      height: 100%;
      background-color: #fff;

      border-radius: 10px;
      .form{
        max-height: 800px;
        overflow-y: auto;
      }
      .title{
        display: flex;
        position: absolute;
        height: 40px;
        width: 100%;
        line-height: 40px;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
        top: 0;
        border-bottom: 1px solid #efefef;
        left: 0;
        .title-text{
          font-weight: bold;
          font-size: 14px;
        }
      }
    }
  }
  .btn{
    width:30%;
    background: #3399FF;
    color: white;
    font-size: 40px;
    height: 90px;
    line-height: 90px;
    outline: none;
    border:0;
    margin-top: 20px;
  }
  .dataTitle{
    font-size: 30px;
  }
  /*.box{width: 700px; height:600px;}*/
  .closebtn{ position: absolute;
    right: -40px;
    top: -10px;
  }
  .viewbg{
    width: 100%;
    height:100%;
    overflow-y: auto;
    overflow-x:hidden
  }
  .viewbox{
    width: 100%;
    height: 100%;
    background: url('../../../static/action/bg3.png') no-repeat;
    padding: 120px 30px 30px;
    border-radius: 10px;
    position: relative;
    .headTitle{
      position: absolute;
      right: 30px;
      top:30px;
      font-size: 40px;
      color: white;
    }
  }
  .view{
    background: rgba(255,255,255,.5);
    width: 100%;
    height: calc(100% - 100px);
    overflow-y: scroll;
    padding:30px 30px;
  }
  .typeOne{
    margin-top: 40px;
    .mar_bot20{
      margin-top: 20px;
      font-size: 30px;
      .mar_bot20One{
        display: flex;
        align-items: center;
        padding-left: 20px;
        margin-top: 20px;
      }
    }
  }

  .tit{
    font-size: 30px;
    line-height: 25px;
    margin-top: 40px;
  }
  .tit2{
    font-size: 16px;
    color: #ff8e42;
    line-height:40px;
  }
  .optpadd{
    padding-left: 30px;
  }
  .opt{
    padding-right: 15px;
    line-height:25px;
  }
  .clearfix:after{
    content: "";
    display: table;
    line-height: 0;
    clear:both;
  }
  .titindu{
    background-color: #cfe8f3;
    padding:20px 15px;
  }
  .indusbox{
    background-color: #f7f7f7;
    padding:20px 15px;
  }
  .indus{
    float: left;
    font-size: 14px;
    font-weight: bold;
    width:15%;
  }
  .indus1{
    width:25%;
  }
  .indus2{
    font-size:12px;
    line-height: 25px;
  }
  .paddl_15{
    padding-left: 15px;
  }
</style>
