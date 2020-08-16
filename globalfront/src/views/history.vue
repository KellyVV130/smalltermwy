<template>
  <div class="history" v-web-title="{title:webTitle}">
    <el-col :span="4">
      <work-space></work-space>
    </el-col>
    <el-col :span="20"></el-col><el-container>
      <el-main>
        <div style="margin-top: 20px;">
          <span style="width: 50%; font-size: 1.17em; font-weight: bold">最近浏览</span>
          <span style="float: right;">
            <el-radio-group v-model="chart" size="small" @change="changeChart">
              <el-radio-button label="列表"></el-radio-button>
              <el-radio-button label="图标"></el-radio-button>
            </el-radio-group>
          </span>
        </div>
        <!--按日期倒序-->
        <div style="margin-top: 30px;">
          <doc-list :type="'history'" v-if="chart === '列表'"></doc-list>
          <doc-img :type="'history'" v-else></doc-img>
        </div>
      </el-main>
      <el-aside style="text-align: center; padding: 50px; line-height: 80px;">
        <div><el-button plain type="primary" @click="toNewDoc">新建文档</el-button></div>
<!--        <div><el-button plain type="primary" @click="folderDialog = true" disabled>新建文件夹</el-button></div>-->
        <folder-dialog :dialog-form-visible="folderDialog" @changeVisible="changeVisible"></folder-dialog>
        <div><el-button plain type="primary" @click="toTemplate">模板库</el-button></div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
  import {createDoc, fetchRecentDocs} from "../api/api";

  export default {
    name: "history",
    data(){
      return{
        webTitle:'最近浏览',
        chart: "",
        folderDialog: false,
        docList:[]
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        fetchRecentDocs(1).then(res=>{
          if(res.status === 200){
            if(res.data.length === 0){
              this.docList = []
            }else{
            res.data.forEach(i=>{
              this.docList = []
              this.docList.push({
                docId: i.document.id,
                docName:i.document.name,
                readTime: i.read_time
              })
            })}
          }
        }).catch(e=>{this.$message({message:e, type:'error'})})
        if(localStorage.getItem('chart')){
          this.chart = localStorage.getItem('chart')
        } else {
          this.chart = '图标'
        }
      },
      toNewDoc(){
        createDoc(0).then(res=>{
          if(res.status === 201){
            this.$message({message:'新建文档成功', type:'info'})
            this.$router.push({name:'editorPage'})
          }
        }).catch(e=>{
          if(e.response.status === 401){
            this.$message({message:'您没有权限', type: 'error'})
          }
        })
      },
      changeChart(value){
        this.chart = value
        localStorage.setItem('chart', value)
      },
      changeVisible(val){
        this.folderDialog = val
      },
      toTemplate(){
        this.$router.push({name:'templates'})
      }
    }
  }
</script>

<style scoped>
  .el-aside{
    width: 300px;
    height: calc(100vh - 50px);
  }
  .history{
    background-color: whitesmoke;
  }
  .el-button{
    width: 150px;
  }
</style>