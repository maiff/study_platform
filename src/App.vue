<template>
  <el-container>
    <router-view></router-view>
  </el-container>
    <!-- <img src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- </div> -->
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.el-main {
  padding: 20px 20px 0 20px;
}
.el-footer {
  border-top: #ddd solid 1px;
  color: #333;
  text-align: center;
  line-height: 60px;
}
body > .el-container {
  min-height: 100vh;
}
</style>
