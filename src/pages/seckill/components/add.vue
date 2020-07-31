<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" label-width="80px">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="firstSpecChange(false)">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid" @change="secondSpecChange(false)">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option
              v-for="item in secondCateArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="80px">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
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
import { mapGetters, mapActions } from "vuex";
import {
  requestSeckAdd,
  requestSeckDetail,
  requestSeckUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  props: ["info"],
  data() {
    return {
       value1: [new Date(1995, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      form: {
        title: "",
        begintime: 123323232,
        endtime: 12312312,
        first_cateid: 0,
        second_cateid: 0,
        goodsid: 0,
        status: 1,
      },

      secondCateArr: [],
      goodsArr: [],
    };
  },

  mounted() {
    //如果菜单列表为空，获取菜单列表数据到vuex。
    if (this.list.length === 0) {
      this.requestMenuList();
    }
  },

  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specList: "spec/list",
      goodsList: "goods/list",
    }),
  },

  methods: {
    ...mapActions({
      requestCateList: "cate/requestList",
      requestSpecList: "spec/requestList",
      requestGoodsList: "goods/requestList",
      requestSeckList: "seck/requestList",
    }),

    firstSpecChange(bool) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateArr = this.cateList[index].children;

      if (!bool) {
        this.form.second_cateid = 0;
        this.form.goodsid = 0;
      }
    },

    secondSpecChange(bool) {
      this.goodsArr = this.goodsList.filter((value, index) => {
        return value.second_cateid == this.form.second_cateid;
      });

      if(!bool){
          this.form.goodsid = 0;
      }
     
    },

    cancel() {
      this.info.show = false;
      //如果是修改数据，取消就清空表单
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    empty() {
      this. value1=[new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      this.form = {
        title: "",
        begintime:0,
        endtime: 0,
        first_cateid: 0,
        second_cateid: 0,
        goodsid: 0,
        status: 1,
      };

      
    },

    add() {
      this.form.begintime = this.value1[0].getTime();
      this.form.endtime = this.value1[1].getTime();
      console.log(this.form)
      
      requestSeckAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg); //弹出成功的弹框
          // this.requestRoleList(); //渲染角色列表
          this.empty(); //清空表格
          this.cancel(); //关闭弹框
          this.requestSeckList()
        } else {
          warningAlert(res.data.msg); //弹出失败的弹框
        }
      });
    },

    //把要修改的数据渲染出来
    getDetail(id) {
      //获取某一条角色数据的详情

      requestSeckDetail({ id: id }).then((res) => {
          this.form = res.data.list;
           var timeNum = Number(res.data.list.begintime)
            var date = new Date(timeNum);
            var year = date.getFullYear()
            var month = date.getMonth()
            var day = date.getDate()
            var hours = date.getHours()
            var minutes = date.getMinutes()



            var timeNum1 = Number(res.data.list.endtime)
            var date1 = new Date(timeNum1);
            var year1 = date1.getFullYear()
            var month1 = date1.getMonth() 
            var day1 = date1.getDate()
            var hours1 = date1.getHours()
            var minutes1 = date1.getMinutes()



          this.value1=[new Date(year,month,day,hours,minutes), new Date(year1,month1,day1,hours1,minutes1)]

         
           
            
         

          



          this.form.id = id; 
          this.firstSpecChange(true)
          this.secondSpecChange(true)
        
      });
    },

  
    update() {
      this.form.begintime = this.value1[0].getTime();
      this.form.endtime = this.value1[1].getTime();
      requestSeckUpdate(this.form).then((res) => {
        //发起修改请求
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty(); //清空表格
          this.cancel(); //取消弹框
          this.requestSeckList()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },

  mounted() {
    if (this.cateList.length == 0) {
      this.requestCateList();
    }

    if (this.specList.length == 0) {
      this.requestSpecList(true);
    }

    if (this.goodsList.length == 0) {
      this.requestGoodsList();
    }
  },
};
</script>

<style>
</style>