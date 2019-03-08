<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;{{title}}
        </p>
        <commonSingleTable @changetitle="changetitle"></commonSingleTable>
      </card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { getDataLevelUserLogin } from '../../../axios/axios'
  import { isSuccess } from '../../../lib/util'
  import commonSingleTable from './commonSingleTable'

  export default{
    data() {
      return {
        title: '',
      }
    },
    components: {
      commonSingleTable,
    },
    methods: {
      changetitle(value) {
        this.title = value
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }
  .btns{
    margin-right: 5px;
  }
</style>
