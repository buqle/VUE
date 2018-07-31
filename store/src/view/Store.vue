<template>
  <div>
    <AppHeader :title="title"></AppHeader>
    <van-row van-row type="flex" justify="center" align="center">
      <van-col span="12"><h2 class="didadi-title">门店列表</h2></van-col>
    </van-row>
    <van-collapse v-model="activeName" accordion>
      <div v-for="store in stores" :key="store.sid" :name="store.sid">
        <van-collapse-item :title="store.short_name" :name="store.sid">
          <div slot="title">{{ store.short_name }}</div>
          <van-panel :title="store.name" desc="门店名" :status="states[store.state]">
            <div>
              <van-cell-group :border="false">
                <van-cell title="简称" :value="store.short_name" />
                <van-cell title="地址" icon="location" :label="store.address" is-link :url="store.map_url" />
                <van-cell title="热线" :value="store.phone" />
                <van-cell title="编号" :value="store.store_id" />
              </van-cell-group>
            </div>
          </van-panel>
        </van-collapse-item>
      </div>
    </van-collapse>
    <AppFooter :tabbar-active="active" :info="info" :dot="dot"></AppFooter>
  </div>
</template>

<script>
import { Toast, Row, Col, Cell, CellGroup, Panel, Collapse, CollapseItem, Icon } from 'vant'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import Http from '../Http'

export default {
  components: {
    [Toast.name]: Toast,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Panel.name]: Panel,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Icon.name]: Icon,
    AppHeader,
    AppFooter
  },
  data () {
    return {
      loading: true,
      error: [],
      title: '门店',
      active: 0,
      info: '',
      dot: false,
      activeName: '1',
      show: false,
      states: {
        '1': '开业中',
        '0': '筹建中',
        '2': '维护中',
        '9': '已停业'
      },
      stores: []
    }
  },
  created () {
    Http.get('stores')
      .then(response => {
        if (response.data.code === 200) {
          // console.log(response.data.result)
          this.stores = response.data.result
        } else {
          Toast(response.data.msg || '服务器异常')
        }
      })
      .catch(e => {
        Toast('发生异常')
        console.log('发生异常:' + e)
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style lang="postcss">
  .van-collapse {
    margin-bottom: 80px;
  }
  .didadi-title {
    font-size: 18px;
    color: rgba(0,0,0,.8);
    text-align: center;
    font-weight: 500;
  }
  .didadi-tip-text {
    font-size: 14px;
    color: rgba(0,0,0,.8);
    text-align: center;
  }
  .van-icon-shop-collect {
    color: #38f;
    vertical-align: -3px;
    margin-left: 5px;
    font-size: 15px;
  }
</style>
