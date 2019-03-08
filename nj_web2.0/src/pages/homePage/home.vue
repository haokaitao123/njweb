<template>
  <div>
    <Row>
      <toDoList v-if="roleType==='3user' || roleType==='3user-hrbp'"></toDoList>
      <emailCount v-if="roleType==='1admin'"></emailCount>
      <quickMove :roleType="roleType" height="height" v-if="roleType==='0root'"></quickMove>
      <calendarList :roleType="roleType" ></calendarList>
      <quickMove :roleType="roleType" height="short"  v-if="roleType==='3user'||roleType==='1admin' || roleType==='3user-hrbp'"></quickMove>
      <message v-if="roleType==='1admin'"></message>
      <mailMsg :roleType="roleType" v-if="roleType==='3user'||roleType==='1admin' || roleType==='3user-hrbp'"></mailMsg>
      <employeeId v-if="roleType==='1admin'"></employeeId>
      <question v-if="roleType==='3user' || roleType==='3user-hrbp'"></question>
      <employee v-if="roleType==='3user' || roleType==='3user-hrbp'"></employee>
      <bookstore v-if="roleType==='3user' || roleType==='3user-hrbp'"></bookstore>
      <tools v-if="roleType==='3user' || roleType==='3user-hrbp'"></tools>
      <userManage v-if="roleType==='0root'"></userManage>
      <autoCount v-if="roleType==='1admin'"></autoCount>
      <autoZxCount v-if="roleType==='1admin'"></autoZxCount>
    </Row>
  </div>
</template>
<script>
  import calendarList from './calendarList'
  import toDoList from './toDoList'
  import quickMove from './quickMove'
  import mailMsg from './mailMsg'
  import question from './question'
  import employee from './employee'
  import bookstore from './bookstore'
  import tools from './tools'
  import userManage from './userManage'
  import emailCount from './emailCount'
  import employeeId from './employeeId'
  import message from './message'
  import autoCount from './autoCount'
  import autoZxCount from './autoZxCount'

  export default {
    data() {
      return {
      }
    },
    components: {
      calendarList,
      toDoList,
      quickMove,
      mailMsg,
      question,
      employee,
      bookstore,
      tools,
      userManage,
      emailCount,
      employeeId,
      autoCount,
      message,
      autoZxCount,
    },
    computed: {
      roleType() {
        return this.$store.state.user.roleType
      },
    },
  }
</script>
<style lang="scss" scoped>
  .col{
    padding: 0 10px 10px 0;
  }
</style>
