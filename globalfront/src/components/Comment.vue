<template>
  <div>
    <h4>发表评论</h4>
    <hr />
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="commentContent"
    >
    </el-input>
    <el-button type="primary" size="large" @click="postMsg">发表评论</el-button>

    <!-- 评论列表区域 -->
    <div class="list">
      <div class="item" v-for="(item, i) in cmtlist" :key="i">
        <div class="item-title">
          第{{ i + 1 }}楼 用户：{{ item.author.username }} 发表时间：{{
            item.create_time /* GetTime(item.create_time, ' ') */
          }}
          <el-button @click="postMsg(item.id)" size="small">回复</el-button>
          <el-button @click="deleteMsg()" size="small">删除</el-button>
        </div>
        <div class="item-body">
          {{ item.body }}
          <div class="sub-list">
            <div class="sub-item" v-for="(item2, j) in item.replies" :key="j">
              <div class="sub-item-title">
                第{{ j + 1 }}楼 用户：{{ item2.author.username }} 发表时间：{{
                  item2.create_time /* GetTime(item2.create_time, ' ') */
                }}
                <el-button @click="deleteMsg()" size="small">删除</el-button>
              </div>
              <div class="sub-item-body">{{ item2.body }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteMsg, postMsg, fetchDocInfo } from '../api/api'
// import { GetTime } from './main'
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
      commentContent: ''
    }
  },
  mounted() {
    this.getMsg(this.cid)
  },
  methods: {
    getMsg(id) {
      // 获取评论
      fetchDocInfo(id)
        .then(res => {
          if (res.status === 200) {
            //this.cmtlist = res.data.comments
            this.cmtlist = this.cmtlist.concat(res.data.comments)
          } else if (res.status === 204) {
            this.$message({ message: '其他错误', type: 'error' })
          }
        })
        .catch(e => {
          this.$message({ message: e.response.data, type: 'error' })
        })
    },
    postMsg(fid) {
      // 点击发表评论
      postMsg(this.cid, this.commentContent, fid)
        .then(res => {
          console.log(res.data.message)
        })
        .catch(err => {
          console.log('评论失败', err)
        })
    },
    deleteMsg() {
      // 点击删除评论
      let message = (this.type = '确定要删除它吗？')
      this.$confirm(message).then(_ => {
        console.log(_)
        //删除
        deleteMsg()
          .then(res => {
            if (res.status === 204) {
              this.init()
              this.$message({ message: '删除成功！', type: 'info' })
            }
          })
          .catch(err => console.log('没有删除权限', err))
        this.Dialog = false
      })
    }
  }
}
</script>

<style>
textarea {
  font-size: 14px;
  margin: 0;
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
  //background-color: red;
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
