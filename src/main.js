import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

import defaultState from './state/baseState'
import mutations from './state/mutations'
import getters from './state/getters'
import router from './router'


Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: defaultState,
  mutations: mutations,
  getters: getters
  //no actions yet
})


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
