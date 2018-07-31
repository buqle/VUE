import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  user: {
    display_name: '游客',
    scope: 'guest',
    sid: -1,
    phone: null
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
