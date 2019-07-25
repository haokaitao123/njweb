<template>
	<div class="cover">
		<div class="box">
			<div class="title">
				<div class="title-text">
					<Icon type="mouse" size="16" style="margin-right: 11px;"></Icon>
					&nbsp;{{logTypes}}
				</div>
				<Button type="text" @click="handleReset">
					<Icon type="close-round" size="16"></Icon>
				</Button>
			</div>
			<div class="option-main">
				<Row style="max-height: 460px;overflow-y: auto;" ref="scrollBox">
					<Form ref="form" :label-width="120" >
						<i-col span="22" offset="1">
							<div class="collectWrap">
								<div class="collect">
									<row class="table-form" ref="table-form">
									<Table @on-selection-change="selectedtable" class="tabStyle" :row-class-name="rowClassName" @on-sort-change="sortable"
									 @on-row-click="selectEvents" :height="tableheight" size="small" border ref="selection" :columns="columns" :data="coloData"
									 :loading="loading"></Table>
									 <div class="right-div" :style="{height:tableheight + 'px'}" v-show="divShow">
									 
									 	<div class="heads">内容详情</div>
									 
									 	<div class="item-title">
									 		<p>标题:&nbsp;&nbsp;{{contentShows.title}}</p>
									 	</div>
									 	<div class="item-content">
									 		内容:
									 		<p id="myContents">
									 		</p>
									 	</div>
									 	<div class="item-list">
									 		<p>时间:&nbsp;&nbsp;{{contentShows.created}}</p>
									 	</div>
									 	<div class="item-list">
									 		<p>点击数:&nbsp;&nbsp;{{contentShows.clicked}}</p>
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
								</div>
								<div class="collectDtail">
									<p>{{itemTitle}}</p>
									<p>{{itemCreated}}</p>
								    <p>{{itemAtt}}</p>
								</div>
							</div>
						</i-col>
					</Form>
				</Row>
			</div>
		</div>
	</div>
</template>
<script>
	import searchDept from '@/components/otherSearch/searchBM';
	import {
		getDataLevelUserLogin,
		getDataLevelNone,
		getDataLevelUserLoginNew,
		getKnowledgeGet,
		getKnowledgePost
	} from '@/axios/axios.js';
	import {
		isSuccess,
		deepCopy
	} from '@/lib/util';
	import valid from '@/lib/pub_valid';
	import qs from 'qs'
	import E from "wangeditor";
	let editor = new E("#editor");
	export default {
		data() {
			return {
				coloData: [],
				departmentId: '',
				dataTree: [],
				tableheight: document.body.offsetHeight,
				loading:false,
				selection: [],
				itemTitle:'',
				itemCreated:'',
				itemAtt:'',
				divShow:true,
				contentShows: [],
				tabIndex:'',
				columns: [{
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
				],
				disabled: false,
			};
		},
		props: {
			logType: String,
			logTypes: String,
			index: Number,
		},
		components: {
			searchDept
		},
		mounted() {
			//this.getSelectUser();
			editor.customConfig.onchange = function(html) {
				document.getElementById("txt").innerHTML = html;
			};
			editor.create();
		},
		created() {
			this.celectDate()
		},
		computed: {
				tableButton () {
				   return this.$store.state.knowledge.id;
				}
			},
		methods: {
			selectedtable(){
				
			},
			rowClassName(row, index) {
				if (index === this.tabIndex) {
					return 'demo-table-info-row';
				}
				return '';
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
			selectEvents(selection) {
				console.log('123',selection)
				const t = this;
				this.knowledgeId = selection.id
				this.coloData.forEach(function(currentValue, index, arr) {
					if (currentValue.id == selection.id) {
						t.contentShows = selection;
						//t.detList = row
						t.tabIndex = index;
						document.getElementById('myContents').innerHTML = t.contentShows.content
					}
				})
			},
			dataClick(item){
				console.log(item)
				 this.itemTitle = item.title
				 this.itemCreated = item.created
				 this.itemAtt = item.attachments
			},
			selectChange(){
				
			},
			celectDate() {
				const t = this
				getKnowledgeGet('ry/mustReadKnowledge/search', {
						params: {
							page: '1',
							size: '20',
							sort: 'asc',
						}
					})
					.then((res) => {
						console.log(res, "res")
						t.coloData = res.data.content;

					})
					.catch((err) => {
						console.log(err);
					});
			},
			getLists(msg) {
				console.log(msg[this.i])
				this.units += msg[this.i].unitFname + ','
				this.form.department = this.units;
				this.partmId += msg[this.i].id + ',';
				this.departmentId = this.partmId;
				console.log(this.departmentId);
				this.i += 1
			},
			revise(e) {
				console.log('213', e)
				const t = this;
				t.addShow = true;
				t.ifShow = false;
				t.ifShows = false;
				t.ifCollect = false;
			},
			save() {
				this.postQuest()
				//this.$refs.form.validate(valid => {}
				this.$refs.form.validate(valid => {
					if (valid) {
						this.postQuest()
					}
				});
			},
			Consave() {
				if (this.form.content == "") {
					this.$Message.error('新增内容为空');
					var dss = false;
				} else {
					var dss = true;
				}
				this.$refs.form.validate(valid => {
					if (valid && dss) {
						const t = this;
						var readyData = JSON.stringify({
							attachments: this.form.attachments,
							categoryId: this.form.categoryId,
							content: this.form.content,
							expired: this.form.expired,
							id: this.form.id,
							link: this.form.link,
							tag: this.form.tag,
							title: this.form.title,
							userId: this.form.userId
						});
						console.log('readyData', readyData)
						//var headers = {'Content-Type':'application/x-www-form-urlencoded'};
						getKnowledgePost('ry/knowledge', {
								headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
								},
								readyData
							})
							.then(function(response) {
								console.log(response);
								t.$Message.success('保存成功');
							})
							.catch(function(error) {
								t.$Message.error('保存失败');
								console.log(error);
							});
					}
				});
			},
			postQuest() {
				const t = this;
				var ifPass = 1
				if (this.form.phone == '是') {
					ifPass = 1
				} else if (this.form.phone == '否') {
					ifPass = 0
				}
				//this.form.fatherId = this.tableButton() 
				var readyData = JSON.stringify({
					"contentNum": this.form.count,
					"createBy": this.form.operatId,
					"deleted": 1,
					"departmentId": this.departmentId,
					"level": this.form.tier,
					"name": this.form.claName,
					"num": 1,
					"path": this.form.urlname,
					"pid": this.form.fatherId,
					"pnum": 0,
					"sort": this.form.sorts,
					"universal": ifPass,
					"updateBy": this.form.lastId
				});
				console.log('readyData', readyData)
				//var headers = {'Content-Type':'application/x-www-form-urlencoded'};
				getKnowledgePost('ry/knowledgeCategory', {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						readyData
					})
					.then(function(response) {
						t.$Message.success('保存成功');
						console.log(response);
					})
					.catch(function(error) {
						t.$Message.error('保存失败');
						console.log(error);
					});
			},
			newAdd() {
				const t = this;
				t.addShow = true;
				t.ifShow = false;
				t.ifShows = false;
				t.addconShow = false;
				t.ifCollect = false;
			},
			seleEvnt(){
				const t = this;
				t.addShow = false;
				t.ifShow = false;
				t.ifShows = false;
				t.addconShow = false;
				t.ifCollect = false;
				t.ifSelect = true;
				console.log(t.ifSelect)
			},
			colEvent() {
				const t = this;
				t.addShow = false;
				t.ifShow = false;
				t.ifShows = false;
				t.addconShow = false;
				t.ifCollect = true;
				t.ifSelect = false;
				getKnowledgeGet('/ry/knowledge/search',{
					
				})
				 .then((res) => {
				  t.coloData =  res.data.content[0].rows[0];
				  console.log(t.coloData,"reswew")
				  if (res.data.content[0].rows[0][0]) {
				  	t.contentShows = res.data.content[0].rows[0][0];
				  	document.getElementById('myContent').innerHTML = t.contentShows.content
				  	console.log(t.contentShows, "t.contentShow")
				  	t.divShow = true;
				  } else {
				  	t.divShow = false;
				  }
				 })
				 .catch((err) => {
				   console.log(err);
				 });
			},
			addContent() {
				const t = this;
				t.addShow = false;
				t.ifShow = false;
				t.ifShows = false;
				t.addconShow = true;
				t.ifCollect = false;
			},
			handleReset() {
				const t = this;
				t.$emit('closeUps');
			},
			iframeDetail(id) {
				this.ifShow = false;
				this.ifShows = true;
				const t = this
				getKnowledgeGet('http://192.168.101.155/api/exam/ry/mustReadKnowledge', {
						params: {
							id: id
						}
					})
					.then((res) => {
						console.log(res, "res")
						t.coloData = res.data.content;

					})
					.catch((err) => {
						console.log(err);
					});
			},
			readIform() {
				this.ifShows = false;
				this.ifShow = true;
				console.log(this.ifShows);
			},
			//上传
			uploadLocalFile() {
				const t = this;
				var readyData = JSON.stringify({
					file: t.file.name,
				});
				console.log('readyData', readyData)
				//var headers = {'Content-Type':'application/x-www-form-urlencoded'};
				getKnowledgePost('ry/upload', {
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						readyData
					})
					.then(function(response) {
						console.log(response);
						t.$Message.success('上传成功');
					})
					.catch(function(error) {
						t.$Message.error('上传失败');
						console.log(error);
					});
			},
			handleUpload(file) {
				console.log(file)
				this.file = file;
				this.loadingStatus = true;
				return false;
			},
			//部门
			cleardeptId() {
				const t = this;
				t.unitFname = '';
				t.formValidate.deptId = '';
			},
			pickDeptData() {
				const t = this;
				const paramsDept = deepCopy(t.deptParams);
				t.$refs.searchDept.getData(paramsDept);
				t.openDeptPick = true;
			},
			closeDept(msg) {
				this.i = 0;
				//this.form.department = '';
				console.log(msg)
				const t = this;
				t.$refs.searchDept.unitCode = '';
				t.openDeptPick = false;
			},
			changeDeptInput(name, id) {
				//console.log(section)
				const t = this;
				console.log(id, 'id');
				//t.departmentId = id;
				t.formValidate.deptId = id;
			}
		}
	};
</script>
<style lang="scss" scoped>
	.cover {
		position: fixed;
		overflow: auto;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 99;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
		-webkit-overflow-scrolling: touch;
		outline: 0;
		.box1{
			position: relative;
			width: 1200px;
			background-color: #fff;
			padding: 60px 0px 30px 20px;
			border-radius: 11px;
			.form {
				max-height: 800px;
				overflow-y: auto;
			}
			
			.title {
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
			
				.title-text {
					font-weight: bold;
					font-size: 14px;
				}
			}
		}
		.box {
			position: relative;
			width: 1200px;
			background-color: #fff;
			padding: 60px 0px 30px 20px;
			border-radius: 11px;
			.form {
				max-height: 800px;
				overflow-y: auto;
			}

			.title {
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

				.title-text {
					font-weight: bold;
					font-size: 14px;
				}
			}
		}
	}
	.table-form {
		margin: 10px 0;
		display: flex;
		justify-content: space-between;
	
		.table-form /deep/.ivu-table {
			width: 50%;
		}
	}
	.right-div {
		overflow-y: auto;
		border: 1px solid #e9e7e7;
		width: 50%;
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
	.option-main {
		position: relative;
		height: 500px;

		.itemWrap {
			>div {
				margin-top: 20px;
				font-size: 13px;
			}
		}
	}

	.btn {
		position: absolute;
		bottom: 20px;
		right: 50px;
	}

	.btn1 {
		position: absolute;
		bottom: 20px;
		right: 120px;
	}

	.itemDetail {}

	.detailWrap {
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 16px;
		flex-wrap: wrap;

		.itemList {
			width: 40%;
			margin-top: 20px;
		}

		.items {
			width: 100%;
			font-size: 15px;
			height: 200px;
			text-indent: 25px;
		}

		.createTime {
			text-align: right;
			font-size: 15px;
		}
	}
	.collectWrap{
		display: flex;
		.collectDtail{
			width: 200px;
			height: 400px;
		}
	}
	.adds {
		width: 100%;
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		font-size: 20px;

		.input-list {
			margin-top: 20px;
		}

		.ivu-row {
			width: 100%;
		}

		.btns {
			margin-top: 50px;
			margin-left: 80%;
		}
		
	}
	.table-form /deep/.ivu-table {
		width: 100%;
	}
	.ivu-table-wrapper{
		width: 55%;
	}
</style>
