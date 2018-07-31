<template>
    <div class="top-bar-box">
      <i class="el-icon-error" @click="$emit('close')"></i>
      <div class="top-bar-box-con1">
        <h4>我的频道 <small>点击删除以下频道</small></h4>
        <dl flexcont class="text-center">
          <dt v-for="(item,index) in newsList" @click="$store.dispatch('delhometag',index)">{{item.title}}</dt>
        </dl>
      </div>
      <div class="top-bar-box-con1">
        <h4>我的频道 <small>点击添加以下频道</small></h4>
        <dl flexcont class="text-center">
          <dt v-for="(item,index) in allList" @click="$store.dispatch('addhomeTag',item)">{{item.title}}</dt>
        </dl>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {newsList as allNewsList} from "../../store/modules/classtit";

  export default {
        computed:{
          ...mapGetters(['newsList']),
          allList(){
            return allNewsList.filter(news=>{
              return !this.newsList.some(v=>news.title===v.title)
            })
          }
        }
    }
</script>

<style scoped>
  .top-bar-box{
    position: fixed;l:0;t:100%;transition: top .2s ease-out;bg:#f5f5f5;bdrs:30px;p:20px;
    w:100%;h:calc(100% -14px);z-index: 2;
    .top-bar-box-con1{
        pt:40px;
      dl{
        flex-wrap: wrap;
        dt{w:20%;bg:#ccc;ml:4%;mt:30px;p:8px 0;fz:30px;c:#757070;}
      }
    }
  }
</style>
