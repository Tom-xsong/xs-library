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
      <el-table-column prop="id" label="分类编号"></el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      
      <el-table-column  label="图片">
         <template slot-scope="scope">
          <img :src="$imgPre+scope.row.img" alt />
        </template>
      </el-table-column>

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
import {requestCateDelete} from '../../../util/request'
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



  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },




  methods: {
    ...mapActions({
      requestList: "cate/requestList",
    }),
   

   //向父组件发起通知
    edit(id){
      console.log(id)
      this.$emit('edit',id)
    },



    //删除数据
     del(id){
        requestCateDelete({ id: id }).then(res=>{
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