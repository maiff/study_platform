<template>
  <div class="l-c">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container" status-icon>
      <h3 class="title">XXX 学习平台</h3>
      <!-- <el-radio v-model="radio" label="0">User</el-radio>
      <el-radio v-model="radio" label="1">Writer</el-radio> -->
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input  v-model="ruleForm2.pass" auto-complete="off" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submit" :loading="logining">登录</el-button>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: 'admin',
        pass: '',
      },
      rules2: {
        account: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          //{ validator: validaePass }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //{ validator: validaePass2 }
        ]
      }
    };
  },
  methods: {
    submit(){
      this.$router.push('/home')
    },
  },
  computed: {
    radio: {
      get(){
        return this.$store.state.isWriter
      },
      set(value) {
        this.$store.commit('toggleWriter', value)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .l-c{
    width: 100%;
    position: relative;
    background: url('http://area.sinaapp.com/bingImg/');
    background-position: 0 0; 
    .login-container {
      /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      position: absolute;
      top:43%;
      left:50%;
      transform: translate(-50%,-50%);
      width: 350px;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
      .title {
        margin: 0px auto 10px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
      .el-radio {
        margin-bottom: 10px;
      }
    }
  }
</style>
