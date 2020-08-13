<template>
  <div class="myBuild">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <div style="margin-top: 20px;">
          <span style="width: 50%; font-size: 1.17em; font-weight: bold">我创建的</span>
          <span style="float: right;">
            <el-radio-group v-model="chart" size="small" @change="changeChart">
              <el-radio-button label="列表"></el-radio-button>
              <el-radio-button label="图标"></el-radio-button>
            </el-radio-group>
          </span>
        </div>
        <!--按日期倒序-->
        <div style="margin-top: 30px;">
          <doc-list :type="'build'" v-if="chart === '列表'"></doc-list>
          <doc-img :type="'build'" v-else></doc-img>
        </div>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
        <div><el-button plain type="primary" @click="toNewDoc">新建文档</el-button></div>
<!--        <div><el-button plain type="primary" disabled>新建文件夹</el-button></div>-->
        <div><el-button plain type="primary" @click="toTemplate">模板库</el-button></div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "myBuild",
    data(){
      return{
        chart: ""
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        if(localStorage.getItem('chart')){
          this.chart = localStorage.getItem('chart')
        } else {
          this.chart = '图标'
        }
      },
      toNewDoc(){
        this.$router.push({name:'editorPage'})
      },
      changeChart(value){
        this.chart = value
        localStorage.setItem('chart', value)
      },
      toTemplate(){
        this.$router.push({name:'templates'})
      },
    }
  }
</script>

<style scoped>
  .el-aside{
    width: 300px;
    height: calc(100vh - 50px);
  }
  .myBuild{
    background-color: whitesmoke;
  }
  .el-button{
    width: 150px;
  }
</style>