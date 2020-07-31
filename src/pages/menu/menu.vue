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
        title:'菜单添加',
        isAdd:true
    }
}
},


methods:{

    
    //点击添加触发事件
    add(){
        this.info.show = true;
        this.info.title = "菜单添加"
        this.info.isAdd = true
        

    },
     

    //list传递给父组件的事件
    edit(id){
        this.info.show = true;
        this.$refs.add.getDetail(id)
        this.info.title = "菜单修改"
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