<template>
  <div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
           <update-btn @confirm="edit(scope.row.uid)"></update-btn>
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>


   <!-- 分页 -->
   <el-pagination background layout="prev, pager, next,jumper" @current-change="cPage"  :page-size="size" :total="total"></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {requestUserDelete} from "../../../util/request"
import {successAlert,warningAlert} from '../../../util/alert.js'
export default {
  data() {
    return {
    };
  },

  computed: {
    ...mapGetters({
      list: "user/list",
      total:"user/total",
      size:"user/size"
    }),
  },
  methods: {
    ...mapActions({
      requestList: "user/requestList",
      requestTotal:"user/requestTotal",
      changePage:"user/changePage"
    }),

    edit(uid) {
      this.$emit("edit", uid);
    },

     del(uid) {
      requestUserDelete({ uid: uid }).then((res) => {
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
    this.requestList();
    this.requestTotal();
  },
};
</script>

<style>
</style>