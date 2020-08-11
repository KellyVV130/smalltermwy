<template>
  <div class="File">
    <!-- 左主界面 -->
    <div class="main">
      <!-- 文档主体 -->
      <div class="article">
        <div class="title">
          <h1>{{ File.title }}</h1>
        </div>
        <!-- 预览各项数据 -->
        <div class="preview">
          <div class="p-identify2">{{ type[File.FileIdentity] }}</div>
          <div class="discuss-File-bottom">
            <div class="discuss-File-bottom-item">
              <img src="../../assets/Icon/File/preview.png" alt="" />
              <div class="num">{{ File.browseNum }}</div>
            </div>
            <div class="discuss-File-bottom-item">
              <img src="../../assets/Icon/File/likes.png" alt="" />
              <div class="num">{{ File.likesNum }}</div>
            </div>
            <div class="discuss-File-bottom-item">
              <img src="../../assets/Icon/File/comment.png" alt="" />
              <div class="num">{{ File.commentNum }}</div>
            </div>
          </div>
        </div>
        <!-- 文档创建时间 -->
        <div class="time">
          文档创建：{{ File.createTime }} | 最后编辑：{{ File.editTime }}
        </div>

        <!-- 文档内容 -->
        <div class="content ql-snow">
          <div class="wangeditor" v-html="File.content">
            {{ File.content }}
          </div>
        </div>

        <!-- 分割线 -->
        <div class="div"></div>
        <!-- 收藏按钮 -->
        <div class="File-footer">
          <div class="likes-end">
            <img
              @click="likesClick"
              v-if="!isLikes"
              src="../../assets/Icon/File/likes.png"
              alt=""
            />
            <img
              @click="unlikesClick"
              v-else
              src="../../assets/Icon/File/likes_cur.png"
              alt="图片无法加载"
            />
            {{ File.likesNum }}
          </div>
        </div>
      </div>
      <!-- 评论框 -->
      <div id="new-comment" class="new-comment">
        <textarea
          class="textarea"
          type="textarea"
          placeholder=""
          v-model="newcomment"
          maxlength="1000"
          show-word-limit
        >
        </textarea>
        <el-button @click="commentPush" class="comment-submit" type="primary"
          >评论</el-button
        >
      </div>
      <!-- 评论区 -->
      <ul class="comment-p">
        <li
          class="comment-item"
          v-for="(item, index) in File.listComment"
          :key="index"
        >
          <img class="img" :src="item.imagePath" alt="QAQ" />
          <div class="main">
            <div class="main-top">
              <div class="main-top-title">
                <div class="name">
                  {{ item.userName }}
                </div>
                <img class="level" :src="getLevel(item.userLevel)" alt="" />
              </div>
              <div
                v-if="isAdmin"
                @click="manageProfile(item.userID)"
                class="main-top-manage"
              >
                管理
              </div>
            </div>
            <div class="content">
              {{ item.content }}
            </div>
            <div class="bottom">
              <div class="date">
                {{ item.createTime }}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 右侧展示栏 -->
    <div class="aside">
      <!-- 作者 -->
      <div class="author">
        <img class="head" :src="File.imagePath" alt="图片无法加载QAQ" />
        <div :class="isAdmin ? 'xxx' : ''">
          <div
            @click="manageProfile(File.userID)"
            style="margin-left: 5px;"
            v-if="isAdmin"
            class="profile-manage"
          >
            管理
          </div>
          <div class="author-content">
            <div class="author-name">
              {{ File.userName }}
            </div>
            <img class="level" :src="getLevel(File.userLevel)" alt="" />
          </div>
        </div>
      </div>
      <!-- 所属板块 -->
      <div class="section-head">
        所属板块
      </div>

    </div>
    <!-- 左侧固定可选操作 -->
    <div class="File-option">
      <div @click="commentClick">
        <img src="../../assets/Icon/File/comment.png" alt="" />
      </div>
      <div>
        <img
          v-if="!isLikes"
          @click="likesClick"
          src="../../assets/Icon/File/likes.png"
          alt=""
        />
      </div>
      <div @click="manageClick">
        <img v-if="isMyFile" src="../../assets/Icon/File/manage.png" alt="" />
        <img
          v-else-if="isAdmin"
          src="../../assets/Icon/File/manage.png"
          alt=""
        />
      </div>
    </div>
    <!-- 阴影 -->
    <div
      :class="[manage ? '' : 'page-mask-show']"
      @click="manage = !manage"
      class="page-mask"
    ></div>
    <!-- 悬浮窗 -->
    <div :class="[manage ? 'page-state' : 'page-state-hide']" class="open-page">
      <div class="hover-File login">
        <div class="hover-radio-title-File">
          管理
        </div>
        <!-- <div class="login-div"></div> -->
        <div class="hover-radio-File">
          <label
            v-if="isAdmin && File.stickState == 0"
            class="hover-radio-i-File"
          >
          <label class="hover-radio-i-File">
            <input
              name="type"
              type="radio"
              id="0"
              value="编辑"
              :checked="manageType == '编辑'"
              v-model="manageType"
            />
            编辑
          </label>
          <label class="hover-radio-i-File" style="color:red">
            <input
              name="type"
              type="radio"
              id="0"
              value="删除"
              v-model="manageType"
            />
            删除
          </label>
        </div>
        <!-- <div class="login-div"></div> -->
        <div class="hover-radio-bottom-File">
          <button @click="cancel" class="hover-radio-button-File cancel">
            取消
          </button>
          <button @click="assure" class="hover-radio-button-File assure">
            确定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import E from "wangeditor";
const E = process.browser ? require("wangeditor") : undefined;
import {
  likeFile,
  pushComment,
  deleteFile
} from "../../network/File";
import { isNotNew } from "../../network/user";
export default {
  name: "File",
  methods: {
    commentPush() {
      let FileID = this.File.FileID;
      let userID = this.userID;
      let content = this.newcomment;
      pushComment(userID, FileID, content)
        .then(res => {
          if (res == null) this.$message.error("评论失败了~请检查您的网络");
          else {
            res.createTime = "刚刚";
            this.File.listComment.push(res);
            this.$message({
              type: "success",
              message: "评论成功~"
            });
            this.newcomment = "";
          }
        })
        .catch(err => {
          this.$message.error("评论失败了~请检查您的网络");
        });
    },
    likesClick() {
      this.File.listLikes.push(this.userID);
      this.File.likesNum += 1;
    },
    unlikesClick() {
      let id = this.File.listLikes.indexOf(this.userID);
      console.log(id);
      this.File.listLikes.splice(id, 1);
      this.File.likesNum -= 1;
    },
    manageClick() {
      this.manage = true;
    },
    commentClick() {
      let el = document.getElementById("new-comment");
      console.log(el);
      this.$nextTick(function() {
        window.scrollTo({ behavior: "smooth", top: el.offsetTop - 70 });
      });
    },
    cancel() {
      this.manage = false;
    },
    assure() {
      if (this.manageType == "编辑") this.toEdit();
      else if (this.manageType == "删除") {
        let FileID = this.File.FileID;
        let userID = this.$store.state.user.userID;
        deleteFile(FileID, userID)
          .then(res => {
            if (res == 0) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.FileStatus = 1;
              this.$router.go(-1);
            } else this.$message.error("删除失败，请检查您的网络~");
          })
          .catch(err => {
            this.$message.error("删除失败，请检查您的网络~");
          });
      },
    toEdit() {
      let File = this.File;
      this.$router.push({
        path: "/editFile",
        query: {
          File: File
        }
      });
    }
  }
};
</script>
<style>
  .basic{
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: whitesmoke;
  }
</style>
