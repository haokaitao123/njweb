<!--  -->
<template>
<div class="essinfo">
  <div class="userinfo">
    <div class="userhead">
      {{view.empName}}
    </div>
    <div class="usetext">
      <div class="name">
        {{view.empName}}
      </div>
      <div class="company">
        {{view.empcompPostDis}}
      </div>
      <div class="time">
        {{view.empGenderDis}}
      </div>
      <div class="ageOfCompany">
        司龄: {{view.ageOfCompany}}
      </div>
    </div>
    <img src="../../../../static/img/esshead.jpg" alt="" class="Image">
  </div>
  <Tabs @on-click="getData">
    <TabPane name="viewEmpMaster" label="在职信息">
      <div class="content">
        <div class="title">
          <Icon type="minus" color="#3399ff"></Icon>
          <div class="txt">在职信息</div>
          <div class="line"></div>
        </div>
        <div class="form">
          <Row>
            <Form label-position="right" :label-width="240">
              <Col span="12">
              <FormItem label="雇佣公司:">
                <span>{{view.empcompHirecompanyDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="部门:">
                <span>{{view.empcompDeptDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="岗位:">
                <span>{{view.empcompPostDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="成本中心:">
                <span>{{view.empcompCostcenterDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="业务上级经理:">
                <span>{{view.empcompBuspmpDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="功能上级经理:">
                <span>{{view.empcompFunpmpDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="入职日期:">
                <span>{{view.empcompEntrydate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="服务年限计算开始日期:">
                <span>{{view.empcompServicedate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="证书年限计算开始日期:">
                <span>{{view.empcompCertificatedate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="HR顾问:">
                <span>{{view.empcompHrDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="生效日期:">
                <span>{{view.empcompSdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="失效日期:">
                <span>{{view.empcompEdate}}</span>
              </FormItem>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    </TabPane>
    <TabPane label="个人信息" name="empBase">
      <div class="content" >
        <div class="title">
          <Icon type="minus" color="#3399ff"></Icon>
          <div class="txt">个人信息</div>
          <div class="line"></div>
        </div>
        <div class="view">
          <Row>
            <Form label-position="right" :label-width="240">
              <Col span="12">
              <FormItem label="唯一标识号:">
                <span>{{base.empGid}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="中文名:">
                <span>{{base.empCname}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="First name:">
                <span>{{base.empFirstname}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="Last name:">
                <span>{{base.empLastname}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="别名/曾用名:">
                <span>{{base.empAlias}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="性别:">
                <span>{{base.empGenderDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="出生日期:">
                <span>{{base.empBirthdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="民族:">
                <span>{{base.empNationDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="婚育状况:">
                <span>{{base.empMarriageDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="政治面貌:">
                <span>{{base.empPoliticalDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="参加工作时间:">
                <span>{{base.empFirstworkdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="职称:">
                <span>{{base.empTechnicaltitleDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="职称专业:">
                <span>{{base.empTechspec}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="职称取得时间:">
                <span>{{base.empTechdate}}</span>
              </FormItem>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    </TabPane>
    <TabPane label="合同信息" name="empContract">
      <row class="table-form" ref="table-form">
        <Table  :height="150" size="small" border ref="selection" :columns="contractColumns" :data="contract"></Table>
      </row>
      <div v-show="showContract" class="content">
        <div class="title">
          <Icon type="minus" color="#3399ff"></Icon>
          <div class="txt">合同信息</div>
          <div class="line"></div>
        </div>
        <div class="view">
          <Row>
            <Form label-position="right" :label-width="240">
              <Col span="12">
              <FormItem label="雇佣公司:">
                <span>{{contractinfo.empctHirecompanyDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="部门:">
                <span>{{contractinfo.empctDeptDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="合同类别:">
                <span>{{contractinfo.empctContracttypeDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="合同期限:">
                <span>{{contractinfo.empctContractperiodDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="合同开始日:">
                <span>{{contractinfo.empctContractsdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="合同到期日:">
                <span>{{contractinfo.empctContractedate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="合同到期通知时间:">
                <span>{{contractinfo.empctContractpromDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="保密协议:">
                <span>{{contractinfo.empctConfidentialDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="合同工作时间:">
                <span>{{contractinfo.empctContractworktimeDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="签署日期:">
                <span>{{contractinfo.empctSigndate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="试用期限:">
                <span>{{contractinfo.empctProbationDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="试用到期日:">
                <span>{{contractinfo.empctProbationdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="试用到期通知时间:">
                <span>{{contractinfo.empctProbationpromDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="生效时间:">
                <span>{{contractinfo.empctSdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="失效时间:">
                <span>{{contractinfo.empctEdate}}</span>
              </FormItem>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    </TabPane>
    <TabPane label="学历信息" name="education">
      <row class="table-form" ref="table-form">
        <Table  :height="150" size="small" border ref="selection" :columns="educationColumns" :data="education"></Table>
      </row>
      <div v-show="showEducation" class="content">
        <div class="title">
          <Icon type="minus" color="#3399ff"></Icon>
          <div class="txt">{{educationinfo.empedSchool}}</div>
          <div class="line"></div>
        </div>
        <div class="view">
          <Row>
            <Form label-position="right" :label-width="240">
              <Col span="12">
              <FormItem label="教育程度:">
                <span>{{educationinfo.empedEducationlevelDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="是否最高学位:">
                <span>{{educationinfo.empedIshighestDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="国家:">
                <span>{{educationinfo.empedCuntryDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="学校:">
                <span>{{educationinfo.empedSchool}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="学位:">
                <span>{{educationinfo.empedDegree}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="专业:">
                <span>{{educationinfo.empedSpecialty}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="开始时间:">
                <span>{{educationinfo.empedSdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="结束时间:">
                <span>{{educationinfo.empedEdate}}</span>
              </FormItem>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    </TabPane>
    <TabPane label="工作简历" name="workExp">
      <row class="table-form" ref="table-form">
        <Table  :height="150" size="small" border ref="selection" :columns="workExpColumns" :data="workExp"></Table>
      </row>
      <div v-show="showWorkExp" class="content">
        <div class="title">
          <Icon type="minus" color="#3399ff"></Icon>
          <div class="txt">{{workExpInfo.empweCompDis}}</div>
          <div class="line"></div>
        </div>
        <div class="view">
          <Row>
            <Form label-position="right" :label-width="240">
              <Col span="12">
              <FormItem label="开始时间:">
                <span>{{workExpInfo.empweSdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="结束时间:">
                <span>{{workExpInfo.empweEdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="工作单位:">
                <span>{{workExpInfo.empweCompDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="工作部门:">
                <span>{{workExpInfo.empweDeptDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="工作职务/岗位:">
                <span>{{workExpInfo.empwePostDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="联系电话:">
                <span>{{workExpInfo.empwePhone}}</span>
              </FormItem>
              </Col>
              <Col span="24">
              <FormItem label="主要业绩/成果:">
                <span>{{workExpInfo.empwePerformance}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="证明人:">
                <span>{{workExpInfo.empweContactDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="薪资:">
                <span>{{workExpInfo.empweSalary}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="离职原因:">
                <span>{{workExpInfo.empweLeavereason}}</span>
              </FormItem>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    </TabPane>
    <TabPane label="地址信息" name="address">
      <row class="table-form" ref="table-form">
        <Table  :height="150" size="small" border ref="selection" :columns="addressColumns" :data="address"></Table>
      </row>
      <div v-show="showAddress" class="content">
        <div class="title">
          <Icon type="minus" color="#3399ff"></Icon>
          <div class="txt">{{addressInfo.empaddrTypeDis}}</div>
          <div class="line"></div>
        </div>
        <div class="view">
          <Row>
            <Form label-position="right" :label-width="240">
              <Col span="12">
              <FormItem label="国家:">
                <span>{{addressInfo.empaddrCuntryDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="省份:">
                <span>{{addressInfo.empaddrProvinceDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="城市:">
                <span>{{addressInfo.empaddrCityDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="地址类型:">
                <span>{{addressInfo.empaddrTypeDis}}</span>
              </FormItem>
              </Col>
              <Col span="24">
              <FormItem label="详细地址:">
                <span>{{addressInfo.empaddrStreet}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="邮编:">
                <span>{{addressInfo.empaddrZip}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="户口性质:">
                <span>{{addressInfo.empaddrRegisterpropertyDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="生效日期:">
                <span>{{addressInfo.empaddrSdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="失效日期:">
                <span>{{addressInfo.empaddrEdate}}</span>
              </FormItem>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    </TabPane>
    <TabPane label="联系方式" name="contact">
      <div class="content">
        <div class="title">
          <Icon type="minus" color="#3399ff"></Icon>
          <div class="txt">联系方式</div>
          <div class="line"></div>
        </div>
        <div class="view">
          <Row>
            <Form label-position="right" :label-width="240">
              <Col span="12">
              <FormItem label="手机号码:">
                <span>{{contact.empctaMobile}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="联系电话（固定）:">
                <span>{{contact.empctaPhone}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="个人邮箱:">
                <span>{{contact.empctaPersmail}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="公司邮箱:">
                <span>{{contact.empctaCompmail}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="QQ:">
                <span>{{contact.empctaQq}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="微信号:">
                <span>{{contact.empctaWechat}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="紧急联系人:">
                <span>{{contact.empctaEmergcontact}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="紧急联系人关系:">
                <span>{{contact.empctaEmcrelationDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="紧急联系电话:">
                <span>{{contact.empctaEmcphone}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="紧急联系地址:">
                <span>{{contact.empctaEmcaddr}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="生效时间:">
                <span>{{contact.empctaSdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="失效时间:">
                <span>{{contact.empctaEdate}}</span>
              </FormItem>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    </TabPane>
    <TabPane label="家庭成员" name="family">
      <row class="table-form" ref="table-form">
        <Table  :height="150" size="small" border ref="selection" :columns="familyColumns" :data="family"></Table>
      </row>
      <div v-show="showFamily" class="content">
        <div class="title">
          <Icon type="minus" color="#3399ff"></Icon>
          <div class="txt">{{familyInfo.empfmRelationDis}}</div>
          <div class="line"></div>
        </div>
        <div class="view">
          <Row>
            <Form label-position="right" :label-width="240">
              <Col span="12">
              <FormItem label="成员关系:">
                <span>{{familyInfo.empfmRelationDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="中文名称:">
                <span>{{familyInfo.empfmCname}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="First name:">
                <span>{{familyInfo.empfmFirstname}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="Last name:">
                <span>{{familyInfo.empfmLastname}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="证件类型:">
                <span>{{familyInfo.empfmIdtypeDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="证件号码:">
                <span>{{familyInfo.empfmIdno}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="性别:">
                <span>{{familyInfo.empfmGenderDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="出生日期:">
                <span>{{familyInfo.empfmBirthdate}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="联系电话:">
                <span>{{familyInfo.empfmPhone}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="婚育状况:">
                <span>{{familyInfo.empfmMarriageDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="政治面貌:">
                <span>{{familyInfo.empfmPoliticalDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="国籍:">
                <span>{{familyInfo.empfmCuntryDis}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="居住地址:">
                <span>{{familyInfo.empfmAddress}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="邮编:">
                <span>{{familyInfo.empfmZip}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="工作单位:">
                <span>{{familyInfo.empfmCompany}}</span>
              </FormItem>
              </Col>
              <Col span="12">
              <FormItem label="职务:">
                <span>{{familyInfo.empfmPost}}</span>
              </FormItem>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    </TabPane>
  </Tabs>
</div>
</template>
<script>
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess, deepCopy } from '../../../lib/util'

  export default {
    data() {
      return {
        view: { },
        base: { },
        contract: [],
        contractinfo: '',
        showContract: false,
        education: [],
        educationinfo: '',
        showEducation: false,
        workExp: [],
        workExpInfo: '',
        showWorkExp: false,
        address: [],
        addressInfo: '',
        showAddress: false,
        contact: { },
        family: [],
        familyInfo: '',
        showFamily: false,
        contractColumns: [
          {
            title: '雇佣公司',
            key: 'empctHirecompanyDis',
          },
          {
            title: '部门',
            key: 'empctDeptDis',
          },
          {
            title: '合同类别',
            key: 'empctContracttypeDis',
          },
          {
            title: '合同期限',
            key: 'empctContractperiodDis',
          },
          {
            title: '合同开始日',
            key: 'empctContractsdate',
          },
          {
            title: '合同到期日',
            key: 'empctContractedate',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 80,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showContractBtn(params.row.id, '查看', params.index)
                    },
                  },
                }, '查看'),
              ])
            },
          },
        ],
        educationColumns: [
          {
            title: '教育程度',
            key: 'empedEducationlevelDis',
          },
          {
            title: '是否最高学位',
            key: 'empedIshighestDis',
          },
          {
            title: '国家',
            key: 'empedCuntryDis',
          },
          {
            title: '学校',
            key: 'empedSchool',
          },
          {
            title: '学位',
            key: 'empedDegree',
          },
          {
            title: '专业',
            key: 'empedSpecialty',
          },
          {
            title: '开始时间',
            key: 'empedSdate',
          },
          {
            title: '结束时间',
            key: 'empedEdate',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 80,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showEducationBtn(params.row.id, '查看', params.index)
                    },
                  },
                }, '查看'),
              ])
            },
          },
        ],
        workExpColumns: [
          {
            title: '工作单位',
            key: 'empweCompDis',
          },
          {
            title: '工作部门',
            key: 'empweDeptDis',
          },
          {
            title: '工作职务/岗位',
            key: 'empwePostDis',
          },
          {
            title: '开始时间',
            key: 'empweSdate',
          },
          {
            title: '结束时间',
            key: 'empweEdate',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 80,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showWorkExpBtn(params.row.id, '查看', params.index)
                    },
                  },
                }, '查看'),
              ])
            },
          },
        ],
        addressColumns: [
          {
            title: '地址类型',
            key: 'empaddrTypeDis',
          },
          {
            title: '国家',
            key: 'empaddrCuntryDis',
          },
          {
            title: '省份',
            key: 'empaddrProvinceDis',
          },
          {
            title: '城市',
            key: 'empaddrCityDis',
          },
          {
            title: '户口性质',
            key: 'empaddrRegisterpropertyDis',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 80,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showAddressBtn(params.row.id, '查看', params.index)
                    },
                  },
                }, '查看'),
              ])
            },
          },
        ],
        familyColumns: [
          {
            title: '成员关系',
            key: 'empfmRelationDis',
          },
          {
            title: '中文名称',
            key: 'empfmCname',
          },
          {
            title: 'First name',
            key: 'empfmFirstname',
          },
          {
            title: 'Last name',
            key: 'empfmLastname',
          },
          {
            title: '证件类型',
            key: 'empfmIdtypeDis',
          },
          {
            title: '证件号码',
            key: 'empfmIdno',
          },
          {
            title: this.$t('button.opr'),
            key: 'action',
            width: 80,
            fixed: 'right',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.showFamilyBtn(params.row.id, '查看', params.index)
                    },
                  },
                }, '查看'),
              ])
            },
          },
        ],
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getviewEmpMaster() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'viewEmpMaster.getByUser',
          empId: t.$store.state.user.sysUsempid,
          logType: '根据员工id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.view = res.data.content[0]
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEmpBase() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'empBase.getByUser',
          empId: t.$store.state.user.sysUsempid,
          logType: '根据员工id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.base = res.data.content[0]
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getEmpContract() {
        const t = this
        t.showContract = false
        getDataLevelUserLogin({
          _mt: 'empContract.getByUser',
          empId: t.$store.state.user.sysUsempid,
          logType: '根据员工id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.contract = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      showContractBtn(id, logType, index) {
        const t = this
        t.contractinfo = t.contract[index]
        t.showContract = true
      },
      getEducation() {
        const t = this
        t.showEducation = false
        getDataLevelUserLogin({
          _mt: 'empEducation.getByUser',
          empId: t.$store.state.user.sysUsempid,
          logType: '根据员工id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.education = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      showEducationBtn(id, logType, index) {
        const t = this
        t.educationinfo = t.education[index]
        t.showEducation = true
      },
      getWorkExp() {
        const t = this
        t.showWorkExp = false
        getDataLevelUserLogin({
          _mt: 'empWorkExp.getByUser',
          empId: t.$store.state.user.sysUsempid,
          logType: '根据员工id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.workExp = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      showWorkExpBtn(id, logType, index) {
        const t = this
        t.workExpInfo = t.workExp[index]
        t.showWorkExp = true
      },
      getAddress() {
        const t = this
        t.showAddress = false
        getDataLevelUserLogin({
          _mt: 'empAddress.getByUser',
          empId: t.$store.state.user.sysUsempid,
          logType: '根据员工id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.address = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      showAddressBtn(id, logType, index) {
        const t = this
        t.addressInfo = t.address[index]
        t.showAddress = true
      },
      getContact() {
        const t = this
        getDataLevelUserLogin({
          _mt: 'empContact.getByUser',
          empId: t.$store.state.user.sysUsempid,
          logType: '根据员工id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.contact = res.data.content[0]
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      getFamily() {
        const t = this
        t.showFamily = false
        getDataLevelUserLogin({
          _mt: 'empFamily.getByUser',
          empId: t.$store.state.user.sysUsempid,
          logType: '根据员工id获取数据',
        }).then((res) => {
          if (isSuccess(res, t)) {
            t.family = res.data.content[0].value
          }
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      showFamilyBtn(id, logType, index) {
        const t = this
        t.familyInfo = t.family[index]
        t.showFamily = true
      },
      getData(name) {
        const t = this
        if (!name || name === 'viewEmpMaster') t.getviewEmpMaster()
        else if (name === 'empBase') t.getEmpBase()
        else if (name === 'empContract') t.getEmpContract()
        else if (name === 'education') t.getEducation()
        else if (name === 'workExp') t.getWorkExp()
        else if (name === 'address') t.getAddress()
        else if (name === 'contact') t.getContact()
        else if (name === 'family') t.getFamily()
      },
    },
  }

</script>
<style>
  .essinfo .ivu-tabs-bar .ivu-tabs-tab{
    border-radius: 19px;
    margin-bottom: 10px;
    height: 38px;
    background: #fff;
  }
  .essinfo .ivu-tabs-bar .ivu-tabs-tab-active{
    border: 1px solid #3399ff;
  }
  .essinfo .ivu-tabs-nav-scroll{
    display: flex;
    justify-content: center;
  }
  .essinfo .ivu-tabs-bar{
    border-bottom: none;
  }
  .essinfo .ivu-tabs-nav-scroll .ivu-tabs-ink-bar{
    background-color: transparent;
  }
  .essinfo .ivu-tabs .ivu-tabs-tabpane{
    padding: 0 20px;
  }
</style>
<style scoped lang="scss">
  .essinfo::after{
    content: '';
    display: table;
  }
  .essinfo{
    width: 1000px;
    // height: 100%;
    overflow-y: scroll;
    height: 100%;
    position: relative;
    margin-left: 50%;
    padding-top: 170px;
    //background: url('../../../../static/img/esshead.jpg') no-repeat;
    background-color: #ffffff;
    margin-top: 76px;
    left: -500px;
    .userinfo{
      width:100%;
      position: absolute;
      top: 0;
      .Image{
        position: absolute;
        top:0;
        left:0;
        width:100%;
      }
      .userhead{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: aquamarine;
        top: 15px;
        left: 15px;
        line-height: 120px;
        text-align: center;
        font-size: 28px;
        color: #ffffff;
        font-weight: bold;
        position: absolute;
        z-index: 100;
      }
      .usetext:before {
        content: '';
        display: table;
      }
      .usetext{
        z-index: 100;
        position: relative;
        width: 790px;
        height: 180px;
        margin-left: 180px;
        padding: 15px;
        color: #ffffff;
        // background-color: aqua;
        .name{
          margin-top: 20px;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
  .content{
    padding: 20px 20px 50px 20px ;
    .title{
      display: flex;
      align-items: center;
      .txt{
        padding: 0 20px 0 10px;
      }
      .line{
        height: 0;
        border-bottom: 1px solid #dddddd;
        flex-grow: 1;
      }
    }
    .form{
      margin-top: 40px;
    }
  }
  .table-form{
  	margin: 0 15px;
  }
</style>

