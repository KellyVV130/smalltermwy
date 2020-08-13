<template>
  <div class="docList">
    <div v-if="type === 'history'">
      <el-table
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="readTime"
          label="最后浏览日期"
          sortable
          column-key="readTime"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="docName"
          sortable
          width="400"
          label="文件名">
          <template slot-scope="scope">
            <span  style="cursor: pointer;" @click="toDoc(scope.row.docId)">{{scope.row.docName}}</span>
            <div class="tableI">
            <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
            <i @click="handleEdit(scope.$index, scope.row.docId)"
               class="el-icon-s-tools"></i></el-tooltip>
            <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false">
              <span slot="content"><span v-if="scope.row.isCollected">取消</span>收藏</span>
            <i @click="changeColl(scope.row.docId)"
              v-if="scope.row.isCollected"
              class="el-icon-star-on"></i>
            <i @click="changeColl(scope.row.docId)"
              v-else
              class="el-icon-star-off"></i></el-tooltip>
            <el-tooltip effect="dark" content="添加协作者" placement="bottom" :hide-after="800" :enterable="false">
            <i @click="openFolderDialog(scope.row.docId)"
               class="el-icon-s-custom"></i></el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else-if="type === 'dustbin'">
      <el-table
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          sortable
          width="400"
          label="文件名">
          <template slot-scope="scope">
            {{scope.row.name}}
            <div class="tableI">
            <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
            <i
              @click="handleEdit(scope.$index, scope.row)"
              class="el-icon-s-tools"></i></el-tooltip>
            <el-tooltip effect="dark" content="恢复文档" placement="bottom" :hide-after="800" :enterable="false">
            <i
              @click="recover(scope.row.id)"
              class="el-icon-refresh-right"></i></el-tooltip></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="builder"
          label="创建者"
          sortable
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <span style="cursor: pointer;" @click="toUser(scope.row.builder)">{{scope.row.builder}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="最新修改日期"
          sortable
          column-key="date"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="最新修改者"
          sortable
          column-key="date"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        >
          <template slot-scope="scope">
            <span style="cursor: pointer;" @click="toUser(scope.row.date)">{{scope.row.date}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div v-else>
      <el-table
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
        ref="filterTable"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          sortable
          width="400"
          label="文件名">
          <template slot-scope="scope">
            <span  style="cursor: pointer;" @click="toDoc(scope.row.id)">{{scope.row.name}}</span>
            <div class="tableI">
            <el-tooltip effect="dark" content="文档详情" placement="bottom" :hide-after="800" :enterable="false">
            <i
              @click="handleEdit(scope.$index, scope.row)"
              class="el-icon-s-tools"></i></el-tooltip>
            <el-tooltip effect="dark" placement="bottom" :hide-after="800" :enterable="false">
              <span slot="content"><span v-if="scope.row.isCollected">取消</span>收藏</span>
            <i
              @click="changeColl(scope.row.id)"
              v-if="scope.row.isCollected"
              class="el-icon-star-on"></i>
            <i
              @click="changeColl(scope.row.id)"
              v-else
              class="el-icon-star-off"></i></el-tooltip>
            <el-tooltip effect="dark" content="添加协作者" placement="bottom" :hide-after="800" :enterable="false">
            <i
              @click="openFolderDialog(scope.row.id)"
              class="el-icon-s-custom"></i></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="builder"
          label="创建者"
          sortable
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <span style="cursor: pointer;" @click="toUser(scope.row.builder)">{{scope.row.builder}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="最新修改日期"
          sortable
          column-key="date"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="date"
          label="最新修改者"
          sortable
          column-key="date"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        >
          <template slot-scope="scope">
            <span style="cursor: pointer;" @click="toUser(scope.row.date)">{{scope.row.date}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      title="文件详细信息"
      :visible.sync="Dialog"
      width="30%"
      center>
      <div style="">
        <div>文件名：{{Info.docName}}</div>
        <div>创建者：{{Info.builder}}</div>
        <div>创建日期：{{Info.create_time}}</div>
        <div>最后修改时间：{{Info.modify_time}}</div>
        <el-divider></el-divider>
        <div>协作者：
          <div v-for="(item, index) in Info.coworkers" :key="index" class="coworkers">
            <el-avatar :src="item.userImg" :size="'small'" style="cursor: pointer;vertical-align: sub;"></el-avatar>
            <span style="height: 28px; padding-right: 15px;margin-left: 10px;">{{item.userName}}</span>
            <i class="el-icon-user" v-if="item.isBuilder"></i>
            <el-link type="danger" style="position: absolute; right: 15px; top: 10px;"
                     @click="checkMove(item)" v-if="!item.isBuilder">
              移除</el-link>
          </div>
        </div>
        <el-divider></el-divider>
        <div><el-button plain type="primary" @click="setP(Info.id)">设置权限</el-button> </div>
        <div style=" margin-top: 20px;"><el-button plain type="success" @click="shareDialog(Info.id)">
          分享</el-button></div>
        <div style=" margin-top: 20px;"><el-button plain type="danger" @click="Delete(Info.id)">
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
    <set-dialog :set-dialog="setV" :set-id="setId" @changeVisible="changeP" :visi="visi"></set-dialog>
  </div>
</template>

<script>
  import {fetchRecentDocs, fetchDocInfo, fetchCoworkers} from "../api/api";
  export default {
    name: "docList",
    props:{
      type:{
        default: 'history'//'collection', 'build', 'dustbin', 'team'?
      }
    },
    mounted() {
      this.init()
    },
    data(){
      return {
        tableData: [
            {
          date: '2016-05-02',
          name: '王小虎',
          builder: '家',
          isCollected: false
        }, {
          date: '2016-05-04',
          name: '王小虎',
          builder: '公司',
          isCollected: true
        }, {
          date: '2016-05-01',
          name: '王小虎',
          builder: '家',
          isCollected: true
        }, {
          date: '2016-05-03',
          name: '王小虎',
          builder: '公司',
          isCollected: true
        }],
        Dialog: false,
        Info:{
          builder: 'Kelly',
          coworkers:[
            {
              userId: 1,
              userName: 'Kelly',
              isBuilder: true,
              userImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            },
            {
              userId: 2,
              userName: 'Kelly2',
              isBuilder: false,
              userImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            }
          ]
        },
        docId: '1',
        folderDialog: false,
        shareId: '',
        shareV: false,
        setV: false,
        setId: '2',
        visi: 3,
      }
    },
    watch:{
    },
    methods:{
      init(){
        //请求数据
        if(this.type === 'history'){
          fetchRecentDocs().then(res=>{
            if(res.status === 200){
              console.log(res.data)
              if(res.data.length === 0){
                this.tableData = []
              }else{
                this.tableData = []
                res.data.forEach(i=>{
                  console.log(i)
                  this.tableData.push({
                    docId: i.document.id,
                    docName:i.document.name,
                    readTime: i.read_time
                  })
                console.log(this.tableData)
              })}
            }
          }).catch(e=>{this.$message({message:e, type:'error'})})
        }
      },
      filterTag(value, row) {
        return row.builder === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleEdit(index, row) {//查看文档详细内容
        console.log(index, row);
        //this.Info = row//表格中每个元素是详细信息，只展示部分，点开才展示全部！或根据id请求详细信息。移除协作者时再请求一次
        this.getDocInfo(row)
        this.Dialog = true
      },
      Delete(id){
        let message = this.type === 'dustbin'?'确定要彻底删除它吗？':'确定要删除它吗？'
        this.$confirm(message).then(_ => {
          console.log(id+_)
          this.Dialog = false
        })
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
        this.alert(id)
      },
      toDoc(id){
        this.$router.push({name:'editorPage', params: {docId: id}})
      },
      toUser(name){
        console.log(name)
      },
    // 修改table tr行的背景色
      // eslint-disable-next-line no-unused-vars
      tableRowStyle({ row, rowIndex }) {
        if(row){
          return{
            backgroundColor: "whitesmoke"
          }
        }
      },
      // 修改table header的背景色
      // eslint-disable-next-line no-unused-vars
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background-color: whitesmoke;'
        }
      },
      setP(id){
        this.setId = id
        this.tableData.forEach(i=>{
          if(i.id === id){
            this.visi = i.id//权限码
            return
          }
        })
        this.setV = true
      },
      changeP(val){
        this.setV = val
      },
      shareDialog(id){
        this.shareId = id
        this.shareV = true
      },
      changeShare(val){
        this.shareV = val
      },
      checkMove(item){
        let message = '确定要移除ta吗？'
        let that = this
        this.$confirm(message).then(_ => {
          that.Info.coworkers.remove(item)
          console.log(this.Info.coworkers)
          console.log(item+_)
        })
      },
      getDocInfo(id){
        fetchDocInfo(id).then(res=>{
          if(res.status === 200){
            console.log(res.data)
            this.Info.id = res.data.id
            this.Info.docName = res.data.name
            this.Info.role = res.data.role
            this.Info.isDoc = !res.data.type
            this.Info.modify_time = res.data.modify_time
            this.Info.create_time = res.data.create_time
            fetchCoworkers(this.Info.id).then(res=>{
              if(res.status === 200){
                this.Info.coworkers = []
                res.data.forEach((i, index) => {
                  if(index === 0){
                    this.Info.builder = i.username
                  }
                  this.Info.coworkers.push({
                    userId: i.id,
                    userName: i.username,
                    userImg: i.head,
                    isBuilder: index === 0? true:false
                  })
                })
              }
            }).catch(e => console.log(e.response.data))
          } else if(res.status === 204){
            this.$message({message:'其他错误', type: 'error'})
          }
        }).catch(e=>{
          this.$message({message:e.response.data, type: 'error'})
        })
      }
    }
  }
</script>

<style scoped>
  .docList{
    height: 80vh;
  }
  .tableI{
    float: right;
    font-size: medium;
  }

  .tableI i{
    cursor:pointer;
    margin-right: 15px;
  }
  .el-table-filter__checkbox-group .el-checkbox:last-child {
     margin-bottom: 8px;
  }
  .el-table-filter {
    border: 1px solid #EBEEF5;
    border-radius: 2px;
    background-color: #fbfbfb;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-sizing: border-box;
    margin: 2px 0;
  }
</style>