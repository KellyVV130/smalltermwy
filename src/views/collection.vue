<template>
  <div class="collection">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <h3>我的收藏夹</h3><!--按修改日期倒序-->
        <div><doc-list :type="'collection'"></doc-list></div>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
        <div><el-button type="primary">新建文档</el-button></div>
        <div><el-button type="primary">模板库</el-button></div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "collection",
  }
</script>

<style scoped>
  .el-aside{
    width: 300px;
    height: calc(100vh - 50px);
  }
  .collection{
    background-color: whitesmoke;
  }
  .el-button{
    width: 150px;
  }
</style>