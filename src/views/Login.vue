<template>
  <div class="basic">
    <div style="display: flex;justify-content: center;margin-top:50px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>登  录</span>
        </div>
        <el-form  enctype="multipart/form-data">
          <el-form-item label="输入注册手机号或邮箱" prop="username">
            <br>
            <el-input
                show-word-limit
                style="width: 100%; float: right"
              >
            </el-input>
          </el-form-item>

          <el-form-item label="输入密码" prop="password">
            <br>
            <el-input
                type="password"
                show-word-limit
                style="width: 100%; float: right"
                @keydown.enter.native="doLogin"
              >
            </el-input>
          </el-form-item>

          <br>
          <el-form-item>
            <el-button type="primary" @click="doLogin" style="width: 100%">登录</el-button>
            <tr><el-link type="primary" @click="toRegister" style="float: left">没有账号？请先注册</el-link></tr>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        toRegister(){
            this.$router.push({path:"/Register"})
        }
    }
}
</script>

<style>
  .basic{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: whitesmoke;
  }
</style>