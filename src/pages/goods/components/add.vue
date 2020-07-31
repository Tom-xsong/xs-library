<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.show" @opened="createEditor">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="80px">
          <el-select v-model="form.first_cateid" @change="firstCateChange(false)">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option v-for="item in cateList" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>



        <el-form-item label="二级分类" label-width="80px">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option v-for="item in secondCateArr" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

          <el-form-item label="价格" label-width="80px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>


        <el-form-item label="市场价格" label-width="80px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
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

        <el-form-item label="商品规格" label-width="80px">
          <el-select v-model="form.specsid" @change="firstSpecChange(false)">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option v-for="item in specList" :key="item.id" :label="item.specsname" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
         


        <el-form-item label="商品属性" label-width="80px"  multiple>
          <el-select v-model="form.specsattr">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option v-for="item in secondSpecArr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>




        
        <el-form-item label="是否新品" label-width="80px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
     
        <el-form-item label="是否热卖" label-width="80px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>



        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>

        
         <el-form-item label="商品描述" label-width="80px">
          <div id="desc"></div>
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
  requestGoodsAdd,
  requestGoodsDetail,
  requestGoodsUpdate
} from "../../../util/request.js";
//引入弹框
import { successAlert, warningAlert } from "../../../util/alert.js";
//为得到二级菜单，引入数据
import { mapGetters, mapActions } from "vuex";
import E from 'wangeditor'
export default {
  props: ["info"],
  data() {
    return {
       imageUrl:"",
       editor:null,
       
      form: {
        first_cateid:0,
        second_cateid:0,
        goodsname:"",
        price:0,
        market_price:0,
        specsid:0,
        specsattr:"",
        isnew:1,
        ishot:2,
        img: "",
        status: 1,
        description:""
      },

       secondCateArr:[],
       secondSpecArr:[]
       
    };
  },

  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specList:"spec/list"

    }),
  },

  methods: {



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


    firstCateChange(bool){
        let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCateArr = this.cateList[index].children;

     if(!bool){
         this.form.second_cateid = 0
     }
     

    },


    firstSpecChange(bool){
      console.log(this.form.specsid)

        let index = this.specList.findIndex(
        (item) => item.id == this.form.specsid
      );
      this.secondSpecArr = this.specList[index].attrs;
      if(!bool){
        this.form.specsattr= []
      }
     
    },


     createEditor() {
      this.editor = new E("#desc");
      this.editor.create();
      this.editor.txt.html(this.form.description)
    },



    //取消方法
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },

    ...mapActions({
      requestCateList: "cate/requestList",
      requestSpecList: "spec/requestList",
      requestGoodsList: "goods/requestList",
    }),

    //重置方法
    empty() {

       this.imageUrl=""
       this.editor=null
       
      this.form={
        first_cateid:0,
        second_cateid:0,
        goodsname:"",
        price:0,
        market_price:0,
        specsid:0,
        specsattr:"",
        isnew:1,
        ishot:2,
        img: "",
        status: 1,
        description:""
      },

       this.secondCateArr=[],
       this.secondSpecArr=[]
    },

    //添加事件函数s
    add() {
      this.form.description =  this.editor.txt.html()
      this.form.specsattr = JSON.stringify( this.form.specsattr)
      //添加数据请求
      requestGoodsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg); //弹出成功的弹框
          this.cancel(); //取消弹框
          this.empty(); //重置弹框
          this.requestGoodsList()
        } else {
          warningAlert(res.data.msg); //弹出失败的弹框
        }
      });
    },

  
    getDetail(id) {
      requestGoodsDetail({ id: id }).then((res) => {
        this.form = res.data.list; 
        this.form.id = id; 
        this.imageUrl = this.$imgPre + res.data.list.img;
        this.form.specsattr=JSON.parse(this.form.specsattr)
        this.firstCateChange(true)
        this.firstSpecChange(true)
      });
    },

    
    update() {
     
      this.form.description =  this.editor.txt.html()
      this.form.specsattr = JSON.stringify( this.form.specsattr)
      
      requestGoodsUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.requestGoodsList();
          this.empty();
          this.cancel();
         
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },

  mounted(){
    if (this.cateList.length == 0) {
      this.requestCateList();
    }

    this.requestSpecList(true);
  }
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