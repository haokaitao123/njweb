<template>
  <div class="table">
    <Row>
      <Col span="4" >
        <card class="margin-right-10">
          <Tree :data="data2" show-checkbox></Tree>
        </card>
      </Col>
      <Col span="20">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;标题
        </p>
        <Row>
          <Input placeholder="请输入姓名搜搜..." style="width: 200px" />
          <span style="margin: 0;"><Button type="primary" icon="search">搜索</Button></span>
          <Button type="primary" @click="open">新增</Button>
          <Button type="error" >删除</Button>
        </Row>
        <row class="table-form">
          <Table height="500" size="small" border ref="selection" :columns="columns4" :data="data1"></Table>
        </row>
        <Row style="display: flex">          <Page :total="40" size="small" show-elevator show-sizer:page-size-opts = "[10, 20, 50, 100]" ></Page><Button type="ghost" size="small" shape="circle" icon="refresh" style="margin-left: 20px;display: inline-block;" @click="getData(1)"></Button></Row>
      </card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import dia from './dialog'

export default{
  data() {
    return {
      value: '',
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: 'Name',
          key: 'name',
        },
        {
          title: 'Age',
          key: 'age',
        },
        {
          title: 'Age',
          key: 'age',
        },
        {
          title: 'Age',
          key: 'age',
        },
        {
          title: 'Age',
          key: 'age',
        },
        {
          title: 'Address',
          key: 'address',
        },
        {
          title: 'Action',
          key: 'action',
          width: 80,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                },
                style: {

                },
                on: {
                  click: () => {
                    this.show(params.index)
                  },
                },
              }, this.$t('button.upd')),
            ])
          },
        },
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03',
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01',
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02',
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04',
        },
      ],
      data2: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1',
                },
                {
                  title: 'leaf 1-1-2',
                },
              ],
            },
            {
              title: 'parent 1-2',
              expand: true,
              children: [
                {
                  title: 'leaf 1-2-1',
                },
                {
                  title: 'leaf 1-2-1',
                },
              ],
            },
          ],
        },
      ],
    }
  },
  methods: {
    open() {
      this.$Modal.confirm({
        width: 800,
        render: (h) => {
          return h(dia)
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.table-form{
  margin: 10px 0;
}
  .margin-right-10{
    margin-right: 10px;
  }
</style>
