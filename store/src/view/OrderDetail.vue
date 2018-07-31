<template>
  <div>
    <van-nav-bar
      title="我的 - 滴答滴门店"
      left-arrow
      right-text="设置"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-row van-row type="flex" justify="center" align="center">
      <van-col span="12">
        <div class="didadi-avatar">
          <img src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLledyU4vxjoohLia6GlRDXn5q4qfLOiaX730uYHInakEoX0hADbtIib8U1SwVbwTdGjiccEvicwT7tChw/132" />
        </div>
        <div class="didadi-nickname">
          <h3>Code Monkey</h3>
        </div>
      </van-col>
    </van-row>


    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop" to="store">门店</van-tabbar-item>
      <van-tabbar-item icon="chat" dot>消息</van-tabbar-item>
      <van-tabbar-item icon="records" info="5">订单</van-tabbar-item>
      <van-tabbar-item icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { NoticeBar, NavBar, Toast, Loading, Popup, Row, Col, Tabbar, TabbarItem, Cell, CellGroup } from 'vant'

export default {
  components: {
    [NoticeBar.name]: NoticeBar,
    [NavBar.name]: NavBar,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {
      this.$router.push('setting')
    }
  },
  data () {
    return {
      active: 3
    }
  }
}
</script>

<style lang="postcss">
  .didadi-avatar {
    margin-top: 5px;
    text-align: center;
  }
  .didadi-nickname {
    text-align: center;
    font-size: 12px;
    color: #38f;
    margin: auto;
    line-height: 14px;
  }
  .didadi-nickname h3 {
    line-height: 14px;
    font-weight: 400;
    margin: 5px 0px;
  }
  .didadi-avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
</style>
