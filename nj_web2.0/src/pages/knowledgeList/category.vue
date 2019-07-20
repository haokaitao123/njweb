<template>
    <div class="table">
        <Row>
            <Col span="24">
            <card>
                <p slot="title">
                    <Icon type="mouse"></Icon>&nbsp;知识库
                </p>
                <Row>
                    <Col span="4"
                         class="colTree">
                    <div>
                        <Select style="width: 170px;"
                                v-model="keyword"
                                filterable
                                @keyup.enter.native="knowEvent"
                                :remote=true
								 clearable
                                :remote-method="remoteMethod1"
                                :loading="loading1">
                            <Option v-for="(option, index) in options1"
                                    :value="option.name"
                                    :key="index">{{option.name}}</Option>
                        </Select>
                        <i-button style="margin-top: -52px; display: inline-block;margin-left: 180px;"
                                  type="primary"
                                  @click="addEvent"
                                  icon="android-add">新增</i-button>
                    </div>
                    <div class="divtree"
                         :style="{height:treeheight + 'px'}">
                        <Tree v-if="dataTree != ''"
                              :data="dataTree"
                              @on-select-change="selectChange"></Tree>
                        <Spin v-if="loading"
                              size="large"
                              :style="{height:treeheight + 'px'}"></Spin>
                    </div>
                    </Col>
                    <Col span="21"
                         style="width: 81.3333% !important">
                    <Row>
                        <Input placeholder="请输入文章名称"
                               style="width: 200px"
                               @keyup.enter.native="enterEvent"
                               v-model="keywordr" />
                        <Input placeholder="请输入内容"
                               style="width: 200px"
                               @keyup.enter.native="contSearh"
                               v-model="keywords" />
                        <i-button style="margin-top: 0px;margin-left: 30px;"
                                  type="primary"
                                  @click="collects"
                                  icon="ios-heart-outline">我的收藏</i-button>
                        <i-button style="margin-top: 0px; display: inline-block;margin-left: 30px;"
                                  type="primary"
                                  @click="addContent"
                                  icon="android-add">新增内容</i-button>
                    </Row>
					<row style="margin-left: 51%;"><div class="option">
					
							<div class="icons">		
							 <Icon size="30" style="margin: 20px;" @click="fullScreen" class="fullScreen" type="arrow-expand"></Icon>
							 <Icon size="30" style="margin: 20px;" @click="smallScreen" class="smallScreen" type="arrow-shrink"></Icon>
							</div>
							   <div class="operation">
							       <div class="item-list">
							           <div class="items">
							               <Icon size=30
							                     @click="like"
							                     class="heart"
							                     type="ios-heart"></Icon>
							               <div>收藏</div>
							           </div>
							           <div class="items">
							               <Icon size=30
							                     @click="will"
							                     class="zan"
							                     type="thumbsup"></Icon>
							               <div>点赞</div>
							           </div>
							       </div>
							   </div>
							   </div></row>
                    <row class="table-form"
                         ref="table-form">
                        <Table @on-selection-change="selectedtable"
                               class="tabStyle"
                               :row-class-name="rowClassName"
                               @on-sort-change="sortable"
                               @on-row-click="selectEvent"
                               :height="tableheight"
                               size="small"
                               border
                               ref="selection"
                               :columns="columns"
                               :data="TabData"
                               :loading="loading"></Table>
                        <div class="right-div"
                            :style="{height:tableheight + 'px'}"
                             v-show="divShow">
							 
                            <div class="heads">内容详情</div>
                        
                            <div class="item-title">
                                <p>标题:&nbsp;&nbsp;{{contentShow.title}}</p>
                            </div>
                            <div class="item-content">
                                内容:
                                <p id="myContent">
                                </p>
                            </div>
                            <div class="item-list">
                                <p>时间:&nbsp;&nbsp;{{contentShow.created}}</p>
                            </div>
                            <div class="item-list">
                                <p>点击数:&nbsp;&nbsp;{{contentShow.clicked}}</p>
                            </div>
                            <div class="item-list">

                            </div>
                            <!-- <div class="item-list">
                                <p>发布人:&nbsp;&nbsp;{{contentShow.unitCityName}}</p>
                            </div>
                            <div class="item-list">
                                <p>创建人:&nbsp;&nbsp;{{contentShow.unitInvdate}}</p>
                            </div> -->
                            <div class="link">

                            </div>
                        </div>
                    </row>
                    <Row style="display: flex">
                        <Page :total="total"
                              :showTotal="showTotal"
                              size="small"
                              :current="page"
                              show-elevator
                              show-sizer
							  v-show="pageShow"
                              placement="top"
                              @on-page-size-change="sizeChange"
                              @on-change="pageChange"
                              :page-size=rows
                              :page-size-opts="[10, 20, 50, 100]"></Page>
                        <Button type="ghost"
                                size="small"
                                shape="circle"
                                icon="refresh"
								v-show="pageShow"
                                style="margin-left: 20px;display: inline-block;"
                                @click="getTable()"></Button>
                    </Row>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
        <transition name="fade">
            <newupdate v-show="openUpdates"
                       :logTypes="logTypes"
                       @closeUp="closeUps"
                       @getData="addNewArray"
                       @update="updateArray"
                       ref="newupdate"></newupdate>
        </transition>
    </div>
</template>
<script>
import { isSuccess } from "@/lib/util"
import expdow from "@/components/fileOperations/expdow";
import newupdate from './orgframeEdit'
import {
    getDataLevelUserLoginNew,
    getDataLevelUserLogin,
    getKnowledgeGet,
    getKnowledgePost
} from "@/axios/axios";
export default {
    components: {
        newupdate
    },
    data () {
        return {
            tableOperate: false, //加上这个变量
            // 导入的mt名称
            imp_mt: "orgUnits.importData",
            // 导出字段设置, code字段名 name列名
            // 导入导出默认参数 无需变更
            searchs: "",
            openImport: false,
            openExpDow: false,
            openExp: false,
            filekey: "",
            filename: "",
            divShow: false,
            //左边树的默认参数
            openChart: false,
            dataTree: [],
            treeheight: document.body.offsetHeight - 260,
            //子页面所需参数，无需变更
            tableheight: document.body.offsetHeight - 290,
            value: "",
            page: 0,
            logType: "",
            openUpdate: false,
            updateId: NaN,
            tableselected: [],
            dropdownMenuList: [], //状态下拉选择框数据
            unitTypeData: [], //组织类型下拉选择框数据
            statusDis: "",
            unitTypeId: NaN,
            status: "",
            unitPid: "",
            addShow: false,
            addconShow: false,
            ifShow: false,
            selection: [],
            openUpdates: false,
            updateIds: NaN,
            itemId: NaN,
            logTypes: "",
            tabIndex: NaN,
            loading1: false,
            keyword: "",
            keywordr: "",
            keywords: "",
            options1: [],
            contentShow: [],
			pageShow:true,
            columns: [
                {
                    title: "标题",
                    key: "title",
                    width: 400,
                },
                {
                    title: "点击数",
                    width: 60,
                    key: "clicked",
                },
                {
                    title: "点赞数",
                    width: 60,
                    key: "unitCode",
                },
                // {
                //     title: "创建时间",
                //     key: "created",
                //     width: 140
                // },
                // {
                //     title: "失效时间",
                //     key: "unitCityName",
                //     width: 140
                // },
            ],
            tabShow: false,
            TabData: [],
            data: [],
            detList: [],
            total: 0,
            showTotal: true,
            index: 0,
            sort: "id",
            order: "desc",
            rows: 20,
            TreeId: '',
            funId: "1000",
            unitCode: "",
            compFnameCnDis: "",
            treeid: "",
            empnhName: "",
            unitFname: "",
            unitType: "",
            openPick: false,
            knowledgeId: '',
            params: {
                _mt: "orgUnits.getByOrgFramePageList",
                sort: "id",
                order: "asc",
                rows: 10,
                page: 1,
                funId: "1",
                logType: "组织架构查询",
                data: "{}",
                unitPid: 0
            },
            modify: "false",
            state: this.modity,
            loading: false
        };
    },
    computed: {
        // pageShow () {
        //     return this.btnOperate.pageShow;
        // },
        tableButton () {
            return this.$store.state.btnOperate.tableButton;
        },
        modity () {
            //  初始默认下拉选择状态（页面没有下拉状态选择，则无需添加）
            return this.$store.state.btnOperate.modity;
        },
        btnData () {
            return this.$store.state.btnOperate.btnData;
        },
        FlowNode () {
            return this.$store.state.btnOperate.isFlowNode;
        }
    },
    created () {
        this.openUps()
    },
    mounted () {
        this.getTable()
        //this.getTree();
        this.getTreedata()
        // this.getSelect();
    },
    watch: {
        // pageShow (val) {
        //     if (val === "" && this.tableOperate === true) {
        //         this.columns.pop();
        //         this.tableOperate = false;
        //     }
        // }
    },
    methods: {
		fullScreen(){
			var righDiv = document.querySelector(".right-div");
			var tabStyle = document.querySelector(".tabStyle");
			var fullScreen = document.querySelector(".fullScreen");
			var smallScreen = document.querySelector(".smallScreen");
			this.pageShow = false;
			smallScreen.style.display = "block";
			fullScreen.style.display = 'none';
			tabStyle.style.display = 'none';
			righDiv.style.width = '100%';
		},
		smallScreen(){
			var tabStyle = document.querySelector(".tabStyle");
			tabStyle.style.display = 'block';
			var smallScreen = document.querySelector(".smallScreen");
			smallScreen.style.display = "none";
			var fullScreen = document.querySelector(".fullScreen");
			fullScreen.style.display = 'block';
			var operation = document.querySelector(".operation");
			operation.style.marginLeft = "80%"
			this.pageShow = true;
			
		},
        selectEvent (selection) {
            var oDiv = document.querySelector(".zan");
            oDiv.style.color = '#000000'
            var oDivs = document.querySelector(".heart");
            oDivs.style.color = '#000000'
            console.log(selection)
            const t = this;
            this.knowledgeId = selection.id
            this.TabData.forEach(function (currentValue, index, arr) {
                if (currentValue.id == selection.id) {
                    t.contentShow = selection;
                    //t.detList = row
                    t.tabIndex = index;
                    document.getElementById('myContent').innerHTML = t.contentShow.content
                }
            })
        },
        rowClassName (row, index) {
            if (index === this.tabIndex) {
                return 'demo-table-info-row';
            }
            return '';
        },
        addEvent () {
            const t = this;
            t.openUpdates = true;
            t.addShow = true;
            t.ifShow = false;
            t.logTypes = "新增"
            t.$refs.newupdate.newAdd()
        },
        addContent () {
            const t = this;
            t.openUpdates = true;
            t.addShow = false;
            t.ifShow = false;
            t.addconShow = true;
            t.logTypes = "新增内容"
            t.$refs.newupdate.addContent()
        },
        remoteMethod1 (query) {
            //console.log('/',query)
            if (query !== '') {
                this.getEvent(query)
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    this.options1 = [];
                    console.log(this.list, "this.list");
                    console.log(query, "query")
                    for (var i = 0; i < this.list.length; i++) {
                        if (this.list[i].name.includes(query)) {
                            this.options1.push(this.list[i]);
                        }
                    }
                }, 200);
            } else {
                this.options1 = [];
            }
        },
        getEvent (query) {
            const t = this
            console.log(query, "t.keyword")
            getKnowledgeGet('ry/knowledgeCategory/getPersonKnowledgeCategoryTree', {
                nameLike: query,
                page: '1',
                size: '9999',
                sort: 'asc',
            })
                .then((res) => {
                    console.log(res, "reskk")
					if(res.data.content[0].length > 0){
						t.list = res.data.content[0];
					}
                    console.log(t.list)
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getTreedata () {
            const t = this
            getKnowledgeGet('ry/knowledgeCategory/getPersonKnowledgeCategoryTree', {
                nameLike: this.keyword
            })
                .then((res) => {
                    if(res.data.content[0].length > 0){
						  t.dataTree = t.toTree(res.data.content[0]);
					}
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        like () {
			const t = this;
            var readyData = {
                categoryId: this.treeid,
                knowledgeId: this.knowledgeId,
                staffId: this.$store.state.user.userId
            };
			console.log('id',readyData)
            console.log('readyData', readyData)
            getKnowledgePost('ry/operationKnowledge/collection', {
                readyData
            })
                .then(function (response) {
                    console.log(response);
                    var oDivs = document.querySelector(".heart");
                    oDivs.style.color = "red";
					//t.getTable(t.treeid);
                })
                .catch(function (error) {
                    t.$Message.error('保存失败');
                    console.log(error);
                });
        },
        will () {
            const t = this;
            var readyData = {
                knowledgeId: this.knowledgeId,
                staffId: this.$store.state.user.userId
            };
            console.log('readyData', readyData)
            getKnowledgePost('ry/operationKnowledge/praise', {
                readyData
            })
                .then(function (response) {
                    console.log(response);
                    var oDiv = document.querySelector(".zan");
                    oDiv.style.color = "blue";
					//t.getTable(t.treeid);
                })
                .catch(function (error) {
                    t.$Message.error('保存失败');
                    console.log(error);
                });

        },
        collects () {
            const t = this;
            t.openUpdates = true
            t.logTypes = "收藏列表"
            t.$refs.newupdate.colEvent()
        },
        //enter事件
        enterEvent (e) {
            this.getTable()
        },
        knowEvent (e) {
            this.getTreedata()
            this.list = []
        },
        getTable (id, page) {
            console.log(id)
            const t = this
            t.TreeId = id
            t.page = page
            getKnowledgeGet('ry/knowledge/search', {
                titleLike: this.keywordr,
                categoryId: t.TreeId,
                page: t.page,
                size: '20',
                sort: 'asc',
            })
                .then((res) => {
                    console.log(res);
                    t.TabData = res.data.content[0].rows[0];
                    if (res.data.content[0].rows[0][0]) {
                        t.contentShow = res.data.content[0].rows[0][0];
						t.treeid = res.data.content[0].rows[0][0].categoryId;
						t.knowledgeId = res.data.content[0].rows[0][0].id;
						
						//console.log('t.TreeId',res.data.content[0].rows[0][0].categoryId)
                        document.getElementById('myContent').innerHTML = t.contentShow.content
                        console.log(t.contentShow, "t.contentShow")
                        t.divShow = true;
                    } else {
                        t.divShow = false;
                    }
                    console.log('123', t.TabData.length)
                    t.total = res.data.content[0].total;
                    t.page = res.data.content[0].page;
                    t.records = res.data.content[0].records;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        contSearh () {
            const t = this
            getKnowledgeGet('ry/knowledge/search', {
                contentLike: this.keywords,
                page: '1',
                size: '20',
                sort: 'asc',
            })
                .then((res) => {
                    console.log(res, "res")
                    t.TabData = res.data.content[0].rows[0];
                    if (res.data.content[0].rows[0][0]) {
                        t.contentShow = res.data.content[0].rows[0][0];
                        t.divShow = true;
                    } else {
                        t.divShow = false;
                    }
                    console.log('123', t.TabData.length)
                    t.total = res.data.content[0].total;
                    t.page = res.data.content[0].page;
                    t.records = res.data.content[0].records;
                    t.total = res.data.content[0].records;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        pickData () {
            const t = this;
            t.$refs.searchOrgframe.getData(this.params);
            t.openPick = true;
        }, //点击组织架构图
        changeinput (name, id, costname, costid) {
            const t = this;
            t.openPick = false;
            t.$refs.orgframeChart.getData(id);
            t.openChart = true;
        }, //输入框
        closeFrame () {
            const t = this;
            t.openPick = false;
        }, //关闭Frame
        closeChart () {
            this.openChart = false;
        }, //关闭组织架构图
        getTree () {
            const t = this;
            const data = {
                _mt: "orgUnits.getTree",
                rows: "100",
                page: "1",
                sort: "unitCode",
                order: "asc",
                logType: this.$t("button.ser"),
                id: "0",
                state: t.modity
            };
            for (const dat in data) {
                if (data[dat] === "") {
                    delete data[dat];
                }
            }
            getDataLevelUserLoginNew(data)
                .then(res => {
                    if (isSuccess(res, t)) {
                        console.log(res, 'res')
                        t.loading = false;
                        setTimeout(() => {
                            console.log('res.data.content[0].value', res.data.content[0].value)
                            t.dataTree = t.toTree(res.data.content[0].value);
                            console.log(t.dataTree, 't.dataTree')
                        }, 500);
                    }
                })
                .catch(() => {
                    // t.$Modal.error({
                    //     title: this.$t("reminder.err"),
                    //     content: this.$t("reminder.errormessage")
                    // });
                    this.$Message.error(this.$t("reminder.errormessage"));
                });
        },
        /* 树点击事件 */
        selectChange (e) {
            console.log('e', e[0].id)
            //const t = this
            // t.logTypes = "修改"
            // t.$refs.newupdate.revise(e)
            // t.openUpdates = true;
			var oDiv = document.querySelector(".zan");
			oDiv.style.color = '#000000'
			var oDivs = document.querySelector(".heart");
			oDivs.style.color = '#000000'
            //this.treeid = e.id;
            this.page = 1;
            if (e[0].id) {
                this.getTable(e[0].id);
            }
        },
        /* 把后台数据转化为tree的格式 */
        toTree (data) {
            data.forEach(item => {
                item.title = item.name;
                delete item.children;
            });
            const map = {};
            data.forEach(item => {
                map[item.id] = item;
            });
            const val = [];
            data.forEach(item => {
                const parent = map[item.pid];
                if (parent) {
                    (parent.children || (parent.children = [])).push(item);
                } else {
                    val.push(item);
                }
            });
            console.log(val, 'val')
            return val;
        },
        addNewArray (res) {
            const t = this;
            t.data.unshift(res);
            t.getTree();
        },
        updateArray (res) {
            const t = this;
            t.data.splice(t.index, 1, res);
            t.getTree();
        },
        sortable (column) {
            console.log('column', column)
            this.sort = column.key;
            console.log(this.sort)
            this.order = column.order;

            if (this.order !== "normal") {
                this.getData(this.treeid);
            } else {
                this.order = "desc";
            }
        }, //排序
        sizeChange (size) {
            const t = this;
            t.rows = size;
            t.getData(this.treeid);
        }, //分页
        pageChange (page) {
            const t = this;
            t.page = page;
			var oDiv = document.querySelector(".zan");
			oDiv.style.color = '#000000'
			var oDivs = document.querySelector(".heart");
			oDivs.style.color = '#000000'
            t.getTable(this.treeid, t.page);
        }, //分页
        selectedtable (selection) {
            const newArr = [];
            this.selection = selection
            for (let i = 0; i < selection.length; i++) {
                newArr.push(selection[i].id);
            }
            console.log(newArr, "newArr");
            this.tableselected = newArr;

        }, //列表中选中的item
        deletemsg () {
            const t = this;
            if (t.tableselected.length === 0) {
                // t.$Modal.warning({
                //   title: this.$t("reminder.remind"),
                //   content: this.$t("reminder.leastone")
                // });
                this.$Message.warning('请至少选择一条数据');
            } else {
                t.$Modal.confirm({
                    title: this.$t("reminder.remind"),
                    content: this.$t("reminder.confirmdelete"),
                    onOk: () => {
                        getDataLevelUserLogin({
                            _mt: "orgUnits.delByIds",
                            funId: "1",
                            logType: this.$t("button.del"),
                            delIds: t.tableselected.toString()
                        })
                            .then(res => {
                                if (isSuccess(res, t)) {
                                    t.tableselected = [];
                                    t.getData();
                                    t.getTree();
                                    this.$Message.success(this.$t("reminder.deletesuccess"));
                                }
                            })
                            .catch(() => {
                                this.$Message.error(this.$t("reminder.errormessage"));
                            });
                    },
                    onCancel: () => { }
                });
            }
        },
        openUps () {
            // var t = this;
            // t.ifShow = true;
            // t.logTypes = "信息列表"
            // t.openUpdates = true;
        },
        closeUps () {
            const t = this;
            t.openUpdates = false;
        },
        closeUp () {
            const t = this;
            t.openUpdate = false;
            t.$refs.update.formValidate.unitCode = "XXXXXX";
            t.$refs.update.formValidate.unitType = "";
            t.$refs.update.formValidate.unitFname = "";
            t.$refs.update.formValidate.empId = "";
            t.$refs.update.formValidate.unitPid = "";
            t.$refs.update.formValidate.unitPartfunct = "";
            t.$refs.update.formValidate.unitIndustry = "";
            t.$refs.update.formValidate.unitCenter = "";
            t.$refs.update.formValidate.unitCity = "";
            t.$refs.update.formValidate.unitValdate = "";
            t.$refs.update.formValidate.unitInvdate = "";
            t.$refs.update.formValidate.unitInvres = "";
            t.$refs.update.formValidate.partEstablish = "";
            t.$refs.update.formValidate.unitManger = "";
            t.$refs.update.formValidate.unitDirec = "";
            t.$refs.update.formValidate.unitStaff = "";
            t.$refs.update.formValidate.unitPtstaff = "";
            t.$refs.update.formValidate.unitSysalig = "";
            t.$refs.update.formValidate.unitOprecord = "";
            t.$refs.update.formValidate.note = "";
            t.$refs.update.unitCenterName = "";
            t.$refs.update.unitCityName = "";
            t.$refs.update.unitPname = "";
            t.$refs.update.empnhName = "";
        }, //关闭窗口
        selected (key, name) {
            this.select = name;
            this.cityTypeName = key;
            this.getData();
        }, //下拉选中
        search () {
            this.$store.commit('btnOperate/setSearchLoading', true);
            this.treeid = "";
            this.tableselected = [];
            this.page = 1;
            this.getData();
        }, //查询
        renderContent (h, { root, node, data }) {
            return h(
                "span",
                {
                    style: {
                        display: "inline-block",
                        width: "100%"
                    }
                },
                [
                    h(
                        "Button",
                        {
                            props: {
                                type: "text",
                                size: "small"
                            },
                            on: {
                                click: () => {
                                    this.selectChange(data);
                                }
                            }
                        },
                        [
                            h("Icon", {
                                props: {
                                    type:
                                        data.unitType === "01company"
                                            ? "social-buffer"
                                            : "ios-people",
                                    size: "15",
                                    color: data.unitType === "01company" ? "#3399ff" : "#ff9900"
                                },
                                style: {
                                    marginRight: "8px"
                                }
                            }),
                            h("span", data.title)
                        ]
                    )
                ]
            );
        }, //渲染树状图
        getSelect () {
            const t = this;
            t.dropdownMenuList = [];
            getDataLevelUserLogin({
                _mt: "baseParmInfo.getSelectValue",
                logType: t.logType,
                typeCode: "pubuserstatus"
            })
                .then(res => {
                    if (isSuccess(res, t)) {
                        // t.dropdownMenuList = res.data.content[0].value[0].paramList
                    }
                })
                .catch(() => {
                    //this.$Modal.error({
                    // title: this.$t("reminder.err"),
                    // content: this.$t("reminder.errormessage")

                    // });
                    this.$Message.error("reminder.errormessage");
                });
        }, //获取下拉列表
        modifystatus (state) {
            const t = this;
            let logType = "";
            let tipContent = "";
            if (state === "02valid") {
                logType = "生效";
                tipContent = "您确定继续操作吗？";
            } else if (state === "03invalid") {
                logType = "失效";
                tipContent = "您确定继续操作吗？";
            }
            if (t.tableselected.length === 0) {
                // t.$Modal.warning({
                //   title: this.$t("reminder.remind"),
                //   content: this.$t("reminder.leastone")
                // });
                this.$Message.warning('请至少选择一条数据');
                return;
            }
            t.$Modal.confirm({
                title: this.$t("reminder.remind"),
                content: tipContent,
                onOk: () => {
                    getDataLevelUserLogin({
                        _mt: "orgUnits.setStateById",
                        logType: logType,
                        state: state,
                        ids: t.tableselected.toString()
                    })
                        .then(res => {
                            if (isSuccess(res, t)) {
                                t.getData();
                                t.tableselected = [];
                                this.$Message.success(this.$t("reminder.operatsuccess"));
                            }
                        })
                        .catch(() => {
                            t.tableselected = [];
                            this.$Message.error(this.$t("reminder.errormessage"));
                        });
                },
                onCancel: () => { }
            });
        },
        getPageByType (paramCode) {
            this.unitTypeId = paramCode;
            this.getData();
        } //根据类型获取列表
    }
};
</script>

<style lang="scss" scoped>
.table-form {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    .table-form /deep/.ivu-table {
        width: 100%;
    }
}
.tabStyle /deep/ .demo-table-info-row td {
    background-color: #dbdbdb !important;
}
.margin-right-10 {
    margin-right: 10px;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
.colTree {
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
}
.divtree {
    padding-left: 10px;
    /*height: 750px;*/
    border: 1px #efefef solid;
    overflow: auto;
    position: relative;
}
.tabStyle {
    width: 100%;
}
.option{
	width: 700px;
	margin-top: -20px;
	.icons{
		.smallScreen{
			display: none;
		}
		 margin-top: -60px;
		 display: inline-block;
	}
.operation {
		width: 200px;
	     margin-top: -50px;
         margin-left: 80%;
        .items {
            margin-left: 20px;
            font-size: 10px;
            display: inline-block;
            .addheart {
                color: red;
            }
            .addwill {
                color: blue;
            }
        }
    }
	}
.right-div {
    overflow-y: auto;
    border: 1px solid #e9e7e7;
    width: 100%;
    font-size: 16px;
	margin-left: 27px;
    .heads {
        width: 100%;
        text-align: center;
    }
    .item-content {
        margin-top: 10px;
        margin-left: 25px;
    }
    .link {
        margin-left: 25px;
    }
    .item-title {
        margin-top: 30px;
        margin-left: 25px;
    }
    .item-list {
        width: 230px;
        height: 50px;
        display: inline-block;
        margin-left: 25px;
        margin-top: 20px;
        p {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
.table-form /deep/.ivu-table {
    width: 100%;
}
.ivu-table td.demo-table-info-column {
    background-color: #2db7f5;
    color: #fff;
}
</style>


