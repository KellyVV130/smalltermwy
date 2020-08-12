<template>
  <div class="oneTeam">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <div style="position: relative">
          <el-page-header @back="goBack">
            <span slot="content">{{teamName}}</span>
          </el-page-header>
          <span style="position: absolute; right: 0;top: 0;">
            <el-radio-group v-model="chart" size="small" @change="changeChart">
              <el-radio-button label="列表"></el-radio-button>
              <el-radio-button label="图标"></el-radio-button>
            </el-radio-group>
          </span>
        </div><!--按修改日期倒序-->
        <div style="margin-top: 40px;">
          <doc-list :type="'team'" v-if="chart === '列表'"></doc-list>
          <doc-img :type="'team'" v-else></doc-img>
        </div>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
        <div><el-button plain type="primary" @click="toNewDoc">新建文档</el-button></div>
<!--        <div><el-button plain type="primary" disabled>新建文件夹</el-button></div>-->
        <div><el-button plain type="primary">模板库</el-button></div>
        <div v-if="isBuilder">
          <el-button plain type="primary">管理团队</el-button>
        </div>
        <div>
          <el-button plain type="danger" v-if="isBuilder">解散团队</el-button>
          <el-button plain type="danger" v-else>退出团队</el-button>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "oneTeam",
    data(){
      return {
        teamName: '团队1',
        chart: '',
        isBuilder: false
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
      goBack(){
        this.$router.push({name:'myTeam'})
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
  .oneTeam{
    background-color: whitesmoke;
  }
  .el-button{
    width: 150px;
  }
</style>