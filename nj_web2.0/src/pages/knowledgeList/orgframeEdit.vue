<template>
	<div class="cover">
		<div class="box">
			<div class="title">
				<div class="title-text">
					<Icon type="mouse" size="16" style="margin-right: 11px;"></Icon>
					&nbsp;{{logTypes}}
				</div>
				<Button type="text" @click="handleReset"><Icon type="close-round" size="16"></Icon></Button>
			</div>
			<div class="option-main">
				<Row style="max-height: 460px;overflow-y: auto;" ref="scrollBox">
					<Form ref="form" 
					:label-width="120"
					:model="form"
					:rules="ruleValidate"
					>
						<i-col span="22" offset="1">
							<div>
								<div class="itemWrap" v-show="ifShow">
									<li v-for="item in coloData">
										<div @click="iframeDetail(item.id)">{{item.knowledgeId}}</div>
									</li>
							    </div>
							</div>
							<div class="itemDetail">
								<div v-show="ifShows" class="detailWrap">
									<i-button type="primary">知识已读</i-button>	
								</div>
							</div>
							<div class="adds" v-show="addShow">
								<Row>
									<Col span="11">
									<FormItem label="分类名称" prop="claName">
										<span>
											<Input placeholder="请输入分类名称"
												  
												   :disabled='disabled'
												   :maxLength=100
												   v-model="form.claName"/>
										</span>
									</FormItem>
								 </Col>
								  <Col span="11" offset="1">
									<FormItem label="层级" prop="tier">
										<span>
											<Input placeholder="请输入层级"
												  
												   :disabled='disabled'
												   v-model="form.tier"/>
										</span>
									</FormItem>
								 </Col>
								 </Row>
								 <Row>
									 <Col span="11">
										<FormItem label="排序" prop="sorts">
											<span>
												<Input placeholder="请输入排序"
													  
													   :disabled='disabled'
													   v-model="form.sorts"/>
											</span>
										</FormItem>
									 </Col>
									  <Col span="11" offset="1">
									<FormItem label="父id" prop="fatherId">
										<span>
											<Input placeholder="请输入父id"
												  
												   :disabled='disabled'
												   v-model="form.fatherId"/>
										</span>
									</FormItem>
									 </Col>
								 </Row>
								 <Row>
									  <Col span="11">
									<FormItem label="部门名称" prop="department">
										<span @dblclick="disabled ? '' : cleardeptId()">
											<Input
												v-model="form.department"
												icon="search"
												:disabled="disabled"
												:readonly="true"
												placeholder="选择部门"
												@on-click="disabled ? '' : pickDeptData()"
											/>
										</span>
									</FormItem>
								 </Col>
								  <Col span="11" offset="1">
								  <FormItem label="路径名称" prop="urlname">
									<span>
										<Input placeholder="请输入路径"
											   :disabled='disabled'
											   v-model="form.urlname"/>
									</span>
								  </FormItem>
								  </Col>
							 </Row>
							 <Row>
								<Col span="11">
									<FormItem label="是否通过" prop="phone">
									 <Radio-group v-model="form.phone">
										<Radio label="是">
											
										</Radio>
										<Radio label="否">
											
										</Radio>
									</Radio-group>
									</FormItem>
								 </Col>
								  <Col span="11" offset="1">
									<FormItem label="内容数量" prop="count">
										<span>
											<Input placeholder="请输入内容数量"
												 
												   :disabled='disabled'
												   v-model="form.count"/>
										</span>
									</FormItem>
									  </Col>
							</Row>
							<Row>
								 <Col span="11">
									<FormItem label="操作员id" prop="operatId">
										<span>
											<Input placeholder="请输入操作员id"
												 :disabled='disabled'
												 v-model="form.operatId"/>
										</span>
									</FormItem>
								</Col>
								 <Col span="11" offset="1">
									<FormItem label="最后操作员id" prop="lastId">
										<span>
											<Input placeholder="请输入最后操作员id"
												
												 :disabled='disabled'
												 v-model="form.lastId"/>
										</span>
									</FormItem>
								</Col>
							</Row>
							<div class="btns">
								 <i-button  @click="save" type="primary">保存</i-button>
							</div>
							</div>
							<div class="collect" v-show="ifCollect">
								<div class="items">
									我的收藏
								</div>
							</div>
							<div class="addContent" v-show="addconShow">
								<Row>
								<Col span="12" offset="0">
								<FormItem label="标题" prop="title">
									<span>
										<Input placeholder="请输入标题"
											   :readonly="true"
											   :disabled='disabled'
											   v-model="form.title"/>
									</span>
								</FormItem>
								 </Col>
								 </Row>
								 <Row style="position:relative;z-index: 0;">
								  <Col span="24" offset="0">
								    <FormItem label="内容" prop="content">
								      <div id="editor" style="z-index: 0;"></div>
								      <!--<div id="noticont" v-show="editdisabled" :disabled="editdisabled" :autosize="{minRows: 2,maxRows: 5}" style="border: #e4e5e7 solid 1px;border-radius:5px;background-color: #f3f3f3"></div>-->
								      <div id="txt" v-model="form.content" v-show="false"></div>
								    </FormItem>
								  </Col>
								</Row>
								    <Row>
								    <Col span="24" offset="0">
								      <FormItem label="附件上传" prop="noticeAttach">
								        <Row>
								          <i-col span="3" v-show="!editdisabled">
								            <Upload :before-upload="handleUpload" action=" ">
								              <Button
								                type="ghost"
								                icon="ios-cloud-upload-outline"
								                :disabled="editdisabled"
								              >{{$t('lang_platdoc.platDoc.plat_scan')}}</Button>
								            </Upload>
								          </i-col>
								          <i-col span="20">
								            <span v-if="file !== ''" @dblclick="clearFile(editdisabled)">
								              <i-col span="22">
								                <Input v-model="file.name" readonly="readonly">
								                  <span slot="prepend">
								                    <Icon type="folder" size="16"></Icon>
								                  </span>
								                </Input>
								              </i-col>
								              <i-col span="2">
								                <Button
								                  type="text"
								                  @click="uploadLocalFile"
								                  v-if="loadingStatus"
								                >{{$t('lang_platdoc.platDoc.plat_upload')}}</Button>
								                <Button
								                  type="text"
								                  @click="downloadFile"
								                  v-if="!loadingStatus"
								                >{{$t('lang_platdoc.platDoc.plat_download')}}</Button>
								              </i-col>
								            </span>
								          </i-col>
								        </Row>
								      </FormItem>
								    </Col>
								  </Row>
								  <div class="adds">
								  	<Row>
								  		<Col span="11">
								  		<FormItem label="类目id" prop="categoryId">
								  			<span>
								  				<Input placeholder="请输入类目id"
								  					  
								  					   :disabled='disabled'
								  					   :maxLength=100
								  					   v-model="form.categoryId"/>
								  			</span>
								  		</FormItem>
								  	 </Col>
								  	  <Col span="11" offset="1">
								  		<FormItem label="结束时间" prop="expired">
								  			<span>
								  				<Input placeholder="请输入结束时间"
								  					  
								  					   :disabled='disabled'
								  					   v-model="form.expired"/>
								  			</span>
								  		</FormItem>
								  	 </Col>
								  	 </Row>
								  	 <Row>
								  		  <Col span="11" >
											  <FormItem label="使用者id" prop="count">
												 <span>
												  <Input placeholder="请输入使用者id"
													:disabled='disabled'
													v-model="form.count"/>
												 </span>
											</FormItem>
								  		 </Col>
								  	  <Col span="11" offset="1">
								  	  <FormItem label="链接名称" prop="attachments">
								  		<span>
								  			<Input placeholder="请输入链接名称"
								  				   :disabled='disabled'
								  				   v-model="form.attachments"/>
								  		</span>
								  	  </FormItem>
								  	  </Col>
								   </Row>
								    <Row>
								   	  <Col span="11" >
								   		<FormItem label="标签" prop="tag">
								   			<span>
								   			<Input placeholder="请输入标签"
								   			   :disabled='disabled'
								   			    v-model="form.tag"/>
								   			</span>
								   			</FormItem>
								   	  </Col>
								   </Row>
								   <div class="btns">
								   	 <i-button style="margin-left: 70%;"  @click="Consave" type="primary">保存</i-button>
								   </div>
								  </div>
							</div>
						</i-col>
					</Form>
				</Row>
			</div>
			<!--部门-->
			<transition name="fade">
				<searchDept
					v-show="openDeptPick"
					:searchDeptClo="searchDeptCloumns"
					:params="deptParams"
					@closeDept="closeDept"
					@inputDept="changeDeptInput"
					v-on:showData="getLists"
					ref="searchDept"
				></searchDept>
			</transition>
		</div>
	</div>
</template>
<script>
import searchDept from '@/components/otherSearch/searchBM';
import { getDataLevelUserLogin, getDataLevelNone, getDataLevelUserLoginNew, getKnowledgeGet,getKnowledgePost } from '@/axios/axios.js';
import { isSuccess, deepCopy } from '@/lib/util';
import valid from '@/lib/pub_valid';
import qs from 'qs'
import E from "wangeditor";
let editor = new E("#editor");
export default {
	data() {
		return {
			editdisabled: false,
			file: "",
			filekey: "",
			fileName:"",
			coloData:[],
			departmentId:'',
			form:{
				claName:'',  //分类名
				tier:'',   //层级
				sorts:'', //排序
				fatherId:'', //父id
				department:'', //部门名称
				urlname:'', //路径名称
				count:'',  //数量
				phone: '是',//是否通过
				operatId:'',//操作员id
				lastId:'',//最后操作员id
				attachments:'',
				categoryId:'',
				content:'',
				expired:'',
				id:'',
				link:'',
				tag:'',
				title:'',
				userId:''
			},
			comInfo: [],
			id: 0,
			conForm:{
				
			},
			noticeTitle: '',
			noticeContent: '',
			unitPidDis: '',
			noticePublish: '',
			ifShow: true,
			ifShows: false,
			value: '',
			unitFname: '',
			openDeptPick: false,
			postFname:'',
			addShow:false,
			addconShow:false,
			ifCollect:false,
			i:0,
			units:'',
			partmId:'',
			searchDeptCloumns: [
				 {
				    type: "selection",
				    width: 54,
				    fixed: "left",
				    align: "center"
				},
				{
					title: '部门编码',
					key: 'unitCode',
					sortable: 'custom'
				},
				{
					title: '部门名称',
					key: 'unitFname'
				}
			],
			deptParams: {
				_mt: 'orgUnits.getByOrgFramePageList',
				rows: 10,
				page: 1,
				sort: 'id',
				order: 'desc',
				logType: '部门',
				state: '02valid'
			},
			ruleValidate: {
				claName: [{ required: true, message: '请输入类目名称', trigger: 'blur' }],
				tier: [{ required: true, message: '请输入层级', trigger: 'blur' }],
				department: [{ required: true, message: '请输入部门', trigger: 'blur' }],
				fatherId: [{ required: true, message: '请输入父id', trigger: 'blur' }],
				title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
				categoryId: [{ required: true, message: '请输入所属类目id', trigger: 'blur' }],
			},
			ruleValidates: {
				
			},
			disabled: false,
			formValidate: {
				_mt: 'orgDeptpost.addOrUpd',
				funId: '1',
				deptId: '',
				postId: '',
				note: ''
			}
		};
	},
	props: {
		logType: String,
		logTypes: String,
		index: Number
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
	  console.log(this.form.state, "form");
	},
	created() {
		this.celectDate()
	},
	methods: {
		celectDate(){
			const t = this
			getKnowledgeGet('ry/mustReadKnowledge/search',{
						 params: {  
						  page:'1',
						  size:'20',
						  sort:'asc',
						}
			})
			 .then((res) => {
				 console.log(res,"res")
			  t.coloData =  res.data.content;
			 
			 })
			 .catch((err) => {
			   console.log(err);
			 });
		},
		getLists(msg){
			console.log(msg[this.i])
			this.units += msg[this.i].unitFname+','
			this.form.department = this.units;
			this.partmId += msg[this.i].id+',';
			this.departmentId  = this.partmId;
			console.log(this.departmentId);
			this.i+= 1
		},
		revise(e){
			console.log('213',e)
			const t = this;
			t.addShow = true;
			t.ifShow = false;
			t.ifShows = false;
			t.ifCollect = false;
		},
		save(){
			//this.$refs.form.validate(valid => {}
			 this.$refs.form.validate(valid => {
								 if (valid) {
									 this.postQuest() 
								 }
								  });
		},
		Consave(){
			if(this.form.content == ""){
				 this.$Message.error('新增内容为空');
				 var dss = false; 
			}else{
				 var dss = true;
			}
			 this.$refs.form.validate(valid => {
		 if (valid && dss) {	
			const t = this;
			var readyData= JSON.stringify({
				 attachments: this.form.attachments,
				 categoryId:this.form.categoryId,
				 content: this.form.content,
				 expired:this.form.expired,
				 id:this.form.id,
				 link:this.form.link,
				 tag:this.form.tag,
				 title:this.form.title,
				 userId:this.form.userId
			});
			console.log('readyData',readyData)
			//var headers = {'Content-Type':'application/x-www-form-urlencoded'};
			 getKnowledgePost('ry/knowledge',{
				headers: {'Content-Type':'application/x-www-form-urlencoded'},
				readyData
			})
			  .then(function (response) {
				console.log(response);
				t.$Message.success('保存成功');
			  })
			  .catch(function (error) {
				  t.$Message.error('保存失败');
				  console.log(error);
			  });
			  	 }
			  });
			},
			postQuest(){
				const t = this;
				var ifPass = 1
				if(this.from.phone == '是'){
					ifPass = 1
				}else if(this.from.phone == '否'){
					ifPass = 0
					}
				var readyData= JSON.stringify({
					  "contentNum": this.from.count,
					  "createBy": this.from.operatId,
					  "deleted": 1,
					  "departmentId":this.departmentId,
					  "level": this.from.tier,
					  "name": this.from.claName,
					  "num": 1,
					  "path": this.from.urlname,
					  "pid": this.from.fatherId,
					  "pnum": 0,
					  "sort":this.from.sorts,
					  "universal":ifPass,
					  "updateBy": this.from.lastId
				});
				console.log('readyData',readyData)
				//var headers = {'Content-Type':'application/x-www-form-urlencoded'};
				getKnowledgePost('ry/knowledgeCategory',{
					headers: {'Content-Type':'application/x-www-form-urlencoded'},
					readyData
				})
				  .then(function (response) {
					  t.$Message.success('保存成功');
					console.log(response);
				  })
				  .catch(function (error) {
					   t.$Message.error('保存失败');
					console.log(error);
				  });
		},
		newAdd(){
			const t = this;
			t.addShow = true;
			t.ifShow = false;
			t.ifShows = false;
			t.addconShow=false;
			t.ifCollect = false;
		},
		colEvent(){
			const t = this;
			t.addShow = false;
			t.ifShow = false;
			t.ifShows = false;
			t.addconShow=false;
			t.ifCollect = true;
			// this.axios.get('http://192.168.101.155/api/exam/ry/operationKnowledge/queryCollection',{
			// 			 params: {  
			// 			}
			// })
			//  .then((res) => {
			// 	 console.log(res,"res")
			//   t.coloData =  res.data.content;
			//  })
			//  .catch((err) => {
			//    console.log(err);
			//  });
		},
		addContent(){
			const t = this;
			t.addShow = false;
			t.ifShow = false;
			t.ifShows = false;
			t.addconShow=true;
			t.ifCollect = false;
		},
		handleReset() {
			const t = this;
			t.$emit('closeUp');
		},
		iframeDetail(id) {
			this.ifShow = false;
			this.ifShows = true;
			const t = this
			getKnowledgeGet('http://192.168.101.155/api/exam/ry/mustReadKnowledge',{
						 params: {  
						 id:id
						}
			})
			 .then((res) => {
				 console.log(res,"res")
			  t.coloData =  res.data.content;
			 
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
		 var readyData= JSON.stringify({
		 	 file: t.file.name,
		 });
		 console.log('readyData',readyData)
		 //var headers = {'Content-Type':'application/x-www-form-urlencoded'};
		 getKnowledgePost('ry/upload',{
		 	headers: {'Content-Type':'application/x-www-form-urlencoded'},
		 	readyData
		 })
		   .then(function (response) {
		 	console.log(response);
		 	t.$Message.success('上传成功');
		   })
		   .catch(function (error) {
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
	.box {
		position: relative;
		width: 900px;
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
.option-main {
	position: relative;
	height: 500px;
	.itemWrap {
		>div{
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
.itemDetail {
	
}
.detailWrap {
	width: 100%;
	display: flex;
	justify-content: space-between;
	font-size: 16px;
	flex-wrap: wrap;
	.itemList{
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
.adds {
	width: 100%;
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	font-size: 20px;
	.input-list{
		margin-top: 20px;
	}
	.ivu-row{
		width: 100%;
	}
	.btns{
		margin-top: 50px;
		margin-left: 80%;
	}
}
</style>
