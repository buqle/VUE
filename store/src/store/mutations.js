import * as types from './mutation-types'

const mutations = {
  [types.LOGIN]: (state, data) => {
    localStorage.setItem('didadi-store-token', data.token)
    localStorage.setItem('didadi-store-token-expire-at', data.expire_at)
    state.token = data.token
    console.log(data.token)
    console.log(state.token)
  },
  [types.PINGME]: (state, data) => {
    state.user = {
      display_name: data.display_name,
      scope: data.scope,
      sid: data.sid,
      phone: data.phone
    }
  },
  [types.LOGOUT]: (state) => {
    state.user = {
      display_name: '游客',
      scope: 'guest',
      sid: -1,
      phone: ''
    }
    localStorage.removeItem('didadi-store-token')
    localStorage.removeItem('didadi-store-token-expire-at')
  }
}

export default mutations
