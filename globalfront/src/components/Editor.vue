<template lang="html">
  <div class="editor">
<!--    <div ref="toolbar" class="toolbar"></div>-->
<!--    <div ref="editor" class="text"></div>-->
    <div id="div1" class="toolbar">
    </div>

    <div id="div2" class="text"> <!--可使用 min-height 实现编辑区域自动增加高度-->
    </div>
  </div>
</template>

<script>
// import E from "wangeditor";
const E = process.browser ? require('wangeditor') : undefined
export default {
  data() {
    return {
      // uploadPath,
      editor: null,
      info_: null,
      can:false
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    },
    edit:{
      default: true
    }
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    },
    edit(val){
      console.log('editchange',val)
      this.changeEdit()
    }
  },
  mounted() {
    this.seteditor()
    console.log(this.edit,'------------')
    this.editor.txt.html(this.value)
  },
  methods: {
    changeEdit(){
      this.editor.$textElem.attr('contenteditable', this.edit)
    },
    seteditor() {
      this.editor = new E('#div1', '#div2')  // 两个参数也可以传入 elem 对象，class 选择器
      this.editor.customConfig.uploadImgShowBase64 = true // base 64 存储图片
      // this.editor.customConfig.uploadImgServer =
      //   ""; // 配置服务器端地址
      // this.editor.customConfig.uploadImgHeaders = {}; // 自定义 header
      // this.editor.customConfig.uploadFileName = "file"; // 后端接受上传文件的参数名
      // this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024; // 将图片大小限制为 2M
      // this.editor.customConfig.uploadImgMaxLength = 6; // 限制一次最多上传 3 张图片
      // this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000; // 设置超时时间

      // 配置菜单
      this.editor.customConfig.pasteFilterStyle = false
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
        'fullscreen' // 全屏
      ]

      this.editor.customConfig.onchange = html => {
        this.info_ = html // 绑定当前逐渐地值
        console.log('change')
        this.$emit('change', this.info_) // 将内容同步到父组件中
      }
      this.editor.customConfig.onchangeTimeout = 10
      this.editor.customConfig.onfocus = () => {
        console.log('focus')
        this.$emit('onfocus')
      }
      // 创建富文本编辑器
      this.editor.create()
      this.editor.$textElem.attr('contenteditable', true)
    }
  }
}
</script>

<style lang="css">
.editor {
  margin: 0 auto;
  position: relative;
  z-index: 50;
}
.toolbar {
  border: 1px solid #ccc;
}
.text {
  border: 1px solid #ccc;
  min-height: 800px;
}
</style>
