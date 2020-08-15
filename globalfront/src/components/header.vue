<template>
  <div class="header">
    <div style="font-size: large; color: black; font-weight: bold">
      环球文档
      <span style="margin-left: 8px;">GlobalDoc</span>
    <div style="float: right;margin-top: 11px; line-height: 28px;">
      <el-badge is-dot class="badgeitem" :hidden="!hasMessage">
        <el-popover
          placement="top-start"
          trigger="click"><!--这里应当是未读消息列表？-->

          <el-table :data="gridData" :show-header="false" :row-class-name="tableRowClassName">
            <el-table-column width="35"><el-link :underline="false"><i class="el-icon-view"></i></el-link></el-table-column>
            <el-table-column width="100" property="date"></el-table-column>
            <el-table-column width="100" property="name"></el-table-column>
            <el-table-column width="200" property="content"></el-table-column>
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="删除" placement="bottom">
                <i class="el-icon-close" @click="refuseMessage(scope.row)" style="cursor: pointer;"></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="标为已读" placement="bottom">
                <i class="el-icon-check" @click="checkMessage(scope.row)" style="cursor: pointer;"></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

          <el-avatar icon="el-icon-message-solid" :size="'small'" style="cursor: pointer;" slot="reference"></el-avatar>
        </el-popover>
      </el-badge>
      <el-badge :hidden="true" class="badgeitem">
        <el-avatar :src="userImg" :size="'small'"
                   style="margin-left: 40px; cursor: pointer;" @click.native="toPerson"></el-avatar>
      </el-badge>
    </div>
    </div>
  </div>
</template>

<script>
import {getMessage} from '../api/api'
  export default {
    name: "brain",
    data(){
      return{
        userImg:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        hasMessage:true,
        gridData: [{
          id: 1,
          date: '2020/08/11',
          name: 'whisper',
          type: 1,
          content: '添加你为[小学期]协作者'
        }, {
          id: 2,
          date: '2016/05/04',
          name: 'sunny',
          content: '评论了[小学期]'
        }]
      }
    },
    methods:{
      //获取未读消息
      getMessage(){
        getMessage().then(response => {
          if(response.status===200){
            console.log(response)
            let i=0
            for(i=0;i<response.data.length;i++){
              this.gridData[i].id=response.data[i].id
              this.gridData[i].date=response.data[i].time
              this.gridData[i].name=response.data[i].origin_user//origin_user是谁发出这个消息
              this.gridData[i].type=response.data[i].type
              if(response.data[i].type===1){//1:团队邀请信息（给被邀请人发）
                this.gridData[i].content='邀请你加入团队'
              }
              else if(response.data[i].type===2){//2:加入团队结果（给邀请人+老大发）
                this.gridData[i].content='回复了你的团队邀请'
              }
              else if(response.data[i].type===3){//3:退出团队结果（给老大发）
                this.gridData[i].content='退出了团队'
              }
              else if(response.data[i].type===4){//4:被踢出团队提醒（给被踢的人发）
                this.gridData[i].content='将你移出团队'
              }
              else if(response.data[i].type===5){//5:被加入协作者提醒（给被邀请人发）
                this.gridData[i].content='邀请你成为协作者'
              }
              else if(response.data[i].type===6){//6:文档被评论（给被评论的文档的创建者+协作者发）
                this.gridData[i].content='评论了你的文档'
              }
              else if(response.data[i].type===7){//7:评论被回复（给被回复的评论人发）
                this.gridData[i].content='回复了你的评论'
              }
              else if(response.data[i].type===8){//8:退出文档协作者结果（给创建者发）
                this.gridData[i].content='退出了文档协作者'
              }
              else if(response.data[i].type===9){//9：被踢出文档协作者提醒（给被踢的人发）
                this.gridData[i].content='将你移出文档协作者'
              }
            }
          }
        })
      },
      //控制表格颜色 舍弃？
      tableRowClassName({rowIndex}){
        if(rowIndex===1) return 'warning-row';
        else return 'success-row';
      },
      checkMessage(row){
        console.log(row)
      },
      refuseMessage(row){
        console.log(row)
      },
      toPerson(){
        this.$router.push({name: 'PersonInfo', params:{personId:localStorage.userId}})
      }
    },
    mounted(){
      this.getMessage()
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

  .badgeitem{
    padding: 0;
  }

  .el-popover {
    padding: 0px;
  }
</style>