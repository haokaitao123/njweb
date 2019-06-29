<template >
  <div class="cover" >
    <div class="box">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          &nbsp;{{$t('lang_payroll.payFormula.title')}}
        </div>
        <Button type="text" @click="close">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Col span="4" class="colTree">
      <div class="Header">{{$t('lang_payroll.payFormula.itemHead')}}</div>
      <div class="divtree" :style="{height:treeheight + 'px',width: 200 +'px'} ">
        <i-col class="meau-left">
          <span v-for="(item,index) in items" :key="index" >
            <DropdownItem @click.native="insert(' [' + item.payssiItemName + '] ')" style="color: #4495f1">{{item.payssiItemCode}} &gt; {{item.payssiItemName}}</DropdownItem>
            <!--<Menu :active-name="active" width="auto" @on-select="pageTo">-->
              <!--&lt;!&ndash;<MenuItem name="option">&ndash;&gt;-->
                <!--&lt;!&ndash;{{$t('lang_payroll.paySalSet.title')}}&ndash;&gt;-->
              <!--&lt;!&ndash;</MenuItem>&ndash;&gt;-->
              <!--&lt;!&ndash;<MenuItem name="content" >&ndash;&gt;-->
                <!--&lt;!&ndash;{{$t('lang_payroll.paySalSetItem.title')}}&ndash;&gt;-->
              <!--&lt;!&ndash;</MenuItem>&ndash;&gt;-->
            <!--</Menu>-->
          </span>
        </i-col>
      </div>
      </Col>
      <Col span="4" class="mula">
      <div class="Header">{{$t('lang_payroll.payFormula.contentHead')}}</div>
          <Input :style="{height:treeheight1 + 'px'}" id="content" v-model="form.payssiFormula" type="textarea" :autosize="{minRows: 15,maxRows: 15}" ></Input>
            <!--<div :id="'editor'" style="z-index: 0;"></div>-->
            <!--<div id="txt" v-model="content" v-show="false"></div>-->
      </Col>
      <Col span="4" class="mula">
      <div class="Header">{{$t('lang_payroll.payFormula.comment')}}</div>
      <Input :style="{height:treeheight2 + 'px'}" v-model="form.payssiFormulacomment" type="textarea" :autosize="{minRows: 6,maxRows: 6}" ></Input>
      <!--<div :id="'editor'" style="z-index: 0;"></div>-->
      <!--<div id="txt" v-model="content" v-show="false"></div>-->
      </Col>
      <div class="Header">{{$t('lang_payroll.payFormula.calHead')}}</div>
      <div class="right" :style="{height:treeheight3 + 'px'} ">
        <i-col class="meau-left">
          <Button type="info" @click="insert('9')" class="button">9</Button>
          <Button type="info" @click="insert('8')" class="button">8</Button>
          <Button type="info" @click="insert('7')" class="button">7</Button>
          <Button type="info" @click="insert(' + ')" class="button">+</Button>
          <Button type="info" @click="insert(' - ')" class="button">-</Button><br/>
          <Button type="info" @click="insert('6')" class="button">6</Button>
          <Button type="info" @click="insert('5')" class="button">5</Button>
          <Button type="info" @click="insert('4')" class="button">4</Button>
          <Button type="info" @click="insert(' * ')" class="button">*</Button>
          <Button type="info" @click="insert(' / ')" class="button">/</Button><br/>
          <Button type="info" @click="insert('3')" class="button">3</Button>
          <Button type="info" @click="insert('2')" class="button">2</Button>
          <Button type="info" @click="insert('1')" class="button">1</Button>
          <Button type="info" @click="insert(' ( ')" class="button">(</Button>
          <Button type="info" @click="insert(' ) ')" class="button">)</Button><br/>
          <Button type="info" @click="insert('0')" class="button">0</Button>
          <Button type="info" @click="insert('00')" class="button">00</Button>
          <Button type="info" @click="insert('.')" class="button">.</Button>
          <Button type="info" @click="insert(' 大于 ')" class="button">&gt;</Button>
          <Button type="info" @click="insert(' 大于等于 ')" class="button">&gt;=</Button><br/>
          <Button type="info" @click="insert(' = ')" class="button">=</Button>
          <Button type="info" @click="insert(' 等于 ')" class="button">==</Button>
          <Button type="info" @click="insert(' 不等于 ')" class="button">!=</Button>
          <Button type="info" @click="insert(' 小于 ')" class="button">&lt;</Button>
          <Button type="info" @click="insert(' 小于等于 ')" class="button">&lt;=</Button><br/>
          <Button type="info" @click="insert('{')" class="button">{</Button>
          <Button type="info" @click="insert('}')" class="button">}</Button>
          <Button type="info" @click="insert(' 否则 ')" class="button">否则</Button>
          <Button type="info" @click="insert(' 或 ')" class="button">或</Button>
          <Button type="info" @click="insert(' 并且 ')" class="button">并且</Button>
          <br/>
          <Button type="info" @click="insert(' 如果 ')"  class="button">如果</Button>
          <Button type="info" @click="insert(' 否则如果 ')" style="width: 83px" class="button">否则如果</Button>
          <Button type="info" @click="insert(' 结果 ')"  style="width: 84px"  class="button">结果</Button>
        </i-col>
      </div>
      <div class="Header">{{$t('lang_payroll.payFormula.itemHead')}}</div>
      <div class="right" :style="{height:220 + 'px',width: 240 +'px'} ">
        <i-col class="meau-left">
          <span v-for="(item,index) in dataTree" :key="index" >
            <DropdownItem @click.native="insert(item.value)" style="color: #4495f1">{{item.title}}</DropdownItem>
            <!--<Menu :active-name="active" width="auto" @on-select="pageTo">-->
            <!--&lt;!&ndash;<MenuItem name="option">&ndash;&gt;-->
            <!--&lt;!&ndash;{{$t('lang_payroll.paySalSet.title')}}&ndash;&gt;-->
            <!--&lt;!&ndash;</MenuItem>&ndash;&gt;-->
            <!--&lt;!&ndash;<MenuItem name="content" >&ndash;&gt;-->
            <!--&lt;!&ndash;{{$t('lang_payroll.paySalSetItem.title')}}&ndash;&gt;-->
            <!--&lt;!&ndash;</MenuItem>&ndash;&gt;-->
            <!--</Menu>-->
          </span>
        </i-col>
      </div>
        <Row type="flex" style="padding-top: 5px;" justify="end">
            <Button type="ghost" @click="close" style="margin-left: 5px;">{{$t('button.cal')}}</Button>
            <Button type="primary" @click="save" style="margin-left: 5px;">{{$t('button.sav')}}</Button>
          <Button type="primary" @click="check" style="margin-left: 5px;">{{$t('button.cek')}}</Button>
        </Row>
      <!--<Button class="btn" type="primary" @click="close">取消</Button>-->
      <!--<Button class="btn" type="primary" @click="save">{{$t('button.sav')}}</Button>-->
      <!--<Button class="btn" type="primary" @click="save" >检查</Button>-->
    </div>
  </div>
</template>
<script>
//  import E from 'wangeditor'
  import { isSuccess, deepCopy } from '../../../lib/util'
  import { getDataLevelUserLoginSenior, getDataLevelUserLogin, getDataLevelUserLoginNew } from '../../../axios/axios'

//  let editor
  export default {
    data() {
      return {
        form: {
          payssiFormulacomment: '',
          payssiFormula: '',
        },
        rowId: '',
        dataTree: [
          {
            title: 'toFixed(2)------四舍五入',
            expand: true,
            value: ' toFixed() ',
          },
          {
            title: 'abs()------取绝对值',
            expand: true,
            value: ' abs() ',
          },
          {
            title: 'floor()------取整数部分',
            expand: true,
            value: ' floor() ',
          },
          {
            title: 'min(,)------取小',
            expand: true,
            value: ' min(,) ',
          },
          {
            title: 'max(,)------取大',
            expand: true,
            value: ' max(,) ',
          },
          {
            title: 'round------新四舍五入',
            expand: true,
            value: ' round ',
          },
        ],
        items: [],
        treeheight: 520,
        treeheight1: 350,
        treeheight2: 150,
        treeheight3: 270,
      }
    },
    components: {
    },
    props: {
      id: Number,
    },
    mounted() {
//      editor = new E('#editor')
//      editor.customConfig.onchange = function (html) {
//        alert(html)
//        document.getElementById('txt').innerHTML = html
//      }
//      editor.customConfig.menus = []
//      editor.create()
    },
    methods: {
      getData(id) {
        const t = this
        t.rowId = id
        getDataLevelUserLogin({
          _mt: 'paySalSetItem.getBySSid',
          funId: '1',
          id: t.$store.state.paySalSet.mainId,
          logType: '查询项目',
        }).then((res) => {
          //if (isSuccess(res, t)) {
            res={"stat":{"code":0,"stateList":[{"msg":"SUCCESS","code":0,"length":34826,"desc":"成功"}],"systime":1561620398243,"desc":"成功","cid":"a:18bb9c|t:153470|s:1561620398010"},"content":[{"value":[{"payssiDatasource":"01system","payssiCarrymodeDis":"四舍五入到分","payssiItem":"43","payssiItemtype":"00fixedproject","payssiItemName":"成本中心","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"FX08","updateBy":"1009","payssiCarrymode":"03sswrtofen","id":"46","payssiItemtypeName":"固定项目","payssiObversion":"1","payssiOrder":"1000","payssiDatasourceDis":"系统默认","payssiPaylistdisDis":"是","updateTime":"2018-07-27 16:41:24","payssiSsid":"1000","payssiFormula":"如果  [员工类型]  等于  [固定项目24] \n          结果  等于  [最后雇佣日期] \n 否则如果   [成本中心]   等于 '第二成本中心'\n          结果  等于  [试用截止日期]","payssiPaylistdis":"1","payssiFormulajs":"if  [FX03]  ==  [FX24]            res  ==  [FX06]   else if   [FX08]   == '第二成本中心'           res  ==  [FX05]","createBy":"1037","createTime":"2018-07-25 13:36:33"},{"payssiDatasource":"01system","payssiCarrymodeDis":"四舍五入到分","payssiItem":"45","payssiItemtype":"00fixedproject","payssiItemName":"薪资级别","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"FX10","updateBy":"1037","payssiCarrymode":"03sswrtofen","id":"45","payssiItemtypeName":"固定项目","payssiObversion":"1","payssiOrder":"1001","payssiDatasourceDis":"系统默认","payssiPaylistdisDis":"是","updateTime":"2018-07-27 13:37:37","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-25 13:36:24"},{"payssiDatasource":"01system","payssiCarrymodeDis":"四舍五入到分","payssiItem":"39","payssiItemtype":"00fixedproject","payssiItemName":"入职日期","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"FX04","updateBy":"1037","payssiCarrymode":"03sswrtofen","id":"47","payssiItemtypeName":"固定项目","payssiObversion":"1","payssiOrder":"1002","payssiDatasourceDis":"系统默认","payssiPaylistdisDis":"是","updateTime":"2018-07-30 13:24:00","payssiSsid":"1000","payssiFormula":"结果 = 6000","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-25 13:36:41"},{"payssiDatasource":"01system","payssiCarrymodeDis":"四舍五入到分","payssiItem":"47","payssiItemtype":"00fixedproject","payssiItemName":"差旅级别","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"FX11","updateBy":"1037","payssiCarrymode":"03sswrtofen","id":"57","payssiItemtypeName":"固定项目","payssiObversion":"1","payssiOrder":"1003","payssiDatasourceDis":"系统默认","payssiPaylistdisDis":"是","updateTime":"2018-11-20 15:09:06","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:36:56"},{"payssiDatasource":"02empperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"73","payssiItemtype":"01sysperiodic","payssiItemName":"基本工资","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP01","payssiCarrymode":"03sswrtofen","id":"58","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1004","payssiDatasourceDis":"员工周期性数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:38:23"},{"payssiDatasource":"05formula","payssiCarrymodeDis":"四舍五入到分","payssiItem":"75","payssiItemtype":"01sysperiodic","payssiItemName":"应发工资","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP02","updateBy":"1037","payssiCarrymode":"03sswrtofen","id":"59","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1005","payssiDatasourceDis":"公式运算","payssiPaylistdisDis":"是","updateTime":"2019-05-05 09:48:52","payssiSsid":"1000","payssiFormula":"结果 =  [基本工资]","payssiPaylistdis":"1","payssiFormulajs":"res =  [SP01]","createBy":"1037","createTime":"2018-07-27 13:38:47"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"76","payssiItemtype":"01sysperiodic","payssiItemName":"税前工资","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP03","payssiCarrymode":"03sswrtofen","id":"60","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1006","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:39:06"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"77","payssiItemtype":"01sysperiodic","payssiItemName":"免税额","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP04","payssiCarrymode":"03sswrtofen","id":"61","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1007","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:39:23"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"125","payssiItemtype":"02sysaperiodic","payssiItemName":"每月补助","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN02","payssiCarrymode":"03sswrtofen","id":"64","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1008","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:40:36"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"78","payssiItemtype":"01sysperiodic","payssiItemName":"计税工资","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP05","payssiCarrymode":"03sswrtofen","id":"62","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1009","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:39:41"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"124","payssiItemtype":"02sysaperiodic","payssiItemName":"目标奖金","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN01","payssiCarrymode":"03sswrtofen","id":"63","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1010","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:40:19"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"126","payssiItemtype":"02sysaperiodic","payssiItemName":"交通补助","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN03","payssiCarrymode":"03sswrtofen","id":"65","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1011","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:40:58"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"127","payssiItemtype":"02sysaperiodic","payssiItemName":"通讯补助","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN04","payssiCarrymode":"03sswrtofen","id":"66","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1012","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:41:26"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"128","payssiItemtype":"02sysaperiodic","payssiItemName":"住房补助","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN05","payssiCarrymode":"03sswrtofen","id":"67","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1013","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:41:41"},{"payssiDatasource":"02empperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"224","payssiItemtype":"03userperiodic","payssiItemName":"自定义周期项目01","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"UP01","payssiCarrymode":"03sswrtofen","id":"68","payssiItemtypeName":"用户定义周期性项目","payssiObversion":"1","payssiOrder":"1014","payssiDatasourceDis":"员工周期性数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:42:00"},{"payssiDatasource":"02empperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"225","payssiItemtype":"03userperiodic","payssiItemName":"自定义周期项目02","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"UP02","payssiCarrymode":"03sswrtofen","id":"69","payssiItemtypeName":"用户定义周期性项目","payssiObversion":"1","payssiOrder":"1015","payssiDatasourceDis":"员工周期性数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:42:35"},{"payssiDatasource":"02empperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"226","payssiItemtype":"03userperiodic","payssiItemName":"自定义周期项目03","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"UP03","payssiCarrymode":"03sswrtofen","id":"70","payssiItemtypeName":"用户定义周期性项目","payssiObversion":"1","payssiOrder":"1016","payssiDatasourceDis":"员工周期性数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:43:04"},{"payssiDatasource":"02empperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"227","payssiItemtype":"03userperiodic","payssiItemName":"自定义周期项目04","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"UP04","payssiCarrymode":"03sswrtofen","id":"71","payssiItemtypeName":"用户定义周期性项目","payssiObversion":"1","payssiOrder":"1017","payssiDatasourceDis":"员工周期性数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:43:18"},{"payssiDatasource":"02empperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"228","payssiItemtype":"03userperiodic","payssiItemName":"自定义周期项目05","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"UP05","payssiCarrymode":"03sswrtofen","id":"72","payssiItemtypeName":"用户定义周期性项目","payssiObversion":"1","payssiOrder":"1018","payssiDatasourceDis":"员工周期性数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:43:36"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"274","payssiItemtype":"04useraperiodic","payssiItemName":"自定义非周期项目01","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"UN01","payssiCarrymode":"03sswrtofen","id":"73","payssiItemtypeName":"用户定义非周期性项目","payssiObversion":"1","payssiOrder":"1019","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:43:52"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"275","payssiItemtype":"04useraperiodic","payssiItemName":"自定义非周期项目02","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"UN02","payssiCarrymode":"03sswrtofen","id":"74","payssiItemtypeName":"用户定义非周期性项目","payssiObversion":"1","payssiOrder":"1020","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-07-27 13:44:06"},{"payssiDatasource":"05formula","payssiCarrymodeDis":"四舍五入到分","payssiItem":"277","payssiFormulacomment":"","payssiItemtype":"04useraperiodic","payssiItemName":"自定义非周期项目04","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"UN04","updateBy":"1037","payssiCarrymode":"03sswrtofen","id":"76","payssiItemtypeName":"用户定义非周期性项目","payssiObversion":"1","payssiOrder":"1021","payssiDatasourceDis":"公式运算","payssiPaylistdisDis":"是","updateTime":"2019-04-29 13:53:51","payssiSsid":"1000","payssiFormula":"结果  =  [基本工资]","payssiPaylistdis":"1","payssiFormulajs":"res  =  [SP01]","createBy":"1037","createTime":"2018-07-27 13:44:51"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"323","payssiItemtype":"04useraperiodic","payssiItemName":"自定义非周期项目50","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"UN50","updateBy":"1009","payssiCarrymode":"03sswrtofen","id":"105","payssiItemtypeName":"用户定义非周期性项目","payssiObversion":"1","payssiOrder":"1022","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","updateTime":"2018-07-30 16:30:37","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1009","createTime":"2018-07-30 16:27:48"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"79","payssiItemtype":"01sysperiodic","payssiItemName":"个税","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP06","payssiCarrymode":"03sswrtofen","id":"180","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1023","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:18"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"80","payssiItemtype":"01sysperiodic","payssiItemName":"税后调整合计","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP07","payssiCarrymode":"03sswrtofen","id":"181","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1024","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:20"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"81","payssiItemtype":"01sysperiodic","payssiItemName":"实发工资","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP08","payssiCarrymode":"03sswrtofen","id":"182","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1025","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:25"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"82","payssiItemtype":"01sysperiodic","payssiItemName":"养老企业","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP09","payssiCarrymode":"03sswrtofen","id":"183","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1026","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:26"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"83","payssiItemtype":"01sysperiodic","payssiItemName":"养老个人","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP10","payssiCarrymode":"03sswrtofen","id":"184","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1027","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:27"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"84","payssiItemtype":"01sysperiodic","payssiItemName":"医疗企业","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP11","payssiCarrymode":"03sswrtofen","id":"185","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1028","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:28"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"85","payssiItemtype":"01sysperiodic","payssiItemName":"医疗个人","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP12","payssiCarrymode":"03sswrtofen","id":"186","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1029","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:28"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"86","payssiItemtype":"01sysperiodic","payssiItemName":"失业企业","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP13","updateBy":"1037","payssiCarrymode":"03sswrtofen","id":"187","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1030","payssiDatasourceDis":"系统自动计","payssiPaylistdisDis":"æ¯","updateTime":"2018-08-21 13:12:33","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:29"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"åèäºå¥å°å","payssiItem":"87","payssiItemtype":"01sysperiodic","payssiItemName":"å¤±ä¸ä¸ªäºº","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"æ¯","payssiItemCode":"SP14","payssiCarrymode":"03sswrtofen","id":"188","payssiItemtypeName":"ç³»ç»å¨ææ§é¡¹ç®","payssiObversion":"1","payssiOrder":"1031","payssiDatasourceDis":"ç³»ç»èªå¨è®¡ç®","payssiPaylistdisDis":"æ¯","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:30"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"åèäºå¥å°å","payssiItem":"88","payssiItemtype":"01sysperiodic","payssiItemName":"çè²(ä¼ä¸)","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"æ¯","payssiItemCode":"SP15","payssiCarrymode":"03sswrtofen","id":"189","payssiItemtypeName":"ç³»ç»å¨ææ§é¡¹ç®","payssiObversion":"1","payssiOrder":"1032","payssiDatasourceDis":"ç³»ç»èªå¨è®¡ç®","payssiPaylistdisDis":"æ¯","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:31"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"89","payssiItemtype":"01sysperiodic","payssiItemName":"工伤(企业)","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP16","payssiCarrymode":"03sswrtofen","id":"190","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1033","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:32"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"90","payssiItemtype":"01sysperiodic","payssiItemName":"公积金企业","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP17","payssiCarrymode":"03sswrtofen","id":"191","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1034","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:33"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"91","payssiItemtype":"01sysperiodic","payssiItemName":"公积金个人","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP18","payssiCarrymode":"03sswrtofen","id":"192","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1035","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:34"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"92","payssiItemtype":"01sysperiodic","payssiItemName":"补充公积金企业","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP19","payssiCarrymode":"03sswrtofen","id":"193","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1036","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:34"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"93","payssiItemtype":"01sysperiodic","payssiItemName":"补充公积金个人","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP20","payssiCarrymode":"03sswrtofen","id":"194","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1037","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:35"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"94","payssiItemtype":"01sysperiodic","payssiItemName":"大病企业","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP21","payssiCarrymode":"03sswrtofen","id":"195","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1038","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:36"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"95","payssiItemtype":"01sysperiodic","payssiItemName":"大病个人","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP22","payssiCarrymode":"03sswrtofen","id":"196","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1039","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:37"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"96","payssiItemtype":"01sysperiodic","payssiItemName":"社保合计个人","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP23","payssiCarrymode":"03sswrtofen","id":"197","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1040","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:38"},{"payssiDatasource":"03autocalc","payssiCarrymodeDis":"四舍五入到分","payssiItem":"97","payssiItemtype":"01sysperiodic","payssiItemName":"公积金合计个人","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP24","payssiCarrymode":"03sswrtofen","id":"198","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1041","payssiDatasourceDis":"系统自动计算","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-03 19:34:40"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"129","payssiItemtype":"02sysaperiodic","payssiItemName":"教育补助","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN06","payssiCarrymode":"03sswrtofen","id":"199","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1042","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:43"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"130","payssiItemtype":"02sysaperiodic","payssiItemName":"培训补助","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN07","payssiCarrymode":"03sswrtofen","id":"200","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1043","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:44"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"131","payssiItemtype":"02sysaperiodic","payssiItemName":"其他补助","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN08","payssiCarrymode":"03sswrtofen","id":"201","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1044","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:45"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"132","payssiItemtype":"02sysaperiodic","payssiItemName":"月度奖金","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN09","payssiCarrymode":"03sswrtofen","id":"202","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1045","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:48"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"133","payssiItemtype":"02sysaperiodic","payssiItemName":"考勤奖励","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN10","payssiCarrymode":"03sswrtofen","id":"203","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1046","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:49"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"134","payssiItemtype":"02sysaperiodic","payssiItemName":"考勤扣款","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN11","payssiCarrymode":"03sswrtofen","id":"204","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1047","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:50"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"135","payssiItemtype":"02sysaperiodic","payssiItemName":"其他奖励","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN12","payssiCarrymode":"03sswrtofen","id":"205","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1048","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:51"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"136","payssiItemtype":"02sysaperiodic","payssiItemName":"其他扣款","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN13","payssiCarrymode":"03sswrtofen","id":"206","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1049","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:52"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"137","payssiItemtype":"02sysaperiodic","payssiItemName":"税后调整1","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN14","updateBy":"1037","payssiCarrymode":"03sswrtofen","id":"207","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1050","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","updateTime":"2018-10-19 16:56:31","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:53"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"138","payssiItemtype":"02sysaperiodic","payssiItemName":"税后调整2","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN15","payssiCarrymode":"03sswrtofen","id":"208","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1051","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:54"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"139","payssiItemtype":"02sysaperiodic","payssiItemName":"税后调整3","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN16","payssiCarrymode":"03sswrtofen","id":"209","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1052","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:55"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"140","payssiItemtype":"02sysaperiodic","payssiItemName":"税后调整4","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN17","payssiCarrymode":"03sswrtofen","id":"210","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1053","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:56"},{"payssiDatasource":"04empnoperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"141","payssiItemtype":"02sysaperiodic","payssiItemName":"税后调整5","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SN18","payssiCarrymode":"03sswrtofen","id":"211","payssiItemtypeName":"系统非周期性项目","payssiObversion":"1","payssiOrder":"1054","payssiDatasourceDis":"月度非周期数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1037","createTime":"2018-08-07 19:21:57"},{"payssiDatasource":"02empperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"104","payssiItemtype":"01sysperiodic","payssiItemName":"系统周期性项目31","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP31","payssiCarrymode":"03sswrtofen","id":"212","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1055","payssiDatasourceDis":"员工周期性数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1007","createTime":"2018-09-07 17:23:25"},{"payssiDatasource":"02empperiod","payssiCarrymodeDis":"四舍五入到分","payssiItem":"105","payssiItemtype":"01sysperiodic","payssiItemName":"系统周期性项目32","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP32","payssiCarrymode":"03sswrtofen","id":"213","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1056","payssiDatasourceDis":"员工周期性数据","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1007","createTime":"2018-09-07 17:23:27"},{"payssiDatasource":"01system","payssiCarrymodeDis":"四舍五入到分","payssiItem":"36","payssiItemtype":"00fixedproject","payssiItemName":"Last Name","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"FX01","payssiCarrymode":"03sswrtofen","id":"214","payssiItemtypeName":"固定项目","payssiObversion":"1","payssiOrder":"1057","payssiDatasourceDis":"系统默认","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1007","createTime":"2018-09-07 17:23:37"},{"payssiDatasource":"01system","payssiCarrymodeDis":"四舍五入到分","payssiItem":"37","payssiItemtype":"00fixedproject","payssiItemName":"First Name","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"FX02","payssiCarrymode":"03sswrtofen","id":"215","payssiItemtypeName":"固定项目","payssiObversion":"1","payssiOrder":"1058","payssiDatasourceDis":"系统默认","payssiPaylistdisDis":"是","payssiSsid":"1000","payssiFormula":"","payssiPaylistdis":"1","createBy":"1007","createTime":"2018-09-07 17:23:40"}]}]}
            t.items = res.content[0].value
          //}
        }).catch(() => {
          this.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
        const params = {
          _mt: 'paySalSetItem.getById',
          id: id,
          logType: '查询信息',
        }
        getDataLevelUserLogin(params).then((res) => {
          //if (isSuccess(res, t)) {
            res={"stat":{"code":0,"stateList":[{"msg":"SUCCESS","code":0,"length":669,"desc":"成功"}],"systime":1561620398142,"desc":"成功","cid":"a:18bb9c|t:153481|s:1561620398049"},"content":[{"payssiDatasource":"05formula","payssiCarrymodeDis":"四舍五入到分","payssiItem":"75","payssiItemtype":"01sysperiodic","payssiItemName":"应发工资","lcoalCurrency":"1000","deleteFlag":"0","payssiObversionDis":"是","payssiItemCode":"SP02","updateBy":"1037","payssiCarrymode":"03sswrtofen","id":"59","payssiItemtypeName":"系统周期性项目","payssiObversion":"1","payssiOrder":"1005","payssiDatasourceDis":"公式运算","payssiPaylistdisDis":"是","updateTime":"2019-05-05 09:48:52","payssiSsid":"1000","payssiFormula":"结果 =  [基本工资]","payssiPaylistdis":"1","payssiFormulajs":"res =  [SP01]","createBy":"1037","createTime":"2018-07-27 13:38:47"}]}
            t.form = res.content[0]
          //}
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      insert(value) {
        this.form.payssiFormula = this.form.payssiFormula + value
       // document.getElementById('content').value = document.getElementById('content').value + value
      },
      close() {
        this.$emit('hideMsg')
        this.form = { payssiFormulacomment: '', payssiFormula: '' }
        this.rowId = ''
      },
      save() {
        const t = this
        const params = deepCopy(t.form)
        params._mt = 'paySalSetItem.addOrUpd'
        params.id = t.rowId
        params.logType = this.$t('button.upd')
        params.isValid = 'yes'
        getDataLevelUserLoginNew(params).then((res) => {
          if (isSuccess(res, t)) {
            t.close()
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: this.$t('reminder.updsuccess'),
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      check() {
        const t = this
        const params = deepCopy(t.form)
        params._mt = 'paySalSetItem.checkJs'
        params.id = t.rowId
        params.logType = this.$t('button.upd')
        params.isValid = 'yes'
        getDataLevelUserLoginNew(params).then((res) => {
          if (res.data.content[0].value === 1) {
            t.$Modal.success({
              title: this.$t('reminder.suc'),
              content: '校验通过!',
            })
          } else {
            t.$Modal.error({
              title: this.$t('reminder.err'),
              content: '公式异常!请重新检查!',
            })
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import "../../../sass/updateAndAdd.scss";
  .colTree{
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
    width: 220px;
  }
  .mula{
    /*min-height: 600px;*/
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    padding: 0 20px 0 0;
    width: 500px;
  }
  .right{
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
  }
  .mulabody{
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
  }
  .divtree{
    padding-top: 5px;
    padding-left: 10px;
    padding-right: 10px;
    /*height: 750px;*/
    overflow: auto;
    border: 1px #efefef solid;
  }

  .cover .box{
    padding: 50px 20px 5px 20px;
    width: 1000px;
  }
  .button {
    color: #000000;
    width: 40px;
    margin-top: 5px;
    padding-left: 1%;
    padding-right: 1%;
    background-color: rgba(213, 243, 255, 0.56);
    border:none;
  }
  .btn{
    position: relative;
    bottom: 20px;
    right: 36px;
  }
</style>
