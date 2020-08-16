<template>
  <div v-if="isV">
    <el-dialog title="管理全部团队" :visible.sync="dialog" style="width: 70%;margin: 0 auto;">

    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "allTeam",
    props:{
      dialog:{
        default: false
      },
      teams:{
        default: []
      }
    },
    data(){
      return{
        isV: false,
      }
    },
    watch:{
      dialog(val){
        this.isV = val
      }
    }
  }
</script>

<style scoped>

</style>