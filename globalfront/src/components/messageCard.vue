<template>
<div>
  <div v-for="item in messages" :key="item.label">
  <el-card  style="width:500px">
    <el-container>
      <el-col span="3">
          <i v-if="item.type==='comment'" class="el-icon-chat-square" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type==='delete'" class="el-icon-close" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type==='share'" class="el-icon-share" style="margin-top:40%; margin-left:10px"></i>
          <i v-if="item.type==='add'" class="el-icon-user" style="margin-top:40%; margin-left:10px"></i>
      </el-col>
      <el-col style="margin-top:10px">
          <el-row><div class="title">{{item.name}}{{item.content}}</div></el-row>
          <el-row><div class="details">{{item.detail}}</div></el-row>
          <br>
          <el-row>
            <el-col span="14"><time class="time">{{item.date}}</time></el-col>
              <el-button type="text" icon="el-icon-view">查看</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" icon="el-icon-check">标为已读</el-button>
          </el-row>   
      </el-col>
    </el-container>
  </el-card>
  <br>
</div></div>
</template>

<script>
export default {
  name: 'messageCard',
  props: {
    messages: {
      type: Array,
      required: true
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