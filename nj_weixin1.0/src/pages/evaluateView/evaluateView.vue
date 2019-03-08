<template>
  <div class="cover">
    <div class="box">
      <Button type="text" @click="reset" class="closebtn"><Icon type="close-round" color="#f2f2f2" size="18"></Icon></Button>
      <div class="viewbg">
        <div class="viewbox">
          <div class="headTitle">Service Satisfaction Survey</div>
          <div class="view">
            <div id="editorCon" class="txtarea" v-show="false"></div>
            <div v-html="dataTitle" class="dataTitle" style="width: 100%;"></div>
            <!-- 1、逐个显示不分类 -->
            <div class="typeOne">
              <div class="mar_bot20" v-for="(item, index) in ques1.list" :key="index">
                <p class="tit">{{item.proIndidDis}} <span class="titTitle">( {{item.proIndExplain}} )</span></p>
                <div class="mar_bot20One" v-for="(item2,index2) in item.list" :key="index2">
                  <div style="display: flex;justify-content: space-between">
                    <p>
                      {{item2.proIndidDis}}
                    </p>
                    <p>
                      <mu-text-field v-model="contentdict[item2.id]" placeholder="请填写您的分数"></mu-text-field>
                    </p>
                    <!--<input type="text" v-model="contentdict[item2.id]" placeholder="请填您的建议">-->
                  </div>
                </div>
              </div>
            </div>
            <!--<h4 class="mar_bot20 tit">意见及建议</h4>-->
            <!--<p class="mar_bot20 tit">您的意见及建议对我们极具价值，它将有利于提高我们的服务。如果您对 SIS 有其他的意见和建议，请填写在下面对话框内。非常感谢您的配合。</p>-->
            <!--<div style="width: 100%;height: 10%;">-->
              <!--<textarea name="" v-model="title" style="width: 100%;height: 100%;outline: none" id="" cols="55" rows="5"></textarea>-->
            <!--</div>-->
            <div style="width: 100%">
              <button class="btn" @click="btn" v-show="BtnShow">提交</button>
            </div>
          </div>
        </div>
      </div>
      <div class="Image" v-show="MaskIng">
        <div class="ImageChird" @click="ImageChird">
          <div class="ImageGrand"><img src="../../../static/main/cc.png" alt=""></div>
        </div>
      </div>
      <div class="Image1" v-show="MaskIng1">
        <div class="ImageChird1">
          <!--<div class="ImageGrand1">-->
            <!--您已提交成功！-->
          <!--</div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelNone, getDataLevelNoneNew } from '../../axios/axios'
  import { isSuccess, getUrlKey } from '../../lib/util'
  export default{
    data() {
      return {
        contentdict:[],
        ConRate: '1',       //  支持热线的接通率
        serAtt: '1',        //  服务态度
        quality: '1',       //  工程师服务质量
        option: '',         //  建议
        ques1: [],          //  逐个显示不分类
        ques2: [],          //  逐个显示分类
        ques3: [],          //  矩阵显示不分类
        ques4: [],          //  矩阵显示表格内分类
        ques5: [],          //  矩阵显示分类显示表格
        platStyle: 'p_suvstyle_02',
        dataTitle:'',
        title:'',
        Value: '',
        input:'',
        data:[],
        MaskIng:false,
        BtnShow: true,
        MaskIng1: false
      }
    },
    mounted() {
      this.getData()
    },
    created() {
      this.ques1.list.forEach(data => {
        this.contentdict[data.id]= null
      })
    },
    methods: {
      ImageChird() {
        this.MaskIng = false
      },
      reset() {
        this.$emit('closeView')
      },
      openUp() {
        const t = this
        let data = {
          _mt: 'evaluationRelation.getByIdNone',
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
      getData() {
        const t = this
        let data = {
          _mt: 'evaluationRelation.getByIdNone',
          logType: '查询',
          id: getUrlKey('relid')
        }
        getDataLevelNone(data).then((res) => {
          if (isSuccess(res, t)) {
            if (res.data.content[0].resState === '0') {
              this.getQueView()
            } else {
              this.MaskIng1 = true
//              this.MaskIng = true
              this.BtnShow = false
            }
          }
        }).catch(() => {
          this.$Modal.error({
            title: '错误',
            content: '网络错误',
          })
        })
      },
      getQueView() {
        const t = this
        let resid = getUrlKey('resid')
        let relid = getUrlKey('relid')
        let data = {
          _mt: 'evaluationResult.questionnaire',
          logType: '查询',
          companyId: 1000,
          resid: resid,
          relid: relid,
        }
        getDataLevelNone(data).then((res) => {
          if (isSuccess(res, t)) {
            this.dataTitle = res.data.content[0].resText
            t.ques1 = res.data.content[0]
          }
          console.log(this.form)
        }).catch(() => {
          this.$Modal.error({
            title: '错误',
            content: '网络错误',
          })
        })
      },
      btn() {
        const t = this
        //console.log((this.contentdict))
        this.data = []
        this.contentdict.forEach((index,id) =>{
          let obj = {}
          console.log(index)
          obj['proResult'] = index
          obj['id'] = id
          this.data.push(obj)

        })
        console.log(JSON.stringify(this.data))
        let data = {
          _mt: 'evaluationProinfo.saveScore',
          data: JSON.stringify(this.data),
          relId: getUrlKey('relid')
        }
        getDataLevelNone(data)
          .then(res =>{
            if (isSuccess(res,t)) {
              this.MaskIng = true
              this.BtnShow = false
            }
          }).catch(err =>{
          console.log(err)
        })
      }
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
  .Image{
    position: absolute;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.8);
    top:0;
    .ImageChird{
      width: 450px;
      height: 500px;
      background: url('../../../static/main/tjcg1.png') no-repeat;
      top:20%;
      left: 20%;
      z-index: 1000;
      position: absolute;
      .ImageGrand{
        position: absolute;
        right: 80px;
        top:20px;
        width: 50px;
        height:50px;
        img{
          width:100%;
          height:100%;
        }
      }
    }
  }
  .Image1{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background: url('../../../static/action/bg3.png') no-repeat;
    z-index: 2000;
    background: rgba(0,0,0,0.7);
    .ImageChird1{
      width: 400px;
      height: 500px;
      background: url('../../../static/main/mask.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      top:20%;
      left: 25%;
      z-index: 1000;
      position: absolute;
      .ImageGrand1{
        position: absolute;
        left:20%;
        bottom:30px;
        color: black;
        font-size: 36px;
      }
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
        /*display: flex;*/
        /*align-items: center;*/
        padding-left: 20px;
        margin-top: 20px;
      }
    }
  }

  .tit{
    font-size: 30px;
    line-height: 25px;
    margin-top: 40px;
    .titTitle{
      font-size: 20px;
    }
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
