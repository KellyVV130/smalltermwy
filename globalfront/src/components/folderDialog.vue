<template>
  <div v-if="isV">
    <div v-if="type === 'coworker'">
      <el-dialog title="添加协作者" :visible.sync="dialog" :close-on-click-modal="false"
      :show-close="false" style="width: 70%;margin: 0 auto;">
        <el-form :model="form" style="text-align: center;">
          <el-form-item prop="name">
            <div style="font-size: medium; font-family: Georgia, serif;">为[{{docId}}]添加协作者:</div>
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
            <div style="font-size: medium; font-family: Georgia, serif;">为【{{teamId}}】添加成员:</div>
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
      teamId:{
        default: ''
      }
    },
    data(){
      return{
        form:{
          name: ''
        },
        isV: false,
        users: [],
        state: '',
      }
    },
    watch:{
      dialog(val){
        this.isV = val
        this.form.name=''
        console.log('type is'+this.type)
      }
    },
    methods:{
      cancelForm(){
        this.$emit('changeVisible', false)
      },
      submitForm(){
        console.log(this.form)
        this.$emit('changeVisible', false)
      },
      querySearchAsync(queryString, cb) {
        let users = this.users;//按照queryString去后端请求，将返回的数据sb(results)
        //若无匹配，$message提示暂无匹配
        let results = queryString ? users.filter(this.createStateFilter(queryString)) : null;
        cb(results);
      },
      handleSelect(item) {
        this.form.name = item.value
        this.restaurants = []
      },
      createStateFilter(queryString) {//给filter()的参数函数包了一层外壳。
        return (s) => {//filter()函数的参数，返回为true时元素保留。该函数的第一个参数是当前元素值即s。
          console.log(s)
          return (s.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    },
    mounted() {
      console.log('dialog mounted')
    }
  }
</script>

<style scoped>
  .autocomplete{
    width: 350px;
  }
</style>