<template>
  <div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
           <update-btn @confirm="edit(scope.row.uid)"></update-btn>
        </template>
      </el-table-column>
    </el-table>


   
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
    };
  },

  computed: {
    ...mapGetters({
      list: "vip/list",
    }),
  },
  methods: {
    ...mapActions({
      requestList: "vip/requestList",
      
    }),

    edit(uid) {
      this.$emit("edit", uid);
    },

  },

  mounted() {
    this.requestList();
   
  },
};
</script>

<style>
</style>