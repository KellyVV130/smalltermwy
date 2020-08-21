<template>
<div>
  <div v-for="item in messages" :key="item.label">
  <el-card  style="width:500px">
    <el-container>
      <el-col span="3">
          <i v-if="item.type===1" class="el-icon-user" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type===2" class="el-icon-s-comment" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type===3" class="el-icon-close" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type===4" class="el-icon-error" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type===5" class="el-icon-user" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type===6" class="el-icon-chat-line-round" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type===7" class="el-icon-chat-round" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type===8" class="el-icon-close" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type===9" class="el-icon-error" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type===10" class="el-icon-circle-close" style="margin-top:40%; margin-left:10px"></i>
      </el-col>
      <el-col style="margin-top:10px">
          <el-row><div class="title">{{item.origin_user.username}}{{item.content}}</div></el-row>
          <el-row><div class="details">{{item.document.name}}</div></el-row>
          <br>
          <el-row>
            <el-col span="10"><time class="time">{{item.time}}</time></el-col>
            <el-col span="14" margin-left="200px">
              <el-button  type="text" icon="el-icon-view" @click="viewMessage(item)">查看</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" icon="el-icon-close" @click="deleteMessage(item.id)">删除</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button v-if="item.status===0" type="text" icon="el-icon-check" @click="readMessage(item.id,item.status)">标为已读</el-button>
              <el-button v-if="item.status===1" type="text" disabled="true">已读</el-button>
            </el-col>
          </el-row>   
      </el-col>
    </el-container>
  </el-card>
  <br>
</div></div>
</template>

<script>
import {readMessage, deleteMessage, acceptInvitation, refuseInvitation} from '../api/api'
export default {
  name: 'messageCard',
  props: {
    messages: {
      type: Array,
      required: true
    }
  },
  methods: {
    //单个消息已读
    readMessage(messageId,messageStatus){
      if(messageStatus===1) messageStatus=0
      else if(messageStatus===0) messageStatus=1
      readMessage(messageId,messageStatus).then(response => {
        if(response.status===200){
          console.log(response)
        }else{
          console.log(response)
        }
      })
      this.$emit('getChangeFromSon')
    },
    //单个消息删除
    deleteMessage(messageId){
      deleteMessage(messageId).then(response => {
        if(response.status===200){
          console.log(response)
        }else{
          console.log(response)
        }
      })
      this.$emit('getChangeFromSon')
    },
    //查看详细信息
    viewMessage(item){
      item.status=1
      this.readMessage(item.id, 0)
      if(item.type===1){//1:团队邀请信息（给被邀请人发） 接受或拒绝
        this.$confirm('是否接受邀请加入该团队？','团队邀请',{
          confirmButtonText:'接受',
          cancelButtonText:'拒绝',
          type:'info'
        }).then(()=>{
          acceptInvitation(item.document.id,item.user.id).then(response =>{
            if(response.status===200){
              this.$message({
                type:'success',
                message: '成功加入团队'
              })
            }
          }).catch(() => {
            this.$message({
              type:'error',
              message: '加入团队失败'
            })
          })
        }).catch(()=>{
          refuseInvitation(item.document.id,item.user.id).then(response => {
            if(response.status===200){
              this.$message({
                type:'success',
                message: '成功拒绝该团队邀请'
              })
            }
          }).catch(() => {
            this.$message({
              type:'error',
              message: '拒绝团队邀请失败'
            })
          })
        })
      }else if(item.type===2){//2:加入团队结果（给邀请人+老大发）
        this.$router.push({name: 'myTeam'})
      }else if(item.type===3){//3:退出团队结果（给老大发）
        this.$message({
          message: item.origin_user.username+'已退出团队',
          type: 'info'
        })
      }else if(item.type===4){//4:被踢出团队提醒（给被踢的人发）
        this.$message({
          message: '你已被移出团队['+item.document.name+']',
          type: 'info'
        })
      }else if(item.type===5){//5:被加入协作者提醒（给被邀请人发）
        this.$router.push({name:'editorPage', params: {docId: item.document.id}})
      }else if(item.type===6){//6:文档被评论（给被评论的文档的创建者+协作者发）
        this.$router.push({name:'editorPage', params: {docId: item.document.id}})
      }else if(item.type===7){//7:评论被回复（给被回复的评论人发）
        this.$router.push({name:'editorPage', params: {docId: item.document.id}})
      }else if(item.type===8){//8:退出文档协作者结果（给创建者发）
        this.$router.push({name:'editorPage', params: {docId: item.document.id}})
      }else if(item.type===9){//9：被踢出文档协作者提醒（给被踢的人发）
        this.$message({
          message: '你已被移出文档['+item.document.name+']协作者',
          type: 'info'
        })
      }else if(item.type===10){//10: 拒绝团队邀请（给老大发）
        this.$message({
          message: item.origin_user.username+'拒绝加入团队['+item.document.name+']',
          type: 'info'
        })
      }
    }
  }
}
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .title {
      font-size: 16px;
      line-height: 20px;
      font-weight: 600;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }

  .details {
      font-size: 14px;
      line-height: 20px;
      font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  }
</style>