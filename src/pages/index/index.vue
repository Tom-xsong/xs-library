<template>
  <div>
  <el-container>
   <!-- 左边导航 -->
  <el-aside width="200px" class="as" >
       <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
       router
      :unique-opened="true"
      >

       <el-menu-item index="/home">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
      </el-menu-item>


<<<<<<< HEAD
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统设置</span>
        </template>
        <el-menu-item index="/menu">菜单管理</el-menu-item>
        <el-menu-item index="/role">角色管理</el-menu-item>
        <el-menu-item index="/manage">管理员管理</el-menu-item>
      </el-submenu>

      <el-submenu index="2">
=======
      <el-submenu v-show="hasChildren" :index="item.id+''" v-for="item in userList.menus" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
      </el-submenu>

      
      <el-menu-item v-show="!hasChildren" :index="item.url" v-for="item in userList.menus" :key="item.id">{{item.title}}</el-menu-item>
      
      <!-- <el-submenu index="2">
>>>>>>> d807809... bug修复
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商城管理</span>
        </template>
       <el-menu-item index="/cate">商品分类</el-menu-item>
       <el-menu-item index='/spec'>商品规格</el-menu-item>
       <el-menu-item index="/goods">商品管理</el-menu-item>
       <el-menu-item index="/member">会员管理</el-menu-item>
       <el-menu-item index="/banner">轮播图管理</el-menu-item>
       <el-menu-item index="/seckill">秒杀活动</el-menu-item>
<<<<<<< HEAD
      </el-submenu>
=======
      </el-submenu> -->
>>>>>>> d807809... bug修复


      
    </el-menu>


  </el-aside>
  <el-container>
    <el-header>
       <div class="header-con">
<<<<<<< HEAD
          <span>admin</span>
          <el-button type="primary">退出</el-button>
=======
          <span>{{userList.username}}</span>
          <el-button type="primary" @click="nextLogin">退出</el-button>
>>>>>>> d807809... bug修复
       </div>
    </el-header>
    <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right">
     <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
     <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
     
</el-breadcrumb>
      <router-view class="view"></router-view>
    </el-main>
  </el-container>
  </el-container>
  </div>
</template>
<script>
<<<<<<< HEAD
=======
import { mapGetters, mapActions } from "vuex";
>>>>>>> d807809... bug修复
export default {
  components: {},
  data() {
    return {};
  },
<<<<<<< HEAD
  methods: {

   
  },
  mounted() {},
=======
  computed:{
    ...mapGetters({
      userList:"userList"
    }),

    hasChildren(){
      return this.userList.menus[0].children?true:false
    }

  },
  methods:{
    ...mapActions({
      changeUser:"changeUser"

    }),

    nextLogin(){
      this.changeUser(null);
     this.$router.push("/login")

    }
    

   
  },
  mounted(){
  },
>>>>>>> d807809... bug修复
};
</script>
<style scoped>
.el-aside {
  background: #545C64;
}
.el-header {
  background: #b3c0d1;
  overflow: hidden;
}
  
  .as{
    height:100vh;
  }


.header-con{
    float: right;
}
.header-con span{
    line-height: 60px;
    color: #ffffff;
}
.view{
  margin-top: 20px;
}
</style>