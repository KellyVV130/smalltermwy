<template>
  <div class="basic" v-web-title="{title:'欢迎使用环球文档-登录'}">
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
        <div style="justify-content: center;margin-top:100px;">
        <el-card style="width: 400px;margin-top:140px;margin-left: 15px;height: 400px;" shadow="hover">
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
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import {postUser,getUserInfo} from '../api/api'
export default {
  data (){
    return {
      imgList:[
        {url:require('../assets/11.png')},
        // {url:require('../assets/12.png')},
        {url:require('../assets/13.png')},
        {url:require('../assets/14.png')},
        {url:require('../assets/15.png')},
      ],
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
              console.log(this.$route.params.redirect,'redirect')
              this.$router.push({ path: this.$route.params.redirect || '/' })
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
        console.log('login',this.$route.params.redirect)
      if(this.$route.params.redirect){
        this.$router.push({name:"Register", params:{redirect:this.$route.params.redirect}})
      } else
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