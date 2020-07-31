<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="菜单编号"></el-table-column>
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column  label="菜单图标">
         <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="菜单地址"></el-table-column>

      <el-table-column label="状态">
       <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>


       <el-table-column label="状态">
       <template slot-scope="scope">
          <update-btn @confirm="edit(scope.row.id)"></update-btn>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {requestMenuDelete} from '../../../util/request'
import { successAlert,warningAlert } from "../../../util/alert";

export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },


//获取表格数据list
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },



  //获取请求数据的方法
  methods: {
    ...mapActions({
      requestList: "menu/requestList",
    }),
   

   //向父组件发起通知
    edit(id){
      console.log(id)
      this.$emit('edit',id)
    },

    
    //删除数据
    del(id){
         this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          requestMenuDelete({ id: id }).then(res=>{
            if(res.data.code==200){
              successAlert(res.data.msg);
              this.requestList()
            }else{
              warningAlert(res.data.msg)
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    }
  },


  mounted() {
    //页面自己渲染数据
     this.requestList();
  },
};
</script>

<style>
</style>