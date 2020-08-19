<template>
  <div class="oneTeam" v-web-title="{title:webTitle}">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <div style="position: relative">
          <el-page-header @back="goBack">
            <span slot="content">{{teamName}}</span>
          </el-page-header>
          <span style="position: absolute; right: 0;top: 0;">
            <el-radio-group v-model="chart" size="small" @change="changeChart">
              <el-radio-button label="列表"></el-radio-button>
              <el-radio-button label="图标"></el-radio-button>
            </el-radio-group>
          </span>
        </div><!--按修改日期倒序-->
        <div style="margin-top: 40px;">
          <doc-list :type="'team'" v-if="chart === '列表'" :team="teamId"></doc-list>
          <doc-img :type="'team'" :team="teamId" v-else></doc-img>
        </div>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
        <div><el-button plain type="primary" @click="toNewDoc">新建团队文档</el-button></div>
<!--        <div><el-button plain type="primary" disabled>新建文件夹</el-button></div>-->
        <div><el-button plain type="primary" @click="toTemplate">模板库</el-button></div>
        <div v-if="isBuilder">
          <el-button plain type="primary">管理团队</el-button>
        </div>
        <div>
          <el-button plain type="danger" v-if="isBuilder">解散团队</el-button>
          <el-button plain type="danger" v-else>退出团队</el-button>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import {createDoc, fetchDocInfo} from "../api/api";

  export default {
    name: "oneTeam",
    data(){
      return {
        webTitle:'团队文档',
        teamName: '',
        chart: '',
        isBuilder: false,
        teamId: ''
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
        this.teamId = this.$route.params.teamId
        fetchDocInfo(this.teamId).then(res=>{
          if(res.status === 200){
            this.teamName = res.data.name;
            this.webTitle = this.teamName+'的文档'
          }
        }).catch(e=>this.$message({message:e.response.data, type:'error'}))
      },
      toNewDoc(){
        createDoc(0, "未命名", this.teamId).then(res=>{
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
      goBack(){
        this.$router.push({name:'myTeam'})
      },
      changeChart(value){
        this.chart = value
        localStorage.setItem('chart', value)
      },
      toTemplate(){
        this.$router.push({name:'templates', params:{teamId:this.teamId}})
      },
    }
  }
</script>

<style scoped>
  .el-aside{
    width: 300px;
    /*height: calc(100vh - 50px);*/
  }
  .oneTeam{
    background-color: whitesmoke;
    overflow-x: hidden;
  }
  .el-button{
    width: 150px;
  }
</style>