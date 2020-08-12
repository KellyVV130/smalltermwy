<template>
  <div v-if="isV">
    <div>
      <el-dialog title="分享文档" :visible.sync="shareDialog"
       style="width: 70%;margin: 0 auto;" :show-close="false" :close-on-click-modal="false">
        分享{{shareId}}
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button type="primary" @click="submitForm">确 定</el-button>
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
      }
    },
    watch:{
      shareDialog(val){
        this.isV = val
      }
    },
    data(){
      return {
        isV: false
      }
    },
    methods:{
      cancelForm(){
        this.$emit('changeVisible', false)
      },
      submitForm(){
        console.log(this.form)
        this.$emit('changeVisible', false)
      },
    }
  }
</script>

<style scoped>

</style>