<template>
  <div class="templateHub" v-web-title="{title:'模板库'}">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col>
    <el-container>
      <el-main>
        <div style="margin-top: 20px;position: relative;">
          <span style="width: 50%; font-size: 1.17em; font-weight: bold">模板库</span>
          <span style="position: absolute;right: 0px;top: -10px;">
            <el-input v-model="tempName" placeholder="搜索模板" @keyup.native.enter="doSearch">
              <i slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer;" @click="doSearch"></i>
            </el-input>
          </span>
          <div style="margin-top: 30px;"><!--这里放模板卡片，有缩略图和模板名-->
            <el-row :gutter="20">
              <el-col :span="6" v-for="(item, index) in temps" :key="index" style="margin-bottom: 30px;">
                  <temp-card :temp="item"></temp-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {fetchTemplates} from "../api/api";

  export default {
    name: "templateHub",
    data(){
      return{
        tempName: '',
        temps:[
          {
            id:1,
            img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '答辩模板'
          },{
            id:2,
            img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '答辩模板'
          },{
            id:3,
            img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            name: '答辩模板'
          },
        ]
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(keywords = "", ordering = "name"){
        console.log('template')
        fetchTemplates(keywords, ordering).then(res=>{
          if(res.status === 200){
            console.log(res.data)
            this.temps = []
            res.data.forEach(i => {
              this.temps.push({
                id: i.id,
                name: i.name,
                img: i.thumbnail
              })
            })
          }
        }).catch(e=>this.$message({message:e, type:'error'}))
      },
      doSearch(){
        this.init(this.tempName)
      }
    }
  }
</script>

<style scoped>
  .el-aside{
    width: 300px;
    height: calc(100vh - 50px);
  }
  .templateHub{
    background-color: whitesmoke;
  }
  .el-button{
    width: 150px;
  }
  .el-main{
    background-color: whitesmoke;
    margin-right: 300px;
    height: calc(100vh - 50px);
  }
</style>