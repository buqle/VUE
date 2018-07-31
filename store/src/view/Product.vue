<template>
  <div>
    <AppHeader :title="title"></AppHeader>
    <van-row van-row type="flex" justify="center" align="center">
      <van-col span="12"><h2 class="didadi-title">服务项目</h2></van-col>
    </van-row>
    <van-collapse v-model="activeName" accordion>
      <div v-for="product in products" :key="product.pid" :name="product.pid">
        <van-collapse-item :title="product.title" :name="product.pid">
          <div slot="title">{{ product.title }}</div>
          <van-panel title="简介" :desc="product.description">
            <div>
              <van-cell-group :border="false">
                <van-cell title="积分" :value="product.price + '积分/次'" />
                <van-cell title="耗时" :value="'约' + product.taking_time + '分钟'" />
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
      title: '服务项目',
      active: 1,
      info: '',
      dot: false,
      activeName: '1',
      show: false,
      products: []
    }
  },
  created () {
    Http.get('products')
      .then(response => {
        if (response.data.code === 200) {
          console.log(response.data.result)
          this.products = response.data.result
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
