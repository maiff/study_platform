<template>
  <el-header style="text-align: right; font-size: 12px">
    <el-dropdown>
      <i class="el-icon-setting" style="margin-right: 15px"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item ><div @click="logout()">退出</div></el-dropdown-item>
       
      </el-dropdown-menu>
    </el-dropdown>
    <span>{{name}}</span>
  </el-header>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  name: 'Head',
  props: {
    
  },
  computed:{
    name(){
      return Cookie.get('user_name')
    }
  },
  methods: {
   logout(){
     console.log('out')
     Cookie.remove('studentid');
     location.reload()
   } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
