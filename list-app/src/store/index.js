import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import app from './modules/app';
import record from './modules/record';
import search from './modules/search';
import home from './modules/home'
import getters from './getters';

Vue.use(Vuex);

//直接导出一个Store实例
export default new Vuex.Store({
  modules:{
    user,app,record,search,home
  },
  getters
})
