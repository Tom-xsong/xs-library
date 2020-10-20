<template>
<div>
      <add-btn @confirm="add"></add-btn>
      <!-- 父传子 -->
      <v-add :info="info" ref='add'></v-add>
      <v-list @edit="edit"></v-list>
</div>
 
</template>
<script>



//引入俩个子组件
import vAdd from './components/add'
import vList from './components/list'
export default {
components:{
    vAdd,
    vList

},


data(){
return {

    info:{
        show:false,
        title:'商品添加',
        isAdd:true
    }
}
},


methods:{

    
    //打开添加弹框
    add(){
        this.info.show = true;
        this.info.title = "商品添加"
        this.info.isAdd = true
        

    },
     

    //打开修改弹框
    edit(id){
        this.info.show = true;
        this.$refs.add.getDetail(id)
        this.info.title = "商品修改"
        this.info.isAdd = false
    }
},
mounted(){},
}
</script>
<style scoped>
.btn{
    margin-bottom:20px;
}

</style>