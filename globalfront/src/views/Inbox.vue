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
        <div><el-button type="warning" plain>全部已读</el-button></div>
        <div><el-button type="primary" plain>查看未读</el-button></div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import messageCard from "../components/messageCard"
export default {
  data() {
    return {
      messages: [{
        type: 'comment', 
        name: 'whisper', 
        content: '评论了[小学期]', 
        detail: '这是一条不走心的评论',
        date: '2020/8/10'
      },{
        type: 'add', 
        name: 'whisper', 
        content: '添加你为[小学期]协作者', 
        detail: '',
        date: '2020/8/13'
      }]
    }
  },
  components: {
    "messageCard": messageCard
  }
}
</script>

<style scope>
  .basic{
    position: fixed;
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