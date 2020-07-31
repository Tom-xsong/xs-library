<template>
  
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="add()">添加</el-button>

</template>

<script>

export default {
    methods:{
     
        add(){
           this.$emit('confirm')
    }
  }, 
        
   

}
</script>

<style>

</style>