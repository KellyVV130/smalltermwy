<template>
  <div class="docList">
      <div v-if="this.type === 'history'">
        <el-table
          ref="filterTable"
          :data="tableData"
          height="100%"
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
              {{scope.row.name}}
              <div style="float: right;">
              <el-button
                circle
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-s-tools"></el-button>
              <el-button
                circle
                @click="handleEdit(scope.$index, scope.row)"
                v-if="scope.row.isCollected"
                icon="el-icon-star-on"></el-button>
              <el-button
                circle
                @click="handleEdit(scope.$index, scope.row)"
                v-else
                icon="el-icon-star-off"></el-button>
              <el-button
                circle
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-s-custom"></el-button></div>
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
              <el-tag
                :type="scope.row.builder === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.builder}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div v-else-if="type === 'collection'||'build' ||'team'">
        <el-table
          ref="filterTable"
          :data="tableData"
          height="100%"
          style="width: 100%">
          <el-table-column
            prop="name"
            sortable
            width="400"
            label="文件名">
            <template slot-scope="scope">
              {{scope.row.name}}
              <div style="float: right;">
              <el-button
                circle
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-s-tools"></el-button>
              <el-button
                circle
                @click="handleEdit(scope.$index, scope.row)"
                v-if="scope.row.isCollected"
                icon="el-icon-star-on"></el-button>
              <el-button
                circle
                @click="handleEdit(scope.$index, scope.row)"
                v-else
                icon="el-icon-star-off"></el-button>
              <el-button
                circle
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-s-custom"></el-button></div>
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
              <el-tag
                :type="scope.row.builder === '家' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.builder}}</el-tag>
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
          <div v-for="(item, index) in Info.coworkers" :key="index">
            {{item.userName}}
            <i class="el-icon-user" v-if="item.isBuilder"></i>
          </div>
        </div>
        <el-divider></el-divider>
        <el-link type="primary" style="font-size: 16px;">分享</el-link>
        <el-link type="danger" style="float: right; font-size: 16px;">删除</el-link>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "docList",
    props:{
      type:{
        default: 'history'//'collection', 'build', 'dustbin', 'team'?
      },
      style:{
        default:'list'//'image'
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
              isCollected: true
            }
          ]
        }
      }
    },
    methods:{
      init(){
        //请求数据
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      handleEdit(index, row) {//查看文档详细内容
        console.log(index, row);
        this.Dialog = true
        //this.Info = row//表格中每个元素是详细信息，只展示部分，点开才展示全部
      },
    }
  }
</script>

<style scoped>
  .docList{
    height: 80vh;
  }
</style>