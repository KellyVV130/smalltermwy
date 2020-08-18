<template>
  <div class="docList">
    <div v-if="type === 'history'">
      <el-table
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        ref="filterTable"
        :data="tableData"
        class="tabley"
        height="600"
        style="width: 100%">
        <template slot="empty" style="background-color: whitesmoke;">
          <img style="width: 100px;height: 100px;margin-top:20px;" :src="logo"><br>
          暂无文档
        </template>
        <el-table-column
          prop="readTime"
          label="最后浏览时间"
          sortable
          column-key="readTime"
          :filters="createTimeFilter('readTime')"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="docName"
          sortable
          width="400"
          label="文件名">
          <template slot-scope="scope">
            <span  style="cursor: pointer;" @click="toDoc(scope.row.docId)">{{scope.row.docName}}</span>
            <div class="tableI">
            <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
            <i @click="handleEdit(scope.$index, scope.row.docId)"
               class="el-icon-s-tools"></i></el-tooltip>
            <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false">
              <span slot="content"><span v-if="scope.row.isCollected">取消</span>收藏</span>
            <i @click="changeColl(scope.row.docId)"
              v-if="scope.row.isCollected"
              class="el-icon-star-on"></i>
            <i @click="changeColl(scope.row.docId)"
              v-else
              class="el-icon-star-off"></i></el-tooltip>
            <el-tooltip effect="dark" content="添加协作者" placement="bottom" :hide-after="800" :enterable="false">
            <i @click="openFolderDialog(scope.row.docId)"
               class="el-icon-s-custom"></i></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="builder"
          label="创建者"
          sortable>
          <template slot-scope="scope">
            <span style="cursor: pointer;" @click="toUser(scope.row.builderId)">{{scope.row.builder}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else-if="type === 'dustbin'">
      <el-table
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        ref="filterTable"
        :data="tableData"
        class="tabley"
        height="600"
        style="width: 100%">
        <template slot="empty" style="background-color: whitesmoke;">
          <img style="width: 100px;height: 100px;margin-top:20px;" :src="logo"><br>
          暂无文档
        </template>
        <el-table-column
          prop="docName"
          sortable
          width="400"
          label="文件名">
          <template slot-scope="scope">
            {{scope.row.docName}}
            <div class="tableI">
            <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
            <i
              @click="handleEdit(scope.$index, scope.row.docId)"
              class="el-icon-s-tools"></i></el-tooltip>
            <el-tooltip effect="dark" content="恢复文档" placement="bottom" :hide-after="800" :enterable="false">
            <i
              @click="recover(scope.row.docId)"
              class="el-icon-refresh-right"></i></el-tooltip></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="deleteTime"
          label="删除时间"
          sortable
          column-key="deleteTime"
          :filters="createTimeFilter('deleteTime')"
          :filter-method="filterHandler"
        >
        </el-table-column>
      </el-table>
    </div>

    <div v-else>
      <el-table
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        ref="filterTable"
        :data="tableData"
        class="tabley"
        height="600"
        style="width: 100%">
        <template slot="empty" style="background-color: whitesmoke;">
          <img style="width: 100px;height: 100px;margin-top:20px;" :src="logo"><br>
          暂无文档
        </template>
        <el-table-column
          prop="name"
          sortable
          width="400"
          label="文件名">
          <template slot-scope="scope">
            <span  style="cursor: pointer;" @click="toDoc(scope.row.docId)">{{scope.row.docName}}</span>
            <div class="tableI">
            <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
            <i
              @click="handleEdit(scope.$index, scope.row.docId)"
              class="el-icon-s-tools"></i></el-tooltip>
            <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false">
              <span slot="content"><span v-if="scope.row.isCollected">取消</span>收藏</span>
            <i
              @click="changeColl(scope.row.docId)"
              v-if="scope.row.isCollected"
              class="el-icon-star-on"></i>
            <i
              @click="changeColl(scope.row.docId)"
              v-else
              class="el-icon-star-off"></i></el-tooltip>
            <el-tooltip effect="dark" content="添加协作者" placement="bottom" :hide-after="800" :enterable="false">
            <i
              @click="openFolderDialog(scope.row.docId)"
              class="el-icon-s-custom"></i></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="builder"
          label="创建者"
          sortable>
          <template slot-scope="scope">
            <span style="cursor: pointer;" @click="toUser(scope.row.builderId)">{{scope.row.builder}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastTime"
          label="最新修改时间"
          sortable
          column-key="lastTime"
          :filters="createTimeFilter('lastTime')"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="lastUser"
          label="最新修改者"
          sortable
          column-key="lastUser"
        >
          <template slot-scope="scope">
            <span style="cursor: pointer;" @click="toUser(scope.row.lastUserId)">{{scope.row.lastUser}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="文件详细信息"
      :visible.sync="Dialog"
      width="30%"
      center>
      <div style="">
        <div><span style="width: 120px; display: inline-block;">文件名：</span>{{Info.docName}}</div>
        <div>
          <span style="width: 120px; display:inline-block;">创建者：</span>
          <span @click="toUser(Info.builderId)" style="cursor: pointer;">{{Info.builder}}</span>
        </div>
        <div><span style="width: 120px; display:inline-block;">创建日期：</span>{{Info.create_time}}</div>
        <div><span style="width: 120px; display:inline-block;">最后修改时间：</span>{{Info.modify_time}}</div>
        <el-divider></el-divider>
        <div v-if="type !== 'dustbin'">协作者：
          <div v-for="(item, index) in Info.coworkers" :key="index" class="coworkers">
            <el-avatar :src="item.userImg" :size="'small'" style="cursor: pointer;vertical-align: middle;" @click.native="toUser(item.userId)"></el-avatar>
            <span style="height: 28px; padding-right: 15px;margin-left: 10px; cursor:pointer;" @click="toUser(item.userId)">{{item.userName}}</span>
            <i class="el-icon-user" v-if="item.isBuilder"></i>
            <el-link type="danger" style="position: absolute; right: 15px; top: 10px;"
                     @click="checkMove(item)" v-if="isCo" :disabled="item.role===2">
              <span v-if="!item.isBuilder&&userId===Info.builderId+''">移除</span>
              <span v-else-if="!item.isBuilder&&isCo">退出</span>
            </el-link>
          </div>
        </div>
        <el-divider v-if="type !== 'dustbin'"></el-divider>
        <div v-if="type !== 'dustbin'&&role===1">
          <el-button plain type="primary" @click="setP(Info.id)">设置权限</el-button>
        </div>
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
    fetchRecentDocs,
    fetchDocInfo,
    fetchCoworkers,
    removeCoworker,
    fetchMyDocs,
    fetchTeamDocs,
    undoCollect, doCollect, fetchDustbin, fetchCollections, deleteForever, undoDelete, deleteDoc
  } from "../api/api";
  import {GetTime} from "../main"
  import logo from '../assets/icon.png'

  export default {
    name: "docList",
    props:{
      type:{
        default: 'history'//'collection', 'build', 'dustbin', 'team'?
      },
      team:{
        default: ''
      }
    },
    mounted() {
      this.init()
    },
    data(){
      return {
        isCo:false,
        role:-1,
        userId:localStorage.userId,
        logo:logo,
        tableData: [
          // {
          //   docId: 1,
          //   docName: '文档1',
          //   readTime: GetTime('2020-08-14T00:04:23.408300')
          // },
          // {
          //   docId: 2,
          //   docName: '文档2',
          //   readTime: GetTime('2020-08-15T00:04:23.408300')
          // },
          // {
          //   docId: 3,
          //   docName: '文档3',
          //   readTime: GetTime('2020-08-14T00:04:23')
          // },
          // {
          //   docId: 4,
          //   docName: '文档4',
          //   readTime: GetTime('2020-08-11T00:04:23.408300')
          // },
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
              userImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              userId: 2,
              userName: 'Kelly2',
              isBuilder: false,
              userImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
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
    methods:{
      init(){
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
                  builderId: i.document.create_user.id
                })
              })
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
                  isCollected: i.has_collect
                })
              })
            }
          }).catch(e=>{this.$message({message:e, type:'error'})})
        } else if(this.team){
          fetchTeamDocs(this.team).then(res=>{
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
                  lastTime: GetTime(i.modify_time),
                  createTime: GetTime(i.create_time),
                  lastUser: i.last_modify_user?i.last_modify_user.username:"—",
                  lastUserId: i.last_modify_user?i.last_modify_user.id:"",
                })
              })
            }
          }).catch(e=>this.$message({message: e.response.data, type: 'error'}))
        }
      },
      createTimeFilter(timeName){
        let dateFilter = []
        let dates = []
        this.tableData.forEach(i =>{
          if(dates.length === 0 || dates.indexOf(GetTime(i[timeName],' '))==-1){
            dates.push(GetTime(i[timeName],' '))
          }
        })
        dates.forEach(i=>{
          dateFilter.push({
            text: i,
            value: i,
          })
        })
        return dateFilter
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return GetTime(row[property],' ') === value;
      },
      handleEdit(index, row) {//查看文档详细内容
        //this.Info = row//表格中每个元素是详细信息，只展示部分，点开才展示全部！或根据id请求详细信息。移除协作者时再请求一次
        this.getDocInfo(row)
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
            }).catch(e=>{
              if(e.response.status === 401)
                this.$message({message:"您没有权限！", type:'error'})
            })
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
      changeVisible(val, id){
        this.folderDialog = val
        this.getDocInfo(id)
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
      toDoc(id){
        this.$router.push({name:'editorPage', params: {docId: id}})
      },
      toUser(id){
        this.$router.push({name:'PersonInfo', params:{personId: id}})
      },
    // 修改table tr行的背景色
      // eslint-disable-next-line no-unused-vars
      tableRowStyle({ row, rowIndex }) {
        if(row){
          return{
            backgroundColor: "whitesmoke"
          }
        }
      },
      // 修改table header的背景色
      // eslint-disable-next-line no-unused-vars
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: whitesmoke;'
        }
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
      shareDialog(id){
        this.shareId = id
        this.NAME = this.Info.docName
        this.shareV = true
      },
      changeShare(val){
        this.shareV = val
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
                  isBuilder: i.role === 1? true:false,
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
        fetchDocInfo(id).then(res=>{
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
                    isBuilder: i.role === 1?true:false,
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
      }
    }
  }
</script>

<style>
  .docList{
    height: 80vh;
  }
  .tableI{
    float: right;
    font-size: medium;
  }

  .tableI i{
    cursor:pointer;
    margin-right: 15px;
  }
  .el-table-filter__checkbox-group .el-checkbox:last-child {
     margin-bottom: 8px;
  }
  .el-table-filter {
    border: 1px solid #EBEEF5;
    border-radius: 2px;
    background-color: #fbfbfb;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-sizing: border-box;
    margin: 2px 0;
  }

  .tabley .el-table__empty-block{
    background-color: whitesmoke;
  }

  .el-table td.gutter, .el-table th.gutter {
    width: 15px;
    background-color: whitesmoke;
    border-right-width: 0;
    border-bottom-width: 0;
    padding: 0;
  }
  .tabley .el-table__body-wrapper {
    overflow: hidden;
    position: relative;
    background-color: whitesmoke;
  }
</style>