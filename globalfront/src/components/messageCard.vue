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
      </el-col>
      <el-col style="margin-top:10px">
          <el-row><div class="title">{{item.origin_user}}{{item.content}}</div></el-row>
          <el-row><div class="details">{{item.detail}}</div></el-row>
          <br>
          <el-row>
            <el-col span="14"><time class="time">{{item.time}}</time></el-col>
              <el-button type="text" icon="el-icon-close" @click="deleteMessage(item.id)">删除</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button v-if="item.status===0" type="text" icon="el-icon-check" @click="readMessage(item.id,item.status)">标为已读</el-button>
              <el-button v-if="item.status===1" type="text" disabled="true">已读</el-button>
          </el-row>   
      </el-col>
    </el-container>
  </el-card>
  <br>
</div></div>
</template>

<script>
import {readMessage, deleteMessage} from '../api/api'
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