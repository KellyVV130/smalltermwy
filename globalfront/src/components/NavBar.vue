<template>
  <div>
    <el-menu
      :default-active="defaultIndex"
      @open="handleOpen"
      @close="handleClose"
      router
      :default-openeds="opends"
      class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-s-grid"></i>
          <span>工作台</span>
        </template>
        <el-menu-item index="/">
          <template slot="title">
            <i class="el-icon-time"></i>
            <span>最近浏览</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/collection">
          <template slot="title">
            <i class="el-icon-star-off"></i>
            <span>收藏夹</span>
          </template>
        </el-menu-item>
        <el-menu-item index="/myBuild">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span>我创建的</span>
          </template>
        </el-menu-item>
        <el-menu-item index="myTeam">
          <template slot="title">
            <i class="el-icon-pie-chart"></i>
            <span>团队空间</span>
          </template>
        </el-menu-item>
        <el-menu-item index="1-5">
          <template slot="title">
            <i class="el-icon-delete"></i>
            <span>回收站</span>
          </template>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item index="2-1">
          <template slot="title">
            <i class="el-icon-warning-outline"></i>
            <span>账号信息</span>
          </template>
        </el-menu-item>
        <el-menu-item index="2-2">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span>收件箱</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    data(){
      return{
        defaultIndex: this.$route.path,
        opends: ['1', '2']
      }
    },
    methods:{
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: calc(100vh - 50px);
  }
</style>