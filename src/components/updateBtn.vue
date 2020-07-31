<template>
  
      <el-button type="primary" icon="el-icon-edit" @click="update()">修改</el-button>

</template>

<script>

export default {
    methods:{
     
        update(){
           this.$emit('confirm')
    }
  }, 
        
   

}
</script>

<style scoped>

</style>