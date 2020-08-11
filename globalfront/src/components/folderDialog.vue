<template>
  <div v-if="isV">
    <el-dialog title="添加协作者" :visible.sync="dialogFormVisible" :close-on-click-modal="false"
    :show-close="false" style="width: 50%;margin: 0 auto;">
      <el-form :model="form" style="text-align: center;">
        <el-form-item prop="name">
          <div>为{{docId}}添加协作者:</div>
          <el-input v-model="form.name" autocomplete="off" style="width: 250px;"
                    placeholder="请输入对方昵称、手机、邮箱或ID"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "folderDialog",
    props:{
      dialogFormVisible:{
        default: false
      },
      docId:{
        default: ''
      }
    },
    data(){
      return{
        form:{
          name: ''
        },
        isV: false
      }
    },
    watch:{
      dialogFormVisible(val){
        this.isV = val
        this.form.name=''
      }
    },
    methods:{
      cancelForm(){
        this.$emit('changeVisible', false)
      },
      submitForm(){
        console.log(this.form)
        this.$emit('changeVisible', false)
      }
    }
  }
</script>

<style scoped>
</style>