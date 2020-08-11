<template>
  <div class="basic">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col>
    <div class="box">
      <el-card style="background-color: whitesmoke; border: 0px;" shadow="never">
        <br>
        <el-row>
          <el-col :span="8">
            <el-row><el-avatar :size="80" :src="circleUrl"></el-avatar></el-row>
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
                  <el-form :model="nameForm">
                    <el-form-item>
                        <el-input v-model="nameForm.newName" autocomplete="off" placeholder="新昵称"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="changeNameVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changeNameVisible = false">确 定</el-button>
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
                  <el-form :model="phoneForm">
                    <el-form-item>
                      <el-input v-model="phoneForm.newPhone" type="tel" autocomplete="off" placeholder="新手机号"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="changePhoneVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changePhoneVisible = false">确 定</el-button>
                  </div>
                </el-dialog>
              </el-form-item>

              <el-form-item><el-button type="text" @click="changeEmailVisible=true">修改</el-button>
                <el-dialog title="修改邮箱" :visible.sync="changeEmailVisible" :modal-append-to-body="false" width="300px">
                  <el-form :model="emailForm">
                    <el-form-item>
                      <el-input v-model="emailForm.newEmail" type="tel" autocomplete="off" placeholder="新邮箱"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="changeEmailVisible = false">取 消</el-button>
                    <el-button type="primary" @click="changeEmailVisible = false">确 定</el-button>
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
  export default {
    data () {
      return {
        name: "whisper",
        password: "123123",
        phone: "18538947201",
        email: "1214960505@qq.com",
        ID: "18373154",
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
        emailForm: {
            newEmail: '',
        },
        nameForm: {
            newName: '',
        }
      }
    },
    methods:{
        toChangeInfo(){
            this.$router.push({path:"/ChangeInfo"})
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

  .box{
    width: 70%;
    text-align: center;
    margin-left: 15%;
    margin-top: 80px;
  }
  
  
</style>