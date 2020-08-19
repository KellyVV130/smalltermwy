<template>
  <div v-if="isV">
    <div>
      <el-dialog title="分享文档" :visible.sync="shareDialog"
       style="width: 70%;margin: 0 auto; text-align: center;" :show-close="false" :close-on-click-modal="false">
        分享{{shareName}}<br>
        <div style="background-color: #fff"><img :src="shareImg"></div>
        <span style="font-size: small;">右键可选择复制二维码或链接</span><br>
        <a :href="url">{{url}}</a>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="submitForm">关闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "shareDialog",
    props: {
      shareDialog: {
        default: false
      },
      shareId: {
        default: false
      },
      shareName:{
        default: ''
      }
    },
    watch:{
      shareDialog(val){
        this.isV = val
      },
      shareId(){
        this.init()
      }
    },
    data(){
      return {
        isV: false,
        shareImg: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        url:'http://47.104.15.57/index/#/'
      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        this.url = 'http://47.104.15.57/index/#/editorPage?key='+this.shareId
        console.log(this.shareId,'url')
        this.axios.get('/qrcode/', {params:{doc: this.shareId},responseType: 'blob'}).then(res => {
          let blob = new Blob([res.data],{type: "image/jpeg"});
          let url = window.URL.createObjectURL(blob);
          this.shareImg = url
        })
      },
      cancelForm(){
        this.$emit('changeVisible', false)
      },
      submitForm(){
        this.$emit('changeVisible', false)
      },
    }
  }
</script>

<style scoped>

</style>