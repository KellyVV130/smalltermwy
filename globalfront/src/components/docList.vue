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
          prop="date"
          label="最后浏览日期"
          sortable
          column-key="date"
          :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          sortable
          width="400"
          label="文件名">
          <template slot-scope="scope">
            <span  style="cursor: pointer;" @click="toDoc(scope.row.id)">{{scope.row.name}}</span>
            <div class="tableI">
            <i @click="handleEdit(scope.$index, scope.row)"
              class="el-icon-s-tools"></i>
            <i @click="changeColl(scope.row.id)"
              v-if="scope.row.isCollected"
              class="el-icon-star-on"></i>
            <i @click="changeColl(scope.row.id)"
              v-else
              class="el-icon-star-off"></i>
            <i @click="openFolderDialog(scope.row.id)"
              class="el-icon-s-custom"></i></div>
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
            <i
              @click="handleEdit(scope.$index, scope.row)"
              class="el-icon-s-tools"></i>
            <i
              @click="recover(scope.row.id)"
              class="el-icon-refresh-right"></i></div>
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
            <i
              @click="handleEdit(scope.$index, scope.row)"
              class="el-icon-s-tools"></i>
            <i
              @click="changeColl(scope.row.id)"
              v-if="scope.row.isCollected"
              class="el-icon-star-on"></i>
            <i
              @click="changeColl(scope.row.id)"
              v-else
              class="el-icon-star-off"></i>
            <i

              @click="openFolderDialog(scope.row.id)"
              class="el-icon-s-custom"></i></div>
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
        <div>文件名：{{Info.builder}}</div>
        <div>创建者：{{Info.builder}}</div>
        <div>创建日期：{{Info.builder}}</div>
        <div>最后修改时间：{{Info.builder}}</div>
        <div>修改次数：{{Info.builder}}</div>
        <el-divider></el-divider>
        <div>协作者：
<<<<<<< HEAD
          <div v-for="(item, index) in Info.coworkers" :key="index">
            {{item.userName}}
=======
          <div v-for="(item, index) in Info.coworkers" :key="index" class="coworkers">
            <el-avatar :src="item.userImg" :size="'small'" style="cursor: pointer;vertical-align: sub;"></el-avatar>
            <span style="height: 28px; padding-right: 15px;margin-left: 10px;">{{item.userName}}</span>
>>>>>>> b29651f86a9025e3d6793622ecf16025f9a9319b
            <i class="el-icon-user" v-if="item.isBuilder"></i>
          </div>
        </div>
        <el-divider></el-divider>
<<<<<<< HEAD
        <el-link type="primary" style="font-size: 16px;">分享</el-link>
        <el-link type="danger" style="float: right; font-size: 16px;">删除</el-link>
      </div>
    </el-dialog>
=======
        <el-link plain type="primary" style="font-size: 16px;">分享</el-link>
        <el-link plain type="danger" style="float: right; font-size: 16px;" @click="Delete(Info.builder)">
          <span v-if="type==='dustbin'">彻底</span>删除
        </el-link>
      </div>
    </el-dialog>

    <folder-dialog :dialog-form-visible="folderDialog" @changeVisible="changeVisible" :doc-id="docId"></folder-dialog>
>>>>>>> b29651f86a9025e3d6793622ecf16025f9a9319b
  </div>
</template>

<script>
  export default {
    name: "docList",
    props:{
      type:{
        default: 'history'//'collection', 'build', 'dustbin', 'team'?
<<<<<<< HEAD
      },
      style:{
        default:'list'//'image'
=======
>>>>>>> b29651f86a9025e3d6793622ecf16025f9a9319b
      }
    },
    mounted() {
      this.init()
    },
    data(){
      return {
        tableData: [{
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
              isBuilder: false,
<<<<<<< HEAD
              isCollected: true
            }
          ]
        }
=======
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
          ]
        },
        docId: '1',
        folderDialog: false
>>>>>>> b29651f86a9025e3d6793622ecf16025f9a9319b
      }
    },
    methods:{
      init(){
        //请求数据
<<<<<<< HEAD
      },
      filterTag(value, row) {
        return row.tag === value;
=======
        console.log(this.type)
      },
      filterTag(value, row) {
        return row.builder === value;
>>>>>>> b29651f86a9025e3d6793622ecf16025f9a9319b
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleEdit(index, row) {//查看文档详细内容
        console.log(index, row);
<<<<<<< HEAD
        this.Dialog = true
        //this.Info = row//表格中每个元素是详细信息，只展示部分，点开才展示全部
      },
=======
        //this.Info = row//表格中每个元素是详细信息，只展示部分，点开才展示全部
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
      }
>>>>>>> b29651f86a9025e3d6793622ecf16025f9a9319b
    }
  }
</script>

<style scoped>
  .docList{
    height: 80vh;
  }
<<<<<<< HEAD
=======
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
>>>>>>> b29651f86a9025e3d6793622ecf16025f9a9319b
</style>