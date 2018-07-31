<template>
  <div>
    <AppHeader :title="title"></AppHeader>

    <van-tabs>
      <van-tab v-for="filter in filters" :title="filter.title" :key="filter.id">
        <van-list
          v-model="loading"
          :finished="finished"
          @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item" :title="item + ''" />
        </van-list>
      </van-tab>
    </van-tabs>

    <AppFooter :tabbar-active="active" :info="info" :dot="dot"></AppFooter>
  </div>
</template>

<script>
import { Toast, Loading, Popup, Row, Col, Cell, CellGroup, Tab, Tabs, List } from 'vant'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'

export default {
  components: {
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [List.name]: List,
    AppHeader,
    AppFooter
  },
  methods: {
    onLoad () {
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  },
  data () {
    return {
      title: '订单',
      active: 2,
      info: '',
      dot: false,
      list: [],
      loading: false,
      finished: false,
      filters: [
        { 'id': 1, 'title': '接服中' },
        { 'id': 2, 'title': '客取中' },
        { 'id': 3, 'title': '已完成' },
        { 'id': 4, 'title': '已取消' }
      ]
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
