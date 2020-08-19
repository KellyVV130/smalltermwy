<template>
  <div>
    <el-card>
    <h4>发表评论</h4>
<!--    <el-input-->
<!--      type="textarea"-->
<!--      :rows="2"-->
<!--      placeholder="请输入内容"-->
<!--      v-model="commentContent"-->
<!--    >-->
<!--    </el-input>-->
<!--    <el-button type="primary" size="large" @click="postMsg(null)">发表评论</el-button>-->

    <el-row>
      <el-col :span="20"><div class="grid-content bg-purple">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="commentContent"
          >
          </el-input>
        </div></el-col>
      <el-col :span="4">
        <div class="commentButton">
        <el-button type="primary" size="large" @click="postMsg(null)">发表评论</el-button>
        </div></el-col>
    </el-row>
    <!-- 评论列表区域 -->
    <div class="list">
      <div class="item" v-for="(item, i) in cmtlist" :key="i">
        <div class="item-title">
          第{{ i + 1 }}楼 用户：
          <span style="cursor: pointer;" @click="toUser(item.author.id)">{{ item.author.username }}</span>
          发表时间：{{
          item.create_time
          }}
          <a @click="deleteMsg(item.id)" style="cursor: pointer;color: red;margin-left: 20px;"
          v-if="userId === item.author.id+''">删除</a>
          <a @click="openDiag(item.id)" style="cursor: pointer;color: cadetblue;margin-left: 20px;">回复</a>
        </div>
        <div class="item-body">
          {{ item.body }}
          <el-divider></el-divider>
          <div class="sub-list">
            <div class="sub-item" v-for="(item2, j) in item.replies" :key="j">
              <div class="sub-item-title">
                第{{ j + 1 }}楼 用户：
                <span style="cursor: pointer;" @click="toUser(item2.author.id)">{{ item2.author.username }}</span>
                发表时间：{{
                  item2.create_time
                }}
                <a @click="deleteMsg(item2.id)" style="cursor: pointer;color: #ff4641;margin-left: 20px;"
                v-if="userId === item2.author.id+''">删除</a>
              </div>
              <div class="sub-item-body">{{ item2.body }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="回复评论" :visible.sync="dialog">
      <el-form>
        <el-form-item>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="subComment"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="postMsg(subId)">发 送</el-button>
      </div>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { deleteMsg, postMsg, fetchDocInfo } from '../api/api'
import { GetTime } from '../main'
export default {
  name: 'Comment',
  props: ['cid'], // 接收父组件传递过来的Id
  data() {
    return {
      cmtlist: [
        {
          author: 'Axx',
          create_time: '2020-08-18',
          body: '今天是个好日子',
          replies: [
            {
              id: 7,
              author: {
                username: 'gao1',
                id: 2,
                head: null
              },
              body: 'sdasdd',
              create_time: '2020-08-15'
            },
            {author: {username:'gao2'}},
            {author: {username:'gao3'}}
          ],
          reply_comment: {
            author: {
              username: 'gao',
              id: 1,
              head: null
            },
            body: 'yaaaaaaaaaaaartyhgf',
            create_time: '2020-08-17'
          }
        },
        { author: {username:'Bxx'} },
        { 
          author: {username:'Cxx'},
          replies: [
            {
              id: 7,
              author: {
                username: 'Mark',
                id: 2,
                head: null
              },
              body: 'HELLO',
              create_time: '2020-08-15'
            },
            {author: {username:'Anna'}}
          ]
        }
      ],
      commentContent: '',
      dialog:false,
      subComment:'',
      subId:0,
      userId:localStorage.userId
    }
  },
  watch:{
    cid(val){
      this.getMsg(val)
    }
  },
  mounted() {
    this.userId = localStorage.userId
    let path = ""
    if(this.$route.query)
      path = this.$cypher.decode(this.$route.query.key)
    this.cid = this.$route.params.docId ||  path+''
    this.getMsg(this.cid)
  },
  methods: {
    getMsg(id) {
      // 获取评论
      console.log(id,'getting')
      fetchDocInfo(id)
        .then(res => {
          if (res.status === 200) {
            console.log('comment',res.data.comments)
            this.cmtlist = res.data.comments
            if(this.cmtlist){
              this.cmtlist = this.cmtlist.reverse()
              this.cmtlist.forEach(i=>{
                i.create_time = GetTime(i.create_time,".")
                if(i.replies){
                  i.replies = i.replies.reverse()
                  i.replies.forEach(j=>{
                    j.create_time = GetTime(j.create_time, ".")
                  })
                }
              })
            }
            console.log(this.cmtlist)
          } else if (res.status === 204) {
            this.$message({ message: '其他错误', type: 'error' })
          }
        })
        .catch(e => {
          if(e.response.status === 401){
           console.log(e)
          }
        })
    },
    openDiag(id){
      this.subId = id
      this.subComment = ''
      this.dialog = true
    },
    postMsg(fid = null) {
      // 点击发表评论
      console.log(fid)
      postMsg(this.cid, fid?this.subComment:this.commentContent, fid)
        .then(res => {
          console.log(res.data.message)
          this.getMsg(this.cid)
          this.$message({message:'评论成功',type:'info'})
          this.Dialog = false
          console.log('dialog',this.Dialog)
        })
        .catch(err => {
          console.log('评论失败', err)
          this.$message({message:'评论失败',type:'error'})
        })
    },
    deleteMsg(id) {
      // 点击删除评论
      let message = '确定要删除它吗？'
      this.$confirm(message).then(() => {
        //删除
        deleteMsg(id)
          .then(res => {
            if (res.status === 204) {
              this.getMsg(this.cid)
              this.$message({ message: '删除成功！', type: 'info' })
            }
          })
          .catch(()=> this.$message({message:'没有删除权限', type:'error'}))
      })
    },
    toUser(id){
      this.$router.push({name:'PersonInfo', params:{PersonId: id}})
    }
  }
}
</script>

<style>
textarea {
  font-size: 14px;
  margin: 0;
}
 .commentButton .el-button{padding:19px;
}
.list {
  margin-top: 4px;
  .item {
    line-height: 30px;
    .item-title {
      font-size: 14px;
      background-color: #ddd;
    }
    .item-body {
      font-size: 13px;
      text-indent: 2em;
    }
  }
  /*background-color: red;*/
}
.sub-list {
  margin-left: 50px;
  .item {
    line-height: 30px;
    .item-title {
      font-size: 11px;
    }
    .item-body {
      font-size: 10px;
      text-indent: 2em;
    }
  }
}
</style>
