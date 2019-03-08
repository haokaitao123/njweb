<template>
  <div>
    <div class="cover">
      <div class="box">
        <Form ref="ruleForm" :model="ruleForm" :rules="ruleValidate" :label-width="200">
          <div class="title">
            <div class="title-text">
              <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>&nbsp;{{this.thisSetpName}}
            </div>
            <Button type="text" @click="close4">
              <Icon type="close-round" size="16"></Icon>
            </Button>
          </div>
          <div class="content">
            <row class="table-form" ref="table-form">
              <Table v-show="thisPkValue!=='0'" size="small" border ref="selection" :columns="columns" :data="data" :loading="data.length === 0"></Table>
            </row>
            <div style="width:100%;" v-if="openIdUpdate=='1'">
              <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1000'">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                    </div>
                    <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                            <Row>
                                <Col span="10" offset="1">
                                  <FormItem :label="$t('lang_communication.commonFlowUpdate2.payproSalset')" >
                                      <Input v-model="payproSalset.payproSalsetDis" placeholder="Enter your name" disabled></Input>
                                  </FormItem>
                                </Col>
                                <Col span="10" offset="1">
                                    <FormItem :label="$t('lang_communication.commonFlowUpdate2.payproPeriod')" prop="payproPeriod">
                                        <Input v-model="payproSalset.payproPeriod" placeholder="Enter your e-mail" disabled></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <FormItem :label="$t('lang_communication.commonFlowUpdate2.payproContactComp')" prop="payproContactNumDis" >
                                        <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertList('id','desc',10,1)" class="a_line"  >{{payproSalset.payproContactNumDis}}</a></p>
                                    </FormItem>
                                </Col>
                                <Col span="10" offset="1">
                                  <FormItem :label="$t('lang_communication.commonFlowUpdate2.payproContact')" >
                                      <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertModel"  class="a_line" >{{payproSalset.payproContactDis}}</a></p>
                                  </FormItem>
                                </Col>

                            </Row>
                     </div>
                </div>
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1100'">
                    <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="22" offset="1">
                                <p style="text-align:center">{{$t('lang_communication.commonFlowUpdate2.paylink1')}} <a href="javascript:void(0);" @click="openUpDate(payproSalset.payproPlanId, $t('button.view'),0)" style="width:100px;display:inline-block;"  >{{$t('lang_communication.commonFlowUpdate2.payPlan')}}</a></p>
                              </Col>

                          </Row>


                    </div>
                </div>


              </div>
            </div>
            <div style="width:100%;" v-if="openIdUpdate=='2-1'">
              <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1000'">
                  <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="10" offset="1">
                                <FormItem label="薪资账套" >
                                    <Input v-model="payproSalset.payproSalsetDis" placeholder="Enter your name" disabled></Input>
                                </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                  <FormItem label="期间" prop="payproPeriod">
                                      <Input v-model="payproSalset.payproPeriod" placeholder="Enter your e-mail" disabled></Input>
                                  </FormItem>
                              </Col>
                          </Row>
                          <Row>
                               <Col span="10" offset="1">
                                  <FormItem label="包含公司及联系人" prop="payproContactNumDis" >
                                      <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertList('id','desc',10,1)" class="a_line"  >{{payproSalset.payproContactNumDis}}</a></p>
                                  </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                <FormItem label="薪资联系人" >
                                    <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertModel"  class="a_line" >{{payproSalset.payproContactDis}}</a></p>
                                </FormItem>
                              </Col>
                          </Row>
                    </div>
                </div>
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1100'">
                    <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="22" offset="1">
                                <p >已完成薪资账套薪资数据的上传及维护： <Checkbox v-model="ruleForm.payproPrisup" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))"> </Checkbox></p>
                              </Col>

                          </Row>


                    </div>
                </div>


              </div>

            </div>
            <div style="width:100%;" v-if="openIdUpdate=='2-2'">
              <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1000'">
                  <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="10" offset="1">
                                <FormItem label="薪资账套" >
                                    <Input v-model="payproSalset.payproSalsetDis" placeholder="Enter your name" disabled></Input>
                                </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                  <FormItem label="期间" prop="payproPeriod">
                                      <Input v-model="payproSalset.payproPeriod" placeholder="Enter your e-mail" disabled></Input>
                                  </FormItem>
                              </Col>
                          </Row>
                          <Row>
                               <Col span="10" offset="1">
                                  <FormItem label="包含公司及联系人" prop="payproContactNumDis" >
                                      <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertList('id','desc',10,1)" class="a_line"  >{{payproSalset.payproContactNumDis}}</a></p>
                                  </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                <FormItem label="薪资联系人" >
                                    <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertModel"  class="a_line" >{{payproSalset.payproContactDis}}</a></p>
                                </FormItem>
                              </Col>

                          </Row>


                    </div>
                </div>
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1100'">
                    <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row v-for="(itemsub,indexsub) in confirmorList" :key="indexsub">
                              <Col span="22" offset="1">
                                <p  style="height:30px;line-height:30px;">已完成福利数据的上传及维护（{{itemsub.paypcfName}}）： <Checkbox v-model="itemsub.paypcfIsconfirm" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))"> </Checkbox></p>
                              </Col>
                          </Row>

                    </div>
                </div>
                <div style="width:100%;"  v-if="item.flsdbName=='邮件发送记录'">
                    <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="10" offset="1">
                                <FormItem label="薪资计划" prop="payproPeriod">
                                    <Input v-model="ruleForm.payproPeriod" placeholder="Enter your name"></Input>
                                </FormItem>
                              </Col>

                          </Row>
                    </div>
                </div>
              </div>
            </div>
            <div style="width:100%;" v-if="openIdUpdate=='2-3'">
              <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1000'">
                  <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="10" offset="1">
                                <FormItem label="薪资账套" >
                                    <Input v-model="payproSalset.payproSalsetDis" placeholder="Enter your name" disabled></Input>
                                </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                  <FormItem label="期间" prop="payproPeriod">
                                      <Input v-model="payproSalset.payproPeriod" placeholder="Enter your e-mail" disabled></Input>
                                  </FormItem>
                              </Col>
                          </Row>
                          <Row>
                              <Col span="10" offset="1">
                                  <FormItem label="包含公司及联系人" prop="payproContactNumDis" >
                                      <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertList('id','desc',10,1)" class="a_line"  >{{payproSalset.payproContactNumDis}}</a></p>
                                  </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                <FormItem label="薪资联系人" >
                                    <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertModel"  class="a_line" >{{payproSalset.payproContactDis}}</a></p>
                                </FormItem>
                              </Col>

                          </Row>



                    </div>
                </div>
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1100'">
                    <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row v-for="(itemsub,indexsub) in confirmorList" :key="indexsub">
                              <Col span="22" offset="1">
                                <p  style="height:30px;line-height:30px;">已完成福利数据的上传及维护（{{itemsub.paypcfName}}）： <Checkbox v-model="itemsub.paypcfIsconfirm" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))"> </Checkbox></p>
                              </Col>
                          </Row>

                    </div>
                </div>
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1200'">
                    <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="10" offset="1">
                                <FormItem label="薪资计划" prop="payproPeriod">
                                    <Input v-model="ruleForm.payproPeriod" placeholder="Enter your name"></Input>
                                </FormItem>
                              </Col>

                          </Row>
                    </div>
                </div>
              </div>
            </div>
            <div style="width:100%;" v-if="openIdUpdate=='3'">
              <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1000'">
                   <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                    </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="10" offset="1">
                                <FormItem label="薪资账套" >
                                    <Input v-model="payproSalset.payproSalsetDis" placeholder="Enter your name" disabled></Input>
                                </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                  <FormItem label="期间" prop="payproPeriod">
                                      <Input v-model="payproSalset.payproPeriod" placeholder="Enter your e-mail" disabled></Input>
                                  </FormItem>
                              </Col>
                          </Row>
                          <Row>
                              <Col span="10" offset="1">
                                  <FormItem label="包含公司及联系人" prop="payproContactNumDis" >
                                      <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertList('id','desc',10,1)" class="a_line"  >{{payproSalset.payproContactNumDis}}</a></p>
                                  </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                <FormItem label="薪资联系人" >
                                    <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertModel"  class="a_line" >{{payproSalset.payproContactDis}}</a></p>
                                </FormItem>
                              </Col>

                          </Row>



                    </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1100')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=1)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">日期时间：</span><span class="item_sub_2" v-if="(salaryComputationObj.payproPlandate.indexOf('#')==-1)||((salaryComputationObj.payproPlandate.indexOf('#')!=-1)&&salaryComputationObj.payproPlandate.split('#').length>=1)">{{salaryComputationObj.payproPlandate.split('#')[0]}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline;margin-right:10px" href="javascript:void(0);" @click="btnAlertListModel('01round')" >查看</a>
                                    <a style="text-decoration:underline" download="" @click="btnisErrorList('01round')" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))==1))">检查</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  v-if="payproSalset.errorNum.length>=1" href="javascript:void(0);" @click="openErrorListModel('01round')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">总错误数量：</span><span class="item_sub_2" v-if="payproSalset.errorNum.length>=1">{{payproSalset.errorNum[0]}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">待处理错误数量：</span><span class="item_sub_2" v-if="payproSalset.errorpendNum.length>=1">{{payproSalset.errorpendNum[0]}}</span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproSalset.confirmorList[0].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproSalset.confirmorList[0].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1200')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=2)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">日期时间：</span><span class="item_sub_2" v-if="(salaryComputationObj.payproPlandate.indexOf('#')!=-1)&&salaryComputationObj.payproPlandate.split('#').length>=2">{{salaryComputationObj.payproPlandate.split('#')[1]}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline;margin-right:10px" href="javascript:void(0);" @click="btnAlertListModel('02round')" >查看</a>
                                    <a style="text-decoration:underline" download="" @click="btnisErrorList('02round')" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))==2))">检查</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline" v-if="isErrorList" href="javascript:void(0);" @click="openErrorListModel('02round')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">总错误数量：</span><span class="item_sub_2" v-if="payproSalset.errorNum.length>=2">{{payproSalset.errorNum[1]}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">待处理错误数量：</span><span class="item_sub_2" v-if="payproSalset.errorpendNum.length>=2">{{payproSalset.errorpendNum[1]}}</span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=2">{{payproSalset.confirmorList[1].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=2">{{payproSalset.confirmorList[1].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1300')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=3)">
                      <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                     <p class="item_3_1"><span class="item_sub">日期时间：</span><span class="item_sub_2" v-if="(salaryComputationObj.payproPlandate.indexOf('#')!=-1)&&salaryComputationObj.payproPlandate.split('#').length>=3">{{salaryComputationObj.payproPlandate.split('#')[2]}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline;margin-right:10px" href="javascript:void(0);" @click="btnAlertListModel('03round')" >查看</a>
                                    <a style="text-decoration:underline" download="" @click="btnisErrorList('03round')" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))==3))">检查</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline" v-if="isErrorList" href="javascript:void(0);" @click="openErrorListModel('03round')">查看</a></span></p>
                                </Col>
                            </Row>
                             <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">总错误数量：</span><span class="item_sub_2" v-if="payproSalset.errorNum.length>=3">{{payproSalset.errorNum[2]}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">待处理错误数量：</span><span class="item_sub_2" v-if="payproSalset.errorpendNum.length>=3">{{payproSalset.errorpendNum[2]}}</span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=3">{{payproSalset.confirmorList[2].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=3">{{payproSalset.confirmorList[2].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1400')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=90)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                     <p class="item_3_1"><span class="item_sub">日期时间：</span><span class="item_sub_2" v-if="(salaryComputationObj.payproPlandate.indexOf('#')!=-1)&&salaryComputationObj.payproPlandate.split('#').length>=3">{{salaryComputationObj.payproPlandate.split('#')[2]}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline;margin-right:10px" href="javascript:void(0);" @click="btnAlertListModel('90final')" >查看</a>
                                    <a style="text-decoration:underline" download="" @click="btnisErrorList('90final')" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))==90))">检查</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline" v-if="isErrorList" href="javascript:void(0);" @click="openErrorListModel('90final')">查看</a></span></p>
                                </Col>
                            </Row>
                             <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">总错误数量：</span><span class="item_sub_2" v-if="payproSalset.errorNum.length>=4">{{payproSalset.errorNum[3]}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">待处理错误数量：</span><span class="item_sub_2" v-if="payproSalset.errorpendNum.length>=4">{{payproSalset.errorpendNum[3]}}</span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=4">{{payproSalset.confirmorList[3].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=4">{{payproSalset.confirmorList[3].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
              </div>
            </div>
            <div style="width:100%;" v-if="openIdUpdate=='4-1'">
              <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1000'">
                   <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                    </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="10" offset="1">
                                <FormItem label="薪资账套" >
                                    <Input v-model="payproSalset.payproSalsetDis" placeholder="Enter your name" disabled></Input>
                                </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                  <FormItem label="期间" prop="payproPeriod">
                                      <Input v-model="payproSalset.payproPeriod" placeholder="Enter your e-mail" disabled></Input>
                                  </FormItem>
                              </Col>
                          </Row>
                          <Row>
                              <Col span="10" offset="1">
                                  <FormItem label="包含公司及联系人" prop="payproContactNumDis" >
                                      <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertList('id','desc',10,1)" class="a_line"  >{{payproSalset.payproContactNumDis}}</a></p>
                                  </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                <FormItem label="薪资联系人" >
                                    <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertModel"  class="a_line" >{{payproSalset.payproContactDis}}</a></p>
                                </FormItem>
                              </Col>

                          </Row>



                    </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1100')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=1)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('01round')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('01round')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproSalset.confirmorList[0].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproSalset.confirmorList[0].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1200')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=2)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('02round')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('02round')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=2">{{payproSalset.confirmorList[1].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=2">{{payproSalset.confirmorList[1].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1300')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=3)">
                      <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('03round')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('03round')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=3">{{payproSalset.confirmorList[2].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=3">{{payproSalset.confirmorList[2].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1400')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=90)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('90final')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('90final')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row >
                              <Col span="22" offset="1">
                                <p  style="height:30px;line-height:30px;padding-left:150px;">最后一轮薪资确认： <Checkbox v-model="paypcfIsconfirm" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))" @on-change="isSureChecked"> </Checkbox></p>
                              </Col>
                            </Row>

                      </div>
                </div>
              </div>
            </div>
            <div style="width:100%;" v-if="openIdUpdate=='4-2'">
                <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1000'">
                   <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                    </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="10" offset="1">
                                <FormItem label="薪资账套" >
                                    <Input v-model="payproSalset.payproSalsetDis" placeholder="Enter your name" disabled></Input>
                                </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                  <FormItem label="期间" prop="payproPeriod">
                                      <Input v-model="payproSalset.payproPeriod" placeholder="Enter your e-mail" disabled></Input>
                                  </FormItem>
                              </Col>
                          </Row>
                          <Row>
                              <Col span="10" offset="1">
                                  <FormItem label="包含公司及联系人" prop="payproContactNumDis" >
                                      <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertList('id','desc',10,1)" class="a_line"  >{{payproSalset.payproContactNumDis}}</a></p>
                                  </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                <FormItem label="薪资联系人" >
                                    <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertModel"  class="a_line" >{{payproSalset.payproContactDis}}</a></p>
                                </FormItem>
                              </Col>

                          </Row>



                    </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1100')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=1)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('01round')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('01round')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row>

                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproSalset.confirmorList[0].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproSalset.confirmorList[0].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1200')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=2)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('02round')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('02round')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=2">{{payproSalset.confirmorList[1].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=2">{{payproSalset.confirmorList[1].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1300')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=3)">
                      <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('03round')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('03round')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=3">{{payproSalset.confirmorList[2].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=3">{{payproSalset.confirmorList[2].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1400')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=90)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('90final')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('90final')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row >
                              <Col span="22" offset="1">
                                <p  style="height:30px;line-height:30px;padding-left:150px;">最后一轮薪资确认： <Checkbox v-model="paypcfIsconfirm" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))" @on-change="isSureChecked"> </Checkbox></p>
                              </Col>
                            </Row>
                      </div>
                </div>
              </div>
            </div>
            <div style="width:100%;" v-if="openIdUpdate=='4-3'">
               <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1000'">
                   <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                    </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="10" offset="1">
                                <FormItem label="薪资账套" >
                                    <Input v-model="payproSalset.payproSalsetDis" placeholder="Enter your name" disabled></Input>
                                </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                  <FormItem label="期间" prop="payproPeriod">
                                      <Input v-model="payproSalset.payproPeriod" placeholder="Enter your e-mail" disabled></Input>
                                  </FormItem>
                              </Col>
                          </Row>

                          <Row>
                              <Col span="10" offset="1">
                                  <FormItem label="包含公司及联系人" prop="payproContactNumDis" >
                                      <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertList('id','desc',10,1)" class="a_line"  >{{payproSalset.payproContactNumDis}}</a></p>
                                  </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                <FormItem label="薪资联系人" >
                                    <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertModel"  class="a_line" >{{payproSalset.payproContactDis}}</a></p>
                                </FormItem>
                              </Col>

                          </Row>



                    </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1100')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=1)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('01round')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('01round')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproSalset.confirmorList[0].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproSalset.confirmorList[0].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1200')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=2)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('02round')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('02round')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=2">{{payproSalset.confirmorList[1].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=2">{{payproSalset.confirmorList[1].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1300')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=3)">
                      <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('03round')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('03round')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=3">{{payproSalset.confirmorList[2].paypcfOperatorcalDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=3">{{payproSalset.confirmorList[2].paypcfOptimecal}}</span></p>
                                </Col>
                            </Row>
                      </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1400')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=90)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">薪资报告：</span><span class="item_sub_2"><a style="text-decoration:underline" href="javascript:void(0);" @click="btnAlertListModel('90final')" >查看</a></span></p>
                                </Col>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub"> 错误列表：</span><span class="item_sub_2"><a style="text-decoration:underline"  href="javascript:void(0);" @click="openCheckListModel('90final')">查看</a></span></p>
                                </Col>
                            </Row>
                            <Row >
                              <Col span="22" offset="1">
                                <p  style="height:30px;line-height:30px;padding-left:150px;">最后一轮薪资确认： <Checkbox v-model="paypcfIsconfirm" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))" @on-change="isSureChecked"> </Checkbox></p>
                              </Col>
                            </Row>
                      </div>
                </div>
              </div>
            </div>
            <div style="width:100%;" v-if="openIdUpdate=='5'">
               <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
                <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1000'">
                   <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                    </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="10" offset="1">
                                <FormItem label="薪资账套" >
                                    <Input v-model="payproSalset.payproSalsetDis" placeholder="Enter your name" disabled></Input>
                                </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                  <FormItem label="期间" prop="payproPeriod">
                                      <Input v-model="payproSalset.payproPeriod" placeholder="Enter your e-mail" disabled></Input>
                                  </FormItem>
                              </Col>
                          </Row>
                          <Row>
                              <Col span="10" offset="1">
                                  <FormItem label="包含公司及联系人" prop="payproContactNumDis" >
                                      <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertList('id','desc',10,1)" class="a_line"  >{{payproSalset.payproContactNumDis}}</a></p>
                                  </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                <FormItem label="薪资联系人" >
                                    <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertModel"  class="a_line" >{{payproSalset.payproContactDis}}</a></p>
                                </FormItem>
                              </Col>

                          </Row>



                    </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1100')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=1)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <!-- <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">日期时间：</span><span class="item_sub_2" v-if="salaryComputationObj.payproPlandate.indexOf('#')==-1">{{salaryComputationObj.payproPlandate.split('#')[0]}}</span></p>
                                </Col>

                            </Row> -->
                             <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">Bank Report(招行)</span><span class="item_sub_2">
                                    <a style="text-decoration:underline;display:inline-block;" download="" @click="dowFile('01round')" >{{filename}}</a>
                                    <a style="text-decoration:underline;float:right" download=""  @click="btnGenerateList('payFlowPayrollprocess.exportBankReport')" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))">生成</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="20" offset="1">
                                 <FormItem label="付款凭证：" prop="platDctpAffix">
                                  <Row>
                                    <i-col span="3">
                                    <Upload :before-upload="handleUpload" action=" ">
                                      <Button type="ghost" icon="ios-cloud-upload-outline" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))">浏览</Button>
                                    </Upload>
                                    </i-col>
                                    <i-col span="20" offset="1">
                                    <span v-if="file !== '' ">
                                      <i-col span="14">
                                      <Input v-model="file.name" readonly="readonly" >
                                        <span slot="prepend">
                                          <Icon type="folder" size="16"></Icon>
                                        </span>
                                      </Input>
                                      </i-col>
                                      <i-col span="10">
                                        <Button type="text"  @click="uploadLocalFile" v-if="loadingStatus" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))">
                                          上传
                                        </Button>
                                       <Button type="text"  @click="downloadFile" v-if="!loadingStatus">
                                          下载
                                        </Button>
                                        <Button type="text"  @click="deleteFile" v-if="isDelete&&!disabled" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))">
                                          删除
                                        </Button>
                                    </i-col>
                                    </span>
                                    </i-col>
                                  </Row>
                                </FormItem>

                                </Col>
                            </Row>
                            <Row>
                                <Col span="20" offset="1">
                                <FormItem label="备注：" prop="payproPeriod">
                                    <Input v-model="payproBankcomment" type="textarea" :rows="4" placeholder="请输入内容" style="width:720px;" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))"></Input>
                                </FormItem>
                                </Col>

                            </Row>
                            <!-- <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproOperatorbankDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproOptimebankDis}}</span></p>
                                </Col>
                            </Row>     -->
                      </div>
                </div>
                <!-- <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1200')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=2)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <Row>
                              <Col span="6" offset="1" >E-mail：</Col>
                              <Col span="17" ><a :href="'mailto:'+userInfo.payssEmail" class="a_line">{{userInfo.payssEmail}}</a></Col>
                            </Row>
                      </div>
                </div> -->

              </div>
            </div>
            <div style="width:100%;" v-if="openIdUpdate=='6'">
                <div class="dataBlocks" v-for="(item, index) in dataBlocks" :key="index">
                  <div style="width:100%;"  v-if="item.flsdbMark.split('_')[1]=='1000'">
                   <div class="dataBlocksTitle">
                      <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                    </div>
                    <div class="dataContent">
                      <Spin size="large" v-if="!item.blockColumn" fix></Spin>

                          <Row>
                              <Col span="10" offset="1">
                                <FormItem label="薪资账套" >
                                    <Input v-model="payproSalset.payproSalsetDis" placeholder="Enter your name" disabled></Input>
                                </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                  <FormItem label="期间" prop="payproPeriod">
                                      <Input v-model="payproSalset.payproPeriod" placeholder="Enter your e-mail" disabled></Input>
                                  </FormItem>
                              </Col>
                          </Row>
                          <Row>
                              <Col span="10" offset="1">
                                  <FormItem label="包含公司及联系人" prop="payproContactNumDis" >
                                      <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertList('id','desc',10,1)" class="a_line"  >{{payproSalset.payproContactNumDis}}</a></p>
                                  </FormItem>
                              </Col>
                              <Col span="10" offset="1">
                                <FormItem label="薪资联系人" >
                                    <p class="p_line" ><a href="javascript:void(0);" @click="btnAlertModel"  class="a_line" >{{payproSalset.payproContactDis}}</a></p>
                                </FormItem>
                              </Col>

                          </Row>



                    </div>
                </div>
                <div style="width:100%;" v-if="(item.flsdbMark.split('_')[1]=='1100')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))>=1)">
                    <div class="dataBlocksTitle">
                        <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}
                      </div>
                      <div class="dataContent">
                        <Spin size="large" v-if="!item.blockColumn" fix></Spin>
                            <!-- <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">日期时间：</span><span class="item_sub_2" v-if="salaryComputationObj.payproPlandate.indexOf('#')==-1">{{salaryComputationObj.payproPlandate.split('#')[0]}}</span></p>
                                </Col>

                            </Row> -->
                             <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">Payroll voucher sample：</span><span class="item_sub_2">
                                    <a style="text-decoration:underline;display:inline-block;" download="" @click="dowFiless('01round')" >{{sampleDisName}}</a>
                                    </span></p>
                                </Col>
                            </Row>
                             <Row>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">Payroll voucher：</span><span class="item_sub_2">
                                    <a style="text-decoration:underline;display:inline-block;" download="" @click="dowFile('01round')" >{{filename}}</a>
                                    <a style="text-decoration:underline;float:right" download=""  @click="btnGenerateList('payFlowPayrollprocess.exportVoucher')" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))">生成</a></span></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="20" offset="1">
                                 <FormItem label="付款凭证" prop="platDctpAffix">
                                  <Row>
                                    <i-col span="3">
                                    <Upload :before-upload="handleUpload" action=" ">
                                      <Button type="ghost" icon="ios-cloud-upload-outline" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))">浏览</Button>
                                    </Upload>
                                    </i-col>
                                    <i-col span="20" offset="1">
                                    <span v-if="file !== '' ">
                                      <i-col span="14">
                                      <Input v-model="file.name" readonly="readonly" >
                                        <span slot="prepend">
                                          <Icon type="folder" size="16"></Icon>
                                        </span>
                                      </Input>
                                      </i-col>
                                      <i-col span="10">
                                        <!-- 签字版recon上传 -->
                                        <Button type="text"  @click="uploadLocalFile" v-if="loadingStatus"  :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))">
                                          上传
                                        </Button>
                                       <Button type="text"  @click="downloadFile" v-if="!loadingStatus" >
                                          下载
                                        </Button>
                                        <Button type="text"  @click="deleteFile" v-if="isDelete&&!disabled" >
                                          删除
                                        </Button>
                                    </i-col>
                                    </span>
                                    </i-col>
                                  </Row>
                                </FormItem>

                                </Col>
                            </Row>
                            <!-- <Row>
                                <Col span="20" offset="1">
                                <FormItem label="备注:" prop="payproPeriod">
                                    <Input v-model="payproBankcomment" type="textarea" :rows="4" placeholder="请输入内容" style="width:100%;" :disabled="!((!disabled)&&(item.flsdbOptauth=='02update'))"></Input>
                                </FormItem>
                                </Col>

                            </Row>
                            <Row>
                                <Col span="10" offset="1">
                                    <p class="item_3_1"><span class="item_sub">操作人：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproOperatorbankDis}}</span></p>
                                </Col>
                                <Col span="10" offset="1">
                                  <p class="item_3_1"><span class="item_sub">操作时间：</span><span class="item_sub_2" v-if="payproSalset.confirmorList.length>=1">{{payproOptimebankDis}}</span></p>
                                </Col>
                            </Row>     -->
                      </div>
                </div>
              </div>
            </div>


            <div class="dataBlocks" v-for="(item, index) in operation" :key="index">
              <div class="dataBlocksTitle">
                <Icon type="compose" style="margin-right: 5px;"></Icon>{{item.flsdbName}}</div>
              <div class="dataContent">
                <div class="">
                  <Form label-position="right" :label-width="200">
                    <Row>
                      <Col span="10" offset="1">
                        <FormItem :label="$t('lang_communication.commonFlowUpdate2.operator')">
                          <Input :value="item.flsdbMark.optuser" disabled></Input>
                        </FormItem>
                      </Col>
                      <Col span="10" offset="1">
                        <FormItem :label="$t('lang_communication.commonFlowUpdate2.operatatetime')">
                          <Input :value="item.flsdbMark.opttime" disabled></Input>
                        </FormItem>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </div>
          </div>

          </div>

          <div class="footer" v-show="thisStepState !== 'p_flowst_3' && thisStepState !== 'p_flowst_0'">
            <div class="footerChilden" v-show="stepAuthLimits == '03submit'">
              <Button type="primary" @click="save('ruleForm')" :loading="loading1">{{$t('button.sav')}}</Button>
              <Button type="success" style="margin-left: 5px;" @click="isSubmit('ruleForm')" :loading="loading2" v-show="thisPkValue !== '0'">提交</Button>
            </div>
          </div>
         </Form>
      </div>
    </div>

    <Modal v-model="isModel" width="360">
        <p slot="header" style="color:#f60;text-align:left">
            <Icon type="ios-information-circle"></Icon>
            <span>{{$t('lang_communication.commonFlowUpdate2.lookInfo')}}</span>
        </p>
        <div style="text-align:left">
           <Row>
          <Col span="6" offset="1">{{$t('lang_communication.commonFlowUpdate2.contract')}}：</Col>
          <Col span="17" >{{userInfo.payssContact}}</Col>
        </Row>
        <Row>
          <Col span="6" offset="1" >{{$t('lang_communication.commonFlowUpdate2.payssPhone')}}：</Col>
          <Col span="17" >{{userInfo.payssPhone}}</Col>
        </Row>
        <Row>
          <Col span="6" offset="1" >E-mail：</Col>
          <Col span="17" ><a :href="'mailto:'+userInfo.payssEmail" class="a_line">{{userInfo.payssEmail}}</a></Col>
        </Row>
        </div>
        <div slot="footer">
            <Button type="success" size="large"   @click="closeModelSure">{{$t('button.clo')}}</Button>
        </div>
    </Modal>
    <transition name="fade">
      <emaillogView v-show="openUpdate" logType="查询" @closeUp="closeUp" ref="update"></emaillogView>
    </transition>
    <transition name="fade">
      <PayproSalset v-show="isOpenEmpList"  :payproSalset="payproSalset.payproSalset"  @closeEmp="closeEmp"  ref="empList"></PayproSalset>
    </transition>
    <transition name="fade">
      <updateBox v-show="openUpdateMOdel" :id="updateId" :logType="logType" :index="index" @closeUp="closeUp" @getData="addNewArray" @update="updateArray" ref="update2"></updateBox>
    </transition>
     <transition name="fade">
      <salaryComputation v-if="openSalaryModel" :openIdUpdate='openIdUpdate' :roundNumber='roundNumber' :paccStatus="payproSalset.paccStatus" :payproPeriod="payproSalset.payproPeriod" :payproSalset="payproSalset.payproSalset"  :payproRound="salaryComputationObj.payproRound" ref="salaryComputation" @closeModel="closeModel"></salaryComputation>
    </transition>
     <transition name="fade">
      <flowPayErrorList v-if="IsErrorListModel" :openIdUpdate='openIdUpdate' :roundNumber='roundNumber' :paccStatus="payproSalset.paccStatus" :payproPeriod="payproSalset.payproPeriod" :payproSalset="payproSalset.payproSalset" :funId="funId"  :payproRound="salaryComputationObj.payproRound" ref="salaryComputation" @closeErrorListModel="closeErrorListModel"></flowPayErrorList>
    </transition>
    <transition name="fade">
      <flowPaySureErrorList v-if="IsSureErrorListModel" :thisStepState='thisStepState' :openIdUpdate='openIdUpdate' :isbtnDisplay='isbtnDisplay' :roundNumber='roundNumber' :paccStatus="payproSalset.paccStatus" :payproPeriod="payproSalset.payproPeriod" :payproSalset="payproSalset.payproSalset" :funId="funId"  :payproRound="salaryComputationObj.payproRound"  ref="closeSureErrorListModel" @closeSureErrorListModel="closeSureErrorListModel"></flowPaySureErrorList>
    </transition>
  </div>
</template>
<script>
  import emaillogView from '../commonFlowList/emaillogView'
  import updateBox from '../../payroll/paySalplanCheck/paySalplanView'
  import commonSingleForm from '../commonCompanents/commonSingleForm'
  import PayproSalset from '../.././common/commonFlowList/flowPayproSalsetList'
  import salaryComputation from '../.././common/commonFlowList/flowPaySalaryComputation'
  import flowPayErrorList from '../.././common/commonFlowList/flowPayErrorList'
  import flowPaySureErrorList from '../.././common/commonFlowList/flowPaySureErrorList'
  import { getDataLevelUserLogin,getDataLevelUserLoginId, getDataLevelUserLoginNew2, getDataLevelUserLoginNew3, uploadFile } from '../../../axios/axios'
  import { isSuccess, findComponentUpward, deepCopy, extendObject } from '../../../lib/util'
  import validCode from '../commonCompanents/validCode'
  import { onChange } from '../onChange/index'
  import Bus from '../bus'

  export default {
    data() {
      return {

      IsSureErrorListModel:false,//薪资确认错误列表弹框
      openSalaryModel: false, //第一轮运算弹框
      openUpdateMOdel: false, //日历弹框
      isOpenEmpList: false, //包含公司及联系人信息
      openUpdate: false,
      isShow: false, // 防止数据未加载完成就显示form页面
      dataBlocks: [],
      isModel: false, //点击姓名时的弹框
      disabled: this.stepState == "p_flowst_3",
      // deepDisabled:!((!disabled)&&(item.flsdbOptauth=='02update')),
      // deepDisabled1:!((!disabled)&&(item.flsdbOptauth=='02update')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))==1)),
      // deepDisabled2:!((!disabled)&&(item.flsdbOptauth=='02update')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))==2)),
      // deepDisabled3:!((!disabled)&&(item.flsdbOptauth=='02update')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))==3)),
      // deepDisabled90:!((!disabled)&&(item.flsdbOptauth=='02update')&&(parseInt(salaryComputationObj.payproRound.slice(0,2))==90)),
      loading1: false,
      loading2: false,
      dataBlocksFake: [], // 临时存储
      formData: {},
      formDataSubmit: {},
      clmMap: {},
      dataParams: {},
      tbName: "",
      data: [],
      columns: [],
      valueMap: {},
      isFinish: false,
      requirCount: 0,
      finishCount: 0,
      thisPkValue: this.pkValue,
      thisStepId: this.stepId,
      thisStepState: this.stepState,
      thisSetpName: this.setpName,

      operation: [],
      docs: [],
      mailRecords: [],
      stepAuthLimits: "",
      logType: "",
      // 李琪
      // 薪资帐套字段
      payproSalset: {
        payproSalsetDis: "",
        payproPeriod: "",
        payproPeryear: "",
        payproContactDis: "",
        payproContactNumDis: "",
        paccStatus:"04confirmed",//zz步骤三状态值
        payproSalset: "",//上面是前五个公用字段
        payproPlanId: "",//步骤一薪资计划
        payproPlandate:'',//步骤三日期时间
        errorNum:[],//步骤三
        errorpendNum:[],//步骤三
        confirmorList:[],
        paypcfOperatorcalDis:'',//步骤三操作人
        paypcfOptimecal:'',//步骤三操作时间
      },

      //
      payproContactNumDis: "",
      //个人信息查询
      userInfo: {
        payssContact: "",
        payssPhone: "",
        payssEmail: ""
      },
       // 02  payproPrisup
      //2-2// checkbox组

      salaryComputationObj:{// 3步骤3显示需要的字段
        payproRound:""
      },
      isErrorList:false,//3步骤检查按钮显示
      IsErrorListModel:false,//3步骤ErrorList按钮显示
      roundNumber:'',
      confirmorList: [],// 步骤2-3轮询字段

      filename:'',//生成
      filekey:'',
      file:'',
      isDelete:false,
      isshow:this.file!='',
      payproBankcheckflg:'',
      payproBankcomment:'',//备注
      loadingStatus: false,
      priToken:'',
      isbtnDisplay:'',
      payproOperatorbankDis:'',
      payproOptimebankDis:'',
      payproBankrepflg:'',
      payproReconflg:'',
      sampleDis:'',
      sampleDisStation:'',
      sampleDisName:'',
      data: [],
      total: 0,
      updateId: "",
      index: 0,
      openIdUpdate: this.openId,
      paypcfIsconfirm:false,
     payerrResperson:'',
      ruleForm: {
        payproPrisup: false,
        platDctpAffix:''
      },
      rules: {
          name: [
            { required: true, message: '请选择薪资确认', trigger: 'change' },
          ],
      },
      logType: "保存",
      ruleValidate: {}
    };
  },
  props: {
    flowId: String,
    pkValue: String,
    stepId: String,
    setpName: String,
    funId: String,
    stepState: String,
    openId: String,
  },
  created() {},
  mounted() {
     this.getPayproSalset();
    this.getColumns();
    this.getDataBlock();

  },
  components: {
    commonSingleForm,
    emaillogView,
    PayproSalset,
    updateBox,
    salaryComputation,
    flowPayErrorList,
    flowPaySureErrorList
  },
  methods: {
    isLoadingstatus(){
           if(this.openIdUpdate=='5'&&this.salaryComputationObj.payproRound.slice(0,2)==90){
                   this.loadingStatus =this.payproBankcheckflg==''
                   if(this.payproBankcheckflg==''){
                     this.isDelete=false
                   }else{
                     this.isDelete=true
                   }
              }
          // 签字版recon上传  payproReconflg
          if(this.openIdUpdate=='6'&&this.salaryComputationObj.payproRound.slice(0,2)==90){
                   this.loadingStatus =this.payproReconflg==''
                    if(this.payproReconflg==''){
                     this.isDelete=false
                   }else{
                     this.isDelete=true
                   }
          }
          console.log(this.loadingStatus,1111111111)
    },
    deleteFile(){
        // 银行报盘核对表生成  payproBankcheckflg
      if(this.openIdUpdate=='5'&&this.salaryComputationObj.payproRound.slice(0,2)==90){
                   this.payproBankcheckflg="";
                  this.file=''
                  this.file.name=''
              }
          // 签字版recon上传  payproReconflg
          if(this.openIdUpdate=='6'&&this.salaryComputationObj.payproRound.slice(0,2)==90){
                 this.payproReconflg="";
                  this.file=''
                  this.file.name=''
          }
          this.loadingStatus = true
          this.isDelete=false
    },
    downloadFile() {
           const t = this
            var fileStation=''
            // 银行报盘核对表生成  payproBankcheckflg
            if(t.openIdUpdate=='5'&&t.salaryComputationObj.payproRound.slice(0,2)==90){
                  t.filename = t.filename
                  fileStation=t.payproBankcheckflg
              }
          // 签字版recon上传
          if(t.openIdUpdate=='6'&&t.salaryComputationObj.payproRound.slice(0,2)==90){
               t.filename = t.filename
                fileStation=t.payproReconflg
          }

    		let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: t.$t('button.exp'),
          filekey:fileStation,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.file.name)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.file.name)
              let link = document.createElement('a')
              link.href = doclink
              link.download = 'downloadfiletemp'
              link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
    	},
    uploadLocalFile() {
        const t = this
        const formData = new FormData()
        formData.append('upfile', t.file)
        console.log(formData)
        uploadFile(formData).then(res => {
          for (const key in res.data) {
            // 银行报盘核对表生成  payproBankcheckflg
            if(t.openIdUpdate=='5'&&this.salaryComputationObj.payproRound.slice(0,2)==90){
                t.file =  { name: key }
                t.payproBankcheckflg=res.data[key]
                t.ruleForm.platDctpAffix = key + ':' + res.data[key]
            }
            // 签字版recon上传  payproReconflg
            if(t.openIdUpdate=='6'&&this.salaryComputationObj.payproRound.slice(0,2)==90){
                t.file =  { name: key }
                t.payproReconflg=res.data[key]
                t.ruleForm.platDctpAffix = key + ':' + res.data[key]
            }
          }
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '上传成功',
              onOk: () => {
                t.loadingStatus = false
                // this.isDelete=false
              },
            })
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    handleUpload(file) {
        this.file = file
        this.isDelete=true;
        this.loadingStatus = true
        return false
      },
    dowFiless(){
        const t = this
    		let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: t.$t('button.exp'),
          filekey: t.sampleDisStation,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.sampleDisName)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.sampleDisName)
              let link = document.createElement('a')
              link.href = doclink
              link.download = 'downloadfiletemp'
              link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
     dowFile() {
        const t = this
         // bank report生成  payproBankrepflg
         var fileStation=''
            if(t.openIdUpdate=='5'&&t.salaryComputationObj.payproRound.slice(0,2)==90){
                  t.filename = t.filename
                  fileStation=t.payproBankrepflg
              }
          // Payment voucher生成  payproVoucherflg
          if(t.openIdUpdate=='6'&&t.salaryComputationObj.payproRound.slice(0,2)==90){
               t.filename = t.filename
                fileStation=t.payproVoucherflg
          }
    		let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: t.$t('button.exp'),
          filekey: fileStation,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filename)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(t.filename)
              let link = document.createElement('a')
              link.href = doclink
              link.download = 'downloadfiletemp'
              link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    // t.$emit('setfilename', t.filename, t.filename, true)
    btnGenerateList(station){
        const t = this
        let data = {
          _mt: station,
          funId: t.funId, //
          logType: "查看", // 主键值
          id: t.thisPkValue //行id
        }

          getDataLevelUserLogin(data).then((res) => {
            if (isSuccess(res, t)) {
                if(res.data.content[0].filename!='no record'){
                    // bank report生成  payproBankrepflg
                    if(t.openIdUpdate=='5'&&t.salaryComputationObj.payproRound.slice(0,2)==90){
                        t.filename = res.data.content[0].filename
                        t.payproBankrepflg = res.data.content[0].filekey.split(':')[1]
                        t.getPriToken(t.payproBankrepflg)
                    }
                    // Payment voucher生成   payproVoucherflg
                   if(t.openIdUpdate=='6'&&t.salaryComputationObj.payproRound.slice(0,2)==90){
                        t.filename = res.data.content[0].filename
                        t.payproVoucherflg = res.data.content[0].filekey
                        t.getPriToken(t.payproVoucherflg)
                    }
                     t.$Modal.success({
                      title: this.$t('reminder.remind'),
                      content: '生成成功',
                    })
                }else{
                  t.$Modal.error({
                    title: this.$t('reminder.err'),
                    content: '无数据',
                  })
                }

            }
          }).catch(() => {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: this.$t('reminder.errormessage'),
            })
          })

    },
    getPriToken(filekey) {
        const t = this
        let data = {
          _mt: 'userMgmt.getfiletoken',
          isprivate: true,
          logType: this.$t('button.exp'),
          filekey: filekey,
          expiresecs: 180,
        }
        getDataLevelUserLogin(data).then((res) => {
          if (isSuccess(res, t)) {
            t.priToken = res.data.content[0].value
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },

    openSeeListModel(){},
    openUploadingListModel(){},
    openDeletListModel(){},
    isSureChecked(value){
      const t = this
          if(t.openIdUpdate=='4-1'){
                t.payerrResperson='02BP'
            }
            if(t.openIdUpdate=='4-2'){
                t.payerrResperson='03BF'
            }
            if(t.openIdUpdate=='4-3'){
                t.payerrResperson='01PR'
            }
            t.formDataSubmit = {};
            t.formDataSubmit._mt = "payProErrorlist.confirmCheck";
            t.formDataSubmit.logType = '查询';
            t.formDataSubmit.data = JSON.stringify({'payerrPeriod':t.payproSalset.payproPeriod,'payerrSalset':t.payproSalset.payproSalset,'payerrResperson':t.payerrResperson});
            t.formDataSubmit.funId= t.funId,
            getDataLevelUserLogin(t.formDataSubmit).then((res) => {
            if (isSuccess(res, t)) {
               console.log(res.data.content[0].value)
               if(res.data.content[0].value>0){
                 t.paypcfIsconfirm=false
                  t.$Modal.error({
                title: t.$t('reminder.err'),
                content: '请先处理错误数据',
                })

               }else{
                 if (t.paypcfIsconfirm===true) {
                   t.paypcfIsconfirm=true
                 }else {
                  t.paypcfIsconfirm=false
                 }
               }
            }
            }).catch(() => {
            this.$Modal.error({
                title: this.$t('reminder.err'),
                content: this.$t('reminder.errormessage'),
            })
            })
    },
    //检查确认错误列表打开方法
    openCheckListModel(roundNumber){
      this.IsSureErrorListModel=true
      this.roundNumber=roundNumber
    },
    // 检查确认错误列表关闭方法
    closeSureErrorListModel(roundNumber){
      this.IsSureErrorListModel=false
    },
    closeErrorListModel(){
      this.IsErrorListModel=false;
    },
    openErrorListModel(roundNumber){
       this.IsErrorListModel=true;
       this.roundNumber=roundNumber
    },
    closeModelSure(){
      this.isModel=false;

    },
    // 薪资运算检查方法
    btnisErrorList(roundNumber){

      // this.openSalaryModel = true;
      const t = this
      t.payproSalset
        t.formDataSubmit = {};
          t.formDataSubmit._mt = "payProErrorlist.check";
          t.formDataSubmit.logType = '查询';
           t.formDataSubmit.funId = t.funId;
          t.formDataSubmit.data = JSON.stringify({'payerrPeriod':t.payproSalset.payproPeriod,'payerrSalset':t.payproSalset.payproSalset,'payerrRound':roundNumber});

          getDataLevelUserLoginNew3(t.formDataSubmit)
            .then(res => {
              if (isSuccess(res, t)) {
               if(res.data.content[0].value!='0'){
                  t.isErrorList=true;

                  t.getPayproSalset();
               }else{

                  t.isErrorList=false;
                 t.$Modal.success({
                  title: "提示",
                  content: "无错误信息"
                });
               }
              }
            })
            .catch(() => {
              t.$Modal.error({
                title: "错误",
                content: "网络错误"
              });
            });
    },

    closeModel() {
      this.openSalaryModel = false;
    },
    btnAlertListModel(roundNumber) {
      this.roundNumber=roundNumber
      this.openSalaryModel = true;
    },

    addNewArray(res) {
      const t = this;
      // t.data.unshift(res)
    },
    updateArray(res) {
      const t = this;
      // t.data.splice(t.index, 1, res)
    },
    // 日历弹框
    openUpDate(id, logType, index) {
      const t = this;
      t.updateId = parseInt(id, 10);
      t.logType = logType;
      t.openUpdateMOdel = true;
      t.index = index;
      t.$refs.update2.getTime(id);
      t.$refs.update2.getSelect();
      t.$refs.update2.TransformationMode(2);
    },
    closeEmp() {
      const t = this;
      t.isOpenEmpList = false;
    },
    // 查看个人信息
    btnAlertModel() {


      const t = this;

      getDataLevelUserLogin({
        _mt: "paySalSet.getById",
        funId: t.funId, //
        logType: "查看", // 主键值
        id: t.payproSalset.payproSalset //行id
      })
        .then(res => {
          if (isSuccess(res, t)) {
            if (res.data.content.length > 0) {
              let userInfo = res.data.content[0];
              t.userInfo.payssContact = userInfo.payssContact;
              t.userInfo.payssPhone = userInfo.payssPhone;
              t.userInfo.payssEmail = userInfo.payssEmail;
              this.isModel = true;
            }
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: "错误",
            content: "网络错误"
          });
        });
    },
    // 查看公司列表信息
    btnAlertList(sort, order, rows, page) {
      const t = this;
      t.isOpenEmpList = true;
      this.$refs.empList.getData(1);
    },
    //查询薪资帐套信息
    getPayproSalset() {
      const t = this;
      t.payproSalset.payproSalsetDis = "";
      t.payproSalset.payproPeriod = "";
      t.payproSalset.payproPeryear = "";
      t.payproSalset.payproContactDis = "";
      t.payproSalset.payproContactNumDis = "";
      t.payproSalset.payproPlanId = "";
      getDataLevelUserLogin({
        _mt: "payFlowPayrollprocess.getByIdAndStep",
        funId: t.funId, //
        flowstep: t.openIdUpdate, // 流程步骤ID
        logType: "查看", // 主键值
        id: t.thisPkValue //行id
      })
        .then(res => {
          if (isSuccess(res, t)) {
            console.log(res,'11111111111111112222222222222222222222222211111')
            if (res.data.content.length > 0) {
              let userInfo = res.data.content[0];
              t.payproSalset.payproSalsetDis = userInfo.payproSalsetDis;
              t.payproSalset.payproPeriod = userInfo.payproPeriod;
              t.payproSalset.payproPeryear = userInfo.payproPeryear;
              t.payproSalset.payproContactDis = userInfo.payproContactDis;
              t.payproSalset.payproContactNumDis = userInfo.payproContactNumDis;
              t.payproSalset.payproSalset = userInfo.payproSalset;
              t.payproSalset.payproPlanId = userInfo.payproPlanId;
              t.salaryComputationObj.payproRound = userInfo.payproRound;
              t.salaryComputationObj.payproPlandate = userInfo.payproPlandate;
              if (userInfo.payproPrisup == "1") {
                t.ruleForm.payproPrisup = true;
              } else {
                t.ruleForm.payproPrisup = false;
              }
              if(t.openIdUpdate=='2-3'||t.openIdUpdate=='2-2'){

                t.confirmorList = [];
                for (let i = 0; i < userInfo.confirmorList.length; i++) {
                  let dataItem = {};
                  for (let key in userInfo.confirmorList[i]) {
                    let item;
                    if (key == "paypcfIsconfirm") {
                      item = key + i;
                    }

                    dataItem.id = userInfo.confirmorList[i].id;
                    dataItem.paypcfName = userInfo.confirmorList[i].paypcfName;
                    dataItem.paypcfIsconfirm =
                      userInfo.confirmorList[i].paypcfIsconfirm;
                    if (dataItem.paypcfIsconfirm == "0") {
                      dataItem.paypcfIsconfirm = false;
                    } else {
                      dataItem.paypcfIsconfirm = true;
                    }
                  }
                  t.confirmorList.push(dataItem);
                  console.log(t.confirmorList,'liqi');
                }
              }
              if(t.openIdUpdate=='3'){
                  t.payproSalset.errorNum = userInfo.errorNum;
                  t.payproSalset.errorpendNum = userInfo.errorpendNum;
                  t.payproSalset.confirmorList = userInfo.confirmorList;
                  if(userInfo.errorpendNum=='0'){
                      t.isErrorList=false
                  }else{
                    t.isErrorList=true
                  }
              }
              if(t.openIdUpdate=='4-1'||t.openIdUpdate=='4-2'||t.openIdUpdate=='4-3'){
                  t.payproSalset.confirmorList = userInfo.confirmorList;

              }
              if(t.openIdUpdate=='4-1'&&t.salaryComputationObj.payproRound.slice(0,2)==90){
                  if(userInfo.payproConfirmbp=='1'&&userInfo.payproConfirmbp!=undefined){
                      t.paypcfIsconfirm =true;
                  }else{
                      t.paypcfIsconfirm = false;
                  }


              }
              if(t.openIdUpdate=='4-2'&&t.salaryComputationObj.payproRound.slice(0,2)==90){
                  if(userInfo.payproConfirmbf=='1'&&userInfo.payproConfirmbf!=undefined){
                      t.paypcfIsconfirm =true;
                  }else{
                      t.paypcfIsconfirm = false;
                  }

              }
              if(t.openIdUpdate=='4-3'&&t.salaryComputationObj.payproRound.slice(0,2)==90){
                  if(userInfo.payproConfirmpy=='1'&&userInfo.payproConfirmpy!=undefined){
                      t.paypcfIsconfirm =true;
                  }else{
                      t.paypcfIsconfirm = false;
                  }
              }
              if(t.openIdUpdate=='5'){

                  if(userInfo.payproOperatorbankDis==''||userInfo.payproOperatorbankDis==undefined){
                        t.payproOperatorbankDis=''
                  }else{
                     t.payproOperatorbankDis=userInfo.payproOperatorbankDis

                  }

                  if(userInfo.payproOptimebankDis==''||userInfo.payproOptimebankDis==undefined){
                       t.payproOptimebankDis=''
                  }else{
                     t.payproOptimebankDis=userInfo.payproOptimebankDis

                  }
                  // bank report生成  payproBankrepflg
                  if(userInfo.payproBankrepflg==''||userInfo.payproBankrepflg==undefined){
                      t.payproBankrepflg=''
                      t.filename=''
                  }else{
                     t.payproBankrepflg=userInfo.payproBankrepflg.split(':')[1]
                     t.filename=userInfo.payproBankrepflg.split(':')[0]
                  }
                  if(t.payproBankrepflg!=''){
                    t.getPriToken(t.payproBankrepflg)
                  }
                    // 银行报盘核对表生成   payproBankcheckflg
                  if(userInfo.payproBankcheckflg==''||userInfo.payproBankcheckflg==undefined){
                      t.payproBankcheckflg=''
                      t.file=''

                  }else{
                     t.payproBankcheckflg=userInfo.payproBankcheckflg.split(':')[1]
                     t.file={}
                     t.file.name=userInfo.payproBankcheckflg.split(':')[0]
                  }


              }
                 if(t.openIdUpdate=='6'){

                  if(userInfo.payproOperatorbankDis==''||userInfo.payproOperatorbankDis==undefined){
                        t.payproOperatorbankDis=''
                  }else{
                     t.payproOperatorbankDis=userInfo.payproOperatorbankDis

                  }
                  if(userInfo.payproOptimebankDis==''||userInfo.payproOptimebankDis==undefined){
                       t.payproOptimebankDis=''
                  }else{
                     t.payproOptimebankDis=userInfo.payproOptimebankDis

                  }

                  if(userInfo.sampleDis==''||userInfo.sampleDis==undefined){
                       t.sampleDis=''
                        t.sampleDisName=''
                          t.sampleDisStation=''
                  }else{
                     t.sampleDis=userInfo.sampleDis;
                      t.sampleDisName=userInfo.sampleDis.split(':')[0]
                      t.sampleDisStation=userInfo.sampleDis.split(':')[1]

                  }
                  //  Payment voucher生成  payproVoucherflg
                  if(userInfo.payproVoucherflg==''||userInfo.payproVoucherflg==undefined){
                      t.payproVoucherflg=''
                      t.filename=''

                  }else{
                     t.payproVoucherflg=userInfo.payproVoucherflg.split(':')[1]
                     t.filename=userInfo.payproVoucherflg.split(':')[0]
                  }

                 if(t.payproVoucherflg!=''){
                    t.getPriToken(t.payproVoucherflg)
                 }
                //  签字版recon上传  payproReconflg
                  if(userInfo.payproReconflg==''||userInfo.payproReconflg==undefined){
                      t.payproReconflg=''
                      t.file=''
                  }else{
                     t.payproReconflg=userInfo.payproReconflg.split(':')[1]
                      t.file={}
                     t.file.name=userInfo.payproReconflg.split(':')[0]

                  }


              }
             t.isLoadingstatus();


            }


            }

        })
        .catch((res) => {
         console.log(res,'1111111111112222222')
          t.$Modal.error({
            title: "错误",
            content: "网络错误"
          });
        });
    },
    getDataBlock() {
      const t = this;
      t.requirCount = 0;
      t.finishCount = 0;
      t.dataBlocks = [];
      t.dataBlocksFake = [];
      t.operation = [];
      t.docs = [];
      t.mailRecords = [];
      getDataLevelUserLogin({
        _mt: "platAutoLayoutGetFlowEdit.getDataBlock",
        flowId: t.flowId, // 流程ID
        stepId: t.thisStepId, // 流程步骤ID
        roleType: t.$store.state.user.roleType, // 角色类型
        logType: "getDataBlock", // 主键值
        pkValue: t.thisPkValue
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.dataBlocksFake = res.data.content[0].dataBlocks;
            t.thisStepId = res.data.content[0].stepId;
            t.stepAuthLimits = res.data.content[0].stepAuth;
            for (let i = t.dataBlocksFake.length - 1; i > 0; i--) {
              if (t.dataBlocksFake[i].flsdbType === "docs") {
                console.log(t.dataBlocksFake[i].flsdbMark)
                t.dataBlocksFake[i].flsdbMark = JSON.parse(
                  t.dataBlocksFake[i].flsdbMark
                );
                t.dataBlocksFake[i].flsdbMark = t.dataBlocksFake[
                  i
                ].flsdbMark.map(item => {
                  let a = item.file.split(":");
                  return {
                    name: a[0],
                    url: a[1]
                  };
                });
                t.docs.push(t.dataBlocksFake[i]);
                t.dataBlocksFake.splice(i, 1);
              } else if (t.dataBlocksFake[i].flsdbType === "operation") {
                t.dataBlocksFake[i].flsdbMark = JSON.parse(
                  t.dataBlocksFake[i].flsdbMark
                );
                t.operation.push(t.dataBlocksFake[i]);
                t.dataBlocksFake.splice(i, 1);
              } else if (t.dataBlocksFake[i].flsdbType === "mailRecords") {
                t.dataBlocksFake[i].flsdbMark = JSON.parse(
                  t.dataBlocksFake[i].flsdbMark
                );
                t.mailRecords.push(t.dataBlocksFake[i]);
                t.dataBlocksFake.splice(i, 1);
              }
            }
            for (let i = 0; i < t.dataBlocksFake.length; i++) {
              t.requirCount = t.dataBlocksFake.length;
              if (t.dataBlocksFake[i].flsdbType === "01form") {
                t.getColumn(
                  t.dataBlocksFake[i].id,
                  t.dataBlocksFake[i].flsdbType
                );
              }
            }
          }
        })
        .catch(() => {
           t.$Modal.error({
             title: "错误",
             content: "网络错误"
           });
        });
      //        console.info(t.docs)
    },
    openUp(id) {
      const t = this;
      t.openUpdate = true;
      t.$refs.update.getData(id);
    },
    closeUp() {
      this.openUpdate = false;
      this.openUpdateMOdel = false;
    },
    /*
       * 格式化数据
       * */
    getFormDataSubmit(data) {
      let columns = data; // 字段
      let formData = {};
      let form = {}; // 表单
      let ruler = {}; // 校验规则
      let dis = {}; // 是否禁止修改
      let clmmap = {};
      console.log(data);
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].clmLayout === 20) {
          // 当数据类型为checkBox group时，需要数据类型为数组
          if (columns[i].clmValue !== "") {
            form[columns[i].clmName] = columns[i].clmValue.split(",");
          } else {
            form[columns[i].clmName] = [];
          }
        } else {
          form[columns[i].clmName] = columns[i].clmValue;
        }
        if (columns[i].clmName !== "companyId") {
          clmmap[columns[i].clmName] = columns[i].clmDbName;
        }
        if (columns[i].columnValid) {
          ruler[columns[i].clmName] = [];
          for (let j = 0; j < columns[i].columnValid.length; j++) {
            ruler[columns[i].clmName].push({
              validator: (rule, value, callback) => {
                if (!validCode[rule.valid](form[rule.field])) {
                  callback(new Error(rule.message));
                } else {
                  callback();
                }
              },
              trigger: "change",
              message:
                columns[i].clmDname + columns[i].columnValid[j].clmvPrompts,
              valid: columns[i].columnValid[j].clmvMod
            });
          }
        }
        if (columns[i].clmDefDis === false) {
          // 默认是否显示
          delete form[columns[i].clmName];
        }
        if (columns[i].clmIsupdate === true) {
          dis[columns[i].clmName] = true;
        } else {
          dis[columns[i].clmName] = false;
        }
      }
      form._mt = "platAutoLayoutSave.addOrUpd";
      form.logType = "保存";
      formData.form = form;
      formData.ruler = ruler;
      formData.clmmap = clmmap;
      formData.dis = dis;
      return formData;
    },

    /*
       * 获取表格字段
       * */
    getColumns() {
      const t = this;
      getDataLevelUserLoginId({
        _mt: "workorderFlowList.getListColumnForWorkOder",
        roleType: t.$store.state.user.roleType,
        logType: "getListColumn",
        funId: this.funId
      })
        .then(res => {
          if (isSuccess(res, t)) {
            let aa = [];
            t.flowId = res.data.content[0].flowId;
            t.btns = res.data.content[0].btns;
            t.tbName = res.data.content[0].tbName;
            aa = res.data.content[0].columns;
            for (let i = 0; i < aa.length; i++) {
              aa[i].sortable = false;
              if (!aa[i].width) {
                aa[i].width = 120;
              } else {
                aa[i].width = 60;
              }
              if (aa[i].className !== "") {
                aa[i].width = 120;
                aa[i]["render"] = (h, params) => {
                  this.thisSetpName = params.row[
                    params.column.key
                    ].split("$")[5];
                  let bb = [];
                  if (params.row[aa[i].key]) {
                    bb = params.row[aa[i].key].split("$");
                  }
                  let text = "";
                  let show = "";
                  switch (bb[3]) {
                    case "p_flowst_0":
                      show = "未开启";
                      break;
                    case "p_flowst_1":
                      show = "待处理";
                      break;
                    case "p_flowst_2":
                      show = "处理中";
                      break;
                    case "p_flowst_3":
                      show = "已完成";
                      break;
                  }
                  if (bb[2]) {
                    text = "[ " + bb[2] + " ]";
                  }
                  if (text !== "") {
                    return h(
                      "Tooltip",
                      {
                        props: {
                          trigger: "hover",
                          content: show,
                          placement: "right"
                        }
                      },
                      [
                        h(
                          "div",
                          {
                            style: {
                              width: "119px",
                              height: "100%",
                              "line-height": "40px",
                              "text-align": "center"
                            },
                            on: {
                              click: () => {
                                this.thisPkValue = params.row.id;
                                this.thisStepId = params.row[params.column.key].split("$")[1];
                                this.isbtnDisplay=params.row[params.column.key].split("$")[3];
                                // console.log(this.thisStepId + '444444444444444444')
                                if (
                                  params.row[params.column.key].split(
                                    "$"
                                  )[3] === "p_flowst_0"
                                ) {
                                  return;
                                }
                                this.openIdUpdate = params.row[
                                  params.column.key
                                ].split("$")[2];
                                this.thisStepState = params.row[
                                  params.column.key
                                ].split("$")[3];
                                this.thisSetpName = params.row[
                                  params.column.key
                                ].split("$")[5];
                                // alert(this.thisStepState)
                                console.log(
                                  "11111111111111111111111" + this.thisStepState
                                );
                                this.getDataBlock();
                                this.getPayproSalset();
                              }
                            }
                          },
                          text
                        )
                      ]
                    );
                  }
                  return h();
                };
              }
            }
            t.columns = aa;
            this.getData();
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: "错误",
            content: "网络错误"
          });
        });
    },
    /*
       * 获取表格数据
       * */
    getData() {
      const t = this;
      getDataLevelUserLoginId({
        _mt: "workorderFlowList.getPageForWorkOder",
        sort: "id",
        order: "desc",
        rows: "1",
        page: "1",
        roleType: t.$store.state.user.roleType,
        logType: "getPage",
        funId: t.funId,
        data: JSON.stringify({
          id: t.thisPkValue
        })
      })
        .then(res => {
          if (isSuccess(res, t)) {
            t.data = JSON.parse(res.data.content[0].rows);
            for (let i = 0; i < t.data.length; i++) {
              t.data[i].cellClassName = {};
              for (let item in t.data[i]) {
                if (typeof t.data[i][item] === "string") {
                  if (t.data[i][item].split("$").length > 1) {
                    t.data[i].cellClassName[item] = t.data[i][item].split(
                      "$"
                    )[3];
                  }
                }
              }
            }
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: "错误",
            content: "网络错误"
          });
        });
    },
    getColumn(dataBlockId, dataBlockType) {
      const t = this;
      const params = {
        _mt: "platAutoLayoutGetFlowEdit.getDataBlockColumn",
        flowId: t.flowId, // 流程ID
        stepId: t.thisStepId, // 流程步骤ID
        dataBlockId: dataBlockId,
        dataBlockType: dataBlockType,
        roleType: t.$store.state.user.roleType, // 角色类型
        logType: "getBlockColumn", // 主键值
        pkValue: t.thisPkValue
      };
      getDataLevelUserLogin(params)
        .then(res => {
          if (isSuccess(res, t)) {
            t.dataBlocks = []; // 进入之后每次清空datablock里的数据
            t.finishCount = t.finishCount + 1;
            let bb = t.dataBlocksFake;
            for (let i = 0; i < bb.length; i++) {
              if (bb[i].id === dataBlockId) {
                bb[i]["blockColumn"] = res.data.content[0];
                bb[i]["formlist"] = t.getFormDataSubmit(
                  res.data.content[0].columns
                );
              }
            }
            t.dataBlocksFake = bb; // 临时block存储变量最后赋值给正式的block，这样才能正确更新数据
            t.dataBlocks = t.dataBlocksFake;
            if (t.finishCount === t.requirCount) {
              this.getValueMap(t.dataBlocks);
              Bus.map = t.valueMap;
              Bus.father = t;
              if (onChange.hasOwnProperty(this.tbName)) {
                setTimeout(() => {
                  onChange[this.tbName].all_dis.call(this);
                }, 500);
              }
            }
          }
        })
        .catch(res => {
          t.$Modal.error({
            title: "错误",
            content: res
          });
        });
    },
    getValueMap(dataBlocks) {
      const t = this;
      t.valueMap = {};
      for (let i = 0; i < dataBlocks.length; i++) {
        let item = dataBlocks[i].blockColumn.columns;
        for (let j = 0; j < item.length; j++) {
          t.valueMap[item[j].clmName] = "block" + dataBlocks[i].flsdbMark;
        }
      }
    },
    close4() {
      const t = this;
      t.$Modal.confirm({
        title: "提示",
        content: "是否确认关闭？",
        onOk: () => {
          t.docs = [];
          t.operation = [];
          t.mailRecords = [];
          t.$emit("close4");
        }
      });
    },
    isSubmit(formName) {
      const t = this;
      if((this.openIdUpdate == "4-1"||this.openIdUpdate == "4-2"||this.openIdUpdate == "4-3" )&&this.salaryComputationObj.payproRound.slice(0,2)==90){
        if(t.paypcfIsconfirm==false){
          t.$Modal.error({
            title: "提示",
            content: "请先勾选最后一轮薪资确认"
          });
          return
        }
      }

      t.$Modal.confirm({
        title: "提示",
        content: "是否确认提交？",
        onOk: () => {
          t.submit(formName);
        }
      });
    },
    async submit(formName) {
      const t = this;
      t.loading2 = true;

      if (this.openIdUpdate == "2-1") {
        t.formDataSubmit = {};
        if (t.ruleForm.payproPrisup == false) {
          t.ruleForm.payproPrisup = 0;
        } else {
          t.ruleForm.payproPrisup = 1;
        }
        t.clmMap = { payproPrisup: "paypro_prisup" };
        t.dataParams = { payproPrisup: t.ruleForm.payproPrisup };
      }
      if (this.openIdUpdate == "2-2") {
        let ss = "";
        if (t.confirmorList.length != 0) {
          for (let i = 0; i < t.confirmorList.length; i++) {
            if (t.confirmorList[i].paypcfIsconfirm == false) {
              t.confirmorList[i].paypcfIsconfirm = 0;
            } else if (t.confirmorList[i].paypcfIsconfirm == true) {
              t.confirmorList[i].paypcfIsconfirm = 1;
            }
          }
          ss = t.confirmorList[0].id + "#" + t.confirmorList[0].paypcfIsconfirm;
          for (let i = 1; i < t.confirmorList.length; i++) {
            ss +=
              "%%" +
              t.confirmorList[i].id +
              "#" +
              t.confirmorList[i].paypcfIsconfirm;
          }
        }
        t.clmMap = { payproBfisup: "paypro_bfisup" };
        t.dataParams = { payproBfisup: ss };
      }
      if (this.openIdUpdate == "2-3") {
        let ss = "";
        if (t.confirmorList.length != 0) {
          for (let i = 0; i < t.confirmorList.length; i++) {
            if (t.confirmorList[i].paypcfIsconfirm == false) {
              t.confirmorList[i].paypcfIsconfirm = 0;
            } else if (t.confirmorList[i].paypcfIsconfirm == true) {
              t.confirmorList[i].paypcfIsconfirm = 1;
            }
          }
          ss = t.confirmorList[0].id + "#" + t.confirmorList[0].paypcfIsconfirm;
          for (let i = 1; i < t.confirmorList.length; i++) {
            ss +=
              "%%" +
              t.confirmorList[i].id +
              "#" +
              t.confirmorList[i].paypcfIsconfirm;
          }
        }
        t.clmMap = { payproBpisup: "paypro_bpisup" };
        t.dataParams = { payproBpisup: ss };
      }
      if (this.openIdUpdate == "3") {

        t.clmMap = {  };
        t.dataParams = { };
      }
      if (this.openIdUpdate == "4-1") {

        t.clmMap = {  };
        t.dataParams = { };
      }
       if (this.openIdUpdate == "4-2") {

        t.clmMap = {  };
        t.dataParams = { };
      }
      if (this.openIdUpdate == "4-3") {

        t.clmMap = {  };
        t.dataParams = { };
      }
      if ((this.openIdUpdate == "4-1")&&this.salaryComputationObj.payproRound.slice(0,2)==90) {
            if(t.paypcfIsconfirm==false){
              t.paypcfIsconfirm=0
            }else{
              t.paypcfIsconfirm=1
            }
        t.clmMap = {'payproConfirmbp':'paypro_confirmbp'  };
        t.dataParams = {'payproConfirmbp':t.paypcfIsconfirm };

      }
      else if ((this.openIdUpdate == "4-2")&&this.salaryComputationObj.payproRound.slice(0,2)==90) {
            if(t.paypcfIsconfirm==false){
              t.paypcfIsconfirm=0
            }else{
              t.paypcfIsconfirm=1
            }
        t.clmMap = {'payproConfirmbf':'paypro_fonfirmbf'  };
        t.dataParams = {'payproConfirmbf':t.paypcfIsconfirm };

      }
      if ((this.openIdUpdate == "4-3")&&this.salaryComputationObj.payproRound.slice(0,2)==90) {
            if(t.paypcfIsconfirm==false){
              t.paypcfIsconfirm=0
            }else{
              t.paypcfIsconfirm=1
            }
        t.clmMap = {'payproConfirmpy':'paypro_fonfirmpy'  };
        t.dataParams = {'payproConfirmpy':t.paypcfIsconfirm };

      }
      if ((this.openIdUpdate == "5")&&this.salaryComputationObj.payproRound.slice(0,2)==90) {
         let payproBankrep='',payproBankcheck=''
        // bank report生成   payproBankrepflg
        if(t.filename==''||t.payproBankrepflg==''){
           payproBankrep=''
        }else{
            payproBankrep=t.filename+':'+t.payproBankrepflg
        }
        // 银行报盘核对表生成  payproBankcheckflg
        if(t.file==''||t.payproBankcheckflg==''){
           payproBankcheck=''
        }else{
           payproBankcheck =t.file.name+':'+t.payproBankcheckflg
        }
         t.clmMap = {'payproBankrepflg':'paypro_bankrepflg','payproBankcheckflg':'paypro_bankcheckflg','payproBankcomment':'paypro_bankcomment'  };
          t.dataParams = {'payproBankrepflg':payproBankrep,'payproBankcheckflg':payproBankcheck,'payproBankcomment':t.payproBankcomment };
      }

      // 签字版recon上传  payproReconflg
     if ((this.openIdUpdate == "6")&&this.salaryComputationObj.payproRound.slice(0,2)==90) {
        if(t.file==''||t.payproReconflg==''){
          let payproRecon=''
          t.clmMap = {'payproReconflg':'paypro_reconflg' };
          t.dataParams = {'payproReconflg':payproRecon};

        }else{
           let payproRecon =t.file.name+':'+t.payproReconflg
           t.clmMap = {'payproReconflg':'paypro_reconflg'};
           t.dataParams = {'payproReconflg':payproRecon};
        }

      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          t.formDataSubmit._mt = "platAutoLayoutFlowSave.addOrUpd";
          t.formDataSubmit.tbName = t.tbName;
          t.formDataSubmit.logType = t.logType;
          t.formDataSubmit.stepId = t.thisStepId;
          t.formDataSubmit.roleType = t.$store.state.user.roleType; // 角色类型
          t.formDataSubmit.flowId = t.flowId;
          t.formDataSubmit.pkValue = t.thisPkValue;
          t.formDataSubmit.clmMap = JSON.stringify(t.clmMap);
          t.formDataSubmit.data = JSON.stringify(t.dataParams);
          console.log(t.formDataSubmit.stepId + "111111111111111111111");
          getDataLevelUserLoginNew3(t.formDataSubmit)
            .then(res => {
              t.loading2 = false;
              if (isSuccess(res, t)) {
                let data = {};
                data._mt = "platAutoLayoutFlowSubmit.submit";
                data.tbName = t.tbName;
                data.stepId = t.thisStepId;
                data.roleType = t.$store.state.user.roleType; // 角色类型
                data.flowId = t.flowId;
                data.pkValue = t.thisPkValue;
                data.logType = "submit";
                //        t.formDataSubmit.clmMap = JSON.stringify(t.clmMap)
                getDataLevelUserLogin(data)
                  .then(res2 => {
                    t.loading2 = false;
                    if (isSuccess(res2, t)) {
                      t.thisStepState = "p_flowst_3";
                      t.getPayproSalset();
                      t.getColumns();
                      t.getDataBlock();
                      t.$emit("getData");
                      t.$Modal.success({
                        title: "成功",
                        content: "提交成功"
                      });
                    }
                  })
                  .catch(() => {
                    t.loading2 = false;
                    t.$Modal.error({
                      title: "错误",
                      content: "网络错误"
                    });
                  });
              }
            })
            .catch(() => {
              t.loading2 = false;
              t.$Modal.error({
                title: "错误",
                content: "网络错误"
              });
            });
        } else {
          t.loading1 = false;
          return false;
        }
      });
    },
    change() {
      const t = this;
      for (let i = 0; i < this.$children.length; i++) {
        if (this.$children[i].$options) {
          if (this.$children[i].$options._componentTag === "commonSingleForm") {
            t.$children[i].change();
          }
        }
      }
    },
    downloadDocs(url, filename) {
      const t = this;
      let data = {
        _mt: "userMgmt.getfiletoken",
        isprivate: true,
        logType: "下载",
        filename: url,
        expiresecs: 180
      };
      getDataLevelUserLogin(data)
        .then(res => {
          if (isSuccess(res, t)) {
            localStorage.pageOpenedListAll = JSON.stringify(JSON.parse(localStorage.pageOpenedList))
            if (this.isIE()) {
              window.location.href = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filename)
            } else {
              let doclink = pubsource.pub_prvf_downlink + res.data.content[0].value + '&fname=' + encodeURI(filename)
              let link = document.createElement('a')
              link.href = doclink
              link.download = 'downloadfiletemp'
              link.click()
            }
            this.$store.state.app.pageOpenedList = JSON.parse(localStorage.pageOpenedListAll)
            localStorage.pageOpenedList = JSON.stringify(JSON.parse(localStorage.pageOpenedListAll))
          }
        })
        .catch(() => {
          t.$Modal.error({
            title: this.$t("reminder.err"),
            content: this.$t("reminder.errormessage")
          });
        });
    },
    /*
       * 保存方法
       * */
    async save(formName) {
      const t = this;


       t.loading1 = true;
      if (this.openIdUpdate == "2-1") {
        t.formDataSubmit = {};
        if (t.ruleForm.payproPrisup == false) {
          t.ruleForm.payproPrisup = 0;
        } else {
          t.ruleForm.payproPrisup = 1;
        }
        t.clmMap = { payproPrisup: "paypro_prisup" };
        t.dataParams = { payproPrisup: t.ruleForm.payproPrisup };
      }

      if (this.openIdUpdate == "2-2") {
        let ss = "";
        if (t.confirmorList.length != 0) {
          for (let i = 0; i < t.confirmorList.length; i++) {
            if (t.confirmorList[i].paypcfIsconfirm == false) {
              t.confirmorList[i].paypcfIsconfirm = 0;
            } else if (t.confirmorList[i].paypcfIsconfirm == true) {
              t.confirmorList[i].paypcfIsconfirm = 1;
            }
          }
          ss = t.confirmorList[0].id + "#" + t.confirmorList[0].paypcfIsconfirm;
          for (let i = 1; i < t.confirmorList.length; i++) {
            ss +=
              "%%" +
              t.confirmorList[i].id +
              "#" +
              t.confirmorList[i].paypcfIsconfirm;
          }
        }
        t.clmMap = { payproBfisup: "paypro_bfisup" };
        t.dataParams = { payproBfisup: ss };
      }
      if (this.openIdUpdate == "2-3") {
        let ss = "";
        if (t.confirmorList.length != 0) {
          for (let i = 0; i < t.confirmorList.length; i++) {
            if (t.confirmorList[i].paypcfIsconfirm == false) {
              t.confirmorList[i].paypcfIsconfirm = 0;
            } else if (t.confirmorList[i].paypcfIsconfirm == true) {
              t.confirmorList[i].paypcfIsconfirm = 1;
            }
          }
          ss = t.confirmorList[0].id + "#" + t.confirmorList[0].paypcfIsconfirm;
          for (let i = 1; i < t.confirmorList.length; i++) {
            ss +=
              "%%" +
              t.confirmorList[i].id +
              "#" +
              t.confirmorList[i].paypcfIsconfirm;
          }
        }
        t.clmMap = { payproBpisup: "paypro_bpisup" };
        t.dataParams = { payproBpisup: ss };
      }
      if (this.openIdUpdate == "3") {

        t.clmMap = {  };
        t.dataParams = { };
      }
      if (this.openIdUpdate == "4-1") {

        t.clmMap = {  };
        t.dataParams = { };
      }
       if (this.openIdUpdate == "4-2") {

        t.clmMap = {  };
        t.dataParams = { };
      }
      if (this.openIdUpdate == "4-3") {

        t.clmMap = {  };
        t.dataParams = { };
        this.salaryComputationObj.payproRound.slice(0,2)==90
      }
      if ((this.openIdUpdate == "4-1")&&this.salaryComputationObj.payproRound.slice(0,2)==90) {
            if(t.paypcfIsconfirm==false){
              t.paypcfIsconfirm=0
            }else{
              t.paypcfIsconfirm=1
            }
        t.clmMap = {'payproConfirmbp':'paypro_confirmbp'  };
        t.dataParams = {'payproConfirmbp':t.paypcfIsconfirm };

      }
      else if ((this.openIdUpdate == "4-2")&&this.salaryComputationObj.payproRound.slice(0,2)==90) {
            if(t.paypcfIsconfirm==false){
              t.paypcfIsconfirm=0
            }else{
              t.paypcfIsconfirm=1
            }
        t.clmMap = {'payproConfirmbf':'paypro_fonfirmbf'  };
        t.dataParams = {'payproConfirmbf':t.paypcfIsconfirm };

      }
      if ((this.openIdUpdate == "4-3")&&this.salaryComputationObj.payproRound.slice(0,2)==90) {
            if(t.paypcfIsconfirm==false){
              t.paypcfIsconfirm=0
            }else{
              t.paypcfIsconfirm=1
            }
        t.clmMap = {'payproConfirmpy':'paypro_fonfirmpy'  };
        t.dataParams = {'payproConfirmpy':t.paypcfIsconfirm };

      }
      if ((this.openIdUpdate == "5")&&this.salaryComputationObj.payproRound.slice(0,2)==90) {
          let payproBankrep='',payproBankcheck=''
        // bank report生成   payproBankrepflg
        if(t.filename==''||t.payproBankrepflg==''){
           payproBankrep=''
        }else{
           payproBankrep=t.filename+':'+t.payproBankrepflg
        }
        // 银行报盘核对表生成  payproBankcheckflg
        if(t.file==''||t.payproBankcheckflg==''){
           payproBankcheck=''
        }else{
            payproBankcheck =t.file.name+':'+t.payproBankcheckflg
        }
         t.clmMap = {'payproBankrepflg':'paypro_bankrepflg','payproBankcheckflg':'paypro_bankcheckflg','payproBankcomment':'paypro_bankcomment'  };
          t.dataParams = {'payproBankrepflg':payproBankrep,'payproBankcheckflg':payproBankcheck,'payproBankcomment':t.payproBankcomment };
      }

      // 签字版recon上传  payproReconflg
     if ((this.openIdUpdate == "6")&&this.salaryComputationObj.payproRound.slice(0,2)==90) {
        let payproRecon=''
        if(t.file==''||t.payproReconflg==''){
           payproRecon=''
        }else{
           payproRecon =t.file.name+':'+t.payproReconflg
        }
        t.clmMap = {'payproReconflg':'paypro_reconflg' };
        t.dataParams = {'payproReconflg':payproRecon};
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          t.formDataSubmit._mt = "platAutoLayoutFlowSave.addOrUpd";
          t.formDataSubmit.tbName = t.tbName;
          t.formDataSubmit.logType = t.logType;
          t.formDataSubmit.stepId = t.thisStepId;
          t.formDataSubmit.roleType = t.$store.state.user.roleType; // 角色类型
          t.formDataSubmit.flowId = t.flowId;
          t.formDataSubmit.pkValue = t.thisPkValue;
          t.formDataSubmit.clmMap = JSON.stringify(t.clmMap);
          t.formDataSubmit.data = JSON.stringify(t.dataParams);
          getDataLevelUserLoginNew3(t.formDataSubmit)
            .then(res => {
              t.loading1 = false;
              if (isSuccess(res, t)) {
                if (t.thisPkValue === "0") {
                  t.thisPkValue = res.data.content[0].value.split("_")[0];
                  t.thisStepId = res.data.content[0].value.split("_")[1];
                  console.log(res.data.content[0].value);
                  console.log(t.thisStepId + "保存");

                  t.getData();

                  t.$emit("getData");
                }
                t.getPayproSalset();
                this.getColumns();
                this.getDataBlock();
                t.$Modal.success({
                  title: "成功",
                  content: "保存成功"
                });
              }
            })
            .catch(() => {
              t.loading1 = false;
              t.$Modal.error({
                title: "错误",
                content: "网络错误"
              });
            });
        } else {
          t.loading1 = false;
          return false;
        }
      });
    }
  },
  watch: {
    thisStepState(trueValue) {
      if (trueValue === "p_flowst_3") {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../sass/updateAndAdd.scss";
.cover .box {
  width: 1200px;
}

.content {
  height: 500px;
  position: relative;
  overflow-y: auto;
  .table-form {
    margin-top: 0;
    margin-bottom: 20px;
  }
  .dataBlocks {
    .dataBlocksTitle {
      /*background: linear-gradient(-45deg, #c6b7ff, #ffffff);*/
      background-color: rgba(39, 142, 255, 0.2);
      font-size: 14px;
      padding: 0 20px;
      height: 26px;
      font-weight: bold;
      line-height: 26px;
    }
    .dataContent {
      position: relative;
      background-color: #f9f9f9;
      padding-right: 100px;
      padding-top: 30px;
      padding-bottom: 10px;
      /*width: 1100px;*/
      .operation {
        text-align: right;
        padding: 0 0 0 50px;
      }
      .docs {
        padding: 0 0 20px 100px;
      }
    }
  }
}
.footer {
  margin-top: 10px;
  padding: 0 30px;
  display: flex;
  justify-content: flex-end;
}
.a_line {
  text-decoration: underline;
  // padding:0 10px;
  height: 100%;
  // display: block;
}
.p_line {
  background: #f9f9f9;
  // border:1px solid #ddd;
  border-radius:3px;
}
.ivu-modal-footer .ivu-btn.ivu-btn-text.ivu-btn-large {
  display: none;
}
.item_3_1 {
  height: 30px;
  line-height: 30px;
  display: flex;
}
.item_3_1 .item_sub {
  width: 200px;
  display: inline-block;
  height: 100%;
  text-align: right;
}
.item_3_1 .item_sub_1 {
  width: 150px;
  display: inline-block;
  height: 100%;
}
.item_3_1 .item_sub_2 {
  flex: 1;
  display: inline-block;
  height: 100%;
}
</style>
