<template>
  <div class="docImg">
    <div v-if="type==='history'">
      <el-row :gutter="20">
        <el-col :span="4" v-for="(item, index) in tableData" :key="index" style="margin-bottom: 20px;">
          <div style="height: 110px;text-align: center">
            <el-card class="fileCard" shadow="hover" @mouseenter.native="isHover = true" @mouseleave.native="isHover=false">
              <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small" v-if="isHover">
                <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-s-tools" @click="handleClick(item.docId)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small" v-if="isHover">
                <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false">
                  <span slot="content"><span v-if="item.isCollected">取消</span>收藏</span>
                <i class="el-icon-star-on" v-if="item.isCollected" @click="changeColl(item.docId)"></i>
                <i class="el-icon-star-off" v-else @click="changeColl(item.docId)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 45px; font-size: x-small" v-if="isHover">
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
            <el-card class="fileCard" shadow="hover" @mouseenter.native="isHover = true" @mouseleave.native="isHover=false">
              <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small" v-if="isHover">
                <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-s-tools" @click="handleClick(item.id)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small" v-if="isHover">
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
              删除于{{item.deleteTime}}</div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-else>
      <el-row :gutter="20">
        <el-col :span="4" v-for="(item, index) in tableData" :key="index" style="margin-bottom: 20px;">
          <div style="height: 110px;text-align: center">
            <el-card class="fileCard" shadow="hover" @mouseenter.native="isHover = true" @mouseleave.native="isHover=false">
              <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small" v-if="isHover">
                <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-s-tools" @click="handleClick(item.id)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small" v-if="isHover">
                <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false">
                  <span slot="content"><span v-if="item.isCollected">取消</span>收藏</span>
                <i class="el-icon-star-on" v-if="item.isCollected" @click="changeColl(item.id)"></i>
                <i class="el-icon-star-off" v-else @click="changeColl(item.id)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 45px; font-size: x-small" v-if="isHover">
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
        <div><span style="width: 40px;">文件名：</span>{{Info.docName}}</div>
        <div style="cursor: pointer;"><span style="width: 40px;">创建者：</span>{{Info.builder}}</div>
      <div><span style="width: 40px;">创建日期：</span>{{Info.create_time}}</div>
      <div><span style="width: 40px;">最后修改时间：</span>{{Info.modify_time}}</div>
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
        :type="'coworker'"
    :name="NAME"></folder-dialog>

    <share-dialog :share-dialog="shareV" :share-id="shareId" @changeVisible="changeShare" :share-name="NAME"></share-dialog>
    <set-dialog :set-dialog="setV" :set-id="setId" @changeVisible="changeP" :visi="visi" :set-name="NAME" :is-team="isTeam"></set-dialog>
  </div>
</template>

<script>
  import {
    fetchCoworkers,
    fetchDocInfo,
    fetchDustbin,
    fetchMyDocs,
    fetchRecentDocs,
    fetchTeamDocs,
    removeCoworker
  } from "../api/api";
  import {GetTime} from "../main";

  export default {
    name: "docImg",
    props:{
      type:{
        default: 'history'//'collection', 'build', 'dustbin', 'team'?
      },
      team:{
        default: ''
      }
    },
    data(){
      return{
        tableData: [
        {
            docId: 1,
            docName: '文档1',
            readTime: '2020-08-14 00:04:23.408300'
          },
          {
            docId: 2,
            docName: '文档2',
            readTime: '2020-08-15 00:04:23.408300'
          },
          {
            docId: 3,
            docName: '文档3',
            readTime: '2020-08-14 00:04:23.408300'
          },
          {
            docId: 4,
            docName: '文档4',
            readTime: '2020-08-11 00:04:23.408300'
          }
        ],
        isHover: false,
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
        },
        folderDialog: false,
        docId: '1',
        shareId: '',
        shareV: false,
        setV: false,
        setId: '2',
        visi: 3,
        NAME: '',
        isTeam: false,
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
                  readTime: GetTime(i.read_time)
                })
              })}
            }
          }).catch(e=>{this.$message({message:e, type:'error'})})
        } else if(this.type === 'build'){
          console.log('build')
          fetchMyDocs().then(res=>{
            if(res.status === 200){
              console.log(res.data)
              this.tableData = []
              res.data.forEach(i => {
                this.tableData.push({
                  docId: i.id,
                  docName: i.name,
                  builder: i.create_user.username,
                  createTime: GetTime(i.create_time),
                  lastTime: GetTime(i.last_modify_time),
                  lastUser: i.last_modify_user.username,
                  lastUserId: i.last_modify_user.id
                })
                console.log(this.tableData)
              })
            }
          }).catch(e=>{this.$message({message:e, type:'error'})})
        } else if(this.team){
          fetchTeamDocs(this.team).then(res=>{
            if(res.status === 200){
              console.log(res)
              this.tableData = []
              res.data.forEach(i=>{
                this.tableData.push({
                  docId: i.id,
                  docName: i.name,
                  builder: i.create_user.username,
                  createTime: GetTime(i.create_time),
                  lastTime: GetTime(i.modify_time),
                  lastUser: i.last_modify_user.username,
                  lastUserId: i.last_modify_user.id
                })
                console.log(this.tableData)
              })
            }
          }).catch(e=>{
            if(e.response.status === 401){
              this.$message({message:'不是团队', type:'error'})
            }
          })
        } else if (this.type === 'dustbin'){
          fetchDustbin().then(res=>{
            if(res.status === 200){
              this.tableData =[]
              res.data.forEach(i=>{
                this.tableData.push({
                  docId: i.document.id,
                  docName: i.document.name,
                  deleteTime: GetTime(i.delete_time),
                  builder: i.document.create_user.username
                })
              })
              console.log(this.tableData)
            }
          }).catch(e=>this.$message({message: e, type: 'error'}))
        }
      },
      toDoc(id){
        this.$router.push({name:'editorPage', params: {docId: id}})
      },
      handleClick(id){
        this.getDocInfo(id)
        this.Dialog = true
      },
      Delete(id){
        let message = this.type === 'dustbin'?'确定要彻底删除它吗？':'确定要删除它吗？'
        this.$confirm(message).then(_ => {
          console.log(id, _)
          this.Dialog = false
        })
      },
      shareDialog(id){
        this.shareId = id
        this.NAME = this.Info.docName
        this.shareV = true
      },
      changeShare(val){
        this.shareV = val
      },
      changeVisible(val, id){
        this.folderDialog = val
        this.getDocInfo(id)//或许没有用
      },
      openFolderDialog(id){
        this.docId = id
        let that = ''
        this.tableData.forEach(i=>{
          if(i.docId +''=== id+''){
            that = i.docName
            return ;
          }
        })
        this.NAME = that
        this.folderDialog = true
      },
      changeColl(id){
        this.tableData.forEach(i => {
          if(i.id+'' === id+''){
            i.isCollected = !i.isCollected
            return;
          }
        })
      },
      recover(id){
        alert(id)
      },
      setP(id){
        this.setId = id
        this.visi = this.Info.role
        this.isTeam = this.Info.isTeam
        this.NAME = this.Info.docName
        this.setV = true
      },
      changeP(val){
        this.setV = val
      },
      checkMove(item){
        let message = '确定要移除ta吗？'
        this.$confirm(message).then(_ => {
          console.log(_)
          removeCoworker(this.Info.id, item.userId).then(res=>{
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
              })
              this.$message({message:'移除成功', type:'info'})
            } else {
              this.$message({message:'发生其他错误', type:'error'})
            }
          }).catch(e=>{
            if(e.response.status === 401){
              this.$message({message:'此人不在协作者中', type: 'error'})
            }
          })
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
            this.Info.isTeam = this.Info.isDoc && res.data.parent_doc
            this.Info.modify_time = GetTime(res.data.modify_time)
            this.Info.create_time = GetTime(res.data.create_time)
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