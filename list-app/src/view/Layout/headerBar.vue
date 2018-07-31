<template>
    <div class="header-bar" flexcont flexcont3>
      <div @click="skipSearch">
        <el-input  placeholder="请输入内容" prefix-icon="el-icon-search" :clearable="true" >
        </el-input>
      </div>
    </div>
</template>

<script>
    export default {
        methods:{
          skipSearch(){
            this.$router.push('/search');
          }
        }
    }
</script>

<style scoped>
 .header-bar{
   bg:#ccc;p:16px 0;
 }
</style>
