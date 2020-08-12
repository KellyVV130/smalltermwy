<template>
  <div class="dustbin">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <div style="margin-top: 20px;">
          <span style="width: 50%; font-size: 1.17em; font-weight: bold">回收站</span>
          <span style="float: right;">
            <el-radio-group v-model="chart" size="small" @change="changeChart">
              <el-radio-button label="列表"></el-radio-button>
              <el-radio-button label="图标"></el-radio-button>
            </el-radio-group>
          </span>
        </div>
        <!--按日期倒序-->
        <div style="margin-top: 30px;">
          <doc-list :type="'dustbin'" v-if="chart === '列表'"></doc-list>
          <doc-img :type="'dustbin'" v-else></doc-img>
        </div>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
        <div><el-button plain type="danger">清空回收站</el-button></div>
        <div><el-button plain type="warning">全部恢复</el-button></div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "dustbin",
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
    }
  }
</script>

<style scoped>
  .el-aside{
    width: 300px;
    height: calc(100vh - 50px);
  }
  .dustbin{
    background-color: whitesmoke;
  }
  .el-button{
    width: 150px;
  }
</style>