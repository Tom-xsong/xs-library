<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
       

        <el-form-item label="标题" label-width="80px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片上传" label-width="80px">
          <el-upload
                class="avatar-uploader"
                action="#"
                :show-file-list="false"
                :on-change="changeImg"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import {
  requestBannerAdd,
  requestBannerDetail,
  requestBannerUpdate
} from "../../../util/request.js";
//引入弹框
import { successAlert, warningAlert } from "../../../util/alert.js";
//为得到二级菜单，引入数据
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
       imageUrl:"",

     
      form: {
        title:"",
        img: "",
        status: 1,
      },


    };
  },

  computed: {
   
  },

  methods: {
    ...mapActions({
      requestList: "banner/requestList",
    }),


     //上传图片change事件
     changeImg(e) {
      
      //上传的文件不能超过2M
      if (e.size > 2 * 1024 * 1024) {
        warningAlert("上传的图片不能超过2M");
        return;
      }
      //上传的文件后缀必须是.png .jpg .gif .jpeg
      var extname = e.name.slice(e.name.lastIndexOf("."));
      var extArr = [".png", ".jpg", ".gif", ".jpeg"];
      if (!extArr.some((item) => item === extname)) {
        warningAlert("上传文件必须是图片");
        return;
      }

      //file是上传的文件
      var file = e.raw;
      //生成一个URL地址，赋值给imageUrl,展示出来
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },








    //取消方法
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    
    //重置方法
    empty() {
      this.form = {
        title:"",
        img: "",
        status: 1,
      }
       this.imageUrl=""
    },

    //添加事件函数s
    add() {
      console.log(this.form)
      
      requestBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg); 
          this.cancel(); 
          this.empty(); 
          this.requestList(); 
        } else {
          warningAlert(res.data.msg); 
        }
      });
    },

    //此方法会被父组件通过ref调用
    getDetail(id) {
      //获取某一条数据的详情
      console.log(id)
      requestBannerDetail({ id: id }).then((res) => {
        this.form = res.data.list; 
        this.form.id = id; 
        this.imageUrl = this.$imgPre + res.data.list.img;
      });
    },

    //修改事件函数
    update() {
      //发起修改请求
      requestBannerUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.cancel();
          this.requestList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
 .add >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .add >>> .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>