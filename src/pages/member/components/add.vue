<template>
  <div>
    <el-dialog title="会员修改" :visible.sync="info.show" width="50%" >
         


       <el-form :model="form">

         <el-form-item label="手机号" label-width="80px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
         </el-form-item>
          
          

          <el-form-item label="昵称" label-width="80px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
         </el-form-item>
        
          
         <el-form-item label="密码" label-width="80px">
           <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
           <p>留空则不修改</p>
         </el-form-item>
        
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
       </el-form-item>



      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {requestVipDetail,requestVipUpdate} from '../../../util/request'
import {successAlert,warningAlert} from '../../../util/alert.js'
export default {
    props:['info'],
  data() {
    return {

      form:{
          phone:'',
          nickname:"",
          password:"",
          status:1
      }
    };
  },

  computed:{
     

  },
  methods: {

      ...mapActions({
         requestList:'vip/requestList',
       
      }),

    cancel() {
      this.info.show = false;
      if(!this.info.isAdd){
         this.empty();
      }
    },
    
     

     empty(){
        this.form = {
          phone:'',
          nickname:"",
          password:"",
          status:1
      };
    },



     getDetail(uid){
       requestVipDetail({ uid: uid}).then((res) => {
        this.form = res.data.list;
       this.form.uid = uid
      });
    },



     update() {
      requestVipUpdate(this.form).then((res) => { 
        if(res.data.code==200){
          successAlert(res.data.msg)
          this.empty()
          this.cancel()
          this.requestList()
        }else{
          warningAlert(res.data.msg)
        }
      });
    },


    },

    mounted(){
        

  },
};
</script>

<style>
</style>