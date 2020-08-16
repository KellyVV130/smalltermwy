<template>
  <div v-if="isV">
    <div v-if="type === 'coworker'">
      <el-dialog title="添加协作者" :visible.sync="dialog" :close-on-click-modal="false"
      :show-close="false" style="width: 70%;margin: 0 auto;">
        <el-form :model="form" style="text-align: center;">
          <el-form-item prop="name">
            <div style="font-size: medium; font-family: Georgia, serif;">为[{{name}}]添加协作者:</div>
            <el-autocomplete
              class="autocomplete"
              v-model="form.name"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入对方昵称、手机、邮箱或ID"
              @select="handleSelect"
              :trigger-on-focus="false"
            >
            <i slot="suffix" class="el-input__icon el-icon-search"></i></el-autocomplete>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div v-else-if="type === 'newteam'">
      <el-dialog title="新建团队" :visible.sync="dialog" :close-on-click-modal="false"
      :show-close="false" style="width: 70%;margin: 0 auto;">
        <el-form :model="form" style="text-align: center;">
          <el-form-item prop="name">
            <div style="font-size: medium; font-family: Georgia, serif;">团队名称为:</div>
            <el-input
              class="autocomplete"
              v-model="form.name"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div v-else>
      <el-dialog title="为团队添加成员" :visible.sync="dialog" :close-on-click-modal="false"
        :show-close="false" style="width: 70%;margin: 0 auto;">
        <el-form :model="form" style="text-align: center;">
          <el-form-item prop="name">
            <div style="font-size: medium; font-family: Georgia, serif;">为【{{name}}】添加成员:</div>
            <el-autocomplete
              class="autocomplete"
              v-model="form.name"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入对方昵称、手机、邮箱或ID"
              @select="handleSelect"
              :trigger-on-focus="false"
            >
            <i slot="suffix" class="el-input__icon el-icon-search"></i></el-autocomplete>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {addCoworker, createDoc, fetchUsers} from "../api/api";

  export default {
    name: "folderDialog",
    props:{
      dialog:{
        default: false
      },
      docId:{
        default: ''
      },
      type:{
        default: ''//coworker, teamworker, newteam
      },
      name:{
        default: ''
      }
    },
    data(){
      return{
        form:{
          name: '',
          id: null,
        },
        isV: false,
        state: '',
        newCo:[],
      }
    },
    watch:{
      dialog(val){
        this.isV = val
        this.form.name=''
      }
    },
    methods:{
      cancelForm(){
        this.$emit('changeVisible', false, this.docId)
      },
      submitForm(){
        if(this.type !== 'newteam'){
          addCoworker(this.docId, this.form.id).then(res=>{
            if(res.status === 200){
              // })
              this.$message({message:'添加成功', type:'info'})
            } else if(res.status === 204){
              this.$message({message:'发生未知错误', type:'error'})
            }
          }).catch(e=>{
            if(e.response.status === 401){
              this.$message({message:'您没有权限', type:'error'})
            } else if (e.response.status === 400){
              this.$message({message:'此用户已在协作者中', type: 'error'})
            }
          })
          this.$emit('changeVisible', false, this.docId)
        } else {
          createDoc(1,this.form.name).then(res => {
            if(res.status === 201){
              this.$message({message:'创建团队成功！', type: 'info'})
              this.$emit('changeVisible', false)
            }
          }).catch(e=>{
            if(e.response.status === 401){
              this.$message({message:'您没有权限', type: 'error'});
            }
          })
        }
      },
      querySearchAsync(queryString, cb) {
        //let users = this.users;//按照queryString去后端请求，将返回的数据sb(results)
        let results = []
        fetchUsers(queryString).then(res => {
          if(res.status === 200){
            if(res.data.length === 0){
              //this.$message({message:'暂无匹配', type:'error'})
            } else {
              console.log(res.data)
              res.data.forEach(i => {
                results.push({
                  id: i.id,
                  value: i.username,
                })
              })
              //"id": 1, "username": "aaa", "head": "", "email": "", "mobile": "17600294315"
            }
          }
        }).catch(e=>{this.$message({message:e.response.data, type: 'error'})})
        //若无匹配，$message提示暂无匹配
        console.log(results)
        cb(results)
        // let results = queryString ? users.filter(this.createStateFilter(queryString)) : null;
        // cb(results);
      },
      handleSelect(item) {
        this.form.name = item.value
        this.form.id = item.id
      },
      createStateFilter(queryString) {//给filter()的参数函数包了一层外壳。
        return (s) => {//filter()函数的参数，返回为true时元素保留。该函数的第一个参数是当前元素值即s。
          console.log(s)
          return (s.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .autocomplete{
    width: 350px;
  }
</style>