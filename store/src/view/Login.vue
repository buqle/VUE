<template>
  <div>
    <AppHeader :title="title"></AppHeader>
    <van-notice-bar
      text="本门店小程序仅供滴答滴洗车员工登录使用！"
    :scrollable="true"
    />
    <van-row van-row type="flex" justify="center" align="center">
      <van-col span="12"><h2 class="didadi-title">员工登录</h2></van-col>
    </van-row>
    <van-cell-group>
      <van-field
        v-model="phone"
        type="tel"
        clearable
        label="手机号码"
        :error-message="message.phone"
        placeholder="请输入员工手机号码"
        required
        @blur="validateForm('phone')"
        @keyup.enter.native="handleLogin"
      />

      <van-field
        v-model.trim="password"
        type="password"
        label="登录密码"
        :error-message="message.password"
        placeholder="请输入员工登录密码"
        required
        icon="question"
        @click-icon="$toast('如遗忘登录密码，请联系超管处理')"
        @blur="validateForm('password')"
        @keyup.enter.native="handleLogin"
      />
    </van-cell-group>
    <van-row van-row type="flex" justify="center" align="center">
      <van-col span="12">
        <van-button
          size="normal"
          type="primary"
          block
          class="didadi-submit"
          :disabled="loading"
          @click.prevent="handleLogin"
        >登录</van-button>
      </van-col>
    </van-row>
    <AppFooter :tabbar-active="active" :info="info" :dot="dot"></AppFooter>
  </div>
</template>

<script>
import { NoticeBar, Toast, Loading, Row, Col, Cell, CellGroup, Field, Button } from 'vant'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import Http from '../Http'
import qs from 'qs'
import { mapActions } from 'vuex'

export default {
  components: {
    [NoticeBar.name]: NoticeBar,
    [Toast.name]: Toast,
    [Loading.name]: Loading,
    [Row.name]: Row,
    [Col.name]: Col,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Button.name]: Button,
    AppHeader,
    AppFooter
  },
  data () {
    return {
      loading: false,
      phone: '',
      password: '',
      message: {
        phone: '',
        password: ''
      },
      error: true,
      title: '登录',
      active: 3,
      info: '',
      dot: false
    }
  },
  methods: {
    ...mapActions(['UserLogin']),
    validateForm (field) {
      if (field === 'phone') {
        if (/^13[0-9]{9}|14[0-9]{9}|15[012356789]{1}[0-9]{8}|166[0-9]{8}|17[012345678]{1}[0-9]{8}|18[0-9]{9}|19[89]{1}[0-9]{8}$/.test(this.phone)) {
          this.message.phone = ''
        } else {
          this.message.phone = '请输入合法的国内手机号码'
        }
      }
      if (field === 'password') {
        if (this.password.length < 6) {
          this.message.password = '登录密码过短'
        } else {
          this.message.password = ''
        }
      }
    },
    handleLogin () {
      this.validateForm('phone')
      this.validateForm('password')
      if (this.message.phone === '' && this.message.password === '') {
        this.loading = true
        /*
        const postData = new FormData()
        postData.append('username', this.phone)
        postData.append('password', this.password)
        const data = postData
        */
        const postData = {
          username: this.phone,
          password: this.password
        }
        var data = qs.stringify(postData)
        Http.post('terminal/login', data)
          .then(response => {
            if (response.data.code === 200) {
              if (response.data.result.scope === 'employee') {
                Toast('登录成功，正在跳转')
                console.dir(response.data.result)
                this.$store.dispatch('UserLogin', response.data.result)
                setTimeout(() => {
                  this.$router.push('me')
                }, 1000)
              } else {
                Toast('不支持后台管理员登录')
              }
            } else {
              switch (response.data.code) {
                case 403:
                  Toast('错误的手机号码或登录密码')
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
    }
  }
}
</script>

<style lang="postcss">
  .didadi-title {
    font-size: 18px;
    color: rgba(0,0,0,.8);
    text-align: center;
    font-weight: 500;
  }
  .didadi-submit {
    margin: 20px auto;
  }
  .didadi-tip-text {
    font-size: 14px;
    color: rgba(0,0,0,.8);
    text-align: center;
  }
</style>
