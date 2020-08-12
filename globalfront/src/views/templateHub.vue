<template>
  <div class="templateHub">
    <el-container>
      <el-main>
        <div style="margin-top: 20px;">
          <span style="width: 50%; font-size: 1.17em; font-weight: bold">模板库</span>
          <span style="float: right;">
            <el-input v-model="tempName" placeholder="搜索模板" @keyup.native.enter="doSearch">
              <i slot="suffix" class="el-input__icon el-icon-search" style="cursor: pointer;" @click="doSearch"></i>
            </el-input>
          </span>
          <div><!--这里放模板卡片，有缩略图和模板名-->

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
        tempName: ''
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
    margin: 0 300px;
    height: calc(100vh - 50px);
  }
</style>