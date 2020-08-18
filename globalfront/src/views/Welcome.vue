<template>
<div class="test">
  <el-container>
    <el-main>
        <div class="block">
        <el-carousel :interval="5000" arrow="always" height="450px">
            <el-carousel-item v-for="(img,index) in imgList" :key="index">
            <img :src="img.url" style="width:100%">
            </el-carousel-item>
        </el-carousel>
        </div>
    </el-main>
    <el-aside width="400px">
        <img :src=iconUrl height="250px" style="margin-top:100px; ">
        <el-button @click="toLogin" style="margin-top:50px; padding:10px">由 此 进 入 环 球 文 档 G l o b a l D o c</el-button>
    </el-aside>
  </el-container>
</div>
</template>

<script>
export default {
  data(){
    return{
      iconUrl: require('../assets/icon.png'),
      imgList:[
        {url:require('../assets/11.png')},
        {url:require('../assets/12.png')},
        {url:require('../assets/13.png')},
        {url:require('../assets/14.png')},
        {url:require('../assets/15.png')}
      ]
    }
  },
  methods:{
    toLogin(){
      if(this.$route.params.redirect){
        this.$router.push({name:"Login", params:{redirect:this.$route.params.redirect}})
      } else
      this.$router.push({path:"/Login"})
    },
  }
}
</script>

<style scoped>
.test{
    position: fixed;
    width: 100vw;
    height: 100%;
    text-align: center;
    margin-top: -50px;
    z-index: 100;
    background-color: whitesmoke;
  }

  .el-main{
    overflow: hidden;
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .block{
    overflow: hidden;
    margin:60px auto;
    width: 800px;
    
  }
</style>