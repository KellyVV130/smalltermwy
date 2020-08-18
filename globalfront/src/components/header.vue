<template>
  <div class="header">
    <div style="font-size: large; color: black; font-weight: bold">
      <img :src="logo" style="width: 44px; height: 44px; object-fit: cover; vertical-align: top;margin-top: 3px;">
      <span style="margin-left: 18px;">GlobalDoc</span>
    <div style="float: right;margin-top: 11px; line-height: 28px;">
      <el-badge is-dot class="badgeitem" :hidden="!hasMessage">
        <el-popover
          placement="top-start"
          trigger="click"><!--这里应当是未读消息列表？-->

          <el-table :data="gridData" :show-header="false" :row-class-name="tableRowClassName" :cell-class-name="tableCellClassName" @cell-click="cellClick">
            <template slot="empty" style="background-color: whitesmoke;">
<!--              <img style="width: 100px;height: 100px;margin-top:20px;" :src="logo"><br>-->
              暂无消息
            </template>
            <el-table-column width="180">
              <template slot-scope="scope"><span>{{scope.row.time}}</span></template>
            </el-table-column>

            <el-table-column width="100">
              <template slot-scope="scope"><span>{{scope.row.origin_user.username}}</span></template>
            </el-table-column>

            <el-table-column width="35">
              <template slot-scope="scope">
              <i v-if="scope.row.type===1" class="el-icon-user" style="margin-top:40%; margin-left:10px"></i>
              <i v-if="scope.row.type===2" class="el-icon-s-comment" style="margin-top:40%; margin-left:10px"></i>
              <i v-if="scope.row.type===3" class="el-icon-close" style="margin-top:40%; margin-left:10px"></i>
              <i v-if="scope.row.type===4" class="el-icon-error" style="margin-top:40%; margin-left:10px"></i>
              <i v-if="scope.row.type===5" class="el-icon-user" style="margin-top:40%; margin-left:10px"></i>
              <i v-if="scope.row.type===6" class="el-icon-chat-line-round" style="margin-top:40%; margin-left:10px"></i>
              <i v-if="scope.row.type===7" class="el-icon-chat-round" style="margin-top:40%; margin-left:10px"></i>
              <i v-if="scope.row.type===8" class="el-icon-close" style="margin-top:40%; margin-left:10px"></i>
              <i v-if="scope.row.type===9" class="el-icon-error" style="margin-top:40%; margin-left:10px"></i>
              <i v-if="scope.row.type===10" class="el-icon-circle-close" style="margin-top:40%; margin-left:10px"></i>
              </template>
            </el-table-column>

            <el-table-column width="200">
              <template slot-scope="scope">
                <span>{{scope.row.content}}</span>
              </template>
            </el-table-column>
            
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="删除" placement="bottom">
                <i class="el-icon-close" @click="refuseMessage(scope.$index,scope.row)" style="cursor: pointer;"></i>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column width="40">
              <template slot-scope="scope">
                <el-tooltip effect="dark" content="标为已读" placement="bottom">
                <i class="el-icon-check" @click="checkMessage(scope.$index,scope.row)" style="cursor: pointer;"></i>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>

          <el-avatar icon="el-icon-message-solid" :size="'small'" style="cursor: pointer;" slot="reference" ></el-avatar>
        </el-popover>
      </el-badge>
      
      <el-badge :hidden="true" class="badgeitem">
        <el-dropdown trigger="click" @command="handleCommand" placement="bottom-end">
          <span class="el-dropdown-link">
            <el-avatar :src="head" :size="'small'"
                        style="margin-left: 40px; margin-right: 35px; cursor: pointer;"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item class="clearfix" command="a">个人信息</el-dropdown-item>
            <el-dropdown-item class="clearfix" command="b">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-badge>
    

    </div>
    </div>
  </div>
</template>

<script>
import logo from '../assets/icon.png'
import {getMessage,readMessage,deleteMessage,getUserInfo} from '../api/api'
import { GetTime } from '../main'
  export default {
    name: "brain",
    data(){
      return{
        head: '',
        timer: '',
        logo: logo,
        userImg:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        hasMessage:true,
        gridData: [{
          id: 1,
          user: {
            id: 3,
            username: 'ccc',
            head:null
          },
          origin_user: {
            id: 1,
            username: 'ss',
            head:null
          },
          document: {
            id: 1,
            name: '本地数据'
          },
          time: '2020-08-16T09:24:59.690589',
          type: 1,
          status: 0,
          content: '添加你为[小学期]协作者'
        }]
      }
    },
    methods:{
      //获取未读消息
      getMessage(){
        if(localStorage.userId){
          getMessage().then(response => {
            if(response.status===200){
              console.log(response)
              this.gridData=response.data
              if(response.data.length===0) this.hasMessage=false
              else if(response.data.length!==0) this.hasMessage=true
              for(var i=0;i<response.data.length;i++){
                this.gridData[i].time=GetTime(this.gridData[i].time,'.')
                if(response.data[i].type===1){//1:团队邀请信息（给被邀请人发）
                  this.gridData[i].content='邀请你加入团队'
                }else if(response.data[i].type===2){//2:加入团队结果（给邀请人+老大发）
                  this.gridData[i].content='同意了你的团队邀请'
                }else if(response.data[i].type===3){//3:退出团队结果（给老大发）
                  this.gridData[i].content='退出了团队'
                }else if(response.data[i].type===4){//4:被踢出团队提醒（给被踢的人发）
                  this.gridData[i].content='将你移出团队'
                }else if(response.data[i].type===5){//5:被加入协作者提醒（给被邀请人发）
                  this.gridData[i].content='邀请你成为协作者'
                }else if(response.data[i].type===6){//6:文档被评论（给被评论的文档的创建者+协作者发）
                  this.gridData[i].content='评论了你的文档'
                }else if(response.data[i].type===7){//7:评论被回复（给被回复的评论人发）
                  this.gridData[i].content='回复了你的评论'
                }else if(response.data[i].type===8){//8:退出文档协作者结果（给创建者发）
                  this.gridData[i].content='退出了文档协作者'
                }else if(response.data[i].type===9){//9：被踢出文档协作者提醒（给被踢的人发）
                  this.gridData[i].content='将你移出文档协作者'
                }else if(response.data[i].type===10){//10: 拒绝团队邀请（给老大发）
                  this.gridData[i].content='拒绝了你的团队邀请'
                }
              }
            }
          })
        }
      },
      //单个消息已读
      checkMessage(index,row){
        if(row.status===1) row.status=0
        else if(row.status===0) row.status=1
        readMessage(row.id,row.status).then(response => {
          if(response.status===200){
            console.log(response)
          }else{
            console.log(response)
          }
        })
      },
      //单个消息删除
      refuseMessage(index,row){
        deleteMessage(row.id).then(response => {
          if(response.status===200){
            console.log(response)
          }else{
            console.log(response)
          }
        })
      },
      //下拉菜单
      handleCommand(command){
        switch (command) {
          case "a":this.toPerson()
            break;
          case "b":this.logOut()
            break;
        }
      },
      //解构单元格
      tableCellClassName({row,column,rowIndex,columnIndex}){
        row.index=rowIndex
        column.index=columnIndex
      },
      cellClick(row,column){
        if(column.index===0 || column.index===1 || column.index===2 || column.index===3){
          this.toInbox()
        } 
      },
      toPerson(){
        this.$router.push({name: 'PersonInfo', params:{personId:localStorage.userId}})
      },
      toInbox(){
        this.$router.push({name: 'Inbox'})
      },
      toLogin(){
        this.$router.push({name: 'Login'})
      },
      logOut(){
        localStorage.removeItem('token')
        localStorage.removeItem('chart')
        localStorage.removeItem('userId')
        localStorage.removeItem('head')
        this.head=''
        this.$router.push({name:'history'})
      },
      getHead(){
        getUserInfo(1).then(response => {
          if(response.status===200){
            this.head=response.data.head
          }
        })
      }
    },
    mounted(){
      window.addEventListener('setItem',(e)=>{
        console.log(e)
        this.getHead()
      })
      this.getMessage()
      this.getHead()
      this.timer=setInterval(this.getMessage,2000)
    },
    beforeDestroy(){
      clearInterval(this.timer)
    },
    watch: {
      head: {
        handler(oldValue,newValue){
          if(oldValue!==newValue){
            this.getHead()
          }
        },
        deep: true,
        immediate: true
      }
    }
}
</script>

<style>
  div.header{
    height: 50px;
    background-color: #fbfbfb;
    line-height: 50px;
    padding: 0 20px 0 15px;
    overflow: hidden;
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