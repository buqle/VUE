<template>
  <div>
    <AppHeader :title="title"></AppHeader>
    <div class="didadi-header-box">
      <van-row van-row type="flex" justify="center" align="center">
        <van-col span="12">
          <div class="didadi-avatar">
            <img :src="addons.avatar" />
          </div>
          <div class="didadi-nickname">
            <h3>{{ user.display_name }}</h3>
          </div>
        </van-col>
      </van-row>
    </div>

    <van-cell-group>
      <van-cell title="联系电话" icon="phone" :value="user.phone" />
      <van-cell title="所属门店" icon="home" :value="addons.store_name" />
      <van-cell title="同步微信资料" icon="upgrade" is-link to="sync" />
      <van-cell title="登出" icon="close" is-link @click="logout()" />
    </van-cell-group>
    <AppFooter :tabbar-active="active" :info="info" :dot="dot"></AppFooter>
  </div>
</template>

<script>
import { Toast, Loading, Popup, Row, Col, Cell, CellGroup, Collapse, CollapseItem } from 'vant'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import { mapState, mapActions } from 'vuex'
import Http from '../Http'

export default {
  components: {
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [Popup.name]: Popup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    AppHeader,
    AppFooter
  },
  data () {
    return {
      loading: true,
      /*
      user: {
        display_name: '游客',
        scope: 'guest',
        sid: -1,
        phone: null
      },
      */
      addons: {
        store_name: '',
        avatar: '//s1.xinlingxiang.cn/wechat/img/employee_avatar.jpg'
      },
      title: '我的',
      active: 3,
      info: '',
      dot: false
    }
  },
  methods: {
    ...mapActions(['PingMe', 'UserLogout']),
    logout () {
      this.$store.dispatch('UserLogout')
      Toast('登出成功,正在跳转')
      setTimeout(() => {
        this.$router.push('store')
      }, 1000)
    },
    // 作为心跳请求，获取当前账户信息
    pingMe () {
      // console.log(this.$store.state)
      this.loading = true
      Http.get('terminal/me')
        .then(response => {
          if (response.data.code === 200) {
            console.dir(response.data.result)
            this.$store.dispatch('PingMe', response.data.result)
            this.addons.store_name = response.data.result.store_name
            this.addons.avatar = response.data.result.avatar
          } else {
            switch (response.data.code) {
              case 401: // access_token 过期
                Toast('Access Token 已失效，请重新登录')
                break
              default :
                Toast(response.data.msg || '服务器异常')
                break
            }
          }
        })
        .catch(e => {
          Toast('发生异常')
          console.log('发生异常:' + e)
        })
        .finally(() => {
        })
      this.loading = false
    }
  },
  created () {
    this.pingMe()
  },
  computed: mapState({
    user: state => state.user
  })
}
</script>

<style lang="postcss">
  .didadi-header-box {
    margin-bottom: 20px;
  }
  .didadi-avatar {
    margin-top: 5px;
    text-align: center;
  }
  .didadi-nickname {
    text-align: center;
    color: #19b36b;
    margin: auto;
    line-height: 20px;
  }
  .didadi-nickname h3 {
    line-height: 16px;
    font-weight: 400;
    margin: 5px 0px;
  }
  .didadi-avatar img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
</style>
