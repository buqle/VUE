    <template>
      <van-nav-bar
        :title="title + ' - 滴答滴门店'"
        left-arrow
        @click-left="onClickLeft"
      />
    </template>
<script>
import { NavBar } from 'vant'

export default {
  props: {
    title: String
  },
  components: {
    [NavBar.name]: NavBar
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>
