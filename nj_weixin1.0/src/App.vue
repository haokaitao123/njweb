<template>
  <div id="app">
    <!--img src="./assets/logo.png"-->
    <!--<keep-alive>-->
      <router-view/>
    <!--</keep-alive>-->
  </div>
</template>

<script>
export default {
  name: 'App',

}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
#app {
  position: relative;
  height: 100%;
}
  html,body{
    height:100%;
  }
  h1{
    margin: 0;
  }
  ul li{
    list-style: none;
  }
</style>
