<template>
  <div class="EditorPage">
    <div style="font-size: large; color: black; font-weight: bold">
      <span style="margin-left: 20px;"></span>

      <el-link icon="el-icon-arrow-left" @click="toHome"
               style="font-size: 20px;margin-left: -180px;margin-top: 10px;margin-bottom: 10px;">返回</el-link>

      <div style="float: right;margin-top: 11px; line-height: 28px;">

        <el-popover
          placement="bottom"
          width="160"
          v-model="visible">
         <div>
          <div v-for="(item, index) in Info.coworkers" :key="index" class="coworkers" style="margin-left:10px">
            <el-avatar :src="item.userImg" :size="'small'" style="cursor: pointer;vertical-align: middle;" @click.native="toUser(item.userId)"></el-avatar>
            <span style="height: 28px; padding-right: 15px;margin-left: 10px; cursor:pointer;" @click="toUser(item.userId)">{{item.userName}}</span>
            <i class="el-icon-user" v-if="item.isBuilder"></i>
            <el-link type="danger" style="position: absolute; right: 15px; top: 10px;"
                  @click="checkMove(item)" v-if="isCo" :disabled="item.role===2">
            <span v-if="!item.isBuilder&&userId===Info.builderId+''">移除</span>
            <span v-else-if="!item.isBuilder&&isCo">退出</span>
            </el-link>
          </div>
          <el-link type="primary" size="mini" :underline="false" style="margin-left:0px" icon="el-icon-plus" @click="dialog = true">添加</el-link>
          </div>
          <el-button plain type="info" slot="reference">协作</el-button>
        </el-popover>

        <el-dialog title="添加协作者" :visible.sync="dialog" :close-on-click-modal="false" :modal-append-to-body="false"
          :show-close="false" style="width: 70%;margin: 0 auto;">
            <el-form :model="form" style="text-align: center;">
              <el-form-item prop="name">
                <div style="font-size: medium; font-family: Georgia, serif;">为[{{name}}]添加协作者:</div>
                <el-autocomplete
                  class="autocomplete_"
                  v-model="form.name"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入对方昵称、手机、邮箱或ID"
                  @select="handleSelect"
                  :trigger-on-focus="false"
                >
                <i slot="suffix" class="el-input__icon el-icon-search"></i></el-autocomplete>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialog=false">取 消</el-button>
              <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
          </el-dialog>

        <el-button @click="StartEdit" plain type="warning" style="margin-left: 14px;">编辑</el-button>
        <el-button @click="changeContent" type="success" plain>保存</el-button>
        <el-dropdown @command="handleCommand" style="margin-left: 14px;">
          <el-button icon="el-icon-more" type="primary" plain> </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">
              <span v-if="Info.isCollected">取消</span>收藏
            </el-dropdown-item>
            <el-dropdown-item command="b">文档信息</el-dropdown-item>
            <el-dropdown-item command="d">分享</el-dropdown-item>
            <el-divider></el-divider>
            <el-dropdown-item command="c">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

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
            <div>协作者：
              <div v-for="(item, index) in Info.coworkers" :key="index" class="coworkers">
                <el-avatar :src="item.userImg" :size="'small'" style="cursor: pointer;vertical-align: middle;" @click.native="toUser(item.userId)"></el-avatar>
                <span style="height: 28px; padding-right: 15px;margin-left: 10px;cursor:pointer;" @click="toUser(item.userId)">{{item.userName}}</span>
                <i class="el-icon-user" v-if="item.isBuilder"></i>
                <el-link type="danger" style="position: absolute; right: 15px; top: 10px;"
                         @click="checkMove(item)" v-if="isCo">
                  <span v-if="!item.isBuilder&&ID===Info.builderId+''">移除</span>
                  <span v-else-if="!item.isBuilder&&isCo">退出</span>
                </el-link>
              </div>
            </div>
        <el-divider v-if="role===1"></el-divider>
        <div v-if="role===1"><el-button plain type="primary" @click="setP">设置权限</el-button> </div>
          </div>
        </el-dialog>

        <share-dialog :share-dialog="shareV" :share-id="shareId"
                      @changeVisible="changeShare" :share-name="title"></share-dialog>
        <set-dialog :set-dialog="setV" :set-id="setId" @changeVisible="changeP"
                    :visi="visi" :is-team="isTeam" :set-name="title"></set-dialog>
        <folder-dialog
        :dialog="folderDialog"
        @changeVisible="changeVisible"
        :doc-id="docId"
        :type="'coworker'" :name="title"></folder-dialog>

        <span style="margin-left: 20px;"></span>
      </div>
    </div>

    <el-form ref="form" :model="ruleForm" label-width="0px">
      <el-form-item>
        标题：<el-input v-model="title" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <editor-bar
          v-model="content"
          :isClear="isClear"
          @change="change"
        ></editor-bar>
      </el-form-item>
      <el-divider>评论区</el-divider>
      <el-form-item>
        <comment-bar
          v-model="comments"
          :cid="docId"
          isClear="isClear"
          disable="false"
          @change="change"
        ></comment-bar>
      </el-form-item>
    </el-form>

    <span style="text-align: center;display:block;"
      >编写于 环球文档 GlobalDoc</span
    >
  </div>
</template>

<script>
  import {
    Edit,
    deleteDoc, fetchDocInfo, changeContent, fetchCoworkers, removeCoworker, undoCollect, doCollect, fetchUsers, addCoworker
  } from '../api/api'
import EditorBar from '../components/Editor'
import CommentBar from '../components/Comment'
  import {GetTime} from "../main";

export default {
  components: {EditorBar, CommentBar},
  data() {
    return {
      input: '',
      activeIndex: '1',
      isClear: false,
      detail: '',
      Info: {
        builder: 'Kelly',
        coworkers: [
          {
            userId: 1,
            userName: 'Kelly',
            isBuilder: true,
            isCollected: true,
            userImg:
                'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          },
          {
            userId: 2,
            userName: 'Kelly2',
            isBuilder: false,
            isCollected: true,
            userImg:
                'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
          }
        ],
        isCollected: true,
        role: 1
      },

      userId:localStorage.userId,
      dialog: false,
      form:{
        name: '',
        id: null,
      },
      date: '2016-05-02',
      name: '王小虎',
      builder: '家',
      ID: 1,
      title: '未命名',
      content: '今天天气很好，小王出门散步。',

      comments: {
        id: 12,
        author: {
          username: 'gao',
          id: 1,
          head: null
        },
        document: 2,
        body: 'yrtyhgf',
        create_time: '2020-08-14',
        reply_comment: {
          id: 7,
          author: {
            username: 'gao1',
            id: 2,
            head: null
          },
          body: 'sdasdd',
          create_time: '2020-08-15'
        },
        replies: {
          author: {
            username: 'gao',
            id: 1,
            head: null
          },
          body: 'yaaaaaaaaaaaartyhgf',
          create_time: '2020-08-17'
        }
      },
      shareId: '',
      shareV: false,
      setId: '2',
      setV: false,

      ruleForm: {
        title: '',
        description: '',
        content: ''
      },
      Dialog: false,
      docId: '',
      isCo: false,
      visi: '',
      editor: {
        id: 0,
        username: '佚名',
        head: ""
      },
      folderDialog: false,
      role: 1,
      edit: false,
      timer:''
    }
  },

  methods: {
    //获取文章内容
    init() {//当前编辑者
      console.log('init')
      this.edit = false
      fetchDocInfo(this.docId).then(res => {
        if (res.status === 200) {
          this.title = res.data.name
          this.content = res.data.content
          this.docId = res.data.id
          if (res.data.editor) {
            //有当前编辑者。
            this.editor = res.data.editor
            const notify = this.$notify({
              title: '协作',
              message: "<a style='cursor: pointer;'>"+this.editor.username+"</a>正在编辑",
              //duration: 0,
              type: 'warning',
              dangerouslyUseHTMLString: true,
            });
            notify.$el.querySelector('a').onclick = () => {
              // your code
              this.toUser(this.editor.id)
              // 点击后关闭notify 不需要的话可删掉
              notify.close();
            };
            if (this.editor.id === this.ID) {
              console.log('right')
              this.edit = true
            } else {
              this.edit = false
            }
          } else {
            //没有他人编辑
            this.edit = true
          }

          this.Info.id = res.data.id
          this.Info.docName = res.data.name
          this.Info.role = res.data.role
          this.Info.isDoc = !res.data.type
          this.Info.isTeam = this.Info.isDoc && res.data.parent_doc
          this.Info.modify_time = GetTime(res.data.modify_time)
          this.Info.create_time = GetTime(res.data.create_time)
          this.Info.isCollected = res.data.has_collect
          fetchCoworkers(this.Info.id).then(res => {
            if (res.status === 200) {
              this.isCo = false;
              this.Info.coworkers = []
              res.data.forEach((i, index) => {
                if (i.id + '' === this.userId) {
                  this.isCo = true
                  this.role = i.role
                }
                if (index === 0) {
                  this.Info.builder = i.username
                  this.Info.builderId = i.id
                }
                this.Info.coworkers.push({
                  userId: i.id,
                  userName: i.username,
                  userImg: i.head,
                  isBuilder: i.role === 1 ? true : false,
                  role:i.role
                })
              })
            }
          }).catch(e => this.$message({message: e.response.data, type: 'error'}))
        } else if (res.status === 204) {
          this.$message({message: '其他错误', type: 'error'})
        }
      }).catch(e => {
        if(e.response.status === 401){
          this.$message({message:'您暂无权限查看此页面', type: 'error'})
          this.$router.push({name:'history'})
        }
      })
    },
    changeVisible(val) {
      this.folderDialog = val
      this.init()//或许没有用
    },
    changeContent() {
      changeContent(this.docId, this.title, this.content)
          .then(response => {
            if (response.status === 200) {
              this.$message({
                message: '修改文档成功',
                type: 'info'
              })
            } else if (response.status === 204){
              this.$message({
                message: '您尚未进入编辑状态，不可提交',
                type: 'error'
              })
            }
          })
          .catch(e => {
            if (e.response.status === 401) {
              this.message({message: '修改文档失败', type: 'error'})
            }
          })
    },
  toUser(id) {
    this.$router.push({name: 'PersonInfo', params: {personId: id}})
  },
  changeColl() {
    if (this.Info.isCollected) {
      undoCollect(this.docId).then(res => {
        if (res.status === 204) {
          this.init()
          this.$message({message: '取消收藏成功', type: 'info'})
          this.Info.isCollected = false
          return;
        }
      }).catch(e => this.$message({message: e.response.data, type: 'error'}))
    } else {
      doCollect(this.docId).then(res => {
        if (res.status === 201) {
          this.init()
          this.Info.isCollected = true
          this.$message({message: '收藏成功', type: 'info'});
          return;
        }
      }).catch(e => {
        if (e.response.status === 400) {
          this.$message({message: '本文已被收藏', type: 'error'})
        }
      })
    }
  },
  handleCommand(c) {
    switch (c) {
      case "c":
        this.Delete()
        break;
      case "b":
        this.Dialog = true
        break;
      case "a":
        this.changeColl()
        break;
      case "d":
        this.shareDialog()
    }
  },
  change(val) {
    console.log(val)
  },
  toHome() {
    this.$router.go(-1)
  },
  Delete() {
    let message = (this.type = '确定要删除它吗？')
    this.$confirm(message).then(() => {
      //删除文档
      deleteDoc(this.docId).then(res => {
        if (res.status === 204) {
          this.init()
          this.$message({message: '删除成功！', type: 'info'})
        }
      })
      .catch(e =>
          this.$message({message: e.response.data, type: 'error'})
      )
      this.Dialog = false
    })
  },
  shareDialog() {
    this.shareId = this.docId
    this.shareV = true
  },
  changeShare(val) {
    this.shareV = val
  },
  setP() {
    this.setId = this.docId
    this.Visi = this.Info.role
    this.setV = true
  },
  changeP(val) {
    this.setV = val
  },
  //开始编辑
  StartEdit() {
    // 是否在被人编辑//修改装
    console.log('edit',this.docId)
    Edit(this.docId, 0).then(res => {
      if (res.status === 200) {
        this.$message({message: '您已进入编辑状态！', type: 'info'})
        this.edit = true
        this.init()
      }
    }).catch(e => {
      if (e.response.status === 400) {
        this.edit = false
        const notify = this.$notify({
          title: '协作',
          message: "<a style='cursor: pointer;'>"+this.editor.username+"</a>正在编辑",
          //duration: 0,
          type: 'warning',
          dangerouslyUseHTMLString: true,
        });
        notify.$el.querySelector('a').onclick = () => {
          // your code
          this.toUser(this.editor.id)
          // 点击后关闭notify 不需要的话可删掉
          notify.close();
        };
      } else if(e.response.status === 401){
        this.$message({message:'您无权限编辑此文档', type: 'error'})
      }
      this.init()
    })
  },
  checkMove(item) {
    let message = '确定要移除ta吗？'
    this.$confirm(message).then(() => {
      removeCoworker(this.Info.id, item.userId).then(res => {
        if (res.status === 200) {
          this.Info.coworkers = []
          res.data.forEach((i, index) => {
            if (i.id + '' === this.userId) {
              this.isCo = true
              this.role = i.role
            }
            if (index === 0) {
              this.Info.builder = i.username
              this.Info.builderId = i.id
            }
            this.Info.coworkers.push({
              userId: i.id,
              userName: i.username,
              userImg: i.head,
              isBuilder: i.role === 1 ? true : false
            })
          })
          this.init()
          this.Dialog = false
          this.$message({message: '移除成功', type: 'info'})
        } else {
          this.$message({message: '发生其他错误', type: 'error'})
        }
      }).catch(e => {
        if (e.response.status === 401) {
          this.$message({message: '您没有删除权限或此人不在协作者中', type: 'error'})
        }
      })
    })
  },
  handleClose(done) {
    this.$confirm('确认关闭？')
      .then( ()=> {
        done();
      })
      .catch( ()=> {});
  },
  querySearchAsync(queryString, cb) {
    //let users = this.users;//按照queryString去后端请求，将返回的数据sb(results)
    let results = []
    fetchUsers(queryString).then(res => {
      if(res.status === 200){
        if(res.data.length === 0){
          //this.$message({message:'暂无匹配', type:'error'})
        } else {
          console.log(res.data)
          res.data.forEach(i => {
            results.push({
              id: i.id,
              value: i.username,
            })
          })
          //"id": 1, "username": "aaa", "head": "", "email": "", "mobile": "17600294315"
        }
      }
    }).catch(e=>{this.$message({message:e.response.data, type: 'error'})})
    //若无匹配，$message提示暂无匹配
    console.log(results)
    cb(results)
    // let results = queryString ? users.filter(this.createStateFilter(queryString)) : null;
    // cb(results);
  },
  handleSelect(item) {
    this.form.name = item.value
    this.form.id = item.id
  },
  cancelForm(){
    this.dialog = false
  },
  submitForm(){
      addCoworker(this.docId, this.form.id).then(res=>{
        if(res.status === 200){
          this.$message({message:'添加成功', type:'info'})
        } else if(res.status === 204){
          this.$message({message:'用户不存在', type:'error'})
        }
      }).catch(e=>{
        if(e.response.status === 401){
          this.$message({message:'您没有权限', type:'error'})
        } else if (e.response.status === 400){
          this.$message({message:'此用户已在协作者中', type: 'error'})
        }
      })
      this.dialog=false
      //this.$emit('changeVisible', false, this.docId)
  },
},
  mounted() {
    console.log('mounted')
    this.ID = localStorage.userId
    this.docId = this.$route.params.docId
    console.log(this.ID, this.docId)
    this.timer=setInterval(this.init,120000)
    this.init()
  },
  beforeDestroy(){
    clearInterval(this.timer)
  },
}
</script>

<style>
/*append-to-body="true"*/
.EditorPage {
  background-color: whitesmoke;
  padding: 0 250px;
}
.setRadio .el-radio__label {
  font-size: 16px;
  padding-left: 10px;
}
.el-divider__text {
  position: absolute;
  background-color: whitesmoke;
  padding: 0 20px;
  color: #303133;
  font-size: x-large;
}
  .autocomplete_{
    width: 350px;
  }
</style>
