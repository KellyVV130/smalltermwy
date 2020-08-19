<template>
<div class="welcome">
  <video id="v1" autoplay loop muted>
    <source src="../assets/welcome.mp4" type="video/mp4"  />
  </video> 
</div>
</template>

<script>
export default {
  data(){
    var video= document.getElementById('v1');
    video.playbackRate = 1.5;
    return{
      time:''
    }
  },
  methods:{
    toLogin(){
      if(this.$route.params.redirect){
        console.log('login',this.$route.params.redirect)
        this.$router.push({name:"Login", params:{redirect:this.$route.params.redirect}})
      } else
        this.$router.push({path:"/Login"})
      },
    },
    mounted(){
      this.time=setInterval(this.toLogin,6500)
    },
    beforeDestroy(){
      clearInterval(this.time)
    }
}
</script>

<style scoped>
.welcome{
  position: fixed;
  margin-top: -50px;
  background-color: black;
}

.el-button{
  position: absolute;
  padding: 10px;
  z-index: 100;
  margin-bottom: 0px;
  float: center;
  width: 600px;
}
.second{
  margin-bottom: 0px;
  float: center;
  position: absolute;
}
*{  
    margin: 0px;  
    padding: 0px;  
}  
video{  
    position: fixed;  
    right: 0px;  
    bottom: 0px;
    width: 100%;
    height: 100%;
     
    /*加滤镜*/
    /*filter: blur(15px); //背景模糊设置 */
    /*-webkit-filter: grayscale(100%);*/  
    /*filter:grayscale(100%); //背景灰度设置*/  
    z-index:100;
  background-color: black;
}  
source{  
    width: 100%;  
    height: 100%;  
}


</style>