import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD

Vue.use(Router)

export default new Router({
=======
import store from "../store/index"
Vue.use(Router)

function havePower(url){
  return store.state.userList.menus_url.some(i=>i==url)
}

 let router = new Router({
>>>>>>> d807809... bug修复
  routes: [
    {
      path:"/login",
      component:()=>import("../pages/login/login.vue"),
    },
    {
      path:"/",
      component:()=>import("../pages/index/index.vue"),
      children:[
        {
          path:"home",
          component:()=>import("../pages/home/home.vue"),
<<<<<<< HEAD
          name:'首页'
=======
          name:'首页',
>>>>>>> d807809... bug修复
        },
        {
          path:"menu",
          component:()=>import("../pages/menu/menu.vue"),
<<<<<<< HEAD
          name:'菜单列表'
=======
          name:'菜单列表',
          beforeEnter(to,from,next){
            havePower('/menu')?next():next("/home")
          }
>>>>>>> d807809... bug修复
        },
        {
          path:"role",
          component:()=>import("../pages/role/role.vue"),
<<<<<<< HEAD
          name:"角色列表"
=======
          name:"角色列表",
          beforeEnter(to,from,next){
            havePower('/role')?next():next("/home")
          }
>>>>>>> d807809... bug修复
        },
        {
          path:"manage",
          component:()=>import("../pages/manage/manage.vue"),
<<<<<<< HEAD
          name:"管理员列表"
=======
          name:"管理员列表",
          beforeEnter(to,from,next){
            havePower('/manage')?next():next("/home")
          }
>>>>>>> d807809... bug修复
        },
        {
          path:"cate",
          component:()=>import("../pages/cate/cate.vue"),
<<<<<<< HEAD
          name:"商品分类列表"
=======
          name:"商品分类列表",
          beforeEnter(to,from,next){
            havePower('/cate')?next():next("/home")
          }
>>>>>>> d807809... bug修复
        },
        {
          path:"spec",
          component:()=>import("../pages/spec/spec.vue"),
<<<<<<< HEAD
          name:"商品规格列表"
=======
          name:"商品规格列表",
          beforeEnter(to,from,next){
            havePower('/spec')?next():next("/home")
          }
>>>>>>> d807809... bug修复
        },
        {
          path:"goods",
          component:()=>import("../pages/goods/goods.vue"),
<<<<<<< HEAD
          name:"商品列表"
=======
          name:"商品列表",
          beforeEnter(to,from,next){
            havePower('/goods')?next():next("/home")
          }
>>>>>>> d807809... bug修复
        },
        {
          path:"member",
          component:()=>import("../pages/member/member.vue"),
<<<<<<< HEAD
          name:"会员列表"
=======
          name:"会员列表",
          beforeEnter(to,from,next){
            havePower('/member')?next():next("/home")
          }
>>>>>>> d807809... bug修复
        },
        {
          path:"banner",
          component:()=>import("../pages/banner/banner.vue"),
<<<<<<< HEAD
          name:"轮播图列表"
=======
          name:"轮播图列表",
          beforeEnter(to,from,next){
            havePower('/banner')?next():next("/home")
          }
>>>>>>> d807809... bug修复
        },
        {
          path:"seckill",
          component:()=>import("../pages/seckill/seckill.vue"),
<<<<<<< HEAD
          name:"秒杀列表"
=======
          name:"秒杀列表",
          beforeEnter(to,from,next){
            havePower('/seckill')?next():next("/home")
          }
>>>>>>> d807809... bug修复
        },
        {
          path:"",
          redirect:"home"
        }
      ]
    },
  ]
})
<<<<<<< HEAD
=======


//登录拦截
router.beforeEach((to,from,next)=>{
  //如果前往登录页面，next()
  if(to.path==="/login"){
    next()
    return;
  }
  //如果去的不是登录，就要判断store.user. user是true,next();user-null,next('/login')
  if(store.state.userList){
    next();
    return;
  }
  next("/login")
})



export default router

>>>>>>> d807809... bug修复
