<template>
  <div class="myTrueBuild" v-web-title="{title:'我创建的'}">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <div style="margin-top: 20px;">
          <span style="width: 50%; font-size: 1.17em; font-weight: bold">我创建</span>
          <span style="float: right;">
            <el-radio-group v-model="chart" size="small" @change="changeChart">
              <el-radio-button label="列表"></el-radio-button>
              <el-radio-button label="图标"></el-radio-button>
            </el-radio-group>
          </span>
        </div>
        <!--按日期倒序-->
        <div style="margin-top: 30px;">
          <doc-list :type="'build_t'" v-if="chart === '列表'" ref="child"></doc-list>
          <doc-img :type="'build_t'" v-else ref="child"></doc-img>
        </div>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
        <div><el-button plain type="primary" @click="toNewDoc">新建文档</el-button></div>
<!--        <div><el-button plain type="primary" disabled>新建文件夹</el-button></div>-->
        <div><el-button plain type="primary" @click="toTemplate">模板库</el-button></div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>

  import {createDoc} from "../api/api";

  export default {
    name: "myTrueBuild",
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
      toNewDoc(){
        createDoc(0).then(res=>{
          if(res.status === 201){
            this.$message({message:'新建文档成功', type:'info'})
            this.$router.push({name:'editorPage', params:{docId:res.data.id}})
          }
        }).catch(e=>{
          if(e.response.status === 401){
            this.$message({message:'您没有权限', type: 'error'})
          }
        })
      },
      changeChart(value){
        this.chart = value
        localStorage.setItem('chart', value)
      },
      toTemplate(){
        this.$router.push({name:'templates'})
      },
    }
  }
</script>

<style scoped>
  .el-aside{
    width: 300px;
    height: calc(100vh - 50px);
  }
  .myTrueBuild{
    background-color: whitesmoke;
  }
  .el-button{
    width: 150px;
  }
</style>