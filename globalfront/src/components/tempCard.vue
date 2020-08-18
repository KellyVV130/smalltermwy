<template>
  <div class="tempCard">
    <el-card class="teCard" shadow="hover" :body-style="{ padding: '0px' }">
      <div class="imgDiv" style="cursor: pointer;" @click="toNewDoc">
        <img :src="temp.img">
      </div>
      <span style="font-size: 15px;margin-top: 20px;cursor: pointer" @click="toNewDoc">{{temp.name}}</span>
    </el-card>
  </div>
</template>

<script>
  import {createDoc} from "../api/api";

  export default {
    name: "tempCard",
    props:{
      temp:{
        default:function(){
          return{
            id:0,
            img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '人力资源模板',
            teamId:''
          }
        }
      }
    },
    methods:{
      toNewDoc(){
        if(this.$route.params.teamId){
          this.teamId = this.$route.params.teamId
        } else {
          this.teamId = null
        }
        createDoc(0,this.temp.name,this.teamId,"",this.temp.id).then(res=>{
          if(res.status === 201){
            this.$message({message:'新建文档成功', type:'info'})
            this.$router.push({name:'editorPage', params:{docId:res.data.id}})
          }
        }).catch(e=>{
          if(e.response.status === 401){
            this.$message({message:'您没有权限', type: 'error'})
          }
        })
      }
    }
  }
</script>

<style scoped>
  .teCard {
    border: 0;
    text-align: center;
    transition: .3s;
    background-color: rgba(0, 0, 0, 0);
    position: relative;
    height: 180px;
  }
  .imgDiv{
    width:70%;
    height:0px;
    margin:0 auto;
    padding-bottom:70%;
    position:relative;
    margin-bottom: 20px;
  }
  .imgDiv img{
    border-radius: 10px;
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    top:0;
  }
</style>