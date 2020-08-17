<template>
  <div class="EditorPage">
    <div style="font-size: large; color: black; font-weight: bold">
      <span style="margin-left: 20px;"></span>

      <el-button icon="el-icon-arrow-left" @click="toHome">返回</el-button>
      <el-button icon="el-icon-plus">新建</el-button>

      <div style="float: right;margin-top: 11px; line-height: 28px;">
        <el-button plain type="primary" @click="setP(Info.builder)"
          >设置权限</el-button
        >
        <el-button plain type="success" @click="shareDialog(Info.builder)"
          >分享</el-button
        >
        <el-button plain type="danger" @click="Delete(Info.builder)"
          >删除</el-button
        >
        <el-button @click="changeContent()">保存</el-button>
        <el-dropdown>
          <el-button icon="el-icon-more"> </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>收藏到收藏夹</el-dropdown-item>
            <el-divider></el-divider>
            <el-dropdown-item>移动</el-dropdown-item>
            <el-dropdown-item>创建副本</el-dropdown-item>
            <el-dropdown-item>导出</el-dropdown-item>
            <el-divider></el-divider>
            <el-dropdown-item>文档信息</el-dropdown-item>
            <el-divider></el-divider>
            <el-dropdown-item>帮助</el-dropdown-item>
            <el-divider></el-divider>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dialog
          title="文件详细信息"
          :visible.sync="Dialog"
          width="30%"
          center
        >
          <div style="">
            <div>文件名：{{ Info.builder }}</div>
            <div>创建者：{{ Info.builder }}</div>
            <div>创建日期：{{ Info.builder }}</div>
            <div>最后修改时间：{{ Info.builder }}</div>
            <div>修改次数：{{ Info.builder }}</div>
            <el-divider></el-divider>
            <div>
              协作者：
              <div
                v-for="(item, index) in Info.coworkers"
                :key="index"
                class="coworkers"
              >
                <el-avatar
                  :src="item.userImg"
                  :size="'small'"
                  style="cursor: pointer;vertical-align: sub;"
                ></el-avatar>
                <span
                  style="height: 28px; padding-right: 15px;margin-left: 10px;"
                  >{{ item.userName }}</span
                >
                <i class="el-icon-user" v-if="item.isBuilder"></i>
              </div>
            </div>
            <el-divider></el-divider>
            <!--        <el-switch--><!--这是控制权限部分-->
            <!--          style="padding-right: 20px;"-->
            <!--          v-model="Info._public">-->
            <!--        </el-switch>-->
            <!--        <span v-if="Info._public" style="font-weight: bold;">公开</span>-->
            <!--        <span v-else style="font-weight: bold;">未公开(此时分享，除协作者外不可见)</span>-->
            <div>
              <el-button plain type="primary" @click="setP(Info.builder)"
                >设置权限</el-button
              >
            </div>
            <div style=" margin-top: 20px;">
              <el-button
                plain
                type="success"
                @click="shareDialog(Info.builder)"
              >
                分享</el-button
              >
            </div>
            <div style=" margin-top: 20px;">
              <el-button plain type="danger" @click="Delete(Info.builder)">
                <span v-if="type === 'dustbin'">彻底</span>删除
              </el-button>
            </div>
          </div>
        </el-dialog>

        <share-dialog
          :share-dialog="shareV"
          :share-id="shareId"
          @changeVisible="changeShare"
        ></share-dialog>
        <set-dialog
          :set-dialog="setV"
          :set-id="setId"
          @changeVisible="changeP"
        ></set-dialog>

        <span style="margin-left: 20px;"></span>
      </div>
    </div>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="正文">
        <editor-bar
          v-model="content"
          :isClear="isClear"
          @change="change"
        ></editor-bar>
      </el-form-item>
      <el-form-item label="评论区">
        <comment-bar
          v-model="detail"
          :newsid="id"
          isClear="isClear"
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
import Axios from "../api/index"
import { getContent } from "../api/api"
import EditorBar from "../components/Editor"
import CommentBar from "../components/Comment"

export default {
  components: { EditorBar, CommentBar },
  data() {
    return {
      input: "",
      activeIndex: "1",
      isClear: false,
      detail: "",
      Info: {
        builder: "Kelly",
        coworkers: [
          {
            userId: 1,
            userName: "Kelly",
            isBuilder: true,
            isCollected: true,
            userImg:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          },
          {
            userId: 2,
            userName: "Kelly2",
            isBuilder: false,
            isCollected: true,
            userImg:
              "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          }
        ],
        _public: false
      },

      date: "2016-05-02",
      name: "王小虎",
      builder: "家",
      isCollected: false,
      id: 1,
      isFolder: false,
      title: "未命名文本",
      content: "今天天气很好，小王出门散步。",

      shareId: "",
      shareV: false,
      setId: "2",
      setV: false,

      ruleForm: {
        title: "",
        description: "",
        content: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入摘要", trigger: "blur" }
        ],
        content: [{ trequired: true, message: "请输入内容", trigger: "blur" }]
      }
    }
  },

  methods: {
    //获取文章内容
    getContent(id) {
      getContent(id)
        .then(response => {
          if (response.status === 200) {
            console.log(response)
            this.name = response.data.username
            this.content = response.data.content
            this.ID = response.data.id
          } else {
            this.$message({
              message: "获取信息失败" + response.message,
              type: "error"
            })
          }
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    changeContent() {
      this.$refs.content.validate(valid => {
        if (valid) {
          const axios = Axios
          axios
            .patch(
              "http://127.0.0.1:8000/editorpage/" + localStorage.docID + "/",
              {
                content: this.content
              }
            )
            .then(response => {
              if (response.status === 200) {
                console.log(response)
                console.log(localStorage.token)
                this.$message({
                  message: "修改文章成功",
                  type: "info"
                })
              } else {
                this.$message({
                  message: "修改文章失败",
                  type: "error"
                })
              }
            })
            .catch(error => {
              console.log(error.response)
            })
        }
      })
    },
    change(val) {
      console.log(val)
    },
    send(id) {
      let message = "确定要保存当前改动吗？"
      this.$confirm(message).then(_ => {
        console.log(id + _)
        this.Dialog = false
        
      })
    },
    goBack() {
      console.log("go back")
    },
    toHome() {
      this.$router.go(-1)
    },
    Delete(id) {
      let message =
        this.type === "dustbin" ? "确定要彻底删除它吗？" : "确定要删除它吗？"
      this.$confirm(message).then(_ => {
        console.log(id + _)
        this.Dialog = false
      })
    },
    shareDialog(id) {
      this.shareId = id
      this.shareV = true
    },
    changeShare(val) {
      this.shareV = val
    },
    setP(id) {
      console.log("set")
      this.setId = id
      this.setV = true
    },
    changeP(val) {
      this.setV = val
    },
    submitForm(formName) {
      this.$refs[formName]
        .validate(valid => {
          if (valid) {
            alert("submit!")
          } else {
            console.log("error submit!!")
            return false
          }
        })
        .then(res => {
          console.log(res)
        })
    },
    mounted() {
      this.ID = this.$route.params.personId
      if (this.ID === localStorage.userId) {
        this.ifChangeVisible = true
        this.ifChangeHeadVisible = true
        this.getContent(this.$route.params.personId)
      } else {
        this.ifChangeVisible = false
        this.ifChangeHeadVisible = false
        //this.getOtherInfo(this.$route.params.personId)
      }
    }
  }
}
</script>

<style>
//append-to-body=“true”
.EditorPage {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: whitesmoke;
}
.setRadio .el-radio__label {
  font-size: 16px;
  padding-left: 10px;
}
.badgeitem {
  padding: 0;
}

.el-popover {
  padding: 0px;
}
</style>
