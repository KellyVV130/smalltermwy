<template>
  <div class="basic">
    <div style="display: flex;justify-content: center;margin-top:50px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>注  册</span>
        </div>
        <el-form ref="infoForm" :model="user" :rules="rules"  :validate-on-rule-change="true">
          <el-form-item label="输入手机号" prop="phonenumber">
            <br>
            <el-input
                type="tel"
                show-word-limit
                style="width: 100%; float: right"
              >
            </el-input>
          </el-form-item>

          <el-form-item label="输入邮箱" prop="email">
            <br>
            <el-input
                type="email"
                show-word-limit
                style="width: 100%; float: right"
              >
            </el-input>
          </el-form-item>

          <el-form-item label="输入密码" prop="password1">
            <br>
            <el-input
                type="password"
                maxlength="20"
                show-word-limit
                style="width: 100%; float: right"
              >
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width: 100%"  @click="doRegister">注册</el-button>
            <tr><el-link type="primary" @click="toLogin" style="float: left">已有账号？点我登录</el-link></tr>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
    methods:{
        toLogin(){
            this.$router.push({path:"/Login"})
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