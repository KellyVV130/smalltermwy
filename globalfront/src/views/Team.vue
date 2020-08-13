<template>
  <div class="myTeams">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <h3>我的团队</h3><!--按修改日期倒序-->
        <el-row :gutter="20">
          <el-col :span="4" v-for="(item, index) in teams" :key="index" style="margin-bottom: 20px;">
            <div style="text-align: center; height: 100px;">
              <el-card class="teamCard" shadow="hover">
                <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small">
                  <i class="el-icon-s-tools" @click="handleClick(item.id)"></i>
                </div>
                <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small">
                  <i class="el-icon-s-custom" @click="addPeople(item.id)"></i>
                </div>
                <div style="font-size: 40px;"><i class="el-icon-pie-chart" @click="toOneTeam(item.id)"></i></div>
                <div @click="toOneTeam(item.id)" style="cursor: pointer;">{{item.name}}</div>
              </el-card>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
<!--        <div><el-button plain type="primary" disabled>新建文档</el-button></div>-->
<!--        <div><el-button plain type="primary" disabled>新建文件夹</el-button></div>-->
<!--        <div><el-button plain type="primary">模板库</el-button></div>-->
        <div><el-button plain type="primary" @click="newTeam">创建团队</el-button></div>
        <div><el-button plain type="primary">管理全部团队</el-button></div>
      </el-aside>
    </el-container>

    <el-dialog
      title="文件详细信息"
      :visible.sync="infoDialog"
      width="30%"
      center>
      <div style="">
        <div>团队名：{{Info.builder}}</div>
        <div>创建者：{{Info.builder}}</div>
        <div>创建日期：{{Info.builder}}</div>
        <el-divider></el-divider>
        <div>所有成员：
          <div v-for="(item, index) in Info.coworkers" :key="index" class="coworkers">
            <el-avatar :src="item.userImg" :size="'small'" style="cursor: pointer;vertical-align: sub;"></el-avatar>
            <span style="height: 28px; padding-right: 15px;margin-left: 10px;">{{item.userName}}</span>
            <i class="el-icon-user" v-if="item.isBuilder"></i>
          </div>
        </div>
        <el-divider></el-divider>
        <el-link plain type="primary" style="font-size: 16px;">分享</el-link>
        <el-link plain type="danger" style="float: right; font-size: 16px;" @click="Delete(Info.builder)">删除
        </el-link>
      </div>
    </el-dialog>

    <folder-dialog
        :dialog="folderDialog"
        @changeVisible="changeVisible"
        :doc-id="''"
        :team-id="dialogTeam"
        :type="type"></folder-dialog>
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
        ],
        folderDialog : false,
        type: '',
        dialogTeam: '',
        Info:{
          builder: 'Kelly',
          coworkers:[
            {
              userId: 1,
              userName: 'Kelly',
              isBuilder: true,
              isCollected: true,
              userImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              userId: 2,
              userName: 'Kelly2',
              isBuilder: false,
              isCollected: true,
              userImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        infoDialog: false,
      }
    },
    methods:{
      toOneTeam(id){
        this.$router.push({name:'team', params: {teamId: id}})
      },
      changeVisible(val){
        this.folderDialog = val
      },
      newTeam(){
        this.type = 'newteam'
        this.folderDialog = true
      },
      addPeople(id){
        this.type = 'teamwork'
        this.dialogTeam = id
        this.folderDialog = true
      },
      handleClick(id){
        // this.teams.forEach(i=>{
        //   if(i.id === id){
        //     this.Info = i
        //     return
        //   }
        // })
        console.log(id)
        this.infoDialog = true
      },
      Delete(id){
        let message='确定要删除团队吗？'
        this.$confirm(message).then(_ => {
          console.log(id+_)
          this.infoDialog = false
        })
      },
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
    background-color:rgba(0,0,0,0);
    position: relative;
  }
  .teamCard i{
    cursor: pointer;
  }
</style>