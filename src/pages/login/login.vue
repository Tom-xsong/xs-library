<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <el-input v-model="user.username" class="input" clearable></el-input>
      <el-input v-model="user.password" class="input" clearable show-password></el-input>
      <div class="btn-box">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import {requestLogin} from "../../util/request"
import {successAlert,warningAlert} from "../../util/alert"
<<<<<<< HEAD
=======
import {mapGetters,mapActions} from "vuex"
>>>>>>> d807809... bug修复
export default {
  components: {},
  data() {
    return {
      user:{
        username:"",
        password:""
      }
    };
  },
  methods: {
<<<<<<< HEAD
      login(){  
          requestLogin(this.user).then(res=>{
            this.$router.push("/")
=======
      ...mapActions({
        changeUser:"changeUser"
      }),

      login(){  
          requestLogin(this.user).then(res=>{
          if (res.data.code == 200) {
          successAlert(res.data.msg); 
          this.changeUser(res.data.list)
          this.$router.push("/")
        } else {
          warningAlert(res.data.msg); 
        }
             
>>>>>>> d807809... bug修复
          })
      }
  },
  mounted() {},
};
</script>
<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553444, #303d60);
}
.con {
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  line-height: 60px;
  font-size: 30px;
  text-align: center;
}
.input {
  margin-bottom: 20px;
}
.btn-box {
  text-align: center;
}
</style>