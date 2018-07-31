<template>
  <div class="home-bar pos-a">
    <div flexcont class="home-bars">
      <div class="home-bar-con1 text-center ww1">
        <swiper ref="Myswiper" :options="swiperOption">
          <swiper-slide v-for="(item,index) in newsList" :class="{'active':homeNewsIndex===index}" :key="index" @click.native="actFun(index)">
            <!--组件要加.native修饰符 不然事件无法触发-->
            {{item.title}}
          </swiper-slide>
        </swiper>
      </div>
      <p class="el-icon-circle-plus" @click="Topbar=true"></p>
    </div>

    <top-barbox @close="Topbar=false" :class="{'topbar-show':Topbar}"></top-barbox>
  </div>
</template>

<script>
    import {swiper,swiperSlide} from 'vue-awesome-swiper';
    import {mapGetters} from 'vuex';
    import TopBarbox from './TopBarbox'
    export default {
      components:{swiper, swiperSlide,TopBarbox},
      data(){
        return{
          swiperOption:{
            slidesPerView:6
          },
          Topbar:false
        }
      },
      created(){
        this.actFun(0);
        console.log('aa')
      },
        methods:{
          async actFun(i){

            console.log(i);
            if(this.homeNewsIndex==i){
              return false;
            }
            this.$store.state.home.newsIndex=i;
            this.$store.dispatch('gethomelist',this.newsList[this.homeNewsIndex])
          }
        },
        computed:{
          swiper(){
            return this.$refs.Myswiper.swiper
          },
          ...mapGetters(['newsList','homeNewsIndex'])
        }
    }
</script>

<style scoped>
  .home-bars{
    align-items: center;bdb:1px solid #ddd;
    .el-icon-circle-plus{fz:34px;ml:20px;}
    .el-icon-circle-plus,.active{c:#f85959;}
    .home-bar-con1{h:60px;  lh:60px;  fz:29px;  c:#666;  w:88%;}

  }
  .home-bar{
  .topbar-show{t:14px;}
  }

</style>
