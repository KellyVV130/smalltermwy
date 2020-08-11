<template>
  <div class="myTeams">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <h3>我的团队</h3><!--按修改日期倒序-->
        <el-row :gutter="20">
          <el-col :span="4" v-for="(item, index) in teams" :key="index" style="">
            <div style="text-align: center; height: 100px;" @click="toOneTeam(item.id)">
              <el-card class="teamCard" shadow="hover">
                <div style="font-size: 40px;"><i class="el-icon-folder-opened"></i></div>
                {{item.name}}
              </el-card>
            </div>
          </el-col>
        </el-row>
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
    name: "myTeam",
    data(){
      return {
        teams:[
          {
            id: 1,
            name: '小学期1'
          },
          {
            id: 2,
            name: '小学期2'
          }
        ]
      }
    },
    methods:{
      toOneTeam(id){
        this.$router.push({name:'oneTeam', params: {teamId: id}})
      }
    }
  }
</script>

<style scoped>
  .el-aside{
    width: 300px;
    height: calc(100vh - 50px);
  }
  .myTeams{
    background-color: whitesmoke;
  }
  .el-button{
    width: 150px;
  }

  .teamCard{
    border: 0px;
    background-color: #FFF;
    transition: .3s;
    height: 100%;
    cursor: pointer;
    background-color:rgba(0,0,0,0)
  }
</style>