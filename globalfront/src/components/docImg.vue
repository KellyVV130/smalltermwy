<template>
  <div class="docImg">
    <div v-if="type==='history'">
      <el-row :gutter="20">
        <el-col :span="4" v-for="(item, index) in tableData" :key="index" style="">
          <div style="height: 100px;text-align: center">
            <el-card class="fileCard" shadow="hover">
              <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small">
                <i class="el-icon-s-tools" @click="handleClick(item.id)"></i>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small">
                <i class="el-icon-star-on" v-if="item.isCollected" @click="changeColl(item.id)"></i>
                <i class="el-icon-star-off" v-else @click="changeColl(item.id)"></i>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 45px; font-size: x-small">
                <i class="el-icon-s-custom" @click="openFolderDialog(item.id)"></i>
              </div>
              <div style="font-size: 40px;">
                <i class="el-icon-folder" v-if="item.isFolder"></i>
                <i class="el-icon-document" @click="toDoc(item.id)" v-else></i>
              </div>
              <div @click="toDoc(item.id)" style="cursor: pointer">{{item.name}}</div>
              <div style="font-size: x-small; color: grey; margin-top: 12px;">
              {{item.date}}访问</div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-else-if="type === 'dustbin'">
      <el-row :gutter="20">
        <el-col :span="4" v-for="(item, index) in tableData" :key="index" style="">
          <div style="height: 100px;text-align: center">
            <el-card class="fileCard" shadow="hover">
              <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small">
                <i class="el-icon-s-tools" @click="handleClick(item.id)"></i>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small">
                <i class="el-icon-refresh-right" @click="recover(item.id)"></i>
              </div>
              <div style="font-size: 40px; cursor: default;">
                <i class="el-icon-folder" v-if="item.isFolder"></i>
                <i class="el-icon-document" v-else></i>
              </div>
              <div @click="toDoc(item.id)" style="cursor: pointer">{{item.name}}</div>
              <div style="font-size: x-small; color: grey; margin-top: 12px;">
              删除于{{item.date}}</div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <div v-else>
      <el-row :gutter="20">
        <el-col :span="4" v-for="(item, index) in tableData" :key="index" style="">
          <div style="height: 100px;text-align: center">
            <el-card class="fileCard" shadow="hover">
              <div style="right: 5px; line-height: 5px;position: absolute; top: 5px; font-size: x-small">
                <i class="el-icon-s-tools" @click="handleClick(item.id)"></i>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 25px; font-size: x-small">
                <i class="el-icon-star-on" v-if="item.isCollected" @click="changeColl(item.id)"></i>
                <i class="el-icon-star-off" v-else @click="changeColl(item.id)"></i>
              </div>
              <div style="right: 5px; line-height: 5px;position: absolute; top: 45px; font-size: x-small">
                <i class="el-icon-s-custom" @click="openFolderDialog(item.id)"></i>
              </div>
              <div style="font-size: 40px;">
                <i class="el-icon-folder" v-if="item.isFolder"></i>
                <i class="el-icon-document" @click="toDoc(item.id)" v-else></i>
              </div>
              <div @click="toDoc(item.id)" style="cursor: pointer">{{item.name}}</div>
              <div style="font-size: x-small; color: grey; margin-top: 12px;">
              {{item.date}}最后修改</div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      title="文件详细信息"
      :visible.sync="Dialog"
      width="30%"
      center>
      <div style="">
        <div>文件名：{{Info.builder}}</div>
        <div>创建者：{{Info.builder}}</div>
        <div>创建日期：{{Info.builder}}</div>
        <div>最后修改时间：{{Info.builder}}</div>
        <div>修改次数：{{Info.builder}}</div>
        <el-divider></el-divider>
        <div>协作者：
          <div v-for="(item, index) in Info.coworkers" :key="index" class="coworkers">
            <el-avatar :src="item.userImg" :size="'small'" style="cursor: pointer;vertical-align: sub;"></el-avatar>
            <span style="height: 28px; padding-right: 15px;margin-left: 10px;">{{item.userName}}</span>
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
        <div><el-button plain type="primary" @click="setP(Info.builder)">设置权限</el-button> </div>
        <div style=" margin-top: 20px;"><el-button plain type="success" @click="shareDialog(Info.builder)">
          分享</el-button></div>
        <div style=" margin-top: 20px;"><el-button plain type="danger" @click="Delete(Info.builder)">
          <span v-if="type==='dustbin'">彻底</span>删除
          </el-button>
        </div>
      </div>
    </el-dialog>

    <folder-dialog
        :dialog="folderDialog"
        @changeVisible="changeVisible"
        :doc-id="docId"
        :type="'coworker'"></folder-dialog>

    <share-dialog :share-dialog="shareV" :share-id="shareId" @changeVisible="changeShare"></share-dialog>
    <set-dialog :set-dialog="setV" :set-id="setId" @changeVisible="changeP"></set-dialog>
  </div>
</template>

<script>
  export default {
    name: "docImg",
    props:{
      type:{
        default: 'history'//'collection', 'build', 'dustbin', 'team'?
      }
    },
    data(){
      return{
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          builder: '家',
          isCollected: false,
          id: 1,
          isFolder: false,
        }, {
          date: '2016-05-04',
          name: '王小虎',
          builder: '公司',
          isCollected: true,
          id: 2,
          isFolder: false,
        }, {
          date: '2016-05-01',
          name: '王小虎',
          builder: '家',
          isCollected: true,
          id: 3,
          isFolder: false,
        }, {
          date: '2016-05-03',
          name: '王小虎',
          builder: '公司',
          isCollected: true,
          id: 4,
          isFolder: false,
        }, {
          date: '2016-05-03',
          name: '王小虎',
          builder: '公司',
          isCollected: true,
          id: 5,
          isFolder: false,
        }],
        Dialog: false,
        Info:{
          builder: 'Kelly',
          coworkers:[
            {
              userId: 1,
              userName: 'Kelly',
              isBuilder: true,
              isCollected: true,
              userImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              userId: 2,
              userName: 'Kelly2',
              isBuilder: false,
              isCollected: true,
              userImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ],
          _public: false
        },
        folderDialog: false,
        docId: '1',
        shareId: '',
        shareV: false,
        setV: false,
        setId: '2',
      }
    },
    methods:{
      toDoc(id){
        this.$router.push({name:'editorPage', params: {docId: id}})
      },
      handleClick(id){
        // this.tableData.forEach(i =>{
        //   if(i.id === id){
        //     this.Info = i
        //     return;
        //   }
        // })
        this.Dialog = true
        console.log(id)
      },
      Delete(id){
        let message = this.type === 'dustbin'?'确定要彻底删除它吗？':'确定要删除它吗？'
        this.$confirm(message).then(_ => {
          console.log(id+_)
          this.Dialog = false
        })
      },
      shareDialog(id){
        this.shareId = id
        this.shareV = true
      },
      changeShare(val){
        this.shareV = val
      },
      changeVisible(val){
        this.folderDialog = val
      },
      openFolderDialog(id){
        this.docId = id
        this.folderDialog = true
      },
      changeColl(id){
        this.tableData.forEach(i => {
          if(i.id === id){
            i.isCollected = !i.isCollected
            return;
          }
        })
      },
      recover(id){
        alert(id)
      },
      setP(id){
        console.log('set')
        this.setId = id
        this.setV = true
      },
      changeP(val){
        this.setV = val
      }
    },
  }
</script>

<style>
  .docImg{
    height: 80vh;
  }
  .fileCard{
    border: 0px;
    background-color: #FFF;
    transition: .3s;
    height: 100%;
    background-color:rgba(0,0,0,0);
    position: relative;
  }
  .fileCard /deep/ .el-card__body{
    padding: 0;
  }
  .fileCard i{
    cursor: pointer;
  }
  .coworkers {
    margin-top: 15px;
  }
</style>