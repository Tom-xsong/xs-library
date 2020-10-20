<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show" width="50%" >
         


       <el-form :model="form">


          <el-form-item label="所属角色" label-width="80px">
           <el-select v-model="form.roleid">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option v-for="item in roleList" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
          </el-select>
          </el-form-item>

          

          <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
         </el-form-item>
        
          
         <el-form-item label="密码" label-width="80px">
           <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
         </el-form-item>
        
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
       </el-form-item>



      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {requestUserAdd,requestUserDetail,requestUserUpdate} from '../../../util/request'
import {successAlert,warningAlert} from '../../../util/alert.js'
export default {
    props:['info'],
  data() {
    return {

      form:{
          roleid:0,
          username:"",
          password:"",
          status:1
      }
    };
  },

  computed:{
      ...mapGetters({
          roleList:'role/list'
      })

  },
  methods: {

      ...mapActions({
         requestRoleList:'role/requestList',
         requestUserTotal:"user/requestTotal",
         requestUserList:"user/requestList"
      }),

    cancel() {
      this.info.show = false;
      if(!this.info.isAdd){
         this.empty();
      }
    },
    
     

     empty(){
        this.form = {
          roleid:0,
          username:"",
          password:"",
          status:1
      };
    },


    add(){
         requestUserAdd(this.form).then((res)=>{
        if(res.data.code==200){
          successAlert(res.data.msg)//弹出成功的弹框
          this.requestUserTotal()
          this.requestUserList()
          this.empty()//清空表格
          this.cancel()//关闭弹框
          
        }
        else{
          warningAlert(res.data.msg)//弹出失败的弹框
        }
      })
        

    },


     getDetail(uid){
       requestUserDetail({ uid: uid }).then((res) => {
        this.form = res.data.list;
        this.form.password= "";
      });
    },



     update() {
      requestUserUpdate(this.form).then((res) => { 
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.empty()
          this.cancel()
          this.requestUserList()
        }else{
          warningAlert(res.data.msg)
        }
      });
    },


    },

    mounted(){
    
       if(this.roleList.length===0){
        this.requestRoleList();
     }
  
  },
};
</script>

<style>
</style>