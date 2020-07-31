<template>
  <div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column label="规格属性" width="180">
         <template slot-scope="scope">
           <el-tag v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
          
      </el-table-column>



      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <update-btn @confirm="edit(scope.row.id)"></update-btn>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>


   <!-- 分页 -->
   <el-pagination background layout="prev, pager, next,jumper" @current-change="cPage"  :page-size="size" :total="total"></el-pagination>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {requestSpecDelete} from "../../../util/request"
import {successAlert,warningAlert} from '../../../util/alert.js'
export default {
  data() {
    return {
     
    };
  },

  computed: {
    ...mapGetters({
      list: "spec/list",
      total:"spec/total",
      size:"spec/size"
    }),
  },
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal: "spec/requestTotal",
      changePage:'spec/changePage'
    }),

    edit(uid) {
      this.$emit("edit", uid);
    },

     del(id) {
      requestSpecDelete({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.requestTotal()
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  
    cPage(a){
        this.changePage(a)
        this.requestList()
    }
    
  },

  mounted() {
    this.requestTotal();
    this.requestList();
    
  },
};
</script>

<style>
</style>