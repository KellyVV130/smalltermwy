<template>
  <div v-if="isV">
    <div>
      <el-dialog title="设置文档权限" :visible.sync="setDialog"
       style="width: 70%;margin: 0 auto;" :show-close="false" :close-on-click-modal="false">
        设置{{setId}}权限<br>
        <!--如果是团队文档，有完全公开、团队内及本文档协作者公开，团队外只读、仅团队内及本文档协作者公开、仅团队内及本文档协作者只读-->
        <el-radio-group v-model="team" style="margin-top: 25px;" class="setRadio">
          <el-radio :label="0">完全公开</el-radio><br>
          <el-radio :label="2">对协作者公开，他人只读</el-radio><br>
          <el-radio :label="1">仅对协作者公开，他人不可见</el-radio><br>
          <el-radio :label="3">仅协作者只读，他人不可见</el-radio>
        </el-radio-group>
        <!--如果是个人文档，有完全公开、协作者内公开，协作者外只读、仅协作者公开、仅协作者只读-->
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
    name: "setDialog",
    props: {
      setDialog: {
        default: false
      },
      setId: {
        default: false
      }
    },
    watch:{
      setDialog(val){
        this.isV = val
      }
    },
    data(){
      return {
        isV: false,
        team: ''
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
    }
  }
</script>

<style>
  .setRadio .el-radio__label {
      font-size: 16px;
      padding-left: 10px;
  }
</style>