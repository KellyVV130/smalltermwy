<template>
  <div class="basic">
    <el-divider content-position="center">欢 迎 使 用 环 球 文 档 G l o b a l D o c</el-divider>
    <div class="block">
      <el-carousel height="400px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-button type="primary" @click="toLogin">登录</el-button>
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


<style>
  .basic{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: whitesmoke;
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
</style>