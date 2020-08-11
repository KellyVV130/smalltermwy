<template>
  <div class="basic">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <h3>收件箱</h3><!--按修改日期倒序-->
        <div v-for="o in 2" :key="o">
        <mCard></mCard><br>
        </div>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
        <div><el-button type="primary">新建文档</el-button></div>
        <div><el-button type="primary">模板库</el-button></div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import messageCard from "../components/messageCard"
export default {
    components: {
        "mCard" : messageCard
    }
}
</script>

<style>
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