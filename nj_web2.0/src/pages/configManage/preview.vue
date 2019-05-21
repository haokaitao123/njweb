<template>
  <div class="cover">
    <!--{{platContent}}-->
    <div class="box" style="width: 700px;padding: 0;">
        <Button type="text" @click="reset" class="closebtn">
          <Icon type="close-round" color="#f2f2f2" size="18"></Icon>
        </Button>
        <div class="viewbg">
          <div class="viewbox">
            <div class="view">
              <div id="editorCon" class="txtarea" v-show="false"></div>
              <Input id="txtCon" class="mar_bot20" v-model="platContent" type="textarea"></Input>
              <!-- 1、逐个显示不分类 -->
              <div v-if="typeOne" class="typeOne">
                <div class="mar_bot20" v-for="(item, index) in ques1" :key="index">
                  <p class="tit">{{item.platQusDisorder}}{{item.platQusDescen}}</p>
                  <RadioGroup v-model="item.ans" class="optpadd">
                    <Radio v-for="(item2,index2) in item.listQuesasw" :key="index2" :label="item.id" class="opt">
                      {{item2.platQasAswercn}}
                    </Radio>
                  </RadioGroup>
                </div>
              </div>
              <!-- 2、逐个显示分类 -->
              <div v-if="typeTwo" class="typeTwo">
                <div v-for="(item, index) in ques2" :key="index">
                  <p class="tit2">{{item.platCatDesccn}}</p>
                  <div class="mar_bot20" v-for="(item2, index2) in item.listQues" :key="index2">
                    <p class="tit">{{item2.platQusDisorder}}{{item2.platQusDesccn}}</p>
                    <RadioGroup v-model="item2.ans" class="optpadd">
                      <Radio v-for="(item3,index3) in item2.listQuesasw" :key="index3" :label="item3.id" class="opt">
                        {{item3.platQasAswercn}}
                      </Radio>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <!-- 3、矩阵显示不分类 -->
              <div v-if="typeThree" class="typeThree">
                <div class="mar_bot20">
                  <div class="clearfix titindu">
                    <div class="indus indus1">  {{$t('lang_role.suvadmin.qplatQasAswercn')}}</div>
                    <div class="indus" v-for="(title, i) in ques3[0].listQuesasw" :key="i">{{title.platQasAswercn}}</div>
                  </div>
                  <div class="clearfix indusbox" v-for="(item, index) in ques3">
                    <div class="indus indus1 indus2">{{item.platQusDisorder}}{{item.platQusDesccn}}</div>
                    <div class="indus" v-for="(item2,index2) in item.listQuesasw" :key="index2">
                      <RadioGroup v-model="item.ans" style="display:block;text-align: center;">
                        <Radio :label="item2.id">{{item2.label}}</Radio>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 4、矩阵显示表格内分类 -->
              <div v-if="typeFour" class="typeFour">
                <div class="mar_bot20">
                  <div class="clearfix titindu">
                    <div class="indus indus1">  {{$t('lang_role.suvadmin.qplatQasAswercn')}}</div>
                    <div class="indus" v-for="(title, i) in ques4[0].listQues[0].listQuesasw" :key="i">
                      {{title.platQasAswercn}}
                    </div>
                  </div>
                  <div v-for="(item, index) in ques4" :key="index">
                    <p class="tit2 paddl_15">{{item.platCatDesccn}}</p>
                    <div class="clearfix indusbox" v-for="(item2, index2) in item.listQues" :key="index2">
                      <div class="indus indus1 indus2">{{item2.platQusDisorder}}{{item2.platQusDesccn}}</div>
                      <div class="indus" v-for="(item3, index3) in item2.listQuesasw" :key="index3">
                        <RadioGroup v-model="item2.ans" style="display:block;text-align: center;">
                          <Radio :label="item3.id">{{item3.label}}</Radio>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 5、矩阵显示分类显示表格 -->
              <div v-if="typeFive" class="typeFive">
                <div class="mar_bot20">
                  <div v-for="(item, index) in ques5" :key="index">
                    <p class="tit2 paddl_15">{{item.platCatDesccn}}</p>
                    <div class="clearfix titindu">
                      <div class="indus indus1">  {{$t('lang_role.suvadmin.qplatQasAswercn')}}</div>
                      <div class="indus" v-for="(title, i) in item.listQues[0].listQuesasw" :key="i">
                        {{title.platQasAswercn}}
                      </div>
                    </div>
                    <div class="clearfix indusbox" v-for="(item2, index2) in item.listQues" :key="index2">
                      <div class="indus indus1 indus2">{{item2.platQusDisorder}}{{item2.platQusDesccn}}</div>
                      <div class="indus" v-for="(item3, index3) in item2.listQuesasw" :key="index3">
                        <RadioGroup v-model="item2.ans" style="display:block;text-align: center;">
                          <Radio :label="item3.id">{{item3.label}}</Radio>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <h4 class="mar_bot20 tit">  {{$t('lang_role.suvadmin.opinion')}}</h4>
              <p class="mar_bot20 tit">  {{$t('lang_role.suvadmin.opinionconten')}}</p>
              <Input class="mar_bot20" v-model="option" type="textarea" :autosize="{minRows: 2,maxRows: 5}"></Input>
              <Button type="primary" class="mar_bot20">  {{$t('lang_role.suvadmin.primarysub')}}</Button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
  import E from 'wangeditor'
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2} from '../../axios/axios'
  import {isSuccess} from '../../lib/util'

  let editorCon = new E('#editorCon')
  export default {
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
          {id: '1', name: this.$t('lang_role.suvadmin.attitude1'), label: ''},
          {id: '2', name: this.$t('lang_role.suvadmin.attitude2'), label: ''},
          {id: '3', name: this.$t('lang_role.suvadmin.attitude3'), label: ''},
          {id: '4', name: this.$t('lang_role.suvadmin.attitude4'), label: ''},
          {id: '5', name: this.$t('lang_role.suvadmin.attitude5'), label: ''},
        ],
        ques1: [],          //  逐个显示不分类
        ques2: [],          //  逐个显示分类
        ques3: [],          //  矩阵显示不分类
        ques4: [],          //  矩阵显示表格内分类
        ques5: [],          //  矩阵显示分类显示表格
      }
    },
    props: {
      platId: String,
      platStyle: String,
      platContent: String,
    },
    components: {},
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
        editorCon.txt.append(t.platContent)
        document.getElementById('txtCon').innerHTML = editorCon.txt.html()
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
      getQue() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'platSurvery.getSurveryView',
          id: t.platId,
          logType: this.$t('button.ser'),
          platSuvStyle: t.platStyle,
        }).then((res) => {
          if (isSuccess(res, t)) {
            debugger
            console.log(res.data.content[0].listQuestion)
            console.log(res.data.content[0].listCategory)
            if (t.platStyle === 'p_suvstyle_01') {
              t.ques1 = res.data.content[0].listQuestion
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
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../sass/updateAndAdd";

  .box {
    width: 700px;
    height: 600px;
    overflow: hidden;
  }

  .closebtn {
    position: absolute;
    right: 0px;
    top: 0px;
  }

  .viewbg {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    /*height: 650px;*/
  }

  .viewbox {
    width: 700px;
    background: url('../../../static/img/viewbg.png') no-repeat;
    padding: 120px 30px 30px;
    border-radius: 10px;
  }

  .view {
    background: rgba(255, 255, 255, .5);
    border-radius: 10px;
    padding: 30px 50px;
  }

  .mar_bot20 {
    margin-bottom: 20px;
  }

  .tit {
    font-size: 14px;
    line-height: 25px;
  }

  .tit2 {
    font-size: 16px;
    color: #ff8e42;
    line-height: 40px;
  }

  .optpadd {
    padding-left: 30px;
  }

  .opt {
    padding-right: 15px;
    line-height: 25px;
  }

  .clearfix:after {
    content: "";
    display: table;
    line-height: 0;
    clear: both;
  }

  .titindu {
    background-color: #cfe8f3;
    padding: 20px 15px;
  }

  .indusbox {
    background-color: #f7f7f7;
    padding: 20px 15px;
  }

  .indus {
    float: left;
    font-size: 14px;
    font-weight: bold;
    width: 15%;
  }

  .indus1 {
    width: 25%;
  }

  .indus2 {
    font-size: 12px;
    line-height: 25px;
  }

  .paddl_15 {
    padding-left: 15px;
  }
</style>
