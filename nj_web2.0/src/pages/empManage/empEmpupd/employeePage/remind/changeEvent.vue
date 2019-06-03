<template>
  <div class="new">
    <Form :model="form" label-position="right" :label-width="100">
      <FormItem label="时间">
        <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" style="width: 300px"></DatePicker>
      </FormItem>
      <FormItem label="起止时间">
        <Row>
          <Col span='11'>
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="whidth: 100%"></DatePicker>
          </Col>
          <Col span='2'>
          <hr style="width: 80%; margin-top: 15px">
          </Col>
          <Col span='11'>
          <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束时间" style="whidth: 100%"></DatePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="提醒">
        <Row>
          <Col span="2"> 提前
          </Col>
          <Col span="5">
          <InputNumber :max="10" :min="1" v-model="form.num"></InputNumber>
          </Col>
          <Col span="5" offset="1">
          <Select v-model="form.select">
            <Option value="分钟">分钟</Option>
            <Option value="小时">小时</Option>
            <Option value="天">天</Option>
          </Select>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="添加成员">
        <!-- <Row> -->
        <!-- <Col span="2"> -->
        <Button type="ghost" shape="circle">张三</Button>
        <Button type="ghost" shape="circle" icon="plus"></Button>
        <!-- </Col> -->
        <!-- </Row> -->
      </FormItem>
      <FormItem label="地点">
        <Input v-model="form.place"></Input>
      </FormItem>
      <FormItem label="描述和附件">
        <Input v-model="form.dis" style="margin-bottom: 10px"></Input>
        <Upload action="">
          <Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
          <div></div>
        </Upload>
      </FormItem>
      <FormItem label="">
        <a href="javascript:;" @click="newTodo">重复</a>
      </FormItem>
    </Form>
    <el-dialog title="重复" width='600px' :visible.sync="updateOrAdd" append-to-body>
      <Form :model="form" label-position="right" :label-width="100">
        <FormItem label="重复类型">
          <Select v-model="form.select" style="width:150px;">
            <Option value="分钟">分钟</Option>
            <Option value="小时">小时</Option>
            <Option value="天">天</Option>
          </Select>
        </FormItem>
        <FormItem label="重复频率">
          <Row>
            <Col span='11'>
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="whidth: 100%"></DatePicker>
            </Col>
            <Col span='2'>
            <hr style="width: 80%; margin-top: 15px">
            </Col>
            <Col span='11'>
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="结束时间" style="whidth: 100%"></DatePicker>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="结束日期">
          <Select v-model="form.select" style="width:150px;">
            <Option value="分钟">分钟</Option>
            <Option value="小时">小时</Option>
            <Option value="天">天</Option>
          </Select>
        </FormItem>
        <FormItem label="结果">
          <!-- <Button type="ghost" shape="circle">张三</Button> -->
          <Button type="ghost" shape="circle" icon="plus"></Button>
        </FormItem>
      </Form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: '',
          select: '',
          place: '',
          dis: '',
          num: 15,
        },
        updateOrAdd: false,
      }
    },
    methods: {
      newTodo() {
        this.updateOrAdd = true
      },
    },
  }

</script>
<style scoped lang="scss">
  .new {
    padding: 0 20px;
  }

</style>
