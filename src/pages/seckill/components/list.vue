<template>
  <div>
    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {requestSeckDelete} from '../../../util/request'
import { successAlert,warningAlert } from "../../../util/alert";
export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters({
      list: "seck/list",
    }),
  },
  methods: {
    ...mapActions({
      requestList: "seck/requestList",
    }),
    


    

    
    

    //向父组件发送通知
    edit(id){
      console.log(id)
      this.$emit('edit',id)
    },

    


    //删除数据
    del(id){
        requestSeckDelete({ id: id }).then(res=>{
            if(res.data.code==200){
              successAlert(res.data.msg);
              this.requestList()//重新渲染据
            }else{
              warningAlert(res.data.msg)
            }
          }) 
    }
  },

  mounted() {
    this.requestList();
  },
};
</script>

<style>
</style>