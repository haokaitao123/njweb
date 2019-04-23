<template>
  <div class="cover">
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{logType}}
        </div>
        <!-- ❌按钮，也即取消 -->
        <Button type="text" @click="handleReset">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Form ref="form" :model="form" :rules="ruleValidate" :label-width="80" style="height:470px;">
        <!-- 发布日期 -->
        <!--<Row>-->
        <!--<Col span="24">-->
        <!--<Row style="margin-bottom: 0;">-->
        <!--<Col span="12" >-->
        <!--<FormItem prop="cmutNoticePublish" label="发布日期">-->
        <!--<DatePicker type="date" :disabled="editdisabled"
        :readonly="editdisabled" v-model="form.cmutNoticePublish"
        placeholder="请选择选择日期" class="width200"  ></DatePicker>-->
        <!--</FormItem>-->
        <!--</Col>-->
        <!--<Col span="8" offset="3" >-->
        <!--<FormItem prop="cmutPublishHour">-->
        <!--<TimePicker type="time" :disabled="editdisabled" :readonly="editdisabled"
        placeholder="请选择时间"  v-model="form.cmutPublishHour" ></TimePicker>-->
        <!--</FormItem>-->
        <!--</Col>-->
        <!--</Row>-->
        <!--</Col>-->
        <!--</Row>-->
        <Row>
          <Col span="10" >
          <!-- prop为要传入的字段 -->
          <FormItem
            label="生效日期"
            prop="noticePublish"
          >
            <DatePicker
              type="date"
              :disabled="editdisabled"
              :readonly="editdisabled"
              placeholder="请选择生效日期"
              :editable="false"
              v-model="form.noticePublish"
              style="width: 100%;"
            ></DatePicker>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem label="通知类型" prop="noticeType">
            <Select v-model="form.noticeType"
                    :disabled="editdisabled" class="width200"
                    placeholder="通知类型"
                    clearable>
              <Option :value="item.paramCode"
                      v-for="(item,index) in selectType"
                      :key="index"
                      @click="getPageByType(item.paramCode)">{{item.paramInfoName}}</Option>
            </Select>

          </FormItem>
          </Col>
          </Row>
        <Row>
          <Col span="10">
          <FormItem label="发布部门" prop="unitPid">
                <span @dblclick="clearPid(editdisabled)">
                  <Input
                    v-model="unitPidDis"
                    icon="search"
                    :disabled="editdisabled"
                    :readonly="true"
                    placeholder="请选择部门"
                    @on-click="pickData(editdisabled)"
                  />
                </span>
          </FormItem>
          </Col>
          <Col span="10" offset="1">
          <FormItem label="发布人" prop="noticePeople">
            <Input
              v-model="noticePeopleName"
              :readonly="true"
              :disabled="editdisabled"
              placeholder="默认当前用户"
            ></Input>
          </FormItem>
          </Col>
        </Row>
       <!-- 标题 -->
        <Row>
          <Col span="23">
            <FormItem label="标题" prop="noticeTitle">
              <Input
                v-model="form.noticeTitle"
                :disabled="editdisabled"
                placeholder="请输入标题"
              ></Input>
            </FormItem>
          </Col>
        </Row>
        <Row style="position:relative;z-index: 0;">
          <Col span="23">
            <FormItem label="内容" prop="noticeContent">
              <div id="editor" style="z-index: 0;"></div>
              <!--<div id="noticont" v-show="editdisabled" :disabled="editdisabled" :autosize="{minRows: 2,maxRows: 5}" style="border: #e4e5e7 solid 1px;border-radius:5px;background-color: #f3f3f3"></div>-->
              <div id="txt" v-model="form.noticeContent" v-show="false"></div>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="23">
          <FormItem label="附件上传" prop="noticeAttach">
            <Row>
              <i-col span="3" v-show="!editdisabled">
                <Upload :before-upload="handleUpload" action=" ">
                  <Button type="ghost" icon="ios-cloud-upload-outline" :disabled="editdisabled">{{$t('lang_platdoc.platDoc.plat_scan')}}</Button>
                </Upload>
              </i-col>
              <i-col span="20" >
               <span v-if="file !== ''" @dblclick="clearFile(editdisabled)">
               	<i-col span="22" >
               	<Input v-model="file.name" readonly="readonly" >
			    				<span slot="prepend">
			    					<Icon type="folder" size="16"></Icon>
			    				</span>
                  </Input>
			    			</i-col>
			    			<i-col span="2">
	               	<Button type="text"  @click="uploadLocalFile" v-if="loadingStatus">
				        		{{$t('lang_platdoc.platDoc.plat_upload')}}
				        	</Button>
				        	<Button type="text"  @click="downloadFile" v-if="!loadingStatus">
				        		{{$t('lang_platdoc.platDoc.plat_download')}}
				        	</Button>
               </i-col>
               </span>
              </i-col>
            </Row>
          </FormItem>
          </Col>
        </Row>
        <!-- <Row>
          <Col span="10">
            <FormItem :label="$t('状态')" prop="state">
              <Select
                v-model="form.state"
                :disabled="editdisabled"
                :placeholder="$t('请选择状态')"
                transfer
              >
                <Option
                  :value="item.paramCode"
                  v-for="(item,index) in CmutNoticeStatelist"
                  :key="index"
                >{{item.paramInfoCn}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row> -->
        <!-- 备注 -->
        <Row>
          <Col span="23">
            <FormItem label="备注">
              <Input
                v-model="form.note"
                :disabled="editdisabled"
                type="textarea"
                placeholder="请输入备注"
                :autosize="{minRows: 2,maxRows: 5}"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <Row style="margin-top:20px;">
        <Col span="22" offset="1">
          <Row type="flex" justify="end">
            <!-- 取消按钮 -->
            <Button
              type="ghost"
              @click="handleReset"
              style="margin-right: 8px"
            >取消</Button>
            <!-- 保存按钮 -->
            <Button type="primary" v-show="!editdisabled" @click="handleSubmit">保存</Button>
          </Row>
        </Col>
      </Row>
    </div>
     <transition name="fade">
      <searchOrgframe
        v-show="openPick"
        :searchCloumns="searchCloumns"
        :params="params"
        @closeUp="close"
        @changeinput="changeinput"
        ref="searchOrgframe"
      ></searchOrgframe>
    </transition>
  </div>
</template>
<script>

import E from "wangeditor";
import { getDataLevelUserLoginNew, getDataLevelUserLogin, uploadFile } from '../../../axios/axios'
import { isSuccess, deepCopy } from '../../../lib/util'
import searchOrgframe from "../../../components/searchTable/searchOrgframe";

let editor = new E("#editor");
export default {
  data() {
    return {
      date1: "",
      date2: "",
      editdisabled: false,
      CmutNoticeStatelist: [],
      file: '',
      filekey: '',
      loadingStatus: false,
      noticePeopleName:'',
      form: {
        _mt: "orgNotice.addOrUpd",
        logType: "新增",
        // createTime: "",
        noticePublish: "", //  失效日期
        noticeType: "", //  类型
        noticeContent: "", //  发布内容
        note: "", //  备注
        unitPid: "",
        unitPidDis:"",
        state: "101",
        noticePeople:""
      },
      ruleValidate: {
        // noticePublish: [
        //   {
        //     required: true,
        //     type: "date",
        //     message: this.$t("请选择日期"),
        //     trigger: "change"
        //   }
        //   // { validator: validatePass1, message: '开始日期要小于结束日期', trigger: 'change' },
        // ],
        // createTime: [
        //   {
        //     required: true,
        //     message: this.$t("请选择创建时间"),
        //     trigger: "change"
        //   }
        // ],
        noticePublish: [
          {
            required: true,
            type: "date",
            message: "请选择生效日期",
            trigger: "change"
          }
          // { validator: validatePass2, message: '结束日期不能小于开始日期', trigger: 'change' },
        ],
        // noticeType: [
        //   {
        //      required: true,
        //     message: "请选择通知类型",
        //     trigger: "change"
        //   }
        // ],
        noticeTitle: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        unitPid: [
          { required: true, message: "请选择发布部门", trigger: 'change' },
        ],
        noticeType: [
            { required: true, message: "请选择通知类型", trigger: 'change' },
          ],
        noticeContent: [
          {
            required: true,
            message: "请输入发布内容",
            trigger: "blur"
          }
        ]
      },
      params: {
        _mt: "orgUnits.getByOrgFramePageList",
        sort: "id",
        order: "desc",
        rows: 10,
        page: 1,
        funId: "1",
        logType: "组织架构查询",
        data: "{}",
        unitPid: 0
      },
      unitPidDis: '',
      file: "",
      openPick: false,
      searchCloumns: [
        {
          title: "组织编码",
          key: "unitCode",
          sortable: "custom"
        },
        {
          title: "组织名称",
          key: "unitFname"
        },
        {
          title: "组织类型",
          key: "unitTypeName"
        }
      ],
    };
  },
  props: {
    selectType: Array,
    id: Number,
    logType: String,
    index: Number,
    state: String
  },
  computed: {},
  components: {
    searchOrgframe
  },
  mounted() {
    //this.getSelectUser();
    editor.customConfig.onchange = function(html) {
      document.getElementById("txt").innerHTML = html;
    };
    editor.create();
    console.log(this.form.state,"form")
  },
  methods: {
    clearFile (ckdis) {
      if(!ckdis){
        this.$Modal.confirm({
            title: this.$t("reminder.remind"),
            content: "是否清除已上传的附件",
            onOk: () => {
            this.file = ""
            this.filekey = ""
            this.form.noticeAttach = ""
          this.loadingStatus = false;
        },
          onCancel: () => { }
        })
      }

    },
    clearPid(ckdis) {
      const t = this;
      if(!ckdis){
        t.unitPidDis= "";
        t.form.unitPid = "";
      }
    },//清除数据
    close() {
      const t = this;
      t.openPick =false;
    },//关闭弹窗
    pickData(ckdis) {
        const t = this;
        if(ckdis){
          t.openPick =false;
        }else{
          t.$refs.searchOrgframe.getData(this.params);
          t.openPick = true;
        }

    },//打开弹窗
    changeinput(name, id) {
      const t = this;
      t.unitPidDis = name;
      t.form.unitPid = id;
    },//选择部门事件
    handleUpload(file) {
      this.file = file
      this.loadingStatus = true
      return false
    },
    //上传
    uploadLocalFile() {
      const t = this
      const formData = new FormData()
      formData.append('upfile', t.file)
      console.log(formData)
      uploadFile(formData).then(res => {
        for (const key in res.data) {
        t.file =  { name: key }
        t.filekey = res.data[key]
        t.form.noticeAttach = key + ':' + res.data[key]
      }
      t.$Modal.success({
        title: this.$t('reminder.suc'),
        content: '上传成功',
        onOk: () => {
        t.loadingStatus = false
      },
      })
      }).catch(() => {
        t.$Message.error(this.$t('reminder.errormessage'))
      })
     },
    //下载
    downloadFile() {
      const t = this
      let data = {
        _mt: 'userMgmt.getfiletoken',
        isprivate: true,
        logType: '导出',
        filekey: t.filekey,
        expiresecs: 180,
      }
      getDataLevelUserLogin(data).then((res) => {
        if (isSuccess(res, t)) {
        localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList));
        console.log((pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)),"213")
        if (this.isIE()) {
          window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
        } else {
          let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filekey)
          /*let link = document.createElement('a')
          link.href = doclink
          link.download = 'downloadfiletemp'
          link.click()*/
          let link = document.createElement('a')
          link.href = doclink
          link.download = 'downloadfiletemp'
          link.setAttribute('download', 'downloadfiletemp');
          document.body.appendChild(link);
          link.click();
        }
        this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
        localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
      }
    }).catch(() => {
        t.$Message.error(this.$t('reminder.errormessage'))
    })
    },
    getSelectUser() {
      const t = this;
      getDataLevelUserLogin({
          _mt: "orgNotice.getUserName",
          logType: "查询"
        })
          .then(res => {
          if (isSuccess(res, t)) {
          t.noticePeopleName = res.data.content[0].value;
          t.form.note = res.data.content[0].note;
        }
      })
      .catch(() => {
        t.$Message.error(this.$t('reminder.errormessage'))
      });
    },
    upData(id) {
      const t = this;
      getDataLevelUserLogin({
        _mt: "orgNotice.getById",
        id: id,
        logType: "修改"
      })
        .then(res => {
          if (isSuccess(res, t)) {
            // t.form.createTime = res.data.content[0].createTime;
            t.form.noticePublish = res.data.content[0].noticePublish;
            t.form.noticeType = res.data.content[0].noticeType;
            t.form.noticeTitle = res.data.content[0].noticeTitle;
            t.form.noticeContent = res.data.content[0].noticeContent;
            t.form.unitPid =res.data.content[0].unitPid;
            t.unitPidDis =res.data.content[0].unitPidDis;
            t.form.state = res.data.content[0].state;
            t.noticePeopleName=res.data.content[0].noticePeopleDis;

            if (res.data.content[0].noticeAttach) {
              t.file = { name: res.data.content[0].noticeAttach.split(':')[0] }
              t.filekey = res.data.content[0].noticeAttach.split(':')[1]
            }
            if (t.form.state !== "101") {
              t.editdisabled = true;
            }else{
              t.editdisabled = false;
            }
            //document.getElementById("noticont").innerHTML = t.form.noticeContent;
            t.form.note = res.data.content[0].note;
            editor.txt.append(t.form.noticeContent);
            document.getElementById("txt").innerHTML = t.form.noticeContent;
          }
        })
        .catch(() => {
        t.$Message.error(this.$t('reminder.errormessage'))
        });
    },//修改
    handleSubmit() {
      const t = this;
      t.form.noticeContent = document.getElementById("txt").innerHTML; //  获取发布内容
      t.$refs.form.validate(valid => {
        if (valid) {
          // t.form.noticePublish = t.form.noticePublish.format('yyyy-MM-dd')  //  获取发布日期
          t.form.noticePublish = t.form.noticePublish.format(
            "yyyy-MM-dd"
          ); //  获取失效日期

          const data = deepCopy(t.form);
          data.logType = t.logType;
          if (t.logType === this.$t("button.upd")) {
            data.id = t.id;
          }
          getDataLevelUserLoginNew(data)
            .then(res => {
              if (isSuccess(res, t)) {
                if (t.logType === this.$t("button.add")) {
                  t.$Message.success(this.$t('reminder.addsuccess'))
                  t.$emit("getData", res.data.content[0]);
                } else {
                  t.$Message.success(this.$t('reminder.updsuccess'))
                  t.$emit("update", res.data.content[0]);
                }
                t.handleReset();
              }
            })
            .catch(() => {
            t.$Message.error(this.$t('reminder.errormessage'))
            });
        }
      });
    },//保存
    handleReset() {
      const t = this;

      const data = deepCopy(t.form)
      data.logType = t.logType
      if (t.logType === this.$t('button.upd')) {
        data.id = t.id
      }
      // t.form.noticePublish = "";
      // t.form.createTime = "";
      t.form.noticePublish = "";
      t.form.noticeType = "";
      t.form.noticeTitle = "";
      t.form.noticeContent = "";
      t.form.state = "";
      t.form.note = "";
      t.unitPidDis = '';
      t.form.unitPid = '';
      t.noticePeopleName='';
      editor.txt.clear();
      t.file = "";
      this.$refs.form.resetFields();
      t.$emit("closeUp");
    }//关闭窗口
  }
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd";
.cover .box {
  padding-bottom: 0px;
  padding-bottom: 20px;
}
.cover .box form {
  max-height: 600px;
  overflow-y: auto;
  padding: 20px;
}
</style>
