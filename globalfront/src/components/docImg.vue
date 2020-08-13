<template>
  <div class="docImg">
    <div v-if="type==='history'">
      <el-row :gutter="20">
        <el-col :span="4" v-for="(item, index) in tableData" :key="index" style="margin-bottom: 20px;">
          <div style="height: 110px;text-align: center">
            <el-card class="fileCard" shadow="hover">
              <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small">
                <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-s-tools" @click="handleClick(item.docId)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small">
                <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false">
                  <span slot="content"><span v-if="item.isCollected">取消</span>收藏</span>
                <i class="el-icon-star-on" v-if="item.isCollected" @click="changeColl(item.docId)"></i>
                <i class="el-icon-star-off" v-else @click="changeColl(item.docId)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 45px; font-size: x-small">
                <el-tooltip effect="dark" content="添加协作者" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-s-custom" @click="openFolderDialog(item.docId)"></i>
                </el-tooltip>
              </div>
              <div style="font-size: 40px;">
                <i class="el-icon-folder" v-if="item.isFolder"></i>
                <i class="el-icon-document" @click="toDoc(item.docId)" v-else></i>
              </div>
              <div @click="toDoc(item.docId)" style="cursor: pointer">{{item.docName}}</div>
              <div style="font-size: x-small; color: grey; margin-top: 15px;">
              {{item.readTime}}访问</div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-else-if="type === 'dustbin'">
      <el-row :gutter="20">
        <el-col :span="4" v-for="(item, index) in tableData" :key="index" style="margin-bottom: 20px;">
          <div style="height: 110px;text-align: center">
            <el-card class="fileCard" shadow="hover">
              <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small">
                <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-s-tools" @click="handleClick(item.id)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small">
                <el-tooltip effect="dark" content="恢复文档" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-refresh-right" @click="recover(item.id)"></i>
                </el-tooltip>
              </div>
              <div style="font-size: 40px; cursor: default;">
                <i class="el-icon-folder" v-if="item.isFolder"></i>
                <i class="el-icon-document" v-else></i>
              </div>
              <div @click="toDoc(item.id)" style="cursor: pointer">{{item.name}}</div>
              <div style="font-size: x-small; color: grey; margin-top: 12px;">
              删除于{{item.date}}</div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-else>
      <el-row :gutter="20">
        <el-col :span="4" v-for="(item, index) in tableData" :key="index" style="margin-bottom: 20px;">
          <div style="height: 110px;text-align: center">
            <el-card class="fileCard" shadow="hover">
              <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small">
                <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-s-tools" @click="handleClick(item.id)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small">
                <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false">
                  <span slot="content"><span v-if="item.isCollected">取消</span>收藏</span>
                <i class="el-icon-star-on" v-if="item.isCollected" @click="changeColl(item.id)"></i>
                <i class="el-icon-star-off" v-else @click="changeColl(item.id)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 45px; font-size: x-small">
                <el-tooltip effect="dark" content="添加协作者" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-s-custom" @click="openFolderDialog(item.id)"></i>
                </el-tooltip>
              </div>
              <div style="font-size: 40px;">
                <i class="el-icon-folder" v-if="item.isFolder"></i>
                <i class="el-icon-document" @click="toDoc(item.id)" v-else></i>
              </div>
              <div @click="toDoc(item.id)" style="cursor: pointer">{{item.name}}</div>
              <div style="font-size: x-small; color: grey; margin-top: 12px;">
              {{item.date}}最后修改</div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      title="文件详细信息"
      :visible.sync="Dialog"
      width="30%"
      center>
      <div style="">
        <div>文件名：{{Info.docName}}</div>
        <div style="cursor: pointer;">创建者：{{Info.builder}}</div>
        <div>创建日期：{{Info.create_time}}</div>
        <div>最后修改时间：{{Info.modify_time}}</div>
        <el-divider></el-divider>
        <div>协作者：
          <div v-for="(item, index) in Info.coworkers" :key="index" class="coworkers">
            <el-avatar :src="item.userImg" :size="'small'" style="cursor: pointer;vertical-align: sub;"></el-avatar>
            <span style="height: 28px; padding-right: 15px;margin-left: 10px;cursor: pointer;">{{item.userName}}</span>
            <i class="el-icon-user" v-if="item.isBuilder"></i>
            <el-link type="danger" style="position: absolute; right: 15px; top: 10px;"
                     @click="checkMove(item)" v-if="!item.isBuilder">
              移除</el-link>
          </div>
        </div>
        <el-divider></el-divider>
        <div><el-button plain type="primary" @click="setP(Info.id)">设置权限</el-button> </div>
        <div style=" margin-top: 20px;"><el-button plain type="success" @click="shareDialog(Info.id)">
          分享</el-button></div>
        <div style=" margin-top: 20px;"><el-button plain type="danger" @click="Delete(Info.id)">
          <span v-if="type==='dustbin'">彻底</span>删除
          </el-button>
        </div>
      </div>
    </el-dialog>

    <folder-dialog
        :dialog="folderDialog"
        @changeVisible="changeVisible"
        :doc-id="docId"
        :type="'coworker'"></folder-dialog>

    <share-dialog :share-dialog="shareV" :share-id="shareId" @changeVisible="changeShare"></share-dialog>
    <set-dialog :set-dialog="setV" :set-id="setId" @changeVisible="changeP" :visi="visi"></set-dialog>
  </div>
</template>

<script>
  import {fetchCoworkers, fetchDocInfo, fetchRecentDocs} from "../api/api";

  export default {
    name: "docImg",
    props:{
      type:{
        default: 'history'//'collection', 'build', 'dustbin', 'team'?
      }
    },
    data(){
      return{
        tableData: [
        // {
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   builder: '家',
        //   isCollected: false,
        //   id: 1,
        //   isFolder: false,
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   builder: '公司',
        //   isCollected: true,
        //   id: 2,
        //   isFolder: false,
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   builder: '家',
        //   isCollected: true,
        //   id: 3,
        //   isFolder: false,
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   builder: '公司',
        //   isCollected: true,
        //   id: 4,
        //   isFolder: false,
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   builder: '公司',
        //   isCollected: true,
        //   id: 5,
        //   isFolder: false,
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   builder: '公司',
        //   isCollected: true,
        //   id: 5,
        //   isFolder: false,
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   builder: '公司',
        //   isCollected: true,
        //   id: 5,
        //   isFolder: false,
        // }, {
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   builder: '公司',
        //   isCollected: true,
        //   id: 5,
        //   isFolder: false,
        // }
        ],
        Dialog: false,
        Info:{
          id: 1,
          builder: 'Kelly',
          coworkers:[
            {
              userId: 1,
              userName: 'Kelly',
              isBuilder: true,
              isCollected: true,
              userImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              userId: 2,
              userName: 'Kelly2',
              isBuilder: false,
              isCollected: true,
              userImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ],
          _public: false
        },
        folderDialog: false,
        docId: '1',
        shareId: '',
        shareV: false,
        setV: false,
        setId: '2',
        visi: 3,
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        if(this.type === 'history'){
          fetchRecentDocs().then(res=>{
            if(res.status === 200){
              if(res.data.length === 0){
                this.tableData = []
              }else{
              this.tableData = []
              res.data.forEach(i=>{
                this.tableData.push({
                  docId: i.document.id,
                  docName:i.document.name,
                  readTime: i.read_time
                })
              })}
            }
          }).catch(e=>{this.$message({message:e, type:'error'})})
        }
      },
      toDoc(id){
        this.$router.push({name:'editorPage', params: {docId: id}})
      },
      handleClick(id){
        // this.tableData.forEach(i =>{
        //   if(i.id === id){
        //     this.Info = i
        //     return;
        //   }
        // })
        this.getDocInfo(id)
        this.Dialog = true
      },
      Delete(id){
        let message = this.type === 'dustbin'?'确定要彻底删除它吗？':'确定要删除它吗？'
        this.$confirm(message).then(_ => {
          console.log(id+_)
          this.Dialog = false
        })
      },
      shareDialog(id){
        this.shareId = id
        this.shareV = true
      },
      changeShare(val){
        this.shareV = val
      },
      changeVisible(val){
        this.folderDialog = val
      },
      openFolderDialog(id){
        this.docId = id
        this.folderDialog = true
      },
      changeColl(id){
        this.tableData.forEach(i => {
          if(i.id === id){
            i.isCollected = !i.isCollected
            return;
          }
        })
      },
      recover(id){
        alert(id)
      },
      setP(id){
        console.log(id)
        this.setId = id
        this.tableData.forEach(i=>{
          if(i.id === id){
            this.visi = 0//权限码
            return;
          }
        })
        console.log(this.visi)
        this.setV = true
      },
      changeP(val){
        this.setV = val
      },
      checkMove(item){
        let message = '确定要移除ta吗？'
        this.$confirm(message).then(_ => {
          console.log(item+_)
        })
      },
      getDocInfo(id){
        fetchDocInfo(id).then(res=>{
          if(res.status === 200){
            console.log(res.data)
            this.Info.id = res.data.id
            this.Info.docName = res.data.name
            this.Info.role = res.data.role
            this.Info.isDoc = !res.data.type
            this.Info.modify_time = res.data.modify_time
            this.Info.create_time = res.data.create_time
            fetchCoworkers(this.Info.id).then(res=>{
              if(res.status === 200){
                this.Info.coworkers = []
                res.data.forEach((i, index) => {
                  if(index === 0){
                    this.Info.builder = i.username
                  }
                  this.Info.coworkers.push({
                    userId: i.id,
                    userName: i.username,
                    userImg: i.head,
                    isBuilder: index === 0? true:false
                  })
                  console.log(i.id, this.Info.coworkers)
                })
              }
            }).catch(e => console.log(e.response.data))
          } else if(res.status === 204){
            this.$message({message:'其他错误', type: 'error'})
          }
        }).catch(e=>{
          this.$message({message:e.response.data, type: 'error'})
        })
      },
    },
  }
</script>

<style>
  .docImg{
    height: 80vh;
  }
  .fileCard{
    border: 0px;
    transition: .3s;
    height: 100%;
    background-color:rgba(0,0,0,0);
    position: relative;
  }
  .fileCard /deep/ .el-card__body{
    padding: 0;
  }
  .fileCard i{
    cursor: pointer;
  }
  .coworkers {
    margin-top: 15px;
    position: relative;
  }
</style>