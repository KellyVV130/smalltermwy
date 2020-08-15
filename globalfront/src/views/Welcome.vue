<template>
  <div class="welcome">
    <el-divider content-position="center">
      <span style="font-size: 34px;">欢 迎 使 用 环 球 文 档 G l o b a l D o c</span>
    </el-divider>
    <div class="block">
      <el-carousel height="400px; width:70%;">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-button type="primary" @click="toLogin" style="margin: 0 auto;">登录</el-button>
  </div>
</template>

<script>
export default {
  methods:{
    toLogin(){
      this.$router.push({path:"/Login"})
    }
  }
}
</script>


<style scope>
  .welcome{
    position: fixed;
    width: 100vw;
    height: 100%;
    background-color: whitesmoke;
    text-align: center;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .block{
    margin:100px auto;
    width: 70vw;
  }
</style>