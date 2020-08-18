<template>
  <div v-if="isV">
    <div>
      <el-dialog title="设置文档权限" :visible.sync="setDialog"
       style="width: 70%;margin: 0 auto;" :show-close="false" :close-on-click-modal="false">
        设置{{setName}}权限<br>
        <!--如果是团队文档，有完全公开、团队内及本文档协作者公开，团队外只读、仅团队内及本文档协作者公开、仅团队内及本文档协作者只读-->
        <el-radio-group v-model="vi" style="margin-top: 25px;" class="setRadio">
          <el-radio :label="0">完全公开</el-radio><br>
          <el-radio :label="2">对协作者公开，他人只读</el-radio><br>
          <el-radio :label="1">仅对协作者公开，他人不可见</el-radio><br>
          <el-radio :label="3" v-if="isTeam">仅协作者只读，他人不可见</el-radio>
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
  import {changeVisibility} from "../api/api"
  export default {
    name: "setDialog",
    props: {
      setDialog: {
        default: false
      },
      setId: {
        default: false
      },
      Visi: {
        default: 3
      },
      isTeam:{
        default: false
      },
      setName:{
        default:[]
      }
    },
    watch:{
      setDialog(val){
        this.isV = val
      },
      Visi(val){
        this.vi = val
      }
    },
    data(){
      return {
        isV: false,
        vi: -1,
      }
    },
    methods:{
      cancelForm(){
        this.$emit('changeVisible', false, this.setId)
      },
      submitForm(){
        console.log(this.vi)
        console.log(this.Visi)
        changeVisibility(this.setId, this.vi).then(res=>{
          if(res.status === 200){
            this.$message({message:'修改权限成功！', type: 'info'})
            this.$emit('changeVisible', false, this.setId)
          }
        }).catch(e=>{if(e.response.status === 401)
          this.$message({message:e.response.data, type:'error'})
          this.$emit('changeVisible', false, this.setId)
        })
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