<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" label-width="80px">
          <el-select v-model="form.pid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="80px">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>

        <el-form-item label="菜单图标" label-width="80px"  v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in icons" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" label-width="80px" v-else>
          <el-select v-model="form.url">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in urls" :key="item" :label="item" :value="item"></el-option>
          </el-select>
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

//引入添加数据请求的方法
import {requestMenuAdd, requestMenuList,requestMenuDetail,requestMenuUpdate,} from '../../../util/request.js'
//引入弹框
import {successAlert,warningAlert} from '../../../util/alert.js'
//为得到二级菜单，引入数据
import {mapGetters,mapActions} from 'vuex'
export default {
  props:['info'],
  data() {
    return {
      urls: [
        "/home",
        "/menu",
        "/role",
        "/manage",
        "/cate",
        "/spec",
        "/goods",
        "/banner",
        "/seckill",
      ],

      icons: [
        "el-icon-setting",
        "el-icon-s-help",
        "el-icon-s-operation",
        "el-icon-s-grid",
      ],
      form: {
        pid:0,
        title:"",
        icon:"",
        type:1,
        url:"",
        status:1
      },
      
     
    };
  },

  computed: {
    ...mapGetters({
      list: "menu/list"
    }),
  },

  methods:{
    //取消方法
    cancel(){
      this.info.show = false;
      if(!this.info.isAdd){
         this.empty();
      }
     
    },
    
     
      ...mapActions({
      requestList: "menu/requestList",
    }),

    //重置方法
    empty(){
        this.form = {
        pid:0,
        title:"",
        icon:"",
        type:1,
        url:"",
        status:1
      }
    },
    

    //添加事件函数
    add(){
      //添加数据请求
      requestMenuAdd(this.form).then((res)=>{

        if(res.data.code==200){
          successAlert(res.data.msg)//弹出成功的弹框
          this.cancel()//取消弹框
          this.empty()//重置弹框
          this.requestList();//重新渲染表格
        }
        else{
          warningAlert(res.data.msg)//弹出失败的弹框
        }
      })
    },
     


     //此方法会被父组件通过ref调用
    getDetail(id){
      //获取某一条数据的详情
       requestMenuDetail({ id: id }).then((res) => {
        this.form = res.data.list;//把获取到的数据渲染到赋给表单数据
        this.form.id = id;//获取该菜单的id
      });
    },



    //修改事件函数
    update() {
      //发起修改请求
      requestMenuUpdate(this.form).then((res) => {
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

    
    
  }
};
</script>

<style>
</style>