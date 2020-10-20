<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" width="50%">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

         <el-form-item v-for="(item,index) in arr" :key="index" label="规格属性" label-width="80px">
          <el-input v-model="item.value"></el-input>
          <el-button type="primary" v-if="index==0" @click="addArr">新增规格属性</el-button>
          <el-button type="danger" v-else @click="delArr(index)">删除</el-button>
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
import { mapGetters, mapActions } from "vuex";
import {
  requestSpecAdd,
  requestSpecDetail,
  requestSpecUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert.js";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        specsname:"",
        attrs:"",
        status: 1
      },

      arr:[
          {
              value:""
          },
      ]
    };
  },

 
  methods: {
    ...mapActions({
      requestList: "spec/requestList",
      requestTotal: "spec/requesTotal",

    }),


    addArr(){
       
        this.arr.push({
            value:""
        })

    },


    delArr(index){
        this.arr.splice(index,1)

    },

    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    empty() {
      this.form = {
        specsname:"",
        attrs:"",
        status: 1
      };
      this.arr=[
        {
          value:""
        }
      ]
    },

    add() {
        if (this.arr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }else{
           this.form.attrs = JSON.stringify(this.arr.map((item) => item.value));
        requestSpecAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg); //弹出成功的弹框
          this.requestTotal();
          this.requestList();
          this.empty(); //清空表格
          this.cancel(); //关闭弹框
        } else {
          warningAlert(res.data.msg); //弹出失败的弹框
        }
      });

      }
     
    },

    getDetail(id) {
      requestSpecDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.arr = JSON.parse(res.data.list[0].attrs).map((item) => ({
          value: item,
        }));
      });
    },

    update() {
      if (this.arr.some((item) => item.value == "")) {
        warningAlert("属性规格均不能为空");
        return;
      }else{
           this.form.attrs = JSON.stringify(this.arr.map((item) => item.value));
        requestSpecUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg); //弹出成功的弹框
          this.requestTotal();
          this.requestList();
          this.empty(); //清空表格
          this.cancel(); //关闭弹框
        } else {
          warningAlert(res.data.msg); //弹出失败的弹框
        }
      });

      }
    },
  },
};
</script>
<style scoped lang="stylus">
.add >>> .el-form-item__content {
  display: flex ;
}

.add >>> .el-input {
  flex: 1;
}

.add >>> .el-btn {
  width: auto;
}
</style>