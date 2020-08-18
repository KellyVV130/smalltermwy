<template>
  <div class="person" v-web-title="{title:webTitle}">
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
            <el-row><el-button v-if="ifChangeHeadVisible" type="text" icon="el-icon-edit" @click="changeHeadVisible=true">修改头像</el-button></el-row>
             <el-dialog title="修改头像" :visible.sync="changeHeadVisible" :modal-append-to-body="false" width="300px">
                <el-form :model="form">
                  <el-form-item ref="uploadElement">
                    <el-upload ref="upload"
                              action="http://127.0.0.1/users/1/"
                              accept="image/png,image/gif,image/jpg,image/jpeg"
                              list-type="picture-card"
                              :http-request="uploadAvatar"
                              :limit=limitNum
                              :auto-upload="false"
                              :on-exceed="handleExceed"
                              :before-upload="handleBeforeUpload"
                              :on-preview="handlePictureCardPreview"
                              :on-remove="handleRemove"
                              :on-change="imgChange"
                              :on-success="handleAvatarSuccess"
                              :class="{hide:hideUpload}">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%"
                          :src="dialogImageUrl"
                          alt="">
                    </el-dialog>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="toCancel">取 消</el-button>
                  <el-button type="primary" @click="uploadFile">确 定</el-button>
                </div>
              </el-dialog> 
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
            <el-form v-if="ifChangeVisible">
              <el-form-item><el-button type="text" @click="changeNameVisible=true">修改</el-button>
                <el-dialog title="修改昵称" :visible.sync="changeNameVisible" :modal-append-to-body="false" width="300px">
                  <el-form ref="nameForm" :model="nameForm" :rules="nameRules" enctype="multipart/form-data">
                    <el-form-item prop="newName">
                        <el-input v-model="nameForm.newName" autocomplete="off" placeholder="新昵称" @keydown.enter.native="changeName"></el-input>
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
                  <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" enctype="multipart/form-data">
                    <el-form-item prop="newPassword">
                      <el-input v-model="passwordForm.newPassword" type="password" autocomplete="off" placeholder="新密码"></el-input>
                    </el-form-item>
                    <br>
                    <el-form-item prop="newPasswordAgain">
                      <el-input v-model="passwordForm.newPasswordAgain" type="password" autocomplete="off" placeholder="确认新密码" @keydown.enter.native="changePassword"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="changePasswordVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changePassword">确 定</el-button>
                  </div>
                </el-dialog>
              </el-form-item>

              <el-form-item><el-button type="text" @click="changePhoneVisible=true">修改</el-button>
                <el-dialog title="修改手机号" :visible.sync="changePhoneVisible" :modal-append-to-body="false" width="300px">
                  <el-form ref="phoneForm" :model="phoneForm" :rules="phoneRules" enctype="multipart/form-data">
                    <el-form-item>
                      <el-input v-model="phoneForm.newPhone" type="tel" autocomplete="off" placeholder="新手机号" @keydown.enter.native="changePhone"></el-input>
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
                      <el-input v-model="emailForm.newEmail" type="email" autocomplete="off" placeholder="新邮箱" @keydown.enter.native="changeEmail"></el-input>
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

<script>import Axios from '../api/index'
import {getUserInfo,getOtherInfo} from '../api/api'
  export default {
    data () {
      var validateNewPasswordAgain = (rule, value, callback) => {
        if(value===''){
          callback(new Error('请再次输入密码'))
        }else if (value !== this.passwordForm.newPassword) {
          callback(new Error('两次密码输入不一致'))
        }else{
          callback()
        }
      }
      return {
        webTitle:'个人主页',
        name: "whisper",
        password: "123123",
        phone: "18538947201",
        email: "1214960505@qq.com",
        ID: "18373154",
        head: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        uploadurl:'http://127.0.0.1:8000/users/',
        hideUpload: false,
        dialogImageUrl:'',
        dialogVisible:false,
        limitNum:1,
        form:{},
        dialogVisible2:false,

        ifChangeVisible: true,
        ifChangeHeadVisible: true,
        changeHeadVisible: false,
        changePasswordVisible: false,
        changePhoneVisible: false,
        changeEmailVisible: false,
        changeNameVisible: false,
        headForm: {
          newHead: ''
        },
        passwordForm: {
          newPassword: '',
          newPasswordAgain: ''
        },
        passwordRules: {
          newPassword: [
            {required:true, message:'请输入新密码', trigger: 'blur'},
            {min: 4, max:18, message: '密码至少四位', trigger:'blur'}
          ],
          newPasswordAgain: [
            {required: true, message: '两次输入密码必须一致', trigger: 'blur', validator: validateNewPasswordAgain}
          ]
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
            this.webTitle = this.name + '的个人主页'
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
      //获取他人信息
      getOtherInfo(id) {
        getOtherInfo(id).then(response => {
          if(response.status===200){
            console.log(response)
            this.name=response.data.username
            this.phone=response.data.mobile
            if(response.data.email === '') this.email='未填写'
            else this.email=response.data.email
            this.password=response.data.password
            this.ID=response.data.id
            this.head=response.data.head
            this.webTitle = this.name + '的个人主页'
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
            axios.patch('/users/'+localStorage.userId+'/',{
              username: this.nameForm.newName
            }).then(response => {
              if(response.status===200){
                console.log(response)
                console.log(localStorage.token)
                this.name=this.nameForm.newName
                this.nameForm.newName=''
                this.$message({
                  message: '修改昵称成功',
                  type: 'info'
                })
                this.$router.push({name: 'Login'})
              }else{
                this.$message({
                  message: '修改昵称失败',
                  type: 'error'
                })
              }
            }).catch(error => {
              console.log(error.response)
            })
            this.changeNameVisible=false
            this.$refs.nameForm.resetFields()
          }
        })
      },
      //修改密码
      changePassword(){
        this.$refs.passwordForm.validate((valid) => {
          if(valid){
            const axios = Axios
            axios.patch('/users/'+localStorage.userId+'/',{
              password: this.passwordForm.newPassword
            }).then(response => {
              if(response.status===200){
                console.log(response)
                console.log(localStorage.token)
                this.password=this.passwordForm.newPassword
                this.passwordForm.newPassword=''
                this.passwordForm.newPasswordAgain=''
                this.$message({
                  message: '修改密码成功',
                  type: 'info'
                })
              }else{
                this.$message({
                  message: '修改密码失败',
                  type: 'error'
                })
              }
            }).catch(error => {
              console.log(error.response)
            })
            this.changePasswordVisible=false
            this.$refs.passwordForm.resetFields()
          }
        })
      },
      //修改手机
      changePhone(){
        this.$refs.phoneForm.validate((valid) => {
          if(valid){
            const axios = Axios
            axios.patch('/users/'+localStorage.userId+'/',{
              mobile: this.phoneForm.newPhone
            }).then(response => {
              if(response.status===200){
                console.log(response)
                console.log(localStorage.token)
                this.phone=this.phoneForm.newPhone
                this.phoneForm.newPhone=''
                this.$message({
                  message: '修改手机号码成功',
                  type: 'info'
                })
              }else{
                this.$message({
                  message: '修改手机号码失败',
                  type: 'error'
                })
              }
            }).catch(error => {
              console.log(error.response)
            })
            this.changePhoneVisible=false
            this.$refs.phoneForm.resetFields()
          }
        })
      },
      //修改邮箱
      changeEmail(){
        this.$refs.emailForm.validate((valid) => {
          if(valid){
            const axios = Axios
            axios.patch('/users/'+localStorage.userId+'/',{
              email: this.emailForm.newEmail
            }).then(response => {
              if(response.status===200){
                console.log(response)
                console.log(localStorage.token)
                this.email=this.emailForm.newEmail
                this.emailForm.newEmail=''
                this.$message({
                  message: '修改邮箱成功',
                  type: 'info'
                })
              }else{
                this.$message({
                  message: '修改邮箱失败',
                  type: 'error'
                })
              }
            }).catch(error => {
              console.log(error.response)
            })
            this.changeEmailVisible=false
            this.$refs.emailForm.resetFields()
          }
        })
      },
      //上传头像
      // 上传文件之前的钩子
    handleBeforeUpload (file) {
      if (!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$message({
          type: 'error',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      let size = file.size / 1024 / 1024 / 2
      if (size > 2) {
        this.$message({
          type: 'error',
          message: '图片大小必须小于2M'
        })
      }
      if((file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')&&size<=2){
        this.headFile=file
        console.log('headfile:'+this.headFile)
      }
    },
    //真正的上传函数
    uploadAvatar(){
      let fd = new FormData();//通过form数据格式来传
      fd.append("head", this.headFile); //传文件
      console.log(fd.get('picFile'));
      const axios = Axios
      axios.patch('/users/1/',fd).then(response=>{
        console.log(response)
        if(response.status===200){
          console.log(response)
          this.head=response.data.head
          this.headForm.newHead=''
          localStorage.head = this.head
          this.$addStorageEvent('head',this.head)
          this.$message({
            message: '修改头像成功',
            type: 'info'
          })
          this.getPersonInfo()
        }else{
          this.$message({
            message: '修改头像失败',
            type: 'error'
          })
        }
      }).catch(error => {
        console.log(error.response)
      })
      this.changeHeadVisible=false
      this.$refs.headForm.resetFields()
      this.headForm.newHead=''
    },
    // 文件超出个数限制时的钩子
    handleExceed (files, fileList) {
      this.hideUpload = fileList.length >= this.limitNum;
    },
    // 文件列表移除文件时的钩子
    handleRemove (file, fileList) {
      this.hideUpload = fileList.length >= this.limitNum;

    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile () {
      this.$refs.upload.submit()
    },
    imgChange (files, fileList) {
      this.hideUpload = fileList.length >= this.limitNum;
      if (fileList) {
        this.$refs.uploadElement.clearValidate();
      }
    },
    handleAvatarSuccess(response){
      window.console.log(response)
    },
    toCancel(){
      this.changeHeadVisible=false
    }
    },
    mounted() {
      this.ID=this.$route.params.personId
      if(this.ID===localStorage.userId){
        this.ifChangeVisible=true
        this.ifChangeHeadVisible=true
        this.getPersonInfo(this.$route.params.personId)
      }
      else {
        this.ifChangeVisible=false
        this.ifChangeHeadVisible=false
        this.getOtherInfo(this.$route.params.personId)
      }
      //this.getAvatar()//获取的头像都是登录用户的头像
    },
    watch: {
      head: {
        handler(oldValue,newValue){
          if(oldValue!==newValue){
            this.getPersonInfo()
          }
        },
        immediate:true
      }
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
  
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .hide .el-upload--picture-card{
    display: none !important;
  }
  
</style>