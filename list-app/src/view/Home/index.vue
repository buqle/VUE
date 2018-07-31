<template>
  <div>
    <top-bar></top-bar>

    <!--content-->
    <swiper ref="swiper-wrapper" id="swiper-cont" @slideChangeTransitionEnd="end" v-loading="newsLoading" element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" >
        <swiper-slide v-for="(item,index) in newsList" :key="index">
            <dl v-for="(list,index) in item.list">
              {{list.source}}
            </dl>
        </swiper-slide>
    </swiper>

  </div>
</template>

<script>
  import TopBar from './TopBar';
  import {swiper,swiperSlide} from 'vue-awesome-swiper';
  import {mapGetters} from 'vuex'
    export default {
        components:{TopBar,swiper,swiperSlide},
        created(){
          this.$store.dispatch('gethomelist',this.newsList[this.homeNewsIndex])
        },
      methods:{
          async end(){
            this.$store.state.home.newsIndex=this.swiper.activeIndex;
            await this.$store.dispatch('gethomelist',this.newsList[this.homeNewsIndex])

          }
      },
        computed:{
          swiper(){
            return this.$refs['swiper-wrapper'].swiper
          },
        ...mapGetters(['newsList','newsLoading','homeNewsIndex','homeNewsPrevIndex','homeEnd'])
      },
      watch:{
          homeNewsIndex(){
            this.swiper.slideTo(this.homeNewsIndex)
          }
      }

    }
</script>

<style scoped>

</style>
