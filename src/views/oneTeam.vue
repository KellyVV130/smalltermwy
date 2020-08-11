<template>
  <div class="oneTeam">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <el-page-header @back="goBack">
          <span slot="content">{{teamName}}</span>
        </el-page-header><!--按修改日期倒序-->
        <div style="margin-top: 20px;"><doc-list :type="'team'"></doc-list></div>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
        <div><el-button type="primary">新建文档</el-button></div>
        <div><el-button type="primary">模板库</el-button></div>
        <div><el-button type="primary">创建团队</el-button></div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "oneTeam",
    data(){
      return {
        teamName: '团队1'
      }
    },
    methods:{
      goBack(){
        this.$router.push({name:'myTeam'})
      }
    }
  }
</script>

<style scoped>
  .el-aside{
    width: 300px;
    height: calc(100vh - 50px);
  }
  .oneTeam{
    background-color: whitesmoke;
  }
  .el-button{
    width: 150px;
  }
</style>