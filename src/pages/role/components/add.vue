<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="选择权限" label-width="80px">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            :default-expanded-keys="[]"
            :default-checked-keys="checkedkey"
            :props="defaultProps"
            ref="tree"
          ></el-tree>
        </el-form-item>
        
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
         <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {requestRoleAdd,requestRoleDetail,requestRoleUpdate} from '../../../util/request';
import {successAlert,warningAlert} from '../../../util/alert.js'
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename:"",
        menus:'',
        status:1,

      },

      checkedkey:[],


        defaultProps: {
          children: 'children',
          label: 'title'
        }

      
    };
  },

  mounted(){
      //如果菜单列表为空，获取菜单列表数据到vuex。
       if(this.list.length===0){
        this.requestMenuList()
     }



  },

  computed:{
      ...mapGetters({
          list:'menu/list'
      })

  },

  methods: {
     ...mapActions({
         requestMenuList:'menu/requestList',
         requestRoleList:'role/requestList',
     }),




    cancel() {
      this.info.show = false;

      //如果是修改数据，取消就清空表单
      if(!this.info.isAdd){
         this.empty();
      }
    },
    
     

     empty(){
        this.form = {
        rolename:"",
        menus:'',
        status:1,
      };
      

     // 清空已选择的权限数组
     this.$refs.tree.setCheckedKeys([]);
    },



    add(){  //添加数据
        
         

         //获取已选择权限的id数组，本并转化为字符串
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
          requestRoleAdd(this.form).then((res)=>{
        if(res.data.code==200){
          successAlert(res.data.msg)//弹出成功的弹框
          this.requestRoleList()//渲染角色列表
          this.empty()//清空表格
          this.cancel()//关闭弹框
          
        }
        else{
          warningAlert(res.data.msg)//弹出失败的弹框
        }
      })
      
    },
     

     //把要修改的数据渲染出来
     getDetail(id){
      //获取某一条角色数据的详情
       requestRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;//把获取到的数据渲染到赋给表单数据
        this.checkedkey = JSON.parse(res.data.list.menus);//获取已选择权限的id数组字符串，并转化为正真的数组。
        this.form.id = id//获取该条数据的id

      });
    },



    //修改角色数据
    update() {
     this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
      requestRoleUpdate(this.form).then((res) => {  //发起修改请求
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.empty()//清空表格
          this.cancel()//取消弹框
          this.requestRoleList()//渲染角色列表
        }else{
          warningAlert(res.data.msg)
        }
      });
    },

    
  },
};
</script>

<style>
</style>