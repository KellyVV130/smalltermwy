<template>
  <div class="basic">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <h3>收件箱</h3><!--按修改日期倒序-->
        <div>
        <messageCard v-bind:messages="messages"></messageCard><br>
        </div>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
        <div><el-button type="warning" plain @click="readAll">全部已读</el-button></div>
        <div><el-button v-if="ifGetAllMessage===true" type="primary" plain @click="getMessage">查看未读</el-button></div>
        <div><el-button v-if="ifGetAllMessage===false" type="primary" plain @click="getAllMessage">查看全部</el-button></div>
        <div><el-button type="warning" plain @click="deleteAll">全部删除</el-button></div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import messageCard from "../components/messageCard"
import {getAllMessage, getMessage,readAllMessage,deleteAllMessage} from '../api/api'
import { GetTime } from '../main'
export default {
  data() {
    return {
      ifGetAllMessage: true,
      messages: [
      {
      id: 15,
      user: {
        id: 1,
        username: "1",
        head: null
      },
      origin_user: {
        id: 2,
        username: "1679",
        head: null
      },
      document: {
        id: 1,
        name: "测试"
      },
      time: "2020-08-15T22:03:10.828014",
      type: 6,
      status: 1
      },
      {
      id: 15,
      user: {
        id: 1,
        username: "1",
        head: null
      },
      origin_user: {
        id: 2,
        username: "1679",
        head: null
      },
      document: {
        id: 1,
        name: "测试"
      },
      time: "2020-08-15T22:03:10.828014",
      type: 6,
      status: 1
      },
      {
      id: 15,
      user: {
        id: 1,
        username: "1",
        head: null
      },
      origin_user: {
        id: 2,
        username: "1679",
        head: null
      },
      document: {
        id: 1,
        name: "测试"
      },
      time: "2020-08-15T22:03:10.828014",
      type: 6,
      status: 1
      },
      {
      id: 15,
      user: {
        id: 1,
        username: "1",
        head: null
      },
      origin_user: {
        id: 2,
        username: "1679",
        head: null
      },
      document: {
        id: 1,
        name: "测试"
      },
      time: "2020-08-15T22:03:10.828014",
      type: 6,
      status: 1
      }
      ]
    }
  },
  components: {
    "messageCard": messageCard
  },
  methods: {
    //查看所有消息
    getAllMessage(){
        getAllMessage().then(response => {
          if(response.status===200){
            this.ifGetAllMessage=true
            console.log(response)
            this.messages=response.data
            for(var i=0;i<this.messages.length;i++){
              this.messages[i].time=GetTime(this.messages[i].time,'.')
              if(this.messages[i].type===1){//1:团队邀请信息（给被邀请人发）
                this.messages[i].content='邀请你加入团队'
              }else if(this.messages[i].type===2){//2:加入团队结果（给邀请人+老大发）
                this.messages[i].content='回复了你的团队邀请'
              }else if(this.messages[i].type===3){//3:退出团队结果（给老大发）
                this.messages[i].content='退出了团队'
              }else if(this.messages[i].type===4){//4:被踢出团队提醒（给被踢的人发）
                this.messages[i].content='将你移出团队'
              }else if(this.messages[i].type===5){//5:被加入协作者提醒（给被邀请人发）
                this.messages[i].content='邀请你成为协作者'
              }else if(this.messages[i].type===6){//6:文档被评论（给被评论的文档的创建者+协作者发）
                this.messages[i].content='评论了你的文档'
              }else if(this.messages[i].type===7){//7:评论被回复（给被回复的评论人发）
                this.messages[i].content='回复了你的评论'
              }else if(this.messages[i].type===8){//8:退出文档协作者结果（给创建者发）
                this.messages[i].content='退出了文档协作者'
              }else if(this.messages[i].type===9){//9：被踢出文档协作者提醒（给被踢的人发）
                this.messages[i].content='将你移出文档协作者'
              }
            }
          }
        })
      },
    //查看未读消息
    getMessage(){
      getMessage().then(response => {
          if(response.status===200){
            this.ifGetAllMessage=false
            console.log(response)
            this.messages=response.data
            for(var i=0;i<this.messages.length;i++){
              this.messages[i].time=GetTime(this.messages[i].time,'.')
              if(this.messages[i].type===1){//1:团队邀请信息（给被邀请人发）
                this.messages[i].content='邀请你加入团队'
              }else if(this.messages[i].type===2){//2:加入团队结果（给邀请人+老大发）
                this.messages[i].content='回复了你的团队邀请'
              }else if(this.messages[i].type===3){//3:退出团队结果（给老大发）
                this.messages[i].content='退出了团队'
              }else if(this.messages[i].type===4){//4:被踢出团队提醒（给被踢的人发）
                this.messages[i].content='将你移出团队'
              }else if(this.messages[i].type===5){//5:被加入协作者提醒（给被邀请人发）
                this.messages[i].content='邀请你成为协作者'
              }else if(this.messages[i].type===6){//6:文档被评论（给被评论的文档的创建者+协作者发）
                this.messages[i].content='评论了你的文档'
              }else if(this.messages[i].type===7){//7:评论被回复（给被回复的评论人发）
                this.messages[i].content='回复了你的评论'
              }else if(this.messages[i].type===8){//8:退出文档协作者结果（给创建者发）
                this.messages[i].content='退出了文档协作者'
              }else if(this.messages[i].type===9){//9：被踢出文档协作者提醒（给被踢的人发）
                this.messages[i].content='将你移出文档协作者'
              }
            }
          }
        })
    },
    //全部已读
    readAll(){
      readAllMessage(localStorage.userId).then(response => {
        if(response.status===200){
          console.log(response)
          this.getAllMessage()
        }else{
          console.log(response)
        }
      })
    },
    //全部删除
    deleteAll(){
      deleteAllMessage(localStorage.userId).then(response => {
        if(response.status===200){
          console.log(response)
          this.getAllMessage
        }else{
          console.log(response)
        }
      })
    }
  },
  mounted(){
    //this.ifGetAllMessage=true
    this.getAllMessage()
  },
  watch:{
    messages: {
      handler(oldValue,newValue){
        console.log(oldValue)
        console.log(newValue)
        if(oldValue!==newValue){
          if(this.ifGetAllMessage===true) this.getAllMessage()
          else if(this.ifGetAllMessage===false) this.getMessage()
        }
      },
      deep:true,
    }
  }
}
</script>

<style scope>
  .basic{
    
    width: 100%;
    height: 100%;
    background-color: whitesmoke;
  }

  .el-aside{ 
    width: 300px;
    height: calc(100vh - 50px);
  }

  .el-aside .el-button{
      width: 150px;
  }
</style>