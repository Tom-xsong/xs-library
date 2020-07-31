<template>
  <div>
     <add-btn @confirm="add"></add-btn>
     <v-add :info="info" ref="add"></v-add>
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
        return{
            info:{
                show:false,
                isAdd:true,
                title:'用户添加'
            }
        }
    },

    methods:{
     
    add(){
        this.info.show = true;
        this.info.title = "用户添加"
        this.info.isAdd = true
    },
     
    
  
    edit(id){
        this.info.show = true;
        this.$refs.add.getDetail(id)
        this.info.title = "用户修改"
        this.info.isAdd = false
    }
    }
}
</script>

<style>

</style>