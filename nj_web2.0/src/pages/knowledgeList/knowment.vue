<template>
	<div class="table">
		<Row>
			<Col span="24">
			<card>
				<p slot="title">
					<Icon type="mouse"></Icon>&nbsp;知识管理
				</p>
				<Row>
					<Col span="4">
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
						              @click="knowEvent">搜索</i-button>
									  
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
					<Col span="19" style="margin-left: 20px;">
					<Row>
						<Input placeholder="请输入文章名称" style="width: 200px" @keyup.enter.native="enterEvent" v-model="keywordr" />
						<i-button style="margin-top: 0px; display: inline-block;margin-left: 30px;" type="primary" @click="addC"
						 icon="android-add">新增内容</i-button>
						 <i-button style="margin-top: 0px; display: inline-block;margin-left: 30px;" type="error" @click="deleteItem"
						>删除</i-button>
					</Row>

					<row class="table-form" ref="table-form">
						<Table @on-selection-change="selectedtable" @on-select="selectItem" class="tabStyle"  @on-sort-change="sortable"
						 :height="tableheight" size="small" border ref="selection" :columns="columns" :data="TabData"
						 :loading="loading">
							<template slot-scope="{ row, index }" slot="action">
								<Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
								<Button type="error" size="small" @click="remove(index)">Delete</Button>
							</template>
						</Table>
					</row>
					<Row style="display: flex">
						<Page :total="total" :showTotal="showTotal" size="small" :current="page" show-elevator show-sizer v-show="pageShow"
						 placement="top" @on-page-size-change="sizeChange" @on-change="pageChange" :page-size=rows :page-size-opts="[10, 20, 50, 100]"></Page>
						<Button type="ghost" size="small" shape="circle" icon="refresh" v-show="pageShow" style="margin-left: 20px;display: inline-block;"
						 @click="getTable()"></Button>
					</Row>
					</Col>
				</Row>
			</card>
			</Col>
		</Row>
		<transition name="fade">
			<newupdate v-show="openUpdates" :logTypes="logTypes" @closeUp="closeUps" @getData="addNewArray" @update="updateArray"
			 ref="newupdate"></newupdate>
		</transition>
	</div>
</template>
<script>
	import {
		isSuccess
	} from "@/lib/util"
	import expdow from "@/components/fileOperations/expdow";
	import newupdate from './orgframeEdit'
	import {
		getDataLevelUserLoginNew,
		getDataLevelUserLogin,
		getKnowledgeGet,
		getKnowledgePost
	} from "@/axios/axios";
	export default {
		props: ["message"],
		components: {
			newupdate
		},
		data() {
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
				pageShow: true,
				selectCont:[],
				idStr:'',
				columns: [
					{
					    type: 'selection',
					    width: 60,
					    align: 'center',
						fixed: "left",
					},
					{
						title: "标题",
						key: "title",
						width: 950,
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
					}
					,{
				    title: "操作",
				    key: "action",
				    width: 100,
					fixed: "right",
				    align: "center",
				    render: (h, params) => {
				        let child = [];
				            child.push(
				                h(
				                    "Button",
				                    {
				                        props: {
				                            type: "primary",
				                            size: "small"
				                        },
				                        style: {
				                            display:"inline"
				                        },
				                        on: {
				                            click: () => {
												this.addContent(params)
				                                //this.openUp(params.row.id, v.name, params.index);
				                            }
				                        }
				                    },
				                    "修改"
				                )
				            );
				       
				        return h("div", [child]);
				    }
				}
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
				Pid:'',
				partmentId:'',
				unitPids:'',
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
		},
		created() {
			// this.openUps()
			this.getTable()
			this.getData ()
		},
		mounted() {
			 this.getTreedata()
		},
		watch: {
			
		},
		methods: {
			getData () {
			    const t = this;
			    const data = {
			        _mt: "orgUnits.getPidByUid",
			        funId:"1234",
					logType:'获取部门'
			    };
			    for (const dat in data) {
			        if (data[dat] === "") {
			            delete data[dat];
			        }
			    }
			    getDataLevelUserLoginNew(data)
			        .then(res => {
			            if (isSuccess(res, t)) {
			              if(res.data.content[0].length > 0){
							  this.unitPids = res.data.content[0].unitPid
							  this.partmentId = res.data.content[0].id
						  }
			            }
			        })
			        .catch(() => {
			            t.$Message.error(this.$t('reminder.errormessage'))
			        }).finally(() => {
			            t.loading = false;
			            t.$store.commit('btnOperate/setSearchLoading', false);
			        });
			},
			deleteItem(){
				if(this.selectCont.length == 0){
					this.$Message.warning("至少选择一条数据");
				}
				if(this.selectCont.length > 0){
					 const t = this;
					 t.$Modal.confirm({
					    title: this.$t("reminder.remind"),
					    content: this.$t("reminder.confirmdelete"),
					    onOk: () => {
					        let str = ''
					        t.selectCont.forEach(function(currentValue, index, arr) {
					        	str += ','+currentValue.id  
					        })
					        t.idStr = str
					        var readyData = {
					            id:t.idStr,
					            staffId: t.$store.state.user.userId
					        };
					        console.log('readyData', readyData)
					        getKnowledgePost('ry/operationKnowledge/praise', {
					            readyData
					        })
					            .then(function (response) {
					                t.$Message.error('删除成功');
					            })
					            .catch(function (error) {
					                t.$Message.error('保存失败');
					                console.log(error);
					            });
					    },
					    onCancel: () => { }
					});
					
				}
			},
			selectEvent(selection) {
				const t = this;
				this.knowledgeId = selection.id
				this.TabData.forEach(function(currentValue, index, arr) {
					if (currentValue.id == selection.id) {
						t.contentShow = selection;
						//t.detList = row
						t.tabIndex = index;
						document.getElementById('myContent').innerHTML = t.contentShow.content
					}
				})
			},
			addEvent() {
				const t = this;
				t.openUpdates = true;
				t.addShow = true;
				t.ifShow = false;
				t.logTypes = "新增"
				t.$refs.newupdate.newAdd()
			},
			addContent(params) {
				const t = this;
				t.openUpdates = true;
				t.addShow = false;
				t.ifShow = false;
				t.addconShow = true;
				t.logTypes = "修改"
				t.$refs.newupdate.addContent(params)
				console.log(params,'addContent')
			},
			addC() {
				const t = this;
				t.openUpdates = true;
				t.addShow = false;
				t.ifShow = false;
				t.addconShow = true;
				t.logTypes = "新增内容"
				t.$refs.newupdate.addC(this.Pid)
			},
			remoteMethod1(query) {
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
			getEvent(query) {
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
						if (res.data.content[0].length > 0) {
							t.list = res.data.content[0];
						}
						console.log(t.list)
					})
					.catch((err) => {
						console.log(err);
					});
			},
			getTreedata() {
				const t = this
				getKnowledgeGet('ry/knowledgeCategory/getPersonKnowledgeCategoryTree', {
						nameLike: t.keyword,
						dpId:t.partmentId,
						pdpId:t.unitPids
					})
					.then((res) => {
						if (res.data.content[0].length > 0) {
							t.dataTree = t.toTree(res.data.content[0]);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
			selectItem(selection){
					console.log(selection,'selection')
			},
			//enter事件
			enterEvent(e) {
				this.getTable()
			},
			knowEvent(e) {
				this.getTreedata()
				this.list = []
			},
			getTable(id, page) {
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
			contSearh() {
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
			pickData() {
				const t = this;
				t.$refs.searchOrgframe.getData(this.params);
				t.openPick = true;
			}, //点击组织架构图
			changeinput(name, id, costname, costid) {
				const t = this;
				t.openPick = false;
				t.$refs.orgframeChart.getData(id);
				t.openChart = true;
			}, //输入框
			closeFrame() {
				const t = this;
				t.openPick = false;
			}, //关闭Frame
			closeChart() {
				this.openChart = false;
			}, //关闭组织架构图
			/* 树点击事件 */
			selectChange(e) {
				console.log('e', e[0])
				this.$store.commit('KonwId', e[0].id);
				this.$store.commit('KonwName', e[0].name);
				this.$store.commit('KonwDe', e[0].departmentId);
				//const t = this
				// t.logTypes = "修改"
				// t.$refs.newupdate.revise(e)
				// t.openUpdates = true;
				this.page = 1;
				if (e[0].id) {
					this.treeid = e.id;
					this.getTable(e[0].id);
				}
			},
			/* 把后台数据转化为tree的格式 */
			toTree(data) {
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
			addNewArray(res) {
				const t = this;
				t.data.unshift(res);
				t.getTree();
			},
			updateArray(res) {
				const t = this;
				t.data.splice(t.index, 1, res);
				t.getTree();
			},
			sortable(column) {
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
			sizeChange(size) {
				const t = this;
				t.rows = size;
				t.getData(this.treeid);
			}, //分页
			pageChange(page) {
				const t = this;
				t.page = page;
				t.getTable(this.treeid, t.page);
			}, //分页
			selectedtable(selection) {
				this.selectCont = selection 
			}, //列表中选中的item
			deletemsg() {
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
						onCancel: () => {}
					});
				}
			},
			openUps() {
				console.log(this.$store.state.knowledge, 'oo')
				// var t = this;
				// t.ifShow = true;
				// t.logTypes = "信息列表"
				// t.openUpdates = true;
			},
			closeUps() {
				const t = this;
				t.openUpdates = false;
			},
			closeUp() {
				const t = this;
				t.openUpdate = false;
			}, //关闭窗口
			selected(key, name) {
				this.select = name;
				this.cityTypeName = key;
				this.getData();
			}, //下拉选中
			search() {
				this.$store.commit('btnOperate/setSearchLoading', true);
				this.treeid = "";
				this.tableselected = [];
				this.page = 1;
				this.getData();
			}, //查询
			getPageByType(paramCode) {
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

	.option {
		width: 700px;
		margin-top: -20px;

		.icons {
			.smallScreen {
				display: none;
			}

			margin-top: -60px;
			display: inline-block;
		}

		.icons:hover {
			cursor: pointer;
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

			.items:hover {
				cursor: pointer;
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
