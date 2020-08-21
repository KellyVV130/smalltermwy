<template>
  <div class="basic" v-web-title="{title:'欢迎使用环球文档-注册'}">
    <el-container>
      <el-main>
        <div class="block" style="margin-top:60px">
          <el-carousel :interval="5000" arrow="always" height="540px">
            <el-carousel-item v-for="(img,index) in imgList" :key="index">
              <img v-bind:src="img.url" style="width:100%">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-main>

      <el-aside width="450px">
      <div style="justify-content: center;margin-top:100px">
        <el-card style="width: 400px;margin-top:140px;margin-left: 15px;height: 400px;" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="margin-left:45%">注  册</span>
          </div>
          <el-form size="small" ref="infoForm" :model="user" :rules="rules"  :validate-on-rule-change="true" :label-position="right" status-icon="true">
            <el-form-item label="手机号" prop="phone">
              <el-input
                v-model="user.phone"
                type="tel"
                show-word-limit
                style="width: 78%; float: right"
                id="phone"
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
                @keydown.enter.native="doRegister"
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
      </el-aside>
    </el-container>
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
      imgList:[
        {url:require('../assets/11.png')},
        // {url:require('../assets/12.png')},
        {url:require('../assets/13.png')},
        {url:require('../assets/14.png')},
        {url:require('../assets/15.png')},
      ],
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
          {min: 4, message: '密码至少4位', trigger: 'blur'}
        ],
        password2: [// 与上个相同
          {required: true, message: '两次输入密码必须一致', trigger: 'blur', validator: validatePwd2}
        ],
      }
    }
  },
  mounted(){
    let inputElement=document.getElementById('phone')
    inputElement.focus()
    localStorage.removeItem('token')
  },
  methods:{
    toLogin(){
        console.log('login',this.$route.params.redirect)
      if(this.$route.params.redirect){
        this.$router.push({name:"Login", params:{redirect:this.$route.params.redirect}})
      } else
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
      postCode(this.user.phone).then(response => {
        if(response.status === 200){
          console.log(response)
          this.$message({
            message: '验证码发送成功',
            type: 'info'
          })
        } else if(response.status === 400){
          this.$message({
            message: '验证码发送失败',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error.response)
        this.$message({message:error.response?error.response.data.mobile[0]:'null', type:'error'})
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
              type: 'info'
            })
            if(response.status === 400){
              this.$message({
                message: '昵称或手机号已被使用 或验证码输入错误',
                type: 'error'
              })
            }
            this.$router.push({path: '/Login'})
          }).catch(e => {
            this.$message({message:e.response.data, type:'error'})
          })
        }
      })
    }
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
    overflow: hidden;
    background: url('../assets/8.jpg');
    background-size: 100% 100%;
    background-attachment: fixed;/* 不设置的话页面滑动时，背景会不铺满*/
  }


  .el-container{
    margin-top: 30px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color:#333333;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color:#333333;
  }
  .el-carousel--horizontal {
    overflow-x: hidden;
    width: 960px;
    border-radius:20px;
}
</style>