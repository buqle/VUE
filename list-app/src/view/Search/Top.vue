<template>
  <div class="top-search">
    <div class="header-bar" flexcont id="header-bar" flexcont flexcont2>
      <el-input  placeholder="请输入内容" prefix-icon="el-icon-search" :clearable="true" v-model="$store.state.search.keyword" @change="search">
      </el-input>

      <span @click="goBacks($router)">取消</span>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
      methods:{
        goBacks(route){
          route.animate=2;
          history.go(-1);
          this.$store.state.search.list.length=0;
          this.$store.state.search.keyword='';
          console.log(route);
        },
        search(){
          if(!this.$store.state.search.keyword){
            this.$alert('请输入您的搜索内容', '提示', {
              confirmButtonText: '确定'
            });
            return false;
          }
          this.$store.state.search.pageindex=1;
          this.$store.state.search.loadingMore=false;
          this.$store.dispatch('getSearchList',{keyword:this.$store.state.search.keyword,pageindex:this.$store.state.search.pageindex})
        }
      },
      computed:{
        ...mapGetters(['keyword'])//只能用来读取 不能设置 如用的v-model
      }
    }
</script>

<style scoped>
  #header-bar{
    p:18px;justify-content: space-around;bdb:2px solid #f4f4f4;
    span{c:#007aff;}
  }
</style>
