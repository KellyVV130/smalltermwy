<template>
  <el-card style="width:500px">
    <el-container>
      <el-col span="3">
          <i class="el-icon-chat-square" style="margin-top:40%; margin-left:10px"></i>
      </el-col>
      <el-col style="margin-top:10px">
          <el-row><div class="title">{{name}}{{content}}</div></el-row>
          <el-row><div class="details">{{detail}}</div></el-row>
          <br>
          <el-row>
            <el-col span="14"><time class="time">{{date}}</time></el-col>
              <el-button type="text" icon="el-icon-view">查看</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" icon="el-icon-check">标为已读</el-button>
          </el-row>   
      </el-col>
    </el-container>
  </el-card>
</template>

<script>
export default {
    data(){
        return{
            circleUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            name: 'whisper',
            date: '2020/8/10',
            content: '评论了[小学期]',
            detail: '这是一条不走心的评论。'
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