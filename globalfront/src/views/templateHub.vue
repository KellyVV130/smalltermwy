<template>
  <div class="templateHub">
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
              <el-col :span="6" v-for="(item, index) in 6" :key="index" style="margin-bottom: 30px;">
                  <temp-card :temp="temp"></temp-card>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "templateHub",
    data(){
      return{
        tempName: '',
        temp:{
          img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          name: '答辩模板'
        }
      }
    },
    methods:{
      doSearch(){
        console.log(this.tempName)
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