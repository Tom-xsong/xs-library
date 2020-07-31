<template>
<div>
   <add-btn @confirm="add"></add-btn>
   <v-add :info="info" ref='add'></v-add>
   <v-list @edit="edit"></v-list>
</div>
</template>
<script>
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
        title:'活动添加',
        isAdd:true
    }
}
},



methods:{
   
    //打开添加弹框
    add(){
        this.info.show = true;
        this.info.title = "活动添加"
        this.info.isAdd = true
    },
     
    
   //打开修改弹框
    edit(id){
        this.info.show = true;
        this.$refs.add.getDetail(id)
        this.info.title = "活动修改"
        this.info.isAdd = false
    }

},

}
</script>
<style scoped>
</style>