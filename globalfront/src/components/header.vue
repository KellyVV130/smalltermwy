<template>
  <div class="header">
    <div style="font-size: large; color: black; font-weight: bold">
      环球文档
      <span style="margin-left: 8px;">GlobalDoc</span>
    <div style="float: right;margin-top: 11px; line-height: 28px;">
      <el-badge is-dot class="item" :hidden="!hasMessage">
        <el-popover
          placement="top-start"
          title="未读消息"
          width="500"
          trigger="hover"><!--这里应当是未读消息列表？-->
          <el-table :data="gridData" style="height: 100px;">
            <el-table-column width="150" property="date" label="日期"></el-table-column>
            <el-table-column width="100" property="name" label="姓名"></el-table-column>
            <el-table-column width="250" property="address" label="地址"></el-table-column>
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
    name: "brain",
    data(){
      return{
        userImg:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        hasMessage:false,
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    }
  }
</script>

<style scoped>
  div.header{
    height: 50px;
    background-color: #fbfbfb;
    line-height: 50px;
    padding: 0 20px;
  }
</style>