<template>
  <div class="basic">
    <div style="display: flex;justify-content: center;margin-top:50px">
      <el-card style="width: 400px" shadow="hover">
        <div slot="header" class="clearfix">
          <span style="margin-left:45%">登  录</span>
        </div>
        <el-form  ref="infoForm" :model="user" :rules="rules" enctype="multipart/form-data" status-icon="true">
          <el-form-item label="用户名" prop="username">
            <br>
            <el-input
                v-model="user.username"
                show-word-limit
                style="width: 100%; float: right"
                id="name"
              >
            </el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <br>
            <el-input
                type="password"
                show-word-limit
                v-model="user.password"
                style="width: 100%; float: right"
                @keydown.enter.native="doLogin"
              >
            </el-input>
          </el-form-item>

          <br>
          <el-form-item>
            <el-button type="primary" @click="doLogin" style="width: 100%">登录</el-button>
            <tr><el-link type="primary" @click="toRegister" style="float: left" :underline="false">没有账号？请先注册</el-link></tr>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import {postUser,getUserInfo} from '../api/api'
export default {
  data (){
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    doLogin () {
      this.$refs.infoForm.validate((valid) => {
        if(valid){
          let _this=this
          postUser(_this.user.username,_this.user.password).then(response => {
            if(response.status===200){
              console.log(response)
              localStorage.token = response.data.token
              localStorage.userId = response.data.user_id
              getUserInfo(localStorage.userId).then(response => {
                if(response.status===200){
                  localStorage.head=response.data.head
                  this.$addStorageEvent('head',this.head)
                }
              })
              this.$message({
                message: '登录成功',
                type: 'info'
              })
              this.$router.push({name:'history'})
            } else {
              console.log(response)
            }
          }).catch(error => {
            if(error.response.status===400){
              this.$message({
                message: '用户名或密码错误',
                type: 'error'
              })
            }
          })
        }
      })
      
    },
    toRegister(){
      this.$router.push({path:"/Register"})
    },
  },
  mounted(){
    let inputElement=document.getElementById('name')
    inputElement.focus()
  }
}
</script>

<style scope>
  .basic{
    margin-top: -50px;
    z-index: 100;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: whitesmoke;
  }
</style>