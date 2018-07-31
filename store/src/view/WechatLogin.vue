<template>
  <div>
    <AppHeader :title="title"></AppHeader>
    <van-notice-bar
      text="本门店小程序仅供滴答滴洗车员工登录使用！"
    :scrollable="true"
    />
    <van-row van-row type="flex" justify="center" align="center">
      <van-col span="4"><van-loading type="spinner" color="black" /></van-col>
      <van-col span="12"><p class="didadi-tip-text">正在登录请稍后...</p></van-col>
    </van-row>
    <AppFooter :tabbar-active="active" :info="info" :dot="dot"></AppFooter>
  </div>
</template>

<script>
import { NoticeBar, Toast, Loading, Row, Col, Cell, CellGroup } from 'vant'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'

export default {
  components: {
    [NoticeBar.name]: NoticeBar,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    AppHeader,
    AppFooter
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
      title: '登录',
      active: 3,
      info: '',
      dot: false
    }
  }
}
</script>

<style lang="postcss">
  .didadi-tip-text {
    font-size: 14px;
    color: rgba(0,0,0,.8);
    text-align: center;
  }
</style>
