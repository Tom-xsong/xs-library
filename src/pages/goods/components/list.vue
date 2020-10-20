<template>
  <div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
      <el-table-column label="图片" width="180">
        <template slot-scope="scope">
            <img :src="$imgPre+scope.row.img" alt="">
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isnew==1" type="primary">是</el-button>
          <el-button v-else type="info" size="mini">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button v-if="scope.row.ishot==1" type="primary">是</el-button>
          <el-button v-else type="info">否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="primary">启用</el-button>
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <update-btn  @confirm="edit(scope.row.id)">编辑</update-btn>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {requestGoodsDelete} from '../../../util/request'
import { successAlert,warningAlert } from "../../../util/alert";

export default {
  data() {
    return {
    
      
    };
  },



  computed: {
    ...mapGetters({
      list: "goods/list",
    }),
  },




  methods: {
    ...mapActions({
      requestList: "goods/requestList",
    }),
   

   //向父组件发起通知
    edit(id){
      console.log(id)
      this.$emit('edit',id)
    },



    //删除数据
     del(id){
        requestGoodsDelete({ id: id }).then(res=>{
            if(res.data.code==200){
              successAlert(res.data.msg);
              this.requestList()
            }else{
              warningAlert(res.data.msg)
            }
          }) 
    }

  },


  mounted() {
    //页面自己渲染数据
     this.requestList();
  },
};
</script>

<style scoped>
img{
    width: 80px;
    height: 80px;

}


</style>