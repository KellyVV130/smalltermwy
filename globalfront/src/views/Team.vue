<template>
  <div class="myTeams" v-web-title="{title:webTitle}">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <h3>我的团队</h3><!--按修改日期倒序-->
        <el-row :gutter="35">
          <el-col :span="4" v-for="(item, index) in teams" :key="index" style="margin-bottom: 20px;">
            <div style="text-align: center; height: 100px;">
              <el-card class="teamCard" shadow="hover" @mouseenter.native="isHover = true" @mouseleave.native="isHover=false">
                <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small" v-if="isHover">
                  <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false" content="查看团队信息">
                  <i class="el-icon-s-tools" @click="handleClick(item.id)"></i>
                  </el-tooltip>
                </div>
                <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small" v-if="isHover">
                  <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false" content="添加队员">
                  <i class="el-icon-s-custom" @click="addPeople(item.id)"></i>
                  </el-tooltip>
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
      </el-aside>
    </el-container>

    <el-dialog
      title="团队详细信息"
      :visible.sync="infoDialog"
      width="30%"
      center>
      <div>
        <div><span style="width: 120px;display:inline-block;">团队名：</span>{{Info.name}}</div>
        <div>
          <span style="width: 120px;display:inline-block;">创建者：</span>
          <span style="cursor: pointer;" @click="toUser(Info.builderId)">{{Info.builder}}</span>
        </div>
      <div><span style="width: 40px;">创建日期：</span>{{Info.create_time}}</div>
        <el-divider></el-divider>
        <div>所有成员：
          <div v-for="(item, index) in Info.coworkers" :key="index" class="coworkers">
            <el-avatar :src="item.userImg" :size="'small'"
                       style="cursor: pointer;vertical-align: middle;" @click.native="toUser(item.userId)"></el-avatar>
            <span style="height: 28px; padding-right: 15px;margin-left: 10px;" @click="toUser(item.userId)">{{item.userName}}</span>
            <i class="el-icon-user" v-if="item.isBuilder"></i>
            <el-link type="danger" style="position: absolute; right: 15px; top: 10px;"
                     @click="checkMove(item)" v-if="isCo">
              <span v-if="!item.isBuilder">移除</span>
<!--              <span v-else-if="!item.isBuilder&&isCo">退出</span>-->
            </el-link>
          </div>
        </div>
        <el-divider v-if="userId===Info.builderId+''"></el-divider>
<!--        <el-link plain type="primary" style="font-size: 16px;">分享</el-link>-->
        <div style=" margin-top: 20px;" v-if="userId===Info.builderId+''">
          <el-button plain type="danger" @click="Delete(Info.id)">
          解散团队
          </el-button>
        </div>
      </div>
    </el-dialog>

    <folder-dialog
        :dialog="folderDialog"
        @changeVisible="changeVisible"
        :doc-id="dialogTeam"
        :type="type"
        :name="NAME"></folder-dialog>
  </div>
</template>

<script>
  import {deleteDoc, fetchCoworkers, fetchTeams, removeCoworker} from "../api/api";
  import {GetTime} from "../main";

  export default {
    name: "myTeam",
    data(){
      return {
        isCo:false,
        webTitle:'团队空间',
        userId:localStorage.getItem('userId'),
        teams:[
          // {
          //   id: 1,
          //   name: '小学期1'
          // },
          // {
          //   id: 2,
          //   name: '小学期2'
          // }
        ],
        folderDialog : false,
        type: '',
        dialogTeam: '',
        Info:{
          id:1,
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
        isHover: false,
        NAME: '',
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        fetchTeams().then(res=>{
          if(res.status === 200){
            this.teams = []
            res.data.forEach(i=>{
              this.teams.push({
                id: i.id,
                name: i.name,
                create_time : GetTime(i.create_time),
                builder : i.create_user.username,
                builderId: i.create_user.id
              })
            })
          }
        })
      },
      toOneTeam(id){
        this.$router.push({name:'team', params: {teamId: id}})
      },
      changeVisible(val){
        this.folderDialog = val
        this.init()
      },
      newTeam(){
        this.type = 'newteam'
        this.folderDialog = true
      },
      addPeople(id){
        this.type = 'teamwork'
        this.dialogTeam = id
        this.teams.forEach(i=>{
          if(i.id +''=== id+''){
            this.NAME = i.name
            return ;
          }
        })
        console.log(this.NAME)
        this.folderDialog = true
      },
      handleClick(id){
        this.teams.forEach(i=>{
          if(i.id === id){
            this.Info = i
          }
        })
        fetchCoworkers(this.Info.id).then(res=>{
          this.Info.coworkers = []
          console.log(res.data)
          this.isCo = false;
          res.data.forEach((i, index) => {
            if(i.id+'' === this.userId){
              this.isCo = true
            }
            console.log(this.isCo)
            if(index === 0){
              this.Info.builder = i.username
              this.Info.builderId = i.id
            }
            this.Info.coworkers.push({
              userId: i.id,
              userName: i.username,
              userImg: i.head,
              isBuilder: i.role===1? true:false,
              role: i.role
            })
            console.log(i.id, this.Info.coworkers)
          })
          this.infoDialog = true
        }).catch(e => {this.$message({message: e.response.data, typd:'error'})})
      },
      Delete(id){
        if(this.userId === this.Info.builderId){
          let message = '确定要退出团队吗？'
          this.$confirm(message).then(()=>{
            removeCoworker(id, localStorage.getItem('userId')).then(res => {
              if(res.status === 200){
                this.$message({message:'退出团队成功', type: 'warning'})
              } else if(res.status == 204){
                this.$message({message:'发生其他错误，退出团队失败', type:'error'})
              }
            }).catch(e=>{
              if(e.response && e.response.status === 401){
                this.$message({message:'您没有删除权限或此人不在协作者中', type: 'error'})
              }
            })
          })
        } else{
          let message='确定要删除团队吗？'
          this.$confirm(message).then(() => {
            deleteDoc(id).then(res => {
              if(res.status === 204){
                this.$message({message:'删除团队成功', type: 'info'})
                this.init()
              }
            }).catch(e=>this.$message({message:e.response.data, type:'error'}))
            this.infoDialog = false
          })
        }
      },
      checkMove(item){
        let message = '确定要移除ta吗？'
        this.$confirm(message).then(() => {
          removeCoworker(this.Info.id, item.userId).then(res=>{
            if(res.status === 200){
              this.Info.coworkers = []
              res.data.forEach((i, index) => {
                if(index === 0){
                  this.Info.builder = i.username
                  this.Info.builderId = i.id
                }
                this.Info.coworkers.push({
                  userId: i.id,
                  userName: i.username,
                  userImg: i.head,
                  isBuilder: i.role===1? true:false,
                  role: i.role
                })
              })
              this.init()//好像不需要
              this.Dialog = false
              this.$message({message:'移除成功', type:'info'})
            } else {
              this.$message({message:'发生其他错误', type:'error'})
            }
          }).catch(e=>{
            if(e.response.status === 401){
              this.$message({message:'您没有删除权限或此人不在团队中', type: 'error'})
            }
          })
          this.infoDialog = false
        })
      },
      toUser(id){
        this.router.push({name:'PersonInfo', params:{PersonId: id}})
      }
    }
  }
</script>

<style scoped>
  .el-aside{
    width: 300px;
    /*height: calc(100vh - 50px);*/
  }
  .myTeams{
    background-color: whitesmoke;
    overflow-x: hidden;
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