import * as types from './mutation-types'

const actions = {
  UserLogin ({
    commit
  }, data) {
    commit(types.LOGIN, data)
  },
  PingMe ({
    commit
  }, data) {
    commit(types.PINGME, data)
  },
  UserLogout ({
    commit
  }) {
    commit(types.LOGOUT)
  }
}

export default actions
