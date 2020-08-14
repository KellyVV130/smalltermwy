<template>
  <div class="person">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col>
    <div class="box">
      <el-card style="background-color: whitesmoke; border: 0px; padding-top: 80px;" shadow="never">
        <br>
        <el-row>
          <el-col :span="8">
            <el-row><el-avatar :size="80" :src="head"></el-avatar></el-row>
            <br>
            <el-row><el-button type="text" icon="el-icon-edit">修改头像</el-button></el-row>
          </el-col>
          
          <el-col :span="4">
            <el-form>
              <el-form-item><i class="el-icon-user-solid">  昵称</i></el-form-item>
              <el-form-item><i class="el-icon-paperclip">  密码</i></el-form-item>
              <el-form-item><i class="el-icon-phone">  手机</i></el-form-item>
              <el-form-item><i class="el-icon-message">  邮箱</i></el-form-item>
              <el-form-item><i class="el-icon-s-flag">  账号ID</i></el-form-item>
            </el-form>
          </el-col>

          <el-col :span="8">
            <el-form>
              <el-form-item>{{name}}</el-form-item>
              <el-form-item>********</el-form-item>
              <el-form-item>{{phone}}</el-form-item>
              <el-form-item>{{email}} </el-form-item>
              <el-form-item>{{ID}}</el-form-item>
            </el-form>
          </el-col>

          <el-col :span="2">
            <el-form>
              <el-form-item><el-button type="text" @click="changeNameVisible=true">修改</el-button>
                <el-dialog title="修改昵称" :visible.sync="changeNameVisible" :modal-append-to-body="false" width="300px">
                  <el-form ref="nameForm" :model="nameForm" :rules="nameRules" enctype="multipart/form-data">
                    <el-form-item prop="newName">
                        <el-input v-model="nameForm.newName" autocomplete="off" placeholder="新昵称"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="changeNameVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changeName">确 定</el-button>
                  </div>
                </el-dialog>
              </el-form-item>

              <el-form-item><el-button type="text" @click="changePasswordVisible=true">修改</el-button>
                <el-dialog title="修改密码" :visible.sync="changePasswordVisible" :modal-append-to-body="false" width="300px">
                  <el-form :model="passwordForm">
                    <el-form-item>
                      <el-input v-model="passwordForm.currentPassword" type="password" autocomplete="off" placeholder="当前密码"></el-input>
                    </el-form-item>
                    <br>
                    <el-form-item>
                      <el-input v-model="passwordForm.newPassword" type="password" autocomplete="off" placeholder="新密码"></el-input>
                    </el-form-item>
                    <br>
                    <el-form-item>
                      <el-input v-model="passwordForm.newPasswordAgain" type="password" autocomplete="off" placeholder="确认新密码"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="changePasswordVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changePasswordVisible = false">确 定</el-button>
                  </div>
                </el-dialog>
              </el-form-item>

              <el-form-item><el-button type="text" @click="changePhoneVisible=true">修改</el-button>
                <el-dialog title="修改手机号" :visible.sync="changePhoneVisible" :modal-append-to-body="false" width="300px">
                  <el-form ref="phoneForm" :model="phoneForm" :rules="phoneRules" enctype="multipart/form-data">
                    <el-form-item>
                      <el-input v-model="phoneForm.newPhone" type="tel" autocomplete="off" placeholder="新手机号"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="changePhoneVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changePhone">确 定</el-button>
                  </div>
                </el-dialog>
              </el-form-item>

              <el-form-item><el-button type="text" @click="changeEmailVisible=true">修改</el-button>
                <el-dialog title="修改邮箱" :visible.sync="changeEmailVisible" :modal-append-to-body="false" width="300px">
                  <el-form ref="emailForm" :model="emailForm" :rules="emailRules" enctype="multipart/form-data">
                    <el-form-item>
                      <el-input v-model="emailForm.newEmail" type="tel" autocomplete="off" placeholder="新邮箱"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="changeEmailVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changeEmail">确 定</el-button>
                  </div>
                </el-dialog>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import Axios from '../api/index'
import {getUserInfo} from '../api/api'
  export default {
    data () {
      return {
        name: "whisper",
        password: "123123",
        phone: "18538947201",
        email: "1214960505@qq.com",
        ID: "18373154",
        head: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        changePasswordVisible: false,
        changePhoneVisible: false,
        changeEmailVisible: false,
        changeNameVisible: false,
        passwordForm: {
          currentPassword: '',
          newPassword: '',
          newPasswordAgain: ''
        },
        phoneForm: {
          newPhone: '',
        },
        phoneRules: {
          newPhone: [
            {required:true, message:'请输入新手机号', trigger: 'blur'}
          ]
        },
        emailForm: {
          newEmail: '',
        },
        emailRules: {
          newEmail: [
            {required:true, message:'请输入新邮箱', trigger:'blur'}
          ]
        },
        nameForm: {
          newName: '',
        },
        nameRules: {
          newName: [
            {required:true, message:'请输入新昵称', trigger:'blur'}
          ]
        }
      }
    },
    methods:{
      //获取个人信息
      getPersonInfo(id) {
        getUserInfo(id).then(response => {
          if(response.status===200){
            console.log(response)
            this.name=response.data.username
            this.phone=response.data.mobile
            if(response.data.email === '') this.email='未填写'
            else this.email=response.data.email
            this.password=response.data.password
            this.ID=response.data.id
            this.head=response.data.head
          }
          else{
            this.$message({
              message: '获取信息失败'+response.message,
              type: 'error'
            })
          }
        }).catch(error => {
          console.log(error.response)
        })
      },
      //修改昵称
      changeName(){
        this.$refs.nameForm.validate((valid) => {
          if(valid){
            const axios = Axios
            axios.put('http://127.0.0.1:8000/users/'+localStorage.userId+'/',{
              username: this.nameForm.newName
            }).then(response => {
              if(response.status===200){
                console.log(response)
                this.name=this.nameForm.newName
                this.$message({
                  message: '修改昵称成功',
                  type: 'success'
                })
              }else{
                this.$message({
                  message: '修改昵称失败',
                  type: 'error'
                })
              }
            }).catch(error => {
              console.log(error.response)
            })
          }
        })
      },
      //修改手机
      changePhone(){
        this.$refs.phoneForm.validate((valid) => {
          if(valid){
            const axios = Axios
            axios.put('http://127.0.0.1:8000/users/'+localStorage.userId+'/',{
              mobile: this.phoneForm.newPhone
            }).then(response => {
              if(response.status===200){
                console.log(response)
                this.phone=this.phoneForm.newPhone
                this.$message({
                  message: '修改昵称成功',
                  type: 'success'
                })
              }else{
                this.$message({
                  message: '修改昵称失败',
                  type: 'error'
                })
              }
            }).catch(error => {
              console.log(error.response)
            })
          }
        })
      },
      //修改邮箱
      changeEmail(){
        this.$refs.emailForm.validate((valid) => {
          if(valid){
            const axios = Axios
            axios.put('http://127.0.0.1:8000/users/'+localStorage.userId+'/',{
              email: this.emailForm.newEmail
            }).then(response => {
              if(response.status===200){
                console.log(response)
                this.email=this.emailForm.newEmail
                this.$message({
                  message: '修改昵称成功',
                  type: 'success'
                })
              }else{
                this.$message({
                  message: '修改昵称失败',
                  type: 'error'
                })
              }
            }).catch(error => {
              console.log(error.response)
            })
          }
        })
      }
    },
    mounted() {
      this.getPersonInfo(localStorage.userId)
    }
  }
</script>

<style>
  .person{
    /*position: fixed;*/
    /*width: 100%;*/
    /*height: 100%;*/
    background-color: whitesmoke;
  }

  .box{
    width: 70%;
    text-align: center;
    margin-left: 15%;
    /*margin-top: 80px;*/
    height: calc(100vh - 50px);
  }
  
  
</style>