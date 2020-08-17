<template>
  <div>
    <h4>发表评论 --- {{ newsid }}</h4>
    <hr />
    <el-input
      type="textarea"
      :rows="2"
      placeholder="请输入内容"
      v-model="textarea"
    >
    </el-input>
    <el-button type="primary" size="large" @click="postMsg">发表评论</el-button>

    <!-- 评论列表区域 -->
    <div class="el-list">
      <div class="el-item" v-for="(item, i) in cmtlist" :key="i">
        <div class="el-item-title">
          第{{ i + 1 }}楼 用户：{{ item.user_name }} 发表时间：{{
            item.add_time | dateFormat
          }}
        </div>
        <div class="el-item-body">{{ item.content }}</div>
      </div>
    </div>

    <el-button type="danger" size="large" plain @click="loadMore"
      >加载更多</el-button
    >
  </div>
</template>

<script>
export default {
  name: "Comment",
  data() {
    return {
      page: 1, // 默认展示第一页的评论
      cmtlist: [], // 评论数组
      msg: "" // 即将发表的评论内容
    }
  },
  created() {
    this.getCommentByPage()
  },
  methods: {
    async getCommentByPage() {
      // 根据页数来获取评论的数据
      const { data } = await this.$http.get(
        "/api/getcomments/" + this.newsid + "?pageindex=" + this.page
      )
      if (data.status === 0)
        return (this.cmtlist = this.cmtlist.concat(data.message))
    },
    loadMore() {
      // 点击按钮，加载更多的评论
      // 当触发这个加载更多方法的时候，应该让 page 页码 + 1 之后，再调用 getCommentByPage 方法
      this.page++
      this.getCommentByPage()
    },
    async postMsg() {
      // 点击发表评论：
      // 如果用户没有填写评论内容，则阻止其发表评论
      if (this.msg.trim().length <= 0) {
        this.$alert("请填写评论内容！", "提示", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            })
          }
        })
        return
      }
      // 发表评论的逻辑：
      const { data } = await this.$http.post(
        "/api/postcomment/" + this.newsid,
        {
          content: this.msg.trim()
        }
      )
      if (data.status === 0) {
        // 刷新评论列表
        // 1. 再次调用 getCommentByPage()
        // console.log("ok");
        // // 获取评论之前，先把之前所有的评论清空
        // this.cmtlist = [];
        // this.getCommentByPage();

        // 为了防止重新调用 getCommentByPage 方式时候，会把 之前的所有评论清空的问题：
        // 我们 在客户端，手动拼接出一个 评论的对象，并把 这个评论对象， unshift 到 cmtlist 中
        this.cmtlist.unshift({
          user_name: "匿名用户",
          add_time: new Date(),
          content: this.msg.trim()
        })
        this.msg = ""
      }
    }
  },
  props: ["newsid"] // 接收父组件传递过来的新闻Id
}
</script>

<style lang="scss" scoped>
textarea {
  font-size: 14px;
  margin: 0;
}
.cmt-list {
  margin-top: 4px;
  .cmt-item {
    line-height: 30px;
    .cmt-item-title {
      font-size: 14px;
      background-color: #ddd;
    }
    .cmt-item-body {
      font-size: 13px;
      text-indent: 2em;
    }
  }
}
</style>
