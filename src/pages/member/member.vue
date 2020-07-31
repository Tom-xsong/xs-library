<template>
  <div>
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
            }
        }
    },

    methods:{
     
  
     
    
  
    edit(id){
        this.info.show = true;
        this.$refs.add.getDetail(id)
    }
    }
}
</script>

<style>

</style>