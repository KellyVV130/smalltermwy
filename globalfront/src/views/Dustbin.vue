<template>
  <div class="dustbin" v-web-title="{title:'回收站'}">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <div style="margin-top: 20px;">
          <span style="width: 50%; font-size: 1.17em; font-weight: bold">回收站</span>
          <span style="float: right;">
            <el-radio-group v-model="chart" size="small" @change="changeChart">
              <el-radio-button label="列表"></el-radio-button>
              <el-radio-button label="图标"></el-radio-button>
            </el-radio-group>
          </span>
        </div>
        <!--按日期倒序-->
        <div style="margin-top: 30px;">
          <doc-list :type="'dustbin'" v-if="chart === '列表'" ref="child"></doc-list>
          <doc-img :type="'dustbin'" v-else ref="child"></doc-img>
        </div>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
        <div><el-button plain type="danger" @click="deleteAll">清空回收站</el-button></div>
        <div><el-button plain type="warning" @click="recoverAll">全部恢复</el-button></div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import {deleteForAll, undoDeleteAll} from "../api/api";

  export default {
    name: "dustbin",
    data(){
      return{
        chart: ""
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        if(localStorage.getItem('chart')){
          this.chart = localStorage.getItem('chart')
        } else {
          this.chart = '图标'
        }
      },
      changeChart(value){
        this.chart = value
        localStorage.setItem('chart', value)
      },
      deleteAll(){
        deleteForAll().then(res => {
          if(res.status === 200){
            this.$refs.child.init()
            this.$message({message:'清空回收站成功', type:'info'})
          }
        }).catch(e=>this.$message({message:e.response.data, type: 'error'}))
        this.$refs.child.init()
      },
      recoverAll(){
        undoDeleteAll().then(res => {
          if(res.status === 200){
            this.$refs.child.init()
            this.$message({message:'全部恢复成功', type:'info'})
          }
        }).catch(e=>this.$message({message:e.response.data, type: 'error'}))
      }
    }
  }
</script>

<style scoped>
  .el-aside{
    width: 300px;
    height: calc(100vh - 50px);
  }
  .dustbin{
    background-color: whitesmoke;
  }
  .el-button{
    width: 150px;
  }
</style>