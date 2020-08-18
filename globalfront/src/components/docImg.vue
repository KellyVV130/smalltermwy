<template>
  <div class="docImg">
    <div v-if="type==='history'" style="margin: 10px;">
      <el-timeline>
        <el-timeline-item v-for="(father, index_f) in todo" :key="index_f" :timestamp="father.date" placement="top"
          type="primary" size="large">
          <el-row :gutter="30">
            <el-col :span="4" v-for="(item, index) in father.subList" :key="index" style="margin: 20px 0;">
              <div style="height: 110px;text-align: center">
                <el-card class="fileCard" shadow="hover" @mouseenter.native="item.isHover = true" @mouseleave.native="item.isHover=false">
                  <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small" v-if="item.isHover">
                    <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
                    <i class="el-icon-s-tools" @click="handleClick(item.docId)"></i>
                    </el-tooltip>
                  </div>
                  <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small" v-if="item.isHover">
                    <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false">
                      <span slot="content"><span v-if="item.isCollected">取消</span>收藏</span>
                    <i class="el-icon-star-on" v-if="item.isCollected" @click="changeColl(item.docId)"></i>
                    <i class="el-icon-star-off" v-else @click="changeColl(item.docId)"></i>
                    </el-tooltip>
                  </div>
                  <div style="right: 5px; line-height: 5px;position: absolute; top: 45px; font-size: x-small" v-if="item.isHover">
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
                  {{item.readTime}}&#10;访问</div>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </el-timeline-item>
      </el-timeline>
    </div>

    <div v-else-if="type === 'dustbin'" style="margin: 5px;">
      <el-row :gutter="30">
        <el-col :span="4" v-for="(item, index) in tableData" :key="index" style="margin-bottom: 20px;">
          <div style="height: 110px;text-align: center">
            <el-card class="fileCard" shadow="hover" @mouseenter.native="item.isHover = true" @mouseleave.native="item.isHover=false">
              <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small" v-if="item.isHover">
                <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-s-tools" @click="handleClick(item.docId)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small" v-if="item.isHover">
                <el-tooltip effect="dark" content="恢复文档" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-refresh-right" @click="recover(item.docId)"></i>
                </el-tooltip>
              </div>
              <div style="font-size: 40px; cursor: default;">
                <i class="el-icon-folder" v-if="item.isFolder"></i>
                <i class="el-icon-document" v-else></i>
              </div>
              <div @click="toDoc(item.docId)" style="cursor: pointer">{{item.docName}}</div>
              <div style="font-size: x-small; color: grey; margin-top: 12px;">
              {{item.deleteTime}}&#10;删除</div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-else style="margin: 5px;">
      <el-row :gutter="35">
        <el-col :span="4" v-for="(item, index) in tableData" :key="index" style="margin-bottom: 20px;">
          <div style="height: 110px;text-align: center">
            <el-card class="fileCard" shadow="hover" @mouseenter.native="item.isHover = true" @mouseleave.native="item.isHover=false">
              <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small" v-if="item.isHover">
                <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-s-tools" @click="handleClick(item.docId)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small" v-if="item.isHover">
                <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false">
                  <span slot="content"><span v-if="item.isCollected">取消</span>收藏</span>
                <i class="el-icon-star-on" v-if="item.isCollected" @click="changeColl(item.docId)"></i>
                <i class="el-icon-star-off" v-else @click="changeColl(item.docId)"></i>
                </el-tooltip>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 45px; font-size: x-small" v-if="item.isHover">
                <el-tooltip effect="dark" content="添加协作者" placement="bottom" :hide-after="800" :enterable="false">
                <i class="el-icon-s-custom" @click="openFolderDialog(item.docId)"></i>
                </el-tooltip>
              </div>
              <div style="font-size: 40px;">
                <i class="el-icon-folder" v-if="item.isFolder"></i>
                <i class="el-icon-document" @click="toDoc(item.docId)" v-else></i>
              </div>
              <div @click="toDoc(item.docId)" style="cursor: pointer">{{item.docName}}</div>
              <div style="font-size: x-small; color: grey; margin-top: 12px;">
              {{item.lastTime}}&#10;最后修改</div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      title="文档详细信息"
      :visible.sync="Dialog"
      width="30%"
      center>
      <div style="">
        <div><span style="width: 120px; display:inline-block;">文件名：</span>{{Info.docName}}</div>
        <div>
          <span style="width: 120px; display:inline-block;">创建者：</span>
          <span @click="toUser(Info.builderId)" style="cursor: pointer;width: 40px;">{{Info.builder}}</span>
        </div>
      <div><span style="width: 120px; display:inline-block;">创建日期：</span>{{Info.create_time}}</div>
      <div><span style="width: 120px; display:inline-block;">最后修改时间：</span>{{Info.modify_time}}</div>
        <el-divider></el-divider>
        <div v-if="type !== 'dustbin'">协作者：
          <div v-for="(item, index) in Info.coworkers" :key="index" class="coworkers">
            <el-avatar :src="item.userImg" :size="'small'" style="cursor: pointer;vertical-align: middle;" @click.native="toUser(item.userId)"></el-avatar>
            <span style="height: 28px; padding-right: 15px;margin-left: 10px;cursor:pointer;" @click="toUser(item.userId)">{{item.userName}}</span>
            <i class="el-icon-user" v-if="item.isBuilder"></i>
            <el-link type="danger" style="position: absolute; right: 15px; top: 10px;"
                     @click="checkMove(item)" v-if="isCo" :disabled="item.role===2">
              <span v-if="!item.isBuilder&&userId===Info.builderId+''">移除</span>
              <span v-else-if="!item.isBuilder&&isCo">退出</span>
            </el-link>
          </div>
        </div>
        <el-divider v-if="type !== 'dustbin'"></el-divider>
        <div v-if="type !== 'dustbin'&&role===1"><el-button plain type="primary" @click="setP(Info.id)">设置权限</el-button> </div>
        <div style=" margin-top: 20px;" v-if="type !== 'dustbin'">
          <el-button plain type="success" @click="shareDialog(Info.id)">分享</el-button>
        </div>
        <div style=" margin-top: 20px;" v-if="role===1"><el-button plain type="danger" @click="Delete(Info.id)">
          <span v-if="type==='dustbin'">彻底</span>删除
          </el-button>
        </div>
      </div>
    </el-dialog>

    <folder-dialog
        :dialog="folderDialog"
        @changeVisible="changeVisible"
        :doc-id="docId"
        :type="'coworker'" :name="NAME"></folder-dialog>

    <share-dialog :share-dialog="shareV" :share-id="shareId" @changeVisible="changeShare" :share-name="NAME"></share-dialog>
    <set-dialog :set-dialog="setV" :set-id="setId" @changeVisible="changeP" :visi="visi" :is-team="isTeam" :set-name="NAME"></set-dialog>
  </div>
</template>

<script>
  import {
    deleteDoc,
    deleteForever, doCollect,
    fetchCollections,
    fetchCoworkers,
    fetchDocInfo,
    fetchDustbin, fetchMyBuild,
    fetchMyDocs,
    fetchRecentDocs,
    fetchTeamDocs,
    removeCoworker, undoCollect, undoDelete
  } from "../api/api";
  import {GetTime, splitDate} from "../main";

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
        isCo:false,
        role:-1,
        userId:localStorage.userId,
        tableData: [
        // {
        //     docId: 1,
        //     docName: '文档aaa1',
        //     readTime: '2020-08-14 00:04:23.408300',
        //     isHover: false
        //   },
        //   {
        //     docId: 2,
        //     docName: '文档aaa2',
        //     readTime: '2020-08-15 00:04:23.408300',
        //     isHover: false
        //   },
        ],
        folderDialog: false,
        docId: '1',
        shareId: '',
        shareV: false,
        setV: false,
        setId: '2',
        visi: 3,
        NAME: '',
        isTeam: false,
        todo:{},
        Dialog: false,
        Info:{}
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
      console.log('team',this.team,this.type)
        if(this.type === 'history'){
          fetchRecentDocs().then(res=>{
            if(res.status === 200){
              this.tableData = []
              res.data.forEach(i=>{
                this.tableData.push({
                  docId: i.document.id,
                  docName:i.document.name,
                  readTime: GetTime(i.read_time),
                  isCollected: i.document.has_collect,
                  builder: i.document.create_user.username,
                  builderId: i.document.create_user.id,
                  isHover: false,
                })
              })
              this.todo = splitDate(this.tableData, "readTime")
            }
          }).catch(e=>{this.$message({message:e, type:'error'})})
        } else if(this.type === 'build'){
          fetchMyDocs().then(res=>{
            if(res.status === 200){
              this.tableData = []
              res.data.forEach(i => {
                this.tableData.push({
                  docId: i.id,
                  docName: i.name,
                  builder: i.create_user.username,
                  builderId: i.create_user.id,
                  createTime: GetTime(i.create_time),
                  lastTime: GetTime(i.modify_time),
                  lastUser: i.last_modify_user?i.last_modify_user.username:"—",
                  lastUserId: i.last_modify_user?i.last_modify_user.id:"",
                  isCollected: i.has_collect,
                  isHover: false,
                })
              })
            }
          }).catch(e=>{this.$message({message:e, type:'error'})})
        } else if(this.type === 'team'){
          console.log('params',this.$route.params.teamId)
          fetchTeamDocs(this.$route.params.teamId).then(res=>{
            if(res.status === 200){
              this.tableData = []
              res.data.forEach(i=>{
                this.tableData.push({
                  docId: i.id,
                  docName: i.name,
                  builder: i.create_user_username,
                  builderId: i.create_user,
                  createTime: GetTime(i.create_time),
                  lastTime: GetTime(i.modify_time),
                  lastUser: i.last_modify_user_username,
                  lastUserId: i.last_modify_user,
                  isHover: false,
                })
              })
            }
          }).catch(e=>{
            if(e.response&&e.response.status === 401){
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
                  builder: i.document.create_user.username,
                  builderId: i.document.create_user.id,
                  isHover: false,
                })
              })
            }
          }).catch(e=>this.$message({message: e.response.data, type: 'error'}))
        } else if (this.type === 'collection'){
          fetchCollections().then(res=>{
            if(res.status === 200){
              this.tableData = []
              res.data.forEach(i=>{
                this.tableData.push({
                  docId: i.id,
                  docName: i.name,
                  isCollected: i.has_collect,
                  builder: i.create_user.username,
                  builderId: i.create_user.id,
                  lastUser: i.last_modify_user?i.last_modify_user.username:"—",
                  lastUserId: i.last_modify_user?i.last_modify_user.id:"",
                  isHover: false,
                })
              })
            }
          }).catch(e=>this.$message({message: e.response.data, type: 'error'}))
        } else if (this.type === 'build_t'){
          fetchMyBuild().then(res=>{
            if(res.status === 200){
              this.tableData = []
              res.data.forEach(i => {
                this.tableData.push({
                  docId: i.id,
                  docName: i.name,
                  builder: i.create_user.username,
                  builderId: i.create_user.id,
                  createTime: GetTime(i.create_time),
                  lastTime: GetTime(i.modify_time),
                  lastUser: i.last_modify_user?i.last_modify_user.username:"—",
                  lastUserId: i.last_modify_user?i.last_modify_user.id:"",
                  isCollected: i.has_collect
                })
              })
            }
          }).catch(e=>{this.$message({message:e, type:'error'})})
        }
      },
      toDoc(id){
        this.$router.push({name:'editorPage', params: {docId: id}})
      },
      toUser(id){
        this.$router.push({name:'PersonInfo', params:{personId: id}})
      },
      handleClick(id){
        this.getDocInfo(id)
        this.Dialog = true
      },
      Delete(id){
        let message = this.type === 'dustbin'?'确定要彻底删除它吗？':'确定要删除它吗？'
        this.$confirm(message).then(() => {
          if(this.type === 'dustbin'){
            deleteForever(id).then(res => {
              if(res.status === 204){
                this.init()
                this.$message({message:'已彻底删除文档!', type:'warning'})
              }
            }).catch(e=>this.$message({message:e.response.data, type:'error'}))
          } else {
            //删除文档
            deleteDoc(id).then(res => {
              if(res.status === 204){
                this.init()
                this.$message({message:'删除成功！', type: 'info'})
              }
            }).catch(e=>{
              if(e.response.status === 401)
                this.$message({message:"您没有权限！", type:'error'})
            })
          }
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
        let item = {};
        this.tableData.forEach(i => {
          if(i.docId+'' === id+''){
            item = i;
          }
        })
        if(item.isCollected){
          undoCollect(item.docId).then(res=>{
            if(res.status === 204){
              this.init()
              this.$message({message:'取消收藏成功', type:'info'})
              item.isCollected = false
              return;
            }
          }).catch(e=>this.$message({message:e.response.data, type:'error'}))
        } else {
          doCollect(item.docId).then(res=>{
            if(res.status === 201){
              this.init()
              item.isCollected = true
              this.$message({message:'收藏成功', type:'info'});
              return ;
            }
          }).catch(e=>{if(e.response.status === 400){
            this.$message({message:'本文已被收藏', type:'error'})
          }})
        }
      },
      recover(id){
        undoDelete(id).then(res => {
          if(res.status === 200){
            this.init()
            this.$message({message:'恢复文档成功！', type:'info'})
            this.init()//再获取一遍回收站
          }
        }).catch(e=>this.$message({message:e.response.data, type:'error'}))
      },
      setP(id){
        this.setId = id
        this.visi = this.Info.role
        this.isTeam = this.Info.isTeam
        this.NAME = this.Info.docName
        this.setV = true
      },
      changeP(val, id){
        this.setV = val
        this.getDocInfo(id)
      },
      checkMove(item){
        let message = '确定要移除ta吗？'
        this.$confirm(message).then(() => {
          removeCoworker(this.Info.id, item.userId).then(res=>{
            if(res.status === 200){
              this.Info.coworkers = []
              res.data.forEach((i, index) => {
                if(i.id+'' === this.userId){
                  this.isCo = true
                  this.role = i.role
                }
                if(index === 0){
                  this.Info.builder = i.username
                  this.Info.builderId = i.id
                }
                this.Info.coworkers.push({
                  userId: i.id,
                  userName: i.username,
                  userImg: i.head,
                  isBuilder: i.role === 1?true:false,
                  role: i.role
                })
              })
              this.init()
              this.Dialog = false
              this.$message({message:'移除成功', type:'info'})
            } else {
              this.$message({message:'发生其他错误', type:'error'})
            }
          }).catch(e=>{
            if(e.response.status === 401){
              this.$message({message:'您没有删除权限或此人不在协作者中', type: 'error'})
            }
          })
        })
      },
      getDocInfo(id){
        fetchDocInfo(id,0).then(res=>{
          if(res.status === 200){
            this.Info.id = res.data.id
            this.Info.docName = res.data.name
            this.Info.role = res.data.role
            this.Info.isDoc = !res.data.type
            this.Info.isTeam = this.Info.isDoc && res.data.parent_doc
            this.Info.modify_time = GetTime(res.data.modify_time)
            this.Info.create_time = GetTime(res.data.create_time)
            fetchCoworkers(this.Info.id).then(res=>{
              if(res.status === 200){
                this.isCo = false;
                this.Info.coworkers = []
                res.data.forEach((i, index) => {
                  if(i.id+'' === this.userId){
                    this.isCo = true
                    this.role = i.role
                  }
                  if(index === 0){
                    this.Info.builder = i.username
                    this.Info.builderId = i.id
                  }
                  this.Info.coworkers.push({
                    userId: i.id,
                    userName: i.username,
                    userImg: i.head,
                    isBuilder: i.role === 1? true:false,
                    role:i.role
                  })
                })
              }
            }).catch(e => this.$message({message:e.response.data, type:'error'}))
          } else if(res.status === 204){
            this.$message({message:'其他错误', type: 'error'})
          }
        }).catch(e=>{
          this.$message({message:e.response.data, type: 'error'})
        })
        console.log('info',this.Info)
      },
    },
  }
</script>

<style>
  .docImg{
    height: 80vh;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .fileCard{
    border: 0px;
    transition: .3s;
    height: 100%;
    background-color:rgba(0,0,0,0);
    position: relative;
  }
  .fileCard /deep/ .el-card__body{
    padding: 2px;
  }
  .fileCard i{
    cursor: pointer;
  }
  .coworkers {
    margin-top: 15px;
    position: relative;
  }
</style>