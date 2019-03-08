<template>
  <div>
    <div class="select_date">
      <el-date-picker v-model="startDate" type="month" placeholder="选择开始月" class="start_date"></el-date-picker>
      <el-date-picker v-model="endDate" type="month" placeholder="选择结束月" class="end_date"></el-date-picker>
      <span class="date_query" @click="queryData">查询</span>
    </div>
    <ul class="issue_ul">
      <li class="issue_li" v-for="item in issueList">
        <span class="issue_href" @click="toDetailPage(item)">明细</span>
        <ul>
          <li>
            <span class="issue_date">{{item.period}}</span>
            <span style="color:#F24E42">{{item.state}}</span>
          </li>
          <li>
            <span class="issue_left">应发工资：</span>
            <span>{{item.pacemYfgz}}</span>
          </li>
          <li><span class="issue_left">免税额:</span>
            <span>{{item.pacemMse}}</span>
          </li>
          <li>
            <span class="issue_left">税前工资:</span>
            <span>{{item.pacemJsgz}}</span>
          </li>
          <li>
            <span class="issue_left">实发工资：</span>
            <span>{{item.pacemSfgz}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div :class="{errorMeg:openSimple}">
      <error-tip :message="errorInfo" @closeSimpleDialog="closeSimpleDialog"></error-tip>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {isSuccess} from '@/lib/util'
  import {DatePicker} from 'element-ui'
  import {getDataLevelUserLogin} from '@/axios/axios'
  import errorInfo from "@/components/errorInfo"

  Vue.use(DatePicker)

  export default {
    data() {
      return {
        startDate: '',
        endDate: '',
        errorInfo: '',
        openSimple: true,
        issueList: []
      }
    },
    methods: {
      getQueryIssueData() {
        const t = this;
        t.startDate.getTime()
        let params = {
          _mt: "wxSalaryBase.getByPeriod",
          companyId: pubsource.companyId,
          userId: localStorage.getItem('bus_userid'),
          sdate: t.formater(t.startDate),
          edate: t.formater(t.endDate),
          busEmpid: localStorage.getItem('bus_empid'),
          busEmpGid: localStorage.getItem('bus_empGid'),
          busEmpWorkno: localStorage.getItem('bus_empWorkno')
        };
        getDataLevelUserLogin(params).then((res) => {
          if (isSuccess(res, t)) {
            let data = res.data.content[0].value;
            t.issueList = data;
          }
        }).catch((res) => {
          t.dialogMsg = res.data.stat.stateList[0].desc
        })
      },
      queryData() {
        if (!this.startDate) {
          this.errorInfo = "请输入开始月份";
          this.openSimpleDialog();
          return;
        }
        if (!this.endDate) {
          this.errorInfo = "请输入结束月份";
          this.openSimpleDialog();
          return;
        }
        this.getQueryIssueData();
      },
      formater(date) {
        let shoudDate = "";
        let dataStr = date.getFullYear() + "-" + (date.getMonth() + 1);
        if (dataStr.split("-")[1].length == 1) {
          shoudDate = dataStr.split("-").join("-0");
        } else {
          shoudDate = dataStr;
        }
        return shoudDate;
      },
      toDetailPage(item) {
        console.log(item)
        console.log(111)
        this.$store.state.detail = [];
        this.$store.state.detail.push(item);

//        this.$router.push({
//          path: "/mains/salaryDetail"
//        })
      },
      openSimpleDialog: function () {
        this.openSimple = false;
      },
      closeSimpleDialog: function () {
        this.openSimple = true;
      },
    },
    components: {
      errorTip: errorInfo,
    }
  }
</script>

<style type="text/less" lang="less" scoped>
  .select_date {
    height: 100px;
    line-height: 100px;
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    position: relative;
    width: 100%;
  }

  .start_date {
    margin-left: 20px;
  }

  .end_date {
    margin-left: 20px;
  }

  .date_query {
    color: #3399FE;
    font-size: 30px;
    position: absolute;
    right: 20px;
  }

  .issue_ul {
    color: #666666;
    background-color: #fff;
    list-style: none;
    .issue_li {
      padding-top: 30px;
      padding-left: 40px;
      font-size: 28px;
      height: 360px;
      .issue_href {
        float: right;
        margin-right: 40px;
        margin-top: 16px;
        color: #FF850E;
        display: inline-block;
        border: 2px solid #FF850E;
        width: 100px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        text-align: center;
      }
      li {
        height: 60px;
        line-height: 60px;
      }
      .issue_date {
        display: inline-block;
        width: 16%;
        color: #3297FF;
      }
      .issue_left {
        display: inline-block;
        width: 26%;
      }
    }
  }

  .tip {
    width: 80%;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
  }

  .errorMeg {
    display: none;
  }
</style>
