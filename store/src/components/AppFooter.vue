    <template>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="shop" to="store">门店</van-tabbar-item>
        <van-tabbar-item icon="cart" :dot="dot" to="product">项目</van-tabbar-item>
        <van-tabbar-item icon="records" :info="info" to="order">订单</van-tabbar-item>
        <van-tabbar-item icon="contact" to="me">我的</van-tabbar-item>
      </van-tabbar>
    </template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  props: {
    tabbarActive: {
      type: Number
    },
    dot: {
      type: Boolean
    },
    info: {
      type: String
    }
  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data () {
    return {
      active: this.tabbarActive
    }
  }
}
</script>
