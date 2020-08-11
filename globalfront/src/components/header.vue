<template>
  <div class="header">
    <div style="font-size: large; color: black; font-weight: bold">
      环球文档
      <span style="margin-left: 8px;">GlobalDoc</span>
    <div style="float: right;margin-top: 11px; line-height: 28px;">
      <el-badge is-dot class="item" :hidden="!hasMessage">
        <el-popover
          placement="top-start"
          width="435"
          trigger="hover"><!--这里应当是未读消息列表？-->

          <el-table :data="gridData" :show-header="false" :row-class-name="tableRowClassName">
            <el-table-column width="35"><el-link :underline="false"><i class="el-icon-view"></i></el-link></el-table-column>
            <el-table-column width="100" property="date"></el-table-column>
            <el-table-column width="100" property="name"></el-table-column>
            <el-table-column width="200" property="content"></el-table-column>
          </el-table>

          <el-avatar icon="el-icon-message-solid" :size="'small'" style="cursor: pointer;" slot="reference"></el-avatar>
        </el-popover>
      </el-badge>
      <el-badge :hidden="true">
        <el-avatar :src="userImg" :size="'small'" style="margin-left: 40px; cursor: pointer;"></el-avatar>
      </el-badge>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "head",
    data(){
      return{
        userImg:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        hasMessage:false,
        gridData: [{
          date: '2020/08/11',
          name: 'whisper',
          content: '添加你为[小学期]协作者'
        }, {
          date: '2016/05/04',
          name: 'sunny',
          content: '评论了[小学期]'
        },{
          date: '2020/08/11',
          name: 'whisper',
          content: '添加你为[小学期]协作者'
        }]
      }
    },
    methods:{
      tableRowClassName({rowIndex}){
        if(rowIndex===1) return 'warning-row';
        else return 'success-row';
      }
    }
  }
</script>

<style>
  div.header{
    height: 50px;
    background-color: #fbfbfb;
    line-height: 50px;
    padding: 0 20px;
  }
  
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #e3eee3;
  }
</style>