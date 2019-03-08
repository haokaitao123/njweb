<template>
  <!-- 选择调查分类id	页面 -->
  <div class="cover">
    <div class="box" style="min-width: 900px;">
      <div class="title">
        <div class="title-text">
          <Icon type="mouse" size="16" style="margin-right: 10px;"></Icon>
          {{$t('lang_role.suvadmin.surveyid')}}
        </div>
        <Button type="text" @click="closeClass">
          <Icon type="close-round" size="16"></Icon>
        </Button>
      </div>
      <Row>
        <Col span="24">
        <card>
          <!-- <Row>
              <span>分类description英文：</span>
              <Input v-model="desEnglish" placeholder="请输入分类description英文"  style="width:200px;"></Input>
              <span style="margin-left:20px;">分类order：</span>
              <Input v-model="classOrder" placeholder="请输入分类order"  style="width:200px;"></Input>
              <span style="margin-left: 20px;"><Button type="primary" icon="search" @click="getData">{{$t('button.ser')}}</Button></span>
          </Row> -->
          <row class="table-form" style="margin: 0; min-height: 470px;">
            <Table :columns="columns" :data="dataInfo" height="400" @on-row-dblclick="getClass"></Table>
          </row>
          <Row style="display: flex">
            <Page :total="total" size="small" show-elevator show-sizer placement="top" @on-page-size-change="sizeChange"
                  @on-change="pageChange" :page-size-opts="[10, 20, 50, 100]"></Page>
            <Button type="ghost" size="small" shape="circle" icon="refresh"
                    style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button>
          </Row>
        </card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import {getDataLevelUserLoginNew, getDataLevelUserLogin, getDataLevelUserLogin2} from '../../axios/axios'
  import {isSuccess, deepCopy} from '../../lib/util'

  export default {
    data() {
      return {
        total: NaN, // 总页数,
        sort: 'id',
        order: 'asc',
        rows: '10',
        page: '1',
        desEnglish: '',         //  分类description英文
        classOrder: '',         //  分类order
        columns: [
          {
            title: this.$t('lang_role.suvadmin.platCatOrder'),
            key: 'platQusOrder',
            align: 'center',
          },
          {
            title: this.$t('lang_role.suvadmin.platQusDesccn'),
            key: 'platQusDesccn',
            align: 'center',
          },
        ],
        dataInfo: [],
      }
    },
    props: {
      suvid: String,
      queMes: Object,
    },
    components: {},
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        const t = this
        const data = {
          _mt: 'platSurveyquestion.getPage',
          sort: t.sort,
          order: t.order,
          rows: t.rows,
          page: t.page,
          logType: '查询1',
          platQusSuvid: t.suvid,
        }
        for (const dat in data) {
          if (data[dat] === '') {
            delete data[dat]
          }
        }
        getDataLevelUserLoginNew(data).then((res) => {
          if (isSuccess(res, t)) {
            t.dataInfo = res.data.content[0].rows
            t.total = res.data.content[0].records
          }
        }).catch(() => {
          t.$Modal.error({
            title: this.$t('reminder.err'),
            content: this.$t('reminder.errormessage'),
          })
        })
      },
      closeClass() {
        this.$emit('closeClass')
      },
      // 分页
      sizeChange(size) {
        const t = this
        t.rows = size
        t.getData()
      },
      pageChange(page) {
        const t = this
        t.page = page
        t.getData()
      },  // 分页------------------------------------
      getClass(selction) {
        // console.log(selction)
        const t = this
        t.$emit("getMes", selction)
        t.closeClass()
      },
    },
  }
</script>

<style lang="scss" scoped="">
  @import "../../sass/updateAndAdd";

  .content {
    padding: 30px 10px 20px 10px;
  }

  .margin20 {
    margin-right: 5px;
  }
</style>
