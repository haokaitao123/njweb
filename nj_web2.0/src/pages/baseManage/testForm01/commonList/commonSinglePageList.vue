<template>
  <div class="table">
    <Row>
      <Col span="24">
      <card>
        <p slot="title">
          <Icon type="mouse"></Icon>
          &nbsp;测试表单01
        </p>
        <commonSingleTable></commonSingleTable>
      </card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import { getDataLevelUserLogin } from '../../../../axios/axios'
  import { isSuccess } from '../../../../lib/util'
  import commonSingleTable from './commonSingleTable'

  export default{
    components: {
      commonSingleTable,
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
