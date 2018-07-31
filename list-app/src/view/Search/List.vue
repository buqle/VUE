<template>
  <div class="search-box" v-loading="searchLoading" element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"  v-scroll="loadingMore">
    <div class="search-box-con1" v-if="searchList.length<1">
      <h4>猜你想搜</h4>
      <p flexcont class="text-center font24">
        <span v-for="(item,index) in thinkList" @click="getData(item,index)">{{item}}</span>
      </p>
    </div>
    <div class="search-box-con2" v-else>
      <dl v-for="(i,index) in searchList" :key="index" @click="skips(i.id)">
        <dt>{{i.title}}</dt>
        <dd class="font26">{{i.intro|readMore(45,'...')}}</dd>
      </dl>
      <p v-if="searchEnd">没有了..</p>
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
      data(){
        return{
          thinkList:['Easy-Mock','VUE','webpack']
        }
      },
       computed:{
         ...mapGetters(['keyword','searchList','searchPageindex','searchLoading','searchEnd'])
       },
      methods:{
        skips(id){
          this.$router.animate=1;
          this.$router.push(`/article/${id}`);
          console.log(this.$router)
        },
        getData(word,i){
          if(this.keyword==word){
            return false;
          }
          this.$store.state.search.keyword=word;
          this.$store.state.search.pageindex=1;
          this.$store.dispatch('getSearchList',{keyword:this.keyword,pageindex:this.searchPageindex})
        },
        loadingMore(){
          return new Promise(async(resolve,reject)=>{
            this.$store.state.search.pageindex++;
            await this.$store.dispatch('getSearchList',{keyword:this.keyword,pageindex:this.searchPageindex});
            resolve();
          })
        }

      }
    }
</script>

<style scoped>
  body{bg:#fff;}
  .search-box{
    height:calc(100% - 80px);
    overflow-y: scroll;
  }
  .search-box-con1{
    h4{c:#b7abab;p:20px;fz:30px;}
    h4,p span{bdb:2px solid #ccc;}
    p{
      flex-wrap: wrap;
      span{w:50vw;p:8px 0;}
      span:nth-child(odd)
      {
        bdr:2px solid #ccc;
      }
    }
  }
  .search-box-con2{
    dl{
      p:20px;bdb:2px dashed #ccc;
      dt{fz:27px;mb:10px;}

    }
  }
</style>
