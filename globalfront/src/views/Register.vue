<template>
  <div class="basic">
    <div style="display: flex;justify-content: center;margin-top:50px">
      <el-card style="width: 400px" shadow="hover">
        <div slot="header" class="clearfix">
          <span style="margin-left:45%">注  册</span>
        </div>
        <el-form size="small" ref="infoForm" :model="user" :rules="rules"  :validate-on-rule-change="true" :label-position="right">
          <el-form-item label="手机号" prop="phone">
            <el-input
              v-model="user.phone"
              type="tel"
              show-word-limit
              style="width: 78%; float: right"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="code">
            <el-input
              v-model="user.code" 
              show-word-limit
              style="width: 49%; float: left; margin-left: 5%"
            > 
            </el-input><el-button style="float:right; padding: 10px; line-height:10px; width:100px" @click="getCode" :disabled="codeButton">{{content}}</el-button>
          </el-form-item>

          <el-form-item label="昵称" prop="name">           
            <el-input
              v-model="user.name"
              show-word-limit
              style="width: 78%; float: right"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password1">          
            <el-input
              v-model="user.password1"
              type="password"
              maxlength="20"
              show-word-limit
              style="width: 78%; float: right"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="密码确认" prop="password2">         
            <el-input
              v-model="user.password2"
              placeholder="请再次输入密码"
              type="password"
              maxlength="20"
              show-word-limit
              style="width: 78%; float: right"
            >
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width: 100%"  @click="doRegister">注册</el-button>
            <tr><el-link type="primary" @click="toLogin" style="float: left" :underline="false">已有账号？点我登录</el-link></tr>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import {postCode, postNewUser} from '../api/api'
export default {
  data() {
    var validatePwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.user.password1) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }
    return {
      content: '发送验证码',
      time: 60,
      codeButton: false,
      user: {
        phone: '',
        code: '',
        name: '',
        password1: '',
        password2: ''
      },
      rules: {
        phone: [
          {required: true, message: '手机号不能为空', trigger: 'blur'},
          {min: 11, max: 11, message: '请输入11位手机号', trigger:'blur'}
        ],
        code: [
          {required: true, message: '验证码不能为空', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '用户名不能为空', trigger: 'blur'}
        ],
        password1: [
          {required: true, message: '密码不能为空', trigger: 'blur'},
          {min: 4, max: 18, message: '密码至少4位', trigger: 'blur'}
        ],
        password2: [// 与上个相同
          {required: true, message: '两次输入密码必须一致', trigger: 'blur', validator: validatePwd2}
        ],
      }
    }
  },
  methods:{
    toLogin(){
      this.$router.push({path:"/Login"})
    },
    getCode(){
      if(this.codeButton) return
      this.codeButton = true
      this.codeButton = this.time+'s后重新发送'
      let clock = window.setInterval(() => {
        this.time--,
        this.content = this.time+'s后重新发送'
        if(this.time<0){
          window.clearInterval(clock)
          this.content='重新发送验证码'
          this.time=60
          this.codeButton = false
        }
      },1000)
      postCode(this.phone).then(response => {
        if(response.status === 200){
          console.log(response)
          this.$message({
            message: '验证码发送成功',
            type: 'success'
          })
        } else if(response.status === 400){
          this.$message({
            message: '验证码发送失败',
            type: 'error'
          })
        }
      }).catch(error => {
        this.$message({message:error})
      })
    },
    doRegister(){
      this.$refs.infoForm.validate((valid) => {
        if(valid) {
          postNewUser(this.user.name,this.user.password1,this.user.password2,this.user.phone,this.user.code)
              .then(response => {
            console.log(response)
             this.$message({
              message: '注册成功',
              type: 'success'
            })
            if(response.status === 400){
              this.$message({
                message: '昵称或手机号已被使用 或验证码输入错误',
                type: 'error'
              })
            }
            this.$router.push({path: '/Login'})
          }).catch(error => {
              console.log('error'+error)
          })
        }
      })
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