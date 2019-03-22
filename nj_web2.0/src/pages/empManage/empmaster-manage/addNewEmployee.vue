<template>
  <div class="cover">
    <div class="box">
    	<Row>
    		<Col span="5" style="">
      			<div class="headImg">
              <div class="header-box">
                <div class="header-cover" @click="render1">
                  点击上传头像
                </div>
                <div class="header" style="">
                  <img :src="cropedImg===''?'../../../static/img/header1.png':cropedImg" width="150" height="150">
                </div>
              </div>
      			</div>
      			<div class="menuInfo">
      				<Menu active-name="baseInfo" width="auto">
      					<MenuItem name="baseInfo">
      						<a href="#baseInfo" @click="newColor(this)">{{$t('lang_employee.empmaster.title1')}}</a>
      					</MenuItem>
      					<MenuItem name="companyInfo">
      						<a href="#companyInfo" @click="newColor(this)">{{$t('lang_employee.empmaster.title2')}}</a>
      					</MenuItem>
      					<MenuItem name="contractInfo">
      						<a href="#contractInfo">{{$t('lang_employee.empmaster.title3')}}</a>
      					</MenuItem>
      					<MenuItem name="payInfo">
      						<a href="#payInfo">{{$t('lang_employee.empmaster.title4')}}</a>
      					</MenuItem>
      					<MenuItem name="educationInfo">
      						<a href="#educationInfo">{{$t('lang_employee.empmaster.title5')}}</a>
      					</MenuItem>
      					<MenuItem name="addressInfo">
      						<a href="#addressInfo">{{$t('lang_employee.empmaster.title6')}}</a>
      					</MenuItem>
      				</Menu>
      			</div>
      		</Col>

      		<Col span="19" style="background: #FFFFFF;">
      			<Row >
      				<div class="title" style="padding-top: 20px;padding-bottom: 20px;height: 50px;">
								<div class="title-text">
									<Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>新增
								</div>
								<Button type="text" @click="handleClose">
				          <Icon type="close-round" size="16"></Icon>
				        </Button>
							</div>
							<div style="margin-top: 80px;padding-left: 25px;max-height: 410px;overflow-y: auto;margin-right: 10px;margin-bottom: 20px;">
      				<Form ref="formEmpValidate" :rules="ruleValidate" :model="formEmpValidate" :label-width="100" >
      				<a name="baseInfo"><Icon type="compose" size="15" style="margin-right: 5px;"></Icon>{{$t('lang_employee.baseInfo.title')}}</a>
      					<Row>
      						<Col span="23">
      							<FormItem :label="$t('lang_employee.baseInfo.baseGid')" prop="baseGid">
		      						<Input :placeholder="$t('lang_employee.baseInfo.baseGidDis')" v-model="formEmpValidate.baseGid"/>
		      					</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.baseInfo.baseCname')" prop="baseCname">
		      						<Input :placeholder="$t('lang_employee.baseInfo.baseCnameDis')" v-model="formEmpValidate.baseCname"/>
		      					</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.baseInfo.baseAlias')" prop="baseAlias">
      								<Input :placeholder="$t('lang_employee.baseInfo.baseAliasDis')" v-model="formEmpValidate.baseAlias"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.baseInfo.baseLastname')" prop="baseLastname">
      								<Input :placeholder="$t('lang_employee.baseInfo.baseLastnameDis')" v-model="formEmpValidate.baseLastname"/>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.baseInfo.baseFirstname')" prop="baseFirstname">
      								<Input :placeholder="$t('lang_employee.baseInfo.baseFirstnameDis')" v-model="formEmpValidate.baseFirstname"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.baseInfo.idsType')" prop="idsType">
      								<Select v-model="formEmpValidate.idsType">
      									<Option :value="item.paramCode" v-for="(item,index) in selectIdsType" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.baseInfo.idsNo')" prop="idsNo">
      								<Input :placeholder="$t('lang_employee.baseInfo.idsNoDis')" v-model="formEmpValidate.idsNo"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.baseInfo.baseBirthdate')" prop="baseBirthdate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.baseInfo.baseBirthdateDis')" v-model="formEmpValidate.baseBirthdate" style="width: 100%"></DatePicker>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.baseInfo.baseGender')" prop="baseGender">
      								<Select v-model="formEmpValidate.baseGender">
      									<Option :value="item.paramCode" v-for="(item,index) in selectGender" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.baseInfo.baseMarriage')" prop="baseMarriage">
      								<Select v-model="formEmpValidate.baseMarriage">
      									<Option :value="item.paramCode" v-for="(item,index) in selectMarriage" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.baseInfo.baseNation')" prop="baseNation">
      								<span @dblclick="dbNation">
      								<Input :placeholder="$t('lang_employee.baseInfo.baseNationDis')" icon="search" :readonly="true" v-model="formEmpValidate.baseNation" @on-click="selectNation"/>
      								</span>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.baseInfo.basePolitical')" prop="basePolitical">
      								<Select v-model="formEmpValidate.basePolitical">
      									<Option :value="item.paramCode" v-for="(item,index) in selectPolitical" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.baseInfo.baseTechnicaltitle')" prop="baseTechnicaltitle">
      								<Select v-model="formEmpValidate.baseTechnicaltitle">
      									<Option :value="item.paramCode" v-for="(item,index) in selectTechnicaltitle" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.baseInfo.baseTechspec')" prop="baseTechspec">
      								<Input :placeholder="$t('lang_employee.baseInfo.baseTechspecDis')" v-model="formEmpValidate.baseTechspec"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.baseInfo.baseFirstworkdate')" prop="baseFirstworkdate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.baseInfo.baseFirstworkdateDis')" v-model="formEmpValidate.baseFirstworkdate" style="width: 100%"></DatePicker>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.baseInfo.baseTechdate')" prop="baseTechdate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.baseInfo.baseTechdateDis')" v-model="formEmpValidate.baseTechdate" style="width: 100%"></DatePicker>
      							</FormItem>
      						</Col>
      					</Row>

      				<a name="companyInfo"><Icon type="compose" size="15" style="margin-right: 5px;"></Icon>{{$t('lang_employee.companyInfo.title')}}</a>
      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.companyInfo.pkiWorkno')" prop="pkiWorkno">
      								<Input :placeholder="$t('lang_employee.companyInfo.pkiWorknoDis')" v-model="formEmpValidate.pkiWorkno"/>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.companyInfo.pkiEmptype')" prop="pkiEmptype">
      								<Select v-model="formEmpValidate.pkiEmptype">
      									<Option :value="item.paramCode" v-for="(item,index) in selectEmptype" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.companyInfo.compHirecompany')" prop="compHirecompany">
      								<span @dblclick="dbHCompany">
      								<Input :placeholder="$t('lang_employee.companyInfo.compHirecompanyDis')" icon="search" :readonly="true" v-model="formEmpValidate.compHirecompany" @on-click="selectHCompany"/>
      								</span>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.companyInfo.compDept')" prop="compDept">
      								<span @dblclick="dbDept">
      								<Input :placeholder="$t('lang_employee.companyInfo.compDeptDis')" icon="search" :readonly="true" v-model="formEmpValidate.compDept" @on-click="selectDept"/>
      								</span>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.companyInfo.compPost')" prop="compPost">
      								<span @dblclick="dbPost">
      								<Input :placeholder="$t('lang_employee.companyInfo.compPostDis')" icon="search" :readonly="true" v-model="formEmpValidate.compPost" @on-click="selectPost"/>
      								</span>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.companyInfo.compCostcenter')" prop="compCostcenter">
      								<span @dblclick="dbCostcenter">
      								<Input :placeholder="$t('lang_employee.companyInfo.compCostcenterDis')" icon="search" :readonly="true" v-model="formEmpValidate.compCostcenter" @on-click="selectCostcenter"/>
      								</span>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.companyInfo.compHirelocation')" prop="compHirelocation">
      								<span @dblclick="dbHirelocation">
      								<Input :placeholder="$t('lang_employee.companyInfo.compHirelocationDis')" icon="search" :readonly="true" v-model="formEmpValidate.compHirelocation" @on-click="selectHirelocation($t('lang_employee.searchTableTitle.hirelocation'))"/>
      								</span>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.companyInfo.compWorklocation')" prop="compWorklocation">
      								<span @dblclick="dbWorklocation">
      								<Input :placeholder="$t('lang_employee.companyInfo.compWorklocationDis')" icon="search" :readonly="true" v-model="formEmpValidate.compWorklocation" @on-click="selectWorklocation($t('lang_employee.searchTableTitle.worklocation'))"/>
      								</span>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.companyInfo.compBuspmp')" prop="compBuspmp">
      								<span @dblclick="dbBuspmp">
      								<Input :placeholder="$t('lang_employee.companyInfo.compBuspmpDis')" icon="search" :readonly="true" v-model="formEmpValidate.compBuspmp" @on-click="selectBuspmp($t('lang_employee.searchTableTitle.manger'))"/>
      								</span>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.companyInfo.compFunpmp')" prop="compFunpmp">
      								<span @dblclick="dbFunpmp">
      								<Input :placeholder="$t('lang_employee.companyInfo.compFunpmpDis')" icon="search" :readonly="true" v-model="formEmpValidate.compFunpmp" @on-click="selectFunpmp($t('lang_employee.searchTableTitle.gManger'))"/>
      								</span>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.companyInfo.compEntrydate')" prop="compEntrydate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.companyInfo.compEntrydateDis')" v-model="formEmpValidate.compEntrydate" style="width: 100%"></DatePicker>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.companyInfo.compServicedate')" prop="compServicedate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.companyInfo.compServicedateDis')" v-model="formEmpValidate.compServicedate" style="width: 100%"></DatePicker>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.companyInfo.compCertificatedate')" prop="compCertificatedate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.companyInfo.compCertificatedateDis')" v-model="formEmpValidate.compCertificatedate" style="width: 100%"></DatePicker>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.companyInfo.compHr')" prop="compHr">
      								<span @dblclick="dbCompHR">
      								<Input :placeholder="$t('lang_employee.companyInfo.compHrDis')" v-model="formEmpValidate.compHr" icon="search" :readonly="true" @on-click="selectCompHR($t('lang_employee.searchTableTitle.compHR'))"/>
      								</span>
      							</FormItem>
      						</Col>
      					</Row>

      				<a name="contractInfo"><Icon type="compose" size="15" style="margin-right: 5px;"></Icon>{{$t('lang_employee.contractInfo.title')}}</a>
      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.contractInfo.ctContracttype')" prop="ctContracttype">
      								<Select v-model="formEmpValidate.ctContracttype">
      									<Option :value="item.paramCode" v-for="(item,index) in selectContracttype" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.contractInfo.ctContractperiod')" prop="ctContractperiod">
      								<Select v-model="formEmpValidate.ctContractperiod">
      									<Option :value="item.paramCode" v-for="(item,index) in selectContractperiod" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.contractInfo.ctContractsdate')" prop="ctContractsdate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.contractInfo.ctContractsdateDis')" v-model="formEmpValidate.ctContractsdate" style="width: 100%"></DatePicker>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.contractInfo.ctContractedate')" prop="ctContractedate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.contractInfo.ctContractedateDis')" v-model="formEmpValidate.ctContractedate" style="width: 100%"></DatePicker>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.contractInfo.ctContractprom')" prop="ctContractprom">
      								<Select v-model="formEmpValidate.ctContractprom">
      									<Option :value="item.paramCode" v-for="(item,index) in selectContractprom" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.contractInfo.ctConfidential')" prop="ctConfidential">
      								<Select v-model="formEmpValidate.ctConfidential">
      									<Option :value="item.paramCode" v-for="(item,index) in selectConfidential" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.contractInfo.ctContractworktime')" prop="ctContractworktime">
      								<Select v-model="formEmpValidate.ctContractworktime">
      									<Option :value="item.paramCode" v-for="(item,index) in selectctContractworktime" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.contractInfo.ctSigndate')" prop="ctSigndate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.contractInfo.ctSigndateDis')" v-model="formEmpValidate.ctSigndate" style="width: 100%"></DatePicker>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.contractInfo.ctProbation')" prop="ctProbation">
      								<Select v-model="formEmpValidate.ctProbation">
      									<Option :value="item.paramCode" v-for="(item,index) in selectctProbation" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.contractInfo.ctProbationdate')" prop="ctProbationdate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.contractInfo.ctProbationdateDis')" v-model="formEmpValidate.ctProbationdate" style="width: 100%"></DatePicker>
      								<!--<Input placeholder="试用到期时间..." />-->
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.contractInfo.ctProbationprom')" prop="ctProbationprom">
      								<Select v-model="formEmpValidate.ctProbationprom">
      									<Option :value="item.paramCode" v-for="(item,index) in selectProbationprom" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

      				<a name="payInfo"><Icon type="compose" size="15" style="margin-right: 5px;"></Icon>{{$t('lang_employee.payInfo.title')}}</a>
      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.payInfo.salPostlevel')" prop="salPostlevel">
      								<Select v-model="formEmpValidate.salPostlevel">
      									<Option :value="item.paramCode" v-for="(item,index) in selectPostlevel" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.payInfo.salSalarylevel')" prop="salSalarylevel">
      								<Select v-model="formEmpValidate.salSalarylevel">
      									<Option :value="item.paramCode" v-for="(item,index) in selectSalarylevel" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.payInfo.salTravellevel')" prop="salTravellevel">
      								<Select v-model="formEmpValidate.salTravellevel">
      									<Option :value="item.paramCode" v-for="(item,index) in selectTravellevel" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.payInfo.salAdminlevel')" prop="salAdminlevel">
      								<Select v-model="formEmpValidate.salAdminlevel">
      									<Option :value="item.paramCode" v-for="(item,index) in selectAdminlevel" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.payInfo.salSalaryset')" prop="salSalaryset">
      								<Select v-model="formEmpValidate.salSalaryset">
      									<Option :value="item.id" v-for="(item,index) in selectSalaryset" :key="index">{{item.payssCN}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.payInfo.bkBank')" prop="bkBank">
      								<span @dblclick="dbbkBank">
      								<Input :placeholder="$t('lang_employee.payInfo.bkBankDis')" icon="search" :readonly="true" v-model="formEmpValidate.bkBank" @on-click="selectBank"/>
      								</span>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.payInfo.bkAccount')" prop="bkAccount">
      								<Input :placeholder="$t('lang_employee.payInfo.bkAccountDis')" v-model="formEmpValidate.bkAccount"/>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.payInfo.bkAccnane')" prop="bkAccnane">
      								<Input :placeholder="$t('lang_employee.payInfo.bkAccnaneDis')" v-model="formEmpValidate.bkAccnane"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.payInfo.sbBenefitlocation')" prop="sbBenefitlocation">
      								<span @dblclick="dbsbBenefitlocation">
      								<Input :placeholder="$t('lang_employee.payInfo.sbBenefitlocationDis')" icon="search" :readonly="true" v-model="formEmpValidate.sbBenefitlocation" @on-click="selectBenefitlocation($t('lang_employee.searchTableTitle.benefitlocation'))"/>
      								</span>
      							</FormItem>
      						</Col>
                  <Col span="11"  offset="1">
                  <FormItem :label="$t('lang_employee.payInfo.sbBenefitpolicy')" prop="sbBenefitpolicy">
      								<span @dblclick="dbsbBenefitpolicy">
      								<Input :placeholder="$t('lang_employee.payInfo.sbBenefitpolicyDis')" icon="search" :readonly="true" v-model="formEmpValidate.sbBenefitpolicy" @on-click="selectBenefitpolicy($t('lang_employee.searchTableTitle.benefitpolicy'), '1')"/>
      								</span>
                  </FormItem>
                  </Col>
      					</Row>

      					<Row>
      						<Col span="11" >
      							<FormItem :label="$t('lang_employee.payInfo.sbBenefittype')" prop="sbBenefittype">
      								<Select v-model="formEmpValidate.sbBenefittype">
      									<Option :value="item.paramCode" v-for="(item,index) in selectsbBenefittype" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

                <Row>
                  <Col span="11" >
                  <FormItem :label="$t('lang_employee.payInfo.sbHfundlocatio')" prop="sbHfundlocatio">
                  <span @dblclick="dbsbHfundlocatio">
                  <Input :placeholder="$t('lang_employee.payInfo.sbHfundlocatioDis')" icon="search" :readonly="true" v-model="formEmpValidate.sbHfundlocatio" @on-click="selectHfundlocatio($t('lang_employee.searchTableTitle.hfundlocatio'))"/>
                  </span>
                  </FormItem>
                  </Col>
                  <Col span="11"  offset="1">
                  <FormItem :label="$t('lang_employee.payInfo.sbHfundpolicy')" prop="sbHfundpolicy">
      								<span @dblclick="dbsbHfundpolicy">
      								<Input :placeholder="$t('lang_employee.payInfo.sbHfundpolicyDis')" icon="search" :readonly="true" v-model="formEmpValidate.sbHfundpolicy" @on-click="selectBenefitpolicy($t('lang_employee.searchTableTitle.hfundpolicy'), '2')"/>
      								</span>
                  </FormItem>
                  </Col>
                </Row>

                <Row>
                  <Col span="11" >
                  <FormItem :label="$t('lang_employee.payInfo.sbHfundtype')" prop="sbHfundtype">
                    <Select v-model="formEmpValidate.sbHfundtype">
                      <Option :value="item.paramCode" v-for="(item,index) in selectsbBenefittype" :key="index">{{item.paramInfoCn}}</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>

      				<a name="educationInfo"><Icon type="compose" size="15" style="margin-right: 5px;"></Icon>{{$t('lang_employee.educationInfo.title')}}</a>
	      				<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.educationInfo.edEducationlevel')" prop="edEducationlevel">
      								<Select v-model="formEmpValidate.edEducationlevel">
      									<Option :value="item.paramCode" v-for="(item,index) in selectEducationlevel" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.educationInfo.edCuntry')" prop="edCuntry">
      								<Select v-model="formEmpValidate.edCuntry">
      									<Option :value="item.id" v-for="(item,index) in selectEdCuntry" :key="index">{{item.countryName}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.educationInfo.edSchool')" prop="edSchool">
      								<Input :placeholder="$t('lang_employee.educationInfo.edSchoolDis')" v-model="formEmpValidate.edSchool"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.educationInfo.edDegree')" prop="edDegree">
      								<Input :placeholder="$t('lang_employee.educationInfo.edDegreeDis')" v-model="formEmpValidate.edDegree"/>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.educationInfo.edSpecialty')" prop="edSpecialty">
      								<Input :placeholder="$t('lang_employee.educationInfo.edSpecialtyDis')" v-model="formEmpValidate.edSpecialty"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.educationInfo.edSdate')" prop="edSdate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.educationInfo.edSdateDis')" v-model="formEmpValidate.edSdate" style="width: 100%"></DatePicker>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.educationInfo.edEdate')" prop="edEdate">
      								<DatePicker type="date" :placeholder="$t('lang_employee.educationInfo.edEdateDis')" v-model="formEmpValidate.edEdate" style="width: 100%"></DatePicker>
      							</FormItem>
      						</Col>
      					</Row>

      				<a name="addressInfo"><Icon type="compose" size="15" style="margin-right: 5px;"></Icon>{{$t('lang_employee.addressInfo.title')}}</a>
      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.addressInfo.ctaMobile')" prop="ctaMobile">
      								<Input :placeholder="$t('lang_employee.addressInfo.ctaMobileDis')" v-model="formEmpValidate.ctaMobile"/>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.addressInfo.ctaPhone')" prop="ctaPhone">
      								<Input :placeholder="$t('lang_employee.addressInfo.ctaPhoneDis')" v-model="formEmpValidate.ctaPhone"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.addressInfo.ctaPersmail')" prop="ctaPersmail">
      								<Input :placeholder="$t('lang_employee.addressInfo.ctaPersmailDis')" v-model="formEmpValidate.ctaPersmail"/>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.addressInfo.ctaCompmail')" prop="ctaCompmail">
      								<Input :placeholder="$t('lang_employee.addressInfo.ctaCompmailDis')" v-model="formEmpValidate.ctaCompmail"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.addressInfo.ctaQq')" prop="ctaQq">
      								<Input :placeholder="$t('lang_employee.addressInfo.ctaQqDis')" v-model="formEmpValidate.ctaQq"/>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.addressInfo.ctaWechat')" prop="ctaWechat">
      								<Input :placeholder="$t('lang_employee.addressInfo.ctaWechatDis')" v-model="formEmpValidate.ctaWechat"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.addressInfo.ctaEmergcontact')" prop="ctaEmergcontact">
      								<Input :placeholder="$t('lang_employee.addressInfo.ctaEmergcontactDis')" v-model="formEmpValidate.ctaEmergcontact"/>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.addressInfo.ctaEmcrelation')" prop="ctaEmcrelation">
      								<Select v-model="formEmpValidate.ctaEmcrelation">
      									<Option :value="item.paramCode" v-for="(item,index) in selectEmcrelation" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.addressInfo.ctaEmcphone')" prop="ctaEmcphone">
      								<Input :placeholder="$t('lang_employee.addressInfo.ctaEmcphoneDis')" v-model="formEmpValidate.ctaEmcphone"/>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.addressInfo.ctaEmcaddr')" prop="ctaEmcaddr">
      								<Input :placeholder="$t('lang_employee.addressInfo.ctaEmcaddrDis')" v-model="formEmpValidate.ctaEmcaddr"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.addressInfo.addCuntry')" prop="addCuntry">
      								<Select v-model="formEmpValidate.addCuntry">
      									<Option :value="item.id" v-for="(item,index) in selectCuntry" :key="index">{{item.countryName}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.addressInfo.addProvince')" prop="addProvince">
      								<span @dblclick="dbaddProvince">
      								<Input :placeholder="$t('lang_employee.addressInfo.addProvinceDis')" icon="search" :readonly="true" v-model="formEmpValidate.addProvince" @on-click="selectProvince($t('lang_employee.searchTableTitle.province'))"/>
      								</span>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.addressInfo.addCity')" prop="addCity">
      								<span @dblclick="dbaddCity">
      								<Input :placeholder="$t('lang_employee.addressInfo.addCityDis')" icon="search" :readonly="true" v-model="formEmpValidate.addCity" @on-click="selectCity($t('lang_employee.searchTableTitle.city'))"/>
      								</span>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.addressInfo.addStreet')" prop="addStreet">
      								<Input :placeholder="$t('lang_employee.addressInfo.addStreetDis')" v-model="formEmpValidate.addStreet"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.addressInfo.addZip')" prop="addZip">
      								<Input :placeholder="$t('lang_employee.addressInfo.addZipDis')" v-model="formEmpValidate.addZip"/>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.addressInfo.addrCuntry')" prop="addrCuntry">
      								<Select v-model="formEmpValidate.addrCuntry">
      									<Option :value="item.id" v-for="(item,index) in selectrCuntry" :key="index">{{item.countryName}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.addressInfo.addrProvince')" prop="addrProvince">
      								<span @dblclick="dbrProvince">
      								<Input :placeholder="$t('lang_employee.addressInfo.addrProvinceDis')" icon="search" :readonly="true" v-model="formEmpValidate.addrProvince" @on-click="selectAddrProvince($t('lang_employee.searchTableTitle.rProvince'))"/>
      								</span>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.addressInfo.addrCity')" prop="addrCity">
      								<span @dblclick="dbrCity">
      								<Input :placeholder="$t('lang_employee.addressInfo.addrCityDis')" icon="search" :readonly="true" v-model="formEmpValidate.addrCity" @on-click="selectAddrCity($t('lang_employee.searchTableTitle.rCity'))"/>
      								</span>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="23">
      							<FormItem :label="$t('lang_employee.addressInfo.addrStreet')" prop="addrStreet">
      								<Input :placeholder="$t('lang_employee.addressInfo.addrStreetDis')" v-model="formEmpValidate.addrStreet"/>
      							</FormItem>
      						</Col>
      					</Row>

      					<Row>
      						<Col span="11">
      							<FormItem :label="$t('lang_employee.addressInfo.addrRegisterproperty')" prop="addrRegisterproperty">
      								<Select v-model="formEmpValidate.addrRegisterproperty">
      									<Option :value="item.paramCode" v-for="(item,index) in selectRegisterproperty" :key="index">{{item.paramInfoCn}}</Option>
      								</Select>
      							</FormItem>
      						</Col>
      						<Col span="11" offset="1">
      							<FormItem :label="$t('lang_employee.addressInfo.addrZip')" prop="addrZip">
      								<Input :placeholder="$t('lang_employee.addressInfo.addrZipDis')" v-model="formEmpValidate.addrZip"/>
      							</FormItem>
      						</Col>
      					</Row>

      				</Form>
      				</div>
      				<div style="padding-bottom: 20px;">
      					<Row type="flex" justify="end">
      				<Col span="4" pull="1">
      					<Button @click="closeAddEmp">{{$t('button.cal')}}</Button>
      					<Button type="primary" @click="handleSubmit">{{$t('button.sav')}}</Button>
      				</Col>
      			  </Row>
      				</div>
      			</Row>
      		</Col>
    	</Row>

     </div>
     <!--民族-->
     <transition name="fade">
    	<searchNation v-show="openNation" @closeEmp="closeNation" :searchClo="searchNationCol" @inputNation="inputNation" :params="params"  ref="searchNation"></searchNation>
     </transition>
     <!--银行-->
     <transition name="fade">
    	<searchBank v-show="openBank" @closeBank="closeBank" :searchBankCol="searchBankCol" @inputBank="inputBank" :params="paramsBank"  ref="searchBank"></searchBank>
     </transition>
     <!--社保政策-->
     <transition name="fade">
     	<searchSbPolicy @inputBenefitpolicy="inputBenefitpolicy" @inputHfundpolicy="inputHfundpolicy"  v-show="openSbPolicy" :logType="logType" @closeSbPolicy="closeSbPolicy" :searchSbPolicyCol="searchSbPolicyCol" @inputSbPolicy="inputSbPolicy" :params="paramsSbPolicy"  ref="searchSbPolicy"></searchSbPolicy>
     </transition>
     <!--雇佣公司-->
     <transition name="fade">
     	<searchHCompany v-show="openHCompany" @closeHCompany="closeHCompany" :searchHCClo="searchHCClo" @inputHCompany="inputHCompany" :params="paramsHCompany" ref="searchHCompany"></searchHCompany>
     </transition>
     <!--部门-->
      <transition name="fade">
     	<searchDept v-show="openDept" @closeDept="closeDept" :searchDeptClo="searchDeptClo" @inputDept="inputDept" :params="paramsDept" ref="searchDept"></searchDept>
     </transition>
     <!--岗位-->
     <transition name="fade">
     	<searchPost v-show="openPost" @closePost="closePost" :searchPostClo="searchPostClo" @inputPost="inputPost" :params="paramsPost" ref="searchPost"></searchPost>
     </transition>
     <!--成本中心-->
     <transition name="fade">
     	<searchOrgcostcenter v-show="openOrgcostcenter" @closeOrgcostcenter="closeOrgcostcenter" :searchCloumns="searchCloumns" @changeinput="changeinput" :params="paramsOrgcostcenter" ref="searchOrgcostcenter"></searchOrgcostcenter>
     </transition>
     <!--雇佣、工作、居住地点市-->
     <transition name="fade">
     	<searchHirelocation v-show="openHirelocation" :logType="logType" :cityType="cityType" @closeHirelocation="closeHirelocation" :searchHirelocationClo="searchHirelocationClo" @inputHirelocation="inputHirelocation" @inputWorklocation="inputWorklocation" @inputBenefitlocation="inputBenefitlocation" @inputHfundlocatio="inputHfundlocatio" @inputProvince="inputProvince" @inputCity="inputCity" @inputrProvince="inputrProvince" @inputrCity="inputrCity" :params="paramsHirelocation"  ref="searchHirelocation"></searchHirelocation>
     </transition>
     <!--上级经理-->
     <transition name="fade">
     	<searchManager v-show="openManger" :logType="logType" @closeManger="closeManger" :searchMangerClo="searchMangerClo" @inputManger="inputManger" @inputGManger="inputGManger" @inputCompHR="inputCompHR" :params="paramsManger" ref="searchManager"></searchManager>
     </transition>

    </div>
</template>
<script>
	import { getDataLevelUserLoginSenior, getDataLevelUserLogin, uploadimage } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'
	import searchNation from '../../../components/searchTable/searchNation'
	import searchBank from '../../../components/searchTable/searchBank'
	import searchSbPolicy from '../../../components/searchTable/searchSbPolicy'
	import searchHCompany from '../../../components/searchTable/searchHCompany'
	import searchDept from '../../../components/searchTable/searchDept'
	import searchPost from '../../../components/searchTable/searchPost'
	import searchOrgcostcenter from '../../../components/searchTable/searchOrgcostcenter'
	import searchHirelocation from '../../../components/searchTable/searchHirelocation'
	import searchManager from '../../../components/searchTable/searchManager'
  import imgEdit from '../../../components/imgUpdate/imgEdit'

  export default {
    data() {
      return {
        logType: '',
        httpImg: '',
        cropedImg: '',
        cropedImgDis: '',
      	empHeader: '',
      	cityType: '',
      	openNation: false,
      	openBank: false,
      	openSbPolicy: false,
      	openHCompany: false,
      	openDept: false,
      	openPost: false,
      	openOrgcostcenter: false,
      	openHirelocation: false,
      	openManger: false,
      	selectGender: [],
      	selectIdsType: [],
      	selectMarriage: [],
      	selectPolitical: [],
      	selectTechnicaltitle: [],
      	selectEmptype: [],
      	selectContracttype: [],
      	selectContractperiod: [],
      	selectPostlevel: [],
      	selectSalarylevel: [],
      	selectTravellevel: [],
      	selectAdminlevel: [],
      	selectSalaryset: [],
      	selectEducationlevel: [],
      	selectEmcrelation: [],
      	selectsbBenefittype: [],
      	selectEdCuntry: [],
      	selectCuntry: [],
      	selectrCuntry: [],
      	selectRegisterproperty: [],
      	selectctContractworktime: [],
      	selectContractprom: [],
      	selectProbationprom: [],
      	selectConfidential: [],
      	selectctProbation: [],
      	formEmpValidate: {
      		baseGid: '',
      		baseCname: '',
      		baseAlias: '',
      		baseLastname: '',
      		baseFirstname: '',
      		idsType: '',
      		idsNo: '',
      		baseBirthdate: '',
      		baseGender: '',
      		baseMarriage: '',
      		baseNation: '',
      		basePolitical: '',
      		baseTechnicaltitle: '',
      		baseTechspec: '',
      		baseFirstworkdate: '',
      		baseTechdate: '',
      		pkiWorkno: '',
      		pkiEmptype: '',
      		compHirecompany: '',
      		compDept: '',
      		compPost: '',
      		compCostcenter: '',
      		compHirelocation: '',
      		compWorklocation: '',
      		compBuspmp: '',
      		compFunpmp: '',
      		compEntrydate: '',
      		compServicedate: '',
      		compCertificatedate: '',
      		compHr: '',
      		ctContracttype: '',
      		ctContractperiod: '',
      		ctContractsdate: '',
      		ctContractedate: '',
      		ctContractprom: '',
      		ctConfidential: '',
      		ctContractworktime: '',
      		ctSigndate: '',
      		ctProbation: '',
      		ctProbationdate: '',
      		ctProbationprom: '',
      		salPostlevel: '',
      		salSalarylevel: '',
      		salTravellevel: '',
      		salAdminlevel: '',
      		salSalaryset: '',
      		bkBank: '',
      		bkAccount: '',
      		bkAccnane: '',
      		sbBenefitlocation: '',
      		sbBenefitpolicy: '',
      		sbBenefittype: '',
      		edEducationlevel: '',
      		edCuntry: '',
      		edSchool: '',
      		edDegree: '',
      		edSpecialty: '',
      		edSdate: '',
      		edEdate: '',
      		ctaMobile: '',
      		ctaPhone: '',
      		ctaPersmail: '',
      		ctaCompmail: '',
      		ctaQq: '',
      		ctaWechat: '',
      		ctaEmergcontact: '',
      		ctaEmcrelation: '',
      		ctaEmcphone: '',
      		ctaEmcaddr: '',
      		addCuntry: '',
      		addProvince: '',
      		addCity: '',
      		addStreet: '',
      		addZip: '',
      		addrCuntry: '',
      		addrProvince: '',
      		addrCity: '',
      		addrStreet: '',
      		addrRegisterproperty: '',
      		addrZip: '',
      		nationPCode: '',
      		compHirecompanyPid: '',
      		compDeptPid: '',
      		compPostPid: '',
      		compCostcenterPid: '',
      		compHirelocationPid: '',
      		compWorklocationPid: '',
      		compBuspmpPid: '',
      		compFunpmpPid: '',
      		bkBankPid: '',
      		sbBenefitlocationPid: '',
      		sbBenefitpolicyPid: '',
      		addCuntryPid: '',
      		addProvincePid: '',
      		addCityPid: '',
      		addrProvincePid: '',
      		addrCityPid: '',
      		comPHRPid: '',
          sbHfundpolicyPid: '',
          sbHfundlocatioPid: '',
          sbHfundlocatio: '',
          sbHfundpolicy: '',
          sbHfundtype: '',
      	},
//    	民族
      	searchNationCol: [
      		{
            title: this.$t('lang_employee.searchColumn.nationCn'),
            key: 'lanCn',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_employee.searchColumn.nationEn'),
            key: 'lanEn',
            sortable: 'custom',
            width: 379,
          },
      	],
      	params: {
           _mt: 'baseLang.selectByBaseLangPageList',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '弹出框',
          lanType: 'param_info_nationtype',
        },
//      银行
        searchBankCol: [
        	{
            title: this.$t('lang_baseManage.baseBankinfo.bankCname'),
            key: 'bankCname',
            sortable: 'custom',
//          width: 380,
          },
          {
            title: this.$t('lang_baseManage.baseBankinfo.bankCode'),
            key: 'bankCode',
            sortable: 'custom',
//          width: 379,
          },
        ],
        paramsBank: {
        	_mt: 'baseBankinfo.getPage',
					rows: 10,
					page: 1,
					sort: 'id',
					order: 'desc',
					funId: '1100',
					logType: '开户银行',
        },
//      社保政策
				searchSbPolicyCol: [
					{
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyCn'),
            key: 'sihfpcyCn',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_sihfPolicy.sihtPolicy.sihfpcyNo'),
            key: 'sihfpcyNo',
            sortable: 'custom',
            width: 379,
          },
				],
				paramsSbPolicy: {
					_mt: 'sihfPolicy.getPage',
					rows: 10,
					page: 1,
					sort: 'id',
					order: 'asc',
          sihfpcyType: '',
					logType: '查询List',
				},
//      雇佣公司
        searchHCClo: [
        	{
            title: this.$t('lang_employee.searchColumn.unitCodeCompany'),
            key: 'unitCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_employee.searchColumn.compCnFullName'),
            key: 'unitFname',
          },
        ],
        paramsHCompany: {
        	_mt: 'orgUnits.getByOrgFramePageList',
					rows: 10,
					page: 1,
					sort: 'id',
					order: 'desc',
					unitType: '01company',
					unitPid: '0',
					logType: '雇佣公司',
        },
//      部门
        searchDeptClo: [
        	{
            title: this.$t('lang_employee.searchColumn.unitCodeDepart'),
            key: 'unitCode',
            sortable: 'custom',
          },
        	{
            title: this.$t('lang_employee.searchColumn.departCnFullName'),
            key: 'unitFname',
          },
        ],
        paramsDept: {
        	_mt: 'orgUnits.getByOrgFramePageList',
					rows: 10,
					page: 1,
					sort: 'id',
					order: 'desc',
					funId: '1106',
					logType: '部门',
					unitType: '02dept',
        },
//      岗位
        searchPostClo: [
        	{
            title: this.$t('lang_employee.searchColumn.postCode'),
            key: 'postCode',
            sortable: 'custom',
          },
        	{
            title: this.$t('lang_employee.searchColumn.postFnameCnDis'),
            key: 'postFname',
          },
          {
            title: this.$t('lang_employee.searchColumn.postFnameEnDis'),
            key: 'postFnameEnDis',
          },
        ],
        paramsPost: {
        	_mt: 'orgPost.getPage',
					rows: 10,
					page: 1,
					sort: 'id',
					order: 'desc',
					funId: '1107',
					logType: '岗位',
        },
//      成本中心
        searchCloumns: [
        	{
            title: this.$t('lang_organization.orgcostcenter.costCode'),
            key: 'costCode',
            sortable: 'custom',
          },
          {
            title: this.$t('lang_organization.orgcostcenter.cname'),
            key: 'cname',
          },
          {
            title: this.$t('lang_organization.orgcostcenter.ename'),
            key: 'ename',
          },
        ],
        paramsOrgcostcenter: {
        	_mt: 'orgCostcenter.getPage',
					rows: 10,
					page: 1,
					sort: 'id',
					order: 'desc',
					funId: '1107',
					logType: '成本中心查询',
        },
//      雇佣/工作地点
        searchHirelocationClo: [
        	{
            title: this.$t('lang_baseManage.baseCity.cityName'),
            key: 'cityName',
            sortable: 'custom',
            width: 380,
          },
          {
            title: this.$t('lang_baseManage.baseCity.cityTypeName'),
            key: 'cityTypeName',
            sortable: 'custom',
            width: 379,
          },
        ],
        paramsHirelocation: {
        	_mt: 'baseCity.getPage',
          sort: 'id',
          order: 'desc',
          rows: 10,
          page: 1,
          funId: '1',
          logType: '地点',
          data: '{"cityIsvalid" : "1"}',
        },
//      上级经理
				searchMangerClo: [
					{
						title: this.$t('lang_employee.empmaster.empCname'),
						key: 'empCname',
						sortable: 'custom',
					},
					{
						title: this.$t('lang_employee.baseInfo.baseGid'),
						key: 'empGid',
						sortable: 'custom',
					},
				],
				paramsManger: {
						_mt: 'viewEmpMaster.getPage',
	          sort: 'id',
	          order: 'desc',
	          rows: 10,
	          page: 1,
	          logType: '员工查询',
	          data: '{}',
				},
        ruleValidate: {
          baseGid: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.baseGid'), trigger: 'blur' },
          ],
          baseCname: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.baseCname'), trigger: 'blur' },
          ],
          baseLastname: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.baseLastname'), trigger: 'blur' },
          ],
          baseFirstname: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.baseFirstname'), trigger: 'blur' },
          ],
          idsType: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.idsType'), trigger: 'blur, change' },
          ],
          idsNo: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.idsNo'), trigger: 'blur' },
          ],
          baseBirthdate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.baseBirthdate'), trigger: 'blur, change' },
          ],
          baseGender: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.baseGender'), trigger: 'blur, change' },
          ],
          baseMarriage: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.baseMarriage'), trigger: 'blur, change' },
          ],
          baseNation: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.baseNation'), trigger: 'blur, change' },
          ],
          basePolitical: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.basePolitical'), trigger: 'blur, change' },
          ],
          baseTechnicaltitle: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.baseTechnicaltitle'), trigger: 'blur, change' },
          ],
          baseTechspec: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.baseTechspec'), trigger: 'blur' },
          ],
          baseFirstworkdate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.baseFirstworkdate'), trigger: 'blur, change' },
          ],
          baseTechdate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.baseTechdate'), trigger: 'blur, change' },
          ],
          pkiWorkno: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.pkiWorkno'), trigger: 'blur' },
          ],
          pkiEmptype: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.pkiEmptype'), trigger: 'blur, change' },
          ],
          compHirecompany: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.compHirecompany'), trigger: 'blur, change' },
          ],
          compDept: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.compDept'), trigger: 'blur, change' },
          ],
          compPost: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.compPost'), trigger: 'blur, change' },
          ],
          compCostcenter: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.compCostcenter'), trigger: 'blur, change' },
          ],
          compHirelocation: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.compHirelocation'), trigger: 'blur, change' },
          ],
          compWorklocation: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.compWorklocation'), trigger: 'blur, change' },
          ],
          compBuspmp: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.compBuspmp'), trigger: 'blur, change' },
          ],
          compFunpmp: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.compFunpmp'), trigger: 'blur, change' },
          ],
          compEntrydate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.compEntrydate'), trigger: 'blur, change' },
          ],
          compServicedate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.compServicedate'), trigger: 'blur, change' },
          ],
          compCertificatedate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.compCertificatedate'), trigger: 'blur, change' },
          ],
          compHr: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.compHr'), trigger: 'blur, change' },
          ],
          ctContracttype: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctContracttype'), trigger: 'blur, change' },
          ],
          ctContractperiod: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctContractperiod'), trigger: 'blur, change' },
          ],
          ctContractsdate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.ctContractsdate'), trigger: 'blur, change' },
          ],
          ctContractedate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.ctContractedate'), trigger: 'blur, change' },
          ],
          ctContractprom: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctContractprom'), trigger: 'blur, change' },
          ],
          ctConfidential: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctConfidential'), trigger: 'blur, change' },
          ],
          ctContractworktime: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctContractworktime'), trigger: 'blur, change' },
          ],
          ctSigndate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.ctSigndate'), trigger: 'blur, change' },
          ],
          ctProbation: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctProbation'), trigger: 'blur, change' },
          ],
          ctProbationdate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.ctProbationdate'), trigger: 'blur, change' },
          ],
          ctProbationprom: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctProbationprom'), trigger: 'blur, change' },
          ],
          salPostlevel: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.salPostlevel'), trigger: 'blur, change' },
          ],
          salSalarylevel: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.salSalarylevel'), trigger: 'blur, change' },
          ],
          salTravellevel: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.salTravellevel'), trigger: 'blur, change' },
          ],
          salAdminlevel: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.salAdminlevel'), trigger: 'blur, change' },
          ],
          salSalaryset: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.salSalaryset'), trigger: 'blur, change' },
          ],
          bkBank: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.bkBank'), trigger: 'blur, change' },
          ],
          bkAccount: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.bkAccount'), trigger: 'blur' },
          ],
          bkAccnane: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.bkAccnane'), trigger: 'blur' },
          ],
          sbBenefitlocation: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.sbBenefitlocation'), trigger: 'blur, change' },
          ],
          sbHfundlocatio: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.sbHfundlocatio'), trigger: 'blur, change' },
          ],
          sbBenefitpolicy: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.sbBenefitpolicy'), trigger: 'blur, change' },
          ],
          sbBenefittype: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.sbBenefittype'), trigger: 'blur, change' },
          ],
          sbHfundpolicy: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.sbHfundpolicy'), trigger: 'blur, change' },
          ],
          sbHfundtype: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.sbHfundtype'), trigger: 'blur, change' },
          ],
          edEducationlevel: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.edEducationlevel'), trigger: 'blur, change' },
          ],
          edCuntry: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.edCuntry'), trigger: 'blur, change' },
          ],
          edSchool: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.edSchool'), trigger: 'blur' },
          ],
          edDegree: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.edDegree'), trigger: 'blur' },
          ],
          edSpecialty: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.edSpecialty'), trigger: 'blur' },
          ],
          edSdate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.edSdate'), trigger: 'blur, change' },
          ],
          edEdate: [
            { required: true, type: 'date', message: this.$t('lang_employee.empmasterCheck.edEdate'), trigger: 'blur, change' },
          ],
          ctaMobile: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctaMobile'), trigger: 'blur' },
          ],
          ctaPhone: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctaPhone'), trigger: 'blur' },
          ],
          ctaPersmail: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctaPersmail'), trigger: 'blur' },
          ],
          ctaCompmail: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctaCompmail'), trigger: 'blur' },
          ],
          ctaQq: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctaQq'), trigger: 'blur' },
          ],
          ctaWechat: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctaWechat'), trigger: 'blur' },
          ],
          ctaEmergcontact: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctaEmergcontact'), trigger: 'blur' },
          ],
          ctaEmcrelation: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctaEmcrelation'), trigger: 'blur, change' },
          ],
          ctaEmcphone: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctaEmcphone'), trigger: 'blur' },
          ],
          ctaEmcaddr: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.ctaEmcaddr'), trigger: 'blur' },
          ],
          addCuntry: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.addCuntry'), trigger: 'blur, change' },
          ],
          addProvince: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.addProvince'), trigger: 'blur, change' },
          ],
          addCity: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.addCity'), trigger: 'blur, change' },
          ],
          addStreet: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.addStreet'), trigger: 'blur' },
          ],
          addZip: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.addZip'), trigger: 'blur' },
          ],
          addrCuntry: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.addrCuntry'), trigger: 'blur, change' },
          ],
          addrProvince: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.addrProvince'), trigger: 'blur, change' },
          ],
          addrCity: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.addrCity'), trigger: 'blur, change' },
          ],
          addrStreet: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.addrStreet'), trigger: 'blur' },
          ],
          addrRegisterproperty: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.addrRegisterproperty'), trigger: 'blur, change' },
          ],
          addrZip: [
            { required: true, message: this.$t('lang_employee.empmasterCheck.addrZip'), trigger: 'blur' },
          ],
        },
      }
    },
    props: {
    	id: Number,
//    	logType: String,
    },
    updated() {
    },
    components: {
      searchNation,
      searchBank,
      searchSbPolicy,
      searchHCompany,
      searchDept,
      searchPost,
      searchOrgcostcenter,
      searchHirelocation,
      searchManager,
    },
    mounted() {
    	this.getSelect()
    	this.getSelectCountry()
    	this.getSelectSalSet()
    },
    created() {
      this.httpImg = pubsource.pub_pubf_downlink
    },
    methods: {
    	handleSubmit() {
        const t = this
        const dataValue = deepCopy(t.formEmpValidate)
//      基本信息
        let empBase = {
        	empGid: dataValue.baseGid,
        	empCname: dataValue.baseCname,
        	empFirstname: dataValue.baseLastname,
        	empLastname: dataValue.baseFirstname,
        	empAlias: dataValue.baseAlias,
        	empGender: dataValue.baseGender,
        	empBirthdate: dataValue.baseBirthdate === '' ? '' : new Date(dataValue.baseBirthdate).format('yyyy-MM-dd'),
        	empNation: dataValue.nationPCode,
        	empMarriage: dataValue.baseMarriage,
        	empPolitical: dataValue.basePolitical,
        	empFirstworkdate: dataValue.baseFirstworkdate === '' ? '' : new Date(dataValue.baseFirstworkdate).format('yyyy-MM-dd'),
        	empTechnicaltitle: dataValue.baseTechnicaltitle,
        	empTechspec: dataValue.baseTechspec,
        	empTechdate: dataValue.baseTechdate === '' ? '' : new Date(dataValue.baseTechdate).format('yyyy-MM-dd'),
        }
//      证件信息
        let empIds = {
        	empidType: dataValue.idsType,
        	empidNo: dataValue.idsNo,
        }
//      员工信息
        let empKeyInfo = {
        	empkiWorkno: dataValue.pkiWorkno,
        	empkiEmptype: dataValue.pkiEmptype,
        }
//      公司信息
        let empCompany = {
        	empcompHirecompany: dataValue.compHirecompanyPid,
        	empcompDept: dataValue.compDeptPid,
        	empcompPost: dataValue.compPostPid,
        	empcompCostcenter: dataValue.compCostcenterPid,
        	empcompHirelocation: dataValue.compHirelocationPid,
        	empcompWorklocation: dataValue.compWorklocationPid,
        	empcompBuspmp: dataValue.compBuspmpPid,
        	empcompFunpmp: dataValue.compFunpmpPid,
        	empcompEntrydate: dataValue.compEntrydate === '' ? '' : new Date(dataValue.compEntrydate).format('yyyy-MM-dd'),
        	empcompServicedate: dataValue.compServicedate === '' ? '' : new Date(dataValue.compServicedate).format('yyyy-MM-dd'),
        	empcompCertificatedate: dataValue.compCertificatedate === '' ? '' : new Date(dataValue.compCertificatedate).format('yyyy-MM-dd'),
        	empcompHr: dataValue.comPHRPid,
        }
//      合同信息
        let empContract = {
        	empctContracttype: dataValue.ctContracttype,
        	empctContractperiod: dataValue.ctContractperiod,
        	empctContractsdate: dataValue.ctContractsdate === '' ? '' : new Date(dataValue.ctContractsdate).format('yyyy-MM-dd'),
        	empctContractedate: dataValue.ctContractedate === '' ? '' : new Date(dataValue.ctContractedate).format('yyyy-MM-dd'),
        	empctContractprom: dataValue.ctContractprom,
        	empctConfidential: dataValue.ctConfidential,
        	empctContractworktime: dataValue.ctContractworktime,
        	empctSigndate: dataValue.ctSigndate === '' ? '' : new Date(dataValue.ctSigndate).format('yyyy-MM-dd'),
        	empctProbation: dataValue.ctProbation,
        	empctProbationdate: dataValue.ctProbationdate === '' ? '' : new Date(dataValue.ctProbationdate).format('yyyy-MM-dd'),
        	empctProbationprom: dataValue.ctProbationprom,
        }
//      薪资信息
        let empPayrollSalaryBase = {
        	empsalbsPostlevel: dataValue.salPostlevel,
        	empsalbsSalarylevel: dataValue.salSalarylevel,
        	empsalbsTravellevel: dataValue.salTravellevel,
        	empsalbsAdminlevel: dataValue.salAdminlevel,
        	empsalbsSalaryset: dataValue.salSalaryset,
//      	empsalbsTaxlocation: dataValue.salTaxlocation,
//      	empsalbsSalarycurrency: dataValue.salSalarycurrency,
        }
//      社保信息
        let empSihfBenefit = {
        	empbntBenefitlocation: dataValue.sbBenefitlocationPid,
        	empbntBenefitpolicy: dataValue.sbBenefitpolicyPid,
        	empbntBenefittype: dataValue.sbBenefittype,
        }
        //      社保信息
        let empSihfHfund = {
          empbntHfundlocatio: dataValue.sbHfundlocatioPid,
          empbntHfundpolicy: dataValue.sbHfundpolicyPid,
          empbntHfundtype: dataValue.sbHfundtype,
        }
//      银行信息
        let empBank = {
        	empbkBank: dataValue.bkBankPid,
        	empbkAccount: dataValue.bkAccount,
        	empbkAccnane: dataValue.bkAccnane,
        }
//      最高学历信息
        let empEducation = {
        	empedEducationlevel: dataValue.edEducationlevel,
        	empedCuntry: dataValue.edCuntry,
        	empedSchool: dataValue.edSchool,
        	empedDegree: dataValue.edDegree,
        	empedSpecialty: dataValue.edSpecialty,
        	empedSdate: dataValue.edSdate === '' ? '' : new Date(dataValue.edSdate).format('yyyy-MM-dd'),
        	empedEdate: dataValue.edEdate === '' ? '' : new Date(dataValue.edEdate).format('yyyy-MM-dd'),
        }
//      联系地址信息
        let empContact = {
        	empctaMobile: dataValue.ctaMobile,
        	empctaPhone: dataValue.ctaPhone,
        	empctaPersmail: dataValue.ctaPersmail,
        	empctaCompmail: dataValue.ctaCompmail,
        	empctaQq: dataValue.ctaQq,
        	empctaWechat: dataValue.ctaWechat,
        	empctaEmergcontact: dataValue.ctaEmergcontact,
        	empctaEmcrelation: dataValue.ctaEmcrelation,
        	empctaEmcphone: dataValue.ctaEmcphone,
        	empctaEmcaddr: dataValue.ctaEmcaddr,
        }
//      地址信息
        let empAddress = {
        	empaddrCuntry: dataValue.addCuntry,
        	empaddrProvince: dataValue.addProvincePid,
        	empaddrCity: dataValue.addCityPid,
        	empaddrStreet: dataValue.addStreet,
        	empaddrZip: dataValue.addZip,
        }
//      地址2
        let empAddress2 = {
        	empaddrCuntry: dataValue.addrCuntry,
        	empaddrProvince: dataValue.addrProvincePid,
        	empaddrCity: dataValue.addrCityPid,
        	empaddrStreet: dataValue.addrStreet,
        	empaddrZip: dataValue.addrZip,
        	empaddrRegisterproperty: dataValue.addrRegisterproperty,
        }
				let data = {
					empBase: empBase,
					empIds: empIds,
					empKeyInfo: empKeyInfo,
					empCompany: empCompany,
					empContract: empContract,
					empPayrollSalaryBase: empPayrollSalaryBase,
					empSihfBenefit: empSihfBenefit,
          empSihfHfund: empSihfHfund,
					empBank: empBank,
					empEducation: empEducation,
					empContact: empContact,
					empAddress: empAddress,
					empAddress2: empAddress2,
					_mt: 'empMaster.addOrUpd',
					logType: '新增员工主数据',
				}
//				for (const dat in data) {
//        if (data[dat] === '') {
//          delete data[dat]
//        }
//      }
        t.$refs.formEmpValidate.validate((valid) => {
          if (valid) {
				getDataLevelUserLoginSenior(data).then((res) => {
              if (isSuccess(res, t)) {
                t.$emit('closeEmp')
                t.$Modal.success({
                	title: this.$t('reminder.suc'),
                	content: this.$t('reminder.addsuccess'),
                })
                t.$emit('getData', res.data.content[0])
              }
          }).catch(() => {
              this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          }
        })
      },
    	handleClose() {
    		const t = this
    		t.$emit('closeEmp')
    	},
    	closeAddEmp() {
    		const t = this
    		t.$emit('closeEmp')
    	},
    	getSelect() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'baseParmInfo.getSelectValue',
          logType: this.$t('button.ser'),
          typeCode: 'gender,marrystatus,political,techlevel,emptype,contrpertype,postlevel,salarylevel,travellevel,adminlevel,education,relationship,benefitacctype,idtype,registerproperty,worktimetype,contperiod,noticedays,confidential,probperiod',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectGender = res.data.content[0].value[0].paramList
            t.selectMarriage = res.data.content[0].value[1].paramList
            t.selectPolitical = res.data.content[0].value[2].paramList
            t.selectTechnicaltitle = res.data.content[0].value[3].paramList
            t.selectEmptype = res.data.content[0].value[4].paramList
            t.selectContracttype = res.data.content[0].value[5].paramList
            t.selectPostlevel = res.data.content[0].value[6].paramList
            t.selectSalarylevel = res.data.content[0].value[7].paramList
            t.selectTravellevel = res.data.content[0].value[8].paramList
            t.selectAdminlevel = res.data.content[0].value[9].paramList
            t.selectEducationlevel = res.data.content[0].value[10].paramList
            t.selectEmcrelation = res.data.content[0].value[11].paramList
            t.selectsbBenefittype = res.data.content[0].value[12].paramList
            t.selectIdsType = res.data.content[0].value[13].paramList
            t.selectRegisterproperty = res.data.content[0].value[14].paramList
            t.selectctContractworktime = res.data.content[0].value[15].paramList
            t.selectContractperiod = res.data.content[0].value[16].paramList
            t.selectContractprom = res.data.content[0].value[17].paramList
            t.selectProbationprom = res.data.content[0].value[17].paramList
            t.selectConfidential = res.data.content[0].value[18].paramList
            t.selectctProbation = res.data.content[0].value[19].paramList
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelectCountry() {
      	const t = this
        getDataLevelUserLogin({
          _mt: 'baseCountry.getSelectValue',
          data: '{}',
          logType: '国家查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.selectEdCuntry = res.data.content[0].value
            t.selectCuntry = res.data.content[0].value
            t.selectrCuntry = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getSelectSalSet() {
      	const t = this
        getDataLevelUserLogin({
          _mt: 'paySalSet.getSelectValue',
          data: '{}',
          logType: '薪资账套查询',
        }).then((res) => {
          if (isSuccess(res, t)) {
          	t.selectSalaryset = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
//    民族
    	selectNation() {
    		const t = this
    		t.$refs.searchNation.getData(this.params)
    		t.openNation = true
    	},
    	closeNation() {
    		const t = this
    		t.$refs.searchNation.nationName = ''
    		t.openNation = false
    	},
    	inputNation(name, code) {
    		const t = this
    		t.formEmpValidate.baseNation = name
    		t.formEmpValidate.nationPCode = code
    	},
    	dbNation() {
    		const t = this
    		t.formEmpValidate.baseNation = ''
    		t.formEmpValidate.nationPCode = ''
    	},
//  	银行
    	selectBank() {
    		const t = this
    		t.$refs.searchBank.getData(this.paramsBank)
    		t.openBank = true
    	},
    	inputBank(name, id) {
    		const t = this
    		t.formEmpValidate.bkBank = name
    		t.formEmpValidate.bkBankPid = id
    	},
    	dbbkBank() {
    		const t = this
    		t.formEmpValidate.bkBank = ''
    		t.formEmpValidate.bkBankPid = ''
    	},
    	closeBank() {
    		const t = this
    		t.$refs.searchBank.bankCname = ''
    		t.openBank = false
    	},
//  	社保政策
    	selectBenefitpolicy(logType, num) {
    		const t = this
        t.logType = logType
        if (num === '1') {
          t.paramsSbPolicy.sihfpcyType = '01social'
        } else if (num === '2') {
          t.paramsSbPolicy.sihfpcyType = '02hfund'
        }
        t.$refs.searchSbPolicy.getData(this.paramsSbPolicy)
    		t.openSbPolicy = true
    	},
    	inputSbPolicy(name, id) {
    		const t = this
    		t.formEmpValidate.sbBenefitpolicy = name
    		t.formEmpValidate.sbBenefitpolicyPid = id
    	},
    	dbsbBenefitpolicy() {
    		const t = this
    		t.formEmpValidate.sbBenefitpolicy = ''
    		t.formEmpValidate.sbBenefitpolicyPid = ''
    	},
      inputBenefitpolicy(name, id) {
        const t = this
        t.formEmpValidate.sbBenefitpolicy = name
        t.formEmpValidate.sbBenefitpolicyPid = id
      },
      dbsbHfundpolicy() {
        const t = this
        t.formEmpValidate.sbHfundpolicy = ''
        t.formEmpValidate.sbHfundpolicyPid = ''
      },
      inputHfundpolicy(name, id) {
        const t = this
        t.formEmpValidate.sbHfundpolicy = name
        t.formEmpValidate.sbHfundpolicyPid = id
      },
    	closeSbPolicy() {
    		const t = this
    		t.$refs.searchSbPolicy.sihfpcyCn = ''
    		t.openSbPolicy = false
    	},
//  	雇佣公司
    	selectHCompany() {
    		const t = this
    		t.$refs.searchHCompany.getData(this.paramsHCompany)
    		t.openHCompany = true
    	},
    	closeHCompany() {
    		const t = this
    		t.$refs.searchHCompany.unitCode = ''
    		t.openHCompany = false
    	},
    	inputHCompany(name, id) {
    		const t = this
    		t.formEmpValidate.compHirecompany = name
    		t.formEmpValidate.compHirecompanyPid = id
    	},
    	dbHCompany() {
    		const t = this
    		t.formEmpValidate.compHirecompany = ''
    		t.formEmpValidate.compHirecompanyPid = ''
        t.dbDept()
    	},
//  	部门
    	selectDept() {
    		const t = this
    		if (t.formEmpValidate.compHirecompanyPid === '') {
    			t.$Modal.warning({
    				title: this.$t('reminder.remind'),
    				content: this.$t('lang_employee.empmaster.empHireCompDis'),
    			})
    		} else {
    			const paramsDept = deepCopy(t.paramsDept)
	    		t.$refs.searchDept.getData(paramsDept, t.formEmpValidate.compHirecompanyPid)
	    		t.openDept = true
    		}
    	},
    	closeDept() {
    		const t = this
    		t.$refs.searchDept.unitCode = ''
    		t.openDept = false
    	},
    	inputDept(name, id) {
    		const t = this
    		t.formEmpValidate.compDept = name
    		t.formEmpValidate.compDeptPid = id
//  		localStorage.setItem('postUNIT', 'unit' + id)
    	},
    	dbDept() {
    		const t = this
    		t.formEmpValidate.compDept = ''
    		t.formEmpValidate.compDeptPid = ''
        t.dbPost()
    	},
//  	岗位
    	selectPost() {
    		const t = this
    		if (t.formEmpValidate.compDeptPid === '') {
    			t.$Modal.warning({
    				title: this.$t('reminder.remind'),
    				content: this.$t('lang_employee.empmaster.empPostDis'),
    			})
    		} else {
    			const paramsPost = deepCopy(t.paramsPost)
//	    		paramsPost.postUnit = 'unit' + t.formEmpValidate.compDeptPid
	    		t.$refs.searchPost.getData(paramsPost, 'unit' + t.formEmpValidate.compDeptPid)
	    		t.openPost = true
    		}
    	},
    	closePost() {
    		const t = this
    		t.$refs.searchPost.postCode = ''
    		t.openPost = false
    	},
    	inputPost(name, id, postName, postId) {
    		const t = this
    		t.formEmpValidate.compPost = name
    		t.formEmpValidate.compPostPid = id
    		t.formEmpValidate.compCostcenter = postName
    		t.formEmpValidate.compCostcenterPid = postId
    	},
    	dbPost() {
    		const t = this
    		t.formEmpValidate.compPost = ''
    		t.formEmpValidate.compPostPid = ''
        t.dbCostcenter()
    	},
//  	成本中心
    	selectCostcenter() {
    		const t = this
        t.$refs.searchOrgcostcenter.getData(this.paramsOrgcostcenter)
        t.openOrgcostcenter = true
    	},
    	closeOrgcostcenter() {
    		const t = this
    		t.$refs.searchOrgcostcenter.costCode = ''
    		t.openOrgcostcenter = false
    	},
    	changeinput(name, id) {
    		const t = this
    		t.formEmpValidate.compCostcenter = name
    		t.formEmpValidate.compCostcenterPid = id
    	},
    	dbCostcenter() {
    		const t = this
    		t.formEmpValidate.compCostcenter = ''
    		t.formEmpValidate.compCostcenterPid = ''
    	},
//  	雇佣、工作地点
//					雇佣
    	selectHirelocation(logType) {
    		const t = this
    		t.logType = logType
    		t.cityType = '02city'
    		t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city')
    		t.openHirelocation = true
    	},
//  	工作
    	selectWorklocation(logType) {
    		const t = this
    		t.logType = logType
    		t.cityType = '02city'
    		t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city')
    		t.openHirelocation = true
    	},
//  	社保
    	selectBenefitlocation(logType) {
    		const t = this
    		t.logType = logType
    		t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city\',\'03county')
    		t.openHirelocation = true
    	},
//  	公积金
    	selectHfundlocatio(logType) {
    		const t = this
    		t.logType = logType
    		t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city\',\'03county')
    		t.openHirelocation = true
    	},
//  	居住省份
    	selectProvince(logType) {
    		const t = this
    		t.logType = logType
    		t.cityType = '01prov'
    		t.$refs.searchHirelocation.getData(this.paramsHirelocation, '01prov')
    		t.openHirelocation = true
    	},
//  	居住城市
    	selectCity(logType) {
    		const t = this
    		t.logType = logType
    		t.cityType = '02city'
    		t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city')
    		t.openHirelocation = true
    	},
//  	户籍省份
    	selectAddrProvince(logType) {
    		const t = this
    		t.logType = logType
    		t.cityType = '01prov'
    		t.$refs.searchHirelocation.getData(this.paramsHirelocation, '01prov')
    		t.openHirelocation = true
    	},
//  	户籍城市
    	selectAddrCity(logType) {
    		const t = this
    		t.logType = logType
    		t.cityType = '02city'
    		t.$refs.searchHirelocation.getData(this.paramsHirelocation, '02city')
    		t.openHirelocation = true
    	},
    	closeHirelocation() {
    		const t = this
    		t.$refs.searchHirelocation.cityName = ''
    		t.$refs.searchHirelocation.theCityType = ''
    		t.openHirelocation = false
    	},
    	inputHirelocation(name, id) {
    		const t = this
    		t.formEmpValidate.compHirelocation = name
    		t.formEmpValidate.compHirelocationPid = id
    	},
    	dbHirelocation() {
    		const t = this
    		t.formEmpValidate.compHirelocation = ''
    		t.formEmpValidate.compHirelocationPid = ''
    	},
    	inputWorklocation(name, id) {
    		const t = this
    		t.formEmpValidate.compWorklocation = name
    		t.formEmpValidate.compWorklocationPid = id
    	},
    	dbWorklocation() {
    		const t = this
    		t.formEmpValidate.compWorklocation = ''
    		t.formEmpValidate.compWorklocationPid = ''
    	},
    	inputBenefitlocation(name, id) {
    		const t = this
    		t.formEmpValidate.sbBenefitlocation = name
    		t.formEmpValidate.sbBenefitlocationPid = id
    	},
    	dbsbBenefitlocation() {
    		const t = this
    		t.formEmpValidate.sbBenefitlocation = ''
    		t.formEmpValidate.sbBenefitlocationPid = ''
    	},
    	inputHfundlocatio(name, id) {
    		const t = this
    		t.formEmpValidate.sbHfundlocatio = name
    		t.formEmpValidate.sbHfundlocatioPid = id
    	},
    	dbsbHfundlocatio() {
    		const t = this
    		t.formEmpValidate.sbHfundlocatio = ''
    		t.formEmpValidate.sbHfundlocatioPid = ''
    	},
    	inputProvince(name, id) {
    		const t = this
    		t.formEmpValidate.addProvince = name
    		t.formEmpValidate.addProvincePid = id
    	},
    	dbaddProvince() {
    		const t = this
    		t.formEmpValidate.addProvince = ''
    		t.formEmpValidate.addProvincePid = ''
    	},
    	inputCity(name, id) {
    		const t = this
    		t.formEmpValidate.addCity = name
    		t.formEmpValidate.addCityPid = id
    	},
    	dbaddCity() {
    		const t = this
    		t.formEmpValidate.addCity = ''
    		t.formEmpValidate.addCityPid = ''
    	},
    	inputrProvince(name, id) {
    		const t = this
    		t.formEmpValidate.addrProvince = name
    		t.formEmpValidate.addrProvincePid = id
    	},
    	dbrProvince() {
    		const t = this
    		t.formEmpValidate.addrProvince = ''
    		t.formEmpValidate.addrProvincePid = ''
    	},
    	inputrCity(name, id) {
    		const t = this
    		t.formEmpValidate.addrCity = name
    		t.formEmpValidate.addrCityPid = id
    	},
    	dbrCity() {
    		const t = this
    		t.formEmpValidate.addrCity = ''
    		t.formEmpValidate.addrCityPid = ''
    	},
//  	业务上级经理
    	selectBuspmp(logType) {
    		const t = this
    		t.logType = logType
    		t.$refs.searchManager.getData(this.paramsManger)
    		t.openManger = true
    	},
//  	功能经理
    	selectFunpmp(logType) {
    		const t = this
    		t.logType = logType
    		t.$refs.searchManager.getData(this.paramsManger)
    		t.openManger = true
    	},
//  	HR顾问
    	selectCompHR(logType) {
    		const t = this
    		t.logType = logType
    		t.$refs.searchManager.getData(this.paramsManger)
    		t.openManger = true
    	},
    	closeManger() {
    		const t = this
    		t.$refs.searchManager.empCname = ''
    		t.openManger = false
    	},
    	inputManger(name, id) {
    		const t = this
    		t.formEmpValidate.compBuspmp = name
    		t.formEmpValidate.compBuspmpPid = id
    	},
    	dbBuspmp() {
    		const t = this
    		t.formEmpValidate.compBuspmp = ''
    		t.formEmpValidate.compBuspmpPid = ''
    	},
    	inputGManger(name, id) {
    		const t = this
    		t.formEmpValidate.compFunpmp = name
    		t.formEmpValidate.compFunpmpPid = id
    	},
    	dbFunpmp() {
    		const t = this
    		t.formEmpValidate.compFunpmp = ''
    		t.formEmpValidate.compFunpmpPid = ''
    	},
    	inputCompHR(name, id) {
    		const t = this
    		t.formEmpValidate.compHr = name
    		t.formEmpValidate.comPHRPid = id
    	},
    	dbCompHR() {
    		const t = this
    		t.formEmpValidate.compHr = ''
    		t.formEmpValidate.comPHRPid = ''
    	},
      render1() {
        const t = this
        this.$Modal.confirm({
          onOk: () => {
            t.imgPack.handlecrop1()
            // base64转图片的方法
            const arr = t.imgPack.option1.cropedImg.split(',')
            const mime = arr[0].match(/:(.*?);/)[1]
            const bstr = atob(arr[1])
            let n = bstr.length
            const u8arr = new Uint8Array(n)
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n)
            }
            const obj = new Blob([u8arr], { type: mime })
            // base64转图片的方法
            const formData = new FormData()
            formData.append('upfile', obj, Date.parse(new Date()) + '.png')
            uploadimage(formData).then((res) => {
              if (res) {
                for (const key in res.data) {
                  t.cropedImg = t.httpImg + res.data[key]
                  t.cropedImgDis = key + ',' + res.data[key]
                }
              }
            }).catch(() => {
              t.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
              })
            })
          },
          render: (h) => {
            return h(imgEdit, {
              props: {
                value: this.value,
              },
              attrs: {
                id: 'imgEdit',
                ref: 'imgEdit',
              },
              on: {
                ok: (self) => {
                  t.imgPack = self
                },
              },

            })
          },
        })
      },
//  	导航点击
    	newColor(that) {
//  		if (!(this.dqq === 0)) {
//					this.dqq.style.color = 'red'
//				}
//				a.style.color = 'blue'
//				this.dqq = a
    	},
    },
  }
</script>
<style lang="scss" scoped>
 @import "../../../sass/updateAndAdd";
 .ivu-form a{
 	display: block;
 	color: #000000;
 	margin: 10px 0;
 	padding-left: 10px;
 	height: 26px;
 	line-height: 26px;
 	border-bottom: #EEEEEE solid 1px;
 	padding-bottom: 5px;
 	font-weight: bold;
 	background: #d3e8ff;
 	font-size: 14px;
 }
 .cover .box{
    padding: 0;
    max-height: 600px;
    overflow-y: auto;
    width: 950px;
    background: #EEEEEE;
  }
 .headImg{
 	height: 200px;
 	display: flex;
 	justify-content: center;
 	align-items: center;
 }
 .headImg .header-box{
 	width: 90%;
 	height: 90%;
 	background: #FFFFFF;
 	border-radius: 6px;
   display: flex;
   justify-content: center;
   align-items: center;
 }
 .headImg .header-box .empBorder{
 	display: flex;
 	justify-content: center;
 }
 .headImg .header-box .headerContent{
 	padding: 8px;
 }
 .menuInfo .ivu-menu{
 	background: #EEEEEE;
 }
 .menuInfo .ivu-menu a:active{
 	color: #318EF0;
 }
 .menuInfo .ivu-menu-item:hover{
 	background: #FFFFFF;
 	/*color: #318EF0;*/
 }
 .menuInfo .ivu-menu-item a:hover{
 	color: #318EF0;
 }
 .menuInfo .ivu-menu-item{
 	padding: 0;
 }
.menuInfo a{
	display: block;
 	font-size: 14px;
 	color: #000000;
 	font-family: "微软雅黑";
 	width: 100%;
 	height: 50px;
 	padding-right: 15px;
 	text-align: left;
 	padding-top: 15px;
 	padding-left: 20px;
}
 .header-box{
   display: flex;
   position: relative;
   justify-content: flex-end;
 }
 .tab-box{
   overflow-y: auto;
   height: 370px;
 }
 .header-cover{
   display: none;
   top: 16px;
   right: 14px;
   color: #fff;
   border-radius: 50%;
   position: absolute;
   width: 150px;
   height: 150px;
   background-color: rgba(0,0,0,0.3);
 }
 .header-box:hover .header-cover{
   display: flex;
   justify-content: center;
   align-items: center;
 }
 .header-box:hover {
   cursor: pointer;
 }
 .header{
   height: 150px;
   width: 150px;
   border-radius: 50%;
   overflow: hidden;
 }
 .fade-enter-active, .fade-leave-active {
   transition: opacity .2s
 }
 .fade-enter, .fade-leave-to {
   opacity: 0
 }
 .tab-btn{
   display: flex;
   justify-content: flex-end;
   align-items: center;
   margin-top: 20px;
   height: 50px;
 }
</style>
